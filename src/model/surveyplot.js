/**
 * surveyplot
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.surveyplot = function() {
    var surveyplot = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    var type = 'Surveyplot'; //类型
    var width = 800; // 宽度
    var height = 400; // 高度
    var widthAvail = width - 150; // 实际利用宽度
    var heightAvail = height - 100; // 实际利用高度
    var data; //数据
    var tranX = 30; //图形右移距离
    var tranY = 20; //图形下移距离
    var fontColor = '#000000'; //颜色
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = surveyplot.color();

    /************局部变量***************/
    var dimension;
    var padding = .1;
    /******坐标轴******/
    var yLegend = '';
    var xLegend = '';
    var xtickRotate = 0;
    var ytickRotate = 0;
    var labelSize = 8;
    var labelColor = '#000000';
    var ytickNumber = 5;
    var xtickLineLength = 5;
    var ytickLineLength = 5;
    var tickTextSize = 8;
    var tickTextColor = '#929292';
    var tickLineColor = '#929292';
    var axisPathWidth = 2;
    var axisPathColor = '#000000';

    /******图例******/
    var legendColor = '#000000';
    var legendSize = 13;
    var legendTranX = 0;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    surveyplot.data = function(_) {
        if (arguments.length) {
            if (_.type === 'xml') {
                _ = _.root;
                _ = _.map(function(d) {
                    var obj = {};
                    d.row.row.forEach(function(p) {
                        var k = pvisual.keys(p)[0];
                        obj[k] = p[k];
                    });
                    return obj;
                });
            } else if (_.type === 'xlsx' || _.type === 'xls') {
                var s = [];
                for (var i = 0; i < _.length; i++) {
                    var k = pvisual.keys(_[i])[0];
                    s = s.concat(_[i][k]);
                }
                _ = s;
            }

            var name = pvisual.keys(_[0]).filter(function(p) {
                return p !== 'species';
            });
            name.forEach(function(d) {
                _.forEach(function(p) {
                    p.dimensions = {};
                    p[d] = +p[d];
                });
            });
            dimension = name.map(function(d) {
                return {name: d, _flag: true, extent: d3.extent(_, function(p) {
                        return p[d];
                    })};
            });
            dimension.species =
                    d3.set(_.map(function(d) {
                        return d.species;
                    })).values();
            data = _;
            return this;
        } else
            return data;
    };

    surveyplot.getType = function() {
        return type;
    };

    surveyplot.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in surveyplot.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('surveyplot', true)
                .node();
        /* 初始化变量 */
        var dimen = dimension.filter(function(d) {
            return d._flag;
        });

        var x0 = d3.scale.ordinal();
        var x1 = d3.scale.linear();
        var y = d3.scale.linear();

        x0.rangeRoundBands([0, widthAvail], padding);
        y.rangeRound([heightAvail, 0]);
        x0.domain(dimen.map(function(d) {
            return d.name;
        }));
        y.domain([0, data.length - 1]);

        var xAxis = d3.svg.axis()
                .scale(x0)
                .orient('bottom')
                .tickSize(xtickLineLength);
        var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(ytickNumber)
                .tickSize(ytickLineLength)
                .tickFormat(format);

        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                surveyplot.floatTag(div); //绘图元素的外容器，添加动态标签

        var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + tranX + ',' + tranY + ')');

        g.call(function(selection) {
            selection.append('svg:g')
                    .classed('dimensions', true);
            selection.append('svg:g')
                    .classed('x-axis axis', true);
            selection.append('svg:g')
                    .classed('y-axis axis', true);
            selection.append('svg:g')
                    .classed('legends', true);
        });

        g = d3.select(svg).select('g');

        var dimensions = g.select('.dimensions')
                .selectAll('.dimension')
                .data(dimen);

        dimensions.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();

        dimensionUpdate(dimensions, x0, x1, y, dimen);
        dimensionDraw(dimensions, x0, x1, y, dimen);

        var legends = g.select('.legends')
                .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                .selectAll('.legend')
                .data(dimension);
        legends.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        legendUpdate(legends);
        legendDraw(legends, dimen);

        axis(g, xAxis, yAxis, x0);
    };

    function dimensionUpdate(dimensions, x0, x1, y, dimen) {
        dimensions
                .transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + x0(d.name) + ', 0)';
                })
                .each(function(d) {
                    var everywidth = x0.rangeBand();
                    var everyheight = Math.round(heightAvail / data.length) + 1;

                    x1.domain([0, d.extent[1]])
                            .range([0, everywidth]);

                    var boxs = d3.select(this)
                            .selectAll('.box')
                            .data(data);

                    boxs.exit()
                            .transition()
                            .duration(duration)
                            .style('opacity', 0)
                            .remove();

                    boxs
                            .on('mouseover', function(p) {
                                dimen.forEach(function(k) {
                                    d3.select(p.dimensions[k.name])
                                            .style('fill', color(data.length));
                                });

                                drawLegend(p, true, dimen);
                            })
                            .on('mouseout', function(p) {
                                dimen.forEach(function(k) {
                                    d3.select(p.dimensions[k.name])
                                            .style('fill', function() {
                                                return color(p.species);
                                            });
                                });

                                drawLegend(p, false, dimen);
                            })
                            .transition()
                            .duration(duration / 2)
                            .style('fill', function(p) {
                                p.dimensions[d.name] = this;
                                return color(p.species);
                            })
                            .attr('x', function(p) {
                                return (everywidth - x1(p[d.name])) / 2;
                            })
                            .attr('y', function(p, i) {
                                return y(i);
                            })
                            .attr('width', function(p) {
                                return x1(p[d.name]);
                            })
                            .attr('height', function() {
                                return everyheight;
                            });

                    boxs.enter()
                            .append('svg:rect')
                            .classed('box', true)
                            .style('stroke', 'none')
                            .style('fill', function(p) {
                                p.dimensions[d.name] = this;
                                return color(p.species);
                            })
                            .on('mouseover', function(p) {
                                dimen.forEach(function(k) {
                                    d3.select(p.dimensions[k.name])
                                            .style('fill', color(data.length));
                                });

                                drawLegend(p, true, dimen);
                            })
                            .on('mouseout', function(p) {
                                dimen.forEach(function(k) {
                                    d3.select(p.dimensions[k.name])
                                            .style('fill', function() {
                                                return color(p.species);
                                            });
                                });

                                drawLegend(p, false, dimen);
                            })
                            .transition()
                            .duration(duration / 2)
                            .attr('x', function(p) {
                                return (everywidth - x1(p[d.name])) / 2;
                            })
                            .attr('y', function(p, i) {
                                return y(i);
                            })
                            .attr('width', function(p) {
                                return x1(p[d.name]);
                            })
                            .attr('height', function() {
                                return everyheight;
                            });

                });
    }

    function dimensionDraw(dimensions, x0, x1, y, dimen) {
        dimensions.enter()
                .append('svg:g')
                .classed('dimension', true)
                .transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + x0(d.name) + ', 0)';
                })
                .each(function(d) {
                    var everywidth = x0.rangeBand();
                    var everyheight = Math.round(heightAvail / data.length) + 1;

                    x1.domain([0, d.extent[1]])
                            .range([0, everywidth]);

                    d3.select(this)
                            .selectAll('.box')
                            .data(data)
                            .enter()
                            .append('svg:rect')
                            .classed('box', true)
                            .style('stroke', 'none')
                            .style('fill', function(p) {
                                p.dimensions[d.name] = this;
                                return color(p.species);
                            })
                            .on('mouseover', function(p) {
                                dimen.forEach(function(k) {
                                    d3.select(p.dimensions[k.name])
                                            .style('fill', color(data.length));
                                });

                                drawLegend(p, true, dimen);
                            })
                            .on('mouseout', function(p) {
                                dimen.forEach(function(k) {
                                    d3.select(p.dimensions[k.name])
                                            .style('fill', function() {
                                                return color(p.species);
                                            });
                                });

                                drawLegend(p, false, dimen);
                            })
                            .transition()
                            .duration(duration / 2)
                            .attr('x', function(p) {
                                return (everywidth - x1(p[d.name])) / 2;
                            })
                            .attr('y', function(p, i) {
                                return y(i);
                            })
                            .attr('width', function(p) {
                                return x1(p[d.name]);
                            })
                            .attr('height', function() {
                                return everyheight;
                            });

                });
    }

    function legendDraw(legends, dimen) {
        legends.enter()
                .append('svg:g')
                .classed('legend', true)
                .style('cursor', 'pointer')
                .on('click', function(d) {
                    if (!d3.select(this).classed('none')) {
                        if (dimen.length > 1) {
                            d3.select(this).classed('none', true);
                            d._flag = false;
                            surveyplot.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;

                        surveyplot.render();
                    }
                })
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        widthAvail + 20,
                                'y': i % legendColumnNo * 20})
                            .attr({'width': 10,
                                'height': 10})
                            .style({'fill': color(i),
                                'stroke': color(i)})
                            .style('fill-opacity', d._flag ? 1 : 0)
                            .style('opacity', 0)
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 1);
                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        widthAvail + 40,
                                'y': i % legendColumnNo * 20 + 9})
                            .style({'opacity': 0,
                                'font-size': legendSize,
                                'fill': legendColor,
                                'font-family': fontFamily})
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 1)
                            .text(d.name);
                });
    }

    function legendUpdate(legends) {
        legends.each(function(d, i) {
            d3.select(this)
                    .selectAll('rect')
                    .transition()
                    .duration(duration / 2)
                    .style({'fill': color(i),
                        'stroke': color(i)})
                    .style('fill-opacity', d._flag ? 1 : 0)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail + 20,
                        'y': i % legendColumnNo * 20});
            d3.select(this)
                    .selectAll('text')
                    .transition()
                    .duration(duration / 2)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail + 40,
                        'y': i % legendColumnNo * 20 + 9})
                    .style({'font-size': legendSize,
                        'fill': legendColor,
                        'font-family': fontFamily})
                    .text(d.name);
        });
    }

    function axis(g, xAxis, yAxis) {
        g.select('.x-axis')
                .each(function() {
                    d3.select(this)
                            .select('.label')
                            .transition()
                            .duration(duration)
                            .attr({'x': widthAvail,
                                'y': -6})
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .text(xLegend);
                    d3.select(this)
                            .selectAll('.label')
                            .data([1])
                            .enter()
                            .append('svg:text')
                            .classed('label', true)
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .attr({'x': widthAvail,
                                'y': -6})
                            .text(xLegend);

                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr('transform', 'translate(0,' + (heightAvail + 2) + ')')
                            .call(xAxis);
                });

        g.select('.y-axis')
                .each(function() {
                    d3.select(this)
                            .select('.label')
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .text(yLegend);

                    d3.select(this)
                            .selectAll('.label')
                            .data([1])
                            .enter()
                            .append('svg:text')
                            .classed('label', true)
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .attr({'transform': 'rotate(-90)',
                                'y': 8,
                                'dy': '.71em'})
                            .text(yLegend);

                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(yAxis);
                });

        g.selectAll('.axis')
                .call(function(selection) {
                    selection
                            .selectAll('path')
                            .style({'fill': 'none',
                                'stroke': axisPathColor,
                                'stroke-width': axisPathWidth,
                                'shape-rendering': 'crispEdges'});

                    selection
                            .selectAll('line')
                            .style({'fill': 'none',
                                'stroke': tickLineColor,
                                'shape-rendering': 'crispEdges'});
                });
        g.select('.x-axis')
                .selectAll('.tick')
                .select('text')
                .style({'text-anchor': 'end',
                    'font-family': fontFamily,
                    'font-size': tickTextSize,
                    'fill': tickTextColor})
                .attr('transform', function() {
                    return 'translate(' + (this.getComputedTextLength() / 2 + this.getComputedTextLength() *
                            Math.abs(Math.sin(xtickRotate) * .5)) + ',' +
                            (this.getComputedTextLength()
                                    * (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
                            + ')rotate(' + xtickRotate + ')';
                });

        g.select('.y-axis')
                .selectAll('.tick')
                .select('text')
                .style({'text-anchor': 'start',
                    'font-family': fontFamily,
                    'font-size': tickTextSize,
                    'fill': tickTextColor})
                .attr('transform', function() {
                    return 'translate(' + -this.getComputedTextLength() +
                            ', 0)rotate(' + ytickRotate + ')';
                });
    }

    function drawLegend(d, style, dimen) {
        if (style) {
            var str = '';
            dimen.forEach(function(p) {
                str += p.name + '= ' + d[p.name] + '<br/>';
            });

            floatTag.style({
                'border-color': color(d.species),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            })
                    .html('Attributes:<br/> ' + str + '<br/>' + 'Class: ' + d.species);
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    surveyplot.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in surveyplot.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    surveyplot.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in surveyplot.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    surveyplot.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in surveyplot.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    surveyplot.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    surveyplot.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    surveyplot.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    surveyplot.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in surveyplot.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    surveyplot.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    surveyplot.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    surveyplot.yLegend = function(_) {
        if (!arguments.length)
            return yLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegend = arguments[0];
                return this;
            }
        }
    };

    surveyplot.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    surveyplot.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    surveyplot.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    surveyplot.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };


    surveyplot.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    surveyplot.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    surveyplot.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    surveyplot.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    surveyplot.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    surveyplot.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    surveyplot.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in surveyplot.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    surveyplot.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    surveyplot.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in surveyplot.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    surveyplot.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    surveyplot.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.legendRowGap(legendRowGap) should be number');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    surveyplot.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in surveyplot.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    surveyplot.options = function(_) {
        if (!arguments.length)
            return {
                'type': surveyplot.getType(),
                'width': width,
                'height': height,
                'widthAvail': widthAvail,
                'heightAvail': heightAvail,
                'tranX': tranX,
                'tranY': tranY,
                'format': format,
                'fontFamily': fontFamily,
                'color': color,
                'duration': duration,
                'padding': padding,
                'xLegend': xLegend,
                'yLegend': yLegend,
                'xtickRotate': xtickRotate,
                'ytickRotate': ytickRotate,
                'labelSize': labelSize,
                'labelColor': labelColor,
                'ytickNumber': ytickNumber,
                'tickTextSize': tickTextSize,
                'tickTextColor': tickTextColor,
                'tickLineColor': tickLineColor,
                'xtickLineLength': xtickLineLength,
                'ytickLineLength': ytickLineLength,
                'axisPathWidth': axisPathWidth,
                'axisPathColor': axisPathColor,
                'legendColor': legendColor,
                'legendSize': legendSize,
                'legendTranX': legendTranX,
                'legendTranY': legendTranY,
                'legendColumnNo': legendColumnNo,
                'legendRowGap': legendRowGap
            };
        else if (typeof _ !== 'object') {
            console.error('The arguments in map.options(options) should be object');
            return this;
        } else {
            width = isFinite(_.width) ? _.width : width;
            height = isFinite(_.height) ? _.height : height;
            widthAvail = isFinite(_.widthAvail) ? _.widthAvail : widthAvail;
            heightAvail = isFinite(_.heightAvail) ? _.heightAvail : heightAvail;
            tranX = isFinite(_.tranX) ? _.tranX : tranX;
            tranY = isFinite(_.tranY) ? _.tranY : tranY;
            _.format && surveyplot.tickFormat(_.format);
            _.fontFamily && surveyplot.fontFamily(_.fontFamily);
            isFinite(_.duration) && surveyplot.duration(_.duration);

            isFinite(_.padding) && surveyplot.padding(_.padding);
            _.xLegend && surveyplot.xLegend(_.xLegend);
            _.yLegend && surveyplot.yLegend(_.yLegend);
            isFinite(_.xtickRotate) && surveyplot.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && surveyplot.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && surveyplot.labelSize(_.labelSize);
            _.labelColor && surveyplot.labelColor(_.labelColor);
            isFinite(_.ytickNumber) && surveyplot.ytickNumber(_.ytickNumber);
            isFinite(_.tickTextSize) && surveyplot.tickTextSize(_.tickTextSize);
            _.tickTextColor && surveyplot.tickTextColor(_.tickTextColor);
            _.tickLineColor && surveyplot.tickLineColor(_.tickLineColor);
            isFinite(_.xtickLineLength) && surveyplot.xtickLineLength(_.xtickLineLength);
            isFinite(_.ytickLineLength) && surveyplot.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && surveyplot.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && surveyplot.axisPathColor(_.axisPathColor);

            _.legendColor && surveyplot.legendColor(_.legendColor);
            isFinite(_.legendSize) && surveyplot.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && surveyplot.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && surveyplot.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        surveyplot.options(arguments[0]);
    return surveyplot;
};
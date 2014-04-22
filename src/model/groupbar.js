/**
 * 柱状图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.groupbar = function() {
    var groupbar = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '柱状图'; //类型
    var width = 800; // 宽度
    var height = 400; // 高度
    var widthAvail = width - 200; // 实际利用宽度
    var heightAvail = height - 100; // 实际利用高度
    var tranX = 50; //图形右移距离
    var tranY = 0; //图形下移距离
    var data; //数据
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = groupbar.color();

    /************局部变量***************/
    var padding = .1;
    var dimension;
    var source;

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

    groupbar.data = function(_) {
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
            dimension = pvisual.keys(_[0])
                    .filter(function(d) {
                        return d !== 'x';
                    }).map(function(d) {
                return {name: d, _flag: true};
            });
            source = _.map(function(d) {
                var value = dimension.map(function(p) {
                    return {name: p.name, y: +d[p.name]};
                });
                return {x: d.x, value: value};
            });
            dimension.x = _.map(function(p) {
                return p.x;
            });
            data = _;
            return this;
        } else
            return data;
    };

    groupbar.getType = function() {
        return type;
    };

    groupbar.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in groupbar.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('groupbar', true)
                .node();
        /* 初始化变量 */

        var x0 = d3.scale.ordinal()
                .rangeRoundBands([0, widthAvail], padding);
        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
                .range([heightAvail, 0]);

        x0.domain(dimension.x);

        x1.domain(dimension
                .filter(function(d) {
                    return d._flag;
                })
                .map(function(d) {
                    return d.name;
                }))
                .rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(source, function(d) {
                return d3.max(d.value, function(p) {
                    return p.y;
                });
            })]);

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
                groupbar.floatTag(div); //绘图元素的外容器，添加动态标签

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

        g = d3.select(svg)
                .select('g');

        var dimensions = g.selectAll('.dimensions')
                .selectAll('.dimension')
                .data(source);

        dimensions.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        dimensionUpdate(dimensions, x0, x1, y);
        dimensionDraw(dimensions, x0, x1, y);

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
        legendDraw(legends);


        axis(g, xAxis, yAxis);
    };

    function dimensionUpdate(dimensions, x0, x1, y) {
        dimensions
                .each(function(d) {
                    var rects = d3.select(this)
                            .selectAll('rect')
                            .data(function(p) {
                                return p.value;
                            });

                    rects.exit()
                            .transition()
                            .duration(duration)
                            .style('opacity', 0)
                            .remove();

                    rects
                            .transition()
                            .duration(duration)
                            .attr('x', function(p) {
                                return x1(p.name);
                            })
                            .style('fill', function(p) {
                                return color(p.name);
                            })
                            .attr('y', function(p) {
                                return y(p.y);
                            })
                            .attr('width', x1.rangeBand())
                            .attr('height', function(p) {
                                return heightAvail - y(p.y);
                            });

                    rects.enter()
                            .append('svg:rect')
                            .attr('x', function(p) {
                                return x1(p.name);
                            })
                            .attr({'height': 0,
                                'y': y(0),
                                'width': x1.rangeBand()})
                            .style('fill', function(p) {
                                return color(p.name);
                            })
                            .on('mouseover', function(p) {
                                drawLegend(p, true);
                            })
                            .on('mouseout', function(p) {
                                drawLegend(p, false);
                            })
                            .transition()
                            .duration(duration)
                            .attr('y', function(p) {
                                return y(p.y);
                            })
                            .attr('height', function(p) {
                                return heightAvail - y(p.y);
                            });

                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr('transform', function() {
                                return 'translate(' + x0(d.x) + ',0)';
                            });
                });
    }

    function dimensionDraw(dimensions, x0, x1, y) {
        dimensions.enter()
                .append('svg:g')
                .classed('dimension', true)
                .each(function(d) {
                    d3.select(this)
                            .selectAll('rect')
                            .data(function(p) {
                                return p.value;
                            })
                            .enter()
                            .append('svg:rect')
                            .attr('x', function(p) {
                                return x1(p.name);
                            })
                            .attr({'height': 0,
                                'y': y(0),
                                'width': x1.rangeBand()})
                            .style('fill', function(p) {
                                return color(p.name);
                            })
                            .on('mouseover', function(p) {
                                drawLegend(p, true);
                            })
                            .on('mouseout', function(p) {
                                drawLegend(p, false);
                            })
                            .transition()
                            .duration(duration)
                            .attr('y', function(p) {
                                return y(p.y);
                            })
                            .attr('height', function(p) {
                                return heightAvail - y(p.y);
                            });

                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr('transform', function() {
                                return 'translate(' + x0(d.x) + ',0)';
                            });
                });
    }

    function legendDraw(legends) {
        legends.enter()
                .append('svg:g')
                .classed('legend', true)
                .style('cursor', 'pointer')
                .on('click', function(d) {
                    if (!d3.select(this).classed('none')) {
                        if (dimension.length > 1) {
                            d3.select(this).classed('none', true);
                            d._flag = false;
                            source = data.map(function(d) {
                                var value = dimension.filter(function(p) {
                                    return p._flag;
                                }).map(function(p) {
                                    return {name: p.name, y: +d[p.name]};
                                });
                                return {x: d.x, value: value};
                            });
                            groupbar.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;
                        source = data.map(function(d) {
                            var value = dimension.filter(function(p) {
                                return p._flag;
                            }).map(function(p) {
                                return {name: p.name, y: +d[p.name]};
                            });
                            return {x: d.x, value: value};
                        });
                        groupbar.render();
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
                                'fill': legendColor,
                                'font-size': legendSize,
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
                            .attr('transform', 'translate(0,' + heightAvail + ')')
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
                .style({'text-anchor': 'middle',
                    'font-family': fontFamily,
                    'font-size': tickTextSize,
                    'fill': tickTextColor})
                .attr('transform', function() {
                    return 'translate(' + this.getComputedTextLength() *
                            Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                            (this.getComputedTextLength() *
                                    (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
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

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': color(d.name),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            })
                    .html('name: ' + d.name + '<br/>value: ' + format(d.y));
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    groupbar.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in groupbar.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    groupbar.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in groupbar.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    groupbar.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in groupbar.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    groupbar.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    groupbar.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    groupbar.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in groupbar.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    groupbar.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    groupbar.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    groupbar.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    groupbar.yLegend = function(_) {
        if (!arguments.length)
            return yLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegend = arguments[0];
                return this;
            }
        }
    };

    groupbar.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    groupbar.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    groupbar.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    groupbar.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    groupbar.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    groupbar.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    groupbar.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    groupbar.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    groupbar.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    groupbar.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    groupbar.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in groupbar.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    groupbar.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    groupbar.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in groupbar.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    groupbar.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    groupbar.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in groupbar.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    groupbar.options = function(_) {
        if (!arguments.length)
            return {
                'type': groupbar.getType(),
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
            _.format && groupbar.tickFormat(_.format);
            _.fontFamily && groupbar.fontFamily(_.fontFamily);
            isFinite(_.duration) && groupbar.duration(_.duration);
            _.xLegend && groupbar.xLegend(_.xLegend);
            _.yLegend && groupbar.yLegend(_.yLegend);
            isFinite(_.xtickRotate) && groupbar.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && groupbar.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && groupbar.labelSize(_.labelSize);
            _.labelColor && groupbar.labelColor(_.labelColor);
            isFinite(_.padding) && groupbar.padding(_.padding);
            isFinite(_.ytickNumber) && groupbar.ytickNumber(_.ytickNumber);
            isFinite(_.tickTextSize) && groupbar.tickTextSize(_.tickTextSize);
            _.tickTextColor && groupbar.tickTextColor(_.tickTextColor);
            _.tickLineColor && groupbar.tickLineColor(_.tickLineColor);
            isFinite(_.xtickLineLength) && groupbar.xtickLineLength(_.xtickLineLength);
            isFinite(_.ytickLineLength) && groupbar.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && groupbar.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && groupbar.axisPathColor(_.axisPathColor);
            _.legendColor && groupbar.legendColor(_.legendColor);
            isFinite(_.legendSize) && groupbar.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && groupbar.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && groupbar.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        groupbar.options(arguments[0]);
    return groupbar;
};
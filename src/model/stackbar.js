/**
 * 堆叠柱状图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.stackbar = function() {
    var stackbar = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    var type = '堆叠柱状图'; //类型
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
    var color = stackbar.color();

    /************局部变量***************/
    var padding = 0.2;
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

    stackbar.data = function(_) {
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
                var y0 = 0;
                var value = dimension.map(function(p) {
                    return {name: p.name, y0: y0, y1: y0 += +d[p.name]};
                });
                var total = value[value.length - 1].y1;
                return {value: value, total: total, x: d.x};
            });
            dimension.x = _.map(function(p) {
                return p.x;
            });
            data = _;
            return this;
        } else
            return data;
    };

    stackbar.getType = function() {
        return type;
    };

    stackbar.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            stackbar.log({priority: 'Error', position: 'stackbar',
                info: 'The argument(element) in stackbar.rander(_) should be <div> element'});
            console.error('The argument(element) in stackbar.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('stackbar', true)
                .node();

        /* 初始化变量 */
        var x = d3.scale.ordinal()
                .rangeRoundBands([0, widthAvail], padding);
        var y = d3.scale.linear()
                .rangeRound([heightAvail, 0]);

        x.domain(dimension.x);
        y.domain([0, d3.max(source, function(d) {
                return d.total;
            })]);

        var xAxis = d3.svg.axis()
                .scale(x)
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
                stackbar.floatTag(div); //绘图元素的外容器，添加动态标签

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

        dimensionUpdate(dimensions, x, y);
        dimensionDraw(dimensions, x, y);

        g = d3.select(svg)
                .select('g');

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

    function dimensionUpdate(dimensions, x, y) {
        dimensions
                .each(function() {
                    var rects = d3.select(this)
                            .selectAll('rect')
                            .data(function(d) {
                                return d.value;
                            });

                    rects.exit()
                            .transition()
                            .duration(duration)
                            .style('opacity', 0)
                            .remove();

                    rects
                            .transition()
                            .duration(duration)
                            .style('fill', function(d) {
                                return color(d.name);
                            })
                            .attr('y', function(d) {
                                return y(d.y1);
                            })
                            .attr('width', x.rangeBand())
                            .attr('height', function(d) {
                                return y(d.y0) - y(d.y1);
                            });

                    rects.enter()
                            .append('svg:rect')
                            .attr({'height': 0,
                                'y': y(0),
                                'width': x.rangeBand()})
                            .style('fill', function(d) {
                                return color(d.name);
                            })
                            .on('mouseover', function(d) {
                                drawLegend(d, true);
                            })
                            .on('mouseout', function(d) {
                                drawLegend(d, false);
                            })
                            .transition()
                            .duration(duration)
                            .attr('y', function(d) {
                                return y(d.y1);
                            })
                            .attr('height', function(d) {
                                return y(d.y0) - y(d.y1);
                            });

                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr('transform', function(d) {
                                return 'translate(' + x(d.x) + ',0)';
                            });
                });
    }

    function dimensionDraw(dimensions, x, y) {
        dimensions.enter()
                .append('svg:g')
                .classed('dimension', true)
                .each(function() {
                    d3.select(this)
                            .selectAll('rect')
                            .data(function(d) {
                                return d.value;
                            })
                            .enter()
                            .append('svg:rect')
                            .attr({'height': 0,
                                'y': y(0),
                                'width': x.rangeBand()})
                            .style('fill', function(d) {
                                return color(d.name);
                            })
                            .on('mouseover', function(d) {
                                drawLegend(d, true);
                            })
                            .on('mouseout', function(d) {
                                drawLegend(d, false);
                            })
                            .transition()
                            .duration(duration)
                            .attr('y', function(d) {
                                return y(d.y1);
                            })
                            .attr('height', function(d) {
                                return y(d.y0) - y(d.y1);
                            });

                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr('transform', function(d) {
                                return 'translate(' + x(d.x) + ',0)';
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
                                var y0 = 0;
                                var value = dimension.filter(function(p) {
                                    return p._flag;
                                }).map(function(p) {
                                    return {name: p.name, y0: y0, y1: y0 += +d[p.name]};
                                });
                                var total = value[value.length - 1].y1;
                                return {value: value, total: total, x: d.x};
                            });
                            stackbar.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;
                        source = data.map(function(d) {
                            var y0 = 0;
                            var value = dimension.filter(function(p) {
                                return p._flag;
                            }).map(function(p) {
                                return {name: p.name, y0: y0, y1: y0 += +d[p.name]};
                            });
                            var total = value[value.length - 1].y1;
                            return {value: value, total: total, x: d.x};
                        });

                        stackbar.render();
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
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .attr({'x': widthAvail,
                                'y': -6})
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
            }).html('name: ' + d.name + '<br/>value: ' + format(d.y1 - d.y0));
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    stackbar.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in stackbar.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    stackbar.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in stackbar.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    stackbar.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in stackbar.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    stackbar.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    stackbar.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    stackbar.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    stackbar.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in stackbar.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    stackbar.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    stackbar.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    stackbar.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    stackbar.yLegend = function(_) {
        if (!arguments.length)
            return yLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegend = arguments[0];
                return this;
            }
        }
    };

    stackbar.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    stackbar.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    stackbar.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    stackbar.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    stackbar.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    stackbar.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    stackbar.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    stackbar.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    stackbar.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    stackbar.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    stackbar.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in stackbar.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    stackbar.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    stackbar.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in stackbar.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    stackbar.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    stackbar.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in stackbar.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    stackbar.options = function(_) {
        if (!arguments.length)
            return {
                'type': stackbar.getType(),
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
            _.format && stackbar.tickFormat(_.format);
            _.fontFamily && stackbar.fontFamily(_.fontFamily);
            isFinite(_.duration) && stackbar.duration(_.duration);

            _.xLegend && stackbar.xLegend(_.xLegend);
            _.yLegend && stackbar.yLegend(_.yLegend);
            isFinite(_.xtickRotate) && stackbar.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && stackbar.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && stackbar.labelSize(_.labelSize);
            _.labelColor && stackbar.labelColor(_.labelColor);
            isFinite(_.padding) && stackbar.padding(_.padding);
            isFinite(_.ytickNumber) && stackbar.ytickNumber(_.ytickNumber);
            isFinite(_.tickTextSize) && stackbar.tickTextSize(_.tickTextSize);
            _.tickTextColor && stackbar.tickTextColor(_.tickTextColor);
            _.tickLineColor && stackbar.tickLineColor(_.tickLineColor);
            isFinite(_.xtickLineLength) && stackbar.xtickLineLength(_.xtickLineLength);
            isFinite(_.ytickLineLength) && stackbar.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && stackbar.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && stackbar.axisPathColor(_.axisPathColor);

            _.legendColor && stackbar.legendColor(_.legendColor);
            isFinite(_.legendSize) && stackbar.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && stackbar.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && stackbar.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        stackbar.options(arguments[0]);
    return stackbar;
};
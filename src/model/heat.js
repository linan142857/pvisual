/**
 * 热点图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.heat = function() {
    var heat = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '热点图'; //类型
    var width = 800; // 宽度
    var height = 400; // 高度
    var widthAvail = width - 150; // 实际利用宽度
    var heightAvail = height - 100; // 实际利用高度
    var tranX = 40; //图形右移距离
    var tranY = 10; //图形下移距离
    var data; //数据
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = heat.color();

    /************局部变量***************/
    var padding = 0;
    var dimension;
    var gradientColor = ['white', 'steelblue'];

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

    heat.data = function(_) {
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
            dimension = {};
            dimension.x = d3.set([]);
            dimension.y = d3.set([]);
            _.forEach(function(d) {
                d.h = +d.h;
                d._flag = true;
                dimension.x.add(d.x);
                dimension.y.add(d.y);
            });
            dimension.x = dimension.x.values();
            dimension.y = dimension.y.values();

            data = _;
            return this;
        } else
            return data;
    };

    heat.getType = function() {
        return type;
    };

    heat.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in heat.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('heat', true)
                .node();
        /* 初始化变量 */

        var x = d3.scale.ordinal()
                .rangeRoundBands([0, widthAvail], padding);
        var y = d3.scale.ordinal()
                .rangeRoundBands([heightAvail, 0], padding);

        var h = d3.scale.linear()
                .range([gradientColor[0], gradientColor[1]]);

        x.domain(dimension.x);
        y.domain(dimension.y);
        h.domain([0, d3.max(data, function(d) {
                return d.h;
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
                heat.floatTag(div); //绘图元素的外容器，添加动态标签

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
                .data(data.filter(function(d) {
                    return d._flag;
                }));

        dimensions.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        dimensions
                .transition()
                .duration(duration)
                .call(function(selection) {
                    var everywidth = x.rangeBand();
                    var everyheight = y.rangeBand();

                    selection
                            .attr('x', function(d) {
                                return x(d.x);
                            })
                            .attr('y', function(d) {
                                return y(d.y);
                            })
                            .style('fill', function(d) {
                                return h(d.h);
                            })
                            .attr('width', everywidth)
                            .attr('height', everyheight);
                });

        dimensions.enter()
                .append('svg:rect')
                .classed('dimension', true)
                .on('mouseover', function(d) {
                    return drawLegend(d, true, h);
                }).
                on('mouseout', function(d) {
                    return drawLegend(d, false, h);
                })
                .call(function(selection) {
                    var everywidth = x.rangeBand();
                    var everyheight = y.rangeBand();

                    selection
                            .attr('x', function(d) {
                                return x(d.x);
                            })
                            .attr('y', function(d) {
                                return y(d.y);
                            })
                            .style('fill', function(d) {
                                return h(d.h);
                            })
                            .transition()
                            .duration(duration)
                            .attr('width', everywidth)
                            .attr('height', everyheight);
                });

        var legends = g.select('.legends')
                .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                .selectAll('.legend')
                .data(h.ticks(6).slice(1).reverse());
        legends.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        legendUpdate(legends, h);
        legendDraw(legends, h);


        axis(g, xAxis, yAxis);
    };

    function legendDraw(legends, h) {
        legends.enter()
                .append('svg:g')
                .classed('legend', true)
                .style('cursor', 'pointer')
                .on('click', function(d, i) {
                    if (!d3.select(this).classed('none')) {
                        d3.select(this).
                                classed('none', true)
                                .select('rect')
                                .transition()
                                .duration(duration)
                                .style('fill-opacity', 0);
                        var s = h.ticks(6).slice(1).reverse();
                        d3.select(svg)
                                .select('.dimensions')
                                .selectAll('.dimension')
                                .each(function(p) {
                                    if ((i === s.length - 1 && p.h <= d)
                                            || (i === 0 && p.h > s[1])
                                            || (p.h <= d && p.h > s[i + 1]))
                                        d3.select(this)
                                                .transition()
                                                .duration(duration)
                                                .style('fill-opacity', .2);
                                });
                    } else {
                        d3.select(this)
                                .classed('none', false)
                                .select('rect')
                                .transition()
                                .duration(duration)
                                .style('fill-opacity', 1);
                        var s = h.ticks(6).slice(1).reverse();
                        d3.select(svg)
                                .select('.dimensions')
                                .selectAll('.dimension')
                                .each(function(p) {
                                    if ((i === s.length - 1 && p.h <= d)
                                            || (i === 0 && p.h > s[1])
                                            || (p.h <= d && p.h > s[i + 1]))
                                        d3.select(this)
                                                .transition()
                                                .duration(duration)
                                                .style('fill-opacity', 1);
                                });
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
                            .style('fill', h)
                            .style('stroke', h)
                            .style('fill-opacity', function() {
                                return d3.select(this)
                                        .classed('none') ? 0 : 1;
                            })
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
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
                            .duration(duration)
                            .style('opacity', 1)
                            .text(String);
                });
    }

    function legendUpdate(legends, h) {
        legends.each(function(d, i) {
            d3.select(this)
                    .selectAll('rect')
                    .transition()
                    .duration(duration / 2)
                    .style('fill', h)
                    .style('stroke', h)
                    .style('fill-opacity', function() {
                        return d3.select(this)
                                .classed('none') ? 0 : 1;
                    })
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
                    .text(String);
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
                                'y': -2})
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': tickTextSize
                            })
                            .text(xLegend);
                    d3.select(this)
                            .selectAll('.label')
                            .data([1])
                            .enter()
                            .append('svg:text')
                            .classed('label', true)
                            .attr({'x': widthAvail,
                                'y': -2})
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
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

    function drawLegend(d, style, h) {
        if (style) {
            floatTag.style({
                'border-color': h(d.h),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            }).html('x: ' + d.x + '<br/>' + 'y: ' + d.y + '<br/>' + 'value: ' + d.h);
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    heat.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in heat.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    heat.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in heat.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    heat.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in heat.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    heat.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontFamily = arguments[0];
                return this;
            }
        }
    };

    heat.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    heat.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in heat.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    heat.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    heat.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    heat.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    heat.yLegend = function(_) {
        if (!arguments.length)
            return yLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegend = arguments[0];
                return this;
            }
        }
    };

    heat.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    heat.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    heat.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    heat.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    heat.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    heat.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    heat.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    heat.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    heat.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    heat.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    heat.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in heat.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    heat.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    heat.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in heat.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    heat.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    heat.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in heat.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    heat.gradientColor = function(_) {
        if (!arguments.length)
            return gradientColor;
        else if (arguments.length !== 2
                || typeof arguments[0] !== 'string'
                || typeof arguments[1] !== 'string') {
            console.error('The argument(element) in map.gradientColor(start, end) should be string and string of color');
            return this;
        }
        else {
            gradientColor[0] = arguments[0];
            gradientColor[1] = arguments[1];
            return this;
        }
    };

    heat.options = function(_) {
        if (!arguments.length)
            return {
                'type': heat.getType(),
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
                'gradientColor': gradientColor,
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
            _.format && heat.tickFormat(_.format);
            _.fontFamily && heat.fontFamily(_.fontFamily);
            isFinite(_.duration) && heat.duration(_.duration);
            typeof _.gradientColor === 'object'
                    && _.gradientColor.constructor === Array
                    && _.gradientColor.length === 2
                    && heat.gradientColor(_.gradientColor[0], _.gradientColor[1]);
            _.xLegend && heat.xLegend(_.xLegend);
            _.yLegend && heat.yLegend(_.yLegend);
            isFinite(_.xtickRotate) && heat.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && heat.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && heat.labelSize(_.labelSize);
            _.labelColor && heat.labelColor(_.labelColor);
            isFinite(_.padding) && heat.padding(_.padding);
            isFinite(_.ytickNumber) && heat.ytickNumber(_.ytickNumber);
            isFinite(_.tickTextSize) && heat.tickTextSize(_.tickTextSize);
            _.tickTextColor && heat.tickTextColor(_.tickTextColor);
            _.tickLineColor && heat.tickLineColor(_.tickLineColor);
            isFinite(_.xtickLineLength) && heat.xtickLineLength(_.xtickLineLength);
            isFinite(_.ytickLineLength) && heat.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && heat.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && heat.axisPathColor(_.axisPathColor);
            _.legendColor && heat.legendColor(_.legendColor);
            isFinite(_.legendSize) && heat.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && heat.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && heat.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        heat.options(arguments[0]);
    return heat;
};
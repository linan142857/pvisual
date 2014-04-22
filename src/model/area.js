/**
 * 面积图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.area = function() {
    var area = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '面积图'; //类型
    var width = 900; // 宽度
    var height = 400; // 高度
    var widthAvail = width - 200; // 实际利用宽度
    var heightAvail = height - 100; // 实际利用高度
    var tranX = 50; //图形右移距离
    var tranY = 10; //图形下移距离
    var data; //数据
    var fontFamily = 'Arial'; // 字体样式
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = area.color();

    /************局部变量***************/
    var source;
    var dimension;
    var timeFormat = null;
    var isLinear = false;
    var isTimer = false;

    /******坐标轴******/
    var yLegend = '';
    var xLegend = '';
    var xtickRotate = 0;
    var ytickRotate = 0;
    var labelSize = 8;
    var labelColor = '#000000';
    var xtickNumber = 8;
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

    area.getType = function() {
        return type;
    };

    area.data = function(_) {
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
            data = _;
            dimension = pvisual.keys(_[0])
                    .filter(function(d) {
                        return d !== 'x';
                    }).map(function(d) {
                return {name: d, _flag: true};
            });
            var stack = d3.layout.stack()
                    .values(function(p) {
                        return p.value;
                    });
            source = stack(dimension
                    .map(function(p) {
                        return {
                            name: p.name,
                            value: _.map(function(d) {
                                return {x: d.x, y: +d[p.name]};
                            })
                        };
                    }));
            dimension.x = source[0].value
                    .map(function(d) {
                        return d.x;
                    });
            return this;
        } else
            return data;
    };

    area.getType = function() {
        return type;
    };

    area.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in area.rander(_) should be <div> element');
        }

        d3.select(div).
                classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('area', true)
                .node();
        /* 初始化变量 */
        var max;
        var x;
        var y;
        var xAxis;
        var yAxis;
        if (timeFormat !== null)
            isTimer = true;
        if (isTimer) {
            x = d3.time.scale()
                    .domain(d3.extent(dimension.x, function(d) {
                        return timeFormat.parse(d);
                    }))
                    .range([0, widthAvail]);

            source.forEach(function(d) {
                d.value.forEach(function(p) {
                    p.x = timeFormat.parse(p.x);
                });
            });

            source.forEach(function(d) {
                d.value.sort(function(a, b) {
                    return a.x.getTime() - b.x.getTime();
                });
            });

            xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .tickSize(xtickLineLength)
                    .ticks(xtickNumber);
        } else if (isLinear) {
            x = d3.scale.linear()
                    .domain(d3.extent(dimension.x, function(d) {
                        return +d;
                    }))
                    .range([0, widthAvail]);

            source.forEach(function(d) {
                d.value.forEach(function(p) {
                    p.x = +p.x;
                });
            });

            source.forEach(function(d) {
                d.value.sort(function(a, b) {
                    return a.x - b.x;
                });
            });

            xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .ticks(xtickNumber)
                    .tickSize(xtickLineLength)
                    .tickFormat(format);
        } else {
            x = d3.scale.ordinal()
                    .domain(dimension.x)
                    .rangePoints([0, widthAvail], 0);

            xAxis = d3.svg.axis()
                    .scale(x)
                    .tickSize(xtickLineLength)
                    .orient('bottom');
        }

        source.forEach(function(d) {
            var m = d3.max(d.value, function(p) {
                return p.y0 + p.y;
            });
            max = max >= m ? max : m;
        });
        y = d3.scale.linear()
                .domain([0, max])
                .range([heightAvail, 0]);

        var a = d3.svg.area()
                .x(function(d) {
                    return x(d.x);
                })
                .y0(function(d) {
                    return y(d.y0);
                })
                .y1(function(d) {
                    return y(d.y0 + d.y);
                });

        yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(ytickNumber)
                .tickSize(ytickLineLength)
                .tickFormat(format);

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
        var dimensions = g.select('.dimensions')
                .selectAll('.dimension')
                .data(source);
        dimensions.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        dimensionUpdate(dimensions, a);
        dimensionDraw(dimensions, a);


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
                            (this.getComputedTextLength()
                                    * (.3 * Math.abs(Math.sin(xtickRotate))))
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

    function dimensionUpdate(dimensions, a) {
        dimensions
                .transition()
                .duration(duration)
                .attr('d', function(d) {
                    return a(d.value);
                })
                .style('fill', function(d) {
                    return color(d.name);
                });
    }

    function dimensionDraw(dimensions, a) {
        dimensions.enter()
                .append('svg:path')
                .classed('dimension', true)
                .attr('d', function(d) {
                    return a(d.value);
                })
                .style('fill', function(d) {
                    return color(d.name);
                })
                .style('opacity', 0)
                .transition()
                .duration(duration)
                .style('opacity', 1);
    }

    function legendDraw(legends) {
        legends.enter()
                .append('svg:g')
                .classed('legend', true)
                .style('cursor', 'pointer')
                .on('click', function(d) {
                    if (!d3.select(this).classed('none')) {
                        if (dimension.length > 1) {
                            d3.select(this)
                                    .classed('none', true);
                            d._flag = false;
                            var stack = d3.layout.stack()
                                    .values(function(p) {
                                        return p.value;
                                    });
                            source = stack(dimension
                                    .filter(function(p) {
                                        return p._flag;
                                    })
                                    .map(function(p) {
                                        return {
                                            name: p.name,
                                            value: data.map(function(d) {
                                                return {x: d.x, y: +d[p.name]};
                                            })
                                        };
                                    }));
                            area.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;
                        var stack = d3.layout.stack()
                                .values(function(p) {
                                    return p.value;
                                });
                        source = stack(dimension
                                .filter(function(p) {
                                    return p._flag;
                                })
                                .map(function(p) {
                                    return {
                                        name: p.name,
                                        value: data.map(function(d) {
                                            return {x: d.x, y: +d[p.name]};
                                        })
                                    };
                                }));
                        area.render();
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
                    .style({'font-size': legendSize,
                        'font-family': fontFamily})
                    .transition()
                    .duration(duration / 2)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail + 40,
                        'y': i % legendColumnNo * 20 + 9})
                    .style('fill', legendColor)
                    .text(d.name);
        });
    }

    area.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in area.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    area.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in area.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    area.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in area.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    area.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    area.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    area.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    area.timeFormat = function(_) {
        if (!arguments.length)
            return timeFormat;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.timeFormat(format) should be string of d3.format');
                return this;
            } else {
                timeFormat = d3.time.format(arguments[0]);
                return this;
            }
        }
    };

    area.isLinear = function(_) {
        if (!arguments.length)
            return isLinear;
        else {
            if (isLinear !== true && isLinear !== false) {
                console.error('The arguments in area.isLinear(isLinear) should be bool');
                return this;
            } else {
                isLinear = arguments[0];
                return this;
            }
        }
    };

    area.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    area.yLegend = function(_) {
        if (!arguments.length)
            return yLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegend = arguments[0];
                return this;
            }
        }
    };

    area.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    area.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    area.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    area.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    area.xtickNumber = function(_) {
        if (!arguments.length)
            return xtickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.xtickNumber(xtickNumber) should be number of tick');
                return this;
            } else {
                xtickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    area.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    area.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    area.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    area.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    area.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    area.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    area.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in area.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    area.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    area.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in area.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    area.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    area.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in area.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    area.options = function(_) {
        if (!arguments.length)
            return {
                'type': area.getType(),
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
                'timeFormat': timeFormat,
                'isLinear': isLinear,
                'xLegend': xLegend,
                'yLegend': yLegend,
                'xtickRotate': xtickRotate,
                'ytickRotate': ytickRotate,
                'labelSize': labelSize,
                'labelColor': labelColor,
                'xtickNumber': xtickNumber,
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
            _.format && area.tickFormat(_.format);
            _.fontFamily && area.fontFamily(_.fontFamily);
            isFinite(_.duration) && area.duration(_.duration);
            _.isLinear && area.isLinear(_.isLinear);
            _.xLegend && area.xLegend(_.xLegend);
            _.yLegend && area.yLegend(_.yLegend);
            isFinite(_.xtickRotate) && area.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && area.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && area.labelSize(_.labelSize);
            _.labelColor && area.labelColor(_.labelColor);
            isFinite(_.xtickNumber) && area.xtickNumber(_.xtickNumber);
            isFinite(_.ytickNumber) && area.ytickNumber(_.ytickNumber);
            isFinite(_.tickTextSize) && area.tickTextSize(_.tickTextSize);
            _.tickTextColor && area.tickTextColor(_.tickTextColor);
            _.tickLineColor && area.tickLineColor(_.tickLineColor);
            isFinite(_.xtickLineLength) && area.xtickLineLength(_.xtickLineLength);
            isFinite(_.ytickLineLength) && area.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && area.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && area.axisPathColor(_.axisPathColor);

            _.legendColor && area.legendColor(_.legendColor);
            isFinite(_.legendSize) && area.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && area.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && area.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        area.options(arguments[0]);
    return area;
};
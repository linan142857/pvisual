/**
 * 多线图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.multiline = function() {
    var multiline = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '多线图'; //类型
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
    var color = multiline.color();

    /************局部变量***************/
    var isLinear = true;
    var isTimer = false;
    var timeFormat = null;
    var interpolate = 'liner';
    var tension = .7;
    var dimension;

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
    var ytickLineLength = -widthAvail;
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

    multiline.data = function(_) {
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
                _ = XMLdata(_);
                var value = {x: d3.set()};
                dimension = _.map(function(d) {
                    value[d.name] = d3.map();
                    return {name: d.name, _flag: true};
                });

                _.forEach(function(d) {
                    d.points.forEach(function(p) {
                        p.y = +p.y;
                        value[d.name].set(p.x, {x: p.x, y: p.y});
                        value.x.add(p.x);
                    });
                });

                data = pvisual.keys(value)
                        .filter(function(d) {
                            return d !== 'x';
                        })
                        .map(function(d) {
                            return {name: d, points: value[d].values()};
                        });
                dimension.x = value.x.values();
            } else if (_.type === 'xlsx' || _.type === 'xls') {
                var s = [];
                for (var i = 0; i < _.length; i++) {
                    var k = pvisual.keys(_[i])[0];
                    s = s.concat(_[i][k]);
                }
                _ = s;


                var value = {x: d3.set()};
                dimension = pvisual.keys(_[0])
                        .filter(function(d) {
                            return d !== 'x';
                        })
                        .map(function(d) {
                            value[d] = d3.map();
                            return {name: d, _flag: true};
                        });

                _.forEach(function(d) {
                    dimension.forEach(function(p) {
                        d.x = '' + d.x;
                        value[p.name].set(d.x, {x: d.x, y: +d[p.name]});
                        value.x.add(d.x);
                    });
                });

                data = pvisual.keys(value)
                        .filter(function(d) {
                            return d !== 'x';
                        })
                        .map(function(d) {
                            return {name: d, points: value[d].values()};
                        });
                dimension.x = value.x.values();
            } else if (_.type === 'tsv' || _.type === 'csv') {
                var value = {x: d3.set()};
                dimension = pvisual.keys(_[0])
                        .filter(function(d) {
                            return d !== 'x';
                        })
                        .map(function(d) {
                            value[d] = d3.map();
                            return {name: d, _flag: true};
                        });

                _.forEach(function(d) {
                    dimension.forEach(function(p) {
                        value[p.name].set(d.x, {x: d.x, y: +d[p.name]});
                        value.x.add(d.x);
                    });
                });

                data = pvisual.keys(value)
                        .filter(function(d) {
                            return d !== 'x';
                        })
                        .map(function(d) {
                            return {name: d, points: value[d].values()};
                        });
                dimension.x = value.x.values();
            } else if (_.type === 'json') {
                var value = {x: d3.set()};
                dimension = _.map(function(d) {
                    value[d.name] = d3.map();
                    return {name: d.name, _flag: true};
                });

                _.forEach(function(d) {
                    d.points.forEach(function(p) {
                        p.y = +p.y;
                        value[d.name].set(p.x, {x: p.x, y: p.y});
                        value.x.add(p.x);
                    });
                });

                data = pvisual.keys(value)
                        .filter(function(d) {
                            return d !== 'x';
                        })
                        .map(function(d) {
                            return {name: d, points: value[d].values()};
                        });
                dimension.x = value.x.values();
            }
            return this;
        } else
            return data;
    };

    multiline.getType = function() {
        return type;
    };

    multiline.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in multiline.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('multiline', true)
                .node();
        /* 初始化变量 */
        var source = multiline.clone(data)
                .filter(function(d) {
                    var flag = true;
                    dimension.forEach(function(p) {
                        if (p.name === d.name)
                            flag = p._flag;
                    });
                    return flag;
                });

        if (timeFormat !== null) {
            isTimer = true;
        }
        var x;
        var y;
        var xAxis;
        var yAxis;
        if (isTimer) {
            x = d3.time.scale()
                    .domain(d3.extent(dimension.x, function(d) {
                        return timeFormat.parse(d);
                    }))
                    .range([0, widthAvail]);

            source.forEach(function(d) {
                d.points.forEach(function(p) {
                    p.x = timeFormat.parse(p.x);
                });
            });

            source.forEach(function(d) {
                d.points.sort(function(a, b) {
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
                d.points.forEach(function(p) {
                    p.x = +p.x;
                });
            });

            source.forEach(function(d) {
                d.points.sort(function(a, b) {
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
                    .domain(dimension.x, function(d) {
                        return '' + d;
                    })
                    .range([0, widthAvail]);

            xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .tickSize(xtickLineLength);
        }

        y = d3.scale.linear()
                .domain([d3.min(source, function(d) {
                        return d3.min(d.points, function(p) {
                            return p.y;
                        });
                    }), d3.max(source, function(d) {
                        return d3.max(d.points, function(p) {
                            return p.y;
                        });
                    })])
                .range([heightAvail, 0]);


        yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(ytickNumber)
                .tickSize(ytickLineLength)
                .tickFormat(format);

        var line = d3.svg.line()
                .interpolate(interpolate)
                .tension(tension)
                .x(function(d) {
                    return x(d.x);
                })
                .y(function(d) {
                    return y(d.y);
                });
        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                multiline.floatTag(div); //绘图元素的外容器，添加动态标签

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

        dimensionUpdate(dimensions, line, x, y);
        dimensionDraw(dimensions, line, x, y, source);

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

    function dimensionUpdate(dimensions, line, x, y) {
        dimensions
                .call(function(selection) {
                    selection.select('.line')
                            .transition()
                            .duration(duration)
                            .attr('d', function(d) {
                                return line(d.points);
                            })
                            .style('stroke', function(d) {
                                return color(d.name);
                            });
                });
    }

    function dimensionDraw(dimensions, line, x, y, source) {
        dimensions.enter()
                .append('svg:g')
                .classed('dimension', true)
                .call(function(selection) {
                    selection.append('svg:path')
                            .classed('line', true)
                            .attr('d', function(d) {
                                return line(d.points);
                            })
                            .style('fill', 'none')
                            .style('stroke', function(d) {
                                return color(d.name);
                            })
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .style('opacity', 1);
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
                            multiline.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;
                        multiline.render();
                    }
                })
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        widthAvail + 20,
                                'y': i % legendColumnNo * 20 + 9})
                            .attr({'width': 10,
                                'height': 10})
                            .style({'fill': color(i),
                                'stroke': color(i)})
                            .style('fill-opacity', d._flag ? 1 : 0)
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .style('opacity', 1);
                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        widthAvail + 40,
                                'y': i % legendColumnNo * 20 + 19})
                            .style({'opacity': 0,
                                'font-size': legendSize,
                                'fill': legendColor,
                                'font-family': fontFamily})
                            .transition()
                            .duration(duration)
                            .style('opacity', 1)
                            .text(d.name);
                });
    }

    function legendUpdate(legends) {
        legends.each(function(d, i) {
            d3.select(this)
                    .selectAll('rect')
                    .transition()
                    .duration(duration)
                    .style({'fill': color(i),
                        'stroke': color(i)})
                    .style('fill-opacity', d._flag ? 1 : 0)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail + 20,
                        'y': i % legendColumnNo * 20 + 9});
            d3.select(this)
                    .selectAll('text')
                    .transition()
                    .duration(duration)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail + 40,
                        'y': i % legendColumnNo * 20 + 19})
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
                                'stroke-dasharray': '3,1',
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

    function XMLdata(d) {
        var u;
        if (typeof d === 'object' && d.constructor === Array) {
            u = d.map(function(p) {
                var points = p.points.points.map(function(k) {
                    var x;
                    var y;
                    k.point.point.forEach(function(q) {
                        if (q.x !== undefined)
                            x = q.x;
                        if (q.y !== undefined)
                            y = q.y;
                    });
                    return {x: '' + x, y: y};
                });
                return {name: p.name, points: points};
            });
        }
        return u;
    }

    multiline.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in multiline.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    multiline.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in multiline.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    multiline.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in multiline.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    multiline.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    multiline.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    multiline.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    multiline.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in multiline.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    multiline.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    multiline.timeFormat = function(_) {
        if (!arguments.length)
            return timeFormat;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.timeFormat(format) should be string of d3.format');
                return this;
            } else {
                timeFormat = d3.time.format(arguments[0]);
                return this;
            }
        }
    };

    multiline.isLinear = function(_) {
        if (!arguments.length)
            return isLinear;
        else {
            if (isLinear !== true && isLinear !== false) {
                console.error('The arguments in multiline.isLinear(isLinear) should be bool');
                return this;
            } else {
                isLinear = arguments[0];
                return this;
            }
        }
    };

    multiline.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    multiline.yLegend = function(_) {
        if (!arguments.length)
            return yLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegend = arguments[0];
                return this;
            }
        }
    };

    multiline.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    multiline.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    multiline.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    multiline.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    multiline.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    multiline.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    multiline.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    multiline.xtickNumber = function(_) {
        if (!arguments.length)
            return xtickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.xtickNumber(xtickNumber) should be number of tick');
                return this;
            } else {
                xtickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    multiline.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    multiline.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    multiline.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    multiline.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in multiline.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    multiline.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    multiline.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    multiline.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    multiline.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    multiline.tension = function(_) {
        if (!arguments.length)
            return tension;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in multiline.tension(tension) should be number');
                return this;
            } else {
                tension = arguments[0];
                return this;
            }
        }
    };

    multiline.interpolate = function(_) {
        if (!arguments.length)
            return interpolate;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in multiline.interpolate(interpolate) should be string');
                return this;
            } else {
                interpolate = arguments[0];
                return this;
            }
        }
    };

    multiline.options = function(_) {
        if (!arguments.length)
            return {
                'type': multiline.getType(),
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
                'interpolate': interpolate,
                'tension': tension,
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
            _.format && multiline.tickFormat(_.format);
            _.fontFamily && multiline.fontFamily(_.fontFamily);
            isFinite(_.duration) && multiline.duration(_.duration);
            isFinite(_.tension) && multiline.tension(_.tension);
            _.isLinear && multiline.isLinear(_.isLinear);
            _.interpolate && multiline.interpolate(_.interpolate);
            _.xLegend && multiline.xLegend(_.xLegend);
            _.yLegend && multiline.yLegend(_.yLegend);
            isFinite(_.xtickRotate) && multiline.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && multiline.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && multiline.labelSize(_.labelSize);
            _.labelColor && multiline.labelColor(_.labelColor);
            isFinite(_.xtickNumber) && multiline.xtickNumber(_.xtickNumber);
            isFinite(_.ytickNumber) && multiline.ytickNumber(_.ytickNumber);
            isFinite(_.tickTextSize) && multiline.tickTextSize(_.tickTextSize);
            _.tickTextColor && multiline.tickTextColor(_.tickTextColor);
            _.tickLineColor && multiline.tickLineColor(_.tickLineColor);
            isFinite(_.xtickLineLength) && multiline.xtickLineLength(_.xtickLineLength);
            isFinite(_.ytickLineLength) && multiline.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && multiline.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && multiline.axisPathColor(_.axisPathColor);

            _.legendColor && multiline.legendColor(_.legendColor);
            isFinite(_.legendSize) && multiline.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && multiline.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && multiline.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        multiline.options(arguments[0]);
    return multiline;
};
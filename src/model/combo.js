/**
 * 三合一 bar/line/pie
 * @returns {unresolved}
 */
pvisual.model.combo = function() {
    var combo = pvisual.extend();
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = 'combo'; //类型
    var width = 800; // 宽度
    var height = 1000; // 高度
    var widthAvail = width - 200; // 实际利用宽度
    var heightAvail = 300; // 实际利用高度
    var tranX = 50; //图形右移距离
    var tranY = 10; //图形下移距离
    var data; //数据
    var pieFontSize = 8; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 500; // 变化时间
    var format = d3.format('s');
    var color = combo.color();
    /************局部变量***************/
    var interpolate = 'liner';
    var tension = .7;
    var dimension;
    var padding = .1;
    var source;
    var innerRadius = 0; // 內半径
    var outerRadius = 0; // 外半径
    var barOpacity = 1;
    /******坐标轴******/
    var xtickRotate = 0;
    var yLegendBar = '';
    var yLegendLine = '';
    var xLegend = '';
    var labelSize = 8;
    var labelColor = '#000000';
    var ytickNumber = 5;
    var xtickLineLength = 5;
    var ytickLineLength = -widthAvail;
    var tickTextSize = 8;
    var tickTextColor = '#929292';
    var tickLineColor = 'rgba(0,0,0,.1)';
    var axisPathWidth = 2;
    var axisPathColor = '#000000';
    var minTickLine = 0;
    var maxTickLine = 100;
    var minTickBar = 50;
    var maxTickBar = 100;
    /******图例******/
    var legendColor = '#000000';
    var legendSize = 13;
    var legendTranX = 10;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    combo.data = function(_) {
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

    combo.getType = function() {
        return type;
    };

    combo.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in multiline.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('combo', true)
                .node();
        /* 初始化变量 */
        var source = combo.clone(data)
                .filter(function(d) {
                    var flag = true;
                    dimension.forEach(function(p) {
                        if (p.name === d.name)
                            flag = p._flag;
                    });
                    return flag;
                });
        var x0;
        var x1;
        var y0;
        var y1;
        var xAxis;
        var yAxisBar;
        var yAxisLine;
        x0 = d3.scale.ordinal()
                .domain(dimension.x, function(d) {
                    return '' + d;
                })
                .rangeRoundBands([0, widthAvail], padding);
        xAxis = d3.svg.axis()
                .scale(x0)
                .orient('bottom')
                .tickSize(xtickLineLength);
        y0 = d3.scale.linear()
                .domain([minTickBar || (minTickBar === 0 ? 0 : d3.min(source, function(d) {
                        return d3.min(d.points, function(p) {
                            return p.y;
                        });
                    })), maxTickBar || d3.max(source, function(d) {
                        return d3.max(d.points, function(p) {
                            return p.y;
                        });
                    })])
                .range([heightAvail, 0]);
        y1 = d3.scale.linear()
                .domain([minTickLine || (minTickLine === 0 ? 0 : d3.min(source, function(d) {
                        return d3.min(d.points, function(p) {
                            return p.y;
                        });
                    })), maxTickLine || d3.max(source, function(d) {
                        return d3.max(d.points, function(p) {
                            return p.y;
                        });
                    })])
                .range([heightAvail, 0]);
        x1 = d3.scale.ordinal();
        x1.domain(dimension
                .filter(function(d) {
                    return d._flag;
                })
                .map(function(d) {
                    return d.name;
                }))
                .rangeRoundBands([0, x0.rangeBand()]);
        yAxisBar = d3.svg.axis()
                .scale(y0)
                .orient('left')
                .ticks(ytickNumber)
                .tickSize(ytickLineLength)
                .tickFormat(format);
        yAxisLine = d3.svg.axis()
                .scale(y1)
                .orient('right')
                .ticks(ytickNumber)
                .tickSize(ytickLineLength)
                .tickFormat(format);
        var line = d3.svg.line()
                .interpolate(interpolate)
                .tension(tension)
                .x(function(d) {
                    return x0(d.x);
                })
                .y(function(d) {
                    return y1(d.y);
                });
        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                combo.floatTag(div); //绘图元素的外容器，添加动态标签

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
                    .classed('x-axis axis', true);
            selection.append('svg:g')
                    .classed('y-axis y-axis-bar axis', true);
            selection.append('svg:g')
                    .classed('y-axis y-axis-line axis', true);
            selection.append('svg:g')
                    .classed('bars', true);
            selection.append('svg:g')
                    .classed('lines', true);
            selection.append('svg:g')
                    .classed('points', true);
            selection.append('svg:g')
                    .classed('pies', true);
            selection.append('svg:g')
                    .classed('legends', true);
        });
        g = d3.select(svg)
                .select('g');
        var bars = g.selectAll('.bars')
                .selectAll('.bar')
                .data(dimension.x);
        bars.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        barUpdate(bars, x0, x1, y0, source);
        barDraw(bars, x0, x1, y0, source);
        var lines = g.selectAll('.lines')
                .selectAll('.line')
                .data(source);
        lines.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        lineUpdate(lines, line, x0, y1, source);
        lineDraw(lines, line, x0, y1, source);
        var points = g.selectAll('.points')
                .selectAll('.point')
                .data(source);
        points.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        pointUpdate(points, x0, y1, source);
        pointDraw(points, x0, y1, source);
        outerRadius = outerRadius || dimension.x.length > 4 ? widthAvail / 8 : widthAvail / dimension.x;
        innerRadius = innerRadius || outerRadius * .3;
        var pies = g.selectAll('.pies')
                .selectAll('.pie')
                .data(dimension.x);
        pies.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        pieUpdate(pies, source);
        pieDraw(pies, source);
        axis(g, xAxis, yAxisBar, yAxisLine);
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
    };

    function lineDraw(lines, line, x0, y, source) {
        lines.enter()
                .append('svg:path')
                .classed('line', true)
                .attr('transform', 'translate(' + x0.rangeBand() / 2 + ',' + height + ')')
                .attr('d', function(d) {
                    return line(d.points);
                })
                .style({'fill': 'none', 'width': 2})
                .style('stroke', function(d) {
                    return color(d.name);
                })
                .transition()
                .duration(duration)
                .attr('transform', 'translate(' + x0.rangeBand() / 2 + ',0)');
    }

    function lineUpdate(lines, line, x0, y, source) {
        lines.transition()
                .duration(duration)
                .attr('transform', 'translate(' + x0.rangeBand() / 2 + ',0)')
                .attr('d', function(d) {
                    return line(d.points);
                })
                .style('stroke', function(d) {
                    return color(d.name);
                });
    }

    function barDraw(bars, x0, x1, y, source) {
        bars.enter()
                .append('svg:g')
                .classed('bar', true)
                .attr('transform', function(d) {
                    return 'translate(' + x0(d) + ',0)';
                })
                .each(function(d, i) {
                    d3.select(this)
                            .selectAll('rect')
                            .data(function() {
                                return source.map(function(p) {
                                    return {name: p.name, y: p.points[i].y};
                                });
                            })
                            .enter()
                            .append('svg:rect')
                            .on('mouseover', function(p) {
                                drawLegend(p, true);
                            })
                            .on('mouseout', function(p) {
                                drawLegend(p, false);
                            })
                            .attr('height', function(p) {
                                return heightAvail - 1 - y(p.y);
                            })
                            .attr('x', function(p) {
                                return x1(p.name);
                            })
                            .attr({'y': y(0),
                                'zIndex': 2,
                                'width': x1.rangeBand()})
                            .attr('y', function(p) {
                                return y(p.y);
                            })
                            .style('fill', function(p) {
                                return color(p.name);
                            })
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .style('opacity', barOpacity);
                });
    }

    function barUpdate(bars, x0, x1, y, source) {
        bars.attr('transform', function(d) {
            return 'translate(' + x0(d) + ',0)';
        }).each(function(d, i) {
            var rects = d3.select(this)
                    .selectAll('rect')
                    .data(function() {
                        return source.map(function(p) {
                            return {name: p.name, y: p.points[i].y};
                        });
                    });
            rects.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            rects.transition()
                    .duration(duration)
                    .attr('width', x1.rangeBand())
                    .style('fill', function(p) {
                        return color(p.name);
                    })
                    .style('opacity', barOpacity)
                    .attr('x', function(p) {
                        return x1(p.name);
                    })
                    .attr('y', function(p) {
                        return y(p.y);
                    })
                    .attr('height', function(p) {
                        return heightAvail - 1 - y(p.y);
                    });
            rects
                    .enter()
                    .append('svg:rect')
                    .on('mouseover', function(p) {
                        drawLegend(p, true);
                    })
                    .on('mouseout', function(p) {
                        drawLegend(p, false);
                    })
                    .attr('x', function(p) {
                        return x1(p.name);
                    })
                    .attr('y', function(p) {
                        return y(p.y);
                    })
                    .attr('width', x1.rangeBand())
                    .style('fill', function(p) {
                        return color(p.name);
                    })
                    .style('opacity', 0)
                    .transition()
                    .duration(duration)
                    .attr('height', function(p) {
                        return heightAvail - 1 - y(p.y);
                    })
                    .style('opacity', 1);
        });
    }

    function pointDraw(points, x0, y, source) {
        var tran = x0.rangeBand() / 2;
        points.enter()
                .append('svg:g')
                .classed('point', true)
                .each(function(d, i) {
                    d3.select(this)
                            .selectAll('circle')
                            .data(function() {
                                return d.points;
                            })
                            .enter()
                            .append('svg:circle')
                            .on('mouseover', function(p) {
                                return drawLegend({name: d.name, y: p.y}, true);
                            })
                            .on('mouseout', function(p) {
                                return drawLegend({name: d.name, y: p.y}, false);
                            })
                            .style('stroke', color(d.name))
                            .attr({'r': 4, 'cx': 0})
                            .style({'fill': '#FFFFFF', 'stroke-width': 2, 'opacity': 0})
                            .transition()
                            .ease('bounce')
                            .duration(duration)
                            .attr('cx', function(p) {
                                return x0(p.x) + tran;
                            })
                            .attr('cy', function(p) {
                                return y(p.y);
                            })
                            .style('opacity', 1);
                });
    }

    function pointUpdate(points, x0, y, source) {
        var tran = x0.rangeBand() / 2;
        points.each(function(d, i) {
            var points = d3.select(this)
                    .selectAll('circle')
                    .data(function() {
                        return d.points;
                    });
            points.transition()
                    .ease('bounce')
                    .duration(duration)
                    .attr('cx', function(p) {
                        return x0(p.x) + tran;
                    })
                    .attr('cy', function(p) {
                        return y(p.y);
                    })
                    .style('stroke', color(d.name));
        });
    }

    function pieUpdate(pies, source) {
        var format = d3.format('.2%');
        var layout = d3.layout.pie()
                .value(function(d) {
                    return d.y;
                });
        var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(function(d) {
                    return (d.value - d.extent[0]) / (d.extent[1] - d.extent[0]) * (outerRadius - innerRadius) * .4 + (outerRadius - innerRadius) * .6 + innerRadius;
                });
        pies.each(function(d, i) {
            var arcs = d3.select(this)
                    .datum(function() {
                        var extent = d3.extent(source.map(function(p) {
                            return p.points[i].y;
                        }));
                        return source.map(function(p) {
                            return {name: p.name, y: p.points[i].y, extent: extent};
                        });
                    })
                    .selectAll('path')
                    .data(layout);
            arcs.exit()
                    .attr('opacity', 1)
                    .transition()
                    .duration(duration)
                    .attr('opacity', 0)
                    .remove();
            arcs.transition()
                    .duration(duration)
                    .attr('fill', function(p) {
                        return color(p.data.name);
                    })
                    .attrTween('d', function(k) {
                        var q = d3.interpolate(+d3.select(this).attr('data-startAngle'), k.startAngle);
                        var p = d3.interpolate(+d3.select(this).attr('data-endAngle'), k.endAngle);
                        return function(t) {
                            return  arc({startAngle: p(t), endAngle: q(t), extent: k.data.extent, value: k.value});
                        };
                    })
                    .attr('data-startAngle', function(p) {
                        return p.startAngle;
                    })
                    .attr('data-endAngle', function(p) {
                        return p.endAngle;
                    });
            arcs.enter()
                    .append('svg:path')
                    .attr('data-startAngle', function(p) {
                        return p.startAngle;
                    })
                    .attr('data-endAngle', function(p) {
                        return p.endAngle;
                    })
                    .attr('fill', function(p) {
                        return color(p.data.name);
                    })
                    .attr('opacity', 0)
                    .on('mouseover', function(p) {
                        drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, true);
                    })
                    .on('mouseout', function(p) {
                        drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, false);
                    })
                    .transition()
                    .duration(duration)
                    .attrTween('d', function(p) {
                        var q = d3.interpolate(p.startAngle, p.endAngle);
                        return function(t) {
                            return  arc({startAngle: p.startAngle, endAngle: q(t), extent: p.data.extent, value: p.value});
                        };
                    })
                    .attr('opacity', 1);
            d3.select(this)
                    .select('text tspan')
                    .transition()
                    .duration(duration)
                    .style({'text-anchor': 'end',
                        'font-family': fontFamily,
                        'font-size': pieFontSize
                    })
                    .text(d);
            d3.select(this)
                    .transition()
                    .duration(duration)
                    .attr('transform', 'translate(' + ((i % 4 + .5) * (outerRadius * 2 + 20) - 30) + ',' + ((Math.round(i / 4 - .5) + .5) * (outerRadius * 2 + 20) + heightAvail + 20) + ')');
        });
    }

    function pieDraw(pies, source) {
        var format = d3.format('.2%');
        var layout = d3.layout.pie()
                .value(function(d) {
                    return d.y;
                });
        var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(function(d) {
                    return (d.value - d.extent[0]) / (d.extent[1] - d.extent[0]) * (outerRadius - innerRadius) * .4 + (outerRadius - innerRadius) * .6 + innerRadius;
                });
        pies.enter()
                .append('svg:g')
                .classed('pie', true)
                .each(function(d, i) {
                    var arcs = d3.select(this)
                            .datum(function() {
                                var extent = d3.extent(source.map(function(p) {
                                    return p.points[i].y;
                                }));
                                return source.map(function(p) {
                                    return {name: p.name, y: p.points[i].y, extent: extent};
                                });
                            })
                            .selectAll('path')
                            .data(layout);
                    arcs.exit()
                            .attr('opacity', 1)
                            .transition()
                            .duration(duration)
                            .attr('opacity', 0)
                            .remove();
                    arcs.enter()
                            .append('svg:path')
                            .attr('fill', function(p) {
                                return color(p.data.name);
                            })
                            .attr('opacity', 0)
                            .on('mouseover', function(p) {
                                drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, true);
                            })
                            .on('mouseout', function(p) {
                                drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, false);
                            })
                            .transition()
                            .duration(duration)
                            .attrTween('d', function(p) {
                                var q = d3.interpolate(p.startAngle, p.endAngle);
                                return function(t) {
                                    return  arc({startAngle: p.startAngle, endAngle: q(t), extent: p.data.extent, value: p.value});
                                };
                            })
                            .attr('opacity', 1)
                            .attr('data-startAngle', function(p) {
                                return p.startAngle;
                            })
                            .attr('data-endAngle', function(p) {
                                return p.endAngle;
                            });
                    d3.select(this)
                            .append('svg:text')
                            .append('svg:tspan')
                            .transition()
                            .duration(duration)
                            .attr({x: 10, y: 5})
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': pieFontSize,
                            })
                            .text(d);
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .attr('transform', 'translate(' + ((i % 4 + .5) * (outerRadius * 2 + 20) - 30) + ',' + ((Math.round(i / 4 - .5) + .5) * (outerRadius * 2 + 20) + heightAvail + 20) + ')');
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
                            combo.render();
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
                        combo.render();
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

    function axis(g, xAxis, yAxis0, yAxis1) {
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
        g.select('.y-axis-bar')
                .each(function() {
                    d3.select(this)
                            .select('.label')
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .text(yLegendBar);
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
                            .text(yLegendBar);
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(yAxis0)
                            .selectAll('.tick text')
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': tickTextSize,
                                'fill': tickTextColor});
                });
        g.select('.y-axis-line')
                .attr({'transform': 'translate(' + widthAvail + ',0)'})
                .each(function() {
                    d3.select(this)
                            .select('.label')
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor
                            })
                            .text(yLegendLine);
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
                            .text(yLegendLine);
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(yAxis1)
                            .selectAll('.tick text')
                            .style({'text-anchor': 'start',
                                'font-family': fontFamily,
                                'font-size': tickTextSize,
                                'fill': tickTextColor});
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
    }

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': color(d.name),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            })
                    .html('name: <b>' + d.name + '</b><br/>value: <b>' + d.y + '</b>');
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    combo.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in pie.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    combo.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in pie.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    combo.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in pie.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    combo.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in pie.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontFamily = arguments[0];
                return this;
            }
        }
    };

    combo.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in pie.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    combo.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in pie.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    combo.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in pie.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    combo.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in pie.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    combo.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in pie.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    combo.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in pie.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    combo.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in pie.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    combo.outerRadius = function(_) {
        if (!arguments.length)
            return outerRadius;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in pie.outerRadius(outerRadius) should be number of');
                return this;
            } else {
                outerRadius = Math.round(arguments[0]);
                return this;
            }
        }
    };

    combo.innerRadius = function(_) {
        if (!arguments.length)
            return innerRadius;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in pie.innerRadius(innerRadius) should be number');
                return this;
            } else {
                innerRadius = Math.round(arguments[0]);
                return this;
            }
        }
    };


    combo.xLegend = function(_) {
        if (!arguments.length)
            return xLegend;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.xLegend(xLegend) should be string');
                return this;
            } else {
                xLegend = arguments[0];
                return this;
            }
        }
    };

    combo.yLegendBar = function(_) {
        if (!arguments.length)
            return yLegendBar;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegendBar = arguments[0];
                return this;
            }
        }
    };

    combo.yLegendLine = function(_) {
        if (!arguments.length)
            return yLegendLine;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.yLegend(yLegend) should be string');
                return this;
            } else {
                yLegendLine = arguments[0];
                return this;
            }
        }
    };

    combo.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    combo.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    combo.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    combo.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    combo.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    combo.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    combo.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    combo.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    combo.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    combo.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in combo.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    combo.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    combo.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in combo.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    combo.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    combo.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }

        return combo;
    };

    combo.minTickLine = function(_) {
        if (!arguments.length)
            return minTickLine;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.minTickLine(minTickLine) should be number of text');
                return this;
            } else {
                minTickLine = arguments[0];
                return this;
            }
        }

        return combo;
    };

    combo.maxTickLine = function(_) {
        if (!arguments.length)
            return maxTickLine;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.maxTickLine(maxTickLine) should be number of text');
                return this;
            } else {
                maxTickLine = arguments[0];
                return this;
            }
        }

        return combo;
    };

    combo.minTickBar = function(_) {
        if (!arguments.length)
            return minTickBar;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.minTickBar(minTickBar) should be number of text');
                return this;
            } else {
                minTickBar = arguments[0];
                return this;
            }
        }

        return combo;
    };

    combo.maxTickBar = function(_) {
        if (!arguments.length)
            return maxTickBar;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.maxTickBar(maxTickBar) should be number of text');
                return this;
            } else {
                maxTickBar = arguments[0];
                return this;
            }
        }

        return combo;
    };

    combo.pieFontSize = function(_) {
        if (!arguments.length)
            return pieFontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.pieFontSize(pieFontSize) should be number of text');
                return this;
            } else {
                pieFontSize = arguments[0];
                return this;
            }
        }
    };

    combo.interpolate = function(_) {
        if (!arguments.length)
            return interpolate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.interpolate(interpolate) should be text');
                return this;
            } else {
                interpolate = arguments[0];
                return this;
            }
        }
    };

    combo.tension = function(_) {
        if (!arguments.length)
            return tension;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.tension(tension) should be number of 0 ~ `');
                return this;
            } else {
                tension = arguments[0];
                return this;
            }
        }
    };

    combo.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.padding(padding) should be number of 0 ~ `');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    combo.barOpacity = function(_) {
        if (!arguments.length)
            return barOpacity;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in combo.barOpacity(barOpacity) should be number of 0 ~ `');
                return this;
            } else {
                barOpacity = arguments[0];
                return this;
            }
        }
    };

    combo.options = function(_) {
        if (!arguments.length)
            return {
                'type': combo.getType(),
                'width': width,
                'height': height,
                'widthAvail': widthAvail,
                'heightAvail': heightAvail,
                'tranX': tranX,
                'tranY': tranY,
                'maxTickBar': maxTickBar,
                'minTickBar': minTickBar,
                'maxTickLine': maxTickLine,
                'minTickLine': minTickLine,
                'format': format,
                'pieFontSize': pieFontSize,
                'ytickNumber': ytickNumber,
                'fontFamily': fontFamily,
                'barOpacity': barOpacity,
                'xtickRotate': xtickRotate,
                'yLegendBar': yLegendBar,
                'yLegendLine': yLegendLine,
                'color': color,
                'interpolate': interpolate,
                'tension': tension,
                'duration': duration,
                'legendColor': legendColor,
                'legendSize': legendSize,
                'legendTranX': legendTranX,
                'legendTranY': legendTranY,
                'legendColumnNo': legendColumnNo,
                'legendRowGap': legendRowGap};
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
            _.format && combo.tickFormat(_.format);
            _.fontFamily && combo.fontFamily(_.fontFamily);
            isFinite(_.pieFontSize) && combo.pieFontSize(_.pieFontSize);
            isFinite(_.ytickNumber) && combo.ytickNumber(_.ytickNumber);
            isFinite(_.barOpacity) && combo.barOpacity(_.barOpacity);
            isFinite(_.xtickRotate) && combo.xtickRotate(_.xtickRotate);
            _.yLegendBar && combo.yLegendBar(_.yLegendBar);
            _.yLegendLine && combo.yLegendLine(_.yLegendLine);
            _.xLegend && combo.xLegend(_.xLegend);
            isFinite(_.tension) && combo.tension(_.tension);
            _.interpolate && combo.interpolate(_.interpolate);
            isFinite(_.fontSize) && combo.fontSize(_.fontSize);
            isFinite(_.duration) && combo.duration(_.duration);
            _.legendColor && combo.legendColor(_.legendColor);
            isFinite(_.legendSize) && combo.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && combo.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && combo.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        combo.options(arguments[0]);
    return combo;
};
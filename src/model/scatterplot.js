/**
 * 三电2矩阵图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.scatterplot = function() {
    var scatterplot = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '散点矩阵'; //类型
    var width = 800; // 宽度
    var height = 800; // 高度
    var widthAvail = width - 150; // 实际利用宽度
    var heightAvail = height - 100; // 实际利用高度
    var tranX = 20; //图形右移距离
    var tranY = 20; //图形下移距离
    var data; //数据
    var fontFamily = 'Arial'; // 字体样式
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('.3s');
    var color = scatterplot.color();

    /************局部变量***************/
    var radius;
    var nodesize = 2;
    var dimension;
    var padding = .05;
    var gap;

    /******坐标轴******/
    var xtickRotate = 0;
    var ytickRotate = 0;
    var tickNumber = 5;
    var tickTextSize = 8;
    var tickTextColor = '#929292';
    var tickLineColor = '#929292';
    var labelSize = 8;
    var labelColor = 'normal';

    /******图例******/
    var legendColor = '#000';
    var legendSize = 13;
    var legendTranX = 0;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    scatterplot.data = function(_) {
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

    scatterplot.getType = function() {
        return type;
    };

    scatterplot.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            scatterplot.log({priority: 'Error', position: 'scatterplot',
                info: 'The argument(element) in scatterplot.rander(_) should be <div> element'});
            console.error('The argument(element) in scatterplot.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('scatterplot', true)
                .node();

        /* 初始化变量 */
        var dimen = dimension.filter(function(d) {
            return d._flag;
        });
        radius = d3.min([widthAvail, heightAvail]) / dimen.length;
        gap = padding * radius;

        var x = {};
        var y = {};

        dimen.forEach(function(d) {
            x[d.name] = d3.scale.linear()
                    .domain(d.extent)
                    .range([gap / 2, radius - gap / 2]);
            y[d.name] = d3.scale.linear()
                    .domain(d.extent)
                    .range([radius - gap / 2, gap / 2]);
        });

        var axis = d3.svg.axis()
                .ticks(tickNumber)
                .tickSize(radius * dimen.length);
        // Brush.
        var brush = d3.svg.brush()
                .on('brushstart', brushstart)
                .on('brush', brush)
                .on('brushend', brushend);

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
            selection.append('svg:g')
                    .classed('labels', true);
        });
        g = d3.select(svg).select('g');

        var labels = g.select('.labels')
                .selectAll('.label')
                .data(dimen);

        labels.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        labelUpdate(labels);
        labelDraw(labels);

        var dimensions = g.select('.dimensions')
                .selectAll('.dimension')
                .data(cross(dimen, dimen));

        dimensions.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        dimensions.each(function(p) {
            var cell = d3.select(this);
            cell.transition()
                    .duration(duration)
                    .attr('transform', function(d) {
                        return 'translate(' + d.i * radius + ',' + d.j * radius + ')';
                    });

            cell.select('.frame')
                    .attr({'x': gap / 2,
                        'y': gap / 2,
                        'width': radius - gap,
                        'height': radius - gap
                    });

            var circles = cell.selectAll('circle')
                    .data(data);

            circles.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            circles
                    .attr('class', function(d) {
                        return d.species;
                    })
                    .transition()
                    .duration(duration)
                    .attr('fill', function(d) {
                        return color(d.species);
                    })
                    .attr('cx', function(d) {
                        return x[p.x.name](d[p.x.name]);
                    })
                    .attr('cy', function(d) {
                        return y[p.y.name](d[p.y.name]);
                    });

            circles.enter()
                    .append('svg:circle')
                    .attr('class', function(d) {
                        return d.species;
                    })
                    .attr('fill', function(d) {
                        return color(d.species);
                    })
                    .attr('cx', function(d) {
                        return x[p.x.name](d[p.x.name]);
                    })
                    .attr('cy', function(d) {
                        return y[p.y.name](d[p.y.name]);
                    })
                    .attr('r', nodesize);

            cell.call(brush.x(x[p.x.name]).y(y[p.y.name]));
        });


        dimensions.enter()
                .append('svg:g')
                .classed('dimension', true)
                .attr('transform', function(d) {
                    return 'translate(' + d.i * radius + ',' + d.j * radius + ')';
                })
                .each(function(p) {
                    var cell = d3.select(this);
                    cell.append('svg:rect')
                            .classed('frame', true)
                            .attr({'x': gap / 2,
                                'y': gap / 2,
                                'width': radius - gap,
                                'height': radius - gap,
                                'fill': 'none',
                                'stroke': '#444444',
                                'stroke-width': '1px'
                            });

                    cell.selectAll('circle')
                            .data(data)
                            .enter()
                            .append('svg:circle')
                            .attr('class', function(d) {
                                return d.species;
                            })
                            .attr('fill', function(d) {
                                return color(d.species);
                            })
                            .attr('cx', function(d) {
                                return x[p.x.name](d[p.x.name]);
                            })
                            .attr('cy', function(d) {
                                return y[p.y.name](d[p.y.name]);
                            })
                            .attr('r', nodesize);
                    cell.call(brush.x(x[p.x.name]).y(y[p.y.name]));
                });

        g.select('.dimensions')
                .selectAll('.dimension')
                .selectAll('.extent')
                .style({
                    'fill': '#000',
                    'fill-opacity': .1,
                    'stroke': '#fff'
                });

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


        axisDraw(g, axis, x, y, dimen);

        function brushstart(p) {
            if (brush.data !== p) {
                dimensions.call(brush.clear());
                brush.x(x[p.x.name]).y(y[p.y.name]).data = p;
            }
        }

        function brush(p) {
            var e = brush.extent();
            g.select('.dimensions')
                    .selectAll('.dimension')
                    .selectAll('circle')
                    .attr('class', function(d) {
                        return e[0][0] <= d[p.x.name] && d[p.x.name] <= e[1][0]
                                && e[0][1] <= d[p.y.name] && d[p.y.name] <= e[1][1]
                                ? d.species : 'none';
                    })
                    .attr('fill', function(d) {
                        return  d3.select(this).classed('none') ?
                                '#AAAAAA' : color(d.species);
                    });
        }

        function brushend() {
            if (brush.empty())
                g.select('.dimensions')
                        .selectAll('.dimension')
                        .selectAll('circle')
                        .attr('class', function(d) {
                            return d.species;
                        })
                        .attr('fill', function(d) {
                            return color(d.species);
                        });
        }
    };

    function labelUpdate(labels) {
        labels.each(function(d, i) {
            d3.select(this)
                    .select('.x')
                    .text(d.name)
                    .transition()
                    .duration(duration)
                    .attr('transform', 'translate(' + (i + .5) * radius + ',0)')
                    .style({'text-anchor': 'middle',
                        'fill': labelColor,
                        'font-family': fontFamily,
                        'font-size': labelSize});

            d3.select(this)
                    .select('.y')
                    .text(d.name)
                    .transition()
                    .duration(duration)
                    .attr('transform', 'translate(-5,' + (i + .5) * radius + ')rotate(-90)')
                    .style({'text-anchor': 'middle',
                        'fill': labelColor,
                        'font-family': fontFamily,
                        'font-size': labelSize});
        });
    }

    function labelDraw(labels) {
        labels.enter()
                .append('svg:g')
                .classed('label', true)
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:text')
                            .classed('x', true)
                            .text(d.name)
                            .attr('transform', 'translate(' + (i + .5) * radius + ',0)')
                            .style({'text-anchor': 'middle',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor});


                    d3.select(this)
                            .append('svg:text')
                            .classed('y', true)
                            .text(d.name)
                            .attr('transform', 'translate(-5,' + (i + .5) * radius + ')rotate(-90)')
                            .style({'text-anchor': 'middle',
                                'font-family': fontFamily,
                                'font-size': labelSize,
                                'fill': labelColor});

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
                            scatterplot.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;

                        scatterplot.render();
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

    function axisDraw(g, axis, x, y, dimen) {
        var ax = g.select('.x-axis')
                .selectAll('.x')
                .data(dimen);

        ax.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        ax.transition()
                .duration(duration)
                .attr('transform', function(d, i) {
                    return 'translate(' + i * radius + ',0)';
                })
                .each(function(d) {
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(axis.scale(x[d.name]).orient('bottom'));
                });

        ax.enter()
                .append('svg:g')
                .classed('x', true)
                .attr('transform', function(d, i) {
                    return 'translate(' + i * radius + ',0)';
                })
                .each(function(d) {
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(axis.scale(x[d.name]).orient('bottom'));
                });

        var ay = g.select('.y-axis')
                .selectAll('.y')
                .data(dimen);

        ay.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        ay.transition()
                .duration(duration)
                .attr('transform', function(d, i) {
                    return 'translate(0,' + i * radius + ')';
                })
                .each(function(d) {
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(axis.scale(y[d.name]).orient('right'));
                });

        ay.enter()
                .append('svg:g')
                .classed('y', true)
                .attr('transform', function(d, i) {
                    return 'translate(0,' + i * radius + ')';
                })
                .each(function(d) {
                    d3.select(this)
                            .transition()
                            .duration(duration)
                            .call(axis.scale(y[d.name]).orient('right'));
                });

        g.selectAll('.axis')
                .call(function(selection) {
                    selection
                            .style('shape-rendering', 'crispEdges')
                            .selectAll('path')
                            .style('display', 'none');

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
                    return 'rotate(' + ytickRotate + ')';
                });
    }

    function cross(a, b) {
        var c = [], n = a.length, m = b.length, i, j;
        for (i = - 1; ++i < n; )
            for (j = - 1; ++j < m; )
                c.push({x: a[i], i: i, y: b[j], j: j});
        return c;
    }

    scatterplot.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in scatterplot.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    scatterplot.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in scatterplot.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    scatterplot.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in scatterplot.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    scatterplot.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in scatterplot.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    scatterplot.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    scatterplot.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in scatterplot.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    scatterplot.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in scatterplot.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    scatterplot.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in scatterplot.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    scatterplot.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    scatterplot.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in scatterplot.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    scatterplot.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    scatterplot.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    scatterplot.xtickRotate = function(_) {
        if (!arguments.length)
            return xtickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.xtickRotate(xtickRotate) should be number of tick');
                return this;
            } else {
                xtickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    scatterplot.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    scatterplot.labelSize = function(_) {
        if (!arguments.length)
            return labelSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.labelSize(labelSize) should be string');
                return this;
            } else {
                labelSize = arguments[0];
                return this;
            }
        }
    };

    scatterplot.labelColor = function(_) {
        if (!arguments.length)
            return labelColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in scatterplot.labelColor(labelColor) should be string');
                return this;
            } else {
                labelColor = arguments[0];
                return this;
            }
        }
    };

    scatterplot.tickNumber = function(_) {
        if (!arguments.length)
            return tickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.tickNumber(tickNumber) should be number of tick');
                return this;
            } else {
                tickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    scatterplot.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in scatterplot.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    scatterplot.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    scatterplot.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in scatterplot.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    scatterplot.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    scatterplot.radius = function(_) {
        if (!arguments.length)
            return nodesize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in scatterplot.radius(radius) should be number');
                return this;
            } else {
                nodesize = arguments[0];
                return this;
            }
        }
    };

    scatterplot.options = function(_) {
        if (!arguments.length)
            return {
                'type': scatterplot.getType(),
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
                'radius': nodesize,
                'padding': padding,
                'xtickRotate': xtickRotate,
                'ytickRotate': ytickRotate,
                'labelSize': labelSize,
                'labelColor': labelColor,
                'tickNumber': tickNumber,
                'tickTextSize': tickTextSize,
                'tickTextColor': tickTextColor,
                'tickLineColor': tickLineColor,
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
            _.format && scatterplot.tickFormat(_.format);
            _.fontFamily && scatterplot.fontFamily(_.fontFamily);
            isFinite(_.duration) && scatterplot.duration(_.duration);

            isFinite(_.padding) && scatterplot.padding(_.padding);
            isFinite(_.radius) && scatterplot.radius(_.radius);

            isFinite(_.xtickRotate) && scatterplot.xtickRotate(_.xtickRotate);
            isFinite(_.ytickRotate) && scatterplot.ytickRotate(_.ytickRotate);
            isFinite(_.labelSize) && scatterplot.labelSize(_.labelSize);
            _.labelColor && scatterplot.labelColor(_.labelColor);
            isFinite(_.tickNumber) && scatterplot.tickNumber(_.tickNumber);
            isFinite(_.tickTextSize) && scatterplot.tickTextSize(_.tickTextSize);
            _.tickTextColor && scatterplot.tickTextColor(_.tickTextColor);
            _.tickLineColor && scatterplot.tickLineColor(_.tickLineColor);

            _.legendColor && scatterplot.legendColor(_.legendColor);
            isFinite(_.legendSize) && scatterplot.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && scatterplot.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && scatterplot.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        scatterplot.options(arguments[0]);
    return scatterplot;
};
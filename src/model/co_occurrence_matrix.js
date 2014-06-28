    /**
     * 贡献矩阵
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.co_occurrence_matrix = function() {
        var co_occurrence_matrix = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '贡献矩阵'; //类型
        var width = 800; // 宽度
        var height = 800; // 高度
        var widthAvail = width - 100; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 99; //图形右移距离
        var tranY = 99; //图形下移距离
        var data; //数据
        var floatTag; // 活动标签
        var fontSize = 8; //字体大小
        var fontColor = '#000000'; //颜色
        var fontFamily = 'sans-serif'; // 字体样式
        var div; // 外层div
        var svg; // 外层svg
        var duration = 2000; // 变化时间
        var format = d3.format('s');
        var color = co_occurrence_matrix.color();

        /************局部变量***************/
        var gradientColor = ['#00FF00', '#ff0000'];
        var max;
        var min;
        var orders;

        co_occurrence_matrix.data = function(_) {
            if (arguments.length) {
                if (_.type === 'xml') {
                    _ = _.root;
                    _ = XMLdata(_);
                }
                var index = d3.map();
                _.nodes.forEach(function(d, i) {
                    d.index = i;
                    d.links = d3.range(_.nodes.length).map(function(j) {
                        return {index: j, value: null};
                    });
                    d.links[i].value = -1;
                    index.set(d.name, d);
                });
                max = -Infinity;
                min = Infinity;
                _.links.forEach(function(d) {
                    var source = index.get(d.source);
                    var target = index.get(d.target);
                    if (source && target) {
                        max = Math.max(max, d.value);
                        min = Math.min(min, d.value);
                        source.links[target.index].value = d.value;
                        target.links[source.index].value = d.value;
                    }
                });
                data = _.nodes;
                data.index = index;
                window.data = _;
                return this;
            } else
                return data;
        };

        co_occurrence_matrix.getType = function() {
            return type;
        };

        co_occurrence_matrix.render = function(_) {
            /* 获取外层的标签 */
            co_occurrence_matrix.div = div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                alert('The argument(element) in graph.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('co_occurrence_matrix', true)
                    .node();

            floatTag = d3.select(div)
                    .select('.floatTag')
                    .node() ?
                    d3.select(div)
                    .select('.floatTag') :
                    co_occurrence_matrix.floatTag(div); //绘图元素的外容器，添加动态标签

            var g = d3.select(svg)
                    .attr({'width': width,
                        'height': height})
                    .selectAll('g')
                    .data([1])
                    .enter()
                    .append('svg:g')
                    .attr('transform', 'translate(' + tranX + ',' + tranY + ')');

            g.call(function(selection) {
                selection.append('rect')
                        .classed('background', true);
                selection.append('svg:g')
                        .classed('rows', true);
                selection.append('svg:g')
                        .classed('columns', true);
            });
            g = d3.select(svg)
                    .select('g');

            g.select('.background')
                    .attr({'width': widthAvail,
                        'height': heightAvail,
                        'fill': '#eee'});

            var x = d3.scale.ordinal().rangeBands([0, widthAvail]);
            var h = d3.scale.linear().domain([min, max]).range(gradientColor);

            orders = {
                name: d3.range(data.length).sort(function(a, b) {
                    return d3.ascending(data[a].name, data[b].name);
                }),
                value: d3.range(data.length).sort(function(a, b) {
                    return data[b].value - data[a].value;
                }),
                group: d3.range(data.length).sort(function(a, b) {
                    return data[b].group - data[a].group;
                })
            };

            this.orders = d3.keys(orders);
            // 默认排序
            x.domain(orders.name);

            var rows = g.select('.rows')
                    .selectAll('.row')
                    .data(data);
            rows.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            rowsUpdate(rows, x, h);
            rowsDraw(rows, x, h);

            var columns = g.select('.columns')
                    .selectAll('.column')
                    .data(data);
            columns.exit()
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .remove();

            columnsUpdate(columns, x);
            columnsDraw(columns, x);

            this.makeOrder = function(value) {
                x.domain(orders[value]);
                var t = g.transition()
                        .duration(duration);

                t.selectAll('.row')
                        .delay(function(d, i) {
                            return x(i) * 4;
                        })
                        .attr('transform', function(d) {
                            return 'translate(0,' + x(d.index) + ')';
                        })
                        .selectAll('.cell')
                        .delay(function(d, i) {
                            return x(i) * 4;
                        })
                        .attr('x', function(d) {
                            return x(d.index);
                        });

                t.selectAll('.column')
                        .delay(function(d, i) {
                            return x(i) * 4;
                        })
                        .attr('transform', function(d) {
                            return 'translate(' + x(d.index) + ')rotate(-90)';
                        });
            };
            return co_occurrence_matrix;
        };

        function rowsUpdate(rows, x, h) {
            rows.each(function(d) {
                d3.select(this)
                        .select('line')
                        .transition()
                        .duration(500)
                        .attr('x2', widthAvail);

                d3.select(this)
                        .select('text')
                        .attr('y', x.rangeBand() / 2)
                        .transition()
                        .duration(500)
                        .style({'font-size': fontSize, 'font-family': fontFamily})
                        .text(function(d) {
                            return d.name;
                        });

                var cell = d3.select(this)
                        .selectAll('.cell')
                        .data(d.links.filter(function(p) {
                            return p.value;
                        }));

                cell.exit()
                        .transition()
                        .duration(500)
                        .style('opacity', 0)
                        .remove();

                cell.transition()
                        .duration(500)
                        .attr('width', x.rangeBand())
                        .attr('height', x.rangeBand())
                        .attr('fill', function(p) {
                            return p.value === -1 ? color(p.value) : h(p.value);
                        })
                        .attr('x', function(p) {
                            return x(p.index);
                        });

                cell.enter()
                        .append('svg:rect')
                        .classed('cell', true)
                        .attr('width', x.rangeBand())
                        .attr('height', x.rangeBand())
                        .attr('fill', function(p) {
                            return p.value === -1 ? color(p.value) : h(p.value);
                        })
                        .attr('x', function(p) {
                            return x(p.index);
                        })
                        .on('mouseover', function(p) {
                            d3.selectAll('.row text')
                                    .attr('fill', function(k, i) {
                                        return i === d.index ? '#ff0000' : null;
                                    });
                            d3.selectAll('.column text')
                                    .attr('fill', function(k, i) {
                                        return i === p.index ? '#ff0000' : null;
                                    });
                            drawLegend({value: p.value, color: h(p.value)}, true);
                        })
                        .on('mouseout', function() {
                            d3.selectAll('text').attr('fill', 'null');
                            drawLegend(null, false);
                        });

            }).transition()
                    .duration(duration / 2)
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr('transform', function(d) {
                        return 'translate(0,' + x(d.index) + ')';
                    });
        }
        function rowsDraw(rows, x, h) {
            rows.enter()
                    .append('svg:g')
                    .classed('row', true)
                    .attr('fill-opacity', 0)
                    .each(function(d) {
                        d3.select(this)
                                .append('svg:line')
                                .attr({'x2': widthAvail,
                                    'stroke': '#fff'});

                        d3.select(this)
                                .append('svg:text')
                                .attr('x', -6)
                                .attr('y', x.rangeBand() / 2)
                                .attr('dy', '.32em')
                                .attr('text-anchor', 'end')
                                .style({'font-size': fontSize, 'font-family': fontFamily})
                                .text(function(d) {
                                    return d.name;
                                });
                        d3.select(this)
                                .selectAll('.cell')
                                .data(d.links.filter(function(p) {
                                    return p.value;
                                }))
                                .enter()
                                .append('svg:rect')
                                .classed('cell', true)
                                .attr('width', x.rangeBand())
                                .attr('height', x.rangeBand())
                                .attr('fill', function(p) {
                                    return p.value === -1 ? color(p.value) : h(p.value);
                                })
                                .attr('x', function(p) {
                                    return x(p.index);
                                })
                                .on('mouseover', function(p) {
                                    d3.selectAll('.row text')
                                            .attr('fill', function(k, i) {
                                                return i === d.index ? '#ff0000' : null;
                                            });
                                    d3.selectAll('.column text')
                                            .attr('fill', function(k, i) {
                                                return i === p.index ? '#ff0000' : null;
                                            });
                                    drawLegend({value: p.value, color: h(p.value)}, true);
                                })
                                .on('mouseout', function() {
                                    d3.selectAll('text').attr('fill', 'null');
                                    drawLegend(null, false);
                                });
                    })
                    .transition()
                    .duration(duration / 2)
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr('fill-opacity', 1)
                    .attr('transform', function(d) {
                        return 'translate(0,' + x(d.index) + ')';
                    });
        }

        function columnsUpdate(columns, x) {
            columns.transition()
                    .duration(500)
                    .attr('transform', function(d) {
                        return 'translate(' + x(d.index) + ')rotate(-90)';
                    })
                    .call(function(selection) {
                        selection.select('line')
                                .transition()
                                .duration(500)
                                .attr({'x1': -width,
                                    'stroke': '#fff'});
                        selection.select('text')
                                .transition()
                                .duration(500)
                                .attr('y', x.rangeBand() / 2)
                                .style({'font-size': fontSize, 'font-family': fontFamily})
                                .text(function(d) {
                                    return d.name;
                                });
                    });
        }
        function columnsDraw(columns, x) {
            columns.enter()
                    .append('svg:g')
                    .classed('column', true)
                    .attr('transform', function(d) {
                        return 'translate(' + x(d.index) + ')rotate(-90)';
                    })
                    .call(function(selection) {
                        selection.append('svg:line')
                                .attr({'x1': -width,
                                    'stroke': '#fff'});
                        selection.append('svg:text')
                                .attr('x', 6)
                                .attr('y', x.rangeBand() / 2)
                                .attr('dy', '.32em')
                                .attr('text-anchor', 'start')
                                .style({'font-size': fontSize, 'font-family': fontFamily})
                                .text(function(d) {
                                    return d.name;
                                });
                    });
        }

        function drawLegend(d, style) {
            if (style) {
                floatTag.style({
                    'border-color': d.color,
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                }).html('<span style="color:#3f7ed8; font-weight:bold; font-size:11px;margin-bottom:5px;">value: ' + format(d.value) + '</span>');
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        function XMLdata(d) {
            if (typeof d === 'object' && d.constructor === Array) {
                var nodes;
                var links;
                var value;
                d.forEach(function(p) {
                    if (p.nodes !== undefined) {
                        var name;
                        var group;
                        nodes = p.nodes
                                .nodes
                                .map(function(k) {
                                    k.node.node.forEach(function(q) {
                                        if (q.name !== undefined)
                                            name = q.name;
                                        if (q.value !== undefined)
                                            value = q.value;
                                        if (q.group !== undefined)
                                            group = q.group;
                                    });
                                    return {name: name,
                                        value: value,
                                        group: group};
                                });
                    } else if (p.links !== undefined) {
                        var target;
                        var source;
                        var value;
                        links = p.links
                                .links
                                .map(function(k) {
                                    k.link.link.forEach(function(q) {
                                        if (q.target !== undefined)
                                            target = q.target;
                                        if (q.source !== undefined)
                                            source = q.source;
                                        if (q.value !== undefined)
                                            value = q.value;
                                    });
                                    return {source: source,
                                        target: target,
                                        value: value};
                                });
                    }
                });
                return {nodes: nodes, links: links};
            }
        }

        co_occurrence_matrix.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in co_occurrence_matrix.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in co_occurrence_matrix.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            } else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in co_occurrence_matrix.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in co_occurrence_matrix.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        co_occurrence_matrix.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in co_occurrence_matrix.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        co_occurrence_matrix.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in co_occurrence_matrix.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        co_occurrence_matrix.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in co_occurrence_matrix.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };
        co_occurrence_matrix.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in co_occurrence_matrix.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        co_occurrence_matrix.gradientColor = function(_) {
            if (!arguments.length)
                return gradientColor;
            else if (arguments.length !== 2
                    || typeof arguments[0] !== 'string'
                    || typeof arguments[1] !== 'string') {
                console.error('The argument(element) in co_occurrence_matrix.gradientColor(start, end) should be string and string of color');
                return this;
            }
            else {
                gradientColor[0] = arguments[0];
                gradientColor[1] = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.options = function(_) {
            if (!arguments.length)
                return {
                    'type': co_occurrence_matrix.getType(), 'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format, 'fontSize': fontSize,
                    'fontColor': fontColor,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'gradientColor': gradientColor
                };
            else if (typeof _ !== 'object') {
                console.error('The arguments in co_occurrence_matrix.options(options) should be object');
                return this;
            } else {
                width = isFinite(_.width) ? _.width : width;
                height = isFinite(_.height) ? _.height : height;
                widthAvail = isFinite(_.widthAvail) ? _.widthAvail : widthAvail;
                heightAvail = isFinite(_.heightAvail) ? _.heightAvail : heightAvail;
                tranX = isFinite(_.tranX) ? _.tranX : tranX;
                tranY = isFinite(_.tranY) ? _.tranY : tranY;
                _.format && co_occurrence_matrix.tickFormat(_.format);
                _.fontFamily && co_occurrence_matrix.fontFamily(_.fontFamily);
                isFinite(_.fontSize) && co_occurrence_matrix.fontSize(_.fontSize);
                isFinite(_.duration) && co_occurrence_matrix.duration(_.duration);
                typeof _.gradientColor === 'object'
                        && _.gradientColor.constructor === Array
                        && _.gradientColor.length === 2
                        && co_occurrence_matrix.gradientColor(_.gradientColor[0], _.gradientColor[1]);
                return this;
            }
        };

        if (arguments.length === 1)
            co_occurrence_matrix.options(arguments[0]);
        return co_occurrence_matrix;
    };
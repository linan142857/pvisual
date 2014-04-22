/**
 * 雷达图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.radar = function() {
    var radar = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '雷达图'; //类型
    var width = 700; // 宽度
    var height = 700; // 高度
    var widthAvail = width; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var data; //数据
    var fontSize = 10; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var fontColor = '#737373'; //颜色
    var legendSize = 13; // 图例文字大小
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('.2s'); // 格式函数
    var color = radar.color();

    /************局部变量***************/
    var radius; // 雷达图半径
    var maxValue; // 数据最大值
    var allAxis; //数据属性数量
    var segs = 6; // 划分层次数量
    var gridColor = 'grey';
    var tickTextSize = 8;
    var tickTextColor = '#929292';
    var axisPathWidth = 1;
    var axisPathColor = '#CCCCCC';

    /******图例******/
    var legendColor = '#000000';
    var legendSize = 13;
    var legendTranX = 0;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    radar.data = function(_) {
        if (arguments.length) {
            if (_.type === 'csv' || _.type === 'tsv') {
                _ = _.map(function(d) {
                    var data = [];
                    data = pvisual.keys(d)
                            .filter(function(p) {
                                return p !== 'name';
                            })
                            .map(function(p) {
                                return {axis: p, value: +d[p]};
                            });
                    return {name: d.name, data: data};
                });
            } else if (_.type === 'xml') {
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
            } else if (_.type === 'xlsx' || _.type === 'xls') {
                var s = [];
                for (var i = 0; i < _.length; i++) {
                    var k = pvisual.keys(_[i])[0];
                    s = s.concat(_[i][k]);
                }
                _ = s;
                _ = _.map(function(d) {
                    var data = [];
                    data = pvisual.keys(d)
                            .filter(function(p) {
                                return p !== 'name';
                            })
                            .map(function(p) {
                                return {axis: p, value: +d[p]};
                            });
                    return {name: d.name, data: data};
                });
            }

            _.forEach(function(d) {
                d._flag = true;
            });
            data = _;
            return this;
        } else
            return data;
    };

    radar.getType = function() {
        return type;
    };

    radar.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in radar.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('radar', true)
                .node();

        /* 计算要需的数据值 */
        radius = Math.min(widthAvail, heightAvail) * .4;

        maxValue = d3.max(data, function(d) {
            if (d._flag)
                return d3.max(d.data.map(function(p) {
                    return p.value;
                }));
            else
                return 0;
        });

        allAxis = d3.set();

        data.forEach(function(d) {
            d.data.forEach(function(p) {
                allAxis.add(p.axis);
            });
        });

        allAxis = allAxis.values();

        data.forEach(function(d) {
            d.data.forEach(function(p) {
                p.index = allAxis.indexOf(p.axis);
            });
        });

        data.forEach(function(d) {
            d.data.forEach(function(p) {
                p.position = [widthAvail / 2 - radius * ((parseFloat(
                            Math.max(p.value, 0)) / maxValue) *
                            Math.sin(p.index * 2 * Math.PI / allAxis.length)),
                    heightAvail / 2 - radius * ((parseFloat(
                            Math.max(p.value, 0)) / maxValue) *
                            Math.cos(p.index * 2 * Math.PI / allAxis.length))];
            });
        });

        /* 建立层次模型 */
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
                    .classed('levels', true); // 网格线
            selection.append('svg:g')
                    .classed('ticks', true); //刻度
            selection.append('svg:g')
                    .classed('items', true); //数据项
            selection.append('svg:g')
                    .classed('axises', true); //坐标
            selection.append('svg:g')
                    .classed('legends', true); // 图例
        });
        g = d3.select(svg)
                .select('g');

        /* 绘制数据点 */
        var items = g.select('.items')
                .selectAll('.item')
                .data(data.filter(function(d) {
                    return d._flag;
                }));
        items.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();
        var tooltip = g.select('.items')
                .selectAll('.mark')
                .data([1])
                .enter()
                .append('svg:text')
                .classed('mark', true)
                .style({'opacity': 0,
                    'font-family': fontFamily,
                    'fill': fontColor,
                    'font-size': fontSize});
        dataUpdate(items, tooltip);
        dataDraw(items, tooltip);

        /* 绘制网格线 */
        var loops = g.select('.levels')
                .selectAll('.level')
                .data(d3.range(segs));
        loops.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();
        loopsUpdate(loops);
        loopsDraw(loops);

        /* 绘制刻度 */
        var ticks = g.select('.ticks')
                .selectAll('.tick')
                .data(d3.range(segs));
        ticks.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();
        ticksUpdate(ticks);
        ticksDraw(ticks);

        /* 绘制坐标轴 */
        var axises = g.select('.axises')
                .selectAll('.axis')
                .data(allAxis);
        axises.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();
        axisesUpdate(axises);
        axisesDraw(axises);

        /* 绘制图例 */
        var legends = g.select('.legends')
                .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                .selectAll('.legend')
                .data(data);
        legends.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();
        legendUpdate(legends);
        legendDraw(legends);
    };

    function dataDraw(items, tooltip) {
        var line = d3.svg.line()
                .x(function(d) {
                    return d.position[0];
                })
                .y(function(d) {
                    return d.position[1];
                });
        items.enter()
                .append('svg:g')
                .classed('item', true)
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:path')
                            .classed('radar', true)
                            .on('mouseover', function() {
                                var that = this;
                                items.selectAll('.radar')
                                        .each(function() {
                                            if (this !== that)
                                                d3.select(this)
                                                        .transition(200)
                                                        .style('fill-opacity', 0.1);
                                            else
                                                d3.select(that).transition(200)
                                                        .style('fill-opacity', .7);
                                        });
                            })
                            .on('mouseout', function() {
                                items.selectAll('.radar')
                                        .transition(200)
                                        .style('fill-opacity', .5);
                            })
                            .style({'stroke-width': '2px',
                                'fill-opacity': 0,
                                'stroke-opacity': 0,
                                'stroke': color(i),
                                'fill': color(i)})
                            .transition()
                            .duration(duration)
                            .style({'fill-opacity': .5,
                                'stroke-opacity': 1})
                            .attr('d', function() {
                                var p = radar.clone(d.data);
                                p.push(p[0]);
                                return line(p);
                            });
                    var node = d3.select(this)
                            .append('svg:g')
                            .classed('nodes', true)
                            .selectAll('.node')
                            .data(d.data);
                    node.exit()
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 0)
                            .remove();
                    node.enter().append('svg:circle')
                            .classed('node', true)
                            .style({'fill': color(i),
                                'fill-opacity': 0})
                            .on('mouseover', function(d) {
                                var that = this;
                                items.selectAll('.radar')
                                        .each(function() {
                                            if (this !== that)
                                                d3.select(this)
                                                        .transition(200)
                                                        .style('fill-opacity', 0.1);
                                            else
                                                d3.select(that)
                                                        .transition(200)
                                                        .style('fill-opacity', .7);
                                        });
                                tooltip.attr('x', parseFloat(d3.select(that).attr('cx')) - 10)
                                        .attr('y', parseFloat(d3.select(that).attr('cy')) - 5)
                                        .text(format(d.value))
                                        .transition(200)
                                        .style('opacity', 1);
                            })
                            .on('mouseout', function() {
                                items.selectAll('.radar')
                                        .transition(200)
                                        .style('fill-opacity', .5);
                                tooltip.transition(200)
                                        .style('opacity', 0);
                            })
                            .transition()
                            .duration(duration)
                            .style('fill-opacity', .9)
                            .attr('r', 4)
                            .attr('cx', function(d) {
                                return d.position[0];
                            })
                            .attr('cy', function(d) {
                                return d.position[1];
                            })
                            .attr('data-id', function(d) {
                                return d.axis;
                            });
                });
    }

    function dataUpdate(items, tooltip) {
        var line = d3.svg.line()
                .x(function(d) {
                    return d.position[0];
                })
                .y(function(d) {
                    return d.position[1];
                });
        items.each(function(d, i) {
            d3.select(this)
                    .selectAll('.radar')
                    .transition()
                    .duration(duration)
                    .style({'stroke': color(i),
                        'fill': color(i)})
                    .attr('d', function() {
                        var p = radar.clone(d.data);
                        p.push(p[0]);
                        return line(p);
                    });
            var node = d3.select(this)
                    .selectAll('.nodes')
                    .selectAll('.node')
                    .data(d.data);
            node.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            node.transition()
                    .duration(duration)
                    .style('fill', color(i))
                    .attr('r', 4)
                    .attr('cx', function(d) {
                        return d.position[0];
                    })
                    .attr('cy', function(d) {
                        return d.position[1];
                    })
                    .attr('data-id', function(d) {
                        return d.axis;
                    });
            node.enter()
                    .append('svg:circle')
                    .classed('node', true)
                    .style({'fill': color(i),
                        'fill-opacity': 0})
                    .on('mouseover', function(d) {
                        var that = this;
                        items.selectAll('.radar').each(function() {
                            if (this !== that)
                                d3.select(this)
                                        .transition(200)
                                        .style('fill-opacity', 0.1);
                            else
                                d3.select(that)
                                        .transition(200)
                                        .style('fill-opacity', .7);
                        });
                        tooltip.attr('x', parseFloat(d3.select(that).attr('cx')) - 10)
                                .attr('y', parseFloat(d3.select(that).attr('cy')) - 5)
                                .text(format(d.value))
                                .transition(200)
                                .style('opacity', 1);
                    })
                    .on('mouseout', function() {
                        items.selectAll('.radar')
                                .transition(200)
                                .style('fill-opacity', .5);
                        tooltip.transition(200)
                                .style('opacity', 0);
                    })
                    .transition()
                    .duration(duration)
                    .style('fill-opacity', .9)
                    .attr('r', 4)
                    .attr('cx', function(d) {
                        return d.position[0];
                    })
                    .attr('cy', function(d) {
                        return d.position[1];
                    })
                    .attr('data-id', function(d) {
                        return d.axis;
                    });
        });
    }

    function loopsDraw(loops) {
        loops.enter()
                .append('svg:g')
                .classed('level', true)
                .each(function(d) {
                    var levelFactor = radius * (++d / segs);
                    var line = d3.select(this)
                            .selectAll('.line')
                            .data(allAxis);
                    line.exit()
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 0)
                            .remove();
                    line.enter()
                            .append('svg:line')
                            .classed('line', true)
                            .style({'stroke': gridColor,
                                'stroke-dasharray': '3,1',
                                'stroke-opacity': '0',
                                'stroke-width': 1})
                            .transition()
                            .duration(duration)
                            .attr('x1', function(p, i) {
                                return widthAvail / 2 - levelFactor * Math.sin(i *
                                        2 * Math.PI / allAxis.length);
                            })
                            .attr('y1', function(p, i) {
                                return heightAvail / 2 - levelFactor * Math.cos(i *
                                        2 * Math.PI / allAxis.length);
                            })
                            .attr('x2', function(p, i) {
                                return widthAvail / 2 - levelFactor * Math.sin((i + 1) *
                                        2 * Math.PI / allAxis.length);
                            })
                            .attr('y2', function(p, i) {
                                return heightAvail / 2 - levelFactor * Math.cos((i + 1) *
                                        2 * Math.PI / allAxis.length);
                            })
                            .style('stroke-opacity', .75);
                });
    }

    function loopsUpdate(loops) {
        loops.each(function(d) {
            var levelFactor = radius * (++d / segs);
            var line = d3.select(this)
                    .selectAll('.line')
                    .data(allAxis);
            line.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            line.transition()
                    .duration(duration)
                    .attr('x1', function(p, i) {
                        return widthAvail / 2 - levelFactor * Math.sin(i *
                                2 * Math.PI / allAxis.length);
                    })
                    .attr('y1', function(p, i) {
                        return heightAvail / 2 - levelFactor * Math.cos(i *
                                2 * Math.PI / allAxis.length);
                    })
                    .attr('x2', function(p, i) {
                        return widthAvail / 2 - levelFactor * Math.sin((i + 1) *
                                2 * Math.PI / allAxis.length);
                    })
                    .attr('y2', function(p, i) {
                        return heightAvail / 2 - levelFactor * Math.cos((i + 1) *
                                2 * Math.PI / allAxis.length);
                    });

            line.enter()
                    .append('svg:line')
                    .classed('line', true)
                    .style({'stroke': gridColor,
                        'stroke-dasharray': '3,1',
                        'stroke-opacity': '0',
                        'stroke-width': 1})
                    .transition()
                    .duration(duration)
                    .attr('x1', function(p, i) {
                        return widthAvail / 2 - levelFactor * Math.sin(i *
                                2 * Math.PI / allAxis.length);
                    })
                    .attr('y1', function(p, i) {
                        return heightAvail / 2 - levelFactor * Math.cos(i *
                                2 * Math.PI / allAxis.length);
                    })
                    .attr('x2', function(p, i) {
                        return widthAvail / 2 - levelFactor * Math.sin((i + 1) *
                                2 * Math.PI / allAxis.length);
                    })
                    .attr('y2', function(p, i) {
                        return heightAvail / 2 - levelFactor * Math.cos((i + 1) *
                                2 * Math.PI / allAxis.length);
                    })
                    .style('stroke-opacity', .75);
        });
    }

    function ticksDraw(ticks) {
        ticks.enter()
                .append('svg:text')
                .classed('tick', true)
                .each(function(d) {
                    var levelFactor = radius * (++d / segs);
                    d3.select(this)
                            .style({'font-family': fontFamily,
                                'fill': fontColor,
                                'font-size': fontSize})
                            .transition()
                            .duration(duration)
                            .attr('x', function() {
                                return widthAvail / 2 - levelFactor * Math.sin(0) + 2;
                            })
                            .attr('y', function() {
                                return heightAvail / 2 - levelFactor * Math.cos(0);
                            })
                            .text(format(d * maxValue / segs));
                });
    }

    function ticksUpdate(ticks) {
        ticks.each(function(d) {
            var levelFactor = radius * (++d / segs);
            d3.select(this)
                    .transition()
                    .duration(duration)
                    .style({'font-family': fontFamily,
                        'fill': fontColor,
                        'font-size': fontSize})
                    .attr('x', function() {
                        return widthAvail / 2 - levelFactor * Math.sin(0) + 2;
                    })
                    .attr('y', function() {
                        return heightAvail / 2 - levelFactor * Math.cos(0);
                    })
                    .text(format(d * maxValue / segs));
        });
    }

    function axisesDraw(axises) {
        axises.enter()
                .append('svg:g')
                .classed('axis', true)
                .each(function(d, i) {
                    var index = +(d3.select(this).attr('data-index') || 0);
                    var line = d3.select(this)
                            .selectAll('.line')
                            .data([d]);

                    line.exit()
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 0)
                            .remove();

                    line.enter()
                            .append('svg:line')
                            .classed('line', true)
                            .style({'stroke': axisPathColor,
                                'stroke-width': axisPathWidth})
                            .attr({'x1': widthAvail / 2,
                                'y1': heightAvail / 2})
                            .transition()
                            .duration(duration)
                            .attrTween('x2', function() {
                                var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                        Math.PI / allAxis.length);
                                return function(t) {
                                    return  widthAvail / 2 - radius * Math.sin(q(t));
                                };
                            })
                            .attrTween('y2', function() {
                                var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                        Math.PI / allAxis.length);
                                return function(t) {
                                    return  heightAvail / 2 - radius * Math.cos(q(t));
                                };
                            });

                    var text = d3.select(this)
                            .selectAll('.text')
                            .data([d]);
                    text.exit()
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 0)
                            .remove();
                    text.enter()
                            .append('svg:text')
                            .classed('text', true)
                            .style({'font-family': tickTextColor,
                                'font-size': tickTextSize,
                                'opacity': 0})
                            .attr({'transform': 'translate(0, -10)',
                                'text-anchor': 'middle',
                                'dy': '1.5em'})
                            .transition()
                            .duration(duration)
                            .attrTween('x', function() {
                                var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                        Math.PI / allAxis.length);
                                return function(t) {
                                    return  widthAvail / 2 - radius * .85 * Math.sin(q(t)) -
                                            60 * Math.sin(q(t));
                                };
                            })
                            .attrTween('y', function() {
                                var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                        Math.PI / allAxis.length);
                                return function(t) {
                                    return  heightAvail / 2 - radius * Math.cos(q(t)) -
                                            20 * Math.cos(q(t));
                                };
                            })
                            .style('opacity', 1)
                            .text(d);

                    d3.select(this)
                            .attr('data-index', i / allAxis.length);
                });
    }

    function axisesUpdate(axises) {
        axises.each(function(d, i) {
            var index = +(d3.select(this)
                    .attr('data-index') || 0);
            var line = d3.select(this)
                    .selectAll('.line');
            line.transition()
                    .duration(duration)
                    .style({'stroke': axisPathColor,
                        'stroke-width': axisPathWidth})
                    .attrTween('x2', function() {
                        var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                Math.PI / allAxis.length);
                        return function(t) {
                            return  widthAvail / 2 - radius * Math.sin(q(t));
                        };
                    })
                    .attrTween('y2', function() {
                        var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                Math.PI / allAxis.length);
                        return function(t) {
                            return  heightAvail / 2 - radius * Math.cos(q(t));
                        };
                    });

            var text = d3.select(this)
                    .selectAll('.text');
            text
                    .style({'font-family': tickTextColor,
                        'font-size': tickTextSize})
                    .transition()
                    .duration(duration)
                    .attrTween('x', function() {
                        var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                Math.PI / allAxis.length);
                        return function(t) {
                            return  widthAvail / 2 - radius * .85 * Math.sin(q(t)) -
                                    60 * Math.sin(q(t));
                        };
                    })
                    .attrTween('y', function() {
                        var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                Math.PI / allAxis.length);
                        return function(t) {
                            return  heightAvail / 2 - radius * Math.cos(q(t)) -
                                    20 * Math.cos(q(t));
                        };
                    })
                    .text(d);

            d3.select(this)
                    .attr('data-index', i / allAxis.length);
        });
    }

    function legendDraw(legends) {
        legends.enter()
                .append('svg:g')
                .classed('legend', true)
                .style('cursor', 'pointer')
                .on('click', function(d) {
                    if (!d3.select(this).classed('none')) {
                        if (data.length > 1) {
                            d3.select(this).classed('none', true);
                            for (var j = 0, k; j < data.length; j++) {
                                k = data[j];
                                if (k.name === d.name) {
                                    k._flag = false;
                                    break;
                                }
                            }
                            radar.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        for (var j = 0, k; j < data.length; j++) {
                            k = data[j];
                            if (k.name === d.name) {
                                k._flag = true;
                                break;
                            }
                        }
                        radar.render();
                    }
                })
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        radius * 2,
                                'y': i % legendColumnNo * 20 + 10})
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
                                        radius * 2 + 20,
                                'y': i % legendColumnNo * 20 + 19})
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
                                radius * 2,
                        'y': i % legendColumnNo * 20 + 10});

            d3.select(this)
                    .selectAll('text')
                    .transition()
                    .duration(duration / 2)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                radius * 2 + 20,
                        'y': i % legendColumnNo * 20 + 19})
                    .style({'font-size': legendSize,
                        'fill': legendColor,
                        'font-family': fontFamily})
                    .text(d.name);
        });
    }

    function XMLdata(d) {
        var u;
        if (typeof d === 'object' && d.constructor === Array) {
            u = d.map(function(p) {
                var axis;
                var value;
                var data = p.data.data.map(function(k) {
                    k.row.row.forEach(function(o) {
                        if (o.axis !== undefined)
                            axis = o.axis;
                        if (o.value !== undefined)
                            value = o.value;
                    });
                    return {axis: axis, value: value};

                });
                return {name: p.name, data: data};
            });
        }
        return u;
    }

    radar.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in radar.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    radar.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in radar.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    radar.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in radar.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    radar.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    radar.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    radar.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    radar.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    radar.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in radar.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    radar.gridColor = function(_) {
        if (!arguments.length)
            return gridColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.gridColor(gridColor) should be string');
                return this;
            } else {
                gridColor = arguments[0];
                return this;
            }
        }
    };

    radar.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    radar.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    radar.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    radar.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    radar.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    radar.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in radar.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    radar.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    radar.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in radar.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    radar.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    radar.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    radar.segNumber = function(_) {
        if (!arguments.length)
            return segs;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in radar.segNumber(number) should be number of svg');
                return this;
            } else {
                segs = arguments[0];
                return this;
            }
        }
    };

    radar.options = function(_) {
        if (!arguments.length)
            return {'width': width,
                'height': height,
                'format': format,
                'segnumber': segs,
                'fontSize': fontSize,
                'fontFamily': fontFamily,
                'legendsize': legendSize,
                'duration': duration};
        else if (typeof _ !== 'object') {
            radar.log({priority: 'Warning', position: 'radar',
                info: 'The arguments in radar.options(options) should be object'});
            console.error('The arguments in radar.options(options) should be object');
            return this;
        } else {
            width = isFinite(_.width) ? _.width : width;
            height = isFinite(_.width) ? _.height : height;
            format = (_.format && typeof _.format === 'function') ? _.format : format;
            segs = isFinite(_.segnumber) ? _.segnumber : segs;
            fontSize = isFinite(_.fontSize) ? _.fontSize : fontSize;
            legendSize = isFinite(_.legendsize) ? _.legendsize : legendSize;
            fontFamily = _.fontFamily || fontFamily;
            duration = isFinite(_.duration) || duration;
            return this;
        }
    };

    radar.options = function(_) {
        if (!arguments.length)
            return {
                'type': radar.getType(),
                'width': width,
                'height': height,
                'widthAvail': widthAvail,
                'heightAvail': heightAvail,
                'tranX': tranX,
                'tranY': tranY,
                'format': format,
                'fontSize': fontSize,
                'fontColor': fontColor,
                'fontFamily': fontFamily,
                'color': color,
                'duration': duration,
                'segNumber': segs,
                'gridColor': gridColor,
                'tickTextSize': tickTextSize,
                'tickTextColor': tickTextColor,
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
            _.format && radar.tickFormat(_.format);
            _.fontFamily && radar.fontFamily(_.fontFamily);
            _.fontColor && radar.fontColor(_.fontColor);
            isFinite(_.fontSize) && radar.fontSize(_.fontSize);
            isFinite(_.duration) && radar.duration(_.duration);

            isFinite(_.segNumber) && radar.segNumber(_.segNumber);
            _.gridColor && radar.gridColor(_.gridColor);
            isFinite(_.tickTextSize) && radar.tickTextSize(_.tickTextSize);
            _.tickTextColor && radar.tickTextColor(_.tickTextColor);
            isFinite(_.axisPathWidth) && radar.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && radar.axisPathColor(_.axisPathColor);

            _.legendColor && radar.legendColor(_.legendColor);
            isFinite(_.legendSize) && radar.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && radar.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && radar.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        radar.options(arguments[0]);
    return radar;
};
/**
 * 饼图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.pie = function() {
    var pie = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '饼图'; //类型
    var width = 900; // 宽度
    var height = 700; // 高度
    var widthAvail = width; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var data; //数据
    var fontSize = 10; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var fontColor = '#000'; //颜色
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = pie.color();

    /************局部变量***************/
    var ease = 'bounce';
    var innerRadius = 0; // 內半径
    var outerRadius = Math.min(widthAvail, heightAvail) * .42; // 外半径

    /******图例******/
    var legendColor = '#000000';
    var legendSize = 13;
    var legendTranX = 0;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    pie.data = function(_) {
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
            data = _.map(function(item, index) {
                return {
                    index: index,
                    value: +item.value,
                    data: +item.value,
                    name: item.name,
                    _flag: true
                };
            });
            return this;
        } else
            return data;
    };

    pie.getType = function() {
        return type;
    };

    pie.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            pie.log({priority: 'Error', position: 'pie',
                info: 'The argument(element) in pie.rander(_) should be <div> element'});
            console.error('The argument(element) in pie.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('pie', true)
                .node();
        /* 初始化变量 */
        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                pie.floatTag(div); //绘图元素的外容器，添加动态标签

        var layout = d3.layout.pie()
                .value(function(d) {
                    return d.value;
                })
                .sort(function(a, b) {
                    return b.value - a.value;
                });

        var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

        var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + (tranX + outerRadius * 1.2) + ',' + (tranY + outerRadius * 1.2) + ')');

        g.call(function(selection) {
            selection.append('svg:g')
                    .classed('arcs', true);
            selection.append('svg:g')
                    .classed('labels', true);
            selection.append('svg:g')
                    .classed('legends', true);
        });

        g = d3.select(svg)
                .select('g');

        var arcs = g.select('.arcs')
                .datum(data.filter(function(d) {
                    return d._flag;
                }))
                .selectAll('path')
                .data(layout);

        arcs.exit()
                .attr('opacity', 1)
                .transition()
                .duration(duration)
                .attr('opacity', 0)
                .remove();
        arcUpdate(arcs, arc);
        arcDraw(arcs, g, arc);

        var labels = g.select('.labels')
                .datum(data.filter(function(d) {
                    return d._flag;
                }))
                .selectAll('.label')
                .data(layout);

        labels.exit()
                .attr('opacity', 1)
                .transition()
                .duration(duration)
                .attr('opacity', 0)
                .remove();
        labelUpdate(labels);
        labelDraw(labels);

        var legends = g.select('.legends')
                .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                .selectAll('.legend')
                .data(data);
        legends.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        legendUpdate(legends);
        legendDraw(legends);
    };

    function arcUpdate(arcs, arc) {
        arcs.transition()
                .duration(duration)
                .attrTween('d', function(d) {
                    var q = d3.interpolate(+d3.select(this).attr('data-startAngle'), d.startAngle);
                    var p = d3.interpolate(+d3.select(this).attr('data-endAngle'), d.endAngle);
                    return function(t) {
                        return  arc({startAngle: p(t), endAngle: q(t)});
                    };
                })
                .attr('fill', function(d) {
                    return color(d.data.index);
                })
                .attr('data-startAngle', function(d) {
                    return d.startAngle;
                })
                .attr('data-endAngle', function(d) {
                    return d.endAngle;
                });
    }

    function arcDraw(arcs, g, arc) {
        arcs.enter()
                .append('svg:path')
                .attr('fill', function(d) {
                    return color(d.data.index);
                })
                .attr('opacity', 0)
                .on('mouseover', function(d) {
                    drawLegend(d.data, true);
                })
                .on('mouseout', function(d) {
                    drawLegend(d.data, false);
                })
                .on('click', function(d) {
                    var that = this;
                    var label = g.select('.labels')
                            .selectAll('.label');
                    var path = g.select('.arcs')
                            .selectAll('path');

                    if (!d3.select(this).classed('out')) {
                        d3.select(this).classed('out', true);
                        var angle = 0.5 * ((d.startAngle + d.endAngle) - Math.PI);
                        var radius = {
                            x: outerRadius * 0.1 * Math.cos(angle),
                            y: outerRadius * 0.1 * Math.sin(angle)
                        };

                        label.each(function(p) {
                            if (p.data.index === d.data.index)
                                d3.select(this)
                                        .transition()
                                        .duration(duration / 2)
                                        .ease(ease)
                                        .attr('transform', 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                                + 'translate(' + outerRadius * 1.2 + ',0)');
                        });

                        d3.select(this)
                                .transition()
                                .duration(duration / 2)
                                .ease(ease)
                                .attr('opacity', 1)
                                .attr('transform', 'translate(' + (radius.x) + ', ' + (radius.y) + ')');

                        path.filter(function() {
                            return this !== that;
                        })
                                .transition()
                                .duration(duration / 2)
                                .attr('opacity', function() {
                                    return d3.select(this)
                                            .classed('out') ? 1 : .3;
                                });
                    } else {
                        d3.select(this)
                                .classed('out', false);
                        label.each(function(p) {
                            if (p.data.index === d.data.index)
                                d3.select(this)
                                        .transition()
                                        .duration(duration / 2)
                                        .ease(ease)
                                        .attr('transform', 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                                + 'translate(' + outerRadius + ',0)');
                        });

                        var none = g.select('.arcs')
                                .selectAll('.out')
                                .node() ? true : false;

                        d3.select(this)
                                .transition()
                                .duration(duration / 2)
                                .ease(ease)
                                .attr('transform', '')
                                .attr('opacity', none ? .3 : 1);

                        path.filter(function() {
                            return this !== that;
                        }).transition()
                                .duration(duration / 2)
                                .attr('opacity', function() {
                                    return !none ? 1 : d3.select(this)
                                            .classed('out') ? 1 : .3;
                                });
                    }
                })
                .transition()
                .duration(duration)
                .attrTween('d', function(d) {
                    var q = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        return  arc({startAngle: d.startAngle, endAngle: q(t)});
                    };
                })
                .attr('opacity', 1)
                .attr('data-startAngle', function(d) {
                    return d.startAngle;
                })
                .attr('data-endAngle', function(d) {
                    return d.endAngle;
                });
    }

    function labelUpdate(labels) {
        labels.transition()
                .duration(duration)
                .attrTween('transform', function(d) {
                    var q = d3.interpolate(+d3.select(this).attr('data-Angle'), d.endAngle + d.startAngle);
                    return function(t) {
                        return  'rotate(' + (q(t) * 90 / Math.PI - 87) + ')'
                                + 'translate(' + outerRadius + ',0)';
                    };
                })
                .attr('data-Angle', function(d) {
                    return d.endAngle + d.startAngle;
                })
                .select('text')
                .style('text-anchor', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                })
                .attr('transform', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                })
                .style({'font-family': fontFamily,
                    'fill': fontColor,
                    'font-size': fontSize})
                .text(function(d) {
                    return d.endAngle - d.startAngle > .03 ? d.data.name : '...';
                });


    }

    function labelDraw(labels) {
        labels.enter()
                .append('svg:g')
                .classed('label', true)
                .style({'font-family': fontFamily,
                    'fill': fontColor,
                    'font-size': fontSize})
                .attr('transform', function(d) {
                    return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                            + 'translate(' + outerRadius + ',0)';
                })
                .attr('data-Angle', function(d) {
                    return d.endAngle + d.startAngle;
                })
                .append('svg:text')
                .attr('opacity', 0)
                .style('text-anchor', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                })
                .attr('transform', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                })
                .transition()
                .duration(duration)
                .ease('exp')
                .attr({'x': 8, 'dy': 20})
                .style('opacity', 1)
                .text(function(d) {
                    return d.endAngle - d.startAngle > .03 ? d.data.name : '...';
                });
    }

    function legendUpdate(legends) {
        legends.each(function(d) {
            d3.select(this)
                    .select('rect')
                    .transition()
                    .duration(duration)
                    .style('fill-opacity', d._flag ? 1 : 0)
                    .attr({'x': (d.index - d.index % legendColumnNo) / legendColumnNo * legendRowGap +
                                outerRadius,
                        'y': d.index % legendColumnNo * 20 - outerRadius * 1.1 - 9})
                    .style({'fill': color(d.index),
                        'stroke': color(d.index)});
            d3.select(this)
                    .select('text')
                    .transition()
                    .duration(duration)
                    .attr({'x': (d.index - d.index % legendColumnNo) / legendColumnNo * legendRowGap +
                                outerRadius + 20,
                        'y': d.index % legendColumnNo * 20 - outerRadius * 1.1})
                    .style({'font-size': legendSize,
                        'fill': legendColor,
                        'font-family': fontFamily})
                    .text(d.name);
        });
    }

    function legendDraw(legends) {
        legends.enter()
                .append('svg:g')
                .classed('legend', true)
                .style('cursor', 'pointer')
                .on('click', function(d) {
                    if (!d3.select(this).classed('none')) {
                        d3.select(this)
                                .classed('none', true);
                        d._flag = false;
                    } else {
                        d3.select(this).classed('none', false);
                        d._flag = true;
                    }
                    pie.render(data);
                })
                .each(function(d) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'x': (d.index - d.index % legendColumnNo) /
                                        legendColumnNo * legendRowGap +
                                        outerRadius,
                                'y': d.index % legendColumnNo * 20 - outerRadius * 1.1 - 9})
                            .attr({'width': 10,
                                'height': 10})
                            .style({'fill': color(d.index),
                                'stroke': color(d.index)})
                            .style('fill-opacity', 1)
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .style('fill-opacity', d._flag ? 1 : 0)
                            .style('opacity', 1);

                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': (d.index - d.index % legendColumnNo) /
                                        legendColumnNo * legendRowGap +
                                        outerRadius + 20,
                                'y': d.index % legendColumnNo * 20 - outerRadius * 1.1})
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

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': color(d.name),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            }).html('<p style="color:#3f7ed8; font-weight:bold; font-size:11px;margin-bottom:5px;">name: ' +
                    d.name + '</p>value: ' + format(d.value));
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    pie.size = function(_) {
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

    pie.sizeAvail = function(_) {
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

    pie.tran = function(_) {
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

    pie.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in pie.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    pie.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in pie.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    pie.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in pie.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    pie.duration = function(_) {
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

    pie.color = function(_) {
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

    pie.tickFormat = function(_) {
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

    pie.legendTran = function(_) {
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

    pie.legendSize = function(_) {
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

    pie.legendColor = function(_) {
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

    pie.legendColumnNo = function(_) {
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

    pie.ease = function(_) {
        if (!arguments.length)
            return ease;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in pie.ease(ease) should be string');
                return this;
            } else {
                ease = arguments[0];
                return this;
            }
        }
    };

    pie.outerRadius = function(_) {
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

    pie.innerRadius = function(_) {
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

    pie.options = function(_) {
        if (!arguments.length)
            return {
                'type': pie.getType(),
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
                'outerRadius': outerRadius,
                'innerRadius': innerRadius,
                'ease': ease,
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
            _.format && pie.tickFormat(_.format);
            _.fontFamily && pie.fontFamily(_.fontFamily);
            _.fontColor && pie.fontColor(_.fontColor);
            isFinite(_.fontSize) && pie.fontSize(_.fontSize);
            isFinite(_.duration) && pie.duration(_.duration);

            _.ease && pie.ease(_.ease);
            isFinite(_.innerRadius) && pie.innerRadius(_.innerRadius);
            isFinite(_.outerRadius) && pie.outerRadius(_.outerRadius);

            _.legendColor && pie.legendColor(_.legendColor);
            isFinite(_.legendSize) && pie.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && pie.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && pie.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        pie.options(arguments[0]);
    return pie;
};
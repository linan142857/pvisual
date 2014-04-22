/**
 * 弦图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.chord = function() {
    var chord = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '弦图'; //类型
    var width = 900; // 宽度
    var height = 900; // 高度
    var widthAvail = width; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var data; //数据
    var fontSize = 8; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var fontColor = '#000000'; //颜色
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 500; // 变化时间
    var format = d3.format('s');
    var color = chord.color();
    /************局部变量***************/
    var source;
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var padding = .01;
    var symmetry = true;
    var dimensions;
    var sum;
    var innerRadius;
    var outerRadius;


    /******图例******/
    var legendColor = '#000000';
    var legendSize = 13;
    var legendTranX = 0;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    chord.data = function(_) {
        if (arguments.length) {
            if (_.type === 'xml') {
                _ = _.map(function(d) {
                    var obj = {};
                    d.row.forEach(function(p) {
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
            var groupNum = 0;
            var index = {};
            var from;
            var to;
            sum = 0;
            data = [];
            source = _;
            source.forEach(function(d) {
                from = d.from;
                to = d.to;
                if (typeof index[from] === 'undefined') {
                    index[groupNum] = from;
                    index[from] = groupNum++;
                }
                if (typeof index[to] === 'undefined') {
                    index[groupNum] = to;
                    index[to] = groupNum++;
                }
                sum += +d.value;
            });
            for (var i = 0; i < groupNum; i++) {
                data[i] = [];
                data[i]._index = i;
                for (var j = 0; j < groupNum; j++) {
                    data[i][j] = 0;
                }
            }
            if (!symmetry)
                source.forEach(function(d) {
                    data[index[d.from]][index[d.to]] += +d.value;
                });
            else
                source.forEach(function(d) {
                    data[index[d.from]][index[d.to]] += +d.value;
                    data[index[d.to]][index[d.from]] += +d.value;
                });
            dimensions = index;
            return this;
        } else
            return data;
    };

    chord.getType = function() {
        return type;
    };

    chord.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in chord.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('chord', true)
                .node();
        /* 初始化变量 */
        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                chord.floatTag(div); //绘图元素的外容器，添加动态标签


        if (!innerRadius)
            innerRadius = Math.min(widthAvail, heightAvail) * .38; // 內半径
        if (!outerRadius)
            outerRadius = innerRadius * 1.1; // 外半径

        var layout = d3.layout.chord()
                .padding(padding)
                .sortSubgroups(d3.descending)
                .matrix(data);
        var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + (tranX + Math.min(widthAvail, heightAvail) / 2)
                        + ',' + (tranY + Math.min(widthAvail, heightAvail) / 2) + ')');

        g.call(function(selection) {
            selection.append('svg:g')
                    .classed('arcs', true);
            selection.append('svg:g')
                    .classed('labels', true);
            selection.append('svg:g')
                    .classed('ticks', true);
            selection.append('svg:g')
                    .classed('chords', true);
            selection.append('svg:g')
                    .classed('legends', true);
        });

        g = d3.select(svg).select('g');
        var chords = g.select('.chords').
                selectAll('path')
                .data(layout.chords);
        chords.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        chordUpdate(chords);
        chordDraw(chords);
        var arcs = g.select('.arcs')
                .selectAll('path')
                .data(layout.groups);
        arcs.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        arcUpdate(arcs, chords);
        arcDraw(arcs, chords);
        var labels = g.select('.labels')
                .selectAll('.label')
                .data(layout.groups);
        labels.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        labelUpdate(labels);
        labelDraw(labels);
        var ticks = g.select('.ticks')
                .selectAll('.tick')
                .data(layout.groups);
        ticks.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        tickUpdate(ticks);
        tickDraw(ticks);
        var legends = g.select('.legends')
                .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                .selectAll('.legend')
                .data(function() {
                    var p = d3.set([]);
                    source.forEach(function(d) {
                        p.add(d.from);
                        p.add(d.to);
                    });
                    return p.values();
                }());
        legends.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        legendUpdate(legends);
        legendDraw(legends);
    };

    function chordUpdate(chords) {
        chords.transition()
                .duration(duration)
                .style('fill', function(d) {
                    return color(data[d.target.index]._index);
                })
                .attr('d', d3.svg.chord()
                        .radius(innerRadius));
    }

    function chordDraw(chords) {
        chords.enter()
                .append('svg:path')
                .style('fill', function(d) {
                    return color(data[d.target.index]._index);
                })
                .attr('d', d3.svg.chord()
                        .radius(innerRadius))
                .style({'opacity': 0,
                    'fill-opacity': .67,
                    'stroke': 'none',
                    'stroke-width': '.5px'})
                .on('mouseover', fadeone(.03, true, chords))
                .on('mouseout', fadeone(1, false, chords))
                .transition()
                .duration(duration)
                .style('opacity', 1);
    }

    function arcUpdate(arcs) {
        arcs.transition()
                .duration(duration)
                .style('fill', function(d) {
                    return color(data[d.index]._index);
                })
                .attr('d', d3.svg.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius));
    }

    function arcDraw(arcs, chords) {
        arcs.enter()
                .append('svg:path')
                .style('fill', function(d) {
                    return color(dimensions[data[d.index]._index]);
                })
                .on('mouseover', fade(.03, true, chords))
                .on('mouseout', fade(1, false, chords))
                .transition()
                .duration(duration)
                .attr('d', d3.svg.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius));
    }

    function labelUpdate(labels) {
        labels.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                            + 'translate(' + outerRadius + ',0)';
                })
                .select('text')
                .style('text-anchor', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                })
                .attr('transform', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                })
                .style({'font-family': fontFamily,
                    'font-weight': 'normal',
                    'font-size': fontSize})
                .text(function(d) {
                    return d.endAngle - d.startAngle > .03 ? dimensions[data[d.index]._index] : '...';
                });
    }

    function labelDraw(labels) {
        labels.enter()
                .append('svg:g')
                .classed('label', true)
                .attr('transform', function(d) {
                    return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                            + 'translate(' + outerRadius + ',0)';
                })
                .append('svg:text')
                .attr({'x': 8, 'dy': 20})
                .style('opacity', 0)
                .style('text-anchor', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                })
                .attr('transform', function(d) {
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                })
                .transition()
                .duration(duration)
                .style({'font-family': fontFamily,
                    'font-size': fontSize,
                    'font-weight': 'normal',
                    'opacity': 1})
                .text(function(d) {
                    return d.endAngle - d.startAngle > .03 ? dimensions[data[d.index]._index] : '...';
                });
    }

    function tickUpdate(ticks) {
        ticks.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 89) + ')'
                            + 'translate(' + (outerRadius - 50) + ',0)';
                })
                .select('text')
                .attr('transform', function(d) {
                    if ((d.endAngle + d.startAngle) < Math.PI)
                        return 'rotate(90)translate(-9)';
                    else if (Math.PI < (d.endAngle + d.startAngle) && (d.endAngle + d.startAngle) < Math.PI * 3)
                        return 'rotate(-90)translate(-9)';
                    else
                        return 'rotate(90)translate(-9)';
                })
                .style({'font-family': fontFamily,
                    'font-weight': 'normal',
                    'font-size': fontSize})
                .text(function(d) {
                    return format(Math.round(d.value));
                });
    }

    function tickDraw(ticks) {
        ticks.enter()
                .append('svg:g')
                .classed('tick', true)
                .attr('transform', function(d) {
                    return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 89) + ')'
                            + 'translate(' + (outerRadius - 50) + ',0)';
                })
                .append('svg:text')
                .attr('transform', function(d) {
                    if ((d.endAngle + d.startAngle) < Math.PI)
                        return 'rotate(90)translate(-9)';
                    else if (Math.PI < (d.endAngle + d.startAngle) && (d.endAngle + d.startAngle) < Math.PI * 3)
                        return 'rotate(-90)translate(-9)';
                    else
                        return 'rotate(90)translate(-9)';
                })
                .transition()
                .duration(duration)
                .style({'font-family': fontFamily,
                    'font-weight': 'normal',
                    'font-size': fontSize})
                .text(function(d) {
                    return format(Math.round(d.value));
                });
    }

    function legendUpdate(legends) {
        legends.each(function(d) {
            var index = dimensions[d];
            d3.select(this)
                    .select('rect')
                    .transition()
                    .duration(duration)
                    .style('fill-opacity', function() {
                        var flag = 1;
                        for (var i = 0, k; i < source.length; i++) {
                            k = source[i];
                            if (k.from === d || k.to === d)
                                flag = k._flag === false ? 0 : 1;
                        }
                        return flag;
                    })
                    .attr({'x': (index - index % legendColumnNo) /
                                legendColumnNo * legendRowGap +
                                outerRadius,
                        'y': index % legendColumnNo * 20
                                - outerRadius * 1.15})
                    .style({'fill': color(index),
                        'stroke': color(index)});
            d3.select(this)
                    .select('text')
                    .transition()
                    .duration(duration)
                    .attr({'x': (index - index % legendColumnNo) /
                                legendColumnNo * legendRowGap +
                                outerRadius + 20,
                        'y': index % legendColumnNo * 20 + 9 -
                                outerRadius * 1.15})
                    .style({'font-size': legendSize,
                        'fill': legendColor,
                        'font-family': fontFamily})
                    .text(d);
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
                        for (var j = 0, k; j < source.length; j++) {
                            k = source[j];
                            if (d === k.from || d === k.to) {
                                k._flag = false;
                            } else {
                                k._flag = true;
                            }
                        }
                        dataUpdate();
                        chord.render();
                    } else {
                        d3.select(this)
                                .classed('none', false);
                        for (var j = 0, k; j < source.length; j++) {
                            k = source[j];
                            if (d === k.from || d === k.to) {
                                k._flag = true;
                            }
                        }
                        dataUpdate();
                        chord.render();
                    }
                })
                .each(function(d) {
                    var index = dimensions[d];
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'x': (index - index % legendColumnNo) /
                                        legendColumnNo * legendRowGap +
                                        outerRadius,
                                'y': index % legendColumnNo * 20
                                        - outerRadius * 1.15})
                            .attr({'width': 10,
                                'height': 10})
                            .style({'fill': color(index),
                                'stroke': color(index)})
                            .style('fill-opacity', 1)
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .style('fill-opacity', function() {
                                for (var i = 0, k; i < source.length; i++) {
                                    k = source[i];
                                    if (k.from === d || k.to === d)
                                        return k.flag === false ? 0 : 1;
                                }
                                return 1;
                            })
                            .style('opacity', 1);
                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': (index - index % legendColumnNo) /
                                        legendColumnNo * legendRowGap +
                                        outerRadius + 20,
                                'y': index % legendColumnNo * 20 + 9 -
                                        outerRadius * 1.15})
                            .style({'opacity': 0,
                                'font-size': legendSize,
                                'fill': legendColor,
                                'font-family': fontFamily})
                            .transition()
                            .duration(duration)
                            .style('opacity', 1)
                            .text(d);
                });
    }

    function dataUpdate() {
        var groupNum = 0;
        var index = {};
        var from;
        var to;
        sum = 0;
        data = [];
        source.forEach(function(d) {
            if (d._flag !== false) {
                from = d.from;
                to = d.to;
                if (typeof index[from] === 'undefined') {
                    index[groupNum] = dimensions[from];
                    index[from] = groupNum++;
                }
                if (typeof index[to] === 'undefined') {
                    index[groupNum] = dimensions[to];
                    index[to] = groupNum++;
                }
                sum += +d.value;
            }
        });
        for (var i = 0; i < groupNum; i++) {
            data[i] = [];
            for (var j = 0; j < groupNum; j++) {
                data[i][j] = 0;
            }
        }
        if (!symmetry)
            source.forEach(function(d) {
                if (d._flag !== false) {
                    data[index[d.from]][index[d.to]] += +d.value;
                    data[index[d.from]]._index = index[index[d.from]];
                }

            });
        else
            source.forEach(function(d) {
                if (d._flag !== false) {
                    data[index[d.from]][index[d.to]] += +d.value;
                    data[index[d.to]][index[d.from]] += +d.value;
                    data[index[d.from]]._index = index[index[d.from]];
                    data[index[d.to]]._index = index[index[d.to]];
                }
            });
    }

    function fade(opacity, style, chords) {
        return function(g, i) {
            drawLegendArc(style, g);
            chords.filter(function(d) {
                return d.source.index !== i && d.target.index !== i;
            })
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', opacity);
        };
    }

    function fadeone(opacity, style, chords) {
        return function(d) {
            var that = this;
            drawLegend(style, d);
            chords.filter(function() {
                return this !== that;
            })
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', opacity);
        };
    }

    function drawLegend(style, d) {
        if (style) {
            floatTag.style({
                'border-color': color(data[d.source.index]._index + data[d.target.index]._index),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            })
                    .html(dimensions[data[d.source.index]._index] + ' to ' +
                            dimensions[data[d.target.index]._index] + ' : ' +
                            format(d.source.value) + '<br>' +
                            dimensions[data[d.target.index]._index] + ' to ' +
                            dimensions[data[d.source.index]._index] + ' : ' +
                            format(d.target.value));
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    function drawLegendArc(style, d) {
        if (style) {
            var msum = d3.sum(data[d.index]);
            floatTag.style({
                'border-color': color(dimensions[data[d.index]._index]),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            })
                    .html(dimensions[data[d.index]._index] + ' : ' + msum +
                            '<br/>比例: ' + format((msum / sum * 100).toFixed(2)) + '%');
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    chord.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chord.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    chord.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chord.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    chord.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chord.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    chord.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    chord.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in chord.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    chord.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    chord.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in chord.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    chord.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in chord.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    chord.symmetry = function(_) {
        if (!arguments.length)
            return symmetry;
        else {
            if (arguments[0] !== true && arguments[0] !== false) {
                console.error('The arguments in chord.symmetry(symmetry) should be bool');
                return this;
            } else {
                symmetry = arguments[0];
                return this;
            }
        }
    };

    chord.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    chord.innerRadius = function(_) {
        if (!arguments.length)
            return innerRadius;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.innerRadius(innerRadius) should be number');
                return this;
            } else {
                innerRadius = arguments[0];
                return this;
            }
        }
    };

    chord.outerRadius = function(_) {
        if (!arguments.length)
            return outerRadius;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.outerRadius(outerRadius) should be number');
                return this;
            } else {
                outerRadius = arguments[0];
                return this;
            }
        }
    };

    chord.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chord.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    chord.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    chord.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in chord.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    chord.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    chord.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chord.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    chord.options = function(_) {
        if (!arguments.length)
            return {
                'type': chord.getType(),
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
                'padding': padding,
                'symmetry': symmetry,
                'innerRadius': innerRadius,
                'outerRadius': outerRadius,
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
            _.format && chord.tickFormat(_.format);
            _.fontFamily && chord.fontFamily(_.fontFamily);
            _.fontColor && chord.fontColor(_.fontColor);
            isFinite(_.fontSize) && chord.fontSize(_.fontSize);
            isFinite(_.duration) && chord.duration(_.duration);

            isFinite(_.padding) && chord.padding(_.padding);
            isFinite(_.outerRadius) && chord.outerRadius(_.outerRadius);
            isFinite(_.innerRadius) && chord.innerRadius(_.innerRadius);
            _.symmetry && chord.symmetry(_.symmetry);

            _.legendColor && chord.legendColor(_.legendColor);
            isFinite(_.legendSize) && chord.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && chord.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && chord.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        chord.options(arguments[0]);
    return chord;
};
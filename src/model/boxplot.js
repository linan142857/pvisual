/**
 * 箱式图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.boxplot = function() {
    var boxplot = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '箱式图'; //类型
    var width = 800; // 宽度
    var height = 500; // 高度
    var widthAvail = width - 100; // 实际利用宽度
    var heightAvail = height - 30; // 实际利用高度
    var data; //数据
    var tranX = 10; //图形右移距离
    var tranY = 10; //图形下移距离
    var fontSize = 8; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var fontColor = '#000'; //颜色
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = boxplot.color();

    /************局部变量***************/
    var source;
    var dimensions;
    var padding = .2;
    var outclicleSize = 5;
    var lineWidth = 2;
    var lineColor = '#000000';

    /******图例******/
    var legendColor = '#000000';
    var legendSize = 13;
    var legendTranX = 0;
    var legendTranY = 0;
    var legendColumnNo = 10;
    var legendRowGap = 100;

    boxplot.data = function(_) {
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
            data = d3.nest().key(function(d) {
                return d.name;
            }).sortValues(function(a, b) {
                return +a.value - +b.value;
            }).entries(_);

            return this;
        } else
            return data;
    };

    boxplot.getType = function() {
        return type;
    };

    boxplot.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in boxplot.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('boxplot', true)
                .node();
        /* 初始化变量 */
        source = data.filter(function(d) {
            return d._flag !== false;
        });
        dimensions = source.map(function(d) {
            return d.key;
        });

        var everywidth = widthAvail / dimensions.length;

        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                boxplot.floatTag(div); //绘图元素的外容器，添加动态标签

        var min = Infinity;
        var max = -Infinity;

        source.forEach(function(d) {
            min = min < +d.values[0].value ?
                    min : +d.values[0].value;
            max = max > +d.values[d.values.length - 1].value ?
                    max : +d.values[d.values.length - 1].value;
        });

        var x = d3.scale.ordinal();
        var y = d3.scale.linear();
        x.rangeBands([0, widthAvail])
                .domain(dimensions);
        y.domain([min, max])
                .range([heightAvail, 0]);

        d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + tranX + ',' + tranY + ')');

        var g = d3.select(svg)
                .select('g');

        g.call(function(selection) {
            selection.append('svg:g')
                    .classed('nodes', true);
            selection.append('svg:g')
                    .classed('legends', true);
        });

        g = d3.select(svg).select('g');

        var nodes = g.select('.nodes')
                .selectAll('.node')
                .data(source);
        nodes.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        nodeUpdate(nodes, everywidth, x, y);
        nodeDraw(nodes, everywidth, x, y);

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
                                if (k.key === d.key) {
                                    k._flag = false;
                                    break;
                                }
                            }
                            boxplot.render();
                        }
                    } else {
                        d3.select(this).classed('none', false);
                        for (var j = 0, k; j < data.length; j++) {
                            k = data[j];
                            if (k.key === d.key) {
                                k._flag = true;
                                break;
                            }
                        }
                        boxplot.render();
                    }
                })
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        widthAvail - 20,
                                'y': i % legendColumnNo * 20 + 10})
                            .attr({'width': 10,
                                'height': 10})
                            .style({'fill': color(d.key),
                                'stroke': color(d.key)})
                            .style('fill-opacity', d._flag !== false ? 1 : 0)
                            .style('opacity', 0)
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 1);
                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                        widthAvail,
                                'y': i % legendColumnNo * 20 + 19})
                            .style({'opacity': 0,
                                'font-size': legendSize,
                                'fill': legendColor,
                                'font-family': fontFamily})
                            .transition()
                            .duration(duration / 2)
                            .style('opacity', 1)
                            .text(d.key);
                });

    }

    function legendUpdate(legends) {
        legends.each(function(d, i) {
            d3.select(this)
                    .select('rect')
                    .transition()
                    .duration(duration / 2)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail - 20,
                        'y': i % legendColumnNo * 20 + 10})
                    .style({'fill': color(d.key),
                        'stroke': color(d.key)})
                    .style('fill-opacity', d._flag !== false ? 1 : 0);
            d3.select(this)
                    .select('text')
                    .transition()
                    .duration(duration / 2)
                    .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                widthAvail,
                        'y': i % legendColumnNo * 20 + 19})
                    .style({'font-size': legendSize,
                        'fill': legendColor,
                        'font-family': fontFamily})
                    .text(d.key);
        });

    }

    function nodeDraw(nodes, everywidth, x, y) {
        var gap = everywidth * padding;
        nodes.enter()
                .append('svg:g')
                .classed('node', true)
                .attr('transform', function(d) {
                    return 'translate(' + x(d.key) + ',0)';
                })
                .on('mouseover', function(d) {
                    drawLegend(d, true);
                })
                .on('mouseout', function(d) {
                    drawLegend(d, false);
                })
                .each(function(d) {
                    var values = d.values.map(function(p) {
                        return +p.value;
                    });
                    var quartileData = boxQuartiles(values);
                    var whiskerIndices = outplot(values, quartileData, 1);
                    var whiskerData = whiskerIndices &&
                            whiskerIndices.map(function(i) {
                                return values[i];
                            });
                    var outlierIndices = whiskerIndices
                            ? d3.range(0, whiskerIndices[0])
                            .concat(d3.range(whiskerIndices[1] + 1, values.length))
                            : d3.range(values.length);
                    var center = d3.select(this)
                            .selectAll('.center')
                            .data(whiskerData ? [whiskerData] : []);
                    center.enter()
                            .append('svg:line')
                            .classed('center', true)
                            .style({'opacity': 0,
                                'stroke': lineColor,
                                'stroke-width': lineWidth,
                                'stroke-dasharray': '3,3'})
                            .attr('x1', everywidth / 2)
                            .attr('x2', everywidth / 2)
                            .attr('y1', function(p) {
                                return y(p[1]);
                            })
                            .attr('y2', function(p) {
                                return y(p[1]);
                            })
                            .transition()
                            .duration(duration)
                            .style('opacity', 1)
                            .attr('y1', function(p) {
                                return y(p[0]);
                            });

                    // Update innerquartile box.
                    var rect = d3.select(this)
                            .selectAll('.box')
                            .data([quartileData]);
                    rect.enter()
                            .append('svg:rect')
                            .classed('box', true)
                            .attr('x', gap)
                            .attr('y', function(p) {
                                return y(p[2]);
                            })
                            .attr('width', everywidth - 2 * gap)
                            .attr('height', function(p) {
                                return y(p[0]) - y(p[2]);
                            })
                            .style({'opacity': 0,
                                'fill': color(d.key),
                                'stroke': lineColor,
                                'stroke-width': lineWidth})
                            .transition()
                            .duration(duration)
                            .style('opacity', 1);

                    var medianLine = d3.select(this)
                            .selectAll('.median')
                            .data([quartileData[1]]);

                    medianLine.enter()
                            .append('svg:line')
                            .classed('median', true)
                            .style({'opacity': 0,
                                'stroke': lineColor,
                                'stroke-width': lineWidth})
                            .attr('x1', gap)
                            .attr('x2', everywidth - gap)
                            .attr('y1', y(quartileData[2]))
                            .attr('y2', y(quartileData[2]))
                            .transition()
                            .duration(duration)
                            .style('opacity', 1)
                            .attr('y2', function(p) {
                                return y(p);
                            })
                            .attr('y1', function(p) {
                                return y(p);
                            });

                    var whisker = d3.select(this)
                            .selectAll('.whisker')
                            .data(whiskerData || []);
                    whisker.enter()
                            .append('svg:line')
                            .classed('whisker', true)
                            .style({'opacity': 0,
                                'stroke': lineColor,
                                'stroke-width': lineWidth})
                            .attr('x1', everywidth / 2)
                            .attr('x2', everywidth / 2)
                            .attr('y1', function(p) {
                                return y(p);
                            })
                            .attr('y2', function(p) {
                                return y(p);
                            })
                            .transition()
                            .duration(duration)
                            .style('opacity', 1)
                            .attr('x1', gap)
                            .attr('x2', everywidth - gap);

                    var outlier = d3.select(this)
                            .selectAll('.outlier')
                            .data(outlierIndices);

                    outlier.enter()
                            .append('svg:circle')
                            .classed('outlier', true)
                            .on('mouseover', function(p) {
                                d3.select(this)
                                        .transition()
                                        .duration(duration / 2)
                                        .style('fill-opacity', 0);
                                drawLegendOutlier(values[p], true);
                                d3.event.stopPropagation();
                            })
                            .on('mouseout', function(p) {
                                d3.select(this)
                                        .transition()
                                        .duration(duration / 2)
                                        .style('fill-opacity', 1);
                                drawLegendOutlier(values[p], false);
                                d3.event.stopPropagation();
                            })
                            .style({'fill': color(d.key),
                                'stroke': color(d.key),
                                'opacity': 0})
                            .attr('r', outclicleSize)
                            .attr('cx', everywidth / 2)
                            .attr('cy', function(p) {
                                return y(values[p]);
                            })
                            .transition()
                            .duration(duration)
                            .style('opacity', 1);

                    var boxTick = d3.select(this)
                            .selectAll('.tick')
                            .data(quartileData);
                    boxTick.enter()
                            .append('svg:text')
                            .classed('tick', true)
                            .style({'opacity': 0,
                                'fill': fontColor,
                                'font-size': fontSize,
                                'font-family': fontFamily})
                            .attr('dy', '.3em')
                            .attr('dx', function(p, i) {
                                return i & 1 ? 6 : -6;
                            })
                            .attr('x', function(p, i) {
                                return i & 1 ? (everywidth - gap) : gap;
                            })
                            .attr('y', function(p) {
                                return y(p);
                            })
                            .attr('text-anchor', function(p, i) {
                                return i & 1 ? 'start' : 'end';
                            })
                            .transition()
                            .duration(duration)
                            .style('opacity', 1)
                            .text(function(p) {
                                return format(p);
                            });
                });
    }

    function nodeUpdate(nodes, everywidth, x, y) {
        var gap = everywidth * padding;
        nodes.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + x(d.key) + ',0)';
                });
        nodes.each(function(d) {
            var values = d.values.map(function(p) {
                return +p.value;
            });
            var quartileData = boxQuartiles(values);
            var whiskerIndices = outplot(values, quartileData, 1);
            var whiskerData = whiskerIndices &&
                    whiskerIndices.map(function(i) {
                        return values[i];
                    });
            var outlierIndices = whiskerIndices
                    ? d3.range(0, whiskerIndices[0])
                    .concat(d3.range(whiskerIndices[1] + 1, values.length))
                    : d3.range(values.length);
            d3.select(this)
                    .select('.center')
                    .data(whiskerData ? [whiskerData] : [])
                    .transition()
                    .duration(duration)
                    .style({
                        'stroke': lineColor,
                        'stroke-width': lineWidth
                    })
                    .attr('x1', everywidth / 2)
                    .attr('y1', function(p) {
                        return y(p[0]);
                    })
                    .attr('x2', everywidth / 2)
                    .attr('y2', function(p) {
                        return y(p[1]);
                    });

            d3.select(this)
                    .select('.box')
                    .data([quartileData])
                    .transition()
                    .duration(duration)
                    .style({
                        'stroke': lineColor,
                        'stroke-width': lineWidth,
                        'fill': color(d.key)
                    })
                    .attr('x', gap)
                    .attr('y', function(p) {
                        return y(p[2]);
                    })
                    .attr('width', everywidth - 2 * gap)
                    .attr('height', function(p) {
                        return y(p[0]) - y(p[2]);
                    });

            d3.select(this)
                    .selectAll('.median')
                    .data([quartileData[1]])
                    .transition()
                    .duration(duration)
                    .style({'stroke': lineColor,
                        'stroke-width': lineWidth})
                    .attr('x1', gap)
                    .attr('y1', function(p) {
                        return y(p);
                    })
                    .attr('x2', everywidth - gap)
                    .attr('y2', function(p) {
                        return y(p);
                    });

            d3.select(this)
                    .selectAll('.whisker')
                    .data(whiskerData || [])
                    .transition()
                    .duration(duration)
                    .style({'stroke': lineColor,
                        'stroke-width': lineWidth})
                    .attr('x1', gap)
                    .attr('y1', function(p) {
                        return y(p);
                    })
                    .attr('x2', everywidth - gap)
                    .attr('y2', function(p) {
                        return y(p);
                    });

            var outlier = d3.select(this)
                    .selectAll('.outlier')
                    .data(outlierIndices);
            outlier.exit()
                    .transition()
                    .duration(duration)
                    .attr('r', outclicleSize)
                    .style('opacity', 0)
                    .remove();

            outlier.transition()
                    .duration(duration)
                    .style({'fill': color(d.key),
                        'stroke': color(d.key)})
                    .attr('cx', everywidth / 2)
                    .attr('cy', function(i) {
                        return y(values[i]);
                    });
            outlier.enter()
                    .append('svg:circle')
                    .classed('outlier', true)
                    .on('mouseover', function(p) {
                        d3.select(this)
                                .transition()
                                .duration(duration / 2)
                                .style('fill-opacity', 0);
                        drawLegendOutlier(values[p], true);

                    })
                    .on('mouseout', function(p) {
                        d3.select(this)
                                .transition()
                                .duration(duration / 2)
                                .style('fill-opacity', 1);
                        drawLegendOutlier(values[p], false);
                    })
                    .style({'fill': color(d.key),
                        'stroke': color(d.key),
                        'opacity': 0})
                    .attr('r', outclicleSize)
                    .attr('cx', everywidth / 2)
                    .attr('cy', function(p) {
                        return y(values[p]);
                    })
                    .transition()
                    .duration(duration)
                    .style('opacity', 1);

            d3.select(this)
                    .selectAll('.tick')
                    .data(quartileData)
                    .transition()
                    .duration(duration)
                    .style({'fill': fontColor,
                        'font-size': fontSize,
                        'font-family': fontFamily})
                    .attr('dx', function(p, i) {
                        return i & 1 ? 6 : -6;
                    })
                    .attr('x', function(p, i) {
                        return i & 1 ? (everywidth - gap) : gap;
                    })
                    .attr('y', function(p) {
                        return y(p);
                    })
                    .attr('text-anchor', function(p, i) {
                        return i & 1 ? 'start' : 'end';
                    })
                    .text(function(p) {
                        return format(p);
                    });
        });

    }

    function boxQuartiles(d) {
        return [
            d3.quantile(d, .25),
            d3.quantile(d, .5),
            d3.quantile(d, .75)
        ];
    }

    function outplot(d, quartiles, k) {
        var q1 = quartiles[0],
                q3 = quartiles[2],
                iqr = (q3 - q1) * k,
                i = -1,
                j = d.length;
        while (d[++i] < q1 - iqr)
            ;
        while (d[--j] > q3 + iqr)
            ;
        return [i, j];
    }

    function drawLegendOutlier(d, style) {
        if (style) {
            floatTag.html('abnormal point value: ' + d)
                    .style({
                        'textAlign': 'center',
                        'margin': 'auto',
                        'color': '#ffffff'
                    });
            floatTag.style({
                'visibility': 'visible'
            });
        } else
            floatTag.style({
                'visibility': 'hidden'
            });
    }

    function drawLegend(d, style) {
        if (style) {
            var values = d.values.map(function(p) {
                return +p.value;
            });
            var dline = boxQuartiles(values);
            floatTag.html('<div style="font-family:Helvetica;font-size:10px;"><p style="font-style:italic;margin-bottom:5px">name: '
                    + d.key + '</p><p style="color:#2f7ed8;font-weight:bold;margin:5px">Observations</p>Minimum: '
                    + values[0] + '<br/>Lower quartile: '
                    + dline[0] + '<br/>Median: '
                    + dline[1] + '<br/>Higher quartile: '
                    + dline[2] + '<br/>Maximum: '
                    + values[values.length - 1] + '<br/></div>')
                    .style({
                        'border-color': color(d.key),
                        'opacity': 1,
                        'textAlign': 'center',
                        'margin': 'auto'
                    });
        }
        else
            floatTag.style('opacity', 0);
    }

    boxplot.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in boxplot.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    boxplot.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in boxplot.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    boxplot.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in boxplot.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    boxplot.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    boxplot.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in boxplot.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    boxplot.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in boxplot.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    boxplot.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    boxplot.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in boxplot.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    boxplot.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in boxplot.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    boxplot.legendTran = function(_) {
        if (!arguments.length)
            return [legendTranX, legendTranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in boxplot.legendTran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            legendTranX = arguments[0];
            legendTranY = arguments[1];
            return this;
        }
    };

    boxplot.legendSize = function(_) {
        if (!arguments.length)
            return legendSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.legendSize(legendSize) should be number of text');
                return this;
            } else {
                legendSize = arguments[0];
                return this;
            }
        }
    };

    boxplot.legendColor = function(_) {
        if (!arguments.length)
            return legendColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in boxplot.legendColor(legendColor) should be string of text');
                return this;
            } else {
                legendColor = arguments[0];
                return this;
            }
        }
    };

    boxplot.legendColumnNo = function(_) {
        if (!arguments.length)
            return legendColumnNo;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.legendColumnNo(legendColumnNo) should be number of text');
                return this;
            } else {
                legendColumnNo = arguments[0];
                return this;
            }
        }
    };

    boxplot.legendRowGap = function(_) {
        if (!arguments.length)
            return legendRowGap;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.legendRowGap(legendRowGap) should be number of text');
                return this;
            } else {
                legendRowGap = arguments[0];
                return this;
            }
        }
    };

    boxplot.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    boxplot.lineWidth = function(_) {
        if (!arguments.length)
            return lineWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.lineWidth(lineWidth) should be number');
                return this;
            } else {
                lineWidth = arguments[0];
                return this;
            }
        }
    };

    boxplot.lineColor = function(_) {
        if (!arguments.length)
            return lineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in boxplot.lineColor(lineColor) should be string');
                return this;
            } else {
                lineColor = arguments[0];
                return this;
            }
        }
    };

    boxplot.outclicleSize = function(_) {
        if (!arguments.length)
            return outclicleSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in boxplot.outclicleSize(outclicleSize) should be number');
                return this;
            } else {
                outclicleSize = arguments[0];
                return this;
            }
        }
    };

    boxplot.options = function(_) {
        if (!arguments.length)
            return {
                'type': boxplot.getType(),
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
                'outclicleSize': outclicleSize,
                'lineWidth': lineWidth,
                'lineColor': lineColor,
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
            _.format && boxplot.tickFormat(_.format);
            _.fontFamily && boxplot.fontFamily(_.fontFamily);
            _.fontColor && boxplot.fontColor(_.fontColor);
            isFinite(_.fontSize) && boxplot.fontSize(_.fontSize);
            isFinite(_.duration) && boxplot.duration(_.duration);

            isFinite(_.padding) && boxplot.padding(_.padding);
            isFinite(_.outclicleSize) && boxplot.outclicleSize(_.outclicleSize);
            isFinite(_.lineWidth) && boxplot.lineWidth(_.lineWidth);
            _.lineColor && boxplot.lineColor(_.lineColor);

            _.legendColor && boxplot.legendColor(_.legendColor);
            isFinite(_.legendSize) && boxplot.legendSize(_.legendSize);
            legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
            legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
            isFinite(_.legendColumnNo) && boxplot.legendColumnNo(_.legendColumnNo);
            isFinite(_.legendRowGap) && boxplot.legendRowGap(_.legendRowGap);
            return this;
        }
    };

    if (arguments.length === 1)
        boxplot.options(arguments[0]);
    return boxplot;
};
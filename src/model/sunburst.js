/**
 * sunburst
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.sunburst = function() {
    var sunburst = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = 'Sunburst'; //类型
    var width = 800; // 宽度
    var height = 800; // 高度
    var widthAvail = width; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var tranX = 0;
    var tranY = 0;
    var data; //数据
    var fontSize = 10; //字体大小
    var fontColor = '#FFFFFF'; //颜色
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = sunburst.color();

    /************局部变量***************/
    var radius = Math.min(widthAvail, heightAvail) * .45; // 雷达图半径
    var gapColor = '#FFFFFF';

    sunburst.data = function(_) {
        if (arguments.length) {
            if (_.type === 'xml') {
                _ = _.root;
                _ = XMLdata(_);
            }
            data = _;
            return this;
        } else
            return data;
    };

    sunburst.getType = function() {
        return type;
    };

    sunburst.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in sunburst.rander(_) should be <div> element');
        }

        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('sunburst', true)
                .node();
        /* 初始化变量 */
        var x = d3.scale.linear()
                .domain([0, 1])
                .range([0, 2 * Math.PI]);

        var y = d3.scale.pow()
                .exponent(1.5)
                .domain([0, 1])
                .range([0, radius]);

        var luminance = d3.scale.sqrt()
                .domain([0, 1e6])
                .clamp(true)
                .range([90, 20]);

        var node = d3.layout.partition()
                .sort(function(a, b) {
                    return d3.ascending(a.name, b.name);
                })
                .value(function(d) {
                    return d.value;
                })
                .nodes(data)
                .map(function(d) {
                    d.sum = d.value;
                    d.fill = fill(d, luminance);
                    return d;
                });

        var arc = d3.svg.arc()
                .startAngle(function(d) {
                    return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
                })
                .endAngle(function(d) {
                    return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
                })
                .innerRadius(function(d) {
                    return Math.max(0, d.y ? y(d.y) : d.y);
                })
                .outerRadius(function(d) {
                    return Math.max(0, y(d.y + d.dy));
                });

        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                sunburst.floatTag(div); //绘图元素的外容器，添加动态标签

        var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + (tranX + radius * 1.1) + ',' + (tranY + radius * 1.1) + ')');

        g.call(function(selection) {
            selection.append('svg:g')
                    .classed('nodes', true);
        });

        g = d3.select(svg)
                .select('g');
        var nodes = g.select('.nodes')
                .selectAll('.node')
                .data(node);
        nodes.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();
        nodes.each(function(d) {
            d3.select(this)
                    .select('path')
                    .transition()
                    .duration(duration)
                    .attr('d', arc)
                    .style('fill', function(d) {
                        return d.fill;
                    })
                    .style('stroke', function() {
                        return d.dx < .002 ? 'none' : gapColor;
                    });

            d3.select(this)
                    .select('text')
                    .transition()
                    .duration(duration)
                    .style({'font-family': fontFamily,
                        'fill': fontColor,
                        'font-size': fontSize})
                    .attrTween('text-anchor', function(d) {
                        return function() {
                            return x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start';
                        };
                    })
                    .attrTween('transform', function() {
                        return function() {
                            var rotate = x(d.x + d.dx / 2) * 180 / Math.PI - 90;
                            return 'rotate(' + rotate + ')translate(' + (y(d.y) + 10) + ')rotate(' + (rotate > 90 ? -180 : 0) + ')';
                        };
                    })
                    .style('fill-opacity', x(d.dx) < 0.1 || d.parent === undefined ? 0 : 1)
                    .text(d.name.substring(0, Math.round(y(d.dy) / 9)));

            d3.select(this).on('click', function(d) {
                return click(d, x, y, nodes, arc);
            });
        });
        nodes.enter()
                .append('g')
                .classed('node', true)
                .attr('data-depth', function(d) {
                    return d.depth;
                })
                .style('cursor', 'pointer')
                .on('mouseover', function(d) {
                    d3.select(this)
                            .style('opacity', .8);
                    drawLegend(d, true);
                })
                .on('mouseout', function(d) {
                    drawLegend(d, false);
                    d3.select(this)
                            .style('opacity', 1);
                })
                .each(function(d) {
                    d3.select(this)
                            .append('path')
                            .style('fill', d.fill)
                            .style('opacity', 0)
                            .style('stroke', function() {
                                return d.dx < .002 ? 'none' : gapColor;
                            })
                            .transition()
                            .duration(duration)
                            .attr('d', arc)
                            .style('opacity', 1);
                    d3.select(this)
                            .append('text')
                            .attr('dy', '5px')
                            .transition()
                            .duration(duration)
                            .style({'font-family': fontFamily,
                                'fill': fontColor,
                                'font-size': fontSize
                            })
                            .style('fill-opacity', x(d.dx) < 0.1 || d.parent === undefined ? 0 : 1)
                            .attr('text-anchor', x(d.x + d.dx / 2) > Math.PI ? 'end' : 'start')
                            .attr('transform', function() {
                                var rotate = x(d.x + d.dx / 2) * 180 / Math.PI - 90;
                                return 'rotate(' + rotate + ')translate(' + (y(d.y) + 10) + ')rotate(' + (rotate > 90 ? -180 : 0) + ')';
                            })
                            .text(d.name.substring(0, Math.round(y(d.dy) / 9)));

                    d3.select(this).on('click', function(d) {
                        return click(d, x, y, nodes, arc);
                    });
                });
    };

    function click(d, x, y, nodes, arc) {
        var text = nodes.selectAll('text');
        var path = nodes.selectAll('path');
        var scale = d3.scale.linear()
                .domain([0, d.dx])
                .range([0, 2 * Math.PI]);
        path.transition()
                .duration(duration)
                .attrTween('d', arcTween(d, x, y, arc));
        text.transition()
                .duration(duration)
                .attrTween('text-anchor', function(p) {
                    return function() {
                        return x(p.x + p.dx / 2) > Math.PI ? 'end' : 'start';
                    };
                })
                .attrTween('transform', function(p) {
                    return function() {
                        var rotate = x(p.x + p.dx / 2) * 180 / Math.PI - 90;
                        return 'rotate(' + rotate + ')translate(' + (y(p.y) + 10) + ')rotate(' + (rotate > 90 ? -180 : 0) + ')';
                    };
                })
                .style('fill-opacity', function(p) {
                    return scale(p.dx) > 0.1 && p.parent !== undefined && isParentOf(d, p) ? 1 : 0;
                });
    }

    function isParentOf(p, c) {
        if (p === c)
            return true;
        if (p.children) {
            return p.children.some(function(d) {
                return isParentOf(d, c);
            });
        }
        return false;
    }

    function arcTween(d, x, y, arc) {
        var my = maxY(d),
                xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                yd = d3.interpolate(y.domain(), [d.y, my]),
                yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(p) {
            return function(t) {
                x.domain(xd(t));
                y.domain(yd(t)).range(yr(t));
                return arc(p);
            };
        };
    }

    function maxY(d) {
        return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
    }

    function fill(d, luminance) {
        var p = d;
        while (p.depth > 1)
            p = p.parent;
        var c = d3.lab(color(p.name));
        c.l = luminance(d.sum);
        return c;
    }


    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': d.fill,
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            }).html('<p style="color:#3f7ed8;font-weight:bold;font-size:12px;margin-bottom:5px;">name: ' + d.name + '</p>value: ' + d.value);
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    function XMLdata(d) {
        if (typeof d === 'object' && d.constructor === Array) {
            var node = 0;
            var name;
            var value;
            var u;
            d.forEach(function(p, i) {
                if (p.name !== undefined) {
                    name = i;
                    node++;
                }
                if (p.value !== undefined) {
                    value = i;
                    node++;
                }
            });
            if (node === 1) {
                var k = d
                        .filter(function(p, i) {
                            return i !== name;
                        });
                for (var i = 0; i < k.length; i++) {
                    k[i]
                            .children
                            .children = XMLdata(k[i]
                                    .children
                                    .children);
                }
                u = {name: d[name].name,
                    children: d.
                            filter(function(p, i) {
                                return i !== name;
                            })
                            .map(function(p) {
                                return p.children.children;
                            })};
            }
            if (node === 2) {
                u = {name: d[name].name, value: +d[value].value};
            }
        }
        return u;
    }

    sunburst.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in sunburst.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    sunburst.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in sunburst.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    sunburst.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in sunburst.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    sunburst.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in sunburst.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    sunburst.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sunburst.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    sunburst.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sunburst.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    sunburst.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in sunburst.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    sunburst.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in sunburst.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    sunburst.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sunburst.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    sunburst.gapColor = function(_) {
        if (!arguments.length)
            return gapColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sunburst.gapColor(gapColor) should be string');
                return this;
            } else {
                gapColor = arguments[0];
                return this;
            }
        }
    };

    sunburst.radius = function(_) {
        if (!arguments.length)
            return radius;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in sunburst.radius(radius) should be number');
                return this;
            } else {
                radius = arguments[0];
                return this;
            }
        }
    };

    sunburst.options = function(_) {
        if (!arguments.length)
            return {
                'type': sunburst.getType(),
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
                'radius': radius,
                'gapColor': gapColor

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
            _.format && sunburst.tickFormat(_.format);
            _.fontFamily && sunburst.fontFamily(_.fontFamily);
            _.fontColor && sunburst.fontColor(_.fontColor);
            isFinite(_.fontSize) && sunburst.fontSize(_.fontSize);
            isFinite(_.duration) && sunburst.duration(_.duration);

            isFinite(_.radius) && sunburst.radius(_.radius);
            _.gapColor && sunburst.gapColor(_.gapColor);

            return this;
        }
    };

    if (arguments.length === 1)
        sunburst.options(arguments[0]);
    return sunburst;
};
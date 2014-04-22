/**
 * 树状图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.treemap = function() {
    var treemap = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '树状图'; //类型
    var width = 900; // 宽度
    var height = 700; // 高度
    var widthAvail = width;
    var heightAvail = height;
    var data; //数据
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var fontSize = 10; //字体大小
    var fontColor = '#000000'; //颜色
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format(',');
    var color = treemap.color();

    /************局部变量***************/
    var node;

    treemap.data = function(_) {
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

    treemap.getType = function() {
        return type;
    };

    treemap.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in treemap.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('treemap', true)
                .node();
        /* 初始化变量 */

        floatTag = d3.select(div)
                .select('.floatTag')
                .node() ?
                d3.select(div)
                .select('.floatTag') :
                treemap.floatTag(div); //绘图元素的外容器，添加动态标签
        floatTag.style('visibility', 'hidden');
        var layout = d3.layout.treemap()
                .round(false)
                .size([widthAvail, heightAvail])
                .sticky(true)
                .value(function(d) {
                    return d.value;
                });
        var x = d3.scale.linear().range([0, widthAvail]);
        var y = d3.scale.linear().range([0, heightAvail]);

        var luminance = d3.scale.sqrt()
                .domain([0, 1e6])
                .clamp(true)
                .range([90, 20]);
        layout.nodes(data)
                .filter(function(d) {
                    return !d.children;
                });
        node = data;

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
                    .classed('nodes', true);
        });

        g = d3.select(svg)
                .select('g');

        var nodes = g.select('.nodes')
                .selectAll('.node')
                .data(Array.isArray(data) ? data : [data]);

        nodes.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();

        nodes.enter()
                .append('svg:g')
                .classed('node', true)
                .on('click', function(d) {
                    return zoom(d, x, y, g, luminance);
                })
                .on('mouseover', function(d) {
                    drawLegend(d, true);
                })
                .on('mouseout', function(d) {
                    drawLegend(d, false);
                })
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                })
                .each(function(d) {
                    d3.select(this)
                            .append('svg:rect')
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .attr({'width': d.dx,
                                'height': d.dy})
                            .style({'opacity': 1,
                                'fill': fill(d, luminance)});
                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': d.dx / 2, 'y': d.dy / 2})
                            .text(d.name)
                            .style('opacity', function() {
                                return d.dx > this.getComputedTextLength()
                                        ? 1 : 0;
                            })
                            .transition()
                            .duration(duration)
                            .style({'dy': '.35em',
                                'text-anchor': 'middle',
                                'font-family': fontFamily,
                                'fill': fontColor,
                                'font-size': fontSize});

                });

        d3.select('body')
                .on('click', function() {
                    zoom(node, x, y, g, luminance);
                });
    };

    function fill(d, luminance) {
        var p = d;
        while (p.depth > 1)
            p = p.parent;
        var c = d3.lab(color(p.name));
        c.l = luminance(d.value);
        return c;
    }

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'visibility': 'visible',
                'textAlign': 'center',
                'margin': 'auto',
                'color': '#ffffff'
            }).html('<p style="color:#3f7ed8; font - weight:bold; font - size:13px">name: ' +
                    d.name + '</p>value: ' + format(d.value.toFixed(5)));
        }
        else {
            floatTag.style('visibility', 'hidden');
        }
    }

    function zoom(d, x, y, g, luminance) {
        node = d.parent || data;
        var kx = widthAvail / d.dx;
        var ky = heightAvail / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        var t = g.select('.nodes')
                .selectAll('.node')
                .data(d.children ? d.children : [d]);
        t.exit()
                .transition()
                .duration(duration / 2)
                .style('opacity', 0)
                .remove();

        t.each(function(p) {
            d3.select(this)
                    .transition()
                    .duration(duration)
                    .attr('transform', 'translate(' + x(p.x) + ',' + y(p.y) + ')');

            d3.select(this)
                    .select('rect')
                    .attr({'fill': fill(p, luminance)})
                    .transition()
                    .duration(duration)
                    .attr({'width': kx * p.dx - 1 < 0 ? 0 : kx * p.dx - 1,
                        'height': ky * p.dy - 1 < 0 ? 0 : ky * p.dy - 1});

            d3.select(this)
                    .select('text')
                    .attr({'dy': '.35em',
                        'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': fontSize})
                    .text(p.name)
                    .style('opacity', function() {
                        return kx * p.dx > this.getComputedTextLength()
                                ? 1 : 0;
                    })
                    .transition()
                    .duration(duration)
                    .attr({'x': kx * p.dx / 2,
                        'y': ky * p.dy / 2});
        });

        t.enter()
                .append('svg:g')
                .classed('node', true)
                .attr('transform', function(p) {
                    return 'translate(' + x(p.x) + ',' + y(p.y) + ')';
                })
                .on('click', function(p) {
                    return zoom(p, x, y, g, luminance);
                })
                .on('mouseover', function(p) {
                    drawLegend(p, true);
                })
                .on('mouseout', function(p) {
                    drawLegend(p, false);
                })
                .each(function(p) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr({'fill': fill(p, luminance),
                                'width': 0,
                                'height': 0})
                            .transition()
                            .duration(duration)
                            .attr({'width': kx * p.dx - 1 < 0 ? 0 : kx * p.dx - 1,
                                'height': ky * p.dy - 1 < 0 ? 0 : ky * p.dy - 1});

                    d3.select(this)
                            .append('svg:text')
                            .attr({'dy': '.35em',
                                'text-anchor': 'middle',
                                'font-family': fontFamily,
                                'font-size': fontSize})
                            .text(p.name)
                            .style('opacity', function() {
                                return kx * p.dx > this.getComputedTextLength()
                                        ? 1 : 0;
                            })
                            .transition()
                            .duration(duration)
                            .attr({'x': kx * p.dx / 2,
                                'y': ky * p.dy / 2});

                });
        d3.event.stopPropagation();
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

    treemap.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in treemap.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    treemap.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in treemap.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    treemap.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in treemap.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    treemap.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in treemap.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    treemap.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in treemap.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    treemap.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in treemap.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    treemap.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in treemap.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    treemap.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in treemap.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    treemap.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in treemap.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    treemap.options = function(_) {
        if (!arguments.length)
            return {
                'type': treemap.getType(),
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
                'duration': duration
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
            _.format && treemap.tickFormat(_.format);
            _.fontFamily && treemap.fontFamily(_.fontFamily);
            _.fontColor && treemap.fontColor(_.fontColor);
            isFinite(_.fontSize) && treemap.fontSize(_.fontSize);
            isFinite(_.duration) && treemap.duration(_.duration);

            return this;
        }
    };
    if (arguments.length === 1)
        treemap.options(arguments[0]);
    return treemap;
};
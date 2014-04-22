/**
 * sankey
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.sankey = function() {
    var sankey = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = 'Sankey'; //类型
    var width = 700; // 宽度
    var height = 400; // 高度
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
    var duration = 1000; // 变化时间
    var format = d3.format(',.0f');
    var color = sankey.color();

    /************局部变量***************/
    var linkOpacity = .2;
    var linkColor = function(d, i) {
        return '#000000';
    };

    sankey.data = function(_) {
        if (arguments.length) {
            if (_.type === 'xml') {
                _ = _.root;
                _ = XMLdata(_);
            }
            var nodes = d3.map();
            _.nodes.forEach(function(d) {
                nodes.set(d.name, d);
            });
            _.links.forEach(function(d) {
                d.source = nodes.get(d.source);
                d.target = nodes.get(d.target);
            });
            data = _;
            return this;
        } else
            return data;
    };

    sankey.getType = function() {
        return type;
    };

    sankey.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in sankey.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('sankey', true)
                .node();

        /* 计算要需的数据值 */
        var san = d3.sankey()
                .nodeWidth(15)
                .nodePadding(10)
                .size([widthAvail - 2, heightAvail - 2]);

        san.nodes(data.nodes)
                .links(data.links)
                .layout(40);


        var path = san.link();

        floatTag = d3.select(div)
                .select('.floatTag')
                .node() ?
                d3.select(div)
                .select('.floatTag') :
                sankey.floatTag(div); // 绘图元素的外容器，添加动态标签

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
                    .classed('links', true); // 网格线
            selection.append('svg:g')
                    .classed('nodes', true); //刻度
        });

        g = d3.select(svg)
                .select('g');

        var links = g.select('.links')
                .selectAll('.link')
                .data(data.links);
        links.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        linkUpdate(links, path);
        linkDraw(links, path);

        var nodes = g.select('.nodes')
                .selectAll('.node')
                .data(data.nodes);
        nodes.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        nodeUpdate(nodes, san, path, links);
        nodeDraw(nodes, san, path, links);

    };

    function linkUpdate(links, path) {
        links.transition()
                .duration(duration)
                .attr('d', path)
                .style('stroke-width', function(d) {
                    return Math.max(1, d.dy);
                })
                .style('stroke', linkColor)
                .sort(function(a, b) {
                    return b.dy - a.dy;
                });
    }

    function linkDraw(links, path) {
        links.enter()
                .append('svg:path')
                .classed('link', true)
                .attr('d', path)
                .style({'fill': 'none',
                    'opacity': linkOpacity})
                .style('stroke', linkColor)
                .style('stroke-width', function(d) {
                    return Math.max(1, d.dy);
                })
                .on('mouseover', function(d) {
                    drawLegend(d, true);
                    d3.select(this)
                            .transition()
                            .duration(duration / 3)
                            .style('stroke-opacity', .5);
                })
                .on('mouseout', function(d) {
                    drawLegend(d, false);
                    d3.select(this)
                            .transition()
                            .duration(duration / 3)
                            .style('stroke-opacity', 1);
                });
    }

    function nodeUpdate(nodes, san, path, links) {
        nodes.call(d3.behavior.drag()
                .origin(function(d) {
                    return d;
                })
                .on('dragstart', function() {
                    this.parentNode.appendChild(this);
                })
                .on('drag', dragmove))
                .each(function(d, i) {
                    d3.select(this)
                            .attr('transform', 'translate(' + d.x + ',' + d.y + ')');

                    d3.select(this)
                            .select('rect')
                            .transition()
                            .duration(duration)
                            .attr('height', d.dy)
                            .attr('width', san.nodeWidth())
                            .style('fill', function() {
                                return d.color = color(i);
                            })
                            .style('stroke', function() {
                                return d3.rgb(d.color).darker(2);
                            });

                    d3.select(this)
                            .select('text')
                            .transition()
                            .duration(duration)
                            .attr('y', d.dy / 2)
                            .text(function(d) {
                                return d.name;
                            })
                            .style({'font-family': fontFamily,
                                'fill': fontColor,
                                'font-size': fontSize})
                            .filter(function(d) {
                                return d.x < san.width / 2;
                            })
                            .attr('x', 6 + san.nodeWidth())
                            .attr('text-anchor', 'start');
                });

        function dragmove(d) {
            d3.select(this)
                    .attr('transform', 'translate(' + d.x + ',' +
                            (d.y = Math.max(0, Math.min(heightAvail -
                                    d.dy, d3.event.y))) + ')');

            san.relayout();
            links.attr('d', path);
        }
    }

    function nodeDraw(nodes, san, path, links) {
        nodes.enter()
                .append('svg:g')
                .classed('node', true)
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                })
                .call(d3.behavior.drag()
                        .origin(function(d) {
                            return d;
                        })
                        .on('dragstart', function() {
                            this.parentNode.appendChild(this);
                        })
                        .on('drag', dragmove))
                .each(function(d, i) {
                    d3.select(this)
                            .append('svg:rect')
                            .attr('height', d.dy)
                            .attr('width', san.nodeWidth())
                            .style('fill', function() {
                                return d.color = color(i);
                            })
                            .style({'cursor': 'move',
                                'fill-opacity': .7,
                                'stroke': d3.rgb(d.color).darker(2),
                                'shape-rendering': 'crispEdges'});
                    d3.select(this)
                            .append('svg:text')
                            .attr({'x': -2,
                                'y': d.dy / 2,
                                'dy': '.35em',
                                'text-anchor': 'end'
                            })
                            .text(d.name)
                            .style({'pointer-events': 'none',
                                'text-shadow': '0 1px 0 #fff',
                                'font-family': fontFamily,
                                'fill': fontColor,
                                'font-size': fontSize})
                            .filter(function() {
                                return d.x < san.width / 2;
                            })
                            .attr('x', 6 + san.nodeWidth())
                            .attr('text-anchor', 'start');
                });

        function dragmove(d) {
            d3.select(this)
                    .attr('transform', 'translate(' + d.x + ',' +
                            (d.y = Math.max(0, Math.min(heightAvail - d.dy, d3.event.y))) + ')');
            san.relayout();
            links.attr('d', path);
        }
    }

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': linkColor(d),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            }).html('source: ' + d.source.name + '<br/>' + 'target: ' +
                    d.target.name + '<br/>' + 'value: ' + format(d.value));
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
            var target;
            var source;
            d.forEach(function(p) {
                if (p.nodes !== undefined) {
                    nodes = p.nodes
                            .nodes
                            .map(function(k) {
                                return {name: k.node.name};
                            });
                } else if (p.links !== undefined) {
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

    sankey.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in sankey.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    sankey.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in sankey.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    sankey.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in sankey.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    sankey.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in sankey.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    sankey.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sankey.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    sankey.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sankey.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    sankey.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in sankey.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    sankey.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in sankey.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    sankey.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in sankey.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    sankey.linkOpacity = function(_) {
        if (!arguments.length)
            return linkOpacity;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in sankey.linkOpacity(linkOpacity) should be number');
                return this;
            } else {
                linkOpacity = arguments[0];
                return this;
            }
        }
    };

    sankey.linkColor = function(_) {
        if (!arguments.length)
            return linkColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof typeof arguments[0] !== 'string') {
                console.error('The arguments in graph.linkColor(linkColor) should be function or string');
                return this;
            } else {
                linkColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    sankey.options = function(_) {
        if (!arguments.length)
            return {
                'type': sankey.getType(),
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
                'linkOpacity': linkOpacity,
                'linkColor': linkColor
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
            _.format && sankey.tickFormat(_.format);
            _.fontFamily && sankey.fontFamily(_.fontFamily);
            _.fontColor && sankey.fontColor(_.fontColor);
            isFinite(_.fontSize) && sankey.fontSize(_.fontSize);
            isFinite(_.duration) && sankey.duration(_.duration);

            _.linkColor && sankey.linkColor(_.linkColor);
            isFinite(_.linkOpacity) && sankey.linkOpacity(_.linkOpacity);
            return this;
        }
    };

    if (arguments.length === 1)
        sankey.options(arguments[0]);
    return sankey;
};
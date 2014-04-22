/**
 * 树形图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.tree = function() {
    var tree = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '树图'; //类型
    var width = 800; // 宽度
    var height = 500; // 高度
    var widthAvail = width - 100; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var data; //数据
    var tranX = 50; //图形右移距离
    var tranY = 0; //图形下移距离
    var fontSize = 10; //字体大小
    var fontColor = '#000'; //颜色
    var fontFamily = 'Arial'; // 字体样式
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format(',');
    var color = tree.color();

    /************局部变量***************/
    var layout;
    var id = 0;
    var lineWidth = function(d, i) {
        return 1;
    };
    var lineColor = function(d, i) {
        return '#CCCCCC';
    };
    var leafColor = function(d, i) {
        return color(d.depth);
    };
    var leafSize = function(d, i) {
        return 4;
    };
    var nodeColor = function(d, i) {
        return '#CCCCCC';
    };
    var nodeSize = function(d, i) {
        return 6;
    };

    tree.data = function(_) {
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

    tree.getType = function() {
        return type;
    };

    tree.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in tree.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('tree', true)
                .node();

        /* 初始化变量 */
        layout = d3.layout.tree()
                .size([heightAvail, widthAvail]);

        data.x0 = heightAvail / 2;
        data.y0 = 0;

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
                    .classed('links', true);
            selection.append('svg:g')
                    .classed('nodes', true);
        });

        data.children.forEach(toggleAll);

        update(data);
    };

    function update(source) {

        /*nodes部分，
         * 展开成一维，得到数组nodes。reverse决定这个一维数组是否要反序：有reverse则深层节点的信息排在前面，上层的信息在后面
         * 所有节点将获得以下属性：
         * parent
         * children
         * depth
         * x（适用任意坐标系，代表其中一个量度）表示相同深度的平行分布状况
         * y（适用任意坐标系，代表另一个量度）表示关于深度的位置*/
        var nodeData = layout.nodes(data).reverse();
        var linkData = layout.links(nodeData);

        var node = d3.select('.nodes')
                .selectAll('.node')
                .data(nodeData, function(d) {
                    return d.id || (d.id = ++id);
                });

        var nodeExit = node.exit()
                .transition()
                .duration(duration)
                .attr('transform', function() {
                    return 'translate(' + source.y + ',' + source.x + ')';
                })
                .remove();

        nodeExit.select('circle')
                .attr('r', 0);
        nodeExit.select('text')
                .attr('fill-opacity', 0);

        var nodeEnter = node.enter()
                .append('svg:g')
                .classed('node', true)
                .style('cursor', 'pointer')//鼠标指针移过时的样子
                .attr('transform', function() {
                    return 'translate(' + source.y0 + ',' + source.x0 + ')';
                })
                .on('click', function(d) {
                    toggle(d);
                    update(d);
                });

        nodeEnter.append('svg:circle')
                .attr('r', 0)
                .style('stroke', function(d, i) {
                    return d._children ? leafColor(d, i) : nodeColor(d, i);
                })
                .style('stroke-width', 1)
                .style('fill-opacity', function(d) {
                    return d._children ? 0.5 : 0;
                });

        nodeEnter.append('svg:text')
                .attr({'font-size': fontSize,
                    'fill': fontColor,
                    'font-family': fontFamily,
                    'fill-opacity': 0,
                    'dy': '.35em'})
                .attr('x', function(d) {
                    return d.children || d._children ? -10 : 10;
                })
                .attr('text-anchor', function(d) {
                    return d.children || d._children ? 'end' : 'start';
                })
                .text(function(d) {
                    return d.name;
                });

        var nodeUpdate = node.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + d.y + ',' + d.x + ')';
                });

        nodeUpdate.select('circle')
                .attr('r', function(d, i) {
                    return d.children || d._children ? leafSize(d, i) : nodeSize(d, i);
                })
                .style('fill', function(d, i) {
                    return d.children || d._children ? leafColor(d, i) : nodeColor(d, i);
                })
                .style('fill-opacity', function(d) {
                    return d.children || d._children ? .5 : 0;
                });

        nodeUpdate.select('text')
                .attr('fill-opacity', 1);

        var link = d3.select('.links')
                .selectAll('.link')
                .data(linkData, function(d) {
                    return d.target.id;
                });

        var diagonal = d3.svg.diagonal()
                .projection(function(d) {
                    return [d.y, d.x];
                });

        link.enter()
                .insert('svg:path', 'g')
                .classed('link', true)
                .style('fill', 'none')
                .style('stroke', lineColor)
                .style('stroke-width', lineWidth)
                .attr('d', function() {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .transition()
                .duration(duration)
                .attr('d', diagonal);

        link.transition()
                .duration(duration)
                .attr('d', diagonal);

        link.exit()
                .transition()
                .duration(duration)
                .attr('d', function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

        nodeData.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    function toggleAll(d) {
        if (d.children) {
            d.children.forEach(toggleAll);
            toggle(d);
        }
    }

    function toggle(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
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

    tree.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in tree.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    tree.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in tree.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    tree.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in tree.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    tree.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in tree.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    tree.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in tree.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    tree.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in tree.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    tree.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in tree.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    tree.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in tree.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    tree.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in tree.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    tree.lineWidth = function(_) {
        if (!arguments.length)
            return lineWidth;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                console.error('The arguments in tree.lineWidth(lineWidth) should be function or number');
                return this;
            } else {
                lineWidth = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    tree.lineColor = function(_) {
        if (!arguments.length)
            return lineColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in tree.lineColor(lineColor) should be function or string');
                return this;
            } else {
                lineColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    tree.leafSize = function(_) {
        if (!arguments.length)
            return leafSize;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                console.error('The arguments in tree.leafSize(leafSize) should be function or number');
                return this;
            } else {
                leafSize = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    tree.leafColor = function(_) {
        if (!arguments.length)
            return leafColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in tree.leafColor(leafColor) should be function or string');
                return this;
            } else {
                leafColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    tree.nodeSize = function(_) {
        if (!arguments.length)
            return nodeSize;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                console.error('The arguments in tree.nodeSize(nodeSize) should be function or number');
                return this;
            } else {
                nodeSize = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    tree.nodeColor = function(_) {
        if (!arguments.length)
            return nodeColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in tree.nodeColor(nodeColor) should be function or string');
                return this;
            } else {
                nodeColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    tree.options = function(_) {
        if (!arguments.length)
            return {
                'type': tree.getType(),
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
                'lineWidth': lineWidth,
                'lineColor': lineColor,
                'leafSize': leafSize,
                'leafColor': leafColor,
                'nodeSize': nodeSize,
                'nodeColor': nodeColor};
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
            _.format && tree.tickFormat(_.format);
            _.fontFamily && tree.fontFamily(_.fontFamily);
            _.fontColor && tree.fontColor(_.fontColor);
            isFinite(_.fontSize) && tree.fontSize(_.fontSize);
            isFinite(_.duration) && tree.duration(_.duration);

            _.lineWidth && tree.lineWidth(_.lineWidth);
            _.lineColor && tree.lineColor(_.lineColor);
            _.leafSize && tree.leafSize(_.leafSize);
            _.leafColor && tree.leafColor(_.leafColor);
            _.nodeSize && tree.nodeSize(_.nodeSize);
            _.nodeColor && tree.nodeColor(_.nodeColor);
            return this;
        }
    };

    if (arguments.length === 1)
        tree.options(arguments[0]);
    return tree;
};
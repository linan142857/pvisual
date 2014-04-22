/**
 * circlepacking
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.circlepacking = function() {
    var circlepacking = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = 'Circle Packing'; //类型
    var width = 600; // 宽度
    var height = 600; // 高度
    var widthAvail = width - 100; // 实际利用宽度
    var heightAvail = height - 100; // 实际利用高度
    var tranX = 50; //图形右移距离
    var tranY = 50; //图形下移距离
    var data; //数据
    var fontSize = 3; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = circlepacking.color();

    /************局部变量***************/
    var radius;
    var circleLineWidth = 1;
    var circleLineColor = function(d, i) {
        return '#DD71DD';
    };
    var circleFillColor = function(d, i) {
        return '#F8F8FF';
    };
    var nodeColor = function(d, i) {
        return '#FF7F0E';
    };
    var opacity = .7;
    var currentdata; // 临时数据

    circlepacking.data = function(_) {
        if (arguments.length) {
            if (_.type === 'xml') {
                _ = _.root;
                _ = XMLdata(_);
            }
            data = _;
            currentdata = data;
            return this;
        } else
            return data;
    };

    circlepacking.getType = function() {
        return type;
    };

    circlepacking.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in circlepacking.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('circlepacking', true)
                .node();

        /* 初始化变量 */

        radius = Math.min(widthAvail, heightAvail) - 5;

        var layout = d3.layout.pack()
                .size([radius, radius])
                .value(function(d) {
                    return +d.value;
                });

        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                circlepacking.floatTag(div); //绘图元素的外容器，添加动态标签

        var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + tranX + ',' + tranY + ')');

        g = d3.select(svg)
                .select('g');

        var nodes = g.datum(currentdata)
                .selectAll('g')
                .data(layout.nodes);

        var nodesExit = nodes.exit()
                .transition()
                .duration(duration)
                .remove();

        nodesExit.select('circle')
                .attr('r', 0);
        nodesExit.select('text')
                .attr('fill-opacity', 0);

        nodeUpdate(nodes);
        nodeDraw(nodes);

        g.selectAll('.leaf')
                .on('mouseover', function(d) {
                    drawLegend(d, true);
                })
                .on('mouseout', function(d) {
                    drawLegend(d, false);
                });

        g.selectAll('g')
                .on('click', function(d) {
                    if (d3.event) {
                        d3.event.stopPropagation();
                        d3.event.preventDefault();
                    }
                    currentdata = d;
                    circlepacking.render();
                });

        d3.select('body')
                .on('click', function() {
                    if (d3.event) {
                        d3.event.stopPropagation();
                        d3.event.preventDefault();
                    }
                    currentdata = currentdata.parent || currentdata;
                    circlepacking.render();
                });
    };

    function nodeUpdate(nodes) {
        nodes.each(function(d) {
            d3.select(this)
                    .attr('class', function(d) {
                        return d.children ? 'node' : 'leaf';
                    })
                    .call(function(selection) {
                        selection
                                .transition()
                                .duration(duration)
                                .attr('transform', function(d) {
                                    return 'translate(' + d.x + ',' + d.y + ')';
                                });

                        selection
                                .select('circle')
                                .transition()
                                .duration(duration)
                                .style('fill', function(d) {
                                    return d.children ? circleFillColor(d) : nodeColor(d);
                                })
                                .style('stroke', function(d) {
                                    return d.children ? circleLineColor(d) : 'none';
                                })
                                .style('opacity', function(d) {
                                    return d.children ? opacity : 1;
                                })
                                .style('stroke-width', circleLineWidth)
                                .attr('r', function(d) {
                                    return (d.r > 1 ? d.r : 0);
                                });

                        selection
                                .select('text')
                                .transition()
                                .duration(duration)
                                .style({'text-anchor': 'middle',
                                    'font-size': fontSize,
                                    'fill': fontColor,
                                    'font-family': fontFamily,
                                    'opacity': 1})
                                .text(function() {
                                    return !d.children ? (d.r > 8 ?
                                            d.name.substring(0, d.r / 4) : '') : '';
                                });
                    });

        });
    }

    function nodeDraw(nodes) {
        nodes.enter()
                .append('svg:g')
                .attr('class', function(d) {
                    return d.children ? 'node' : 'leaf';
                })
                .attr('transform', function(d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                })
                .call(function(selection) {
                    selection
                            .append('svg:circle')
                            .style('cursor', 'pointer')
                            .attr('r', 0)
                            .style('fill', function(d) {
                                return d.children ? circleFillColor(d) : nodeColor(d);
                            })
                            .style('stroke', function(d) {
                                return d.children ? circleLineColor(d) : 'none';
                            })
                            .style('opacity', function(d) {
                                return d.children ? opacity : 1;
                            })
                            .style('stroke-width', circleLineWidth)
                            .transition()
                            .duration(duration)
                            .attr('r', function(d) {
                                return (d.r > 1 ? d.r : 0);
                            });

                    selection
                            .append('svg:text')
                            .style('opacity', 0)
                            .transition()
                            .duration(duration)
                            .attr({'dy': '6px',
                                'color': '#FFFFFF'})
                            .style({'text-anchor': 'middle',
                                'font-size': fontSize,
                                'fill': fontColor,
                                'font-family': fontFamily,
                                'opacity': 1})
                            .text(function(d) {
                                return !d.children ? (d.r > 8 ?
                                        d.name.substring(0, d.r / 4) : '') : '';
                            });
                });
    }

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': nodeColor(d),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            })
                    .html('name: ' + d.name + '<br/>' +
                            'value: ' + format(d.value));
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

    circlepacking.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in circlepacking.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    circlepacking.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in circlepacking.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    circlepacking.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in circlepacking.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    circlepacking.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in circlepacking.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    circlepacking.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in circlepacking.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    circlepacking.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in circlepacking.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    circlepacking.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in circlepacking.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    circlepacking.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in circlepacking.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    circlepacking.circleLineWidth = function(_) {
        if (!arguments.length)
            return circleLineWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in circlepacking.circleLineWidth(circleLineWidth) should be number');
                return this;
            } else {
                circleLineWidth = arguments[0];
                return this;
            }
        }
    };

    circlepacking.opacity = function(_) {
        if (!arguments.length)
            return opacity;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in circlepacking.opacity(opacity) should be number');
                return this;
            } else {
                opacity = arguments[0];
                return this;
            }
        }
    };

    circlepacking.circleLineColor = function(_) {
        if (!arguments.length)
            return circleLineColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in circlepacking.circleLineColor(circleLineColor) should be function or string');
                return this;
            } else {
                circleLineColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    circlepacking.circleFillColor = function(_) {
        if (!arguments.length)
            return circleFillColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in circlepacking.circleFillColor(circleFillColor) should be function or string');
                return this;
            } else {
                circleFillColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    circlepacking.nodeColor = function(_) {
        if (!arguments.length)
            return nodeColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in circlepacking.nodeColor(nodeColor) should be function or string');
                return this;
            } else {
                nodeColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    circlepacking.options = function(_) {
        if (!arguments.length)
            return {'type': circlepacking.getType(),
                'width': width,
                'height': height,
                'widthAvail': widthAvail,
                'heightAvail': heightAvail,
                'tranX': tranX,
                'tranY': tranY,
                'format': format,
                'fontSize': fontSize,
                'fontFamily': fontFamily,
                'color': color,
                'duration': duration,
                'circleLineWidth': circleLineWidth,
                'opacity': opacity,
                'circleLineColor': circleLineColor,
                'circleFillColor': circleFillColor,
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
            _.format && circlepacking.tickFormat(_.format);
            _.fontFamily && circlepacking.fontFamily(_.fontFamily);
            isFinite(_.fontSize) && circlepacking.fontSize(_.fontSize);
            isFinite(_.duration) && circlepacking.duration(_.duration);

            isFinite(_.circleLineWidth) && circlepacking.circleLineWidth(_.circleLineWidth);
            isFinite(_.opacity) && circlepacking.opacity(_.opacity);
            _.circleLineColor && circlepacking.circleLineColor(_.circleLineColor);
            _.circleFillColor && circlepacking.circleFillColor(_.circleFillColor);
            _.nodeColor && circlepacking.nodeColor(_.nodeColor);


            return this;
        }
    };

    if (arguments.length === 1)
        circlepacking.options(arguments[0]);
    return circlepacking;
};
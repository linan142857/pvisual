/**
 * 网络图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.graph = function() {
    var graph = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '网络图'; //类型
    var width = 800; // 宽度
    var height = 800; // 高度
    var widthAvail = width; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var data; //数据
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 500; // 变化时间
    var format = d3.format('s');
    var color = graph.color();
    var clusterPadding = 20;

    /************局部变量***************/
    var dragHold = true;
    var gravity = .1;
    var theta = .8;
    var friction = .9;
    var charge = -250;
    var nodeSize = function(d, i) {
        return 5;
    };
    var nodeColor = function(d, i) {
        return  color(d.group);
    };
    var linkDistance = function(d, i) {
        return 10 + d.value * 5;
    };
    var linkWidth = function(d, i) {
        return 1;
    };
    var linkColor = function(d, i) {
        return '#AAAAAA';
    };
    var linkLightWidthSource = function(d, i) {
        return 1;
    };
    var linkLightWidthTarget = function(d, i) {
        return 1;
    };
    var linkLightColorSource = function(d, i) {
        return '#FF6666';
    };
    var linkLightColorTarget = function(d, i) {
        return '#6666FF';
    };
    var nodeLightColor = function(d, i) {
        return '#d62799';
    };
    var nodeLightSize = function(d, i) {
        return 6;
    };

    graph.data = function(_) {
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
            _.links = _.links.filter(function(d) {
                return d.source !== undefined && d.target !== undefined;
            });
            data = _;
            return this;
        } else
            return data;
    };

    graph.getType = function() {
        return type;
    };

    graph.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            alert('The argument(element) in graph.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('graph', true)
                .node();

        d3.select(svg).select('g').remove();

        var shiftKey, force = d3.layout.force()
                .alpha(1)
                .charge(charge)
                .gravity(gravity)
                .theta(theta)
                .friction(friction)
                .linkDistance(linkDistance)
                .size([widthAvail - 5, heightAvail - 5]);

        force.nodes(data.nodes)
                .links(data.links)
                .start();

        floatTag = d3.select(div)
                .select('.floatTag')
                .node() ?
                d3.select(div)
                .select('.floatTag') :
                graph.floatTag(div); // 绘图元素的外容器，添加动态标签

        /* 建立层次模型 */
        var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + tranX + ',' + tranY + ')');
        var brush = g.append('svg:g')
                .datum(function() {
                    return {selected: false, previouslySelected: false};
                })
                .classed('brush', true);

        g.call(function(selection) {
            selection.append('svg:g')
                    .classed('links', true);
            selection.append('svg:g')
                    .classed('nodes', true);
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

        links.enter()
                .append('svg:line')
                .classed('link', true)
                .style('stroke-width', linkWidth)
                .style('stroke', linkColor);


        var nodes = g.select('.nodes')
                .selectAll('.node')
                .data(data.nodes);

        nodes.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        nodes.enter()
                .append('svg:circle')
                .classed('node', true)
                .on('mouseover', function(d) {
                    d3.select(this)
                            .attr('r', nodeLightSize)
                            .style('fill-opacity', .8)
                            .style('fill', nodeLightColor);
                    g.select('.links')
                            .selectAll('.link')
                            .each(function(p) {
                                if (p.source === d) {
                                    d3.select(this)
                                            .style('stroke-width', linkLightWidthSource)
                                            .style('stroke', linkLightColorSource);
                                } else if (p.target === d) {
                                    d3.select(this)
                                            .style('stroke-width', linkLightWidthTarget)
                                            .style('stroke', linkLightColorTarget);
                                }
                            });
                    drawLegend(d, true, g);
                })
                .on('mouseout', function(d) {
                    d3.select(this)
                            .attr('r', nodeSize)
                            .style('fill-opacity', 1)
                            .style('fill', color(d.group));
                    g.select('.links')
                            .selectAll('.link')
                            .filter(function(p) {
                                return p.source === d || p.target === d;
                            })
                            .style('stroke-width', linkWidth)
                            .style('stroke', linkColor);
                    drawLegend(d, false, g);
                });

        nodes = g.selectAll('.node')
                .attr('r', nodeSize)
                .style('stroke', 'none')
                .style('fill', nodeColor);

        nodes.on('mousedown', function(d) {
            if (!d.selected) { // Don't deselect on shift-drag.
                if (!shiftKey)
                    nodes.classed('selected', function(p) {
                        return p.selected = d === p;
                    });
                else
                    d3.select(this).classed('selected', d.selected = true);
            }
        }).on('mouseup', function(d) {
            if (d.selected && shiftKey)
                d3.select(this).classed('selected', d.selected = false);
        });

        if (dragHold) {
            brush.call(d3.svg.brush()
                    .x(d3.scale.identity().domain([0, widthAvail - 5]))
                    .y(d3.scale.identity().domain([0, heightAvail - 5]))
                    .on('brushstart', function() {
                        nodes.each(function(d) {
                            d.previouslySelected = shiftKey && d.selected;
                        });
                    })
                    .on('brush', function() {
                        var extent = d3.event.target.extent();
                        nodes.classed('selected', function(d) {
                            d.selected = d.previouslySelected ^ (extent[0][0] <= d.x && d.x < extent[1][0] && extent[0][1] <= d.y && d.y < extent[1][1]);
                            d3.select(this).style('stroke', d.selected === 1 ? '#000000' : 'none');
                            return d.selected;
                        });
                    })
                    .on('brushend', function() {
                        d3.event.target.clear();
                        d3.select(this).call(d3.event.target);
                    }));
            nodes.call(d3.behavior.drag()
                    .on('drag', function() {
                        nudge(d3.event.dx, d3.event.dy);
                    }));
            brush.select('.extent')
                    .style({'fill-opacity': .1,
                        'stroke': '#FFFFFF',
                        'shape-rendering': 'crispEdges'});
        } else {
            d3.select(svg)
                    .select('.brush')
                    .remove();
            nodes.call(force.drag);
        }

        force.on('tick', function() {
            links
                    .attr('x1', function(d) {
                        return d.source.x;
                    })
                    .attr('y1', function(d) {
                        return d.source.y;
                    })
                    .attr('x2', function(d) {
                        return d.target.x;
                    })
                    .attr('y2', function(d) {
                        return d.target.y;
                    });

            nodes
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    });
        });

        function nudge(dx, dy) {
            nodes.filter(function(d) {
                return d.selected;
            })
                    .attr("cx", function(d) {
                        return d.x += dx;
                    })
                    .attr("cy", function(d) {
                        return d.y += dy;
                    });

            links.filter(function(d) {
                return d.source.selected;
            })
                    .attr("x1", function(d) {
                        return d.source.x;
                    })
                    .attr("y1", function(d) {
                        return d.source.y;
                    });

            links.filter(function(d) {
                return d.target.selected;
            })
                    .attr("x2", function(d) {
                        return d.target.x;
                    })
                    .attr("y2", function(d) {
                        return d.target.y;
                    });
        }
    };

    graph.map = function() {
        function distance(ptone, pttwo) {
            return Math.sqrt(Math.pow(pttwo[0] - ptone.x, 2) + Math.pow(pttwo[1] - ptone.y, 2));
        }
        var r = 20;
        var minExtent = [Number.MAX_VALUE, Number.MAX_VALUE];
        var maxExtent = [Number.MIN_VALUE, Number.MIN_VALUE];
        data.nodes.forEach(function(d) {
            minExtent[0] = minExtent[0] > d.x ? d.x : minExtent[0];
            minExtent[1] = minExtent[1] > d.y ? d.y : minExtent[1];
            maxExtent[0] = maxExtent[0] < d.x ? d.x : maxExtent[0];
            maxExtent[1] = maxExtent[1] < d.y ? d.y : maxExtent[1];
        });
        minExtent[0] -= 10, minExtent[1] -= 10, maxExtent[0] += 10, maxExtent[1] += 10;
        var vertices = d3.range(Math.round(widthAvail * heightAvail / 1000)).map(function() {
            return [Math.random() * (maxExtent[0] - minExtent[0]) + minExtent[0], Math.random() * (maxExtent[1] - minExtent[1]) + minExtent[1], -1];
        });
        for (var i = 0; i < vertices.length; i++) {
            var pt = vertices[i];
            var dist = Number.MAX_VALUE;
            for (var j = 0; j < data.nodes.length; j++) {
                var inpoint = data.nodes[j];
                var d = distance(inpoint, pt);
                if (d < dist) {
                    pt[2] = inpoint.group;
                    dist = d;
                }
            }
            if (dist > r)
                pt[2] = -1;
        }

        var n = data.nodes.map(function(d) {
            return [d.x, d.y, d.group];
        });
        n = d3.merge([vertices, n]);
        var voronoi = d3.geom.voronoi()
                .clipExtent([minExtent, maxExtent]);
        var path = d3.select('.graph g').append('svg:g').classed('map', true).selectAll('path');
        path = path.data(voronoi(n), polygon);
        path.exit().remove();

        path.enter().append('path')
                .style('fill-opacity', .3)
                .style('stroke-opacity', .1)
                .style('fill', function(d) {
                    return d.point[2] === -1 ? 'none' : color(d.point[2]);
                })
                .style('stroke', 'none')
                .attr('d', polygon);

        path.order();
        function polygon(d) {
            return 'M' + d.join('L') + 'Z';
        }

    };

    graph.circle = function(_) {
        function distance(ptone, pttwo) {
            return Math.sqrt(Math.pow(pttwo[0] - ptone.x, 2) + Math.pow(pttwo[1] - ptone.y, 2));
        }
        var nest = d3.nest()
                .key(function(d) {
                    return d.group;
                })
                .entries(data.nodes);

        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            alert('The argument(element) in graph.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('graph', true)
                .node();

        d3.select(svg).select('g').remove();

        var force = d3.layout.force()
                .nodes(data.nodes)
                .links(data.links)
                .alpha(1)
                .charge(charge)
                .gravity(gravity)
                .theta(theta)
                .linkDistance(80)
                .friction(friction)
                .size([widthAvail - 5, heightAvail - 5])
                .on('tick', tick)
                .start();

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
                    .classed('links', true);
            selection.append('svg:g')
                    .classed('nodes', true);
            selection.append('svg:g')
                    .classed('clusters', true);
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

        links.enter()
                .append('svg:line')
                .classed('link', true)
                .style('stroke-width', linkWidth)
                .style('stroke', linkColor);


        var nodes = g.select('.nodes')
                .selectAll('.node')
                .data(data.nodes);

        nodes.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        nodes.enter()
                .append('svg:circle')
                .classed('node', true);

        nodes = g.selectAll('.node')
                .attr('r', nodeSize)
                .style('stroke', 'none')
                .style('fill', nodeColor)
                .call(force.drag);


        var clusters = g.select('.clusters')
                .selectAll('.cluster')
                .data(nest);
        clusters.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();
        clusters.enter()
                .append('svg:circle')
                .classed('cluster', true)
                .style('fill', 'none');

        // Resolves collisions between d and all other circles.
        function tick(e) {
            function collide(alpha) {
                var quadtree = d3.geom.quadtree().extent([[0, 0], [widthAvail, heightAvail]])(cluster_center);
                return function(d) {
                    var r = d.radius * 2 + clusterPadding,
                            nx1 = d.x - r,
                            nx2 = d.x + r,
                            ny1 = d.y - r,
                            ny2 = d.y + r;
                    quadtree.visit(function(quad, x1, y1, x2, y2) {
                        if (quad.point && (quad.point !== d)) {
                            var x = d.x - quad.point.x,
                                    y = d.y - quad.point.y,
                                    l = Math.sqrt(x * x + y * y),
                                    r = d.radius + quad.point.radius + clusterPadding;
                            if (l < r) {
                                l = (l - r) / l * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                quad.point.x += x;
                                quad.point.y += y;
                            }
                        }
                        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                };
            }
            function cluster(alpha) {
                return function(d) {
                    var cluster = cluster_center[d.group];
                    var x = d.x - cluster.x,
                            y = d.y - cluster.y,
                            l = Math.sqrt(x * x + y * y);
                    l *= alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                };
            }
            var cluster_center = [];
            nest.forEach(function(d) {
                var v = d.values;
                var x = 0;
                var y = 0;
                v.forEach(function(p) {
                    x += p.x;
                    y += p.y;
                });
                x /= v.length;
                y /= v.length;
                var dist = Number.MIN_VALUE;
                var des;
                v.forEach(function(p) {
                    des = distance(p, [x, y]);
                    if (dist < des)
                        dist = des;
                });
                cluster_center[d.key] = {group: d.key, x: x, y: y, radius: dist + 5};
            });
            cluster_center.forEach(collide(3 * e.alpha));
            nodes
                    .each(cluster(e.alpha * .01))
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    });
            links
                    .attr('x1', function(d) {
                        return d.source.x;
                    })
                    .attr('y1', function(d) {
                        return d.source.y;
                    })
                    .attr('x2', function(d) {
                        return d.target.x;
                    })
                    .attr('y2', function(d) {
                        return d.target.y;
                    });
            clusters.data(cluster_center)
                    .attr('cx', function(d) {
                        return d.x;
                    })
                    .attr('cy', function(d) {
                        return d.y;
                    })
                    .style('stroke', function(d) {
                        return color(d.group);
                    })
                    .attr('r', function(d) {
                        return d.radius;
                    });
        }
    };

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'border-color': color(d.group),
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            }).html('name: ' + d.name);
        } else {
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

    graph.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            alert('The argument(element) in graph.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    graph.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            alert('The argument(element) in graph.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    graph.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            alert('The argument(element) in graph.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    graph.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                alert('The arguments in graph.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    graph.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                alert('The arguments in graph.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    graph.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                alert('The arguments in graph.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    graph.dragHold = function(_) {
        if (!arguments.length)
            return dragHold;
        else if (_ === true || _ === false)
            dragHold = _;
        return this;
    };

    graph.gravity = function(_) {
        if (!arguments.length)
            return gravity;
        else {
            if (!isFinite(arguments[0])) {
                alert('The arguments in graph.gravity(gravity) should be number');
                return this;
            } else {
                gravity = arguments[0];
                return this;
            }
        }
    };

    graph.theta = function(_) {
        if (!arguments.length)
            return theta;
        else {
            if (!isFinite(arguments[0])) {
                alert('The arguments in graph.theta(theta) should be number');
                return this;
            } else {
                theta = arguments[0];
                return this;
            }
        }
    };

    graph.friction = function(_) {
        if (!arguments.length)
            return friction;
        else {
            if (!isFinite(arguments[0])) {
                alert('The arguments in graph.friction(friction) should be number');
                return this;
            } else {
                friction = arguments[0];
                return this;
            }
        }
    };

    graph.charge = function(_) {
        if (!arguments.length)
            return charge;
        else {
            if (!isFinite(arguments[0])) {
                alert('The arguments in graph.charge(charge) should be number');
                return this;
            } else {
                charge = arguments[0];
                return this;
            }
        }
    };

    graph.nodeSize = function(_) {
        if (!arguments.length)
            return nodeSize;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.nodeSize(nodeSize) should be function or number');
                return this;
            } else {
                nodeSize = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.nodeColor = function(_) {
        if (!arguments.length)
            return nodeColor;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.nodeColor(nodeColor) should be function or string');
                return this;
            } else {
                nodeColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.linkDistance = function(_) {
        if (!arguments.length)
            return linkDistance;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.linkDistance(linkDistance) should be function or number');
                return this;
            } else {
                linkDistance = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.linkWidth = function(_) {
        if (!arguments.length)
            return linkWidth;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.linkWidth(linkWidth) should be function or number');
                return this;
            } else {
                linkWidth = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.linkColor = function(_) {
        if (!arguments.length)
            return linkColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                alert('The arguments in graph.linkColor(linkColor) should be function or string');
                return this;
            } else {
                linkColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.nodeLightColor = function(_) {
        if (!arguments.length)
            return nodeLightColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                alert('The arguments in graph.nodeLightColor(nodeLightColor) should be function or string');
                return this;
            } else {
                nodeLightColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.nodeLightSize = function(_) {
        if (!arguments.length)
            return nodeLightSize;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.nodeLightSize(nodeLightSize) should be function or number');
                return this;
            } else {
                nodeLightSize = d3.functor(arguments[0]);
                return this;

            }
        }
    };

    graph.linkLightWidthSource = function(_) {
        if (!arguments.length)
            return linkLightWidthSource;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.linkLightWidthSource(linkLightWidthSource) should be function or number');
                return this;
            } else {
                linkLightWidthSource = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.linkLightWidthTarget = function(_) {
        if (!arguments.length)
            return linkLightWidthTarget;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                alert('The arguments in graph.linkLightWidthTarget(linkLightWidthTarget) should be function or number');
                return this;
            } else {
                linkLightWidthTarget = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.linkLightColorSource = function(_) {
        if (!arguments.length)
            return linkLightColorSource;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                alert('The arguments in graph.linkLightColorSource(linkLightColorSource) should be function or string');
                return this;
            } else {
                linkLightColorSource = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.linkLightColorTarget = function(_) {
        if (!arguments.length)
            return linkLightColorTarget;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                alert('The arguments in graph.linkLightColorTarget(linkLightColorTarget) should be function or string');
                return this;
            } else {
                linkLightColorTarget = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    graph.options = function(_) {
        if (!arguments.length)
            return {
                'type': graph.getType(),
                'width': width,
                'height': height,
                'widthAvail': widthAvail,
                'heightAvail': heightAvail,
                'tranX': tranX,
                'tranY': tranY,
                'format': format,
                'color': color,
                'duration': duration,
                'c': dragHold,
                'gravity': gravity,
                'theta': theta,
                'friction': friction,
                'charge': charge,
                'nodeSize': nodeSize,
                'nodeColor': nodeColor,
                'linkDistance': linkDistance,
                'linkWidth': linkWidth,
                'linkColor': linkColor,
                'nodeLightColor': nodeLightColor,
                'nodeLightSize': nodeLightSize,
                'linkLightWidthSource': linkLightWidthSource,
                'linkLightWidthTarget': linkLightWidthTarget,
                'linkLightColorSource': linkLightColorSource,
                'linkLightColorTarget': linkLightColorTarget
            };
        else if (typeof _ !== 'object') {
            alert('The arguments in map.options(options) should be object');
            return this;
        } else {
            width = isFinite(_.width) ? _.width : width;
            height = isFinite(_.height) ? _.height : height;
            widthAvail = isFinite(_.widthAvail) ? _.widthAvail : widthAvail;
            heightAvail = isFinite(_.heightAvail) ? _.heightAvail : heightAvail;
            tranX = isFinite(_.tranX) ? _.tranX : tranX;
            tranY = isFinite(_.tranY) ? _.tranY : tranY;
            _.format && graph.tickFormat(_.format);
            isFinite(_.duration) && graph.duration(_.duration);
            _.dragHold && graph.dragHold(_.dragHold);
            isFinite(_.gravity) && graph.gravity(_.gravity);
            isFinite(_.theta) && graph.theta(_.theta);
            isFinite(_.friction) && graph.friction(_.friction);
            isFinite(_.charge) && graph.charge(_.charge);
            _.nodeSize && graph.nodeSize(_.nodeSize);
            _.linkDistance && graph.linkDistance(_.linkDistance);
            _.linkWidth && graph.linkWidth(_.linkWidth);
            _.linkColor && graph.linkColor(_.linkColor);
            _.nodeLightColor && graph.nodeLightColor(_.nodeLightColor);
            _.nodeLightSize && graph.nodeLightSize(_.nodeLightSize);
            _.linkLightWidthSource && graph.linkLightWidthSource(_.linkLightWidthSource);
            _.linkLightWidthTarget && graph.linkLightWidthTarget(_.linkLightWidthTarget);
            _.linkLightColorSource && graph.linkLightColorSource(_.linkLightColorSource);
            _.linkLightColorTarget && graph.linkLightColorTarget(_.linkLightColorTarget);
            return this;
        }
    };

    if (arguments.length === 1)
        graph.options(arguments[0]);
    return graph;
};
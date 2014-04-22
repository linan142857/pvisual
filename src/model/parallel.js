/**
 * 平行坐标系
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.parallel = function() {
    var parallel = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '平行坐标系'; //类型
    var width = 800; // 宽度
    var height = 400; // 高度
    var widthAvail = width - 10; // 实际利用宽度
    var heightAvail = height - 20; // 实际利用高度
    var tranX = 10; //图形右移距离
    var tranY = 10; //图形下移距离
    var data; //数据
    var fontSize = 8; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var fontColor = '#000000'; //颜色
    var floatTag; // 活动标签
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = parallel.color();

    /************局部变量***************/
    var dimension;
    var lineColor = function(d, i) {
        return color(d.name);
    };
    var lineWidth = function(d, i) {
        return 1;
    };
    var backColor = function(d, i) {
        return '#EEEEEE';
    };
    /******坐标轴******/
    var ytickRotate = 0;
    var ytickNumber = 5;
    var ytickLineLength = 5;
    var tickTextSize = 8;
    var tickTextColor = '#929292';
    var tickLineColor = '#929292';
    var axisPathWidth = 2;
    var axisPathColor = '#000000';

    parallel.data = function(_) {
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
            dimension = pvisual.keys(_[0])
                    .filter(function(d) {
                        return d !== 'name';
                    });

            dimension.x = d3.set(_.map(function(d) {
                return d.name;
            }));

            dimension.x = dimension.x.values();
            data = _;
            return this;
        } else
            return data;
    };

    parallel.getType = function() {
        return type;
    };

    parallel.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in parallel.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('parallel', true)
                .node();
        /* 初始化变量 */
        var x = d3.scale.ordinal()
                .rangePoints([0, widthAvail], 1)
                .domain(dimension);

        var y = {};

        var line = d3.svg.line();
        dimension.forEach(function(d) {
            y[d] = d3.scale.linear()
                    .domain(d3.extent(data, function(p) {
                        return +p[d];
                    }))
                    .range([heightAvail, 0]);
        });

        dimension.forEach(function(d) {
            y[d].brush = d3.svg.brush()
                    .y(y[d])
                    .on('brush', brush);
            y[d].yAxis = d3.svg.axis()
                    .orient('left')
                    .scale(y[d])
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);
        });

        floatTag = d3.select(div).select('.floatTag').node() ?
                d3.select(div).select('.floatTag') :
                parallel.floatTag(div); //绘图元素的外容器，添加动态标签

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
                    .classed('dimensions', true);
            selection.append('svg:g')
                    .classed('y-axis axis', true);
        });

        g = d3.select(svg)
                .select('g');

        var dimensions = g.select('.dimensions')
                .style({'fill': 'none',
                    'stroke-opacity': '0.2',
                    'shape-rendering': 'crispEdges'})
                .selectAll('path')
                .data(data);

        dimensions.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        dimensions.transition()
                .duration(duration)
                .style('stroke', lineColor)
                .style('stroke-width', lineWidth)
                .attr('d', path);

        dimensions.enter()
                .append('svg:path')
                .style('stroke', lineColor)
                .style('stroke-width', lineWidth)
                .attr('d', path);

        axis(g, x, y);

        /* 给定一组数据，返回一条在坐标轴上显示的路径 */
        function path(d) {
            return line(dimension.map(function(p) {
                return [x(p), y[p](+d[p])];
            }));
        }

        /* 滑块事件响应函数 */
        function brush() {
            var actives = dimension.filter(function(p) { // 存在滑块的坐标轴对应的数据属性
                return !y[p].brush.empty();
            });
            var extents = actives.map(function(p) { //滑块的上下边界
                return y[p].brush.extent();
            });

            var filters = [];
            actives.forEach(function(d, i) {
                filters[i] = {
                    dimension: d,
                    extent: extents[i]
                };
            });

            var active = []; // 存放活动的数据
            d3.select(svg)
                    .select('.dimensions')
                    .selectAll('path')
                    .style('stroke', function(d) {
                        var isActive = actives.every(function(p, i) {
                            return extents[i][0] <= d[p] && d[p] <= extents[i][1];
                        });
                        if (isActive)
                            active.push(d);

                        return isActive ? lineColor(d) : backColor(d);
                    });
        }
    };

    function axis(g, x, y) {
        var axis = g.select('.y-axis')
                .selectAll('.y')
                .data(dimension);

        axis.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        axis.transition()
                .duration(duration)
                .attr('transform', function(d) {
                    return 'translate(' + x(d) + ',0)';
                })
                .each(function(d) {
                    d3.select(this)
                            .call(y[d].yAxis)
                            .select('.brush')
                            .call(y[d].brush);
                });

        axis.enter()
                .append('svg:g')
                .classed('y', true)
                .attr('transform', function(d) {
                    return 'translate(' + x(d) + ',0)';
                })
                .each(function(d) {
                    d3.select(this)
                            .call(y[d].yAxis)
                            .append('svg:g')
                            .classed('brush', true)
                            .call(y[d].brush)
                            .selectAll('rect')
                            .attr('x', -8)
                            .attr('width', 16)
                            .style({'fill-opacity': 0.3,
                                'stroke': '#FFFFFF',
                                'shape-rendering': 'crispEdges'});
                });

        g.select('.y-axis')
                .selectAll('.y')
                .each(function(d) {
                    d3.select(this)
                            .select('.label')
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': fontSize,
                                'fill': fontColor
                            })
                            .text(d);

                    d3.select(this)
                            .selectAll('.label')
                            .data([1])
                            .enter()
                            .append('svg:text')
                            .classed('label', true)
                            .style({'text-anchor': 'end',
                                'font-family': fontFamily,
                                'font-size': fontSize,
                                'fill': fontColor
                            })
                            .attr({'transform': 'rotate(-90)',
                                'y': 8,
                                'dy': '.71em'})
                            .text(d);
                });

        g.selectAll('.axis')
                .call(function(selection) {
                    selection
                            .selectAll('path')
                            .style({'fill': 'none',
                                'stroke': axisPathColor,
                                'stroke-width': axisPathWidth,
                                'shape-rendering': 'crispEdges'});

                    selection
                            .selectAll('line')
                            .style({'fill': 'none',
                                'stroke': tickLineColor,
                                'shape-rendering': 'crispEdges'});
                });

        g.select('.y-axis')
                .selectAll('.tick')
                .select('text')
                .style({'text-anchor': 'start',
                    'font-family': fontFamily,
                    'font-size': tickTextSize,
                    'fill': tickTextColor})
                .attr('transform', function() {
                    return 'translate(' + -this.getComputedTextLength() +
                            ', 0)rotate(' + ytickRotate + ')';
                });
    }

    parallel.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in parallel.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    parallel.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in parallel.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    parallel.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in parallel.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    parallel.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in parallel.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    parallel.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    parallel.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.fontColor(fontColor) should be string of text');
                return this;
            } else {
                fontColor = arguments[0];
                return this;
            }
        }
    };

    parallel.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in parallel.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    parallel.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in parallel.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    parallel.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    parallel.ytickRotate = function(_) {
        if (!arguments.length)
            return ytickRotate;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in parallel.ytickRotate(ytickRotate) should be number of tick');
                return this;
            } else {
                ytickRotate = Math.round(arguments[0]);
                return this;
            }
        }
    };

    parallel.ytickNumber = function(_) {
        if (!arguments.length)
            return ytickNumber;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in parallel.ytickNumber(ytickNumber) should be number of tick');
                return this;
            } else {
                ytickNumber = Math.round(arguments[0]);
                return this;
            }
        }
    };

    parallel.tickLineColor = function(_) {
        if (!arguments.length)
            return tickLineColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.tickLineColor(tickLineColor) should be string');
                return this;
            } else {
                tickLineColor = arguments[0];
                return this;
            }
        }
    };

    parallel.tickTextSize = function(_) {
        if (!arguments.length)
            return tickTextSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in parallel.tickTextSize(tickTextSize) should be number');
                return this;
            } else {
                tickTextSize = arguments[0];
                return this;
            }
        }
    };

    parallel.tickTextColor = function(_) {
        if (!arguments.length)
            return tickTextColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.tickTextColor(tickTextColor) should be string');
                return this;
            } else {
                tickTextColor = arguments[0];
                return this;
            }
        }
    };

    parallel.axisPathWidth = function(_) {
        if (!arguments.length)
            return axisPathWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in parallel.axisPathWidth(axisPathWidth) should be string');
                return this;
            } else {
                axisPathWidth = arguments[0];
                return this;
            }
        }
    };

    parallel.axisPathColor = function(_) {
        if (!arguments.length)
            return axisPathColor;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.axisPathColor(axisPathColor) should be string');
                return this;
            } else {
                axisPathColor = arguments[0];
                return this;
            }
        }
    };

    parallel.lineColor = function(_) {
        if (!arguments.length)
            return lineColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.lineColor(lineColor) should be function or string');
                return this;
            } else {
                lineColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    parallel.backColor = function(_) {
        if (!arguments.length)
            return backColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in parallel.backColor(backColor) should be function or string');
                return this;
            } else {
                backColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    parallel.lineWidth = function(_) {
        if (!arguments.length)
            return lineWidth;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                console.error('The arguments in parallel.lineWidth(lineWidth) should be function or number');
                return this;
            } else {
                lineWidth = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    parallel.options = function(_) {
        if (!arguments.length)
            return {
                'type': parallel.getType(),
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
                'lineColor': lineColor,
                'lineWidth': lineWidth,
                'backColor': backColor,
                'ytickRotate': ytickRotate,
                'ytickNumber': ytickNumber,
                'tickTextSize': tickTextSize,
                'tickTextColor': tickTextColor,
                'tickLineColor': tickLineColor,
                'ytickLineLength': ytickLineLength,
                'axisPathWidth': axisPathWidth,
                'axisPathColor': axisPathColor
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
            _.format && parallel.tickFormat(_.format);
            _.fontFamily && parallel.fontFamily(_.fontFamily);
            _.fontColor && parallel.fontColor(_.fontColor);
            isFinite(_.fontSize) && parallel.fontSize(_.fontSize);
            isFinite(_.duration) && parallel.duration(_.duration);

            _.lineColor && parallel.lineColor(_.lineColor);
            _.lineWidth && parallel.lineWidth(_.lineWidth);
            _.backColor && parallel.backColor(_.backColor);

            isFinite(_.tickTextSize) && parallel.tickTextSize(_.tickTextSize);
            _.tickTextColor && parallel.tickTextColor(_.tickTextColor);
            _.tickLineColor && parallel.tickLineColor(_.tickLineColor);
            isFinite(_.ytickRotate) && parallel.ytickRotate(_.ytickRotate);
            isFinite(_.ytickNumber) && parallel.ytickNumber(_.ytickNumber);
            isFinite(_.ytickLineLength) && parallel.ytickLineLength(_.ytickLineLength);
            isFinite(_.axisPathWidth) && parallel.axisPathWidth(_.axisPathWidth);
            _.axisPathColor && parallel.axisPathColor(_.axisPathColor);
            return this;
        }
    };

    if (arguments.length === 1)
        parallel.options(arguments[0]);
    return parallel;
};
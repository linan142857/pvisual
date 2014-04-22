/**
 * 脸谱图
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.chernoff = function() {
    var chernoff = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    /************全局变量***************/
    var type = '切尔诺夫脸谱图'; //类型
    var width = 600; // 宽度
    var height = 600; // 高度
    var widthAvail = width; // 实际利用宽度
    var heightAvail = height; // 实际利用高度
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var data; //数据
    var fontSize = 10; //字体大小
    var fontFamily = 'Arial'; // 字体样式
    var floatTag;
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = chernoff.color();

    /************局部变量***************/
    var lineWidth = 2;
    var lineColor = function(d) {
        return '#000';
    };

    chernoff.data = function(_) {
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
            data = _;
            return this;
        } else
            return data;
    };

    chernoff.getType = function() {
        return type;
    };

    chernoff.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in chernoff.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('chernoff', true)
                .node();

        /* 计算要需的数据值 */
        var cf = d3.chernoff()
                .face(function(d) {
                    return d.f;
                })
                .hair(function(d) {
                    return d.h;
                })
                .mouth(function(d) {
                    return d.m;
                })
                .nosew(function(d) {
                    return d.nw;
                })
                .noseh(function(d) {
                    return d.nh;
                })
                .eyew(function(d) {
                    return d.ew;
                })
                .eyeh(function(d) {
                    return d.eh;
                })
                .brow(function(d) {
                    return d.b;
                });

        floatTag = d3.select(div)
                .select('.floatTag')
                .node() ?
                d3.select(div)
                .select('.floatTag') :
                chernoff.floatTag(div); // 绘图元素的外容器，添加动态标签

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
                    .classed('dimensions', true);
        });

        g = d3.select(svg)
                .select('g');

        var dimensions = g.select('.dimensions')
                .selectAll('.dimension')
                .data(data);

        dimensions.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        dimensions
                .call(cf)
                .transition()
                .duration(duration)
                .attr('transform', function(d, i) {
                    return 'translate(' + (i % parseInt(widthAvail / 150) * 150) +
                            ',' + (parseInt(i / (widthAvail / 150)) * 150) + ')';
                })
                .select('text')
                .style('stroke', lineColor)
                .style({'font-family': fontFamily,
                    'font-size': fontSize})
                .text(function(d) {
                    return d.name;
                });

        dimensions.enter()
                .append('svg:g')
                .classed('dimension', true)
                .on('mouseover', function(d) {
                    drawLegend(d, true);
                })
                .on('mouseout', function(d) {
                    drawLegend(d, false);
                })
                .style('stroke', lineColor)
                .style({'fill': 'none',
                    'stroke-width': lineWidth,
                    'opacity': 0})
                .call(cf)
                .call(function(selection) {
                    selection.append('svg:text')
                            .style('stroke', lineColor)
                            .style({'text-anchor': 'middle',
                                'font-family': fontFamily,
                                'stroke-width': 1,
                                'font-size': fontSize})
                            .attr('transform', function(d, i) {
                                return 'translate(70, 175)';
                            })
                            .text(function(d) {
                                return d.name;
                            });
                })
                .attr('transform', function(d, i) {
                    return 'translate(' + (i % parseInt(widthAvail / 150) * 150) +
                            ',' + (parseInt(i / (widthAvail / 150)) * 150) + ')';
                })
                .transition()
                .duration(duration)
                .style('opacity', 1);
    };

    function drawLegend(d, style) {
        if (style) {
            floatTag.style({
                'opacity': 1,
                'textAlign': 'center',
                'margin': 'auto'
            }).html('<span style="color:#2f7ed8;font-size:15px;font-weight:bold;margin:5px">name: ' + d.name +
                    '</span><hr style="margin:5px"/>face: ' + format(d.f) +
                    '<br/>hair: ' + format(d.h) +
                    '<br/>nose-w: ' + format(d.nw) +
                    '<br/>nose-h: ' + format(d.nh) +
                    '<br/>eye-w: ' + format(d.ew) +
                    '<br/>eye-h: ' + format(d.eh) +
                    '<br/>mouse: ' + format(d.m) +
                    '<br/>brow: ' + format(d.b));
        }
        else {
            floatTag.style('opacity', 0);
        }
    }

    chernoff.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chernoff.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    chernoff.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chernoff.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    chernoff.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in chernoff.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    chernoff.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chernoff.fontSize(fontSize) should be number of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    chernoff.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in chernoff.fontFamily(fontFamily) should be string of text');
                return this;
            } else {
                fontSize = arguments[0];
                return this;
            }
        }
    };

    chernoff.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chernoff.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    chernoff.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in chernoff.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    chernoff.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in chernoff.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    chernoff.lineWidth = function(_) {
        if (!arguments.length)
            return lineWidth;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in chernoff.lineWidth(lineWidth) should be number');
                return this;
            } else {
                lineWidth = arguments[0];
                return this;
            }
        }
    };

    chernoff.lineColor = function(_) {
        if (!arguments.length)
            return lineColor;
        else {
            if (typeof arguments[0] !== 'string' && typeof arguments[0] !== 'function') {
                console.error('The arguments in chernoff.lineColor(lineColor) should be string or function');
                return this;
            } else {
                lineColor = arguments[0];
                return this;
            }
        }
    };

    chernoff.options = function(_) {
        if (!arguments.length)
            return {
                'type': chernoff.getType(),
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
                'lineColor': lineColor
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
            _.format && chernoff.tickFormat(_.format);
            _.fontFamily && chernoff.fontFamily(_.fontFamily);
            _.fontColor && chernoff.fontColor(_.fontColor);
            isFinite(_.fontSize) && chernoff.fontSize(_.fontSize);
            isFinite(_.duration) && chernoff.duration(_.duration);

            isFinite(_.lineWidth) && chernoff.lineWidth(_.lineWidth);
            _.lineColor && chernoff.lineColor(_.lineColor);

            return this;
        }
    };

    if (arguments.length === 1)
        chernoff.options(arguments[0]);
    return chernoff;
};
/**
 * 标签云
 * @returns {_L5.pvisual.extend.sub|Window|Object}
 */
pvisual.model.wordcloud = function() {
    var wordcloud = pvisual.extend(); //主函數
    var d3 = _.d3; // d3
    var type = 'Word Cloud'; //类型
    var width = 700; // 宽度
    var height = 500; // 高度
    var widthAvail = width;
    var heightAvail = height;
    var data; //数据
    var tranX = 0; //图形右移距离
    var tranY = 0; //图形下移距离
    var div; // 外层div
    var svg; // 外层svg
    var duration = 1000; // 变化时间
    var format = d3.format('s');
    var color = wordcloud.color();

    /************局部变量***************/
    var fontSize = function(d, i) {
        return d.value * 3;
    };
    var fontColor = function(d, i) {
        return color(i);
    };//颜色
    var fontFamily = function(d, i) {
        return 'Impact';
    }; // 字体样式
    var padding = 1;
    var random = false;

    wordcloud.data = function(_) {
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

    wordcloud.getType = function() {
        return type;
    };

    wordcloud.render = function(_) {
        /* 获取外层的标签 */
        div = div || d3.select(_).node();
        if (!div || div.tagName.toLowerCase() !== 'div') {
            console.error('The argument(element) in wordcloud.rander(_) should be <div> element');
        }
        d3.select(div).classed('chart', true);
        svg = svg || d3.select(div)
                .append('svg')
                .classed('wordcloud', true)
                .node();
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
                    .classed('texts', true)
                    .attr('transform', 'translate(' + width / 2 +
                            ',' + height / 2 + ')');
        });

        d3.layout.cloud()
                .size([widthAvail, heightAvail])
                .words(data.map(function(d) {
                    return {text: d.text, size: fontSize(d), url: d.url || ''};
                }))
                .padding(padding)
                .rotate(function() {
                    return random ? (Math.random() * 2) * 90 :
                            ~~(Math.random() * 2) * 90;
                })
                .font(fontFamily)
                .fontSize(function(d) {
                    return d.size;
                })
                .on('end', textDraw)
                .start();
    };

    function textDraw(data) {
        var texts = d3.select(svg)
                .select('.texts')
                .selectAll('.text')
                .data(data);
        texts.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

        texts.attr('xlink:href', function(d) {
            return d.url;
        })
                .select('text')
                .transition()
                .duration(duration)
                .style('fill', function(d, i) {
                    return color(i);
                })
                .attr('transform', function(d) {
                    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .text(function(d) {
                    return d.text;
                });

        texts.enter()
                .append('svg:a')
                .classed('text', true)
                .attr('xlink:href', function(d) {
                    return d.url;
                })
                .style('text-decoration', 'none')
                .append('svg:text')
                .style('fill', function(d, i) {
                    return color(i);
                })
                .transition()
                .duration(duration)
                .style('font-size', function(d) {
                    return d.size + 'px';
                })
                .style('font-family', fontFamily)
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .text(function(d) {
                    return d.text;
                });
    }

    wordcloud.size = function(_) {
        if (!arguments.length)
            return [width, height];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in wordcloud.size(width, height) should be number and number of svg');
            return this;
        }
        else {
            width = arguments[0];
            height = arguments[1];
            return this;
        }
    };

    wordcloud.sizeAvail = function(_) {
        if (!arguments.length)
            return [widthAvail, heightAvail];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in wordcloud.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
            return this;
        }
        else {
            widthAvail = arguments[0];
            heightAvail = arguments[1];
            return this;
        }
    };

    wordcloud.tran = function(_) {
        if (!arguments.length)
            return [tranX, tranY];
        else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
            console.error('The argument(element) in wordcloud.tran(tranX, tranY) should be number and number of svg');
            return this;
        }
        else {
            tranX = arguments[0];
            tranY = arguments[1];
            return this;
        }
    };

    wordcloud.fontSize = function(_) {
        if (!arguments.length)
            return fontSize;
        else {
            if (typeof arguments[0] !== 'function' && !isFinite(arguments[0])) {
                console.error('The arguments in wordcloud.fontSize(fontSize) should be function or number');
                return this;
            } else {
                fontSize = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    wordcloud.fontFamily = function(_) {
        if (!arguments.length)
            return fontFamily;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in wordcloud.fontFamily(fontFamily) should be function or string');
                return this;
            } else {
                fontFamily = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    wordcloud.fontColor = function(_) {
        if (!arguments.length)
            return fontColor;
        else {
            if (typeof arguments[0] !== 'function' && typeof arguments[0] !== 'string') {
                console.error('The arguments in wordcloud.fontColor(fontColor) should be function or string');
                return this;
            } else {
                fontColor = d3.functor(arguments[0]);
                return this;
            }
        }
    };

    wordcloud.duration = function(_) {
        if (!arguments.length)
            return duration;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in wordcloud.duration(duration) should be number of transition');
                return this;
            } else {
                duration = Math.round(arguments[0]);
                return this;
            }
        }
    };

    wordcloud.color = function(_) {
        if (!arguments.length)
            return color;
        else {
            if (typeof arguments[0] !== 'function') {
                console.error('The arguments in wordcloud.color(color) should be function of pvisual.color');
                return this;
            } else {
                color = arguments[0];
                return this;
            }
        }
    };

    wordcloud.tickFormat = function(_) {
        if (!arguments.length)
            return format;
        else {
            if (typeof arguments[0] !== 'string') {
                console.error('The arguments in wordcloud.tickFormat(format) should be string of d3.format');
                return this;
            } else {
                format = d3.format(arguments[0]);
                return this;
            }
        }
    };

    wordcloud.padding = function(_) {
        if (!arguments.length)
            return padding;
        else {
            if (!isFinite(arguments[0])) {
                console.error('The arguments in wordcloud.padding(padding) should be number');
                return this;
            } else {
                padding = arguments[0];
                return this;
            }
        }
    };

    wordcloud.isRandom = function(_) {
        if (!arguments.length)
            return random;
        else {
            if (typeof arguments[0] !== true && typeof arguments[0] !== false) {
                console.error('The arguments in wordcloud.isRandom(random) should be bool');
                return this;
            } else {
                random = arguments[0];
                return this;
            }
        }
    };

    wordcloud.options = function(_) {
        if (!arguments.length)
            return {
                'type': wordcloud.getType(),
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
                'isRandom': random
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
            _.format && wordcloud.tickFormat(_.format);
            _.fontFamily && wordcloud.fontFamily(_.fontFamily);
            _.fontSize && wordcloud.fontSize(_.fontSize);
            _.fontColor && wordcloud.fontColor(_.fontColor);
            isFinite(_.duration) && wordcloud.duration(_.duration);

            isFinite(_.padding) && wordcloud.padding(_.padding);
            _.random && wordcloud.random(_.random);

            return this;
        }
    };
    if (arguments.length === 1)
        wordcloud.options(arguments[0]);
    return wordcloud;
};
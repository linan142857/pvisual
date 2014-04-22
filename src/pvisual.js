/**
 * 
 * Various changes
 * 
 */


/*
 * 2013-12-21(v0.0.1-alpha)
 * 完成代码的第一次整合，集合的第一个版本 v0.1.0
 * 整合21种图形资源、建立API
 * @author Liyulin
 */

// ==========================================

/*
 * 2014-02-19(v0.0.2-alpha)
 * 改变的功能包括：
 * 1.对地图添加图例
 * 2.增加graph.dragHold(bool)选项，FALSE为graph的单节点动态拖拽，TRUE为节点集静态拖拽
 * 3.地图的初始大小从[600, 600]变化为[1000, 600]。并将地图的画板改为正方形，边长为初始大小的较小值
 * 4.pvisual.clone增加对function的复制功能，解决处理因为对array功能函数的复制导致的错误
 * @author Liyulin
 */

// ==========================================

/*
 * 2014-02-25(v0.0.3-alpha)
 * 解決严重bug：颜色库函数共享造成的颜色篡改，更改颜色函数;
 * 解决严重bug：浮动标签的位置偏移;
 */

// ==========================================

/*
 * 2014-03-08(v0.0.4-alpha)
 * 增加图片转换保存项(pvisual.save)
 * 引入依赖库（canvg.js filesaver.js jspdf.js jspdf.plugin.addimaage.js rgbcolor.js）开源MIT许可
 */

// ==========================================

/*
 * 2014-03-22(v0.0.5-alpha)
 * 新增图形样式combo
 */

(function(_) {
    'use strict';
    
    /**
     * 基础库支持
     */
    if (!_.d3)
        console.error('Pvisual needs the support of d3');

    var d3 = _.d3;

    var type = 'Pvisual'; // name

    var theme = function() { //颜色主题
        return {color: d3.map({
                aliceblue: '#F0F8FF',
                antiquewhite: '#FAEBD7',
                aquamarine: '#7FFFD4',
                azure: '#F0FFFF',
                beige: '#F5F5DC',
                bisque: '#FFE4C4',
                black: '#000000',
                blanchedalmond: '#FFEBCD',
                blueviolet: '#8A2BE2',
                brown: '#A52A2A',
                burlywood: '#DEB887',
                cadetblue: '#5F9EA0',
                chartreuse: '#7FFF00',
                chocolate: '#D2691E',
                coral: '#FF7F50',
                cornflowerblue: '#6495ED',
                cornsilk: '#FFF8DC',
                crimson: '#DC143C',
                cyan: '#00FFFF',
                darkblue: '#00008B',
                darkcyan: '#008B8B',
                darkgoldenrod: '#B8860B',
                darkgray: '#A9A9A9',
                darkgreen: '#006400',
                darkgrey: '#A9A9A9',
                darkkhaki: '#BDB76B',
                darkmagenta: '#8B008B',
                darkolivegreen: '#556B2F',
                darkorange: '#FF8C00',
                darkorchid: '#9932CC',
                darkred: '#8B0000',
                darksalmon: '#E9967A',
                darkseagreen: '#8FBC8F',
                darkslateblue: '#483D8B',
                darkslategray: '#2F4F4F',
                darkslategrey: '#2F4F4F',
                darkturquoise: '#00CED1',
                darkviolet: '#9400D3',
                deeppink: '#FF1493',
                deepskyblue: '#00BFFF',
                dimgray: '#696969',
                dimgrey: '#696969',
                dodgerblue: '#1E90FF',
                firebrick: '#B22222',
                floralwhite: '#FFFAF0',
                forestgreen: '#228B22',
                gainsboro: '#DCDCDC',
                ghostwhite: '#F8F8FF',
                gold: '#FFD700',
                goldenrod: '#DAA520',
                grey: '#808080',
                greenyellow: '#ADFF2F',
                honeydew: '#F0FFF0',
                hotpink: '#FF69B4',
                indianred: '#CD5C5C',
                indigo: '#4B0082',
                ivory: '#FFFFF0',
                khaki: '#F0E68C',
                lavender: '#E6E6FA',
                lavenderblush: '#FFF0F5',
                lawngreen: '#7CFC00',
                lemonchiffon: '#FFFACD',
                lightblue: '#ADD8E6',
                lightcoral: '#F08080',
                lightcyan: '#E0FFFF',
                lightgoldenrodyellow: '#FAFAD2',
                lightgreen: '#90EE90',
                lightgrey: '#D3D3D3',
                lightpink: '#FFB6C1',
                lightsalmon: '#FFA07A',
                lightseagreen: '#20B2AA',
                lightskyblue: '#87CEFA',
                lightslategray: '#778899',
                lightslategrey: '#778899',
                lightsteelblue: '#B0C4DE',
                lightyellow: '#FFFFE0',
                limegreen: '#32CD32',
                linen: '#FAF0E6',
                magenta: '#FF00FF',
                mediumaquamarine: '#66CDAA',
                mediumblue: '#0000CD',
                mediumorchid: '#BA55D3',
                mediumpurple: '#9370DB',
                mediumseagreen: '#3CB371',
                mediumslateblue: '#7B68EE',
                mediumspringgreen: '#00FA9A',
                mediumturquoise: '#48D1CC',
                mediumvioletred: '#C71585',
                midnightblue: '#191970',
                mintcream: '#F5FFFA',
                mistyrose: '#FFE4E1',
                moccasin: '#FFE4B5',
                navajowhite: '#FFDEAD',
                oldlace: '#FDF5E6',
                olivedrab: '#6B8E23',
                orange: '#FFA500',
                orangered: '#FF4500',
                orchid: '#DA70D6',
                palegoldenrod: '#EEE8AA',
                palegreen: '#98FB98',
                paleturquoise: '#AFEEEE',
                palevioletred: '#DB7093',
                papayawhip: '#FFEFD5',
                peachpuff: '#FFDAB9',
                peru: '#CD853F',
                pink: '#FFC0CB',
                plum: '#DDA0DD',
                powderblue: '#B0E0E6',
                rosybrown: '#BC8F8F',
                royalblue: '#4169E1',
                saddlebrown: '#8B4513',
                salmon: '#FA8072',
                sandybrown: '#F4A460',
                seagreen: '#2E8B57',
                seashell: '#FFF5EE',
                sienna: '#A0522D',
                skyblue: '#87CEEB',
                slateblue: '#6A5ACD',
                slategray: '#708090',
                slategrey: '#708090',
                snow: '#FFFAFA',
                springgreen: '#00FF7F',
                steelblue: '#4682B4',
                tan: '#D2B48C',
                thistle: '#D8BFD8',
                tomato: '#FF6347',
                turquoise: '#40E0D0',
                violet: '#EE82EE',
                wheat: '#F5DEB3',
                whitesmoke: '#F5F5F5',
                yellowgreen: '#9ACD32'
            }),
            colorArray: [
                '#579ce2', '#87bdf4',
                '#3bb4df', '#7fd1ef',
                '#a380ff', '#baa0ff',
                '#a164c5', '#c28fe1',
                '#d93a92', '#ec74b6',
                '#b82377', '#d569a7',
                '#bb3ca3', '#d381c2',
                '#da2d57', '#ec6b8a',
                '#4ca716', '#4ca716',
                '#5b63c2', '#8e93d7',
                '#15a9a3', '#4ecac5',
                '#a9ab48', '#e8c670',
                '#2aa5f5', '#73c4fa',
                '#f67e10', '#feb648',
                '#1faa77', '#62c8a2',
                '#eb4f20', '#f58563',
                '#ffc000', '#ffd659',
                '#f16ebc', '#f6a1d3',
                '#d23457', '#e27b92']
        };
    };
    /**
     * 返回的主类
     * @type pvisual
     */
    var pvisual = function() {
    };
    /**
     * 版本号: 0.0.1
     */
    pvisual.version = function() {
        return 'v0.0.5-alpha';
    };
    /**
     * 返回浏览器窗口大小
     * @returns {pvisual._Size.size} 
     */
    pvisual.windowSize = function() { // 默认
        var size = {width: 800, height: 500};
        if (_.innerWidth && _.innerHeight) {
            size.width = _.innerWidth;
            size.height = _.innerHeight;
        }

        if (document.body && document.body.offsetWidth) {
            size.width = document.body.offsetWidth;
            size.height = document.body.offsetHeight;
        }

        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            size.width = document.documentElement.clientWidth;
            size.height = document.documentElement.clientHeight;
        }
        return size;
    };
    /**
     * 
     * @param {type} color 颜色函数
     * @returns {_L5.pvisual.color|_L1.pvisual.color|_L6.pvisual.color}
     */
    pvisual.color = function() {
        var themes = theme();
        var c = function(c) {
            if (isFinite(c)) {
                if (themes.custom)
                    return themes.customArray[c % themes.customArray.length];
                else
                    return themes.colorArray[c % themes.colorArray.length];
            } else if (typeof c === 'function') {
                if (themes.custom)
                    return (c(themes.customArray));
                else
                    return (c(themes.colorArray));
            } else if (typeof c === 'string') {
                if (!themes.range) {
                    themes.range = d3.set([]);
                    themes.rangeArray = [];
                }
                if (themes.range.has(c)) {
                    var i;
                    for (i = 0; i < themes.rangeArray.length; i++)
                        if (themes.rangeArray[i] === c)
                            break;
                    if (themes.custom)
                        return themes.customArray[i % themes.customArray.length];
                    else
                        return themes.colorArray[i % themes.colorArray.length];
                } else {
                    themes.range.add(c);
                    themes.rangeArray = themes.range.values();
                    if (themes.custom)
                        return themes.customArray[(themes.rangeArray.length - 1) % themes.customArray.length];
                    else
                        return themes.colorArray[(themes.rangeArray.length - 1) % themes.colorArray.length];
                }
            }
        };
        /**
         * 定义颜色的域
         * @param {Array} color
         * @returns {_L5.pvisual.color|_L1.pvisual.color|_L6.pvisual.color}
         */
        c.domain = function(color) {
            if (typeof color === 'object' && color.constructor === Array) {
                themes.custom = d3.set(color);
                themes.customArray = themes.custom.values();
                return c;
            } else if (arguments.length === 0) {
                return themes.customArray;
            } else {
                console.error('The color should be Array');
            }
        };
        /**
         * 定义颜色的范围
         * @param {type} items 数组
         * @returns {_L5.pvisual.color|_L1.pvisual.color|_L6.pvisual.color}
         */
        c.range = function(items) {
            if (typeof items === 'object' && items.constructor === Array) {
                themes.range = d3.set(items);
                themes.rangeArray = themes.range.values();
                return c;
            } else if (arguments.length === 0) {
                return themes.rangeArray;
            } else {
                console.error('The range should be Array');
            }
        };
        /**
         * 返回内置的颜色库
         * @returns {Array} 对象数组(每个对象包含颜色的名字和16进制颜色值)
         */
        c.getColorLib = function() {
            return themes.color.entries();
        };
        /**
         * 获取渐变颜色，用于生成渐变效果
         * @param {Array} color 颜色数组
         * @param {String} method 生成渐变色的方法，默认值为default。如果为default将采用D3的interpolateRgb算法
         * @return {Function} 返回生成算法
         */
        c.gradientColor = function(color, method) {
            if (!(typeof color === 'object' && color.constructor === Array)) {
                console.error('The color should be Array');
            }
            var startColor = color[0];
            var colorCount = color.length;
            var endColor = color[colorCount - 1];
            method = method || 'default';
            if (method === 'default') {
                return d3.interpolateRgb.apply(null, [startColor, endColor]);
            } else
                return method.call(this, color);
        };
        return c;
    };
    /**
     * 获取对象的属性名
     * @param {type} obj 对象
     * @returns {Array}
     */
    pvisual.keys = function(obj) {
        return d3.keys.call(this, obj);
    };
    /**
     * 获取对象或数组的属性值
     * @param {Object|Array} obj
     * @returns {Array}
     */
    pvisual.values = function(obj) {
        if (typeof obj === 'object' && obj.constructor === Array)
            return obj;
        return pvisual.keys.map(function(d) {
            return obj[d];
        });
    };
    /**
     * @param {type} list
     * @param {type} method 迭代器
     * @returns {Number}数值和
     */
    pvisual.sum = function(list, method) {
        var count = 0;
        if (typeof obj === 'object' && obj.constructor === Array)
            method === undfined ? count = d3.sum(list) : count = d3.sum(list, method);
        else if (typeof obj === 'object')
            method === undfined ? count = d3.sum(pvisual.values(list)) :
                    count = d3.sum(pvisual.keys(list).map(method)
                            .map(function(d) {
                                return list[d];
                            }));
        else {
            console.error('The list should be Array or Object with Numical attributes');
        }
        return count;
    };
    /**
     * 深度复制
     * @param {Object} obj
     * @returns {Array}
     */
    pvisual.clone = function(obj) {
        if (typeof obj !== 'object' && typeof obj !== 'function') {
            return obj;
        }
        if (typeof obj === 'function')
            return (new obj()).constructor;
        var clone = {};
        if (obj.constructor === Array) {
            clone = [];
            for (var i = 0; i < obj.length; i++)
                clone.push(pvisual.clone(obj[i]));
        } else {
            for (var i in obj) {
                clone[i] = pvisual.clone(obj[i]);
            }
        }
        return clone;
    };
    /**
     * 动态标签生成器
     * @param {type} div 承接的父标签
     * @returns {unresolved}
     */
    pvisual.floatTag = function(div) {
        var setContent = function() {
        };
        var node;
        var container;
        var getElCoordinate = function(e) {
            var w = e.offsetWidth;
            var h = e.offsetHeight;
            var l = (function getX(obj) {
                return obj.offsetLeft + (obj.offsetParent ? getX(obj.offsetParent) : obj.x ? obj.x : 0);
            }(e));
            var t = (function getY(obj) {
                return (obj.offsetParent ? obj.offsetTop + getY(obj.offsetParent) : obj.y ? obj.y : 0);
            }(e));
            return {
                top: t,
                left: l,
                width: w,
                height: h,
                bottom: t + h,
                right: l + w};
        };
        var _changeLoc = function(m) {
            var x = m.x;
            var y = m.y;
            var locality = getElCoordinate(container);
            var floatTagWidth = (node.node()).clientWidth;
            var floatTagHeight = (node.node()).clientHeight;
            if (x + floatTagWidth <= locality.left + container.clientWidth) {
                x = x - locality.left;
            } else {
                x = x - locality.left - floatTagWidth;
            }
            if (y + floatTagHeight <= locality.top + container.clientHeight) {
                y = y - locality.top;
            } else {
                y = y - locality.top - floatTagHeight;
            }
            node.style({'left': x + 'px', 'top': y + 'px'});
        };
        var _mousemove = function() {
            if (!d3.event) {
                return false;
            }
            setContent.call(this);
            _changeLoc({'x': d3.event.pageX, 'y': d3.event.pageY});
        };
        var floatTag = function(cont) {
            container = cont;
            node = d3.select(container)
                    .append('div')
                    .classed('floatTag', true)
                    .style({'border': '2px solid',
                        'border-color': 'rgb(0, 0, 0)',
                        'background-color': 'rgba(255, 255, 255, 0.85)',
                        'font-color': 'rgb(0,0,0)',
                        'border-radius': '4px',
                        'padding': '12px 8px',
                        'font-size': '12px',
                        'box-shadow': ' 1px 1px 1px 0px rgba(0,0,0,.5)',
                        'font-family': '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, Arial',
                        'z-index': 1000,
                        'white-space': 'nowrap',
                        'text-align': 'center',
                        'opacity': '0',
                        'position': 'absolute',
                        'transition': 'opacity .15s',
                        '-moz-transition': 'opacity .15s', /* Firefox 4 */
                        '-webkit-transition': 'opacity .15s', /* Safari 和 Chrome */
                        '-o-transition': 'opacity .15s',
                        'top': 60,
                        'left': 60});
            d3.select(container)
                    .on('mousemove', _mousemove);
            node.creator = floatTag;
            return node;
        };
        floatTag.setContent = function(sc) {
            if (arguments.length === 0) {
                return setContent;
            }
            setContent = sc;
            return floatTag;
        };
        floatTag.mouseToFloatTag = function(m) {
            if (arguments.length === 0) {
                return mouseToFloatTag;
            }
            mouseToFloatTag = m;
            return floatTag;
        };
        floatTag.changeLoc = _changeLoc;
        return floatTag(div);
    };
    /**
     * 继承
     * @param {Function} parent 父类
     * @param {Object} properties 新属性
     * @return {Object} 新的子类
     */
    pvisual.extend = function(parent, properties) {
        var sub = function() {
        };
        parent = parent || pvisual;
        properties = properties || {};
        parent.apply(sub, arguments);
        sub.prototype = new parent();
        sub.prototype.constructor = sub;
        for (var prop in parent) {
            if (sub.hasOwnProperty(prop))
                continue;
            sub[prop] = parent[prop];
        }
        for (var prop in properties) {
            if (sub.hasOwnProperty(prop))
                continue;
            sub[prop] = properties[prop];
        }
        return sub;
    };
    /**
     * 检查数据规范性
     * @param {type} data 数据
     * @param {type} filename 数据名
     * @returns {undefined|_L1.pvisual.check.that}
     */
    pvisual.check = function(data, filename) {
        var that = {};
        that.data = data;
        that.numMiss = 0;
        that.flag = true;
        if (!that.data) {
            console.error('Failed to load the data. Please check your file format');
            return;
        }
        if (typeof that.data === 'object' && that.data.constructor === Array && that.data.length > 1) {
            that.data.forEach(function(e) {
                that.dimensions = pvisual.keys(e);
                that.dimensions.forEach(function(d) {
                    if (e[d] === '0')
                        e[d] = 0;
                    e[d] = +e[d] || e[d];
                });
            });
            for (var i = 1, item; i < that.data.length; i++) {
                if (!that.flag)
                    i--;
                item = that.data[i];
                if (i < that.data.length) {
                    if (!compareStructure.call(that, that.data[0], item, i)) {
                        console.error(((i === 0) || (i === 1)) ?
                                'Wrong data structure: data 0 or data 1 is wrong' :
                                'Wrong data structure: data ' + (i + 1) + ' is wrong');
                        that.dataInFormat = {meta: {isNested: true, isError: true}, data: that.data};
                        break;
                    }
                }
                else
                    break;
            }
            that.dataInFormat = dataConvert.call(that, that.data, filename || '', that.numMiss);
        } else if (typeof that.data === 'object') {
            that.dataInFormat = dataConvert(that.data, filename || '', that.numMiss);
        }
        return that;
    };
    /**
     * json 文件解析
     * @param {type} filename 文件名
     * @param {type} callback 回调函数
     * @returns {undefined}
     */
    pvisual.json = function(filename, callback) {
        d3.json(filename, function(_) {
            _.type = 'json';
            callback.call(this, _);
        });
    };
    /**
     * csv 文件解析
     * @param {type} filename 文件名
     * @param {type} callback 回调函数
     * @returns {undefined}
     */
    pvisual.csv = function(filename, callback) {
        d3.csv(filename, function(_) {
            _.type = 'csv';
            callback.call(this, _);
        });
    };
    /**
     * tsv 文件解析
     * @param {type} filename 文件名
     * @param {type} callback 回调函数
     * @returns {undefined}
     */
    pvisual.tsv = function(filename, callback) {
        d3.tsv(filename, function(_) {
            _.type = 'tsv';
            callback.call(this, _);
        });
    };
    /**
     * xml 文件解析
     * @param {type} filename 文件名
     * @param {type} callback 回调函数
     * @returns {undefined}
     */
    pvisual.xml = function(filename, callback) {
        var data;
        d3.xml(filename, function(_) {
            var source = _.documentElement;
            data = xmlToArray(source, 0, []);
            data.type = 'xml';
            callback(data);
        });
    };
    /**
     * excel xlsx 文件解析
     * @param {type} file 文件
     * @param {type} callback 回调函数
     * @returns {undefined}
     */
    pvisual.xlsx = function(file, callback) {
        var data = [];
        data.name = file.name;
        data.type = 'xlsx';
        var reader = new FileReader();
        reader.onload = function(e) {
            var source = e.target.result;
            var arr = String.fromCharCode.apply(null, new Uint8Array(source));
            var wb = XLSX.read(btoa(arr), {type: 'base64'});
            wb.SheetNames.forEach(function(sheetName) {
                var csv = XLSX.utils.sheet_to_csv(wb.Sheets[sheetName]);
                var lines = csv.split('\n');
                lines.pop();
                var dimensions = lines.shift()
                        .split(',')
                        .map(function(d) {
                            d = d.replace(/"+/g, '');
                            d = +d || d;
                            return d;
                        });
                var sheetData = [];
                lines.forEach(function(p) {
                    var lineData = {};
                    var lineCells = p
                            .split(',')
                            .map(function(d) {
                                d = d.replace(/\"+/g, '');
                                d = +d || d;
                                return d;
                            });

                    dimensions.forEach(function(d, i) {
                        lineData[d] = lineCells[i] || 0;
                    });
                    sheetData.push(lineData);
                });
                var ob = {};
                ob[sheetName] = sheetData;
                data.push(ob);
            });
            callback(data);
        };
        reader.readAsArrayBuffer(file);
    };
    /**
     * excel xls 文件解析
     * @param {type} file 文件
     * @param {type} callback 回调函数
     * @returns {undefined}
     */
    pvisual.xls = function(file, callback) {
        var data = [];
        data.name = file.name;
        data.type = 'xls';
        var reader = new FileReader();
        reader.onload = function(e) {
            var source = e.target.result;
            var cfb = XLS.CFB.read(source, {type: 'binary'});
            var wb = XLS.parse_xlscfb(cfb);
            wb.SheetNames.forEach(function(sheetName) {
                var csv = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var lines = csv.split('\n');
                lines.pop();
                var dimensions = lines.shift()
                        .split(',')
                        .map(function(d) {
                            d = d.replace(/"+/g, '');
                            d = +d || d;
                            return d;
                        });
                var sheetData = [];
                lines.forEach(function(p) {
                    var lineData = {};
                    var lineCells = p
                            .split(',')
                            .map(function(d) {
                                d = d.replace(/\"+/g, '');
                                d = +d || d;
                                return d;
                            });

                    dimensions.forEach(function(d, i) {
                        lineData[d] = lineCells[i] || 0;
                    });
                    sheetData.push(lineData);
                });
                var ob = {};
                ob[sheetName] = sheetData;
                data.push(ob);
            });
            callback(data);
        };
        reader.readAsBinaryString(file);
    };
    /**
     * 存储图表
     * @param {type} cfg 配置信息
     * @returns {unresolved}
     */
    pvisual.save = function(cfg, format) {
        function internalCallback() {
            var data = null;
            var blob;
            // SVG
            if (format === 'svg') {
                for (var i = 0; i < cfg.processing.buffer.length; i++) {
                    data = new XMLSerializer().serializeToString(cfg.processing.buffer[i][0]);
                    blob = generateBlob(data, 'image/svg+xml');

                    if (cfg.output === 'save') {
                        saveAs(blob, 'export.svg');
                    } else if (cfg.output === 'datastring' || cfg.output === 'datauristring' || cfg.output === 'dataurlstring') {
                        blob = 'data:image/svg+xml;base64,' + btoa(data);
                    } else if (cfg.output === 'dataurlnewwindow') {
                        window.open('data:image/svg+xml;base64,' + btoa(data));
                    } else if (cfg.output === 'datauri' || cfg.output === 'dataurl') {
                        location.href = 'data:image/svg+xml;base64,' + btoa(data);
                    } else if (cfg.output === 'datastream') {
                        location.href = 'data:image/octet-stream;base64,' + btoa(data);
                    }
                }
                // PDF
            } else if (format === 'application/pdf' || format === 'pdf') {
                data = generatePDF(cfg).output('dataurlstring');
                blob = generateBlob(data, 'application/pdf');
                if (cfg.output === 'save') {
                    saveAs(blob, 'export.pdf');
                } else if (cfg.output === 'datastring' || cfg.output === 'datauristring' || cfg.output === 'dataurlstring') {
                    blob = data;
                } else if (cfg.output === 'dataurlnewwindow') {
                    window.open(data);
                } else if (cfg.output === 'datauri' || cfg.output === 'dataurl') {
                    location.href = data;
                } else if (cfg.output === 'datastream') {
                    location.href = data.replace('application/pdf', 'application/octet-stream');
                }

                // PNG
            } else if (format === 'png') {
                data = cfg.canvas.toDataURL('image/png');
                blob = generateBlob(data, 'image/png');

                if (cfg.output === 'save') {
                    saveAs(blob, 'export.png');
                } else if (cfg.output === 'datastring' || cfg.output === 'datauristring' || cfg.output === 'dataurlstring') {
                    blob = data;
                } else if (cfg.output === 'dataurlnewwindow') {
                    window.open(data);
                } else if (cfg.output === 'datauri' || cfg.output === 'dataurl') {
                    location.href = data;
                } else if (cfg.output === 'datastream') {
                    location.href = data.replace('image/png', 'image/octet-stream');
                }

                // JPG
            } else if (format === 'jpeg' || format === 'jpg') {
                data = cfg.canvas.toDataURL('image/jpeg');
                blob = generateBlob(data, 'image/jpeg');

                if (cfg.output === 'save') {
                    saveAs(blob, 'export.jpg');
                } else if (cfg.output === 'datastring' || cfg.output === 'datauristring' || cfg.output === 'dataurlstring') {
                    blob = data;
                } else if (cfg.output === 'dataurlnewwindow') {
                    window.open(data);
                } else if (cfg.output === 'datauri' || cfg.output === 'dataurl') {
                    location.href = data;
                } else if (cfg.output === 'datastream') {
                    location.href = data.replace('image/jpeg', 'image/octet-stream');
                }
            }
        }

        function generateOutput(callback) {
            var svgs = document.getElementsByTagName('svg');
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var offset = {
                y: 0,
                x: 0
            };
            cfg.svgs = svgs;
            // Reset
            cfg.processing.buffer = [];
            cfg.processing.drawn = 0;
            cfg.canvas = canvas;

            for (var i = 0; i < svgs.length; i++) {
                var parent = svgs[i].parentNode;
                var svgX = Number(parent.style.left.slice(0, -2));
                var svgY = Number(parent.style.top.slice(0, -2));

                // Overtake parent position if givwn
                offset.x = svgX ? svgX : offset.x;
                offset.y = svgY ? svgY : offset.y;

                cfg.processing.buffer.push([svgs[i], offset]);
            }
            canvas.id = 'canvas';
            canvas.width = cfg.svgs[0].clientWidth;
            canvas.height = cfg.svgs[0].clientHeight;

            // Set given background; jpeg default
            if (cfg.backgroundColor || format === 'jpeg' || format === 'jpg' || format === 'pdf') {
                context.fillStyle = cfg.backgroundColor || '#FFFFFF';
                context.fillRect(0, 0, canvas.width, canvas.height);
            }

            /* PRIVATE
             Recursive function to draw the images to the canvas;
             @param none;
             */
            function drawItWhenItsLoaded() {
                var img, buffer, offset, source;
                // DRAWING PROCESS DONE
                if (cfg.processing.buffer.length === cfg.processing.drawn) {
                    return callback();
                } else {
                    buffer = cfg.processing.buffer[cfg.processing.drawn];
                    source = new XMLSerializer().serializeToString(buffer[0]);
                    offset = buffer[1];
                    canvg(canvas, source, {
                        offsetX: offset.x,
                        offsetY: offset.y,
                        ignoreMouse: true,
                        ignoreAnimation: true,
                        ignoreDimensions: true,
                        ignoreClear: true,
                        renderCallback: function() {
                            cfg.processing.drawn++;
                            drawItWhenItsLoaded();
                        }
                    });
                }
            }
            return drawItWhenItsLoaded();
        }

        function generateBinaryArray(base64_string) {
            var len = base64_string.length;
            var buffer = new Uint8Array(len / 4 * 3 | 0);
            var i = 0;
            var outptr = 0;
            var last = [0, 0];
            var state = 0;
            var save = 0;
            var rank, code, undef, base64_ranks = new Uint8Array([
                62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
            ]);
            while (len--) {
                code = base64_string.charCodeAt(i++);
                rank = base64_ranks[code - 43];
                if (rank !== 255 && rank !== undef) {
                    last[1] = last[0];
                    last[0] = code;
                    save = (save << 6) | rank;
                    state++;
                    if (state === 4) {
                        buffer[outptr++] = save >>> 16;
                        if (last[1] !== 61 /* padding character */) {
                            buffer[outptr++] = save >>> 8;
                        }
                        if (last[0] !== 61 /* padding character */) {
                            buffer[outptr++] = save;
                        }
                        state = 0;
                    }
                }
            }
            return buffer;
        }

        function generateBlob(datastring, type) {
            var header_end = datastring.indexOf(',') + 1;
            var header = datastring.substring(0, header_end);
            var data = datastring;
            var blob = new Blob();

            if (header.indexOf('base64') !== -1) {
                data = generateBinaryArray(datastring.substring(header_end));
            }

            // Fake blob for IE
            if (false) {
                blob.data = data;
                blob.size = data.length;
                blob.type = type;
                blob.encoding = 'base64';
            } else {
                blob = new Blob([data], {
                    type: type
                });
            }
            return blob;
        }

        function generatePDF() {
            var pdf = {
                output: function() {
                    return '';
                }
            };
            var data = cfg.canvas.toDataURL('image/jpeg'); // JSPDF ONLY SUPPORTS JPG
            var width = cfg.canvas.width / 5;
            var height = cfg.canvas.height / 5;

            if (window.jsPDF) {
                pdf = new jsPDF();
                if (pdf.addImage) {
                    pdf.addImage(data, 'JPEG', 0, 0, width, height);
                } else {
                    console.error('Missing jsPDF plugin; Please add the "addImage" plugin.');
                }
            } else {
                console.error('Missing jsPDF lib; Do not forget to add the "addImage" plugin.');
            }
            return pdf;
        }
        return generateOutput(internalCallback);
    };
    /**
     *  生成保存按钮
     * @param {type} chart 纳入的父元素
     * @param {type} cfg 配置
     * @returns {undefined}a
     */
    pvisual.save.generateButtons = function(chart, cfg) {
        if (!cfg)
            cfg = {
                output: 'save',
                processing: {},
                dpi: 150,
                exportConfig: {
                    menuTop: 'auto',
                    menuLeft: 'auto',
                    menuBottom: 'auto',
                    menuRight: 'auto',
                    menuItemStyle: {
                        backgroundColor: '#EFEFEF',
                        rollOverBackgroundColor: '#DDDDDD',
                        color: '#000000',
                        rollOverColor: '#CC0000',
                        paddingTop: '6px',
                        paddingRight: '6px',
                        paddingBottom: '6px',
                        paddingLeft: '6px',
                        marginTop: '0px',
                        marginRight: '0px',
                        marginBottom: '0px',
                        marginLeft: '0px',
                        textAlign: 'left',
                        textDecoration: 'none'},
                    menuItems: [{
                            textAlign: 'center',
                            icon: 'export.png',
                            onclick: function() {
                            },
                            items: [{
                                    title: 'JPG',
                                    format: 'jpg'
                                }, {
                                    title: 'PNG',
                                    format: 'png'
                                }, {
                                    title: 'SVG',
                                    format: 'svg'
                                }, {
                                    title: 'PDF',
                                    format: 'pdf'
                                }]
                        }]
                }
            };

        var div = document.createElement('div');
        var lvl = 0;

        function createList(items) {
            var ul = document.createElement('ul');

            ul.setAttribute('style', 'list-style: none; margin: 0; padding: 0;');

            // Walkthrough items
            for (var i = 0; i < items.length; i++) {
                var li = document.createElement('li');
                var img = document.createElement('img');
                var a = document.createElement('a');
                var item = items[i];
                var children = null;

                // ICON
                if (item['icon']) {
                    img.alt = '保存';
                    img.src = item['icon'];
                    img.setAttribute('style', 'margin: 0 auto;border: none;outline: none');
                    if (item['iconTitle']) {
                        img.title = item['iconTitle'];
                    }
                    a.appendChild(img);
                }

                // TITLE; STYLING
                a.href = '#';
                if (item['title']) {
                    img.setAttribute('style', 'margin-right: 5px;');
                    a.innerHTML += item.title;
                }
                a.setAttribute('style', 'display: block; background-color: rgb(239, 239, 239); color: rgb(0, 0, 0); padding: 6px; margin: 0px; text-align: left; text-decoration: none; font-family: Verdana; font-size: 11px;');

                // ONCLICK
                a.format = item.format;
                a.onclick = item.onclick || function() {
                    pvisual.save(cfg, this.format);
                };
                li.appendChild(a);

                // APPEND SIBLINGS
                if (item.items) {
                    children = createList(item.items);
                    li.appendChild(children);

                    li.onmouseover = function() {
                        children.style.display = 'block';
                    };
                    li.onmouseout = function() {
                        children.style.display = 'none';
                    };
                    children.style.display = 'none';
                }

                // Append to parent
                ul.appendChild(li);

                // Apply hover
                a.onmouseover = function() {
                    this.style.backgroundColor = cfg.exportConfig.menuItemStyle.rollOverBackgroundColor;
                    this.style.color = cfg.exportConfig.menuItemStyle.rollOverColor;
                    this.style.borderColor = cfg.exportConfig.menuItemStyle.rollOverBorderColor;
                };
                a.onmouseout = function() {
                    this.style.backgroundColor = cfg.exportConfig.menuItemStyle.backgroundColor;
                    this.style.color = cfg.exportConfig.menuItemStyle.color;
                    this.style.borderColor = cfg.exportConfig.menuItemStyle.borderColor;
                };
            }
            lvl++;
            return ul;
        }
        div.setAttribute('style', 'width:39px; position: absolute;top:' + cfg.exportConfig.menuTop + ';right:' + cfg.exportConfig.menuRight + ';bottom:' + cfg.exportConfig.menuBottom + ';left:' + cfg.exportConfig.menuLeft + ';box-shadow:0px 0px 1px 0px rgba(0,0,0,0);');
        div.appendChild(createList(cfg.exportConfig.menuItems));
        chart.appendChild(div);
    };
    /**
     * 图形组件集合
     */
    pvisual.model = {};

    function validData(obj) {
        if (obj === null)
            return false;
        if (obj === '')
            return false;
        return true;
    }

    function getAttributes(array) {
        var that = this;
        var att;
        var att2;
        if (typeof (array[0]) === 'number') {
            att = 'numeric';
        } else if (typeof (array[0]) === 'string') {
            att2 = [];
            array.forEach(function(e) {
                att2.push(e);
            });
            att2.sort();
            for (var i = 1; i < att2.length; i++)
                if (att2[i - 1] === att2[i]) {
                    att2.splice(i - 1, 1);
                    i--;
                }
            att = att2;
        } else if (array[0].constructor === Array) {
            att = 'array';
        } else {
            att = {};
            var dimensions = pvisual.keys(array[0]);
            dimensions.forEach(function(d) {
                att2 = new Array;
                array.forEach(function(e) {
                    att2.push(e[d]);
                });
                att[d] = getAttributes.call(that, att2);
            });
        }

        return att;
    }

    function dataConvert(array, filename, numMiss) {
        var that = this;
        var testData;
        if (array.constructor === Array) {
            var attributes = getAttributes.call(that, array);
            testData = {meta: {name: filename,
                    numInstances: array.length,
                    isNested: false,
                    numAttributes: pvisual.keys(array[0]).length,
                    numMiss: numMiss, attributes: attributes},
                data: array};
        } else {
            testData = {meta: {name: filename,
                    isNested: true},
                data: array};
        }
        return testData;
    }

    function compareStructure(obj1, obj2, index) {
        var that = this;
        that.flag = true;
        if (!validData(obj1)) {
            that.flag = false;
            console.error('Wrong input in data 1. Automatically delete data 1.');
            that.numMiss++;
            that.data.splice(0, 1);
            return true;
        } else if (!validData(obj2)) {
            that.flag = false;
            console.error('Wrong input in data ' + (index + 1)
                    + '. Automatically delete data ' + (index + 1) + '.');
            that.numMiss++;
            that.data.constructor === Array && that.data.splice(index, 1);
            return true;
        }
        if (typeof (obj1) !== typeof (obj2))
            return false;
        else if (typeof (obj1) === 'string' || typeof (obj1) === 'number')
            return true;
        else if (typeof (obj1) === 'object') {
            var dimension1, dimension2;
            if (obj1.constructor === Array)
                dimension1 = dimension2 = Object.keys(obj1);
            else {
                dimension1 = pvisual.keys(obj1);
                dimension2 = pvisual.keys(obj2);
                if (dimension1.length !== dimension2.length)
                    return false;
            }
            for (var j = 0; j < dimension1.length; j++) {
                var item1 = obj1[dimension1[j]];
                var item2 = obj2[dimension2[j]];

                if (!that.flag)
                    break;
                if (!compareStructure.call(that, item1, item2, index)) {
                    return false;
                }
            }
            return true;
        }
    }

    function compareObject(obj) {
        var that = this;
        if (typeof obj === 'number' || typeof obj === 'string')
            return true;
        var dimensions = pvisual.keys(obj);
        for (var j = 0; j < dimensions.length; j++) {
            if (typeof obj[dimensions[j]] === 'object')
                if (obj.constructor === Array && obj.length > 1) {
                    for (var i = 1, item; i < obj.length; i++) {
                        if (!that.flag)
                            i--;
                        item = obj[i];
                        if (i < obj.length) {
                            if (!compareStructure.call(that, obj[0], item, i))
                                console.error(((i === 0) || (i === 1)) ?
                                        'Wrong data structure: 0 or 1' :
                                        'Wrong data structure: ' + (i + 1));
                        }
                        else
                            break;
                    }
                } else {
                    if (!compareObject.call(that, obj[dimensions[j]]))
                        return false;
                }
        }
        return true;
    }

    function xmlToArray(XMLData, count, dataCollection) {
        var newData = XMLData.children;
        dataCollection[count] = newData;
        count++;
        if (newData.length === 0) {
            var text = XMLData.textContent;
            count--;
            if (text === '0')
                return 0;
            else
                return +text || text;
        } else {
            var ob = {};
            var length = dataCollection[count - 1].length;
            if (length === 1) {
                ob[dataCollection[count - 1][0].tagName] = xmlToArray(dataCollection[count - 1][0], count, dataCollection);
            } else {
                var o = [];
                for (var j = 0; j < length; j++) {
                    var obj = {};

                    obj[dataCollection[count - 1][j].tagName] = xmlToArray(dataCollection[count - 1][j], count, dataCollection);
                    o.push(obj);
                }
                ob[XMLData.tagName] = o;
            }
            count--;
            return ob;
        }
    }

    _.pvisual = pvisual;
}(window));
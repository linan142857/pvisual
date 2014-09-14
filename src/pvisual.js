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

// ==========================================

/*
 * 2014-05-18(v0.0.6-alpha)
 * 新增图形样式co_occurrence_matrix
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
    /**
     * 面积图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.area = function() {
        var area = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '面积图'; //类型
        var width = 900; // 宽度
        var height = 400; // 高度
        var widthAvail = width - 200; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 50; //图形右移距离
        var tranY = 10; //图形下移距离
        var data; //数据
        var fontFamily = 'Arial'; // 字体样式
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = area.color();

        /************局部变量***************/
        var source;
        var dimension;
        var timeFormat = null;
        var isLinear = false;
        var isTimer = false;

        /******坐标轴******/
        var yLegend = '';
        var xLegend = '';
        var xtickRotate = 0;
        var ytickRotate = 0;
        var labelSize = 8;
        var labelColor = '#000000';
        var xtickNumber = 8;
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = 5;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        area.getType = function() {
            return type;
        };

        area.data = function(_) {
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
                dimension = pvisual.keys(_[0])
                        .filter(function(d) {
                            return d !== 'x';
                        }).map(function(d) {
                    return {name: d, _flag: true};
                });
                var stack = d3.layout.stack()
                        .values(function(p) {
                            return p.value;
                        });
                source = stack(dimension
                        .map(function(p) {
                            return {
                                name: p.name,
                                value: _.map(function(d) {
                                    return {x: d.x, y: +d[p.name]};
                                })
                            };
                        }));
                dimension.x = source[0].value
                        .map(function(d) {
                            return d.x;
                        });
                return this;
            } else
                return data;
        };

        area.getType = function() {
            return type;
        };

        area.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in area.rander(_) should be <div> element');
            }

            d3.select(div).
                    classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('area', true)
                    .node();
            /* 初始化变量 */
            var max;
            var x;
            var y;
            var xAxis;
            var yAxis;
            if (timeFormat !== null)
                isTimer = true;
            if (isTimer) {
                x = d3.time.scale()
                        .domain(d3.extent(dimension.x, function(d) {
                            return timeFormat.parse(d);
                        }))
                        .range([0, widthAvail]);

                source.forEach(function(d) {
                    d.value.forEach(function(p) {
                        p.x = timeFormat.parse(p.x);
                    });
                });

                source.forEach(function(d) {
                    d.value.sort(function(a, b) {
                        return a.x.getTime() - b.x.getTime();
                    });
                });

                xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom')
                        .tickSize(xtickLineLength)
                        .ticks(xtickNumber);
            } else if (isLinear) {
                x = d3.scale.linear()
                        .domain(d3.extent(dimension.x, function(d) {
                            return +d;
                        }))
                        .range([0, widthAvail]);

                source.forEach(function(d) {
                    d.value.forEach(function(p) {
                        p.x = +p.x;
                    });
                });

                source.forEach(function(d) {
                    d.value.sort(function(a, b) {
                        return a.x - b.x;
                    });
                });

                xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom')
                        .ticks(xtickNumber)
                        .tickSize(xtickLineLength)
                        .tickFormat(format);
            } else {
                x = d3.scale.ordinal()
                        .domain(dimension.x)
                        .rangePoints([0, widthAvail], 0);

                xAxis = d3.svg.axis()
                        .scale(x)
                        .tickSize(xtickLineLength)
                        .orient('bottom');
            }

            source.forEach(function(d) {
                var m = d3.max(d.value, function(p) {
                    return p.y0 + p.y;
                });
                max = max >= m ? max : m;
            });
            y = d3.scale.linear()
                    .domain([0, max])
                    .range([heightAvail, 0]);

            var a = d3.svg.area()
                    .x(function(d) {
                        return x(d.x);
                    })
                    .y0(function(d) {
                        return y(d.y0);
                    })
                    .y1(function(d) {
                        return y(d.y0 + d.y);
                    });

            yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });
            g = d3.select(svg)
                    .select('g');
            var dimensions = g.select('.dimensions')
                    .selectAll('.dimension')
                    .data(source);
            dimensions.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            dimensionUpdate(dimensions, a);
            dimensionDraw(dimensions, a);


            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);

            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);

            axis(g, xAxis, yAxis);
        };

        function axis(g, xAxis, yAxis) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(xLegend);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + heightAvail + ')')
                                .call(xAxis);
                    });

            g.select('.y-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis);
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
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength()
                                        * (.3 * Math.abs(Math.sin(xtickRotate))))
                                + ')rotate(' + xtickRotate + ')';
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

        function dimensionUpdate(dimensions, a) {
            dimensions
                    .transition()
                    .duration(duration)
                    .attr('d', function(d) {
                        return a(d.value);
                    })
                    .style('fill', function(d) {
                        return color(d.name);
                    });
        }

        function dimensionDraw(dimensions, a) {
            dimensions.enter()
                    .append('svg:path')
                    .classed('dimension', true)
                    .attr('d', function(d) {
                        return a(d.value);
                    })
                    .style('fill', function(d) {
                        return color(d.name);
                    })
                    .style('opacity', 0)
                    .transition()
                    .duration(duration)
                    .style('opacity', 1);
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimension.length > 1) {
                                d3.select(this)
                                        .classed('none', true);
                                d._flag = false;
                                var stack = d3.layout.stack()
                                        .values(function(p) {
                                            return p.value;
                                        });
                                source = stack(dimension
                                        .filter(function(p) {
                                            return p._flag;
                                        })
                                        .map(function(p) {
                                            return {
                                                name: p.name,
                                                value: data.map(function(d) {
                                                    return {x: d.x, y: +d[p.name]};
                                                })
                                            };
                                        }));
                                area.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;
                            var stack = d3.layout.stack()
                                    .values(function(p) {
                                        return p.value;
                                    });
                            source = stack(dimension
                                    .filter(function(p) {
                                        return p._flag;
                                    })
                                    .map(function(p) {
                                        return {
                                            name: p.name,
                                            value: data.map(function(d) {
                                                return {x: d.x, y: +d[p.name]};
                                            })
                                        };
                                    }));
                            area.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);

                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});

                d3.select(this)
                        .selectAll('text')
                        .style({'font-size': legendSize,
                            'font-family': fontFamily})
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style('fill', legendColor)
                        .text(d.name);
            });
        }

        area.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in area.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        area.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in area.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        area.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in area.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        area.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        area.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        area.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        area.timeFormat = function(_) {
            if (!arguments.length)
                return timeFormat;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.timeFormat(format) should be string of d3.format');
                    return this;
                } else {
                    timeFormat = d3.time.format(arguments[0]);
                    return this;
                }
            }
        };

        area.isLinear = function(_) {
            if (!arguments.length)
                return isLinear;
            else {
                if (isLinear !== true && isLinear !== false) {
                    console.error('The arguments in area.isLinear(isLinear) should be bool');
                    return this;
                } else {
                    isLinear = arguments[0];
                    return this;
                }
            }
        };

        area.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        area.yLegend = function(_) {
            if (!arguments.length)
                return yLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegend = arguments[0];
                    return this;
                }
            }
        };

        area.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        area.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        area.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        area.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        area.xtickNumber = function(_) {
            if (!arguments.length)
                return xtickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.xtickNumber(xtickNumber) should be number of tick');
                    return this;
                } else {
                    xtickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        area.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        area.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        area.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        area.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        area.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        area.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        area.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in area.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        area.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        area.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in area.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        area.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        area.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in area.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        area.options = function(_) {
            if (!arguments.length)
                return {
                    'type': area.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'timeFormat': timeFormat,
                    'isLinear': isLinear,
                    'xLegend': xLegend,
                    'yLegend': yLegend,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'xtickNumber': xtickNumber,
                    'ytickNumber': ytickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'xtickLineLength': xtickLineLength,
                    'ytickLineLength': ytickLineLength,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && area.tickFormat(_.format);
                _.fontFamily && area.fontFamily(_.fontFamily);
                isFinite(_.duration) && area.duration(_.duration);
                _.isLinear && area.isLinear(_.isLinear);
                _.xLegend && area.xLegend(_.xLegend);
                _.yLegend && area.yLegend(_.yLegend);
                isFinite(_.xtickRotate) && area.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && area.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && area.labelSize(_.labelSize);
                _.labelColor && area.labelColor(_.labelColor);
                isFinite(_.xtickNumber) && area.xtickNumber(_.xtickNumber);
                isFinite(_.ytickNumber) && area.ytickNumber(_.ytickNumber);
                isFinite(_.tickTextSize) && area.tickTextSize(_.tickTextSize);
                _.tickTextColor && area.tickTextColor(_.tickTextColor);
                _.tickLineColor && area.tickLineColor(_.tickLineColor);
                isFinite(_.xtickLineLength) && area.xtickLineLength(_.xtickLineLength);
                isFinite(_.ytickLineLength) && area.ytickLineLength(_.ytickLineLength);
                isFinite(_.axisPathWidth) && area.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && area.axisPathColor(_.axisPathColor);

                _.legendColor && area.legendColor(_.legendColor);
                isFinite(_.legendSize) && area.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && area.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && area.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            area.options(arguments[0]);
        return area;
    };
    /**
     * 箱式图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.boxplot = function() {
        var boxplot = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '箱式图'; //类型
        var width = 800; // 宽度
        var height = 500; // 高度
        var widthAvail = width - 100; // 实际利用宽度
        var heightAvail = height - 30; // 实际利用高度
        var data; //数据
        var tranX = 10; //图形右移距离
        var tranY = 10; //图形下移距离
        var fontSize = 8; //字体大小
        var fontFamily = 'Arial'; // 字体样式
        var fontColor = '#000'; //颜色
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = boxplot.color();

        /************局部变量***************/
        var source;
        var dimensions;
        var padding = .2;
        var outclicleSize = 5;
        var lineWidth = 2;
        var lineColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        boxplot.data = function(_) {
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
                data = d3.nest().key(function(d) {
                    return d.name;
                }).sortValues(function(a, b) {
                    return +a.value - +b.value;
                }).entries(_);

                return this;
            } else
                return data;
        };

        boxplot.getType = function() {
            return type;
        };

        boxplot.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in boxplot.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('boxplot', true)
                    .node();
            /* 初始化变量 */
            source = data.filter(function(d) {
                return d._flag !== false;
            });
            dimensions = source.map(function(d) {
                return d.key;
            });

            var everywidth = widthAvail / dimensions.length;

            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    boxplot.floatTag(div); //绘图元素的外容器，添加动态标签

            var min = Infinity;
            var max = -Infinity;

            source.forEach(function(d) {
                min = min < +d.values[0].value ?
                        min : +d.values[0].value;
                max = max > +d.values[d.values.length - 1].value ?
                        max : +d.values[d.values.length - 1].value;
            });

            var x = d3.scale.ordinal();
            var y = d3.scale.linear();
            x.rangeBands([0, widthAvail])
                    .domain(dimensions);
            y.domain([min, max])
                    .range([heightAvail, 0]);

            d3.select(svg)
                    .attr({'width': width,
                        'height': height})
                    .selectAll('g')
                    .data([1])
                    .enter()
                    .append('svg:g')
                    .attr('transform', 'translate(' + tranX + ',' + tranY + ')');

            var g = d3.select(svg)
                    .select('g');

            g.call(function(selection) {
                selection.append('svg:g')
                        .classed('nodes', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg).select('g');

            var nodes = g.select('.nodes')
                    .selectAll('.node')
                    .data(source);
            nodes.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            nodeUpdate(nodes, everywidth, x, y);
            nodeDraw(nodes, everywidth, x, y);

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(data);

            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);

        };

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (data.length > 1) {
                                d3.select(this).classed('none', true);
                                for (var j = 0, k; j < data.length; j++) {
                                    k = data[j];
                                    if (k.key === d.key) {
                                        k._flag = false;
                                        break;
                                    }
                                }
                                boxplot.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            for (var j = 0, k; j < data.length; j++) {
                                k = data[j];
                                if (k.key === d.key) {
                                    k._flag = true;
                                    break;
                                }
                            }
                            boxplot.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail - 20,
                                    'y': i % legendColumnNo * 20 + 10})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(d.key),
                                    'stroke': color(d.key)})
                                .style('fill-opacity', d._flag !== false ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail,
                                    'y': i % legendColumnNo * 20 + 19})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.key);
                    });

        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .select('rect')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) - 20,
                            'y': i % legendColumnNo * 20 + 10})
                        .style({'fill': color(d.key),
                            'stroke': color(d.key)})
                        .style('fill-opacity', d._flag !== false ? 1 : 0);
                d3.select(this)
                        .select('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail,
                            'y': i % legendColumnNo * 20 + 19})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.key);
            });

        }

        function nodeDraw(nodes, everywidth, x, y) {
            var gap = everywidth * padding;
            nodes.enter()
                    .append('svg:g')
                    .classed('node', true)
                    .attr('transform', function(d) {
                        return 'translate(' + x(d.key) + ',0)';
                    })
                    .on('mouseover', function(d) {
                        drawLegend(d, true);
                    })
                    .on('mouseout', function(d) {
                        drawLegend(d, false);
                    })
                    .each(function(d) {
                        var values = d.values.map(function(p) {
                            return +p.value;
                        });
                        var quartileData = boxQuartiles(values);
                        var whiskerIndices = outplot(values, quartileData, 1);
                        var whiskerData = whiskerIndices &&
                                whiskerIndices.map(function(i) {
                                    return values[i];
                                });
                        var outlierIndices = whiskerIndices
                                ? d3.range(0, whiskerIndices[0])
                                .concat(d3.range(whiskerIndices[1] + 1, values.length))
                                : d3.range(values.length);
                        var center = d3.select(this)
                                .selectAll('.center')
                                .data(whiskerData ? [whiskerData] : []);
                        center.enter()
                                .append('svg:line')
                                .classed('center', true)
                                .style({'opacity': 0,
                                    'stroke': lineColor,
                                    'stroke-width': lineWidth,
                                    'stroke-dasharray': '3,3'})
                                .attr('x1', everywidth / 2)
                                .attr('x2', everywidth / 2)
                                .attr('y1', function(p) {
                                    return y(p[1]);
                                })
                                .attr('y2', function(p) {
                                    return y(p[1]);
                                })
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .attr('y1', function(p) {
                                    return y(p[0]);
                                });

                        // Update innerquartile box.
                        var rect = d3.select(this)
                                .selectAll('.box')
                                .data([quartileData]);
                        rect.enter()
                                .append('svg:rect')
                                .classed('box', true)
                                .attr('x', gap)
                                .attr('y', function(p) {
                                    return y(p[2]);
                                })
                                .attr('width', everywidth - 2 * gap)
                                .attr('height', function(p) {
                                    return y(p[0]) - y(p[2]);
                                })
                                .style({'opacity': 0,
                                    'fill': color(d.key),
                                    'stroke': lineColor,
                                    'stroke-width': lineWidth})
                                .transition()
                                .duration(duration)
                                .style('opacity', 1);

                        var medianLine = d3.select(this)
                                .selectAll('.median')
                                .data([quartileData[1]]);

                        medianLine.enter()
                                .append('svg:line')
                                .classed('median', true)
                                .style({'opacity': 0,
                                    'stroke': lineColor,
                                    'stroke-width': lineWidth})
                                .attr('x1', gap)
                                .attr('x2', everywidth - gap)
                                .attr('y1', y(quartileData[2]))
                                .attr('y2', y(quartileData[2]))
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .attr('y2', function(p) {
                                    return y(p);
                                })
                                .attr('y1', function(p) {
                                    return y(p);
                                });

                        var whisker = d3.select(this)
                                .selectAll('.whisker')
                                .data(whiskerData || []);
                        whisker.enter()
                                .append('svg:line')
                                .classed('whisker', true)
                                .style({'opacity': 0,
                                    'stroke': lineColor,
                                    'stroke-width': lineWidth})
                                .attr('x1', everywidth / 2)
                                .attr('x2', everywidth / 2)
                                .attr('y1', function(p) {
                                    return y(p);
                                })
                                .attr('y2', function(p) {
                                    return y(p);
                                })
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .attr('x1', gap)
                                .attr('x2', everywidth - gap);

                        var outlier = d3.select(this)
                                .selectAll('.outlier')
                                .data(outlierIndices);

                        outlier.enter()
                                .append('svg:circle')
                                .classed('outlier', true)
                                .on('mouseover', function(p) {
                                    d3.select(this)
                                            .transition()
                                            .duration(duration / 2)
                                            .style('fill-opacity', 0);
                                    drawLegendOutlier(values[p], true);
                                    d3.event.stopPropagation();
                                })
                                .on('mouseout', function(p) {
                                    d3.select(this)
                                            .transition()
                                            .duration(duration / 2)
                                            .style('fill-opacity', 1);
                                    drawLegendOutlier(values[p], false);
                                    d3.event.stopPropagation();
                                })
                                .style({'fill': color(d.key),
                                    'stroke': color(d.key),
                                    'opacity': 0})
                                .attr('r', outclicleSize)
                                .attr('cx', everywidth / 2)
                                .attr('cy', function(p) {
                                    return y(values[p]);
                                })
                                .transition()
                                .duration(duration)
                                .style('opacity', 1);

                        var boxTick = d3.select(this)
                                .selectAll('.tick')
                                .data(quartileData);
                        boxTick.enter()
                                .append('svg:text')
                                .classed('tick', true)
                                .style({'opacity': 0,
                                    'fill': fontColor,
                                    'font-size': fontSize,
                                    'font-family': fontFamily})
                                .attr('dy', '.3em')
                                .attr('dx', function(p, i) {
                                    return i & 1 ? 6 : -6;
                                })
                                .attr('x', function(p, i) {
                                    return i & 1 ? (everywidth - gap) : gap;
                                })
                                .attr('y', function(p) {
                                    return y(p);
                                })
                                .attr('text-anchor', function(p, i) {
                                    return i & 1 ? 'start' : 'end';
                                })
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .text(function(p) {
                                    return format(p);
                                });
                    });
        }

        function nodeUpdate(nodes, everywidth, x, y) {
            var gap = everywidth * padding;
            nodes.transition()
                    .duration(duration)
                    .attr('transform', function(d) {
                        return 'translate(' + x(d.key) + ',0)';
                    });
            nodes.each(function(d) {
                var values = d.values.map(function(p) {
                    return +p.value;
                });
                var quartileData = boxQuartiles(values);
                var whiskerIndices = outplot(values, quartileData, 1);
                var whiskerData = whiskerIndices &&
                        whiskerIndices.map(function(i) {
                            return values[i];
                        });
                var outlierIndices = whiskerIndices
                        ? d3.range(0, whiskerIndices[0])
                        .concat(d3.range(whiskerIndices[1] + 1, values.length))
                        : d3.range(values.length);
                d3.select(this)
                        .select('.center')
                        .data(whiskerData ? [whiskerData] : [])
                        .transition()
                        .duration(duration)
                        .style({
                            'stroke': lineColor,
                            'stroke-width': lineWidth
                        })
                        .attr('x1', everywidth / 2)
                        .attr('y1', function(p) {
                            return y(p[0]);
                        })
                        .attr('x2', everywidth / 2)
                        .attr('y2', function(p) {
                            return y(p[1]);
                        });

                d3.select(this)
                        .select('.box')
                        .data([quartileData])
                        .transition()
                        .duration(duration)
                        .style({
                            'stroke': lineColor,
                            'stroke-width': lineWidth,
                            'fill': color(d.key)
                        })
                        .attr('x', gap)
                        .attr('y', function(p) {
                            return y(p[2]);
                        })
                        .attr('width', everywidth - 2 * gap)
                        .attr('height', function(p) {
                            return y(p[0]) - y(p[2]);
                        });

                d3.select(this)
                        .selectAll('.median')
                        .data([quartileData[1]])
                        .transition()
                        .duration(duration)
                        .style({'stroke': lineColor,
                            'stroke-width': lineWidth})
                        .attr('x1', gap)
                        .attr('y1', function(p) {
                            return y(p);
                        })
                        .attr('x2', everywidth - gap)
                        .attr('y2', function(p) {
                            return y(p);
                        });

                d3.select(this)
                        .selectAll('.whisker')
                        .data(whiskerData || [])
                        .transition()
                        .duration(duration)
                        .style({'stroke': lineColor,
                            'stroke-width': lineWidth})
                        .attr('x1', gap)
                        .attr('y1', function(p) {
                            return y(p);
                        })
                        .attr('x2', everywidth - gap)
                        .attr('y2', function(p) {
                            return y(p);
                        });

                var outlier = d3.select(this)
                        .selectAll('.outlier')
                        .data(outlierIndices);
                outlier.exit()
                        .transition()
                        .duration(duration)
                        .attr('r', outclicleSize)
                        .style('opacity', 0)
                        .remove();

                outlier.transition()
                        .duration(duration)
                        .style({'fill': color(d.key),
                            'stroke': color(d.key)})
                        .attr('cx', everywidth / 2)
                        .attr('cy', function(i) {
                            return y(values[i]);
                        });
                outlier.enter()
                        .append('svg:circle')
                        .classed('outlier', true)
                        .on('mouseover', function(p) {
                            d3.select(this)
                                    .transition()
                                    .duration(duration / 2)
                                    .style('fill-opacity', 0);
                            drawLegendOutlier(values[p], true);

                        })
                        .on('mouseout', function(p) {
                            d3.select(this)
                                    .transition()
                                    .duration(duration / 2)
                                    .style('fill-opacity', 1);
                            drawLegendOutlier(values[p], false);
                        })
                        .style({'fill': color(d.key),
                            'stroke': color(d.key),
                            'opacity': 0})
                        .attr('r', outclicleSize)
                        .attr('cx', everywidth / 2)
                        .attr('cy', function(p) {
                            return y(values[p]);
                        })
                        .transition()
                        .duration(duration)
                        .style('opacity', 1);

                d3.select(this)
                        .selectAll('.tick')
                        .data(quartileData)
                        .transition()
                        .duration(duration)
                        .style({'fill': fontColor,
                            'font-size': fontSize,
                            'font-family': fontFamily})
                        .attr('dx', function(p, i) {
                            return i & 1 ? 6 : -6;
                        })
                        .attr('x', function(p, i) {
                            return i & 1 ? (everywidth - gap) : gap;
                        })
                        .attr('y', function(p) {
                            return y(p);
                        })
                        .attr('text-anchor', function(p, i) {
                            return i & 1 ? 'start' : 'end';
                        })
                        .text(function(p) {
                            return format(p);
                        });
            });

        }

        function boxQuartiles(d) {
            return [
                d3.quantile(d, .25),
                d3.quantile(d, .5),
                d3.quantile(d, .75)
            ];
        }

        function outplot(d, quartiles, k) {
            var q1 = quartiles[0],
                    q3 = quartiles[2],
                    iqr = (q3 - q1) * k,
                    i = -1,
                    j = d.length;
            while (d[++i] < q1 - iqr)
                ;
            while (d[--j] > q3 + iqr)
                ;
            return [i, j];
        }

        function drawLegendOutlier(d, style) {
            if (style) {
                floatTag.html('abnormal point value: ' + d)
                        .style({
                            'textAlign': 'center',
                            'margin': 'auto',
                            'color': '#ffffff'
                        });
                floatTag.style({
                    'visibility': 'visible'
                });
            } else
                floatTag.style({
                    'visibility': 'hidden'
                });
        }

        function drawLegend(d, style) {
            if (style) {
                var values = d.values.map(function(p) {
                    return +p.value;
                });
                var dline = boxQuartiles(values);
                floatTag.html('<div style="font-family:Helvetica;font-size:10px;"><p style="font-style:italic;margin-bottom:5px">name: '
                        + d.key + '</p><p style="color:#2f7ed8;font-weight:bold;margin:5px">Observations</p>Minimum: '
                        + values[0] + '<br/>Lower quartile: '
                        + dline[0] + '<br/>Median: '
                        + dline[1] + '<br/>Higher quartile: '
                        + dline[2] + '<br/>Maximum: '
                        + values[values.length - 1] + '<br/></div>')
                        .style({
                            'border-color': color(d.key),
                            'opacity': 1,
                            'textAlign': 'center',
                            'margin': 'auto'
                        });
            }
            else
                floatTag.style('opacity', 0);
        }

        boxplot.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in boxplot.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        boxplot.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in boxplot.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        boxplot.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in boxplot.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        boxplot.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        boxplot.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in boxplot.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        boxplot.fontColor = function(_) {
            if (!arguments.length)
                return fontColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in boxplot.fontColor(fontColor) should be string of text');
                    return this;
                } else {
                    fontColor = arguments[0];
                    return this;
                }
            }
        };

        boxplot.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        boxplot.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in boxplot.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        boxplot.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in boxplot.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        boxplot.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in boxplot.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        boxplot.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        boxplot.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in boxplot.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        boxplot.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        boxplot.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        boxplot.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        boxplot.lineWidth = function(_) {
            if (!arguments.length)
                return lineWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.lineWidth(lineWidth) should be number');
                    return this;
                } else {
                    lineWidth = arguments[0];
                    return this;
                }
            }
        };

        boxplot.lineColor = function(_) {
            if (!arguments.length)
                return lineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in boxplot.lineColor(lineColor) should be string');
                    return this;
                } else {
                    lineColor = arguments[0];
                    return this;
                }
            }
        };

        boxplot.outclicleSize = function(_) {
            if (!arguments.length)
                return outclicleSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in boxplot.outclicleSize(outclicleSize) should be number');
                    return this;
                } else {
                    outclicleSize = arguments[0];
                    return this;
                }
            }
        };

        boxplot.options = function(_) {
            if (!arguments.length)
                return {
                    'type': boxplot.getType(),
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
                    'outclicleSize': outclicleSize,
                    'lineWidth': lineWidth,
                    'lineColor': lineColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && boxplot.tickFormat(_.format);
                _.fontFamily && boxplot.fontFamily(_.fontFamily);
                _.fontColor && boxplot.fontColor(_.fontColor);
                isFinite(_.fontSize) && boxplot.fontSize(_.fontSize);
                isFinite(_.duration) && boxplot.duration(_.duration);

                isFinite(_.padding) && boxplot.padding(_.padding);
                isFinite(_.outclicleSize) && boxplot.outclicleSize(_.outclicleSize);
                isFinite(_.lineWidth) && boxplot.lineWidth(_.lineWidth);
                _.lineColor && boxplot.lineColor(_.lineColor);

                _.legendColor && boxplot.legendColor(_.legendColor);
                isFinite(_.legendSize) && boxplot.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && boxplot.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && boxplot.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            boxplot.options(arguments[0]);
        return boxplot;
    };
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
    /**
     * 三合一 bar/line/pie
     * @returns {unresolved}
     */
    pvisual.model.combo = function() {
        var combo = pvisual.extend();
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = 'combo'; //类型
        var width = 800; // 宽度
        var height = 1000; // 高度
        var widthAvail = width - 200; // 实际利用宽度
        var heightAvail = 300; // 实际利用高度
        var tranX = 50; //图形右移距离
        var tranY = 10; //图形下移距离
        var data; //数据
        var pieFontSize = 8; //字体大小
        var fontFamily = 'Arial'; // 字体样式
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 500; // 变化时间
        var format = d3.format('s');
        var color = combo.color();
        /************局部变量***************/
        var interpolate = 'liner';
        var tension = .7;
        var dimension;
        var padding = .1;
        var source;
        var innerRadius = 0; // 內半径
        var outerRadius = 0; // 外半径
        var barOpacity = 1;
        /******坐标轴******/
        var xtickRotate = 0;
        var yLegendBar = '';
        var yLegendLine = '';
        var xLegend = '';
        var labelSize = 8;
        var labelColor = '#000000';
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = -widthAvail;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = 'rgba(0,0,0,.1)';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';
        var minTickLine = 0;
        var maxTickLine = 100;
        var minTickBar = 50;
        var maxTickBar = 100;
        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 10;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        combo.data = function(_) {
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
                    _ = XMLdata(_);
                    var value = {x: d3.set()};
                    dimension = _.map(function(d) {
                        value[d.name] = d3.map();
                        return {name: d.name, _flag: true};
                    });
                    _.forEach(function(d) {
                        d.points.forEach(function(p) {
                            p.y = +p.y;
                            value[d.name].set(p.x, {x: p.x, y: p.y});
                            value.x.add(p.x);
                        });
                    });
                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                } else if (_.type === 'xlsx' || _.type === 'xls') {
                    var s = [];
                    for (var i = 0; i < _.length; i++) {
                        var k = pvisual.keys(_[i])[0];
                        s = s.concat(_[i][k]);
                    }
                    _ = s;
                    var value = {x: d3.set()};
                    dimension = pvisual.keys(_[0])
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                value[d] = d3.map();
                                return {name: d, _flag: true};
                            });
                    _.forEach(function(d) {
                        dimension.forEach(function(p) {
                            d.x = '' + d.x;
                            value[p.name].set(d.x, {x: d.x, y: +d[p.name]});
                            value.x.add(d.x);
                        });
                    });
                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                } else if (_.type === 'tsv' || _.type === 'csv') {
                    var value = {x: d3.set()};
                    dimension = pvisual.keys(_[0])
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                value[d] = d3.map();
                                return {name: d, _flag: true};
                            });
                    _.forEach(function(d) {
                        dimension.forEach(function(p) {
                            value[p.name].set(d.x, {x: d.x, y: +d[p.name]});
                            value.x.add(d.x);
                        });
                    });
                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                } else if (_.type === 'json') {
                    var value = {x: d3.set()};
                    dimension = _.map(function(d) {
                        value[d.name] = d3.map();
                        return {name: d.name, _flag: true};
                    });
                    _.forEach(function(d) {
                        d.points.forEach(function(p) {
                            p.y = +p.y;
                            value[d.name].set(p.x, {x: p.x, y: p.y});
                            value.x.add(p.x);
                        });
                    });
                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                }
                return this;
            } else
                return data;
        };
        
        combo.getType = function() {
            return type;
        };
        
        combo.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in multiline.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('combo', true)
                    .node();
            /* 初始化变量 */
            var source = combo.clone(data)
                    .filter(function(d) {
                        var flag = true;
                        dimension.forEach(function(p) {
                            if (p.name === d.name)
                                flag = p._flag;
                        });
                        return flag;
                    });
            var x0;
            var x1;
            var y0;
            var y1;
            var xAxis;
            var yAxisBar;
            var yAxisLine;
            x0 = d3.scale.ordinal()
                    .domain(dimension.x, function(d) {
                        return '' + d;
                    })
                    .rangeRoundBands([0, widthAvail], padding);
            xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient('bottom')
                    .tickSize(xtickLineLength);
            y0 = d3.scale.linear()
                    .domain([minTickBar || (minTickBar === 0 ? 0 : d3.min(source, function(d) {
                            return d3.min(d.points, function(p) {
                                return p.y;
                            });
                        })), maxTickBar || d3.max(source, function(d) {
                            return d3.max(d.points, function(p) {
                                return p.y;
                            });
                        })])
                    .range([heightAvail, 0]);
            y1 = d3.scale.linear()
                    .domain([minTickLine || (minTickLine === 0 ? 0 : d3.min(source, function(d) {
                            return d3.min(d.points, function(p) {
                                return p.y;
                            });
                        })), maxTickLine || d3.max(source, function(d) {
                            return d3.max(d.points, function(p) {
                                return p.y;
                            });
                        })])
                    .range([heightAvail, 0]);
            x1 = d3.scale.ordinal();
            x1.domain(dimension
                    .filter(function(d) {
                        return d._flag;
                    })
                    .map(function(d) {
                        return d.name;
                    }))
                    .rangeRoundBands([0, x0.rangeBand()]);
            yAxisBar = d3.svg.axis()
                    .scale(y0)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);
            yAxisLine = d3.svg.axis()
                    .scale(y1)
                    .orient('right')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);
            var line = d3.svg.line()
                    .interpolate(interpolate)
                    .tension(tension)
                    .x(function(d) {
                        return x0(d.x);
                    })
                    .y(function(d) {
                        return y1(d.y);
                    });
            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    combo.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis y-axis-bar axis', true);
                selection.append('svg:g')
                        .classed('y-axis y-axis-line axis', true);
                selection.append('svg:g')
                        .classed('bars', true);
                selection.append('svg:g')
                        .classed('lines', true);
                selection.append('svg:g')
                        .classed('points', true);
                selection.append('svg:g')
                        .classed('pies', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });
            g = d3.select(svg)
                    .select('g');
            var bars = g.selectAll('.bars')
                    .selectAll('.bar')
                    .data(dimension.x);
            bars.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            barUpdate(bars, x0, x1, y0, source);
            barDraw(bars, x0, x1, y0, source);
            var lines = g.selectAll('.lines')
                    .selectAll('.line')
                    .data(source);
            lines.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            lineUpdate(lines, line, x0, y1, source);
            lineDraw(lines, line, x0, y1, source);
            var points = g.selectAll('.points')
                    .selectAll('.point')
                    .data(source);
            points.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            pointUpdate(points, x0, y1, source);
            pointDraw(points, x0, y1, source);
            outerRadius = outerRadius || dimension.x.length > 4 ? widthAvail / 8 : widthAvail / dimension.x;
            innerRadius = innerRadius || outerRadius * .3;
            var pies = g.selectAll('.pies')
                    .selectAll('.pie')
                    .data(dimension.x);
            pies.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            pieUpdate(pies, source);
            pieDraw(pies, source);
            axis(g, xAxis, yAxisBar, yAxisLine);
            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);
        };
        
        function lineDraw(lines, line, x0, y, source) {
            lines.enter()
                    .append('svg:path')
                    .classed('line', true)
                    .attr('transform', 'translate(' + x0.rangeBand() / 2 + ',' + height + ')')
                    .attr('d', function(d) {
                        return line(d.points);
                    })
                    .style({'fill': 'none', 'width': 2})
                    .style('stroke', function(d) {
                        return color(d.name);
                    })
                    .transition()
                    .duration(duration)
                    .attr('transform', 'translate(' + x0.rangeBand() / 2 + ',0)');
        }

        function lineUpdate(lines, line, x0, y, source) {
            lines.transition()
                    .duration(duration)
                    .attr('transform', 'translate(' + x0.rangeBand() / 2 + ',0)')
                    .attr('d', function(d) {
                        return line(d.points);
                    })
                    .style('stroke', function(d) {
                        return color(d.name);
                    });
        }

        function barDraw(bars, x0, x1, y, source) {
            bars.enter()
                    .append('svg:g')
                    .classed('bar', true)
                    .attr('transform', function(d) {
                        return 'translate(' + x0(d) + ',0)';
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .selectAll('rect')
                                .data(function() {
                                    return source.map(function(p) {
                                        return {name: p.name, y: p.points[i].y};
                                    });
                                })
                                .enter()
                                .append('svg:rect')
                                .on('mouseover', function(p) {
                                    drawLegend(p, true);
                                })
                                .on('mouseout', function(p) {
                                    drawLegend(p, false);
                                })
                                .attr('height', function(p) {
                                    return heightAvail - 1 - y(p.y);
                                })
                                .attr('x', function(p) {
                                    return x1(p.name);
                                })
                                .attr({'y': y(0),
                                    'zIndex': 2,
                                    'width': x1.rangeBand()})
                                .attr('y', function(p) {
                                    return y(p.y);
                                })
                                .style('fill', function(p) {
                                    return color(p.name);
                                })
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('opacity', barOpacity);
                    });
        }

        function barUpdate(bars, x0, x1, y, source) {
            bars.attr('transform', function(d) {
                return 'translate(' + x0(d) + ',0)';
            }).each(function(d, i) {
                var rects = d3.select(this)
                        .selectAll('rect')
                        .data(function() {
                            return source.map(function(p) {
                                return {name: p.name, y: p.points[i].y};
                            });
                        });
                rects.exit()
                        .transition()
                        .duration(duration)
                        .style('opacity', 0)
                        .remove();
                rects.transition()
                        .duration(duration)
                        .attr('width', x1.rangeBand())
                        .style('fill', function(p) {
                            return color(p.name);
                        })
                        .style('opacity', barOpacity)
                        .attr('x', function(p) {
                            return x1(p.name);
                        })
                        .attr('y', function(p) {
                            return y(p.y);
                        })
                        .attr('height', function(p) {
                            return heightAvail - 1 - y(p.y);
                        });
                rects
                        .enter()
                        .append('svg:rect')
                        .on('mouseover', function(p) {
                            drawLegend(p, true);
                        })
                        .on('mouseout', function(p) {
                            drawLegend(p, false);
                        })
                        .attr('x', function(p) {
                            return x1(p.name);
                        })
                        .attr('y', function(p) {
                            return y(p.y);
                        })
                        .attr('width', x1.rangeBand())
                        .style('fill', function(p) {
                            return color(p.name);
                        })
                        .style('opacity', 0)
                        .transition()
                        .duration(duration)
                        .attr('height', function(p) {
                            return heightAvail - 1 - y(p.y);
                        })
                        .style('opacity', 1);
            });
        }

        function pointDraw(points, x0, y, source) {
            var tran = x0.rangeBand() / 2;
            points.enter()
                    .append('svg:g')
                    .classed('point', true)
                    .each(function(d, i) {
                        d3.select(this)
                                .selectAll('circle')
                                .data(function() {
                                    return d.points;
                                })
                                .enter()
                                .append('svg:circle')
                                .on('mouseover', function(p) {
                                    return drawLegend({name: d.name, y: p.y}, true);
                                })
                                .on('mouseout', function(p) {
                                    return drawLegend({name: d.name, y: p.y}, false);
                                })
                                .style('stroke', color(d.name))
                                .attr({'r': 4, 'cx': 0})
                                .style({'fill': '#FFFFFF', 'stroke-width': 2, 'opacity': 0})
                                .transition()
                                .ease('bounce')
                                .duration(duration)
                                .attr('cx', function(p) {
                                    return x0(p.x) + tran;
                                })
                                .attr('cy', function(p) {
                                    return y(p.y);
                                })
                                .style('opacity', 1);
                    });
        }

        function pointUpdate(points, x0, y, source) {
            var tran = x0.rangeBand() / 2;
            points.each(function(d, i) {
                var points = d3.select(this)
                        .selectAll('circle')
                        .data(function() {
                            return d.points;
                        });
                points.transition()
                        .ease('bounce')
                        .duration(duration)
                        .attr('cx', function(p) {
                            return x0(p.x) + tran;
                        })
                        .attr('cy', function(p) {
                            return y(p.y);
                        })
                        .style('stroke', color(d.name));
            });
        }

        function pieUpdate(pies, source) {
            var format = d3.format('.2%');
            var layout = d3.layout.pie()
                    .value(function(d) {
                        return d.y;
                    });
            var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(function(d) {
                        return (d.value - d.extent[0]) / (d.extent[1] - d.extent[0]) * (outerRadius - innerRadius) * .4 + (outerRadius - innerRadius) * .6 + innerRadius;
                    });
            pies.each(function(d, i) {
                var arcs = d3.select(this)
                        .datum(function() {
                            var extent = d3.extent(source.map(function(p) {
                                return p.points[i].y;
                            }));
                            return source.map(function(p) {
                                return {name: p.name, y: p.points[i].y, extent: extent};
                            });
                        })
                        .selectAll('path')
                        .data(layout);
                arcs.exit()
                        .attr('opacity', 1)
                        .transition()
                        .duration(duration)
                        .attr('opacity', 0)
                        .remove();
                arcs.transition()
                        .duration(duration)
                        .attr('fill', function(p) {
                            return color(p.data.name);
                        })
                        .attrTween('d', function(k) {
                            var q = d3.interpolate(+d3.select(this).attr('data-startAngle'), k.startAngle);
                            var p = d3.interpolate(+d3.select(this).attr('data-endAngle'), k.endAngle);
                            return function(t) {
                                return  arc({startAngle: p(t), endAngle: q(t), extent: k.data.extent, value: k.value});
                            };
                        })
                        .attr('data-startAngle', function(p) {
                            return p.startAngle;
                        })
                        .attr('data-endAngle', function(p) {
                            return p.endAngle;
                        });
                arcs.enter()
                        .append('svg:path')
                        .attr('data-startAngle', function(p) {
                            return p.startAngle;
                        })
                        .attr('data-endAngle', function(p) {
                            return p.endAngle;
                        })
                        .attr('fill', function(p) {
                            return color(p.data.name);
                        })
                        .attr('opacity', 0)
                        .on('mouseover', function(p) {
                            drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, true);
                        })
                        .on('mouseout', function(p) {
                            drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, false);
                        })
                        .transition()
                        .duration(duration)
                        .attrTween('d', function(p) {
                            var q = d3.interpolate(p.startAngle, p.endAngle);
                            return function(t) {
                                return  arc({startAngle: p.startAngle, endAngle: q(t), extent: p.data.extent, value: p.value});
                            };
                        })
                        .attr('opacity', 1);
                d3.select(this)
                        .select('text tspan')
                        .transition()
                        .duration(duration)
                        .style({'text-anchor': 'end',
                            'font-family': fontFamily,
                            'font-size': pieFontSize
                        })
                        .text(d);
                d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr('transform', 'translate(' + ((i % 4 + .5) * (outerRadius * 2 + 20) - 30) + ',' + ((Math.round(i / 4 - .5) + .5) * (outerRadius * 2 + 20) + heightAvail + 20) + ')');
            });
        }

        function pieDraw(pies, source) {
            var format = d3.format('.2%');
            var layout = d3.layout.pie()
                    .value(function(d) {
                        return d.y;
                    });
            var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(function(d) {
                        return (d.value - d.extent[0]) / (d.extent[1] - d.extent[0]) * (outerRadius - innerRadius) * .4 + (outerRadius - innerRadius) * .6 + innerRadius;
                    });
            pies.enter()
                    .append('svg:g')
                    .classed('pie', true)
                    .each(function(d, i) {
                        var arcs = d3.select(this)
                                .datum(function() {
                                    var extent = d3.extent(source.map(function(p) {
                                        return p.points[i].y;
                                    }));
                                    return source.map(function(p) {
                                        return {name: p.name, y: p.points[i].y, extent: extent};
                                    });
                                })
                                .selectAll('path')
                                .data(layout);
                        arcs.exit()
                                .attr('opacity', 1)
                                .transition()
                                .duration(duration)
                                .attr('opacity', 0)
                                .remove();
                        arcs.enter()
                                .append('svg:path')
                                .attr('fill', function(p) {
                                    return color(p.data.name);
                                })
                                .attr('opacity', 0)
                                .on('mouseover', function(p) {
                                    drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, true);
                                })
                                .on('mouseout', function(p) {
                                    drawLegend({name: p.data.name, y: format(Math.abs(p.endAngle - p.startAngle) / (2 * Math.PI))}, false);
                                })
                                .transition()
                                .duration(duration)
                                .attrTween('d', function(p) {
                                    var q = d3.interpolate(p.startAngle, p.endAngle);
                                    return function(t) {
                                        return  arc({startAngle: p.startAngle, endAngle: q(t), extent: p.data.extent, value: p.value});
                                    };
                                })
                                .attr('opacity', 1)
                                .attr('data-startAngle', function(p) {
                                    return p.startAngle;
                                })
                                .attr('data-endAngle', function(p) {
                                    return p.endAngle;
                                });
                        d3.select(this)
                                .append('svg:text')
                                .append('svg:tspan')
                                .transition()
                                .duration(duration)
                                .attr({x: 10, y: 5})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': pieFontSize,
                                })
                                .text(d);
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(' + ((i % 4 + .5) * (outerRadius * 2 + 20) - 30) + ',' + ((Math.round(i / 4 - .5) + .5) * (outerRadius * 2 + 20) + heightAvail + 20) + ')');
                    });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimension.length > 1) {
                                d3.select(this).classed('none', true);
                                d._flag = false;
                                source = data.map(function(d) {
                                    var value = dimension.filter(function(p) {
                                        return p._flag;
                                    }).map(function(p) {
                                        return {name: p.name, y: +d[p.name]};
                                    });
                                    return {x: d.x, value: value};
                                });
                                combo.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;
                            source = data.map(function(d) {
                                var value = dimension.filter(function(p) {
                                    return p._flag;
                                }).map(function(p) {
                                    return {name: p.name, y: +d[p.name]};
                                });
                                return {x: d.x, value: value};
                            });
                            combo.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'fill': legendColor,
                                    'font-size': legendSize,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});
                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function axis(g, xAxis, yAxis0, yAxis1) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(xLegend);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + heightAvail + ')')
                                .call(xAxis);
                    });
            g.select('.y-axis-bar')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegendBar);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegendBar);
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis0)
                                .selectAll('.tick text')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': tickTextSize,
                                    'fill': tickTextColor});
                    });
            g.select('.y-axis-line')
                    .attr({'transform': 'translate(' + widthAvail + ',0)'})
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegendLine);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegendLine);
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis1)
                                .selectAll('.tick text')
                                .style({'text-anchor': 'start',
                                    'font-family': fontFamily,
                                    'font-size': tickTextSize,
                                    'fill': tickTextColor});
                    });
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength()
                                        * (.3 * Math.abs(Math.sin(xtickRotate))))
                                + ')rotate(' + xtickRotate + ')';
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
                                    'stroke-dasharray': '3,1',
                                    'stroke': tickLineColor,
                                    'shape-rendering': 'crispEdges'});
                    });
        }

        function drawLegend(d, style) {
            if (style) {
                floatTag.style({
                    'border-color': color(d.name),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                })
                        .html('name: <b>' + d.name + '</b><br/>value: <b>' + d.y + '</b>');
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        combo.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        combo.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        combo.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        combo.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontFamily = arguments[0];
                    return this;
                }
            }
        };

        combo.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        combo.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in pie.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        combo.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        combo.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        combo.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        combo.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        combo.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        combo.outerRadius = function(_) {
            if (!arguments.length)
                return outerRadius;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.outerRadius(outerRadius) should be number of');
                    return this;
                } else {
                    outerRadius = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        combo.innerRadius = function(_) {
            if (!arguments.length)
                return innerRadius;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.innerRadius(innerRadius) should be number');
                    return this;
                } else {
                    innerRadius = Math.round(arguments[0]);
                    return this;
                }
            }
        };


        combo.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        combo.yLegendBar = function(_) {
            if (!arguments.length)
                return yLegendBar;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegendBar = arguments[0];
                    return this;
                }
            }
        };

        combo.yLegendLine = function(_) {
            if (!arguments.length)
                return yLegendLine;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegendLine = arguments[0];
                    return this;
                }
            }
        };

        combo.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        combo.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        combo.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        combo.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        combo.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        combo.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        combo.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        combo.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        combo.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        combo.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in combo.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        combo.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        combo.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in combo.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        combo.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        combo.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }

            return combo;
        };

        combo.minTickLine = function(_) {
            if (!arguments.length)
                return minTickLine;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.minTickLine(minTickLine) should be number of text');
                    return this;
                } else {
                    minTickLine = arguments[0];
                    return this;
                }
            }

            return combo;
        };

        combo.maxTickLine = function(_) {
            if (!arguments.length)
                return maxTickLine;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.maxTickLine(maxTickLine) should be number of text');
                    return this;
                } else {
                    maxTickLine = arguments[0];
                    return this;
                }
            }

            return combo;
        };

        combo.minTickBar = function(_) {
            if (!arguments.length)
                return minTickBar;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.minTickBar(minTickBar) should be number of text');
                    return this;
                } else {
                    minTickBar = arguments[0];
                    return this;
                }
            }

            return combo;
        };

        combo.maxTickBar = function(_) {
            if (!arguments.length)
                return maxTickBar;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.maxTickBar(maxTickBar) should be number of text');
                    return this;
                } else {
                    maxTickBar = arguments[0];
                    return this;
                }
            }

            return combo;
        };

        combo.pieFontSize = function(_) {
            if (!arguments.length)
                return pieFontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.pieFontSize(pieFontSize) should be number of text');
                    return this;
                } else {
                    pieFontSize = arguments[0];
                    return this;
                }
            }
        };

        combo.interpolate = function(_) {
            if (!arguments.length)
                return interpolate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.interpolate(interpolate) should be text');
                    return this;
                } else {
                    interpolate = arguments[0];
                    return this;
                }
            }
        };

        combo.tension = function(_) {
            if (!arguments.length)
                return tension;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.tension(tension) should be number of 0 ~ `');
                    return this;
                } else {
                    tension = arguments[0];
                    return this;
                }
            }
        };

        combo.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.padding(padding) should be number of 0 ~ `');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        combo.barOpacity = function(_) {
            if (!arguments.length)
                return barOpacity;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in combo.barOpacity(barOpacity) should be number of 0 ~ `');
                    return this;
                } else {
                    barOpacity = arguments[0];
                    return this;
                }
            }
        };

        combo.options = function(_) {
            if (!arguments.length)
                return {
                    'type': combo.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'maxTickBar': maxTickBar,
                    'minTickBar': minTickBar,
                    'maxTickLine': maxTickLine,
                    'minTickLine': minTickLine,
                    'format': format,
                    'pieFontSize': pieFontSize,
                    'ytickNumber': ytickNumber,
                    'fontFamily': fontFamily,
                    'barOpacity': barOpacity,
                    'xtickRotate': xtickRotate,
                    'yLegendBar': yLegendBar,
                    'yLegendLine': yLegendLine,
                    'color': color,
                    'interpolate': interpolate,
                    'tension': tension,
                    'duration': duration,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap};
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
                _.format && combo.tickFormat(_.format);
                _.fontFamily && combo.fontFamily(_.fontFamily);
                isFinite(_.pieFontSize) && combo.pieFontSize(_.pieFontSize);
                isFinite(_.ytickNumber) && combo.ytickNumber(_.ytickNumber);
                isFinite(_.barOpacity) && combo.barOpacity(_.barOpacity);
                isFinite(_.xtickRotate) && combo.xtickRotate(_.xtickRotate);
                _.yLegendBar && combo.yLegendBar(_.yLegendBar);
                _.yLegendLine && combo.yLegendLine(_.yLegendLine);
                _.xLegend && combo.xLegend(_.xLegend);
                isFinite(_.tension) && combo.tension(_.tension);
                _.interpolate && combo.interpolate(_.interpolate);
                isFinite(_.fontSize) && combo.fontSize(_.fontSize);
                isFinite(_.duration) && combo.duration(_.duration);
                _.legendColor && combo.legendColor(_.legendColor);
                isFinite(_.legendSize) && combo.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && combo.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && combo.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            combo.options(arguments[0]);
        return combo;
    };
        /**
     * 共现矩阵
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.co_occurrence_matrix = function() {
        var co_occurrence_matrix = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '共现矩阵'; //类型
        var width = 800; // 宽度
        var height = 800; // 高度
        var widthAvail = width - 100; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 99; //图形右移距离
        var tranY = 99; //图形下移距离
        var data; //数据
        var floatTag; // 活动标签
        var fontSize = 8; //字体大小
        var fontColor = '#000000'; //颜色
        var fontFamily = 'sans-serif'; // 字体样式
        var div; // 外层div
        var svg; // 外层svg
        var duration = 2000; // 变化时间
        var format = d3.format('s');
        var color = co_occurrence_matrix.color();

        /************局部变量***************/
        var gradientColor = ['#00FF00', '#ff0000'];
        var max;
        var min;
        var orders;

        co_occurrence_matrix.data = function(_) {
            if (arguments.length) {
                if (_.type === 'xml') {
                    _ = _.root;
                    _ = XMLdata(_);
                }
                var index = d3.map();
                _.nodes.forEach(function(d, i) {
                    d.index = i;
                    d.links = d3.range(_.nodes.length).map(function(j) {
                        return {index: j, value: null};
                    });
                    d.links[i].value = -1;
                    index.set(d.name, d);
                });
                max = -Infinity;
                min = Infinity;
                _.links.forEach(function(d) {
                    var source = index.get(d.source);
                    var target = index.get(d.target);
                    if (source && target) {
                        max = Math.max(max, d.value);
                        min = Math.min(min, d.value);
                        source.links[target.index].value = d.value;
                        target.links[source.index].value = d.value;
                    }
                });
                data = _.nodes;
                data.index = index;
                window.data = _;
                return this;
            } else
                return data;
        };

        co_occurrence_matrix.getType = function() {
            return type;
        };

        co_occurrence_matrix.render = function(_) {
            /* 获取外层的标签 */
            co_occurrence_matrix.div = div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                alert('The argument(element) in graph.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                .append('svg')
                .classed('co_occurrence_matrix', true)
                .node();

            floatTag = d3.select(div)
                .select('.floatTag')
                .node() ?
                d3.select(div)
                    .select('.floatTag') :
                co_occurrence_matrix.floatTag(div); //绘图元素的外容器，添加动态标签

            var g = d3.select(svg)
                .attr({'width': width,
                    'height': height})
                .selectAll('g')
                .data([1])
                .enter()
                .append('svg:g')
                .attr('transform', 'translate(' + tranX + ',' + tranY + ')');

            g.call(function(selection) {
                selection.append('rect')
                    .classed('background', true);
                selection.append('svg:g')
                    .classed('rows', true);
                selection.append('svg:g')
                    .classed('columns', true);
            });
            g = d3.select(svg)
                .select('g');

            g.select('.background')
                .attr({'width': widthAvail,
                    'height': heightAvail,
                    'fill': '#eee'});

            var x = d3.scale.ordinal().rangeBands([0, widthAvail]);
            var h = d3.scale.linear().domain([min, max]).range(gradientColor);

            orders = {
                name: d3.range(data.length).sort(function(a, b) {
                    return d3.ascending(data[a].name, data[b].name);
                }),
                value: d3.range(data.length).sort(function(a, b) {
                    return data[b].value - data[a].value;
                }),
                group: d3.range(data.length).sort(function(a, b) {
                    return data[b].group - data[a].group;
                })
            };

            this.orders = d3.keys(orders);
            // 默认排序
            x.domain(orders.name);

            var rows = g.select('.rows')
                .selectAll('.row')
                .data(data);
            rows.exit()
                .transition()
                .duration(duration)
                .style('opacity', 0)
                .remove();

            rowsUpdate(rows, x, h);
            rowsDraw(rows, x, h);

            var columns = g.select('.columns')
                .selectAll('.column')
                .data(data);
            columns.exit()
                .transition()
                .duration(500)
                .style('opacity', 0)
                .remove();

            columnsUpdate(columns, x);
            columnsDraw(columns, x);

            this.makeOrder = function(value) {
                x.domain(orders[value]);
                var t = g.transition()
                    .duration(duration);

                t.selectAll('.row')
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr('transform', function(d) {
                        return 'translate(0,' + x(d.index) + ')';
                    })
                    .selectAll('.cell')
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr('x', function(d) {
                        return x(d.index);
                    });

                t.selectAll('.column')
                    .delay(function(d, i) {
                        return x(i) * 4;
                    })
                    .attr('transform', function(d) {
                        return 'translate(' + x(d.index) + ')rotate(-90)';
                    });
            };
            return co_occurrence_matrix;
        };

        function rowsUpdate(rows, x, h) {
            rows.each(function(d) {
                d3.select(this)
                    .select('line')
                    .transition()
                    .duration(500)
                    .attr('x2', widthAvail);

                d3.select(this)
                    .select('text')
                    .attr('y', x.rangeBand() / 2)
                    .transition()
                    .duration(500)
                    .style({'font-size': fontSize, 'font-family': fontFamily})
                    .text(function(d) {
                        return d.name;
                    });

                var cell = d3.select(this)
                    .selectAll('.cell')
                    .data(d.links.filter(function(p) {
                        return p.value;
                    }));

                cell.exit()
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .remove();

                cell.transition()
                    .duration(500)
                    .attr('width', x.rangeBand())
                    .attr('height', x.rangeBand())
                    .attr('fill', function(p) {
                        return p.value === -1 ? color(p.value) : h(p.value);
                    })
                    .attr('x', function(p) {
                        return x(p.index);
                    });

                cell.enter()
                    .append('svg:rect')
                    .classed('cell', true)
                    .attr('width', x.rangeBand())
                    .attr('height', x.rangeBand())
                    .attr('fill', function(p) {
                        return p.value === -1 ? color(p.value) : h(p.value);
                    })
                    .attr('x', function(p) {
                        return x(p.index);
                    })
                    .on('mouseover', function(p) {
                        d3.selectAll('.row text')
                            .attr('fill', function(k, i) {
                                return i === d.index ? '#ff0000' : null;
                            });
                        d3.selectAll('.column text')
                            .attr('fill', function(k, i) {
                                return i === p.index ? '#ff0000' : null;
                            });
                        drawLegend({value: p.value, color: h(p.value)}, true);
                    })
                    .on('mouseout', function() {
                        d3.selectAll('text').attr('fill', 'null');
                        drawLegend(null, false);
                    });

            }).transition()
                .duration(duration / 2)
                .delay(function(d, i) {
                    return x(i) * 4;
                })
                .attr('transform', function(d) {
                    return 'translate(0,' + x(d.index) + ')';
                });
        }
        function rowsDraw(rows, x, h) {
            rows.enter()
                .append('svg:g')
                .classed('row', true)
                .attr('fill-opacity', 0)
                .each(function(d) {
                    d3.select(this)
                        .append('svg:line')
                        .attr({'x2': widthAvail,
                            'stroke': '#fff'});

                    d3.select(this)
                        .append('svg:text')
                        .attr('x', -6)
                        .attr('y', x.rangeBand() / 2)
                        .attr('dy', '.32em')
                        .attr('text-anchor', 'end')
                        .style({'font-size': fontSize, 'font-family': fontFamily})
                        .text(function(d) {
                            return d.name;
                        });
                    d3.select(this)
                        .selectAll('.cell')
                        .data(d.links.filter(function(p) {
                            return p.value;
                        }))
                        .enter()
                        .append('svg:rect')
                        .classed('cell', true)
                        .attr('width', x.rangeBand())
                        .attr('height', x.rangeBand())
                        .attr('fill', function(p) {
                            return p.value === -1 ? color(p.value) : h(p.value);
                        })
                        .attr('x', function(p) {
                            return x(p.index);
                        })
                        .on('mouseover', function(p) {
                            d3.selectAll('.row text')
                                .attr('fill', function(k, i) {
                                    return i === d.index ? '#ff0000' : null;
                                });
                            d3.selectAll('.column text')
                                .attr('fill', function(k, i) {
                                    return i === p.index ? '#ff0000' : null;
                                });
                            drawLegend({value: p.value, color: h(p.value)}, true);
                        })
                        .on('mouseout', function() {
                            d3.selectAll('text').attr('fill', 'null');
                            drawLegend(null, false);
                        });
                })
                .transition()
                .duration(duration / 2)
                .delay(function(d, i) {
                    return x(i) * 4;
                })
                .attr('fill-opacity', 1)
                .attr('transform', function(d) {
                    return 'translate(0,' + x(d.index) + ')';
                });
        }

        function columnsUpdate(columns, x) {
            columns.transition()
                .duration(500)
                .attr('transform', function(d) {
                    return 'translate(' + x(d.index) + ')rotate(-90)';
                })
                .call(function(selection) {
                    selection.select('line')
                        .transition()
                        .duration(500)
                        .attr({'x1': -width,
                            'stroke': '#fff'});
                    selection.select('text')
                        .transition()
                        .duration(500)
                        .attr('y', x.rangeBand() / 2)
                        .style({'font-size': fontSize, 'font-family': fontFamily})
                        .text(function(d) {
                            return d.name;
                        });
                });
        }
        function columnsDraw(columns, x) {
            columns.enter()
                .append('svg:g')
                .classed('column', true)
                .attr('transform', function(d) {
                    return 'translate(' + x(d.index) + ')rotate(-90)';
                })
                .call(function(selection) {
                    selection.append('svg:line')
                        .attr({'x1': -width,
                            'stroke': '#fff'});
                    selection.append('svg:text')
                        .attr('x', 6)
                        .attr('y', x.rangeBand() / 2)
                        .attr('dy', '.32em')
                        .attr('text-anchor', 'start')
                        .style({'font-size': fontSize, 'font-family': fontFamily})
                        .text(function(d) {
                            return d.name;
                        });
                });
        }

        function drawLegend(d, style) {
            if (style) {
                floatTag.style({
                    'border-color': d.color,
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                }).html('<span style="color:#3f7ed8; font-weight:bold; font-size:11px;margin-bottom:5px;">value: ' + format(d.value) + '</span>');
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

        co_occurrence_matrix.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
                console.error('The argument(element) in co_occurrence_matrix.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
                console.error('The argument(element) in co_occurrence_matrix.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            } else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                || !isFinite(arguments[0])
                || !isFinite(arguments[1])) {
                console.error('The argument(element) in co_occurrence_matrix.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in co_occurrence_matrix.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        co_occurrence_matrix.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in co_occurrence_matrix.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        co_occurrence_matrix.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in co_occurrence_matrix.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        co_occurrence_matrix.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in co_occurrence_matrix.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };
        co_occurrence_matrix.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in co_occurrence_matrix.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        co_occurrence_matrix.gradientColor = function(_) {
            if (!arguments.length)
                return gradientColor;
            else if (arguments.length !== 2
                || typeof arguments[0] !== 'string'
                || typeof arguments[1] !== 'string') {
                console.error('The argument(element) in co_occurrence_matrix.gradientColor(start, end) should be string and string of color');
                return this;
            }
            else {
                gradientColor[0] = arguments[0];
                gradientColor[1] = arguments[1];
                return this;
            }
        };

        co_occurrence_matrix.options = function(_) {
            if (!arguments.length)
                return {
                    'type': co_occurrence_matrix.getType(), 'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format, 'fontSize': fontSize,
                    'fontColor': fontColor,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'gradientColor': gradientColor
                };
            else if (typeof _ !== 'object') {
                console.error('The arguments in co_occurrence_matrix.options(options) should be object');
                return this;
            } else {
                width = isFinite(_.width) ? _.width : width;
                height = isFinite(_.height) ? _.height : height;
                widthAvail = isFinite(_.widthAvail) ? _.widthAvail : widthAvail;
                heightAvail = isFinite(_.heightAvail) ? _.heightAvail : heightAvail;
                tranX = isFinite(_.tranX) ? _.tranX : tranX;
                tranY = isFinite(_.tranY) ? _.tranY : tranY;
                _.format && co_occurrence_matrix.tickFormat(_.format);
                _.fontFamily && co_occurrence_matrix.fontFamily(_.fontFamily);
                isFinite(_.fontSize) && co_occurrence_matrix.fontSize(_.fontSize);
                isFinite(_.duration) && co_occurrence_matrix.duration(_.duration);
                typeof _.gradientColor === 'object'
                && _.gradientColor.constructor === Array
                && _.gradientColor.length === 2
                && co_occurrence_matrix.gradientColor(_.gradientColor[0], _.gradientColor[1]);
                return this;
            }
        };

        if (arguments.length === 1)
            co_occurrence_matrix.options(arguments[0]);
        return co_occurrence_matrix;
    };
    /**
     * 弦图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.chord = function() {
        var chord = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '弦图'; //类型
        var width = 900; // 宽度
        var height = 900; // 高度
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
        var duration = 500; // 变化时间
        var format = d3.format('s');
        var color = chord.color();
        /************局部变量***************/
        var source;
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var padding = .01;
        var symmetry = true;
        var dimensions;
        var sum;
        var innerRadius;
        var outerRadius;


        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        chord.data = function(_) {
            if (arguments.length) {
                if (_.type === 'xml') {
                    _ = _.root;
                    _ = _.map(function(d) {
                        var obj = {};
                        d.row.row.forEach(function(p) {
                            var k = pvisual.keys(p)[0];
                            obj[k] = p[k];
                        });
                        return fobj;
                    });
                } else if (_.type === 'xlsx' || _.type === 'xls') {
                    var s = [];
                    for (var i = 0; i < _.length; i++) {
                        var k = pvisual.keys(_[i])[0];
                        s = s.concat(_[i][k]);
                    }
                    _ = s;
                }
                var groupNum = 0;
                var index = {};
                var from;
                var to;
                sum = 0;
                data = [];
                source = _;
                source.forEach(function(d) {
                    from = d.from;
                    to = d.to;
                    if (typeof index[from] === 'undefined') {
                        index[groupNum] = from;
                        index[from] = groupNum++;
                    }
                    if (typeof index[to] === 'undefined') {
                        index[groupNum] = to;
                        index[to] = groupNum++;
                    }
                    sum += +d.value;
                });
                for (var i = 0; i < groupNum; i++) {
                    data[i] = [];
                    data[i]._index = i;
                    for (var j = 0; j < groupNum; j++) {
                        data[i][j] = 0;
                    }
                }
                if (!symmetry)
                    source.forEach(function(d) {
                        data[index[d.from]][index[d.to]] += +d.value;
                    });
                else
                    source.forEach(function(d) {
                        data[index[d.from]][index[d.to]] += +d.value;
                        data[index[d.to]][index[d.from]] += +d.value;
                    });
                dimensions = index;
                return this;
            } else
                return data;
        };

        chord.getType = function() {
            return type;
        };

        chord.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in chord.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('chord', true)
                    .node();
            /* 初始化变量 */
            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    chord.floatTag(div); //绘图元素的外容器，添加动态标签


            if (!innerRadius)
                innerRadius = Math.min(widthAvail, heightAvail) * .38; // 內半径
            if (!outerRadius)
                outerRadius = innerRadius * 1.1; // 外半径

            var layout = d3.layout.chord()
                    .padding(padding)
                    .sortSubgroups(d3.descending)
                    .matrix(data);
            var g = d3.select(svg)
                    .attr({'width': width,
                        'height': height})
                    .selectAll('g')
                    .data([1])
                    .enter()
                    .append('svg:g')
                    .attr('transform', 'translate(' + (tranX + Math.min(widthAvail, heightAvail) / 2)
                            + ',' + (tranY + Math.min(widthAvail, heightAvail) / 2) + ')');

            g.call(function(selection) {
                selection.append('svg:g')
                        .classed('arcs', true);
                selection.append('svg:g')
                        .classed('labels', true);
                selection.append('svg:g')
                        .classed('ticks', true);
                selection.append('svg:g')
                        .classed('chords', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg).select('g');
            var chords = g.select('.chords').
                    selectAll('path')
                    .data(layout.chords);
            chords.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            chordUpdate(chords);
            chordDraw(chords);
            var arcs = g.select('.arcs')
                    .selectAll('path')
                    .data(layout.groups);
            arcs.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            arcUpdate(arcs, chords);
            arcDraw(arcs, chords);
            var labels = g.select('.labels')
                    .selectAll('.label')
                    .data(layout.groups);
            labels.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            labelUpdate(labels);
            labelDraw(labels);
            var ticks = g.select('.ticks')
                    .selectAll('.tick')
                    .data(layout.groups);
            ticks.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            tickUpdate(ticks);
            tickDraw(ticks);
            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(function() {
                        var p = d3.set([]);
                        source.forEach(function(d) {
                            p.add(d.from);
                            p.add(d.to);
                        });
                        return p.values();
                    }());
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);
        };

        function chordUpdate(chords) {
            chords.transition()
                    .duration(duration)
                    .style('fill', function(d) {
                        return color(data[d.target.index]._index);
                    })
                    .attr('d', d3.svg.chord()
                            .radius(innerRadius));
        }

        function chordDraw(chords) {
            chords.enter()
                    .append('svg:path')
                    .style('fill', function(d) {
                        return color(data[d.target.index]._index);
                    })
                    .attr('d', d3.svg.chord()
                            .radius(innerRadius))
                    .style({'opacity': 0,
                        'fill-opacity': .67,
                        'stroke': 'none',
                        'stroke-width': '.5px'})
                    .on('mouseover', fadeone(.03, true, chords))
                    .on('mouseout', fadeone(1, false, chords))
                    .transition()
                    .duration(duration)
                    .style('opacity', 1);
        }

        function arcUpdate(arcs) {
            arcs.transition()
                    .duration(duration)
                    .style('fill', function(d) {
                        return color(data[d.index]._index);
                    })
                    .attr('d', d3.svg.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(outerRadius));
        }

        function arcDraw(arcs, chords) {
            arcs.enter()
                    .append('svg:path')
                    .style('fill', function(d) {
                        return color(dimensions[data[d.index]._index]);
                    })
                    .on('mouseover', fade(.03, true, chords))
                    .on('mouseout', fade(1, false, chords))
                    .transition()
                    .duration(duration)
                    .attr('d', d3.svg.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(outerRadius));
        }

        function labelUpdate(labels) {
            labels.transition()
                    .duration(duration)
                    .attr('transform', function(d) {
                        return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                + 'translate(' + outerRadius + ',0)';
                    })
                    .select('text')
                    .style('text-anchor', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                    })
                    .attr('transform', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                    })
                    .style({'font-family': fontFamily,
                        'font-weight': 'normal',
                        'font-size': fontSize})
                    .text(function(d) {
                        return d.endAngle - d.startAngle > .03 ? dimensions[data[d.index]._index] : '...';
                    });
        }

        function labelDraw(labels) {
            labels.enter()
                    .append('svg:g')
                    .classed('label', true)
                    .attr('transform', function(d) {
                        return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                + 'translate(' + outerRadius + ',0)';
                    })
                    .append('svg:text')
                    .attr({'x': 8, 'dy': 20})
                    .style('opacity', 0)
                    .style('text-anchor', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                    })
                    .attr('transform', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                    })
                    .transition()
                    .duration(duration)
                    .style({'font-family': fontFamily,
                        'font-size': fontSize,
                        'font-weight': 'normal',
                        'opacity': 1})
                    .text(function(d) {
                        return d.endAngle - d.startAngle > .03 ? dimensions[data[d.index]._index] : '...';
                    });
        }

        function tickUpdate(ticks) {
            ticks.transition()
                    .duration(duration)
                    .attr('transform', function(d) {
                        return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 89) + ')'
                                + 'translate(' + (outerRadius - 50) + ',0)';
                    })
                    .select('text')
                    .attr('transform', function(d) {
                        if ((d.endAngle + d.startAngle) < Math.PI)
                            return 'rotate(90)translate(-9)';
                        else if (Math.PI < (d.endAngle + d.startAngle) && (d.endAngle + d.startAngle) < Math.PI * 3)
                            return 'rotate(-90)translate(-9)';
                        else
                            return 'rotate(90)translate(-9)';
                    })
                    .style({'font-family': fontFamily,
                        'font-weight': 'normal',
                        'font-size': fontSize})
                    .text(function(d) {
                        return format(Math.round(d.value));
                    });
        }

        function tickDraw(ticks) {
            ticks.enter()
                    .append('svg:g')
                    .classed('tick', true)
                    .attr('transform', function(d) {
                        return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 89) + ')'
                                + 'translate(' + (outerRadius - 50) + ',0)';
                    })
                    .append('svg:text')
                    .attr('transform', function(d) {
                        if ((d.endAngle + d.startAngle) < Math.PI)
                            return 'rotate(90)translate(-9)';
                        else if (Math.PI < (d.endAngle + d.startAngle) && (d.endAngle + d.startAngle) < Math.PI * 3)
                            return 'rotate(-90)translate(-9)';
                        else
                            return 'rotate(90)translate(-9)';
                    })
                    .transition()
                    .duration(duration)
                    .style({'font-family': fontFamily,
                        'font-weight': 'normal',
                        'font-size': fontSize})
                    .text(function(d) {
                        return format(Math.round(d.value));
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d) {
                var index = dimensions[d];
                d3.select(this)
                        .select('rect')
                        .transition()
                        .duration(duration)
                        .style('fill-opacity', function() {
                            var flag = 1;
                            for (var i = 0, k; i < source.length; i++) {
                                k = source[i];
                                if (k.from === d || k.to === d)
                                    flag = k._flag === false ? 0 : 1;
                            }
                            return flag;
                        })
                        .attr({'x': (index - index % legendColumnNo) /
                                    legendColumnNo * legendRowGap +
                                    outerRadius,
                            'y': index % legendColumnNo * 20
                                    - outerRadius * 1.15})
                        .style({'fill': color(index),
                            'stroke': color(index)});
                d3.select(this)
                        .select('text')
                        .transition()
                        .duration(duration)
                        .attr({'x': (index - index % legendColumnNo) /
                                    legendColumnNo * legendRowGap +
                                    outerRadius + 20,
                            'y': index % legendColumnNo * 20 + 9 -
                                    outerRadius * 1.15})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d);
            });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            d3.select(this)
                                    .classed('none', true);
                            for (var j = 0, k; j < source.length; j++) {
                                k = source[j];
                                if (d === k.from || d === k.to) {
                                    k._flag = false;
                                } else {
                                    k._flag = true;
                                }
                            }
                            dataUpdate();
                            chord.render();
                        } else {
                            d3.select(this)
                                    .classed('none', false);
                            for (var j = 0, k; j < source.length; j++) {
                                k = source[j];
                                if (d === k.from || d === k.to) {
                                    k._flag = true;
                                }
                            }
                            dataUpdate();
                            chord.render();
                        }
                    })
                    .each(function(d) {
                        var index = dimensions[d];
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (index - index % legendColumnNo) /
                                            legendColumnNo * legendRowGap +
                                            outerRadius,
                                    'y': index % legendColumnNo * 20
                                            - outerRadius * 1.15})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(index),
                                    'stroke': color(index)})
                                .style('fill-opacity', 1)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('fill-opacity', function() {
                                    for (var i = 0, k; i < source.length; i++) {
                                        k = source[i];
                                        if (k.from === d || k.to === d)
                                            return k.flag === false ? 0 : 1;
                                    }
                                    return 1;
                                })
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (index - index % legendColumnNo) /
                                            legendColumnNo * legendRowGap +
                                            outerRadius + 20,
                                    'y': index % legendColumnNo * 20 + 9 -
                                            outerRadius * 1.15})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .text(d);
                    });
        }

        function dataUpdate() {
            var groupNum = 0;
            var index = {};
            var from;
            var to;
            sum = 0;
            data = [];
            source.forEach(function(d) {
                if (d._flag !== false) {
                    from = d.from;
                    to = d.to;
                    if (typeof index[from] === 'undefined') {
                        index[groupNum] = dimensions[from];
                        index[from] = groupNum++;
                    }
                    if (typeof index[to] === 'undefined') {
                        index[groupNum] = dimensions[to];
                        index[to] = groupNum++;
                    }
                    sum += +d.value;
                }
            });
            for (var i = 0; i < groupNum; i++) {
                data[i] = [];
                for (var j = 0; j < groupNum; j++) {
                    data[i][j] = 0;
                }
            }
            if (!symmetry)
                source.forEach(function(d) {
                    if (d._flag !== false) {
                        data[index[d.from]][index[d.to]] += +d.value;
                        data[index[d.from]]._index = index[index[d.from]];
                    }

                });
            else
                source.forEach(function(d) {
                    if (d._flag !== false) {
                        data[index[d.from]][index[d.to]] += +d.value;
                        data[index[d.to]][index[d.from]] += +d.value;
                        data[index[d.from]]._index = index[index[d.from]];
                        data[index[d.to]]._index = index[index[d.to]];
                    }
                });
        }

        function fade(opacity, style, chords) {
            return function(g, i) {
                drawLegendArc(style, g);
                chords.filter(function(d) {
                    return d.source.index !== i && d.target.index !== i;
                })
                        .transition()
                        .duration(duration / 2)
                        .style('opacity', opacity);
            };
        }

        function fadeone(opacity, style, chords) {
            return function(d) {
                var that = this;
                drawLegend(style, d);
                chords.filter(function() {
                    return this !== that;
                })
                        .transition()
                        .duration(duration / 2)
                        .style('opacity', opacity);
            };
        }

        function drawLegend(style, d) {
            if (style) {
                floatTag.style({
                    'border-color': color(data[d.source.index]._index + data[d.target.index]._index),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                })
                        .html(dimensions[data[d.source.index]._index] + ' to ' +
                                dimensions[data[d.target.index]._index] + ' : ' +
                                format(d.source.value) + '<br>' +
                                dimensions[data[d.target.index]._index] + ' to ' +
                                dimensions[data[d.source.index]._index] + ' : ' +
                                format(d.target.value));
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        function drawLegendArc(style, d) {
            if (style) {
                var msum = d3.sum(data[d.index]);
                floatTag.style({
                    'border-color': color(dimensions[data[d.index]._index]),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                })
                        .html(dimensions[data[d.index]._index] + ' : ' + msum +
                                '<br/>比例: ' + format((msum / sum * 100).toFixed(2)) + '%');
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        chord.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in chord.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        chord.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in chord.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        chord.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in chord.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        chord.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        chord.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in chord.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        chord.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        chord.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in chord.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        chord.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in chord.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        chord.symmetry = function(_) {
            if (!arguments.length)
                return symmetry;
            else {
                if (arguments[0] !== true && arguments[0] !== false) {
                    console.error('The arguments in chord.symmetry(symmetry) should be bool');
                    return this;
                } else {
                    symmetry = arguments[0];
                    return this;
                }
            }
        };

        chord.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        chord.innerRadius = function(_) {
            if (!arguments.length)
                return innerRadius;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.innerRadius(innerRadius) should be number');
                    return this;
                } else {
                    innerRadius = arguments[0];
                    return this;
                }
            }
        };

        chord.outerRadius = function(_) {
            if (!arguments.length)
                return outerRadius;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.outerRadius(outerRadius) should be number');
                    return this;
                } else {
                    outerRadius = arguments[0];
                    return this;
                }
            }
        };

        chord.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in chord.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        chord.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        chord.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in chord.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        chord.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        chord.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in chord.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        chord.options = function(_) {
            if (!arguments.length)
                return {
                    'type': chord.getType(),
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
                    'symmetry': symmetry,
                    'innerRadius': innerRadius,
                    'outerRadius': outerRadius,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && chord.tickFormat(_.format);
                _.fontFamily && chord.fontFamily(_.fontFamily);
                _.fontColor && chord.fontColor(_.fontColor);
                isFinite(_.fontSize) && chord.fontSize(_.fontSize);
                isFinite(_.duration) && chord.duration(_.duration);

                isFinite(_.padding) && chord.padding(_.padding);
                isFinite(_.outerRadius) && chord.outerRadius(_.outerRadius);
                isFinite(_.innerRadius) && chord.innerRadius(_.innerRadius);
                _.symmetry && chord.symmetry(_.symmetry);

                _.legendColor && chord.legendColor(_.legendColor);
                isFinite(_.legendSize) && chord.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && chord.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && chord.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            chord.options(arguments[0]);
        return chord;
    };
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
    /**
     * 柱状图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.groupbar = function() {
        var groupbar = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '柱状图'; //类型
        var width = 800; // 宽度
        var height = 400; // 高度
        var widthAvail = width - 200; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 50; //图形右移距离
        var tranY = 0; //图形下移距离
        var data; //数据
        var fontFamily = 'Arial'; // 字体样式
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = groupbar.color();

        /************局部变量***************/
        var padding = .1;
        var dimension;
        var source;

        /******坐标轴******/
        var yLegend = '';
        var xLegend = '';
        var xtickRotate = 0;
        var ytickRotate = 0;
        var labelSize = 8;
        var labelColor = '#000000';
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = 5;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        groupbar.data = function(_) {
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
                            return d !== 'x';
                        }).map(function(d) {
                    return {name: d, _flag: true};
                });
                source = _.map(function(d) {
                    var value = dimension.map(function(p) {
                        return {name: p.name, y: +d[p.name]};
                    });
                    return {x: d.x, value: value};
                });
                dimension.x = _.map(function(p) {
                    return p.x;
                });
                data = _;
                return this;
            } else
                return data;
        };

        groupbar.getType = function() {
            return type;
        };

        groupbar.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in groupbar.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('groupbar', true)
                    .node();
            /* 初始化变量 */

            var x0 = d3.scale.ordinal()
                    .rangeRoundBands([0, widthAvail], padding);
            var x1 = d3.scale.ordinal();

            var y = d3.scale.linear()
                    .range([heightAvail, 0]);

            x0.domain(dimension.x);

            x1.domain(dimension
                    .filter(function(d) {
                        return d._flag;
                    })
                    .map(function(d) {
                        return d.name;
                    }))
                    .rangeRoundBands([0, x0.rangeBand()]);
            y.domain([0, d3.max(source, function(d) {
                    return d3.max(d.value, function(p) {
                        return p.y;
                    });
                })]);

            var xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient('bottom')
                    .tickSize(xtickLineLength);

            var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);

            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    groupbar.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg)
                    .select('g');

            var dimensions = g.selectAll('.dimensions')
                    .selectAll('.dimension')
                    .data(source);

            dimensions.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            dimensionUpdate(dimensions, x0, x1, y);
            dimensionDraw(dimensions, x0, x1, y);

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);


            axis(g, xAxis, yAxis);
        };

        function dimensionUpdate(dimensions, x0, x1, y) {
            dimensions
                    .each(function(d) {
                        var rects = d3.select(this)
                                .selectAll('rect')
                                .data(function(p) {
                                    return p.value;
                                });

                        rects.exit()
                                .transition()
                                .duration(duration)
                                .style('opacity', 0)
                                .remove();

                        rects
                                .transition()
                                .duration(duration)
                                .attr('x', function(p) {
                                    return x1(p.name);
                                })
                                .style('fill', function(p) {
                                    return color(p.name);
                                })
                                .attr('y', function(p) {
                                    return y(p.y);
                                })
                                .attr('width', x1.rangeBand())
                                .attr('height', function(p) {
                                    return heightAvail - y(p.y);
                                });

                        rects.enter()
                                .append('svg:rect')
                                .attr('x', function(p) {
                                    return x1(p.name);
                                })
                                .attr({'height': 0,
                                    'y': y(0),
                                    'width': x1.rangeBand()})
                                .style('fill', function(p) {
                                    return color(p.name);
                                })
                                .on('mouseover', function(p) {
                                    drawLegend(p, true);
                                })
                                .on('mouseout', function(p) {
                                    drawLegend(p, false);
                                })
                                .transition()
                                .duration(duration)
                                .attr('y', function(p) {
                                    return y(p.y);
                                })
                                .attr('height', function(p) {
                                    return heightAvail - y(p.y);
                                });

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', function() {
                                    return 'translate(' + x0(d.x) + ',0)';
                                });
                    });
        }

        function dimensionDraw(dimensions, x0, x1, y) {
            dimensions.enter()
                    .append('svg:g')
                    .classed('dimension', true)
                    .each(function(d) {
                        d3.select(this)
                                .selectAll('rect')
                                .data(function(p) {
                                    return p.value;
                                })
                                .enter()
                                .append('svg:rect')
                                .attr('x', function(p) {
                                    return x1(p.name);
                                })
                                .attr({'height': 0,
                                    'y': y(0),
                                    'width': x1.rangeBand()})
                                .style('fill', function(p) {
                                    return color(p.name);
                                })
                                .on('mouseover', function(p) {
                                    drawLegend(p, true);
                                })
                                .on('mouseout', function(p) {
                                    drawLegend(p, false);
                                })
                                .transition()
                                .duration(duration)
                                .attr('y', function(p) {
                                    return y(p.y);
                                })
                                .attr('height', function(p) {
                                    return heightAvail - y(p.y);
                                });

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', function() {
                                    return 'translate(' + x0(d.x) + ',0)';
                                });
                    });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimension.length > 1) {
                                d3.select(this).classed('none', true);
                                d._flag = false;
                                source = data.map(function(d) {
                                    var value = dimension.filter(function(p) {
                                        return p._flag;
                                    }).map(function(p) {
                                        return {name: p.name, y: +d[p.name]};
                                    });
                                    return {x: d.x, value: value};
                                });
                                groupbar.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;
                            source = data.map(function(d) {
                                var value = dimension.filter(function(p) {
                                    return p._flag;
                                }).map(function(p) {
                                    return {name: p.name, y: +d[p.name]};
                                });
                                return {x: d.x, value: value};
                            });
                            groupbar.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'fill': legendColor,
                                    'font-size': legendSize,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});

                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function axis(g, xAxis, yAxis) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(xLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + heightAvail + ')')
                                .call(xAxis);
                    });

            g.select('.y-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis);
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
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength() *
                                        (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
                                + ')rotate(' + xtickRotate + ')';
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

        function drawLegend(d, style) {
            if (style) {
                floatTag.style({
                    'border-color': color(d.name),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                })
                        .html('name: ' + d.name + '<br/>value: ' + format(d.y));
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        groupbar.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in groupbar.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        groupbar.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in groupbar.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        groupbar.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in groupbar.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        groupbar.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        groupbar.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        groupbar.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in groupbar.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        groupbar.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        groupbar.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        groupbar.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        groupbar.yLegend = function(_) {
            if (!arguments.length)
                return yLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegend = arguments[0];
                    return this;
                }
            }
        };

        groupbar.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        groupbar.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        groupbar.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        groupbar.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        groupbar.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        groupbar.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        groupbar.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        groupbar.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        groupbar.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        groupbar.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        groupbar.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in groupbar.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        groupbar.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        groupbar.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in groupbar.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        groupbar.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        groupbar.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in groupbar.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        groupbar.options = function(_) {
            if (!arguments.length)
                return {
                    'type': groupbar.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'padding': padding,
                    'xLegend': xLegend,
                    'yLegend': yLegend,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'ytickNumber': ytickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'xtickLineLength': xtickLineLength,
                    'ytickLineLength': ytickLineLength,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && groupbar.tickFormat(_.format);
                _.fontFamily && groupbar.fontFamily(_.fontFamily);
                isFinite(_.duration) && groupbar.duration(_.duration);
                _.xLegend && groupbar.xLegend(_.xLegend);
                _.yLegend && groupbar.yLegend(_.yLegend);
                isFinite(_.xtickRotate) && groupbar.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && groupbar.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && groupbar.labelSize(_.labelSize);
                _.labelColor && groupbar.labelColor(_.labelColor);
                isFinite(_.padding) && groupbar.padding(_.padding);
                isFinite(_.ytickNumber) && groupbar.ytickNumber(_.ytickNumber);
                isFinite(_.tickTextSize) && groupbar.tickTextSize(_.tickTextSize);
                _.tickTextColor && groupbar.tickTextColor(_.tickTextColor);
                _.tickLineColor && groupbar.tickLineColor(_.tickLineColor);
                isFinite(_.xtickLineLength) && groupbar.xtickLineLength(_.xtickLineLength);
                isFinite(_.ytickLineLength) && groupbar.ytickLineLength(_.ytickLineLength);
                isFinite(_.axisPathWidth) && groupbar.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && groupbar.axisPathColor(_.axisPathColor);
                _.legendColor && groupbar.legendColor(_.legendColor);
                isFinite(_.legendSize) && groupbar.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && groupbar.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && groupbar.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            groupbar.options(arguments[0]);
        return groupbar;
    };
    /**
     * 热点图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.heat = function() {
        var heat = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '热点图'; //类型
        var width = 800; // 宽度
        var height = 400; // 高度
        var widthAvail = width - 150; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 40; //图形右移距离
        var tranY = 10; //图形下移距离
        var data; //数据
        var fontFamily = 'Arial'; // 字体样式
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = heat.color();

        /************局部变量***************/
        var padding = 0;
        var dimension;
        var gradientColor = ['white', 'steelblue'];

        /******坐标轴******/
        var yLegend = '';
        var xLegend = '';
        var xtickRotate = 0;
        var ytickRotate = 0;
        var labelSize = 8;
        var labelColor = '#000000';
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = 5;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        heat.data = function(_) {
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
                dimension = {};
                dimension.x = d3.set([]);
                dimension.y = d3.set([]);
                _.forEach(function(d) {
                    d.h = +d.h;
                    d._flag = true;
                    dimension.x.add(d.x);
                    dimension.y.add(d.y);
                });
                dimension.x = dimension.x.values();
                dimension.y = dimension.y.values();

                data = _;
                return this;
            } else
                return data;
        };

        heat.getType = function() {
            return type;
        };

        heat.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in heat.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('heat', true)
                    .node();
            /* 初始化变量 */

            var x = d3.scale.ordinal()
                    .rangeRoundBands([0, widthAvail], padding);
            var y = d3.scale.ordinal()
                    .rangeRoundBands([heightAvail, 0], padding);

            var h = d3.scale.linear()
                    .range([gradientColor[0], gradientColor[1]]);

            x.domain(dimension.x);
            y.domain(dimension.y);
            h.domain([0, d3.max(data, function(d) {
                    return d.h;
                })]);


            var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .tickSize(xtickLineLength);

            var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);

            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    heat.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg)
                    .select('g');

            var dimensions = g.selectAll('.dimensions')
                    .selectAll('.dimension')
                    .data(data.filter(function(d) {
                        return d._flag;
                    }));

            dimensions.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            dimensions
                    .transition()
                    .duration(duration)
                    .call(function(selection) {
                        var everywidth = x.rangeBand();
                        var everyheight = y.rangeBand();

                        selection
                                .attr('x', function(d) {
                                    return x(d.x);
                                })
                                .attr('y', function(d) {
                                    return y(d.y);
                                })
                                .style('fill', function(d) {
                                    return h(d.h);
                                })
                                .attr('width', everywidth)
                                .attr('height', everyheight);
                    });

            dimensions.enter()
                    .append('svg:rect')
                    .classed('dimension', true)
                    .on('mouseover', function(d) {
                        return drawLegend(d, true, h);
                    }).
                    on('mouseout', function(d) {
                        return drawLegend(d, false, h);
                    })
                    .call(function(selection) {
                        var everywidth = x.rangeBand();
                        var everyheight = y.rangeBand();

                        selection
                                .attr('x', function(d) {
                                    return x(d.x);
                                })
                                .attr('y', function(d) {
                                    return y(d.y);
                                })
                                .style('fill', function(d) {
                                    return h(d.h);
                                })
                                .transition()
                                .duration(duration)
                                .attr('width', everywidth)
                                .attr('height', everyheight);
                    });

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(h.ticks(6).slice(1).reverse());
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends, h);
            legendDraw(legends, h);


            axis(g, xAxis, yAxis);
        };

        function legendDraw(legends, h) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d, i) {
                        if (!d3.select(this).classed('none')) {
                            d3.select(this).
                                    classed('none', true)
                                    .select('rect')
                                    .transition()
                                    .duration(duration)
                                    .style('fill-opacity', 0);
                            var s = h.ticks(6).slice(1).reverse();
                            d3.select(svg)
                                    .select('.dimensions')
                                    .selectAll('.dimension')
                                    .each(function(p) {
                                        if ((i === s.length - 1 && p.h <= d)
                                                || (i === 0 && p.h > s[1])
                                                || (p.h <= d && p.h > s[i + 1]))
                                            d3.select(this)
                                                    .transition()
                                                    .duration(duration)
                                                    .style('fill-opacity', .2);
                                    });
                        } else {
                            d3.select(this)
                                    .classed('none', false)
                                    .select('rect')
                                    .transition()
                                    .duration(duration)
                                    .style('fill-opacity', 1);
                            var s = h.ticks(6).slice(1).reverse();
                            d3.select(svg)
                                    .select('.dimensions')
                                    .selectAll('.dimension')
                                    .each(function(p) {
                                        if ((i === s.length - 1 && p.h <= d)
                                                || (i === 0 && p.h > s[1])
                                                || (p.h <= d && p.h > s[i + 1]))
                                            d3.select(this)
                                                    .transition()
                                                    .duration(duration)
                                                    .style('fill-opacity', 1);
                                    });
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style('fill', h)
                                .style('stroke', h)
                                .style('fill-opacity', function() {
                                    return d3.select(this)
                                            .classed('none') ? 0 : 1;
                                })
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'fill': legendColor,
                                    'font-size': legendSize,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .text(String);
                    });
        }

        function legendUpdate(legends, h) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style('fill', h)
                        .style('stroke', h)
                        .style('fill-opacity', function() {
                            return d3.select(this)
                                    .classed('none') ? 0 : 1;
                        })
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});
                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(String);
            });
        }

        function axis(g, xAxis, yAxis) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .attr({'x': widthAvail,
                                    'y': -2})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': tickTextSize
                                })
                                .text(xLegend);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .attr({'x': widthAvail,
                                    'y': -2})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(xLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + heightAvail + ')')
                                .call(xAxis);
                    });

            g.select('.y-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis);
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
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength() *
                                        (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
                                + ')rotate(' + xtickRotate + ')';
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

        function drawLegend(d, style, h) {
            if (style) {
                floatTag.style({
                    'border-color': h(d.h),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                }).html('x: ' + d.x + '<br/>' + 'y: ' + d.y + '<br/>' + 'value: ' + d.h);
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        heat.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in heat.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        heat.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in heat.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        heat.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in heat.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        heat.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontFamily = arguments[0];
                    return this;
                }
            }
        };

        heat.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        heat.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in heat.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        heat.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        heat.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        heat.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        heat.yLegend = function(_) {
            if (!arguments.length)
                return yLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegend = arguments[0];
                    return this;
                }
            }
        };

        heat.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        heat.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        heat.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        heat.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        heat.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        heat.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        heat.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        heat.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        heat.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        heat.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        heat.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in heat.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        heat.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        heat.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in heat.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        heat.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        heat.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in heat.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        heat.gradientColor = function(_) {
            if (!arguments.length)
                return gradientColor;
            else if (arguments.length !== 2
                    || typeof arguments[0] !== 'string'
                    || typeof arguments[1] !== 'string') {
                console.error('The argument(element) in map.gradientColor(start, end) should be string and string of color');
                return this;
            }
            else {
                gradientColor[0] = arguments[0];
                gradientColor[1] = arguments[1];
                return this;
            }
        };

        heat.options = function(_) {
            if (!arguments.length)
                return {
                    'type': heat.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'padding': padding,
                    'gradientColor': gradientColor,
                    'xLegend': xLegend,
                    'yLegend': yLegend,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'ytickNumber': ytickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'xtickLineLength': xtickLineLength,
                    'ytickLineLength': ytickLineLength,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && heat.tickFormat(_.format);
                _.fontFamily && heat.fontFamily(_.fontFamily);
                isFinite(_.duration) && heat.duration(_.duration);
                typeof _.gradientColor === 'object'
                        && _.gradientColor.constructor === Array
                        && _.gradientColor.length === 2
                        && heat.gradientColor(_.gradientColor[0], _.gradientColor[1]);
                _.xLegend && heat.xLegend(_.xLegend);
                _.yLegend && heat.yLegend(_.yLegend);
                isFinite(_.xtickRotate) && heat.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && heat.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && heat.labelSize(_.labelSize);
                _.labelColor && heat.labelColor(_.labelColor);
                isFinite(_.padding) && heat.padding(_.padding);
                isFinite(_.ytickNumber) && heat.ytickNumber(_.ytickNumber);
                isFinite(_.tickTextSize) && heat.tickTextSize(_.tickTextSize);
                _.tickTextColor && heat.tickTextColor(_.tickTextColor);
                _.tickLineColor && heat.tickLineColor(_.tickLineColor);
                isFinite(_.xtickLineLength) && heat.xtickLineLength(_.xtickLineLength);
                isFinite(_.ytickLineLength) && heat.ytickLineLength(_.ytickLineLength);
                isFinite(_.axisPathWidth) && heat.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && heat.axisPathColor(_.axisPathColor);
                _.legendColor && heat.legendColor(_.legendColor);
                isFinite(_.legendSize) && heat.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && heat.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && heat.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            heat.options(arguments[0]);
        return heat;
    };
    /**
     * 地图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.map = function() {
        var map = pvisual.extend(); //主函數
        var d3 = _.d3; // d3

        /************全局变量***************/
        var type = 'Map'; //类型
        var width = 1000; // 宽度
        var height = 600; // 高度
        var widthAvail = width; // 实际利用宽度
        var heightAvail = height; // 实际利用高度
        var tranX = 0; //图形右移距离
        var tranY = 0; //图形下移距离
        var data; //数据
        var fontSize = 3; //字体大小
        var fontFamily = 'Arial'; // 字体样式
        var fontColor = '#000'; //颜色
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 500; // 变化时间
        var format = d3.format('s');
        var color = map.color(); // 颜色

        /************局部变量***************/
        var mapScale = 550;
        var extentValue = [0, 100];
        var gradientColor = ['white', 'green'];
        var cache = d3.map([]);
        var activeStateColor = function(d, i) {
            return 'orange';
        };
        var stateFillColor = function(d, i) {
            return '#DDDDDD';
        };
        var stateStrokeColor = function(d, i) {
            return '#FFFFFF';
        };
        var zh_map = {'type': 'FeatureCollection', 'features': [{'type': 'Feature', 'id': '65', 'properties': {'name': '新疆', 'cp': [84.9023, 41.748], 'childNum': 18}, 'geometry': {'type': 'Polygon', 'coordinates': [[[96.416, 42.7588], [96.416, 42.7148], [95.9766, 42.4951], [96.0645, 42.3193], [96.2402, 42.2314], [95.9766, 41.9238], [95.2734, 41.6162], [95.1855, 41.792], [94.5703, 41.4844], [94.043, 41.0889], [93.8672, 40.6934], [93.0762, 40.6494], [92.6367, 39.6387], [92.373, 39.3311], [92.373, 39.1113], [92.373, 39.0234], [90.1758, 38.4961], [90.3516, 38.2324], [90.6152, 38.3203], [90.5273, 37.8369], [91.0547, 37.4414], [91.3184, 37.0898], [90.7031, 36.7822], [90.791, 36.6064], [91.0547, 36.5186], [91.0547, 36.0791], [90.8789, 36.0352], [90, 36.2549], [89.9121, 36.0791], [89.7363, 36.0791], [89.209, 36.2988], [88.7695, 36.3428], [88.5938, 36.4746], [87.3633, 36.4307], [86.2207, 36.167], [86.1328, 35.8594], [85.6055, 35.6836], [85.0781, 35.7275], [84.1992, 35.376], [83.1445, 35.4199], [82.8809, 35.6836], [82.4414, 35.7275], [82.002, 35.332], [81.6504, 35.2441], [80.4199, 35.4199], [80.2441, 35.2881], [80.332, 35.1563], [80.2441, 35.2002], [79.8926, 34.8047], [79.8047, 34.4971], [79.1016, 34.4531], [79.0137, 34.3213], [78.2227, 34.7168], [78.0469, 35.2441], [78.0469, 35.5078], [77.4316, 35.4639], [76.8164, 35.6396], [76.5527, 35.8594], [76.2012, 35.8154], [75.9375, 36.0352], [76.0254, 36.4746], [75.8496, 36.6943], [75.498, 36.7383], [75.4102, 36.958], [75.0586, 37.002], [74.8828, 36.9141], [74.7949, 37.0459], [74.5313, 37.0898], [74.5313, 37.2217], [74.8828, 37.2217], [75.1465, 37.4414], [74.8828, 37.5732], [74.9707, 37.749], [74.8828, 38.4521], [74.3555, 38.6719], [74.1797, 38.6719], [74.0918, 38.54], [73.8281, 38.584], [73.7402, 38.8477], [73.8281, 38.9795], [73.4766, 39.375], [73.916, 39.5068], [73.916, 39.6826], [73.8281, 39.7705], [74.0039, 40.0342], [74.8828, 40.3418], [74.7949, 40.5176], [75.2344, 40.4297], [75.5859, 40.6494], [75.7617, 40.2979], [76.377, 40.3857], [76.9043, 41.001], [77.6074, 41.001], [78.1348, 41.2207], [78.1348, 41.3965], [80.1563, 42.0557], [80.2441, 42.2754], [80.1563, 42.627], [80.2441, 42.8467], [80.5078, 42.8906], [80.4199, 43.0664], [80.7715, 43.1982], [80.4199, 44.165], [80.4199, 44.6045], [79.9805, 44.8242], [79.9805, 44.9561], [81.7383, 45.3955], [82.0898, 45.2197], [82.5293, 45.2197], [82.2656, 45.6592], [83.0566, 47.2412], [83.6719, 47.0215], [84.7266, 47.0215], [84.9023, 46.8896], [85.5176, 47.0654], [85.6934, 47.2852], [85.5176, 48.1201], [85.7813, 48.4277], [86.5723, 48.5596], [86.8359, 48.8232], [86.748, 48.9551], [86.8359, 49.1309], [87.8027, 49.1748], [87.8906, 48.999], [87.7148, 48.9111], [88.0664, 48.7354], [87.9785, 48.6035], [88.5059, 48.3838], [88.6816, 48.1641], [89.1211, 47.9883], [89.5605, 48.0322], [89.7363, 47.8564], [90.0879, 47.8564], [90.3516, 47.6807], [90.5273, 47.2412], [90.8789, 46.9775], [91.0547, 46.582], [90.8789, 46.3184], [91.0547, 46.0107], [90.7031, 45.7471], [90.7031, 45.5273], [90.8789, 45.2197], [91.582, 45.0879], [93.5156, 44.9561], [94.7461, 44.3408], [95.3613, 44.2969], [95.3613, 44.0332], [95.5371, 43.9014], [95.8887, 43.2422], [96.3281, 42.9346], [96.416, 42.7588]]]}}, {'type': 'Feature', 'id': '54', 'properties': {'name': '西藏', 'cp': [88.7695, 31.6846], 'childNum': 7}, 'geometry': {'type': 'Polygon', 'coordinates': [[[79.0137, 34.3213], [79.1016, 34.4531], [79.8047, 34.4971], [79.8926, 34.8047], [80.2441, 35.2002], [80.332, 35.1563], [80.2441, 35.2881], [80.4199, 35.4199], [81.6504, 35.2441], [82.002, 35.332], [82.4414, 35.7275], [82.8809, 35.6836], [83.1445, 35.4199], [84.1992, 35.376], [85.0781, 35.7275], [85.6055, 35.6836], [86.1328, 35.8594], [86.2207, 36.167], [87.3633, 36.4307], [88.5938, 36.4746], [88.7695, 36.3428], [89.209, 36.2988], [89.7363, 36.0791], [89.3848, 36.0352], [89.4727, 35.9033], [89.7363, 35.7715], [89.7363, 35.4199], [89.4727, 35.376], [89.4727, 35.2441], [89.5605, 34.8926], [89.8242, 34.8486], [89.7363, 34.6729], [89.8242, 34.3652], [89.6484, 34.0137], [90.0879, 33.4863], [90.7031, 33.1348], [91.4063, 33.1348], [91.9336, 32.8271], [92.1973, 32.8271], [92.2852, 32.7393], [92.9883, 32.7393], [93.5156, 32.4756], [93.7793, 32.5635], [94.1309, 32.4316], [94.6582, 32.6074], [95.1855, 32.4316], [95.0098, 32.2998], [95.1855, 32.3438], [95.2734, 32.2119], [95.3613, 32.168], [95.3613, 31.9922], [95.4492, 31.8164], [95.8008, 31.6846], [95.9766, 31.8164], [96.1523, 31.5967], [96.2402, 31.9482], [96.5039, 31.7285], [96.8555, 31.6846], [96.7676, 31.9922], [97.2949, 32.0801], [97.3828, 32.5635], [97.7344, 32.5195], [98.1738, 32.3438], [98.4375, 31.8604], [98.877, 31.4209], [98.6133, 31.2012], [98.9648, 30.7617], [99.1406, 29.2676], [98.9648, 29.1357], [98.9648, 28.8281], [98.7891, 28.8721], [98.7891, 29.0039], [98.7012, 28.916], [98.6133, 28.5205], [98.7891, 28.3447], [98.7012, 28.2129], [98.3496, 28.125], [98.2617, 28.3887], [98.1738, 28.125], [97.5586, 28.5205], [97.2949, 28.0811], [97.3828, 27.9053], [97.0313, 27.7295], [96.5039, 28.125], [95.7129, 28.2568], [95.3613, 28.125], [95.2734, 27.9492], [94.2188, 27.5537], [93.8672, 27.0264], [93.6035, 26.9385], [92.1094, 26.8506], [92.0215, 27.4658], [91.582, 27.5537], [91.582, 27.9053], [91.4063, 28.0371], [91.0547, 27.8613], [90.7031, 28.0811], [89.8242, 28.2129], [89.6484, 28.1689], [89.1211, 27.5977], [89.1211, 27.334], [89.0332, 27.2021], [88.7695, 27.4219], [88.8574, 27.9932], [88.6816, 28.125], [88.1543, 27.9053], [87.8906, 27.9492], [87.7148, 27.8174], [87.0996, 27.8174], [86.748, 28.125], [86.5723, 28.125], [86.4844, 27.9053], [86.1328, 28.125], [86.0449, 27.9053], [85.6934, 28.3447], [85.6055, 28.2568], [85.166, 28.3447], [85.166, 28.6523], [84.9023, 28.5645], [84.4629, 28.7402], [84.2871, 28.8721], [84.1992, 29.2236], [84.1113, 29.2676], [83.584, 29.1797], [83.2324, 29.5752], [82.1777, 30.0586], [82.0898, 30.3223], [81.3867, 30.3662], [81.2109, 30.0146], [81.0352, 30.2344], [80.0684, 30.5859], [79.7168, 30.9375], [79.0137, 31.0693], [78.75, 31.333], [78.8379, 31.5967], [78.6621, 31.8164], [78.75, 31.9043], [78.4863, 32.124], [78.3984, 32.5195], [78.75, 32.6953], [78.9258, 32.3438], [79.2773, 32.5635], [79.1016, 33.1787], [78.6621, 33.6621], [78.6621, 34.1016], [78.9258, 34.1455], [79.0137, 34.3213]]]}}, {'type': 'Feature', 'id': '15', 'properties': {'name': '内蒙古', 'cp': [117.5977, 44.3408], 'childNum': 12}, 'geometry': {'type': 'Polygon', 'coordinates': [[[97.207, 42.8027], [99.4922, 42.583], [100.8105, 42.6709], [101.7773, 42.4951], [102.041, 42.2314], [102.7441, 42.1436], [103.3594, 41.8799], [103.8867, 41.792], [104.502, 41.8799], [104.502, 41.6602], [105.0293, 41.5723], [105.7324, 41.9238], [107.4023, 42.4512], [109.4238, 42.4512], [110.3906, 42.7588], [111.0059, 43.3301], [111.9727, 43.6816], [111.9727, 43.8135], [111.4453, 44.3848], [111.7969, 45], [111.9727, 45.0879], [113.6426, 44.7363], [114.1699, 44.9561], [114.5215, 45.3955], [115.6641, 45.4395], [116.1914, 45.7031], [116.2793, 45.9668], [116.543, 46.2744], [117.334, 46.3623], [117.4219, 46.582], [117.7734, 46.5381], [118.3008, 46.7578], [118.7402, 46.7139], [118.916, 46.7578], [119.0918, 46.6699], [119.707, 46.626], [119.9707, 46.7139], [119.707, 47.1973], [118.4766, 47.9883], [117.8613, 48.0322], [117.334, 47.6807], [116.8066, 47.9004], [116.1914, 47.8564], [115.9277, 47.6807], [115.5762, 47.9004], [115.4883, 48.1641], [115.8398, 48.252], [115.8398, 48.5596], [116.7188, 49.834], [117.7734, 49.5264], [118.5645, 49.9219], [119.2676, 50.0977], [119.3555, 50.3174], [119.1797, 50.3613], [119.5313, 50.7568], [119.5313, 50.8887], [119.707, 51.0645], [120.1465, 51.6797], [120.6738, 51.9434], [120.7617, 52.1191], [120.7617, 52.251], [120.5859, 52.3389], [120.6738, 52.5146], [120.4102, 52.6465], [120.0586, 52.6025], [120.0586, 52.7344], [120.8496, 53.2617], [121.4648, 53.3496], [121.8164, 53.042], [121.2012, 52.5586], [121.6406, 52.4268], [121.7285, 52.2949], [121.9922, 52.2949], [122.168, 52.5146], [122.6953, 52.251], [122.6074, 52.0752], [122.959, 51.3281], [123.3105, 51.2402], [123.6621, 51.3721], [124.3652, 51.2842], [124.541, 51.3721], [124.8926, 51.3721], [125.0684, 51.6357], [125.332, 51.6357], [126.0352, 51.0205], [125.7715, 50.7568], [125.7715, 50.5371], [125.332, 50.1416], [125.1563, 49.834], [125.2441, 49.1748], [124.8047, 49.1309], [124.4531, 48.1201], [124.2773, 48.5156], [122.4316, 47.373], [123.0469, 46.7139], [123.3984, 46.8896], [123.3984, 46.9775], [123.4863, 46.9775], [123.5742, 46.8457], [123.5742, 46.8896], [123.5742, 46.6699], [123.0469, 46.582], [123.2227, 46.2305], [122.7832, 46.0107], [122.6953, 45.7031], [122.4316, 45.8789], [122.2559, 45.791], [121.8164, 46.0107], [121.7285, 45.7471], [121.9043, 45.7031], [122.2559, 45.2637], [122.0801, 44.8682], [122.3438, 44.2529], [123.1348, 44.4727], [123.4863, 43.7256], [123.3105, 43.5059], [123.6621, 43.374], [123.5742, 43.0225], [123.3105, 42.9785], [123.1348, 42.8027], [122.7832, 42.7148], [122.3438, 42.8467], [122.3438, 42.6709], [121.9922, 42.7148], [121.7285, 42.4512], [121.4648, 42.4951], [120.498, 42.0996], [120.1465, 41.7041], [119.8828, 42.1875], [119.5313, 42.3633], [119.3555, 42.2754], [119.2676, 41.7041], [119.4434, 41.6162], [119.2676, 41.3086], [118.3887, 41.3086], [118.125, 41.748], [118.3008, 41.792], [118.3008, 42.0996], [118.125, 42.0557], [117.9492, 42.2314], [118.0371, 42.4072], [117.7734, 42.627], [117.5098, 42.583], [117.334, 42.4512], [116.8945, 42.4072], [116.8066, 42.0117], [116.2793, 42.0117], [116.0156, 41.792], [115.9277, 41.9238], [115.2246, 41.5723], [114.9609, 41.6162], [114.873, 42.0996], [114.5215, 42.1436], [114.1699, 41.792], [114.2578, 41.5723], [113.9063, 41.4404], [113.9941, 41.2207], [113.9063, 41.1328], [114.082, 40.7373], [114.082, 40.5176], [113.8184, 40.5176], [113.5547, 40.3418], [113.2031, 40.3857], [112.7637, 40.166], [112.3242, 40.2539], [111.9727, 39.5947], [111.4453, 39.6387], [111.3574, 39.4189], [111.0938, 39.375], [111.0938, 39.5947], [110.6543, 39.2871], [110.127, 39.4629], [110.2148, 39.2871], [109.8633, 39.2432], [109.9512, 39.1553], [108.9844, 38.3203], [109.0723, 38.0127], [108.8965, 37.9688], [108.8086, 38.0127], [108.7207, 37.7051], [108.1934, 37.6172], [107.666, 37.8809], [107.3145, 38.1006], [106.7871, 38.1885], [106.5234, 38.3203], [106.9629, 38.9795], [106.7871, 39.375], [106.3477, 39.2871], [105.9082, 38.7158], [105.8203, 37.793], [104.3262, 37.4414], [103.4473, 37.8369], [103.3594, 38.0127], [103.5352, 38.1445], [103.4473, 38.3643], [104.2383, 38.9795], [104.0625, 39.4189], [103.3594, 39.3311], [103.0078, 39.1113], [102.4805, 39.2432], [101.8652, 39.1113], [102.041, 38.8916], [101.7773, 38.6719], [101.3379, 38.7598], [101.25, 39.0234], [100.9863, 38.9355], [100.8105, 39.4189], [100.5469, 39.4189], [100.0195, 39.7705], [99.4922, 39.8584], [100.1074, 40.2539], [100.1953, 40.6494], [99.9316, 41.001], [99.2285, 40.8691], [99.0527, 40.6934], [98.9648, 40.7813], [98.7891, 40.6055], [98.5254, 40.7373], [98.6133, 40.6494], [98.3496, 40.5615], [98.3496, 40.9131], [97.4707, 41.4844], [97.8223, 41.6162], [97.8223, 41.748], [97.207, 42.8027]]]}}, {'type': 'Feature', 'id': '63', 'properties': {'name': '青海', 'cp': [96.2402, 35.4199], 'childNum': 8}, 'geometry': {'type': 'Polygon', 'coordinates': [[[89.7363, 36.0791], [89.9121, 36.0791], [90, 36.2549], [90.8789, 36.0352], [91.0547, 36.0791], [91.0547, 36.5186], [90.791, 36.6064], [90.7031, 36.7822], [91.3184, 37.0898], [91.0547, 37.4414], [90.5273, 37.8369], [90.6152, 38.3203], [90.3516, 38.2324], [90.1758, 38.4961], [92.373, 39.0234], [92.373, 39.1113], [93.1641, 39.1992], [93.1641, 38.9795], [93.6914, 38.9355], [93.8672, 38.7158], [94.3066, 38.7598], [94.5703, 38.3643], [95.0098, 38.4082], [95.4492, 38.2764], [95.7129, 38.3643], [96.2402, 38.1006], [96.416, 38.2324], [96.6797, 38.1885], [96.6797, 38.4521], [97.1191, 38.584], [97.0313, 39.1992], [98.1738, 38.8037], [98.3496, 39.0234], [98.6133, 38.9355], [98.7891, 39.0674], [99.1406, 38.9355], [99.8438, 38.3643], [100.1953, 38.2764], [100.0195, 38.4521], [100.1074, 38.4961], [100.459, 38.2764], [100.7227, 38.2324], [101.1621, 37.8369], [101.5137, 37.8809], [101.7773, 37.6172], [101.9531, 37.7051], [102.1289, 37.4414], [102.5684, 37.1777], [102.4805, 36.958], [102.6563, 36.8262], [102.5684, 36.7383], [102.832, 36.3428], [103.0078, 36.2549], [102.9199, 36.0791], [102.9199, 35.9033], [102.6563, 35.7715], [102.832, 35.5957], [102.4805, 35.5957], [102.3047, 35.4199], [102.3926, 35.2002], [101.9531, 34.8486], [101.9531, 34.6289], [102.2168, 34.4092], [102.1289, 34.2773], [101.6895, 34.1016], [100.9863, 34.3652], [100.8105, 34.2773], [101.25, 33.6621], [101.5137, 33.7061], [101.6016, 33.5303], [101.7773, 33.5303], [101.6895, 33.3105], [101.7773, 33.2227], [101.6016, 33.1348], [101.1621, 33.2227], [101.25, 32.6953], [100.7227, 32.6514], [100.7227, 32.5195], [100.3711, 32.7393], [100.1074, 32.6514], [100.1074, 32.8711], [99.8438, 33.0029], [99.7559, 32.7393], [99.2285, 32.915], [99.2285, 33.0469], [98.877, 33.1787], [98.4375, 34.0576], [97.8223, 34.1895], [97.6465, 34.1016], [97.7344, 33.9258], [97.3828, 33.8818], [97.4707, 33.5742], [97.7344, 33.3984], [97.3828, 32.8711], [97.4707, 32.6953], [97.7344, 32.5195], [97.3828, 32.5635], [97.2949, 32.0801], [96.7676, 31.9922], [96.8555, 31.6846], [96.5039, 31.7285], [96.2402, 31.9482], [96.1523, 31.5967], [95.9766, 31.8164], [95.8008, 31.6846], [95.4492, 31.8164], [95.3613, 31.9922], [95.3613, 32.168], [95.2734, 32.2119], [95.1855, 32.3438], [95.0098, 32.2998], [95.1855, 32.4316], [94.6582, 32.6074], [94.1309, 32.4316], [93.7793, 32.5635], [93.5156, 32.4756], [92.9883, 32.7393], [92.2852, 32.7393], [92.1973, 32.8271], [91.9336, 32.8271], [91.4063, 33.1348], [90.7031, 33.1348], [90.0879, 33.4863], [89.6484, 34.0137], [89.8242, 34.3652], [89.7363, 34.6729], [89.8242, 34.8486], [89.5605, 34.8926], [89.4727, 35.2441], [89.4727, 35.376], [89.7363, 35.4199], [89.7363, 35.7715], [89.4727, 35.9033], [89.3848, 36.0352], [89.7363, 36.0791]]]}}, {'type': 'Feature', 'id': '51', 'properties': {'name': '四川', 'cp': [102.9199, 30.1904], 'childNum': 21}, 'geometry': {'type': 'Polygon', 'coordinates': [[[101.7773, 33.5303], [101.8652, 33.5742], [101.9531, 33.4424], [101.8652, 33.0908], [102.4805, 33.4424], [102.2168, 33.9258], [102.9199, 34.3213], [103.0957, 34.1895], [103.1836, 33.7939], [104.1504, 33.6182], [104.2383, 33.3984], [104.4141, 33.3105], [104.3262, 33.2227], [104.4141, 33.0469], [104.3262, 32.8711], [104.4141, 32.7393], [105.2051, 32.6074], [105.3809, 32.7393], [105.3809, 32.8711], [105.4688, 32.915], [105.5566, 32.7393], [106.084, 32.8711], [106.084, 32.7393], [106.3477, 32.6514], [107.0508, 32.6953], [107.1387, 32.4756], [107.2266, 32.4316], [107.4023, 32.5195], [108.0176, 32.168], [108.2813, 32.2559], [108.5449, 32.2119], [108.3691, 32.168], [108.2813, 31.9043], [108.5449, 31.6846], [108.1934, 31.5088], [107.9297, 30.8496], [107.4902, 30.8496], [107.4023, 30.7617], [107.4902, 30.6299], [107.0508, 30.0146], [106.7871, 30.0146], [106.6113, 30.3223], [106.2598, 30.1904], [105.8203, 30.4541], [105.6445, 30.2783], [105.5566, 30.1025], [105.7324, 29.8828], [105.293, 29.5313], [105.4688, 29.3115], [105.7324, 29.2676], [105.8203, 28.96], [106.2598, 28.8721], [106.3477, 28.5205], [105.9961, 28.7402], [105.6445, 28.4326], [105.9082, 28.125], [106.1719, 28.125], [106.3477, 27.8174], [105.6445, 27.6416], [105.5566, 27.7734], [105.293, 27.7295], [105.2051, 27.9932], [105.0293, 28.0811], [104.8535, 27.9053], [104.4141, 27.9492], [104.3262, 28.0371], [104.4141, 28.125], [104.4141, 28.2568], [104.2383, 28.4326], [104.4141, 28.6084], [103.8867, 28.6523], [103.7988, 28.3008], [103.4473, 28.125], [103.4473, 27.7734], [102.9199, 27.29], [103.0078, 26.3672], [102.6563, 26.1914], [102.5684, 26.3672], [102.1289, 26.1035], [101.8652, 26.0596], [101.6016, 26.2354], [101.6895, 26.3672], [101.4258, 26.5869], [101.4258, 26.8066], [101.4258, 26.7188], [101.1621, 27.0264], [101.1621, 27.1582], [100.7227, 27.8613], [100.3711, 27.8174], [100.2832, 27.7295], [100.0195, 28.125], [100.1953, 28.3447], [99.668, 28.8281], [99.4043, 28.5205], [99.4043, 28.1689], [99.2285, 28.3008], [99.1406, 29.2676], [98.9648, 30.7617], [98.6133, 31.2012], [98.877, 31.4209], [98.4375, 31.8604], [98.1738, 32.3438], [97.7344, 32.5195], [97.4707, 32.6953], [97.3828, 32.8711], [97.7344, 33.3984], [97.4707, 33.5742], [97.3828, 33.8818], [97.7344, 33.9258], [97.6465, 34.1016], [97.8223, 34.1895], [98.4375, 34.0576], [98.877, 33.1787], [99.2285, 33.0469], [99.2285, 32.915], [99.7559, 32.7393], [99.8438, 33.0029], [100.1074, 32.8711], [100.1074, 32.6514], [100.3711, 32.7393], [100.7227, 32.5195], [100.7227, 32.6514], [101.25, 32.6953], [101.1621, 33.2227], [101.6016, 33.1348], [101.7773, 33.2227], [101.6895, 33.3105], [101.7773, 33.5303]]]}}, {'type': 'Feature', 'id': '23', 'properties': {'name': '黑龙江', 'cp': [128.1445, 48.5156], 'childNum': 13}, 'geometry': {'type': 'Polygon', 'coordinates': [[[121.4648, 53.3496], [123.6621, 53.5693], [124.8926, 53.0859], [125.0684, 53.2178], [125.5957, 53.0859], [125.6836, 52.9102], [126.123, 52.7783], [126.0352, 52.6025], [126.2109, 52.5146], [126.3867, 52.2949], [126.3867, 52.207], [126.5625, 52.1631], [126.4746, 51.9434], [126.9141, 51.3721], [126.8262, 51.2842], [127.002, 51.3281], [126.9141, 51.1084], [127.2656, 50.7568], [127.3535, 50.2734], [127.6172, 50.2295], [127.5293, 49.8779], [127.793, 49.6143], [128.7598, 49.5703], [129.1113, 49.3506], [129.4629, 49.4385], [130.2539, 48.8672], [130.6934, 48.8672], [130.5176, 48.6475], [130.8691, 48.2959], [130.6934, 48.1201], [131.0449, 47.6807], [132.5391, 47.7246], [132.627, 47.9443], [133.0664, 48.1201], [133.5059, 48.1201], [134.209, 48.3838], [135.0879, 48.4277], [134.7363, 48.252], [134.5605, 47.9883], [134.7363, 47.6807], [134.5605, 47.4609], [134.3848, 47.4609], [134.209, 47.2852], [134.209, 47.1533], [133.8574, 46.5381], [133.9453, 46.2744], [133.5059, 45.835], [133.418, 45.5713], [133.2422, 45.5273], [133.0664, 45.1318], [132.8906, 45.0439], [131.9238, 45.3516], [131.5723, 45.0439], [131.0449, 44.8682], [131.3086, 44.0771], [131.2207, 43.7256], [131.3086, 43.4619], [130.8691, 43.418], [130.5176, 43.6377], [130.3418, 43.9893], [129.9902, 43.8574], [129.9023, 44.0332], [129.8145, 43.9014], [129.2871, 43.8135], [129.1992, 43.5938], [128.8477, 43.5498], [128.4961, 44.165], [128.4082, 44.4727], [128.0566, 44.3408], [128.0566, 44.1211], [127.7051, 44.1211], [127.5293, 44.6045], [127.0898, 44.6045], [127.002, 44.7803], [127.0898, 45], [126.9141, 45.1318], [126.5625, 45.2637], [126.0352, 45.1758], [125.7715, 45.3076], [125.6836, 45.5273], [125.0684, 45.3955], [124.8926, 45.5273], [124.3652, 45.4395], [124.0137, 45.7471], [123.9258, 46.2305], [123.2227, 46.2305], [123.0469, 46.582], [123.5742, 46.6699], [123.5742, 46.8896], [123.5742, 46.8457], [123.4863, 46.9775], [123.3984, 46.9775], [123.3984, 46.8896], [123.0469, 46.7139], [122.4316, 47.373], [124.2773, 48.5156], [124.4531, 48.1201], [124.8047, 49.1309], [125.2441, 49.1748], [125.1563, 49.834], [125.332, 50.1416], [125.7715, 50.5371], [125.7715, 50.7568], [126.0352, 51.0205], [125.332, 51.6357], [125.0684, 51.6357], [124.8926, 51.3721], [124.541, 51.3721], [124.3652, 51.2842], [123.6621, 51.3721], [123.3105, 51.2402], [122.959, 51.3281], [122.6074, 52.0752], [122.6953, 52.251], [122.168, 52.5146], [121.9922, 52.2949], [121.7285, 52.2949], [121.6406, 52.4268], [121.2012, 52.5586], [121.8164, 53.042], [121.4648, 53.3496]]]}}, {'type': 'Feature', 'id': '62', 'properties': {'name': '甘肃', 'cp': [95.7129, 40.166], 'childNum': 14}, 'geometry': {'type': 'Polygon', 'coordinates': [[[96.416, 42.7148], [97.207, 42.8027], [97.8223, 41.748], [97.8223, 41.6162], [97.4707, 41.4844], [98.3496, 40.9131], [98.3496, 40.5615], [98.6133, 40.6494], [98.5254, 40.7373], [98.7891, 40.6055], [98.9648, 40.7813], [99.0527, 40.6934], [99.2285, 40.8691], [99.9316, 41.001], [100.1953, 40.6494], [100.1074, 40.2539], [99.4922, 39.8584], [100.0195, 39.7705], [100.5469, 39.4189], [100.8105, 39.4189], [100.9863, 38.9355], [101.25, 39.0234], [101.3379, 38.7598], [101.7773, 38.6719], [102.041, 38.8916], [101.8652, 39.1113], [102.4805, 39.2432], [103.0078, 39.1113], [103.3594, 39.3311], [104.0625, 39.4189], [104.2383, 38.9795], [103.4473, 38.3643], [103.5352, 38.1445], [103.3594, 38.0127], [103.4473, 37.8369], [104.3262, 37.4414], [104.5898, 37.4414], [104.5898, 37.2217], [104.8535, 37.2217], [105.293, 36.8262], [105.2051, 36.6943], [105.4688, 36.123], [105.293, 35.9912], [105.3809, 35.7715], [105.7324, 35.7275], [105.8203, 35.5518], [105.9961, 35.4639], [105.9082, 35.4199], [105.9961, 35.4199], [106.084, 35.376], [106.2598, 35.4199], [106.3477, 35.2441], [106.5234, 35.332], [106.4355, 35.6836], [106.6992, 35.6836], [106.9629, 35.8154], [106.875, 36.123], [106.5234, 36.2549], [106.5234, 36.4746], [106.4355, 36.5625], [106.6113, 36.7822], [106.6113, 37.0898], [107.3145, 37.0898], [107.3145, 36.9141], [108.7207, 36.3428], [108.6328, 35.9912], [108.5449, 35.8594], [108.6328, 35.5518], [108.5449, 35.2881], [107.7539, 35.2881], [107.7539, 35.1123], [107.8418, 35.0244], [107.666, 34.9365], [107.2266, 34.8926], [106.9629, 35.0684], [106.6113, 35.0684], [106.5234, 34.7607], [106.3477, 34.585], [106.6992, 34.3213], [106.5234, 34.2773], [106.6113, 34.1455], [106.4355, 33.9258], [106.5234, 33.5303], [105.9961, 33.6182], [105.7324, 33.3984], [105.9961, 33.1787], [105.9082, 33.0029], [105.4688, 32.915], [105.3809, 32.8711], [105.3809, 32.7393], [105.2051, 32.6074], [104.4141, 32.7393], [104.3262, 32.8711], [104.4141, 33.0469], [104.3262, 33.2227], [104.4141, 33.3105], [104.2383, 33.3984], [104.1504, 33.6182], [103.1836, 33.7939], [103.0957, 34.1895], [102.9199, 34.3213], [102.2168, 33.9258], [102.4805, 33.4424], [101.8652, 33.0908], [101.9531, 33.4424], [101.8652, 33.5742], [101.7773, 33.5303], [101.6016, 33.5303], [101.5137, 33.7061], [101.25, 33.6621], [100.8105, 34.2773], [100.9863, 34.3652], [101.6895, 34.1016], [102.1289, 34.2773], [102.2168, 34.4092], [101.9531, 34.6289], [101.9531, 34.8486], [102.3926, 35.2002], [102.3047, 35.4199], [102.4805, 35.5957], [102.832, 35.5957], [102.6563, 35.7715], [102.9199, 35.9033], [102.9199, 36.0791], [103.0078, 36.2549], [102.832, 36.3428], [102.5684, 36.7383], [102.6563, 36.8262], [102.4805, 36.958], [102.5684, 37.1777], [102.1289, 37.4414], [101.9531, 37.7051], [101.7773, 37.6172], [101.5137, 37.8809], [101.1621, 37.8369], [100.7227, 38.2324], [100.459, 38.2764], [100.1074, 38.4961], [100.0195, 38.4521], [100.1953, 38.2764], [99.8438, 38.3643], [99.1406, 38.9355], [98.7891, 39.0674], [98.6133, 38.9355], [98.3496, 39.0234], [98.1738, 38.8037], [97.0313, 39.1992], [97.1191, 38.584], [96.6797, 38.4521], [96.6797, 38.1885], [96.416, 38.2324], [96.2402, 38.1006], [95.7129, 38.3643], [95.4492, 38.2764], [95.0098, 38.4082], [94.5703, 38.3643], [94.3066, 38.7598], [93.8672, 38.7158], [93.6914, 38.9355], [93.1641, 38.9795], [93.1641, 39.1992], [92.373, 39.1113], [92.373, 39.3311], [92.6367, 39.6387], [93.0762, 40.6494], [93.8672, 40.6934], [94.043, 41.0889], [94.5703, 41.4844], [95.1855, 41.792], [95.2734, 41.6162], [95.9766, 41.9238], [96.2402, 42.2314], [96.0645, 42.3193], [95.9766, 42.4951], [96.416, 42.7148]]]}}, {'type': 'Feature', 'id': '53', 'properties': {'name': '云南', 'cp': [101.8652, 25.1807], 'childNum': 16}, 'geometry': {'type': 'Polygon', 'coordinates': [[[98.1738, 28.125], [98.2617, 28.3887], [98.3496, 28.125], [98.7012, 28.2129], [98.7891, 28.3447], [98.6133, 28.5205], [98.7012, 28.916], [98.7891, 29.0039], [98.7891, 28.8721], [98.9648, 28.8281], [98.9648, 29.1357], [99.1406, 29.2676], [99.2285, 28.3008], [99.4043, 28.1689], [99.4043, 28.5205], [99.668, 28.8281], [100.1953, 28.3447], [100.0195, 28.125], [100.2832, 27.7295], [100.3711, 27.8174], [100.7227, 27.8613], [101.1621, 27.1582], [101.1621, 27.0264], [101.4258, 26.7188], [101.4258, 26.8066], [101.4258, 26.5869], [101.6895, 26.3672], [101.6016, 26.2354], [101.8652, 26.0596], [102.1289, 26.1035], [102.5684, 26.3672], [102.6563, 26.1914], [103.0078, 26.3672], [102.9199, 27.29], [103.4473, 27.7734], [103.4473, 28.125], [103.7988, 28.3008], [103.8867, 28.6523], [104.4141, 28.6084], [104.2383, 28.4326], [104.4141, 28.2568], [104.4141, 28.125], [104.3262, 28.0371], [104.4141, 27.9492], [104.8535, 27.9053], [105.0293, 28.0811], [105.2051, 27.9932], [105.293, 27.7295], [105.2051, 27.3779], [104.5898, 27.334], [104.4141, 27.4658], [104.1504, 27.2461], [103.8867, 27.4219], [103.623, 27.0264], [103.7109, 26.9824], [103.7109, 26.7627], [103.8867, 26.543], [104.4141, 26.6748], [104.6777, 26.4111], [104.3262, 25.708], [104.8535, 25.2246], [104.5898, 25.0488], [104.6777, 24.9609], [104.502, 24.7412], [104.6777, 24.3457], [104.7656, 24.4775], [105.0293, 24.4336], [105.2051, 24.082], [105.4688, 24.0381], [105.5566, 24.126], [105.9961, 24.126], [106.1719, 23.8184], [106.1719, 23.5547], [105.6445, 23.4229], [105.5566, 23.2031], [105.293, 23.3789], [104.8535, 23.1592], [104.7656, 22.8516], [104.3262, 22.6758], [104.1504, 22.8076], [103.9746, 22.5439], [103.623, 22.7637], [103.5352, 22.5879], [103.3594, 22.8076], [103.0957, 22.4561], [102.4805, 22.7637], [102.3047, 22.4121], [101.8652, 22.3682], [101.7773, 22.5], [101.6016, 22.1924], [101.8652, 21.6211], [101.7773, 21.1377], [101.6016, 21.2256], [101.25, 21.1816], [101.1621, 21.7529], [100.6348, 21.4453], [100.1074, 21.4893], [99.9316, 22.0605], [99.2285, 22.1484], [99.4043, 22.5879], [99.3164, 22.7197], [99.4922, 23.0713], [98.877, 23.2031], [98.7012, 23.9502], [98.877, 24.126], [98.1738, 24.082], [97.7344, 23.8623], [97.5586, 23.9063], [97.7344, 24.126], [97.6465, 24.4336], [97.5586, 24.4336], [97.5586, 24.7412], [97.7344, 24.8291], [97.8223, 25.2686], [98.1738, 25.4004], [98.1738, 25.6201], [98.3496, 25.5762], [98.5254, 25.8398], [98.7012, 25.8838], [98.6133, 26.0596], [98.7012, 26.1475], [98.7891, 26.5869], [98.7012, 27.5098], [98.5254, 27.6416], [98.3496, 27.5098], [98.1738, 28.125]]]}}, {'type': 'Feature', 'id': '45', 'properties': {'name': '广西', 'cp': [108.2813, 23.6426], 'childNum': 14}, 'geometry': {'type': 'Polygon', 'coordinates': [[[104.502, 24.7412], [104.6777, 24.6094], [105.2051, 24.9609], [105.9961, 24.6533], [106.1719, 24.7852], [106.1719, 24.9609], [106.875, 25.1807], [107.0508, 25.2686], [106.9629, 25.4883], [107.2266, 25.6201], [107.4902, 25.2246], [107.7539, 25.2246], [107.8418, 25.1367], [108.1055, 25.2246], [108.1934, 25.4443], [108.3691, 25.5322], [108.6328, 25.3125], [108.6328, 25.5762], [109.0723, 25.5322], [108.9844, 25.752], [109.3359, 25.708], [109.5117, 26.0156], [109.7754, 25.8838], [109.9512, 26.1914], [110.2148, 25.9717], [110.5664, 26.3232], [111.1816, 26.3232], [111.2695, 26.2354], [111.2695, 25.8838], [111.4453, 25.8398], [111.0059, 25.0049], [111.0938, 24.9609], [111.3574, 25.1367], [111.5332, 24.6533], [111.709, 24.7852], [112.0605, 24.7412], [111.8848, 24.6533], [112.0605, 24.3457], [111.8848, 24.2139], [111.8848, 23.9941], [111.7969, 23.8184], [111.6211, 23.8184], [111.6211, 23.6865], [111.3574, 23.4668], [111.4453, 23.0273], [111.2695, 22.8076], [110.7422, 22.5439], [110.7422, 22.2803], [110.6543, 22.1484], [110.3027, 22.1484], [110.3027, 21.8848], [109.9512, 21.8408], [109.8633, 21.665], [109.7754, 21.6211], [109.7754, 21.4014], [109.5996, 21.4453], [109.1602, 21.3574], [109.248, 20.874], [109.0723, 20.9619], [109.0723, 21.5332], [108.7207, 21.5332], [108.6328, 21.665], [108.2813, 21.4893], [107.8418, 21.6211], [107.4023, 21.6211], [107.0508, 21.7969], [107.0508, 21.9287], [106.6992, 22.0166], [106.6113, 22.4121], [106.7871, 22.7637], [106.6992, 22.8955], [105.9082, 22.9395], [105.5566, 23.0713], [105.5566, 23.2031], [105.6445, 23.4229], [106.1719, 23.5547], [106.1719, 23.8184], [105.9961, 24.126], [105.5566, 24.126], [105.4688, 24.0381], [105.2051, 24.082], [105.0293, 24.4336], [104.7656, 24.4775], [104.6777, 24.3457], [104.502, 24.7412]]]}}, {'type': 'Feature', 'id': '43', 'properties': {'name': '湖南', 'cp': [111.5332, 27.3779], 'childNum': 14}, 'geometry': {'type': 'Polygon', 'coordinates': [[[109.248, 28.4766], [109.248, 29.1357], [109.5117, 29.6191], [109.6875, 29.6191], [109.7754, 29.751], [110.4785, 29.6631], [110.6543, 29.751], [110.4785, 30.0146], [110.8301, 30.1465], [111.7969, 29.9268], [112.2363, 29.5313], [112.5, 29.6191], [112.6758, 29.5752], [112.9395, 29.7949], [113.0273, 29.751], [112.9395, 29.4873], [113.0273, 29.4434], [113.5547, 29.8389], [113.5547, 29.707], [113.7305, 29.5752], [113.6426, 29.3115], [113.7305, 29.0918], [113.9063, 29.0479], [114.1699, 28.8281], [114.082, 28.5645], [114.2578, 28.3447], [113.7305, 27.9492], [113.6426, 27.5977], [113.6426, 27.3779], [113.8184, 27.29], [113.7305, 27.1143], [113.9063, 26.9385], [113.9063, 26.6309], [114.082, 26.5869], [113.9941, 26.1914], [114.2578, 26.1475], [113.9941, 26.0596], [113.9063, 25.4443], [113.6426, 25.3125], [113.2031, 25.5322], [112.8516, 25.3564], [113.0273, 25.2246], [113.0273, 24.9609], [112.8516, 24.917], [112.5879, 25.1367], [112.2363, 25.1807], [112.1484, 24.873], [112.0605, 24.7412], [111.709, 24.7852], [111.5332, 24.6533], [111.3574, 25.1367], [111.0938, 24.9609], [111.0059, 25.0049], [111.4453, 25.8398], [111.2695, 25.8838], [111.2695, 26.2354], [111.1816, 26.3232], [110.5664, 26.3232], [110.2148, 25.9717], [109.9512, 26.1914], [109.7754, 25.8838], [109.5117, 26.0156], [109.4238, 26.2793], [109.248, 26.3232], [109.4238, 26.5869], [109.3359, 26.7188], [109.5117, 26.8066], [109.5117, 27.0264], [109.3359, 27.1582], [108.8965, 27.0264], [108.8086, 27.1143], [109.4238, 27.5977], [109.3359, 27.9053], [109.3359, 28.2568], [109.248, 28.4766]]]}}, {'type': 'Feature', 'id': '61', 'properties': {'name': '陕西', 'cp': [109.5996, 35.6396], 'childNum': 10}, 'geometry': {'type': 'Polygon', 'coordinates': [[[105.4688, 32.915], [105.9082, 33.0029], [105.9961, 33.1787], [105.7324, 33.3984], [105.9961, 33.6182], [106.5234, 33.5303], [106.4355, 33.9258], [106.6113, 34.1455], [106.5234, 34.2773], [106.6992, 34.3213], [106.3477, 34.585], [106.5234, 34.7607], [106.6113, 35.0684], [106.9629, 35.0684], [107.2266, 34.8926], [107.666, 34.9365], [107.8418, 35.0244], [107.7539, 35.1123], [107.7539, 35.2881], [108.5449, 35.2881], [108.6328, 35.5518], [108.5449, 35.8594], [108.6328, 35.9912], [108.7207, 36.3428], [107.3145, 36.9141], [107.3145, 37.0898], [107.3145, 37.6172], [107.666, 37.8809], [108.1934, 37.6172], [108.7207, 37.7051], [108.8086, 38.0127], [108.8965, 37.9688], [109.0723, 38.0127], [108.9844, 38.3203], [109.9512, 39.1553], [109.8633, 39.2432], [110.2148, 39.2871], [110.127, 39.4629], [110.6543, 39.2871], [111.0938, 39.5947], [111.0938, 39.375], [111.1816, 39.2432], [110.918, 38.7158], [110.8301, 38.4961], [110.4785, 38.1885], [110.4785, 37.9688], [110.8301, 37.6611], [110.3906, 37.002], [110.4785, 36.123], [110.5664, 35.6396], [110.2148, 34.8926], [110.2148, 34.6729], [110.3906, 34.585], [110.4785, 34.2334], [110.6543, 34.1455], [110.6543, 33.8379], [111.0059, 33.5303], [111.0059, 33.2666], [110.7422, 33.1348], [110.5664, 33.2666], [110.3027, 33.1787], [109.5996, 33.2666], [109.4238, 33.1348], [109.7754, 33.0469], [109.7754, 32.915], [110.127, 32.7393], [110.127, 32.6074], [109.6875, 32.6074], [109.5117, 32.4316], [109.5996, 31.7285], [109.248, 31.7285], [109.0723, 31.9482], [108.5449, 32.2119], [108.2813, 32.2559], [108.0176, 32.168], [107.4023, 32.5195], [107.2266, 32.4316], [107.1387, 32.4756], [107.0508, 32.6953], [106.3477, 32.6514], [106.084, 32.7393], [106.084, 32.8711], [105.5566, 32.7393], [105.4688, 32.915]]]}}, {'type': 'Feature', 'id': '44', 'properties': {'name': '广东', 'cp': [113.4668, 22.8076], 'childNum': 21}, 'geometry': {'type': 'Polygon', 'coordinates': [[[109.7754, 21.4014], [109.7754, 21.6211], [109.8633, 21.665], [109.9512, 21.8408], [110.3027, 21.8848], [110.3027, 22.1484], [110.6543, 22.1484], [110.7422, 22.2803], [110.7422, 22.5439], [111.2695, 22.8076], [111.4453, 23.0273], [111.3574, 23.4668], [111.6211, 23.6865], [111.6211, 23.8184], [111.7969, 23.8184], [111.8848, 23.9941], [111.8848, 24.2139], [112.0605, 24.3457], [111.8848, 24.6533], [112.0605, 24.7412], [112.1484, 24.873], [112.2363, 25.1807], [112.5879, 25.1367], [112.8516, 24.917], [113.0273, 24.9609], [113.0273, 25.2246], [112.8516, 25.3564], [113.2031, 25.5322], [113.6426, 25.3125], [113.9063, 25.4443], [113.9941, 25.2686], [114.6094, 25.4004], [114.7852, 25.2686], [114.6973, 25.1367], [114.4336, 24.9609], [114.1699, 24.6973], [114.4336, 24.5215], [115.4004, 24.7852], [115.8398, 24.5654], [115.752, 24.7852], [115.9277, 24.917], [116.2793, 24.7852], [116.3672, 24.873], [116.543, 24.6094], [116.7188, 24.6533], [116.9824, 24.1699], [116.9824, 23.9063], [117.1582, 23.5547], [117.334, 23.2471], [116.8945, 23.3789], [116.6309, 23.1152], [116.543, 22.8516], [115.9277, 22.7197], [115.6641, 22.7637], [115.5762, 22.6318], [115.0488, 22.6758], [114.6094, 22.3682], [114.3457, 22.5439], [113.9941, 22.5], [113.8184, 22.1924], [114.3457, 22.1484], [114.4336, 22.0166], [114.082, 21.9287], [113.9941, 21.7969], [113.5547, 22.0166], [113.1152, 21.8408], [112.9395, 21.5771], [112.4121, 21.4453], [112.2363, 21.5332], [111.5332, 21.4893], [111.2695, 21.3574], [110.7422, 21.3574], [110.6543, 21.2256], [110.7422, 20.918], [110.4785, 20.874], [110.6543, 20.2588], [110.5664, 20.2588], [110.3906, 20.127], [110.0391, 20.127], [109.8633, 20.127], [109.8633, 20.3027], [109.5996, 20.918], [109.7754, 21.4014], [109.7754, 21.4014]], [[113.5986, 22.1649], [113.6096, 22.1265], [113.5547, 22.11], [113.5437, 22.2034], [113.5767, 22.2034], [113.5986, 22.1649]]]}}, {'type': 'Feature', 'id': '22', 'properties': {'name': '吉林', 'cp': [126.4746, 43.5938], 'childNum': 9}, 'geometry': {'type': 'Polygon', 'coordinates': [[[123.2227, 46.2305], [123.9258, 46.2305], [124.0137, 45.7471], [124.3652, 45.4395], [124.8926, 45.5273], [125.0684, 45.3955], [125.6836, 45.5273], [125.7715, 45.3076], [126.0352, 45.1758], [126.5625, 45.2637], [126.9141, 45.1318], [127.0898, 45], [127.002, 44.7803], [127.0898, 44.6045], [127.5293, 44.6045], [127.7051, 44.1211], [128.0566, 44.1211], [128.0566, 44.3408], [128.4082, 44.4727], [128.4961, 44.165], [128.8477, 43.5498], [129.1992, 43.5938], [129.2871, 43.8135], [129.8145, 43.9014], [129.9023, 44.0332], [129.9902, 43.8574], [130.3418, 43.9893], [130.5176, 43.6377], [130.8691, 43.418], [131.3086, 43.4619], [131.3086, 43.3301], [131.1328, 42.9346], [130.4297, 42.7148], [130.6055, 42.6709], [130.6055, 42.4512], [130.2539, 42.7588], [130.2539, 42.8906], [130.166, 42.9785], [129.9023, 43.0225], [129.7266, 42.4951], [129.375, 42.4512], [128.9355, 42.0117], [128.0566, 42.0117], [128.3203, 41.5723], [128.1445, 41.3525], [127.0898, 41.5283], [127.1777, 41.5723], [126.9141, 41.792], [126.6504, 41.6602], [126.4746, 41.3965], [126.123, 40.957], [125.6836, 40.8691], [125.5957, 40.9131], [125.7715, 41.2207], [125.332, 41.6602], [125.332, 41.9678], [125.4199, 42.0996], [125.332, 42.1436], [124.8926, 42.8027], [124.8926, 43.0664], [124.7168, 43.0664], [124.4531, 42.8467], [124.2773, 43.2422], [123.8379, 43.4619], [123.6621, 43.374], [123.3105, 43.5059], [123.4863, 43.7256], [123.1348, 44.4727], [122.3438, 44.2529], [122.0801, 44.8682], [122.2559, 45.2637], [121.9043, 45.7031], [121.7285, 45.7471], [121.8164, 46.0107], [122.2559, 45.791], [122.4316, 45.8789], [122.6953, 45.7031], [122.7832, 46.0107], [123.2227, 46.2305]]]}}, {'type': 'Feature', 'id': '13', 'properties': {'name': '河北', 'cp': [115.4004, 37.9688], 'childNum': 11}, 'geometry': {'type': 'MultiPolygon', 'coordinates': [[[[114.5215, 39.5068], [114.3457, 39.8584], [113.9941, 39.9902], [114.5215, 40.3418], [114.3457, 40.3857], [114.2578, 40.6055], [114.082, 40.7373], [113.9063, 41.1328], [113.9941, 41.2207], [113.9063, 41.4404], [114.2578, 41.5723], [114.1699, 41.792], [114.5215, 42.1436], [114.873, 42.0996], [114.9609, 41.6162], [115.2246, 41.5723], [115.9277, 41.9238], [116.0156, 41.792], [116.2793, 42.0117], [116.8066, 42.0117], [116.8945, 42.4072], [117.334, 42.4512], [117.5098, 42.583], [117.7734, 42.627], [118.0371, 42.4072], [117.9492, 42.2314], [118.125, 42.0557], [118.3008, 42.0996], [118.3008, 41.792], [118.125, 41.748], [118.3887, 41.3086], [119.2676, 41.3086], [118.8281, 40.8252], [119.2676, 40.5176], [119.5313, 40.5615], [119.707, 40.1221], [119.8828, 39.9463], [119.5313, 39.6826], [119.4434, 39.4189], [118.916, 39.0674], [118.4766, 38.9355], [118.125, 39.0234], [118.0371, 39.1992], [118.0371, 39.2432], [117.8613, 39.4189], [117.9492, 39.5947], [117.6855, 39.5947], [117.5098, 39.7705], [117.5098, 39.9902], [117.6855, 39.9902], [117.6855, 40.0781], [117.4219, 40.21], [117.2461, 40.5176], [117.4219, 40.6494], [116.9824, 40.6934], [116.6309, 41.0449], [116.3672, 40.9131], [116.4551, 40.7813], [116.1914, 40.7813], [116.1035, 40.6055], [115.752, 40.5615], [115.9277, 40.2539], [115.4004, 39.9463], [115.4883, 39.6387], [115.752, 39.5068], [116.1914, 39.5947], [116.3672, 39.4629], [116.543, 39.5947], [116.8066, 39.5947], [116.8945, 39.1113], [116.7188, 38.9355], [116.7188, 38.8037], [117.2461, 38.54], [117.5977, 38.6279], [117.9492, 38.3203], [117.4219, 37.8369], [116.8066, 37.8369], [116.4551, 37.4854], [116.2793, 37.5732], [116.2793, 37.3535], [116.0156, 37.3535], [115.752, 36.9141], [115.3125, 36.5186], [115.4883, 36.167], [115.3125, 36.0791], [115.1367, 36.2109], [114.9609, 36.0791], [114.873, 36.123], [113.7305, 36.3428], [113.4668, 36.6504], [113.7305, 36.8701], [113.7305, 37.1338], [114.1699, 37.6611], [113.9941, 37.7051], [113.8184, 38.1445], [113.5547, 38.2764], [113.5547, 38.54], [113.8184, 38.8037], [113.8184, 38.9355], [113.9063, 39.0234], [114.3457, 39.0674], [114.5215, 39.5068]]], [[[117.2461, 40.0781], [117.1582, 39.8145], [117.1582, 39.6387], [116.8945, 39.6826], [116.8945, 39.8145], [116.8066, 39.9902], [117.2461, 40.0781]]]]}}, {'type': 'Feature', 'id': '42', 'properties': {'name': '湖北', 'cp': [112.2363, 31.1572], 'childNum': 17}, 'geometry': {'type': 'Polygon', 'coordinates': [[[110.2148, 31.1572], [110.127, 31.377], [109.6875, 31.5527], [109.7754, 31.6846], [109.5996, 31.7285], [109.5117, 32.4316], [109.6875, 32.6074], [110.127, 32.6074], [110.127, 32.7393], [109.7754, 32.915], [109.7754, 33.0469], [109.4238, 33.1348], [109.5996, 33.2666], [110.3027, 33.1787], [110.5664, 33.2666], [110.7422, 33.1348], [111.0059, 33.2666], [111.5332, 32.6074], [112.3242, 32.3438], [113.2031, 32.4316], [113.4668, 32.2998], [113.7305, 32.4316], [113.8184, 31.8604], [113.9941, 31.7725], [114.1699, 31.8604], [114.5215, 31.7725], [114.6094, 31.5527], [114.7852, 31.4648], [115.1367, 31.5967], [115.2246, 31.4209], [115.4004, 31.4209], [115.5762, 31.2012], [116.0156, 31.0254], [115.752, 30.6738], [116.1035, 30.1904], [116.1035, 29.8389], [115.9277, 29.707], [115.4883, 29.7949], [114.873, 29.3994], [114.2578, 29.3555], [113.9063, 29.0479], [113.7305, 29.0918], [113.6426, 29.3115], [113.7305, 29.5752], [113.5547, 29.707], [113.5547, 29.8389], [113.0273, 29.4434], [112.9395, 29.4873], [113.0273, 29.751], [112.9395, 29.7949], [112.6758, 29.5752], [112.5, 29.6191], [112.2363, 29.5313], [111.7969, 29.9268], [110.8301, 30.1465], [110.4785, 30.0146], [110.6543, 29.751], [110.4785, 29.6631], [109.7754, 29.751], [109.6875, 29.6191], [109.5117, 29.6191], [109.248, 29.1357], [109.0723, 29.3555], [108.9844, 29.3115], [108.6328, 29.8389], [108.457, 29.7949], [108.5449, 30.2344], [108.457, 30.4102], [108.6328, 30.5859], [108.8086, 30.498], [109.0723, 30.6299], [109.1602, 30.542], [109.248, 30.6299], [109.4238, 30.542], [109.8633, 30.8936], [110.0391, 30.8057], [110.2148, 31.1572]]]}}, {'type': 'Feature', 'id': '52', 'properties': {'name': '贵州', 'cp': [106.6113, 26.9385], 'childNum': 9}, 'geometry': {'type': 'Polygon', 'coordinates': [[[104.1504, 27.2461], [104.4141, 27.4658], [104.5898, 27.334], [105.2051, 27.3779], [105.293, 27.7295], [105.5566, 27.7734], [105.6445, 27.6416], [106.3477, 27.8174], [106.1719, 28.125], [105.9082, 28.125], [105.6445, 28.4326], [105.9961, 28.7402], [106.3477, 28.5205], [106.5234, 28.5645], [106.4355, 28.7842], [106.5234, 28.7842], [106.6113, 28.6523], [106.6113, 28.5205], [106.6992, 28.4766], [106.875, 28.7842], [107.4023, 28.8721], [107.4023, 29.1797], [107.5781, 29.2236], [107.8418, 29.1357], [107.8418, 29.0039], [108.2813, 29.0918], [108.3691, 28.6523], [108.5449, 28.6523], [108.5449, 28.3887], [108.7207, 28.4766], [108.7207, 28.2129], [109.0723, 28.2129], [109.248, 28.4766], [109.3359, 28.2568], [109.3359, 27.9053], [109.4238, 27.5977], [108.8086, 27.1143], [108.8965, 27.0264], [109.3359, 27.1582], [109.5117, 27.0264], [109.5117, 26.8066], [109.3359, 26.7188], [109.4238, 26.5869], [109.248, 26.3232], [109.4238, 26.2793], [109.5117, 26.0156], [109.3359, 25.708], [108.9844, 25.752], [109.0723, 25.5322], [108.6328, 25.5762], [108.6328, 25.3125], [108.3691, 25.5322], [108.1934, 25.4443], [108.1055, 25.2246], [107.8418, 25.1367], [107.7539, 25.2246], [107.4902, 25.2246], [107.2266, 25.6201], [106.9629, 25.4883], [107.0508, 25.2686], [106.875, 25.1807], [106.1719, 24.9609], [106.1719, 24.7852], [105.9961, 24.6533], [105.2051, 24.9609], [104.6777, 24.6094], [104.502, 24.7412], [104.6777, 24.9609], [104.5898, 25.0488], [104.8535, 25.2246], [104.3262, 25.708], [104.6777, 26.4111], [104.4141, 26.6748], [103.8867, 26.543], [103.7109, 26.7627], [103.7109, 26.9824], [103.623, 27.0264], [103.8867, 27.4219], [104.1504, 27.2461]]]}}, {'type': 'Feature', 'id': '37', 'properties': {'name': '山东', 'cp': [118.7402, 36.4307], 'childNum': 17}, 'geometry': {'type': 'Polygon', 'coordinates': [[[115.4883, 36.167], [115.3125, 36.5186], [115.752, 36.9141], [116.0156, 37.3535], [116.2793, 37.3535], [116.2793, 37.5732], [116.4551, 37.4854], [116.8066, 37.8369], [117.4219, 37.8369], [117.9492, 38.3203], [118.125, 38.1445], [118.916, 38.1445], [119.3555, 37.6611], [119.0039, 37.5293], [119.0039, 37.3535], [119.3555, 37.1338], [119.707, 37.1338], [119.8828, 37.3975], [120.498, 37.8369], [120.5859, 38.1445], [120.9375, 38.4521], [121.0254, 37.8369], [121.2012, 37.6611], [121.9043, 37.4854], [122.168, 37.6172], [122.2559, 37.4854], [122.6074, 37.4854], [122.6953, 37.3535], [122.6074, 36.9141], [122.4316, 36.7822], [121.8164, 36.8701], [121.7285, 36.6943], [121.1133, 36.6064], [121.1133, 36.4307], [121.377, 36.2549], [120.7617, 36.167], [120.9375, 35.8594], [120.6738, 36.0352], [119.707, 35.4639], [119.9707, 34.9805], [119.3555, 35.0244], [119.2676, 35.1123], [118.916, 35.0244], [118.7402, 34.7168], [118.4766, 34.6729], [118.3887, 34.4092], [118.2129, 34.4092], [118.125, 34.6289], [117.9492, 34.6729], [117.5977, 34.4531], [117.334, 34.585], [117.2461, 34.4531], [116.8066, 34.9365], [116.4551, 34.8926], [116.3672, 34.6289], [116.1914, 34.585], [115.5762, 34.585], [115.4004, 34.8486], [114.7852, 35.0684], [115.0488, 35.376], [115.2246, 35.4199], [115.4883, 35.7275], [116.1035, 36.0791], [115.3125, 35.8154], [115.4883, 36.167]]]}}, {'type': 'Feature', 'id': '36', 'properties': {'name': '江西', 'cp': [116.0156, 27.29], 'childNum': 11}, 'geometry': {'type': 'Polygon', 'coordinates': [[[114.2578, 28.3447], [114.082, 28.5645], [114.1699, 28.8281], [113.9063, 29.0479], [114.2578, 29.3555], [114.873, 29.3994], [115.4883, 29.7949], [115.9277, 29.707], [116.1035, 29.8389], [116.2793, 29.7949], [116.7188, 30.0586], [116.8945, 29.9268], [116.7188, 29.751], [116.7188, 29.6191], [117.1582, 29.707], [117.0703, 29.8389], [117.1582, 29.9268], [117.5098, 29.6191], [118.0371, 29.5752], [118.2129, 29.3994], [118.0371, 29.1797], [118.0371, 29.0479], [118.3887, 28.7842], [118.4766, 28.3447], [118.4766, 28.3008], [118.3008, 28.0811], [117.7734, 27.8174], [117.5098, 27.9932], [116.9824, 27.6416], [117.1582, 27.29], [117.0703, 27.1143], [116.543, 26.8066], [116.6309, 26.4551], [116.3672, 26.2354], [116.4551, 26.1035], [116.1914, 25.8838], [116.0156, 25.2686], [115.8398, 25.2246], [115.9277, 24.917], [115.752, 24.7852], [115.8398, 24.5654], [115.4004, 24.7852], [114.4336, 24.5215], [114.1699, 24.6973], [114.4336, 24.9609], [114.6973, 25.1367], [114.7852, 25.2686], [114.6094, 25.4004], [113.9941, 25.2686], [113.9063, 25.4443], [113.9941, 26.0596], [114.2578, 26.1475], [113.9941, 26.1914], [114.082, 26.5869], [113.9063, 26.6309], [113.9063, 26.9385], [113.7305, 27.1143], [113.8184, 27.29], [113.6426, 27.3779], [113.6426, 27.5977], [113.7305, 27.9492], [114.2578, 28.3447]]]}}, {'type': 'Feature', 'id': '41', 'properties': {'name': '河南', 'cp': [113.4668, 33.8818], 'childNum': 17}, 'geometry': {'type': 'Polygon', 'coordinates': [[[110.3906, 34.585], [110.8301, 34.6289], [111.1816, 34.8047], [111.5332, 34.8486], [111.7969, 35.0684], [112.0605, 35.0684], [112.0605, 35.2881], [112.7637, 35.2002], [113.1152, 35.332], [113.6426, 35.6836], [113.7305, 36.3428], [114.873, 36.123], [114.9609, 36.0791], [115.1367, 36.2109], [115.3125, 36.0791], [115.4883, 36.167], [115.3125, 35.8154], [116.1035, 36.0791], [115.4883, 35.7275], [115.2246, 35.4199], [115.0488, 35.376], [114.7852, 35.0684], [115.4004, 34.8486], [115.5762, 34.585], [116.1914, 34.585], [116.1914, 34.4092], [116.543, 34.2773], [116.6309, 33.9258], [116.1914, 33.7061], [116.0156, 33.9697], [115.6641, 34.0576], [115.5762, 33.9258], [115.5762, 33.6621], [115.4004, 33.5303], [115.3125, 33.1787], [114.873, 33.1348], [114.873, 33.0029], [115.1367, 32.8711], [115.2246, 32.6074], [115.5762, 32.4316], [115.8398, 32.5195], [115.9277, 31.7725], [115.4883, 31.6846], [115.4004, 31.4209], [115.2246, 31.4209], [115.1367, 31.5967], [114.7852, 31.4648], [114.6094, 31.5527], [114.5215, 31.7725], [114.1699, 31.8604], [113.9941, 31.7725], [113.8184, 31.8604], [113.7305, 32.4316], [113.4668, 32.2998], [113.2031, 32.4316], [112.3242, 32.3438], [111.5332, 32.6074], [111.0059, 33.2666], [111.0059, 33.5303], [110.6543, 33.8379], [110.6543, 34.1455], [110.4785, 34.2334], [110.3906, 34.585]]]}}, {'type': 'Feature', 'id': '21', 'properties': {'name': '辽宁', 'cp': [122.3438, 41.0889], 'childNum': 14}, 'geometry': {'type': 'Polygon', 'coordinates': [[[119.2676, 41.3086], [119.4434, 41.6162], [119.2676, 41.7041], [119.3555, 42.2754], [119.5313, 42.3633], [119.8828, 42.1875], [120.1465, 41.7041], [120.498, 42.0996], [121.4648, 42.4951], [121.7285, 42.4512], [121.9922, 42.7148], [122.3438, 42.6709], [122.3438, 42.8467], [122.7832, 42.7148], [123.1348, 42.8027], [123.3105, 42.9785], [123.5742, 43.0225], [123.6621, 43.374], [123.8379, 43.4619], [124.2773, 43.2422], [124.4531, 42.8467], [124.7168, 43.0664], [124.8926, 43.0664], [124.8926, 42.8027], [125.332, 42.1436], [125.4199, 42.0996], [125.332, 41.9678], [125.332, 41.6602], [125.7715, 41.2207], [125.5957, 40.9131], [125.6836, 40.8691], [124.541, 40.21], [124.1016, 39.6826], [123.3984, 39.6826], [123.1348, 39.4189], [123.1348, 39.0234], [122.0801, 39.0234], [121.5527, 38.7158], [121.1133, 38.6719], [120.9375, 38.9795], [121.377, 39.1992], [121.2012, 39.5508], [122.0801, 40.3857], [121.9922, 40.6934], [121.7285, 40.8252], [121.2012, 40.8252], [120.5859, 40.21], [119.8828, 39.9463], [119.707, 40.1221], [119.5313, 40.5615], [119.2676, 40.5176], [118.8281, 40.8252], [119.2676, 41.3086]]]}}, {'type': 'Feature', 'id': '14', 'properties': {'name': '山西', 'cp': [112.4121, 37.6611], 'childNum': 11}, 'geometry': {'type': 'Polygon', 'coordinates': [[[110.918, 38.7158], [111.1816, 39.2432], [111.0938, 39.375], [111.3574, 39.4189], [111.4453, 39.6387], [111.9727, 39.5947], [112.3242, 40.2539], [112.7637, 40.166], [113.2031, 40.3857], [113.5547, 40.3418], [113.8184, 40.5176], [114.082, 40.5176], [114.082, 40.7373], [114.2578, 40.6055], [114.3457, 40.3857], [114.5215, 40.3418], [113.9941, 39.9902], [114.3457, 39.8584], [114.5215, 39.5068], [114.3457, 39.0674], [113.9063, 39.0234], [113.8184, 38.9355], [113.8184, 38.8037], [113.5547, 38.54], [113.5547, 38.2764], [113.8184, 38.1445], [113.9941, 37.7051], [114.1699, 37.6611], [113.7305, 37.1338], [113.7305, 36.8701], [113.4668, 36.6504], [113.7305, 36.3428], [113.6426, 35.6836], [113.1152, 35.332], [112.7637, 35.2002], [112.0605, 35.2881], [112.0605, 35.0684], [111.7969, 35.0684], [111.5332, 34.8486], [111.1816, 34.8047], [110.8301, 34.6289], [110.3906, 34.585], [110.2148, 34.6729], [110.2148, 34.8926], [110.5664, 35.6396], [110.4785, 36.123], [110.3906, 37.002], [110.8301, 37.6611], [110.4785, 37.9688], [110.4785, 38.1885], [110.8301, 38.4961], [110.918, 38.7158]]]}}, {'type': 'Feature', 'id': '34', 'properties': {'name': '安徽', 'cp': [117.2461, 32.0361], 'childNum': 17}, 'geometry': {'type': 'Polygon', 'coordinates': [[[116.6309, 33.9258], [116.543, 34.2773], [116.1914, 34.4092], [116.1914, 34.585], [116.3672, 34.6289], [116.8945, 34.4092], [117.1582, 34.0576], [117.5977, 34.0137], [117.7734, 33.7061], [118.125, 33.75], [117.9492, 33.2227], [118.0371, 33.1348], [118.2129, 33.2227], [118.3008, 32.7832], [118.7402, 32.7393], [118.916, 32.959], [119.1797, 32.8271], [119.1797, 32.4756], [118.5645, 32.5635], [118.6523, 32.2119], [118.4766, 32.168], [118.3887, 31.9482], [118.916, 31.5527], [118.7402, 31.377], [118.8281, 31.2451], [119.3555, 31.2891], [119.4434, 31.1572], [119.6191, 31.1133], [119.6191, 31.0693], [119.4434, 30.6738], [119.2676, 30.6299], [119.3555, 30.4102], [118.916, 30.3223], [118.916, 29.9707], [118.7402, 29.707], [118.2129, 29.3994], [118.0371, 29.5752], [117.5098, 29.6191], [117.1582, 29.9268], [117.0703, 29.8389], [117.1582, 29.707], [116.7188, 29.6191], [116.7188, 29.751], [116.8945, 29.9268], [116.7188, 30.0586], [116.2793, 29.7949], [116.1035, 29.8389], [116.1035, 30.1904], [115.752, 30.6738], [116.0156, 31.0254], [115.5762, 31.2012], [115.4004, 31.4209], [115.4883, 31.6846], [115.9277, 31.7725], [115.8398, 32.5195], [115.5762, 32.4316], [115.2246, 32.6074], [115.1367, 32.8711], [114.873, 33.0029], [114.873, 33.1348], [115.3125, 33.1787], [115.4004, 33.5303], [115.5762, 33.6621], [115.5762, 33.9258], [115.6641, 34.0576], [116.0156, 33.9697], [116.1914, 33.7061], [116.6309, 33.9258]]]}}, {'type': 'Feature', 'id': '35', 'properties': {'name': '福建', 'cp': [118.3008, 25.9277], 'childNum': 9}, 'geometry': {'type': 'Polygon', 'coordinates': [[[118.4766, 28.3008], [118.8281, 28.2568], [118.7402, 28.0371], [118.916, 27.4658], [119.2676, 27.4219], [119.6191, 27.6855], [119.7949, 27.29], [120.2344, 27.4219], [120.4102, 27.1582], [120.7617, 27.0264], [120.6738, 26.8945], [120.2344, 26.8506], [120.2344, 26.7188], [120.4102, 26.6748], [120.498, 26.3672], [120.2344, 26.2793], [120.4102, 26.1475], [120.0586, 26.1914], [119.9707, 25.9277], [119.7949, 25.9277], [119.9707, 25.4004], [119.7949, 25.2686], [119.5313, 25.1367], [119.4434, 25.0049], [119.2676, 25.0928], [118.916, 24.8291], [118.6523, 24.5215], [118.4766, 24.5215], [118.4766, 24.4336], [118.2129, 24.3457], [118.2129, 24.1699], [117.8613, 23.9941], [117.7734, 23.7744], [117.5098, 23.5986], [117.1582, 23.5547], [116.9824, 23.9063], [116.9824, 24.1699], [116.7188, 24.6533], [116.543, 24.6094], [116.3672, 24.873], [116.2793, 24.7852], [115.9277, 24.917], [115.8398, 25.2246], [116.0156, 25.2686], [116.1914, 25.8838], [116.4551, 26.1035], [116.3672, 26.2354], [116.6309, 26.4551], [116.543, 26.8066], [117.0703, 27.1143], [117.1582, 27.29], [116.9824, 27.6416], [117.5098, 27.9932], [117.7734, 27.8174], [118.3008, 28.0811], [118.4766, 28.3008]]]}}, {'type': 'Feature', 'id': '33', 'properties': {'name': '浙江', 'cp': [120.498, 29.0918], 'childNum': 11}, 'geometry': {'type': 'Polygon', 'coordinates': [[[118.2129, 29.3994], [118.7402, 29.707], [118.916, 29.9707], [118.916, 30.3223], [119.3555, 30.4102], [119.2676, 30.6299], [119.4434, 30.6738], [119.6191, 31.0693], [119.6191, 31.1133], [119.9707, 31.1572], [120.498, 30.8057], [120.9375, 31.0254], [121.2891, 30.6738], [121.9922, 30.8057], [122.6953, 30.8936], [122.8711, 30.7178], [122.959, 30.1465], [122.6074, 30.1025], [122.6074, 29.9268], [122.168, 29.5313], [122.3438, 28.8721], [121.9922, 28.8721], [121.9922, 28.4326], [121.7285, 28.3447], [121.7285, 28.2129], [121.4648, 28.2129], [121.5527, 28.0371], [121.2891, 27.9492], [121.1133, 27.4219], [120.6738, 27.334], [120.6738, 27.1582], [120.9375, 27.0264], [120.7617, 27.0264], [120.4102, 27.1582], [120.2344, 27.4219], [119.7949, 27.29], [119.6191, 27.6855], [119.2676, 27.4219], [118.916, 27.4658], [118.7402, 28.0371], [118.8281, 28.2568], [118.4766, 28.3008], [118.4766, 28.3447], [118.3887, 28.7842], [118.0371, 29.0479], [118.0371, 29.1797], [118.2129, 29.3994]]]}}, {'type': 'Feature', 'id': '32', 'properties': {'name': '江苏', 'cp': [120.0586, 32.915], 'childNum': 13}, 'geometry': {'type': 'Polygon', 'coordinates': [[[116.3672, 34.6289], [116.4551, 34.8926], [116.8066, 34.9365], [117.2461, 34.4531], [117.334, 34.585], [117.5977, 34.4531], [117.9492, 34.6729], [118.125, 34.6289], [118.2129, 34.4092], [118.3887, 34.4092], [118.4766, 34.6729], [118.7402, 34.7168], [118.916, 35.0244], [119.2676, 35.1123], [119.3555, 35.0244], [119.3555, 34.8486], [119.707, 34.585], [120.3223, 34.3652], [120.9375, 33.0469], [121.0254, 32.6514], [121.377, 32.4756], [121.4648, 32.168], [121.9043, 31.9922], [121.9922, 31.6846], [121.9922, 31.5967], [121.2012, 31.8604], [121.1133, 31.7285], [121.377, 31.5088], [121.2012, 31.4648], [120.9375, 31.0254], [120.498, 30.8057], [119.9707, 31.1572], [119.6191, 31.1133], [119.4434, 31.1572], [119.3555, 31.2891], [118.8281, 31.2451], [118.7402, 31.377], [118.916, 31.5527], [118.3887, 31.9482], [118.4766, 32.168], [118.6523, 32.2119], [118.5645, 32.5635], [119.1797, 32.4756], [119.1797, 32.8271], [118.916, 32.959], [118.7402, 32.7393], [118.3008, 32.7832], [118.2129, 33.2227], [118.0371, 33.1348], [117.9492, 33.2227], [118.125, 33.75], [117.7734, 33.7061], [117.5977, 34.0137], [117.1582, 34.0576], [116.8945, 34.4092], [116.3672, 34.6289]]]}}, {'type': 'Feature', 'id': '50', 'properties': {'name': '重庆', 'cp': [107.7539, 30.1904], 'childNum': 40}, 'geometry': {'type': 'Polygon', 'coordinates': [[[108.5449, 31.6846], [108.2813, 31.9043], [108.3691, 32.168], [108.5449, 32.2119], [109.0723, 31.9482], [109.248, 31.7285], [109.5996, 31.7285], [109.7754, 31.6846], [109.6875, 31.5527], [110.127, 31.377], [110.2148, 31.1572], [110.0391, 30.8057], [109.8633, 30.8936], [109.4238, 30.542], [109.248, 30.6299], [109.1602, 30.542], [109.0723, 30.6299], [108.8086, 30.498], [108.6328, 30.5859], [108.457, 30.4102], [108.5449, 30.2344], [108.457, 29.7949], [108.6328, 29.8389], [108.9844, 29.3115], [109.0723, 29.3555], [109.248, 29.1357], [109.248, 28.4766], [109.0723, 28.2129], [108.7207, 28.2129], [108.7207, 28.4766], [108.5449, 28.3887], [108.5449, 28.6523], [108.3691, 28.6523], [108.2813, 29.0918], [107.8418, 29.0039], [107.8418, 29.1357], [107.5781, 29.2236], [107.4023, 29.1797], [107.4023, 28.8721], [106.875, 28.7842], [106.6992, 28.4766], [106.6113, 28.5205], [106.6113, 28.6523], [106.5234, 28.7842], [106.4355, 28.7842], [106.5234, 28.5645], [106.3477, 28.5205], [106.2598, 28.8721], [105.8203, 28.96], [105.7324, 29.2676], [105.4688, 29.3115], [105.293, 29.5313], [105.7324, 29.8828], [105.5566, 30.1025], [105.6445, 30.2783], [105.8203, 30.4541], [106.2598, 30.1904], [106.6113, 30.3223], [106.7871, 30.0146], [107.0508, 30.0146], [107.4902, 30.6299], [107.4023, 30.7617], [107.4902, 30.8496], [107.9297, 30.8496], [108.1934, 31.5088], [108.5449, 31.6846]]]}}, {'type': 'Feature', 'id': '64', 'properties': {'name': '宁夏', 'cp': [105.9961, 37.3096], 'childNum': 5}, 'geometry': {'type': 'Polygon', 'coordinates': [[[104.3262, 37.4414], [105.8203, 37.793], [105.9082, 38.7158], [106.3477, 39.2871], [106.7871, 39.375], [106.9629, 38.9795], [106.5234, 38.3203], [106.7871, 38.1885], [107.3145, 38.1006], [107.666, 37.8809], [107.3145, 37.6172], [107.3145, 37.0898], [106.6113, 37.0898], [106.6113, 36.7822], [106.4355, 36.5625], [106.5234, 36.4746], [106.5234, 36.2549], [106.875, 36.123], [106.9629, 35.8154], [106.6992, 35.6836], [106.4355, 35.6836], [106.5234, 35.332], [106.3477, 35.2441], [106.2598, 35.4199], [106.084, 35.376], [105.9961, 35.4199], [106.084, 35.4639], [105.9961, 35.4639], [105.8203, 35.5518], [105.7324, 35.7275], [105.3809, 35.7715], [105.293, 35.9912], [105.4688, 36.123], [105.2051, 36.6943], [105.293, 36.8262], [104.8535, 37.2217], [104.5898, 37.2217], [104.5898, 37.4414], [104.3262, 37.4414]]]}}, {'type': 'Feature', 'id': '46', 'properties': {'name': '海南', 'cp': [109.9512, 19.2041], 'childNum': 18}, 'geometry': {'type': 'Polygon', 'coordinates': [[[108.6328, 19.3799], [109.0723, 19.6436], [109.248, 19.9512], [109.5996, 20.0391], [110.0391, 20.127], [110.3906, 20.127], [110.5664, 20.2588], [110.6543, 20.2588], [111.0938, 19.9512], [111.2695, 19.9951], [110.6543, 19.1602], [110.5664, 18.6768], [110.2148, 18.5889], [110.0391, 18.3691], [109.8633, 18.3691], [109.6875, 18.1055], [108.9844, 18.2813], [108.6328, 18.457], [108.6328, 19.3799]]]}}, {'type': 'Feature', 'id': '71', 'properties': {'name': '台湾', 'cp': [121.0254, 23.5986], 'childNum': 1}, 'geometry': {'type': 'Polygon', 'coordinates': [[[121.9043, 25.0488], [121.9922, 25.0049], [121.8164, 24.7412], [121.9043, 24.5654], [121.6406, 24.0381], [121.377, 23.1152], [121.0254, 22.6758], [120.8496, 22.0605], [120.7617, 21.9287], [120.6738, 22.3242], [120.2344, 22.5879], [120.0586, 23.0713], [120.1465, 23.6865], [121.0254, 25.0488], [121.5527, 25.3125], [121.9043, 25.0488]]]}}, {'type': 'Feature', 'id': '11', 'properties': {'name': '北京', 'cp': [116.4551, 40.2539], 'childNum': 19}, 'geometry': {'type': 'Polygon', 'coordinates': [[[117.4219, 40.21], [117.334, 40.1221], [117.2461, 40.0781], [116.8066, 39.9902], [116.8945, 39.8145], [116.8945, 39.6826], [116.8066, 39.5947], [116.543, 39.5947], [116.3672, 39.4629], [116.1914, 39.5947], [115.752, 39.5068], [115.4883, 39.6387], [115.4004, 39.9463], [115.9277, 40.2539], [115.752, 40.5615], [116.1035, 40.6055], [116.1914, 40.7813], [116.4551, 40.7813], [116.3672, 40.9131], [116.6309, 41.0449], [116.9824, 40.6934], [117.4219, 40.6494], [117.2461, 40.5176], [117.4219, 40.21]]]}}, {'type': 'Feature', 'id': '12', 'properties': {'name': '天津', 'cp': [117.4219, 39.4189], 'childNum': 18}, 'geometry': {'type': 'Polygon', 'coordinates': [[[116.8066, 39.5947], [116.8945, 39.6826], [117.1582, 39.6387], [117.1582, 39.8145], [117.2461, 40.0781], [117.334, 40.1221], [117.4219, 40.21], [117.6855, 40.0781], [117.6855, 39.9902], [117.5098, 39.9902], [117.5098, 39.7705], [117.6855, 39.5947], [117.9492, 39.5947], [117.8613, 39.4189], [118.0371, 39.2432], [118.0371, 39.1992], [117.8613, 39.1113], [117.5977, 38.6279], [117.2461, 38.54], [116.7188, 38.8037], [116.7188, 38.9355], [116.8945, 39.1113], [116.8066, 39.5947]]]}}, {'type': 'Feature', 'id': '31', 'properties': {'name': '上海', 'cp': [121.4648, 31.2891], 'childNum': 19}, 'geometry': {'type': 'Polygon', 'coordinates': [[[120.9375, 31.0254], [121.2012, 31.4648], [121.377, 31.5088], [121.1133, 31.7285], [121.2012, 31.8604], [121.9922, 31.5967], [121.9043, 31.1572], [121.9922, 30.8057], [121.2891, 30.6738], [120.9375, 31.0254]]]}}, {'type': 'Feature', 'id': '81', 'properties': {'name': '香港', 'cp': [114.2578, 22.3242], 'childNum': 1}, 'geometry': {'type': 'Polygon', 'coordinates': [[[114.6094, 22.4121], [114.5215, 22.1484], [114.3457, 22.1484], [113.9063, 22.1484], [113.8184, 22.1924], [113.9063, 22.4121], [114.1699, 22.5439], [114.3457, 22.5439], [114.4336, 22.5439], [114.4336, 22.4121], [114.6094, 22.4121]]]}}, {'type': 'Feature', 'id': '82', 'properties': {'name': '澳门', 'cp': [113.5547, 22.1484], 'childNum': 1}, 'geometry': {'type': 'Polygon', 'coordinates': [[[113.5986, 22.1649], [113.6096, 22.1265], [113.5547, 22.11], [113.5437, 22.2034], [113.5767, 22.2034], [113.5986, 22.1649]]]}}]};

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 20;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        map.data = function(_) {
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
                data.forEach(function(d, i) {
                    if (!isFinite(parseFloat(d.value))) {
                        alert('Attribute "value" in line ' + i + ' should be a number');
                    }
                });
                return this;
            } else
                return data;
        };

        map.getType = function() {
            return type;
        };

        map.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                alert('The argument(element) in map.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('map', true)
                    .node();
            /* 初始化变量 */
            widthAvail = d3.min([width, height]);
            heightAvail = d3.min([width, height]);

            var h = d3.scale.linear()
                    .range([gradientColor[0], gradientColor[1]]);
            h.domain(extentValue);

            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    map.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('map', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg)
                    .select('g');

            chinamapUpdate(g);
            chinamapDraw(g);

            var states = g.select('.map')
                    .selectAll('.state');

            data.forEach(function(d) {
                if (cache.has(d.name)) {
                    d3.select(cache.get(d.name))
                            .data([d])
                            .select('path')
                            .attr('data-color', h(d.value))
                            .style('fill', h(d.value));
                }
            });

            states
                    .on('mouseover', function(d) {
                        drawLegend(d, true, h);
                        d3.select(this)
                                .select('path')
                                .transition()
                                .duration(duration)
                                .style('fill', activeStateColor);
                    })
                    .on('mouseout', function(d) {
                        drawLegend(d, false, h);
                        d3.select(this)
                                .select('path')
                                .transition()
                                .duration(duration)
                                .style('fill', function() {
                                    return d3.select(this)
                                            .attr('data-color');
                                });
                    });
            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(h.ticks(6).slice(1).reverse());
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends, h);
            legendDraw(legends, h);
        };

        function chinamapUpdate(g) {
            var projection = d3.geo.mercator()
                    .center([122, 40])
                    .scale(mapScale);
            var path = d3.geo.path()
                    .projection(projection);

            g.select('.map')
                    .selectAll('.state')
                    .append('svg:g')
                    .call(function(selection) {
                        selection.select('path')
                                .transition()
                                .duration(duration)
                                .attr('d', path)
                                .attr('data-color', stateFillColor)
                                .style('fill', stateFillColor)
                                .style('stroke', stateStrokeColor);

                        selection.select('text')
                                .transition()
                                .duration(duration)
                                .attr('x', function(d) {
                                    return projection(d.properties.cp)[0];
                                })
                                .attr('y', function(d) {
                                    return projection(d.properties.cp)[1];
                                })
                                .style({'font-family': fontFamily,
                                    'font-size': fontSize,
                                    'fill': fontColor});
                    });
        }

        function chinamapDraw(g) {
            var projection = d3.geo.mercator()
                    .center([122, 40])
                    .scale(mapScale);
            var path = d3.geo.path()
                    .projection(projection);

            var states = g.select('.map')
                    .selectAll('.state')
                    .data(zh_map.features)
                    .enter();

            states.append('svg:g')
                    .classed('state', true)
                    .attr('id', function(d) {
                        return d.properties.name;
                    })
                    .call(function(selection) {
                        selection.each(function(d) {
                            cache.set(d.properties.name, this);
                        });
                        selection.append('svg:path')
                                .attr('d', path)
                                .attr('data-color', stateFillColor)
                                .style('fill', stateFillColor)
                                .style('stroke', stateStrokeColor);

                        selection.append('svg:text')
                                .attr('x', function(d) {
                                    return projection(d.properties.cp)[0];
                                })
                                .attr('y', function(d) {
                                    return projection(d.properties.cp)[1];
                                })
                                .style('text-anchor', function(d) {
                                    if (d.properties.name === "澳门") {
                                        return 'end';
                                    } else if (d.properties.name === "香港") {
                                        return 'start';
                                    } else
                                        return 'middle';
                                })
                                .style({'font-family': fontFamily,
                                    'font-size': fontSize,
                                    'fill': fontColor})
                                .text(function(d) {
                                    return d.properties.name;
                                });
                    });
        }

        function legendDraw(legends, h) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style('fill', h)
                                .style('stroke', h)
                                .style('fill-opacity', 1)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('opacity', 1);

                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'fill': legendColor,
                                    'font-size': legendSize,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .text(String);
                    });
        }

        function legendUpdate(legends, h) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style('fill', h)
                        .style('stroke', h)
                        .style('fill-opacity', 1)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});
                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(String);
            });
        }

        function drawLegend(d, style, h) {
            if (style) {
                floatTag.style({
                    'border-color': h(d.value),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                }).html('name: ' + d.name + '<br/>' + 'value: ' + d.value);
            } else {
                floatTag.style('opacity', 0);
            }
        }

        map.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in map.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        map.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in map.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        map.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in map.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        map.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in map.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        map.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in map.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        map.fontColor = function(_) {
            if (!arguments.length)
                return fontColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in map.fontColor(fontColor) should be string of text');
                    return this;
                } else {
                    fontColor = arguments[0];
                    return this;
                }
            }
        };

        map.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in map.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        map.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in map.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        map.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in map.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        map.mapScale = function(_) {
            if (!arguments.length)
                return mapScale;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in map.mapScale(mapScale) should be number of map');
                    return this;
                } else {
                    mapScale = arguments[0];
                    return this;
                }
            }
        };

        map.extentValue = function(_) {
            if (!arguments.length)
                return extentValue;
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in map.extentValue(start, end) should be number and number of color');
                return this;
            }
            else {
                extentValue[0] = arguments[0];
                extentValue[1] = arguments[1];
                return this;
            }
        };

        map.gradientColor = function(_) {
            if (!arguments.length)
                return gradientColor;
            else if (arguments.length !== 2
                    || typeof arguments[0] !== 'string'
                    || typeof arguments[1] !== 'string') {
                console.error('The argument(element) in map.gradientColor(start, end) should be string and string of color');
                return this;
            }
            else {
                gradientColor[0] = arguments[0];
                gradientColor[1] = arguments[1];
                return this;
            }
        };

        map.stateFillColor = function(_) {
            if (!arguments.length)
                return stateFillColor;
            else {
                if (typeof arguments[0] !== 'string'
                        && typeof arguments[0] !== 'function') {
                    console.error('The arguments in map.stateFillColor(stateFillColor) should be string or function of map');
                    return this;
                } else {
                    stateFillColor = d3.functor(arguments[0]);
                    return this;
                }
            }
        };

        map.stateStrokeColor = function(_) {
            if (!arguments.length)
                return stateStrokeColor;
            else {
                if (typeof arguments[0] !== 'string'
                        && typeof arguments[0] !== 'function') {
                    console.error('The arguments in map.stateStrokeColor(stateStrokeColor) should be string or function of map');
                    return this;
                } else {
                    stateStrokeColor = d3.functor(arguments[0]);
                    return this;
                }
            }
        };

        map.activeStateColor = function(_) {
            if (!arguments.length)
                return activeStateColor;
            else {
                if (typeof arguments[0] !== 'string'
                        && typeof arguments[0] !== 'function') {
                    console.error('The arguments in map.activeStateColor(activeStateColor) should be string or function of map');
                    return this;
                } else {
                    activeStateColor = d3.functor(arguments[0]);
                    return this;
                }
            }
        };

        map.options = function(_) {
            if (!arguments.length)
                return {'type': map.getType(),
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
                    'mapScale': mapScale,
                    'extentValue': extentValue,
                    'stateFillColor': stateFillColor,
                    'stateStrokeColor': stateStrokeColor,
                    'activeStateColor': activeStateColor,
                    'gradientColor': gradientColor};
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
                _.format && map.tickFormat(_.format);
                _.fontFamily && map.fontFamily(_.fontFamily);
                _.fontColor && map.fontColor(_.fontColor);
                isFinite(_.fontSize) && map.fontSize(_.fontSize);
                isFinite(_.duration) && map.duration(_.duration);
                isFinite(_.mapScale) && map.mapScale(_.mapScale);
                typeof _.extentValue === 'object'
                        && _.extentValue.constructor === Array
                        && _.extentValue.length === 2
                        && map.extentValue(_.extentValue[0], _.extentValue[1]);
                typeof _.gradientColor === 'object'
                        && _.gradientColor.constructor === Array
                        && _.gradientColor.length === 2
                        && map.gradientColor(_.gradientColor[0], _.gradientColor[1]);
                _.stateFillColor && map.stateFillColor(_.stateFillColor);
                _.stateStrokeColor && map.stateStrokeColor(_.stateStrokeColor);
                _.activeStateColor && map.activeStateColor(_.activeStateColor);
                return this;
            }
        };

        if (arguments.length === 1)
            map.options(arguments[0]);
        return map;
    };
    /**
     * 多线图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.multiline = function() {
        var multiline = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '多线图'; //类型
        var width = 800; // 宽度
        var height = 400; // 高度
        var widthAvail = width - 200; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 50; //图形右移距离
        var tranY = 0; //图形下移距离
        var data; //数据
        var fontFamily = 'Arial'; // 字体样式
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = multiline.color();

        /************局部变量***************/
        var isLinear = true;
        var isTimer = false;
        var timeFormat = null;
        var interpolate = 'liner';
        var tension = .7;
        var dimension;

        /******坐标轴******/
        var yLegend = '';
        var xLegend = '';
        var xtickRotate = 0;
        var ytickRotate = 0;
        var labelSize = 8;
        var labelColor = '#000000';
        var xtickNumber = 8;
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = -widthAvail;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        multiline.data = function(_) {
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
                    _ = XMLdata(_);
                    var value = {x: d3.set()};
                    dimension = _.map(function(d) {
                        value[d.name] = d3.map();
                        return {name: d.name, _flag: true};
                    });

                    _.forEach(function(d) {
                        d.points.forEach(function(p) {
                            p.y = +p.y;
                            value[d.name].set(p.x, {x: p.x, y: p.y});
                            value.x.add(p.x);
                        });
                    });

                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                } else if (_.type === 'xlsx' || _.type === 'xls') {
                    var s = [];
                    for (var i = 0; i < _.length; i++) {
                        var k = pvisual.keys(_[i])[0];
                        s = s.concat(_[i][k]);
                    }
                    _ = s;


                    var value = {x: d3.set()};
                    dimension = pvisual.keys(_[0])
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                value[d] = d3.map();
                                return {name: d, _flag: true};
                            });

                    _.forEach(function(d) {
                        dimension.forEach(function(p) {
                            d.x = '' + d.x;
                            value[p.name].set(d.x, {x: d.x, y: +d[p.name]});
                            value.x.add(d.x);
                        });
                    });

                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                } else if (_.type === 'tsv' || _.type === 'csv') {
                    var value = {x: d3.set()};
                    dimension = pvisual.keys(_[0])
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                value[d] = d3.map();
                                return {name: d, _flag: true};
                            });

                    _.forEach(function(d) {
                        dimension.forEach(function(p) {
                            value[p.name].set(d.x, {x: d.x, y: +d[p.name]});
                            value.x.add(d.x);
                        });
                    });

                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                } else if (_.type === 'json') {
                    var value = {x: d3.set()};
                    dimension = _.map(function(d) {
                        value[d.name] = d3.map();
                        return {name: d.name, _flag: true};
                    });

                    _.forEach(function(d) {
                        d.points.forEach(function(p) {
                            p.y = +p.y;
                            value[d.name].set(p.x, {x: p.x, y: p.y});
                            value.x.add(p.x);
                        });
                    });

                    data = pvisual.keys(value)
                            .filter(function(d) {
                                return d !== 'x';
                            })
                            .map(function(d) {
                                return {name: d, points: value[d].values()};
                            });
                    dimension.x = value.x.values();
                }
                return this;
            } else
                return data;
        };

        multiline.getType = function() {
            return type;
        };

        multiline.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in multiline.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('multiline', true)
                    .node();
            /* 初始化变量 */
            var source = multiline.clone(data)
                    .filter(function(d) {
                        var flag = true;
                        dimension.forEach(function(p) {
                            if (p.name === d.name)
                                flag = p._flag;
                        });
                        return flag;
                    });

            if (timeFormat !== null) {
                isTimer = true;
            }
            var x;
            var y;
            var xAxis;
            var yAxis;
            if (isTimer) {
                x = d3.time.scale()
                        .domain(d3.extent(dimension.x, function(d) {
                            return timeFormat.parse(d);
                        }))
                        .range([0, widthAvail]);

                source.forEach(function(d) {
                    d.points.forEach(function(p) {
                        p.x = timeFormat.parse(p.x);
                    });
                });

                source.forEach(function(d) {
                    d.points.sort(function(a, b) {
                        return a.x.getTime() - b.x.getTime();
                    });
                });

                xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom')
                        .tickSize(xtickLineLength)
                        .ticks(xtickNumber);
            } else if (isLinear) {
                x = d3.scale.linear()
                        .domain(d3.extent(dimension.x, function(d) {
                            return +d;
                        }))
                        .range([0, widthAvail]);

                source.forEach(function(d) {
                    d.points.forEach(function(p) {
                        p.x = +p.x;
                    });
                });

                source.forEach(function(d) {
                    d.points.sort(function(a, b) {
                        return a.x - b.x;
                    });
                });

                xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom')
                        .ticks(xtickNumber)
                        .tickSize(xtickLineLength)
                        .tickFormat(format);
            } else {
                x = d3.scale.ordinal()
                        .domain(dimension.x, function(d) {
                            return '' + d;
                        })
                        .range([0, widthAvail]);

                xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom')
                        .tickSize(xtickLineLength);
            }

            y = d3.scale.linear()
                    .domain([d3.min(source, function(d) {
                            return d3.min(d.points, function(p) {
                                return p.y;
                            });
                        }), d3.max(source, function(d) {
                            return d3.max(d.points, function(p) {
                                return p.y;
                            });
                        })])
                    .range([heightAvail, 0]);


            yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);

            var line = d3.svg.line()
                    .interpolate(interpolate)
                    .tension(tension)
                    .x(function(d) {
                        return x(d.x);
                    })
                    .y(function(d) {
                        return y(d.y);
                    });
            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    multiline.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg)
                    .select('g');

            var dimensions = g.selectAll('.dimensions')
                    .selectAll('.dimension')
                    .data(source);

            dimensions.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            dimensionUpdate(dimensions, line, x, y);
            dimensionDraw(dimensions, line, x, y, source);

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);

            axis(g, xAxis, yAxis);

        };

        function dimensionUpdate(dimensions, line, x, y) {
            dimensions
                    .call(function(selection) {
                        selection.select('.line')
                                .transition()
                                .duration(duration)
                                .attr('d', function(d) {
                                    return line(d.points);
                                })
                                .style('stroke', function(d) {
                                    return color(d.name);
                                });
                    });
        }

        function dimensionDraw(dimensions, line, x, y, source) {
            dimensions.enter()
                    .append('svg:g')
                    .classed('dimension', true)
                    .call(function(selection) {
                        selection.append('svg:path')
                                .classed('line', true)
                                .attr('d', function(d) {
                                    return line(d.points);
                                })
                                .style('fill', 'none')
                                .style('stroke', function(d) {
                                    return color(d.name);
                                })
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('opacity', 1);
                    });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimension.length > 1) {
                                d3.select(this).classed('none', true);
                                d._flag = false;
                                multiline.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;
                            multiline.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20 + 9})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 19})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20 + 9});
                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 19})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function axis(g, xAxis, yAxis) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(xLegend);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + heightAvail + ')')
                                .call(xAxis);
                    });

            g.select('.y-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis);
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
                                    'stroke-dasharray': '3,1',
                                    'stroke': tickLineColor,
                                    'shape-rendering': 'crispEdges'});
                    });
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength()
                                        * (.3 * Math.abs(Math.sin(xtickRotate))))
                                + ')rotate(' + xtickRotate + ')';
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

        function XMLdata(d) {
            var u;
            if (typeof d === 'object' && d.constructor === Array) {
                u = d.map(function(p) {
                    var points = p.points.points.map(function(k) {
                        var x;
                        var y;
                        k.point.point.forEach(function(q) {
                            if (q.x !== undefined)
                                x = q.x;
                            if (q.y !== undefined)
                                y = q.y;
                        });
                        return {x: '' + x, y: y};
                    });
                    return {name: p.name, points: points};
                });
            }
            return u;
        }

        multiline.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in multiline.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        multiline.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in multiline.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        multiline.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in multiline.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        multiline.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        multiline.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        multiline.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        multiline.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in multiline.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        multiline.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        multiline.timeFormat = function(_) {
            if (!arguments.length)
                return timeFormat;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.timeFormat(format) should be string of d3.format');
                    return this;
                } else {
                    timeFormat = d3.time.format(arguments[0]);
                    return this;
                }
            }
        };

        multiline.isLinear = function(_) {
            if (!arguments.length)
                return isLinear;
            else {
                if (isLinear !== true && isLinear !== false) {
                    console.error('The arguments in multiline.isLinear(isLinear) should be bool');
                    return this;
                } else {
                    isLinear = arguments[0];
                    return this;
                }
            }
        };

        multiline.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        multiline.yLegend = function(_) {
            if (!arguments.length)
                return yLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegend = arguments[0];
                    return this;
                }
            }
        };

        multiline.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        multiline.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        multiline.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        multiline.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        multiline.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        multiline.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        multiline.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        multiline.xtickNumber = function(_) {
            if (!arguments.length)
                return xtickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.xtickNumber(xtickNumber) should be number of tick');
                    return this;
                } else {
                    xtickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        multiline.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        multiline.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        multiline.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        multiline.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in multiline.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        multiline.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        multiline.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        multiline.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        multiline.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        multiline.tension = function(_) {
            if (!arguments.length)
                return tension;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in multiline.tension(tension) should be number');
                    return this;
                } else {
                    tension = arguments[0];
                    return this;
                }
            }
        };

        multiline.interpolate = function(_) {
            if (!arguments.length)
                return interpolate;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in multiline.interpolate(interpolate) should be string');
                    return this;
                } else {
                    interpolate = arguments[0];
                    return this;
                }
            }
        };

        multiline.options = function(_) {
            if (!arguments.length)
                return {
                    'type': multiline.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'interpolate': interpolate,
                    'tension': tension,
                    'timeFormat': timeFormat,
                    'isLinear': isLinear,
                    'xLegend': xLegend,
                    'yLegend': yLegend,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'xtickNumber': xtickNumber,
                    'ytickNumber': ytickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'xtickLineLength': xtickLineLength,
                    'ytickLineLength': ytickLineLength,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && multiline.tickFormat(_.format);
                _.fontFamily && multiline.fontFamily(_.fontFamily);
                isFinite(_.duration) && multiline.duration(_.duration);
                isFinite(_.tension) && multiline.tension(_.tension);
                _.isLinear && multiline.isLinear(_.isLinear);
                _.interpolate && multiline.interpolate(_.interpolate);
                _.xLegend && multiline.xLegend(_.xLegend);
                _.yLegend && multiline.yLegend(_.yLegend);
                isFinite(_.xtickRotate) && multiline.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && multiline.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && multiline.labelSize(_.labelSize);
                _.labelColor && multiline.labelColor(_.labelColor);
                isFinite(_.xtickNumber) && multiline.xtickNumber(_.xtickNumber);
                isFinite(_.ytickNumber) && multiline.ytickNumber(_.ytickNumber);
                isFinite(_.tickTextSize) && multiline.tickTextSize(_.tickTextSize);
                _.tickTextColor && multiline.tickTextColor(_.tickTextColor);
                _.tickLineColor && multiline.tickLineColor(_.tickLineColor);
                isFinite(_.xtickLineLength) && multiline.xtickLineLength(_.xtickLineLength);
                isFinite(_.ytickLineLength) && multiline.ytickLineLength(_.ytickLineLength);
                isFinite(_.axisPathWidth) && multiline.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && multiline.axisPathColor(_.axisPathColor);

                _.legendColor && multiline.legendColor(_.legendColor);
                isFinite(_.legendSize) && multiline.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && multiline.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && multiline.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            multiline.options(arguments[0]);
        return multiline;
    };
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
    /**
     * 饼图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.pie = function() {
        var pie = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '饼图'; //类型
        var width = 900; // 宽度
        var height = 700; // 高度
        var widthAvail = width; // 实际利用宽度
        var heightAvail = height; // 实际利用高度
        var tranX = 0; //图形右移距离
        var tranY = 0; //图形下移距离
        var data; //数据
        var fontSize = 10; //字体大小
        var fontFamily = 'Arial'; // 字体样式
        var fontColor = '#000'; //颜色
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = pie.color();

        /************局部变量***************/
        var ease = 'bounce';
        var innerRadius = 0; // 內半径
        var outerRadius = Math.min(widthAvail, heightAvail) * .42; // 外半径

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        pie.data = function(_) {
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
                data = _.map(function(item, index) {
                    return {
                        index: index,
                        value: +item.value,
                        data: +item.value,
                        name: item.name,
                        _flag: true
                    };
                });
                return this;
            } else
                return data;
        };

        pie.getType = function() {
            return type;
        };

        pie.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                pie.log({priority: 'Error', position: 'pie',
                    info: 'The argument(element) in pie.rander(_) should be <div> element'});
                console.error('The argument(element) in pie.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('pie', true)
                    .node();
            /* 初始化变量 */
            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    pie.floatTag(div); //绘图元素的外容器，添加动态标签

            var layout = d3.layout.pie()
                    .value(function(d) {
                        return d.value;
                    })
                    .sort(function(a, b) {
                        return b.value - a.value;
                    });

            var arc = d3.svg.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius);

            var g = d3.select(svg)
                    .attr({'width': width,
                        'height': height})
                    .selectAll('g')
                    .data([1])
                    .enter()
                    .append('svg:g')
                    .attr('transform', 'translate(' + (tranX + outerRadius * 1.2) + ',' + (tranY + outerRadius * 1.2) + ')');

            g.call(function(selection) {
                selection.append('svg:g')
                        .classed('arcs', true);
                selection.append('svg:g')
                        .classed('labels', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg)
                    .select('g');

            var arcs = g.select('.arcs')
                    .datum(data.filter(function(d) {
                        return d._flag;
                    }))
                    .selectAll('path')
                    .data(layout);

            arcs.exit()
                    .attr('opacity', 1)
                    .transition()
                    .duration(duration)
                    .attr('opacity', 0)
                    .remove();
            arcUpdate(arcs, arc);
            arcDraw(arcs, g, arc);

            var labels = g.select('.labels')
                    .datum(data.filter(function(d) {
                        return d._flag;
                    }))
                    .selectAll('.label')
                    .data(layout);

            labels.exit()
                    .attr('opacity', 1)
                    .transition()
                    .duration(duration)
                    .attr('opacity', 0)
                    .remove();
            labelUpdate(labels);
            labelDraw(labels);

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(data);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);
        };

        function arcUpdate(arcs, arc) {
            arcs.transition()
                    .duration(duration)
                    .attrTween('d', function(d) {
                        var q = d3.interpolate(+d3.select(this).attr('data-startAngle'), d.startAngle);
                        var p = d3.interpolate(+d3.select(this).attr('data-endAngle'), d.endAngle);
                        return function(t) {
                            return  arc({startAngle: p(t), endAngle: q(t)});
                        };
                    })
                    .attr('fill', function(d) {
                        return color(d.data.index);
                    })
                    .attr('data-startAngle', function(d) {
                        return d.startAngle;
                    })
                    .attr('data-endAngle', function(d) {
                        return d.endAngle;
                    });
        }

        function arcDraw(arcs, g, arc) {
            arcs.enter()
                    .append('svg:path')
                    .attr('fill', function(d) {
                        return color(d.data.index);
                    })
                    .attr('opacity', 0)
                    .on('mouseover', function(d) {
                        drawLegend(d.data, true);
                    })
                    .on('mouseout', function(d) {
                        drawLegend(d.data, false);
                    })
                    .on('click', function(d) {
                        var that = this;
                        var label = g.select('.labels')
                                .selectAll('.label');
                        var path = g.select('.arcs')
                                .selectAll('path');

                        if (!d3.select(this).classed('out')) {
                            d3.select(this).classed('out', true);
                            var angle = 0.5 * ((d.startAngle + d.endAngle) - Math.PI);
                            var radius = {
                                x: outerRadius * 0.1 * Math.cos(angle),
                                y: outerRadius * 0.1 * Math.sin(angle)
                            };

                            label.each(function(p) {
                                if (p.data.index === d.data.index)
                                    d3.select(this)
                                            .transition()
                                            .duration(duration / 2)
                                            .ease(ease)
                                            .attr('transform', 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                                    + 'translate(' + outerRadius * 1.2 + ',0)');
                            });

                            d3.select(this)
                                    .transition()
                                    .duration(duration / 2)
                                    .ease(ease)
                                    .attr('opacity', 1)
                                    .attr('transform', 'translate(' + (radius.x) + ', ' + (radius.y) + ')');

                            path.filter(function() {
                                return this !== that;
                            })
                                    .transition()
                                    .duration(duration / 2)
                                    .attr('opacity', function() {
                                        return d3.select(this)
                                                .classed('out') ? 1 : .3;
                                    });
                        } else {
                            d3.select(this)
                                    .classed('out', false);
                            label.each(function(p) {
                                if (p.data.index === d.data.index)
                                    d3.select(this)
                                            .transition()
                                            .duration(duration / 2)
                                            .ease(ease)
                                            .attr('transform', 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                                    + 'translate(' + outerRadius + ',0)');
                            });

                            var none = g.select('.arcs')
                                    .selectAll('.out')
                                    .node() ? true : false;

                            d3.select(this)
                                    .transition()
                                    .duration(duration / 2)
                                    .ease(ease)
                                    .attr('transform', '')
                                    .attr('opacity', none ? .3 : 1);

                            path.filter(function() {
                                return this !== that;
                            }).transition()
                                    .duration(duration / 2)
                                    .attr('opacity', function() {
                                        return !none ? 1 : d3.select(this)
                                                .classed('out') ? 1 : .3;
                                    });
                        }
                    })
                    .transition()
                    .duration(duration)
                    .attrTween('d', function(d) {
                        var q = d3.interpolate(d.startAngle, d.endAngle);
                        return function(t) {
                            return  arc({startAngle: d.startAngle, endAngle: q(t)});
                        };
                    })
                    .attr('opacity', 1)
                    .attr('data-startAngle', function(d) {
                        return d.startAngle;
                    })
                    .attr('data-endAngle', function(d) {
                        return d.endAngle;
                    });
        }

        function labelUpdate(labels) {
            labels.transition()
                    .duration(duration)
                    .attrTween('transform', function(d) {
                        var q = d3.interpolate(+d3.select(this).attr('data-Angle'), d.endAngle + d.startAngle);
                        return function(t) {
                            return  'rotate(' + (q(t) * 90 / Math.PI - 87) + ')'
                                    + 'translate(' + outerRadius + ',0)';
                        };
                    })
                    .attr('data-Angle', function(d) {
                        return d.endAngle + d.startAngle;
                    })
                    .select('text')
                    .style('text-anchor', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                    })
                    .attr('transform', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                    })
                    .style({'font-family': fontFamily,
                        'fill': fontColor,
                        'font-size': fontSize})
                    .text(function(d) {
                        return d.endAngle - d.startAngle > .03 ? d.data.name : '...';
                    });


        }

        function labelDraw(labels) {
            labels.enter()
                    .append('svg:g')
                    .classed('label', true)
                    .style({'font-family': fontFamily,
                        'fill': fontColor,
                        'font-size': fontSize})
                    .attr('transform', function(d) {
                        return 'rotate(' + ((d.endAngle + d.startAngle) * 90 / Math.PI - 87) + ')'
                                + 'translate(' + outerRadius + ',0)';
                    })
                    .attr('data-Angle', function(d) {
                        return d.endAngle + d.startAngle;
                    })
                    .append('svg:text')
                    .attr('opacity', 0)
                    .style('text-anchor', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : null;
                    })
                    .attr('transform', function(d) {
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'rotate(180)translate(-16)' : null;
                    })
                    .transition()
                    .duration(duration)
                    .ease('exp')
                    .attr({'x': 8, 'dy': 20})
                    .style('opacity', 1)
                    .text(function(d) {
                        return d.endAngle - d.startAngle > .03 ? d.data.name : '...';
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d) {
                d3.select(this)
                        .select('rect')
                        .transition()
                        .duration(duration)
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': (d.index - d.index % legendColumnNo) / legendColumnNo * legendRowGap +
                                    outerRadius,
                            'y': d.index % legendColumnNo * 20 - outerRadius * 1.1 - 9})
                        .style({'fill': color(d.index),
                            'stroke': color(d.index)});
                d3.select(this)
                        .select('text')
                        .transition()
                        .duration(duration)
                        .attr({'x': (d.index - d.index % legendColumnNo) / legendColumnNo * legendRowGap +
                                    outerRadius + 20,
                            'y': d.index % legendColumnNo * 20 - outerRadius * 1.1})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            d3.select(this)
                                    .classed('none', true);
                            d._flag = false;
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;
                        }
                        pie.render(data);
                    })
                    .each(function(d) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (d.index - d.index % legendColumnNo) /
                                            legendColumnNo * legendRowGap +
                                            outerRadius,
                                    'y': d.index % legendColumnNo * 20 - outerRadius * 1.1 - 9})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(d.index),
                                    'stroke': color(d.index)})
                                .style('fill-opacity', 1)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration)
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 1);

                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (d.index - d.index % legendColumnNo) /
                                            legendColumnNo * legendRowGap +
                                            outerRadius + 20,
                                    'y': d.index % legendColumnNo * 20 - outerRadius * 1.1})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function drawLegend(d, style) {
            if (style) {
                floatTag.style({
                    'border-color': color(d.name),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                }).html('<p style="color:#3f7ed8; font-weight:bold; font-size:11px;margin-bottom:5px;">name: ' +
                        d.name + '</p>value: ' + format(d.value));
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        pie.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        pie.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        pie.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        pie.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        pie.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        pie.fontColor = function(_) {
            if (!arguments.length)
                return fontColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.fontColor(fontColor) should be string of text');
                    return this;
                } else {
                    fontColor = arguments[0];
                    return this;
                }
            }
        };

        pie.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        pie.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in pie.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        pie.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        pie.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in pie.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        pie.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        pie.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        pie.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        pie.ease = function(_) {
            if (!arguments.length)
                return ease;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in pie.ease(ease) should be string');
                    return this;
                } else {
                    ease = arguments[0];
                    return this;
                }
            }
        };

        pie.outerRadius = function(_) {
            if (!arguments.length)
                return outerRadius;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.outerRadius(outerRadius) should be number of');
                    return this;
                } else {
                    outerRadius = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        pie.innerRadius = function(_) {
            if (!arguments.length)
                return innerRadius;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in pie.innerRadius(innerRadius) should be number');
                    return this;
                } else {
                    innerRadius = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        pie.options = function(_) {
            if (!arguments.length)
                return {
                    'type': pie.getType(),
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
                    'outerRadius': outerRadius,
                    'innerRadius': innerRadius,
                    'ease': ease,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap};
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
                _.format && pie.tickFormat(_.format);
                _.fontFamily && pie.fontFamily(_.fontFamily);
                _.fontColor && pie.fontColor(_.fontColor);
                isFinite(_.fontSize) && pie.fontSize(_.fontSize);
                isFinite(_.duration) && pie.duration(_.duration);

                _.ease && pie.ease(_.ease);
                isFinite(_.innerRadius) && pie.innerRadius(_.innerRadius);
                isFinite(_.outerRadius) && pie.outerRadius(_.outerRadius);

                _.legendColor && pie.legendColor(_.legendColor);
                isFinite(_.legendSize) && pie.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && pie.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && pie.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            pie.options(arguments[0]);
        return pie;
    };
    /**
     * 雷达图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.radar = function() {
        var radar = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '雷达图'; //类型
        var width = 700; // 宽度
        var height = 700; // 高度
        var widthAvail = width; // 实际利用宽度
        var heightAvail = height; // 实际利用高度
        var tranX = 0; //图形右移距离
        var tranY = 0; //图形下移距离
        var data; //数据
        var fontSize = 10; //字体大小
        var fontFamily = 'Arial'; // 字体样式
        var fontColor = '#737373'; //颜色
        var legendSize = 13; // 图例文字大小
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('.2s'); // 格式函数
        var color = radar.color();

        /************局部变量***************/
        var radius; // 雷达图半径
        var maxValue; // 数据最大值
        var allAxis; //数据属性数量
        var segs = 6; // 划分层次数量
        var gridColor = 'grey';
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var axisPathWidth = 1;
        var axisPathColor = '#CCCCCC';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        radar.data = function(_) {
            if (arguments.length) {
                if (_.type === 'csv' || _.type === 'tsv') {
                    _ = _.map(function(d) {
                        var data = [];
                        data = pvisual.keys(d)
                                .filter(function(p) {
                                    return p !== 'name';
                                })
                                .map(function(p) {
                                    return {axis: p, value: +d[p]};
                                });
                        return {name: d.name, data: data};
                    });
                } else if (_.type === 'xml') {
                    _ = _.root;
                    _ = _.map(function(d) {
                        var obj = {};
                        d.row.row.forEach(function(p) {
                            var k = pvisual.keys(p)[0];
                            obj[k] = p[k];
                        });
                        return obj;
                    });
                    _ = XMLdata(_);
                } else if (_.type === 'xlsx' || _.type === 'xls') {
                    var s = [];
                    for (var i = 0; i < _.length; i++) {
                        var k = pvisual.keys(_[i])[0];
                        s = s.concat(_[i][k]);
                    }
                    _ = s;
                    _ = _.map(function(d) {
                        var data = [];
                        data = pvisual.keys(d)
                                .filter(function(p) {
                                    return p !== 'name';
                                })
                                .map(function(p) {
                                    return {axis: p, value: +d[p]};
                                });
                        return {name: d.name, data: data};
                    });
                }

                _.forEach(function(d) {
                    d._flag = true;
                });
                data = _;
                return this;
            } else
                return data;
        };

        radar.getType = function() {
            return type;
        };

        radar.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in radar.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('radar', true)
                    .node();

            /* 计算要需的数据值 */
            radius = Math.min(widthAvail, heightAvail) * .4;

            maxValue = d3.max(data, function(d) {
                if (d._flag)
                    return d3.max(d.data.map(function(p) {
                        return p.value;
                    }));
                else
                    return 0;
            });

            allAxis = d3.set();

            data.forEach(function(d) {
                d.data.forEach(function(p) {
                    allAxis.add(p.axis);
                });
            });

            allAxis = allAxis.values();

            data.forEach(function(d) {
                d.data.forEach(function(p) {
                    p.index = allAxis.indexOf(p.axis);
                });
            });

            data.forEach(function(d) {
                d.data.forEach(function(p) {
                    p.position = [widthAvail / 2 - radius * ((parseFloat(
                                Math.max(p.value, 0)) / maxValue) *
                                Math.sin(p.index * 2 * Math.PI / allAxis.length)),
                        heightAvail / 2 - radius * ((parseFloat(
                                Math.max(p.value, 0)) / maxValue) *
                                Math.cos(p.index * 2 * Math.PI / allAxis.length))];
                });
            });

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
                        .classed('levels', true); // 网格线
                selection.append('svg:g')
                        .classed('ticks', true); //刻度
                selection.append('svg:g')
                        .classed('items', true); //数据项
                selection.append('svg:g')
                        .classed('axises', true); //坐标
                selection.append('svg:g')
                        .classed('legends', true); // 图例
            });
            g = d3.select(svg)
                    .select('g');

            /* 绘制数据点 */
            var items = g.select('.items')
                    .selectAll('.item')
                    .data(data.filter(function(d) {
                        return d._flag;
                    }));
            items.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            var tooltip = g.select('.items')
                    .selectAll('.mark')
                    .data([1])
                    .enter()
                    .append('svg:text')
                    .classed('mark', true)
                    .style({'opacity': 0,
                        'font-family': fontFamily,
                        'fill': fontColor,
                        'font-size': fontSize});
            dataUpdate(items, tooltip);
            dataDraw(items, tooltip);

            /* 绘制网格线 */
            var loops = g.select('.levels')
                    .selectAll('.level')
                    .data(d3.range(segs));
            loops.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            loopsUpdate(loops);
            loopsDraw(loops);

            /* 绘制刻度 */
            var ticks = g.select('.ticks')
                    .selectAll('.tick')
                    .data(d3.range(segs));
            ticks.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            ticksUpdate(ticks);
            ticksDraw(ticks);

            /* 绘制坐标轴 */
            var axises = g.select('.axises')
                    .selectAll('.axis')
                    .data(allAxis);
            axises.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            axisesUpdate(axises);
            axisesDraw(axises);

            /* 绘制图例 */
            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(data);
            legends.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);
        };

        function dataDraw(items, tooltip) {
            var line = d3.svg.line()
                    .x(function(d) {
                        return d.position[0];
                    })
                    .y(function(d) {
                        return d.position[1];
                    });
            items.enter()
                    .append('svg:g')
                    .classed('item', true)
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:path')
                                .classed('radar', true)
                                .on('mouseover', function() {
                                    var that = this;
                                    items.selectAll('.radar')
                                            .each(function() {
                                                if (this !== that)
                                                    d3.select(this)
                                                            .transition(200)
                                                            .style('fill-opacity', 0.1);
                                                else
                                                    d3.select(that).transition(200)
                                                            .style('fill-opacity', .7);
                                            });
                                })
                                .on('mouseout', function() {
                                    items.selectAll('.radar')
                                            .transition(200)
                                            .style('fill-opacity', .5);
                                })
                                .style({'stroke-width': '2px',
                                    'fill-opacity': 0,
                                    'stroke-opacity': 0,
                                    'stroke': color(i),
                                    'fill': color(i)})
                                .transition()
                                .duration(duration)
                                .style({'fill-opacity': .5,
                                    'stroke-opacity': 1})
                                .attr('d', function() {
                                    var p = radar.clone(d.data);
                                    p.push(p[0]);
                                    return line(p);
                                });
                        var node = d3.select(this)
                                .append('svg:g')
                                .classed('nodes', true)
                                .selectAll('.node')
                                .data(d.data);
                        node.exit()
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 0)
                                .remove();
                        node.enter().append('svg:circle')
                                .classed('node', true)
                                .style({'fill': color(i),
                                    'fill-opacity': 0})
                                .on('mouseover', function(d) {
                                    var that = this;
                                    items.selectAll('.radar')
                                            .each(function() {
                                                if (this !== that)
                                                    d3.select(this)
                                                            .transition(200)
                                                            .style('fill-opacity', 0.1);
                                                else
                                                    d3.select(that)
                                                            .transition(200)
                                                            .style('fill-opacity', .7);
                                            });
                                    tooltip.attr('x', parseFloat(d3.select(that).attr('cx')) - 10)
                                            .attr('y', parseFloat(d3.select(that).attr('cy')) - 5)
                                            .text(format(d.value))
                                            .transition(200)
                                            .style('opacity', 1);
                                })
                                .on('mouseout', function() {
                                    items.selectAll('.radar')
                                            .transition(200)
                                            .style('fill-opacity', .5);
                                    tooltip.transition(200)
                                            .style('opacity', 0);
                                })
                                .transition()
                                .duration(duration)
                                .style('fill-opacity', .9)
                                .attr('r', 4)
                                .attr('cx', function(d) {
                                    return d.position[0];
                                })
                                .attr('cy', function(d) {
                                    return d.position[1];
                                })
                                .attr('data-id', function(d) {
                                    return d.axis;
                                });
                    });
        }

        function dataUpdate(items, tooltip) {
            var line = d3.svg.line()
                    .x(function(d) {
                        return d.position[0];
                    })
                    .y(function(d) {
                        return d.position[1];
                    });
            items.each(function(d, i) {
                d3.select(this)
                        .selectAll('.radar')
                        .transition()
                        .duration(duration)
                        .style({'stroke': color(i),
                            'fill': color(i)})
                        .attr('d', function() {
                            var p = radar.clone(d.data);
                            p.push(p[0]);
                            return line(p);
                        });
                var node = d3.select(this)
                        .selectAll('.nodes')
                        .selectAll('.node')
                        .data(d.data);
                node.exit()
                        .transition()
                        .duration(duration / 2)
                        .style('opacity', 0)
                        .remove();
                node.transition()
                        .duration(duration)
                        .style('fill', color(i))
                        .attr('r', 4)
                        .attr('cx', function(d) {
                            return d.position[0];
                        })
                        .attr('cy', function(d) {
                            return d.position[1];
                        })
                        .attr('data-id', function(d) {
                            return d.axis;
                        });
                node.enter()
                        .append('svg:circle')
                        .classed('node', true)
                        .style({'fill': color(i),
                            'fill-opacity': 0})
                        .on('mouseover', function(d) {
                            var that = this;
                            items.selectAll('.radar').each(function() {
                                if (this !== that)
                                    d3.select(this)
                                            .transition(200)
                                            .style('fill-opacity', 0.1);
                                else
                                    d3.select(that)
                                            .transition(200)
                                            .style('fill-opacity', .7);
                            });
                            tooltip.attr('x', parseFloat(d3.select(that).attr('cx')) - 10)
                                    .attr('y', parseFloat(d3.select(that).attr('cy')) - 5)
                                    .text(format(d.value))
                                    .transition(200)
                                    .style('opacity', 1);
                        })
                        .on('mouseout', function() {
                            items.selectAll('.radar')
                                    .transition(200)
                                    .style('fill-opacity', .5);
                            tooltip.transition(200)
                                    .style('opacity', 0);
                        })
                        .transition()
                        .duration(duration)
                        .style('fill-opacity', .9)
                        .attr('r', 4)
                        .attr('cx', function(d) {
                            return d.position[0];
                        })
                        .attr('cy', function(d) {
                            return d.position[1];
                        })
                        .attr('data-id', function(d) {
                            return d.axis;
                        });
            });
        }

        function loopsDraw(loops) {
            loops.enter()
                    .append('svg:g')
                    .classed('level', true)
                    .each(function(d) {
                        var levelFactor = radius * (++d / segs);
                        var line = d3.select(this)
                                .selectAll('.line')
                                .data(allAxis);
                        line.exit()
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 0)
                                .remove();
                        line.enter()
                                .append('svg:line')
                                .classed('line', true)
                                .style({'stroke': gridColor,
                                    'stroke-dasharray': '3,1',
                                    'stroke-opacity': '0',
                                    'stroke-width': 1})
                                .transition()
                                .duration(duration)
                                .attr('x1', function(p, i) {
                                    return widthAvail / 2 - levelFactor * Math.sin(i *
                                            2 * Math.PI / allAxis.length);
                                })
                                .attr('y1', function(p, i) {
                                    return heightAvail / 2 - levelFactor * Math.cos(i *
                                            2 * Math.PI / allAxis.length);
                                })
                                .attr('x2', function(p, i) {
                                    return widthAvail / 2 - levelFactor * Math.sin((i + 1) *
                                            2 * Math.PI / allAxis.length);
                                })
                                .attr('y2', function(p, i) {
                                    return heightAvail / 2 - levelFactor * Math.cos((i + 1) *
                                            2 * Math.PI / allAxis.length);
                                })
                                .style('stroke-opacity', .75);
                    });
        }

        function loopsUpdate(loops) {
            loops.each(function(d) {
                var levelFactor = radius * (++d / segs);
                var line = d3.select(this)
                        .selectAll('.line')
                        .data(allAxis);
                line.exit()
                        .transition()
                        .duration(duration / 2)
                        .style('opacity', 0)
                        .remove();
                line.transition()
                        .duration(duration)
                        .attr('x1', function(p, i) {
                            return widthAvail / 2 - levelFactor * Math.sin(i *
                                    2 * Math.PI / allAxis.length);
                        })
                        .attr('y1', function(p, i) {
                            return heightAvail / 2 - levelFactor * Math.cos(i *
                                    2 * Math.PI / allAxis.length);
                        })
                        .attr('x2', function(p, i) {
                            return widthAvail / 2 - levelFactor * Math.sin((i + 1) *
                                    2 * Math.PI / allAxis.length);
                        })
                        .attr('y2', function(p, i) {
                            return heightAvail / 2 - levelFactor * Math.cos((i + 1) *
                                    2 * Math.PI / allAxis.length);
                        });

                line.enter()
                        .append('svg:line')
                        .classed('line', true)
                        .style({'stroke': gridColor,
                            'stroke-dasharray': '3,1',
                            'stroke-opacity': '0',
                            'stroke-width': 1})
                        .transition()
                        .duration(duration)
                        .attr('x1', function(p, i) {
                            return widthAvail / 2 - levelFactor * Math.sin(i *
                                    2 * Math.PI / allAxis.length);
                        })
                        .attr('y1', function(p, i) {
                            return heightAvail / 2 - levelFactor * Math.cos(i *
                                    2 * Math.PI / allAxis.length);
                        })
                        .attr('x2', function(p, i) {
                            return widthAvail / 2 - levelFactor * Math.sin((i + 1) *
                                    2 * Math.PI / allAxis.length);
                        })
                        .attr('y2', function(p, i) {
                            return heightAvail / 2 - levelFactor * Math.cos((i + 1) *
                                    2 * Math.PI / allAxis.length);
                        })
                        .style('stroke-opacity', .75);
            });
        }

        function ticksDraw(ticks) {
            ticks.enter()
                    .append('svg:text')
                    .classed('tick', true)
                    .each(function(d) {
                        var levelFactor = radius * (++d / segs);
                        d3.select(this)
                                .style({'font-family': fontFamily,
                                    'fill': fontColor,
                                    'font-size': fontSize})
                                .transition()
                                .duration(duration)
                                .attr('x', function() {
                                    return widthAvail / 2 - levelFactor * Math.sin(0) + 2;
                                })
                                .attr('y', function() {
                                    return heightAvail / 2 - levelFactor * Math.cos(0);
                                })
                                .text(format(d * maxValue / segs));
                    });
        }

        function ticksUpdate(ticks) {
            ticks.each(function(d) {
                var levelFactor = radius * (++d / segs);
                d3.select(this)
                        .transition()
                        .duration(duration)
                        .style({'font-family': fontFamily,
                            'fill': fontColor,
                            'font-size': fontSize})
                        .attr('x', function() {
                            return widthAvail / 2 - levelFactor * Math.sin(0) + 2;
                        })
                        .attr('y', function() {
                            return heightAvail / 2 - levelFactor * Math.cos(0);
                        })
                        .text(format(d * maxValue / segs));
            });
        }

        function axisesDraw(axises) {
            axises.enter()
                    .append('svg:g')
                    .classed('axis', true)
                    .each(function(d, i) {
                        var index = +(d3.select(this).attr('data-index') || 0);
                        var line = d3.select(this)
                                .selectAll('.line')
                                .data([d]);

                        line.exit()
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 0)
                                .remove();

                        line.enter()
                                .append('svg:line')
                                .classed('line', true)
                                .style({'stroke': axisPathColor,
                                    'stroke-width': axisPathWidth})
                                .attr({'x1': widthAvail / 2,
                                    'y1': heightAvail / 2})
                                .transition()
                                .duration(duration)
                                .attrTween('x2', function() {
                                    var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                            Math.PI / allAxis.length);
                                    return function(t) {
                                        return  widthAvail / 2 - radius * Math.sin(q(t));
                                    };
                                })
                                .attrTween('y2', function() {
                                    var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                            Math.PI / allAxis.length);
                                    return function(t) {
                                        return  heightAvail / 2 - radius * Math.cos(q(t));
                                    };
                                });

                        var text = d3.select(this)
                                .selectAll('.text')
                                .data([d]);
                        text.exit()
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 0)
                                .remove();
                        text.enter()
                                .append('svg:text')
                                .classed('text', true)
                                .style({'font-family': tickTextColor,
                                    'font-size': tickTextSize,
                                    'opacity': 0})
                                .attr({'transform': 'translate(0, -10)',
                                    'text-anchor': 'middle',
                                    'dy': '1.5em'})
                                .transition()
                                .duration(duration)
                                .attrTween('x', function() {
                                    var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                            Math.PI / allAxis.length);
                                    return function(t) {
                                        return  widthAvail / 2 - radius * .85 * Math.sin(q(t)) -
                                                60 * Math.sin(q(t));
                                    };
                                })
                                .attrTween('y', function() {
                                    var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                            Math.PI / allAxis.length);
                                    return function(t) {
                                        return  heightAvail / 2 - radius * Math.cos(q(t)) -
                                                20 * Math.cos(q(t));
                                    };
                                })
                                .style('opacity', 1)
                                .text(d);

                        d3.select(this)
                                .attr('data-index', i / allAxis.length);
                    });
        }

        function axisesUpdate(axises) {
            axises.each(function(d, i) {
                var index = +(d3.select(this)
                        .attr('data-index') || 0);
                var line = d3.select(this)
                        .selectAll('.line');
                line.transition()
                        .duration(duration)
                        .style({'stroke': axisPathColor,
                            'stroke-width': axisPathWidth})
                        .attrTween('x2', function() {
                            var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                    Math.PI / allAxis.length);
                            return function(t) {
                                return  widthAvail / 2 - radius * Math.sin(q(t));
                            };
                        })
                        .attrTween('y2', function() {
                            var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                    Math.PI / allAxis.length);
                            return function(t) {
                                return  heightAvail / 2 - radius * Math.cos(q(t));
                            };
                        });

                var text = d3.select(this)
                        .selectAll('.text');
                text
                        .style({'font-family': tickTextColor,
                            'font-size': tickTextSize})
                        .transition()
                        .duration(duration)
                        .attrTween('x', function() {
                            var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                    Math.PI / allAxis.length);
                            return function(t) {
                                return  widthAvail / 2 - radius * .85 * Math.sin(q(t)) -
                                        60 * Math.sin(q(t));
                            };
                        })
                        .attrTween('y', function() {
                            var q = d3.interpolate(index * 2 * Math.PI, i * 2 *
                                    Math.PI / allAxis.length);
                            return function(t) {
                                return  heightAvail / 2 - radius * Math.cos(q(t)) -
                                        20 * Math.cos(q(t));
                            };
                        })
                        .text(d);

                d3.select(this)
                        .attr('data-index', i / allAxis.length);
            });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (data.length > 1) {
                                d3.select(this).classed('none', true);
                                for (var j = 0, k; j < data.length; j++) {
                                    k = data[j];
                                    if (k.name === d.name) {
                                        k._flag = false;
                                        break;
                                    }
                                }
                                radar.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            for (var j = 0, k; j < data.length; j++) {
                                k = data[j];
                                if (k.name === d.name) {
                                    k._flag = true;
                                    break;
                                }
                            }
                            radar.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            radius * 2,
                                    'y': i % legendColumnNo * 20 + 10})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            radius * 2 + 20,
                                    'y': i % legendColumnNo * 20 + 19})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    radius * 2,
                            'y': i % legendColumnNo * 20 + 10});

                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    radius * 2) + 20,
                            'y': i % legendColumnNo * 20 + 19})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function XMLdata(d) {
            var u;
            if (typeof d === 'object' && d.constructor === Array) {
                u = d.map(function(p) {
                    var axis;
                    var value;
                    var data = p.data.data.map(function(k) {
                        k.row.row.forEach(function(o) {
                            if (o.axis !== undefined)
                                axis = o.axis;
                            if (o.value !== undefined)
                                value = o.value;
                        });
                        return {axis: axis, value: value};

                    });
                    return {name: p.name, data: data};
                });
            }
            return u;
        }

        radar.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in radar.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        radar.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in radar.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        radar.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in radar.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        radar.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        radar.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        radar.fontColor = function(_) {
            if (!arguments.length)
                return fontColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.fontColor(fontColor) should be string of text');
                    return this;
                } else {
                    fontColor = arguments[0];
                    return this;
                }
            }
        };

        radar.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        radar.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in radar.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        radar.gridColor = function(_) {
            if (!arguments.length)
                return gridColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.gridColor(gridColor) should be string');
                    return this;
                } else {
                    gridColor = arguments[0];
                    return this;
                }
            }
        };

        radar.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        radar.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        radar.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        radar.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        radar.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        radar.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in radar.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        radar.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        radar.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in radar.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        radar.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        radar.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        radar.segNumber = function(_) {
            if (!arguments.length)
                return segs;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in radar.segNumber(number) should be number of svg');
                    return this;
                } else {
                    segs = arguments[0];
                    return this;
                }
            }
        };

        radar.options = function(_) {
            if (!arguments.length)
                return {'width': width,
                    'height': height,
                    'format': format,
                    'segnumber': segs,
                    'fontSize': fontSize,
                    'fontFamily': fontFamily,
                    'legendsize': legendSize,
                    'duration': duration};
            else if (typeof _ !== 'object') {
                radar.log({priority: 'Warning', position: 'radar',
                    info: 'The arguments in radar.options(options) should be object'});
                console.error('The arguments in radar.options(options) should be object');
                return this;
            } else {
                width = isFinite(_.width) ? _.width : width;
                height = isFinite(_.width) ? _.height : height;
                format = (_.format && typeof _.format === 'function') ? _.format : format;
                segs = isFinite(_.segnumber) ? _.segnumber : segs;
                fontSize = isFinite(_.fontSize) ? _.fontSize : fontSize;
                legendSize = isFinite(_.legendsize) ? _.legendsize : legendSize;
                fontFamily = _.fontFamily || fontFamily;
                duration = isFinite(_.duration) || duration;
                return this;
            }
        };

        radar.options = function(_) {
            if (!arguments.length)
                return {
                    'type': radar.getType(),
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
                    'segNumber': segs,
                    'gridColor': gridColor,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && radar.tickFormat(_.format);
                _.fontFamily && radar.fontFamily(_.fontFamily);
                _.fontColor && radar.fontColor(_.fontColor);
                isFinite(_.fontSize) && radar.fontSize(_.fontSize);
                isFinite(_.duration) && radar.duration(_.duration);

                isFinite(_.segNumber) && radar.segNumber(_.segNumber);
                _.gridColor && radar.gridColor(_.gridColor);
                isFinite(_.tickTextSize) && radar.tickTextSize(_.tickTextSize);
                _.tickTextColor && radar.tickTextColor(_.tickTextColor);
                isFinite(_.axisPathWidth) && radar.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && radar.axisPathColor(_.axisPathColor);

                _.legendColor && radar.legendColor(_.legendColor);
                isFinite(_.legendSize) && radar.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && radar.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && radar.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            radar.options(arguments[0]);
        return radar;
    };
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
    /**
     * 三电2矩阵图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.scatterplot = function() {
        var scatterplot = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        /************全局变量***************/
        var type = '散点矩阵'; //类型
        var width = 800; // 宽度
        var height = 800; // 高度
        var widthAvail = width - 150; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 20; //图形右移距离
        var tranY = 20; //图形下移距离
        var data; //数据
        var fontFamily = 'Arial'; // 字体样式
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('.3s');
        var color = scatterplot.color();

        /************局部变量***************/
        var radius;
        var nodesize = 2;
        var dimension;
        var padding = .05;
        var gap;

        /******坐标轴******/
        var xtickRotate = 0;
        var ytickRotate = 0;
        var tickNumber = 5;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var labelSize = 8;
        var labelColor = 'normal';

        /******图例******/
        var legendColor = '#000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        scatterplot.data = function(_) {
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
                var name = pvisual.keys(_[0]).filter(function(p) {
                    return p !== 'species';
                });
                name.forEach(function(d) {
                    _.forEach(function(p) {
                        p[d] = +p[d];
                    });
                });
                dimension = name.map(function(d) {
                    return {name: d, _flag: true, extent: d3.extent(_, function(p) {
                            return p[d];
                        })};
                });
                dimension.species =
                        d3.set(_.map(function(d) {
                            return d.species;
                        })).values();
                data = _;
                return this;
            } else
                return data;
        };

        scatterplot.getType = function() {
            return type;
        };

        scatterplot.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                scatterplot.log({priority: 'Error', position: 'scatterplot',
                    info: 'The argument(element) in scatterplot.rander(_) should be <div> element'});
                console.error('The argument(element) in scatterplot.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('scatterplot', true)
                    .node();

            /* 初始化变量 */
            var dimen = dimension.filter(function(d) {
                return d._flag;
            });
            radius = d3.min([widthAvail, heightAvail]) / dimen.length;
            gap = padding * radius;

            var x = {};
            var y = {};

            dimen.forEach(function(d) {
                x[d.name] = d3.scale.linear()
                        .domain(d.extent)
                        .range([gap / 2, radius - gap / 2]);
                y[d.name] = d3.scale.linear()
                        .domain(d.extent)
                        .range([radius - gap / 2, gap / 2]);
            });

            var axis = d3.svg.axis()
                    .ticks(tickNumber)
                    .tickSize(radius * dimen.length);
            // Brush.
            var brush = d3.svg.brush()
                    .on('brushstart', brushstart)
                    .on('brush', brush)
                    .on('brushend', brushend);

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
                selection.append('svg:g')
                        .classed('labels', true);
            });
            g = d3.select(svg).select('g');

            var labels = g.select('.labels')
                    .selectAll('.label')
                    .data(dimen);

            labels.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            labelUpdate(labels);
            labelDraw(labels);

            var dimensions = g.select('.dimensions')
                    .selectAll('.dimension')
                    .data(cross(dimen, dimen));

            dimensions.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            dimensions.each(function(p) {
                var cell = d3.select(this);
                cell.transition()
                        .duration(duration)
                        .attr('transform', function(d) {
                            return 'translate(' + d.i * radius + ',' + d.j * radius + ')';
                        });

                cell.select('.frame')
                        .attr({'x': gap / 2,
                            'y': gap / 2,
                            'width': radius - gap,
                            'height': radius - gap
                        });

                var circles = cell.selectAll('circle')
                        .data(data);

                circles.exit()
                        .transition()
                        .duration(duration)
                        .style('opacity', 0)
                        .remove();

                circles
                        .attr('class', function(d) {
                            return d.species;
                        })
                        .transition()
                        .duration(duration)
                        .attr('fill', function(d) {
                            return color(d.species);
                        })
                        .attr('cx', function(d) {
                            return x[p.x.name](d[p.x.name]);
                        })
                        .attr('cy', function(d) {
                            return y[p.y.name](d[p.y.name]);
                        });

                circles.enter()
                        .append('svg:circle')
                        .attr('class', function(d) {
                            return d.species;
                        })
                        .attr('fill', function(d) {
                            return color(d.species);
                        })
                        .attr('cx', function(d) {
                            return x[p.x.name](d[p.x.name]);
                        })
                        .attr('cy', function(d) {
                            return y[p.y.name](d[p.y.name]);
                        })
                        .attr('r', nodesize);

                cell.call(brush.x(x[p.x.name]).y(y[p.y.name]));
            });


            dimensions.enter()
                    .append('svg:g')
                    .classed('dimension', true)
                    .attr('transform', function(d) {
                        return 'translate(' + d.i * radius + ',' + d.j * radius + ')';
                    })
                    .each(function(p) {
                        var cell = d3.select(this);
                        cell.append('svg:rect')
                                .classed('frame', true)
                                .attr({'x': gap / 2,
                                    'y': gap / 2,
                                    'width': radius - gap,
                                    'height': radius - gap,
                                    'fill': 'none',
                                    'stroke': '#444444',
                                    'stroke-width': '1px'
                                });

                        cell.selectAll('circle')
                                .data(data)
                                .enter()
                                .append('svg:circle')
                                .attr('class', function(d) {
                                    return d.species;
                                })
                                .attr('fill', function(d) {
                                    return color(d.species);
                                })
                                .attr('cx', function(d) {
                                    return x[p.x.name](d[p.x.name]);
                                })
                                .attr('cy', function(d) {
                                    return y[p.y.name](d[p.y.name]);
                                })
                                .attr('r', nodesize);
                        cell.call(brush.x(x[p.x.name]).y(y[p.y.name]));
                    });

            g.select('.dimensions')
                    .selectAll('.dimension')
                    .selectAll('.extent')
                    .style({
                        'fill': '#000',
                        'fill-opacity': .1,
                        'stroke': '#fff'
                    });

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends, dimen);


            axisDraw(g, axis, x, y, dimen);

            function brushstart(p) {
                if (brush.data !== p) {
                    dimensions.call(brush.clear());
                    brush.x(x[p.x.name]).y(y[p.y.name]).data = p;
                }
            }

            function brush(p) {
                var e = brush.extent();
                g.select('.dimensions')
                        .selectAll('.dimension')
                        .selectAll('circle')
                        .attr('class', function(d) {
                            return e[0][0] <= d[p.x.name] && d[p.x.name] <= e[1][0]
                                    && e[0][1] <= d[p.y.name] && d[p.y.name] <= e[1][1]
                                    ? d.species : 'none';
                        })
                        .attr('fill', function(d) {
                            return  d3.select(this).classed('none') ?
                                    '#AAAAAA' : color(d.species);
                        });
            }

            function brushend() {
                if (brush.empty())
                    g.select('.dimensions')
                            .selectAll('.dimension')
                            .selectAll('circle')
                            .attr('class', function(d) {
                                return d.species;
                            })
                            .attr('fill', function(d) {
                                return color(d.species);
                            });
            }
        };

        function labelUpdate(labels) {
            labels.each(function(d, i) {
                d3.select(this)
                        .select('.x')
                        .text(d.name)
                        .transition()
                        .duration(duration)
                        .attr('transform', 'translate(' + (i + .5) * radius + ',0)')
                        .style({'text-anchor': 'middle',
                            'fill': labelColor,
                            'font-family': fontFamily,
                            'font-size': labelSize});

                d3.select(this)
                        .select('.y')
                        .text(d.name)
                        .transition()
                        .duration(duration)
                        .attr('transform', 'translate(-5,' + (i + .5) * radius + ')rotate(-90)')
                        .style({'text-anchor': 'middle',
                            'fill': labelColor,
                            'font-family': fontFamily,
                            'font-size': labelSize});
            });
        }

        function labelDraw(labels) {
            labels.enter()
                    .append('svg:g')
                    .classed('label', true)
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:text')
                                .classed('x', true)
                                .text(d.name)
                                .attr('transform', 'translate(' + (i + .5) * radius + ',0)')
                                .style({'text-anchor': 'middle',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor});


                        d3.select(this)
                                .append('svg:text')
                                .classed('y', true)
                                .text(d.name)
                                .attr('transform', 'translate(-5,' + (i + .5) * radius + ')rotate(-90)')
                                .style({'text-anchor': 'middle',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor});

                    });
        }

        function legendDraw(legends, dimen) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimen.length > 1) {
                                d3.select(this).classed('none', true);
                                d._flag = false;
                                scatterplot.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;

                            scatterplot.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);

                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});
                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function axisDraw(g, axis, x, y, dimen) {
            var ax = g.select('.x-axis')
                    .selectAll('.x')
                    .data(dimen);

            ax.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            ax.transition()
                    .duration(duration)
                    .attr('transform', function(d, i) {
                        return 'translate(' + i * radius + ',0)';
                    })
                    .each(function(d) {
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(axis.scale(x[d.name]).orient('bottom'));
                    });

            ax.enter()
                    .append('svg:g')
                    .classed('x', true)
                    .attr('transform', function(d, i) {
                        return 'translate(' + i * radius + ',0)';
                    })
                    .each(function(d) {
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(axis.scale(x[d.name]).orient('bottom'));
                    });

            var ay = g.select('.y-axis')
                    .selectAll('.y')
                    .data(dimen);

            ay.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            ay.transition()
                    .duration(duration)
                    .attr('transform', function(d, i) {
                        return 'translate(0,' + i * radius + ')';
                    })
                    .each(function(d) {
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(axis.scale(y[d.name]).orient('right'));
                    });

            ay.enter()
                    .append('svg:g')
                    .classed('y', true)
                    .attr('transform', function(d, i) {
                        return 'translate(0,' + i * radius + ')';
                    })
                    .each(function(d) {
                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(axis.scale(y[d.name]).orient('right'));
                    });

            g.selectAll('.axis')
                    .call(function(selection) {
                        selection
                                .style('shape-rendering', 'crispEdges')
                                .selectAll('path')
                                .style('display', 'none');

                        selection
                                .selectAll('line')
                                .style({'fill': 'none',
                                    'stroke-dasharray': '3,1',
                                    'stroke': tickLineColor,
                                    'shape-rendering': 'crispEdges'});
                    });
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength() *
                                        (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
                                + ')rotate(' + xtickRotate + ')';
                    });
            g.select('.y-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'start',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'rotate(' + ytickRotate + ')';
                    });
        }

        function cross(a, b) {
            var c = [], n = a.length, m = b.length, i, j;
            for (i = - 1; ++i < n; )
                for (j = - 1; ++j < m; )
                    c.push({x: a[i], i: i, y: b[j], j: j});
            return c;
        }

        scatterplot.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in scatterplot.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        scatterplot.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in scatterplot.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        scatterplot.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in scatterplot.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        scatterplot.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in scatterplot.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        scatterplot.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in scatterplot.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in scatterplot.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        scatterplot.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in scatterplot.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        scatterplot.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in scatterplot.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        scatterplot.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        scatterplot.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in scatterplot.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.tickNumber = function(_) {
            if (!arguments.length)
                return tickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.tickNumber(tickNumber) should be number of tick');
                    return this;
                } else {
                    tickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        scatterplot.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in scatterplot.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in scatterplot.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.radius = function(_) {
            if (!arguments.length)
                return nodesize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in scatterplot.radius(radius) should be number');
                    return this;
                } else {
                    nodesize = arguments[0];
                    return this;
                }
            }
        };

        scatterplot.options = function(_) {
            if (!arguments.length)
                return {
                    'type': scatterplot.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'radius': nodesize,
                    'padding': padding,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'tickNumber': tickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && scatterplot.tickFormat(_.format);
                _.fontFamily && scatterplot.fontFamily(_.fontFamily);
                isFinite(_.duration) && scatterplot.duration(_.duration);

                isFinite(_.padding) && scatterplot.padding(_.padding);
                isFinite(_.radius) && scatterplot.radius(_.radius);

                isFinite(_.xtickRotate) && scatterplot.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && scatterplot.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && scatterplot.labelSize(_.labelSize);
                _.labelColor && scatterplot.labelColor(_.labelColor);
                isFinite(_.tickNumber) && scatterplot.tickNumber(_.tickNumber);
                isFinite(_.tickTextSize) && scatterplot.tickTextSize(_.tickTextSize);
                _.tickTextColor && scatterplot.tickTextColor(_.tickTextColor);
                _.tickLineColor && scatterplot.tickLineColor(_.tickLineColor);

                _.legendColor && scatterplot.legendColor(_.legendColor);
                isFinite(_.legendSize) && scatterplot.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && scatterplot.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && scatterplot.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            scatterplot.options(arguments[0]);
        return scatterplot;
    };
    /**
     * 堆叠柱状图
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.stackbar = function() {
        var stackbar = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        var type = '堆叠柱状图'; //类型
        var width = 800; // 宽度
        var height = 400; // 高度
        var widthAvail = width - 200; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var tranX = 50; //图形右移距离
        var tranY = 0; //图形下移距离
        var data; //数据
        var fontFamily = 'Arial'; // 字体样式
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = stackbar.color();

        /************局部变量***************/
        var padding = 0.2;
        var dimension;
        var source;

        /******坐标轴******/
        var yLegend = '';
        var xLegend = '';
        var xtickRotate = 0;
        var ytickRotate = 0;
        var labelSize = 8;
        var labelColor = '#000000';
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = 5;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        stackbar.data = function(_) {
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
                            return d !== 'x';
                        }).map(function(d) {
                    return {name: d, _flag: true};
                });
                source = _.map(function(d) {
                    var y0 = 0;
                    var value = dimension.map(function(p) {
                        return {name: p.name, y0: y0, y1: y0 += +d[p.name]};
                    });
                    var total = value[value.length - 1].y1;
                    return {value: value, total: total, x: d.x};
                });
                dimension.x = _.map(function(p) {
                    return p.x;
                });
                data = _;
                return this;
            } else
                return data;
        };

        stackbar.getType = function() {
            return type;
        };

        stackbar.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                stackbar.log({priority: 'Error', position: 'stackbar',
                    info: 'The argument(element) in stackbar.rander(_) should be <div> element'});
                console.error('The argument(element) in stackbar.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('stackbar', true)
                    .node();

            /* 初始化变量 */
            var x = d3.scale.ordinal()
                    .rangeRoundBands([0, widthAvail], padding);
            var y = d3.scale.linear()
                    .rangeRound([heightAvail, 0]);

            x.domain(dimension.x);
            y.domain([0, d3.max(source, function(d) {
                    return d.total;
                })]);

            var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .tickSize(xtickLineLength);

            var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);

            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    stackbar.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg)
                    .select('g');

            var dimensions = g.selectAll('.dimensions')
                    .selectAll('.dimension')
                    .data(source);

            dimensions.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();

            dimensionUpdate(dimensions, x, y);
            dimensionDraw(dimensions, x, y);

            g = d3.select(svg)
                    .select('g');

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends);


            axis(g, xAxis, yAxis);
        };

        function dimensionUpdate(dimensions, x, y) {
            dimensions
                    .each(function() {
                        var rects = d3.select(this)
                                .selectAll('rect')
                                .data(function(d) {
                                    return d.value;
                                });

                        rects.exit()
                                .transition()
                                .duration(duration)
                                .style('opacity', 0)
                                .remove();

                        rects
                                .transition()
                                .duration(duration)
                                .style('fill', function(d) {
                                    return color(d.name);
                                })
                                .attr('y', function(d) {
                                    return y(d.y1);
                                })
                                .attr('width', x.rangeBand())
                                .attr('height', function(d) {
                                    return y(d.y0) - y(d.y1);
                                });

                        rects.enter()
                                .append('svg:rect')
                                .attr({'height': 0,
                                    'y': y(0),
                                    'width': x.rangeBand()})
                                .style('fill', function(d) {
                                    return color(d.name);
                                })
                                .on('mouseover', function(d) {
                                    drawLegend(d, true);
                                })
                                .on('mouseout', function(d) {
                                    drawLegend(d, false);
                                })
                                .transition()
                                .duration(duration)
                                .attr('y', function(d) {
                                    return y(d.y1);
                                })
                                .attr('height', function(d) {
                                    return y(d.y0) - y(d.y1);
                                });

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', function(d) {
                                    return 'translate(' + x(d.x) + ',0)';
                                });
                    });
        }

        function dimensionDraw(dimensions, x, y) {
            dimensions.enter()
                    .append('svg:g')
                    .classed('dimension', true)
                    .each(function() {
                        d3.select(this)
                                .selectAll('rect')
                                .data(function(d) {
                                    return d.value;
                                })
                                .enter()
                                .append('svg:rect')
                                .attr({'height': 0,
                                    'y': y(0),
                                    'width': x.rangeBand()})
                                .style('fill', function(d) {
                                    return color(d.name);
                                })
                                .on('mouseover', function(d) {
                                    drawLegend(d, true);
                                })
                                .on('mouseout', function(d) {
                                    drawLegend(d, false);
                                })
                                .transition()
                                .duration(duration)
                                .attr('y', function(d) {
                                    return y(d.y1);
                                })
                                .attr('height', function(d) {
                                    return y(d.y0) - y(d.y1);
                                });

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', function(d) {
                                    return 'translate(' + x(d.x) + ',0)';
                                });
                    });
        }

        function legendDraw(legends) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimension.length > 1) {
                                d3.select(this).classed('none', true);
                                d._flag = false;
                                source = data.map(function(d) {
                                    var y0 = 0;
                                    var value = dimension.filter(function(p) {
                                        return p._flag;
                                    }).map(function(p) {
                                        return {name: p.name, y0: y0, y1: y0 += +d[p.name]};
                                    });
                                    var total = value[value.length - 1].y1;
                                    return {value: value, total: total, x: d.x};
                                });
                                stackbar.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;
                            source = data.map(function(d) {
                                var y0 = 0;
                                var value = dimension.filter(function(p) {
                                    return p._flag;
                                }).map(function(p) {
                                    return {name: p.name, y0: y0, y1: y0 += +d[p.name]};
                                });
                                var total = value[value.length - 1].y1;
                                return {value: value, total: total, x: d.x};
                            });

                            stackbar.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'fill': legendColor,
                                    'font-size': legendSize,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});

                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function axis(g, xAxis, yAxis) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + heightAvail + ')')
                                .call(xAxis);
                    });

            g.select('.y-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis);
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
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'middle',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5) + ',' +
                                (this.getComputedTextLength() *
                                        (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
                                + ')rotate(' + xtickRotate + ')';
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

        function drawLegend(d, style) {
            if (style) {
                floatTag.style({
                    'border-color': color(d.name),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                }).html('name: ' + d.name + '<br/>value: ' + format(d.y1 - d.y0));
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        stackbar.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in stackbar.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        stackbar.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in stackbar.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        stackbar.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in stackbar.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        stackbar.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        stackbar.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        stackbar.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        stackbar.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in stackbar.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        stackbar.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        stackbar.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        stackbar.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        stackbar.yLegend = function(_) {
            if (!arguments.length)
                return yLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegend = arguments[0];
                    return this;
                }
            }
        };

        stackbar.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        stackbar.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        stackbar.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        stackbar.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };

        stackbar.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        stackbar.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        stackbar.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        stackbar.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        stackbar.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        stackbar.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        stackbar.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in stackbar.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        stackbar.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        stackbar.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in stackbar.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        stackbar.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        stackbar.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in stackbar.legendRowGap(legendRowGap) should be number of text');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        stackbar.options = function(_) {
            if (!arguments.length)
                return {
                    'type': stackbar.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'padding': padding,
                    'xLegend': xLegend,
                    'yLegend': yLegend,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'ytickNumber': ytickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'xtickLineLength': xtickLineLength,
                    'ytickLineLength': ytickLineLength,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && stackbar.tickFormat(_.format);
                _.fontFamily && stackbar.fontFamily(_.fontFamily);
                isFinite(_.duration) && stackbar.duration(_.duration);

                _.xLegend && stackbar.xLegend(_.xLegend);
                _.yLegend && stackbar.yLegend(_.yLegend);
                isFinite(_.xtickRotate) && stackbar.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && stackbar.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && stackbar.labelSize(_.labelSize);
                _.labelColor && stackbar.labelColor(_.labelColor);
                isFinite(_.padding) && stackbar.padding(_.padding);
                isFinite(_.ytickNumber) && stackbar.ytickNumber(_.ytickNumber);
                isFinite(_.tickTextSize) && stackbar.tickTextSize(_.tickTextSize);
                _.tickTextColor && stackbar.tickTextColor(_.tickTextColor);
                _.tickLineColor && stackbar.tickLineColor(_.tickLineColor);
                isFinite(_.xtickLineLength) && stackbar.xtickLineLength(_.xtickLineLength);
                isFinite(_.ytickLineLength) && stackbar.ytickLineLength(_.ytickLineLength);
                isFinite(_.axisPathWidth) && stackbar.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && stackbar.axisPathColor(_.axisPathColor);

                _.legendColor && stackbar.legendColor(_.legendColor);
                isFinite(_.legendSize) && stackbar.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && stackbar.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && stackbar.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            stackbar.options(arguments[0]);
        return stackbar;
    };
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
    /**
     * surveyplot
     * @returns {_L5.pvisual.extend.sub|Window|Object}
     */
    pvisual.model.surveyplot = function() {
        var surveyplot = pvisual.extend(); //主函數
        var d3 = _.d3; // d3
        var type = 'Surveyplot'; //类型
        var width = 800; // 宽度
        var height = 400; // 高度
        var widthAvail = width - 150; // 实际利用宽度
        var heightAvail = height - 100; // 实际利用高度
        var data; //数据
        var tranX = 30; //图形右移距离
        var tranY = 20; //图形下移距离
        var fontColor = '#000000'; //颜色
        var fontFamily = 'Arial'; // 字体样式
        var floatTag; // 活动标签
        var div; // 外层div
        var svg; // 外层svg
        var duration = 1000; // 变化时间
        var format = d3.format('s');
        var color = surveyplot.color();

        /************局部变量***************/
        var dimension;
        var padding = .1;
        /******坐标轴******/
        var yLegend = '';
        var xLegend = '';
        var xtickRotate = 0;
        var ytickRotate = 0;
        var labelSize = 8;
        var labelColor = '#000000';
        var ytickNumber = 5;
        var xtickLineLength = 5;
        var ytickLineLength = 5;
        var tickTextSize = 8;
        var tickTextColor = '#929292';
        var tickLineColor = '#929292';
        var axisPathWidth = 2;
        var axisPathColor = '#000000';

        /******图例******/
        var legendColor = '#000000';
        var legendSize = 13;
        var legendTranX = 0;
        var legendTranY = 0;
        var legendColumnNo = 10;
        var legendRowGap = 100;

        surveyplot.data = function(_) {
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

                var name = pvisual.keys(_[0]).filter(function(p) {
                    return p !== 'species';
                });
                name.forEach(function(d) {
                    _.forEach(function(p) {
                        p.dimensions = {};
                        p[d] = +p[d];
                    });
                });
                dimension = name.map(function(d) {
                    return {name: d, _flag: true, extent: d3.extent(_, function(p) {
                            return p[d];
                        })};
                });
                dimension.species =
                        d3.set(_.map(function(d) {
                            return d.species;
                        })).values();
                data = _;
                return this;
            } else
                return data;
        };

        surveyplot.getType = function() {
            return type;
        };

        surveyplot.render = function(_) {
            /* 获取外层的标签 */
            div = div || d3.select(_).node();
            if (!div || div.tagName.toLowerCase() !== 'div') {
                console.error('The argument(element) in surveyplot.rander(_) should be <div> element');
            }
            d3.select(div).classed('chart', true);
            svg = svg || d3.select(div)
                    .append('svg')
                    .classed('surveyplot', true)
                    .node();
            /* 初始化变量 */
            var dimen = dimension.filter(function(d) {
                return d._flag;
            });

            var x0 = d3.scale.ordinal();
            var x1 = d3.scale.linear();
            var y = d3.scale.linear();

            x0.rangeRoundBands([0, widthAvail], padding);
            y.rangeRound([heightAvail, 0]);
            x0.domain(dimen.map(function(d) {
                return d.name;
            }));
            y.domain([0, data.length - 1]);

            var xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient('bottom')
                    .tickSize(xtickLineLength);
            var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left')
                    .ticks(ytickNumber)
                    .tickSize(ytickLineLength)
                    .tickFormat(format);

            floatTag = d3.select(div).select('.floatTag').node() ?
                    d3.select(div).select('.floatTag') :
                    surveyplot.floatTag(div); //绘图元素的外容器，添加动态标签

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
                        .classed('x-axis axis', true);
                selection.append('svg:g')
                        .classed('y-axis axis', true);
                selection.append('svg:g')
                        .classed('legends', true);
            });

            g = d3.select(svg).select('g');

            var dimensions = g.select('.dimensions')
                    .selectAll('.dimension')
                    .data(dimen);

            dimensions.exit()
                    .transition()
                    .duration(duration / 2)
                    .style('opacity', 0)
                    .remove();

            dimensionUpdate(dimensions, x0, x1, y, dimen);
            dimensionDraw(dimensions, x0, x1, y, dimen);

            var legends = g.select('.legends')
                    .attr('transform', 'translate(' + legendTranX + ',' + legendTranY + ')')
                    .selectAll('.legend')
                    .data(dimension);
            legends.exit()
                    .transition()
                    .duration(duration)
                    .style('opacity', 0)
                    .remove();
            legendUpdate(legends);
            legendDraw(legends, dimen);

            axis(g, xAxis, yAxis, x0);
        };

        function dimensionUpdate(dimensions, x0, x1, y, dimen) {
            dimensions
                    .transition()
                    .duration(duration)
                    .attr('transform', function(d) {
                        return 'translate(' + x0(d.name) + ', 0)';
                    })
                    .each(function(d) {
                        var everywidth = x0.rangeBand();
                        var everyheight = Math.round(heightAvail / data.length) + 1;

                        x1.domain([0, d.extent[1]])
                                .range([0, everywidth]);

                        var boxs = d3.select(this)
                                .selectAll('.box')
                                .data(data);

                        boxs.exit()
                                .transition()
                                .duration(duration)
                                .style('opacity', 0)
                                .remove();

                        boxs
                                .on('mouseover', function(p) {
                                    dimen.forEach(function(k) {
                                        d3.select(p.dimensions[k.name])
                                                .style('fill', color(data.length));
                                    });

                                    drawLegend(p, true, dimen);
                                })
                                .on('mouseout', function(p) {
                                    dimen.forEach(function(k) {
                                        d3.select(p.dimensions[k.name])
                                                .style('fill', function() {
                                                    return color(p.species);
                                                });
                                    });

                                    drawLegend(p, false, dimen);
                                })
                                .transition()
                                .duration(duration / 2)
                                .style('fill', function(p) {
                                    p.dimensions[d.name] = this;
                                    return color(p.species);
                                })
                                .attr('x', function(p) {
                                    return (everywidth - x1(p[d.name])) / 2;
                                })
                                .attr('y', function(p, i) {
                                    return y(i);
                                })
                                .attr('width', function(p) {
                                    return x1(p[d.name]);
                                })
                                .attr('height', function() {
                                    return everyheight;
                                });

                        boxs.enter()
                                .append('svg:rect')
                                .classed('box', true)
                                .style('stroke', 'none')
                                .style('fill', function(p) {
                                    p.dimensions[d.name] = this;
                                    return color(p.species);
                                })
                                .on('mouseover', function(p) {
                                    dimen.forEach(function(k) {
                                        d3.select(p.dimensions[k.name])
                                                .style('fill', color(data.length));
                                    });

                                    drawLegend(p, true, dimen);
                                })
                                .on('mouseout', function(p) {
                                    dimen.forEach(function(k) {
                                        d3.select(p.dimensions[k.name])
                                                .style('fill', function() {
                                                    return color(p.species);
                                                });
                                    });

                                    drawLegend(p, false, dimen);
                                })
                                .transition()
                                .duration(duration / 2)
                                .attr('x', function(p) {
                                    return (everywidth - x1(p[d.name])) / 2;
                                })
                                .attr('y', function(p, i) {
                                    return y(i);
                                })
                                .attr('width', function(p) {
                                    return x1(p[d.name]);
                                })
                                .attr('height', function() {
                                    return everyheight;
                                });

                    });
        }

        function dimensionDraw(dimensions, x0, x1, y, dimen) {
            dimensions.enter()
                    .append('svg:g')
                    .classed('dimension', true)
                    .transition()
                    .duration(duration)
                    .attr('transform', function(d) {
                        return 'translate(' + x0(d.name) + ', 0)';
                    })
                    .each(function(d) {
                        var everywidth = x0.rangeBand();
                        var everyheight = Math.round(heightAvail / data.length) + 1;

                        x1.domain([0, d.extent[1]])
                                .range([0, everywidth]);

                        d3.select(this)
                                .selectAll('.box')
                                .data(data)
                                .enter()
                                .append('svg:rect')
                                .classed('box', true)
                                .style('stroke', 'none')
                                .style('fill', function(p) {
                                    p.dimensions[d.name] = this;
                                    return color(p.species);
                                })
                                .on('mouseover', function(p) {
                                    dimen.forEach(function(k) {
                                        d3.select(p.dimensions[k.name])
                                                .style('fill', color(data.length));
                                    });

                                    drawLegend(p, true, dimen);
                                })
                                .on('mouseout', function(p) {
                                    dimen.forEach(function(k) {
                                        d3.select(p.dimensions[k.name])
                                                .style('fill', function() {
                                                    return color(p.species);
                                                });
                                    });

                                    drawLegend(p, false, dimen);
                                })
                                .transition()
                                .duration(duration / 2)
                                .attr('x', function(p) {
                                    return (everywidth - x1(p[d.name])) / 2;
                                })
                                .attr('y', function(p, i) {
                                    return y(i);
                                })
                                .attr('width', function(p) {
                                    return x1(p[d.name]);
                                })
                                .attr('height', function() {
                                    return everyheight;
                                });

                    });
        }

        function legendDraw(legends, dimen) {
            legends.enter()
                    .append('svg:g')
                    .classed('legend', true)
                    .style('cursor', 'pointer')
                    .on('click', function(d) {
                        if (!d3.select(this).classed('none')) {
                            if (dimen.length > 1) {
                                d3.select(this).classed('none', true);
                                d._flag = false;
                                surveyplot.render();
                            }
                        } else {
                            d3.select(this).classed('none', false);
                            d._flag = true;

                            surveyplot.render();
                        }
                    })
                    .each(function(d, i) {
                        d3.select(this)
                                .append('svg:rect')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 20,
                                    'y': i % legendColumnNo * 20})
                                .attr({'width': 10,
                                    'height': 10})
                                .style({'fill': color(i),
                                    'stroke': color(i)})
                                .style('fill-opacity', d._flag ? 1 : 0)
                                .style('opacity', 0)
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1);
                        d3.select(this)
                                .append('svg:text')
                                .attr({'x': (i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                            widthAvail + 40,
                                    'y': i % legendColumnNo * 20 + 9})
                                .style({'opacity': 0,
                                    'font-size': legendSize,
                                    'fill': legendColor,
                                    'font-family': fontFamily})
                                .transition()
                                .duration(duration / 2)
                                .style('opacity', 1)
                                .text(d.name);
                    });
        }

        function legendUpdate(legends) {
            legends.each(function(d, i) {
                d3.select(this)
                        .selectAll('rect')
                        .transition()
                        .duration(duration / 2)
                        .style({'fill': color(i),
                            'stroke': color(i)})
                        .style('fill-opacity', d._flag ? 1 : 0)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 20,
                            'y': i % legendColumnNo * 20});
                d3.select(this)
                        .selectAll('text')
                        .transition()
                        .duration(duration / 2)
                        .attr({'x': +((i - i % legendColumnNo) / legendColumnNo * legendRowGap +
                                    widthAvail) + 40,
                            'y': i % legendColumnNo * 20 + 9})
                        .style({'font-size': legendSize,
                            'fill': legendColor,
                            'font-family': fontFamily})
                        .text(d.name);
            });
        }

        function axis(g, xAxis, yAxis) {
            g.select('.x-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .transition()
                                .duration(duration)
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(xLegend);
                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'x': widthAvail,
                                    'y': -6})
                                .text(xLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .attr('transform', 'translate(0,' + (heightAvail + 2) + ')')
                                .call(xAxis);
                    });

            g.select('.y-axis')
                    .each(function() {
                        d3.select(this)
                                .select('.label')
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .text(yLegend);

                        d3.select(this)
                                .selectAll('.label')
                                .data([1])
                                .enter()
                                .append('svg:text')
                                .classed('label', true)
                                .style({'text-anchor': 'end',
                                    'font-family': fontFamily,
                                    'font-size': labelSize,
                                    'fill': labelColor
                                })
                                .attr({'transform': 'rotate(-90)',
                                    'y': 8,
                                    'dy': '.71em'})
                                .text(yLegend);

                        d3.select(this)
                                .transition()
                                .duration(duration)
                                .call(yAxis);
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
            g.select('.x-axis')
                    .selectAll('.tick')
                    .select('text')
                    .style({'text-anchor': 'end',
                        'font-family': fontFamily,
                        'font-size': tickTextSize,
                        'fill': tickTextColor})
                    .attr('transform', function() {
                        return 'translate(' + (this.getComputedTextLength() / 2 + this.getComputedTextLength() *
                                Math.abs(Math.sin(xtickRotate) * .5)) + ',' +
                                (this.getComputedTextLength()
                                        * (.5 * Math.abs(Math.sin(xtickRotate))) + 5)
                                + ')rotate(' + xtickRotate + ')';
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

        function drawLegend(d, style, dimen) {
            if (style) {
                var str = '';
                dimen.forEach(function(p) {
                    str += p.name + '= ' + d[p.name] + '<br/>';
                });

                floatTag.style({
                    'border-color': color(d.species),
                    'opacity': 1,
                    'textAlign': 'center',
                    'margin': 'auto'
                })
                        .html('Attributes:<br/> ' + str + '<br/>' + 'Class: ' + d.species);
            }
            else {
                floatTag.style('opacity', 0);
            }
        }

        surveyplot.size = function(_) {
            if (!arguments.length)
                return [width, height];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in surveyplot.size(width, height) should be number and number of svg');
                return this;
            }
            else {
                width = arguments[0];
                height = arguments[1];
                return this;
            }
        };

        surveyplot.sizeAvail = function(_) {
            if (!arguments.length)
                return [widthAvail, heightAvail];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in surveyplot.sizeAvail(widthAvail, heightAvail) should be number and number of svg');
                return this;
            }
            else {
                widthAvail = arguments[0];
                heightAvail = arguments[1];
                return this;
            }
        };

        surveyplot.tran = function(_) {
            if (!arguments.length)
                return [tranX, tranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in surveyplot.tran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                tranX = arguments[0];
                tranY = arguments[1];
                return this;
            }
        };

        surveyplot.fontSize = function(_) {
            if (!arguments.length)
                return fontSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.fontSize(fontSize) should be number of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.fontFamily = function(_) {
            if (!arguments.length)
                return fontFamily;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.fontFamily(fontFamily) should be string of text');
                    return this;
                } else {
                    fontSize = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.duration = function(_) {
            if (!arguments.length)
                return duration;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.duration(duration) should be number of transition');
                    return this;
                } else {
                    duration = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        surveyplot.color = function(_) {
            if (!arguments.length)
                return color;
            else {
                if (typeof arguments[0] !== 'function') {
                    console.error('The arguments in surveyplot.color(color) should be function of pvisual.color');
                    return this;
                } else {
                    color = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.tickFormat = function(_) {
            if (!arguments.length)
                return format;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.tickFormat(format) should be string of d3.format');
                    return this;
                } else {
                    format = d3.format(arguments[0]);
                    return this;
                }
            }
        };

        surveyplot.xLegend = function(_) {
            if (!arguments.length)
                return xLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.xLegend(xLegend) should be string');
                    return this;
                } else {
                    xLegend = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.yLegend = function(_) {
            if (!arguments.length)
                return yLegend;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.yLegend(yLegend) should be string');
                    return this;
                } else {
                    yLegend = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.xtickRotate = function(_) {
            if (!arguments.length)
                return xtickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.xtickRotate(xtickRotate) should be number of tick');
                    return this;
                } else {
                    xtickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        surveyplot.ytickRotate = function(_) {
            if (!arguments.length)
                return ytickRotate;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.ytickRotate(ytickRotate) should be number of tick');
                    return this;
                } else {
                    ytickRotate = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        surveyplot.labelSize = function(_) {
            if (!arguments.length)
                return labelSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.labelSize(labelSize) should be string');
                    return this;
                } else {
                    labelSize = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.labelColor = function(_) {
            if (!arguments.length)
                return labelColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.labelColor(labelColor) should be string');
                    return this;
                } else {
                    labelColor = arguments[0];
                    return this;
                }
            }
        };


        surveyplot.ytickNumber = function(_) {
            if (!arguments.length)
                return ytickNumber;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.ytickNumber(ytickNumber) should be number of tick');
                    return this;
                } else {
                    ytickNumber = Math.round(arguments[0]);
                    return this;
                }
            }
        };

        surveyplot.tickLineColor = function(_) {
            if (!arguments.length)
                return tickLineColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.tickLineColor(tickLineColor) should be string');
                    return this;
                } else {
                    tickLineColor = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.tickTextSize = function(_) {
            if (!arguments.length)
                return tickTextSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.tickTextSize(tickTextSize) should be number');
                    return this;
                } else {
                    tickTextSize = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.tickTextColor = function(_) {
            if (!arguments.length)
                return tickTextColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.tickTextColor(tickTextColor) should be string');
                    return this;
                } else {
                    tickTextColor = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.axisPathWidth = function(_) {
            if (!arguments.length)
                return axisPathWidth;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.axisPathWidth(axisPathWidth) should be string');
                    return this;
                } else {
                    axisPathWidth = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.axisPathColor = function(_) {
            if (!arguments.length)
                return axisPathColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.axisPathColor(axisPathColor) should be string');
                    return this;
                } else {
                    axisPathColor = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.legendTran = function(_) {
            if (!arguments.length)
                return [legendTranX, legendTranY];
            else if (arguments.length !== 2
                    || !isFinite(arguments[0])
                    || !isFinite(arguments[1])) {
                console.error('The argument(element) in surveyplot.legendTran(tranX, tranY) should be number and number of svg');
                return this;
            }
            else {
                legendTranX = arguments[0];
                legendTranY = arguments[1];
                return this;
            }
        };

        surveyplot.legendSize = function(_) {
            if (!arguments.length)
                return legendSize;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.legendSize(legendSize) should be number of text');
                    return this;
                } else {
                    legendSize = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.legendColor = function(_) {
            if (!arguments.length)
                return legendColor;
            else {
                if (typeof arguments[0] !== 'string') {
                    console.error('The arguments in surveyplot.legendColor(legendColor) should be string of text');
                    return this;
                } else {
                    legendColor = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.legendColumnNo = function(_) {
            if (!arguments.length)
                return legendColumnNo;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.legendColumnNo(legendColumnNo) should be number of text');
                    return this;
                } else {
                    legendColumnNo = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.legendRowGap = function(_) {
            if (!arguments.length)
                return legendRowGap;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.legendRowGap(legendRowGap) should be number');
                    return this;
                } else {
                    legendRowGap = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.padding = function(_) {
            if (!arguments.length)
                return padding;
            else {
                if (!isFinite(arguments[0])) {
                    console.error('The arguments in surveyplot.padding(padding) should be number');
                    return this;
                } else {
                    padding = arguments[0];
                    return this;
                }
            }
        };

        surveyplot.options = function(_) {
            if (!arguments.length)
                return {
                    'type': surveyplot.getType(),
                    'width': width,
                    'height': height,
                    'widthAvail': widthAvail,
                    'heightAvail': heightAvail,
                    'tranX': tranX,
                    'tranY': tranY,
                    'format': format,
                    'fontFamily': fontFamily,
                    'color': color,
                    'duration': duration,
                    'padding': padding,
                    'xLegend': xLegend,
                    'yLegend': yLegend,
                    'xtickRotate': xtickRotate,
                    'ytickRotate': ytickRotate,
                    'labelSize': labelSize,
                    'labelColor': labelColor,
                    'ytickNumber': ytickNumber,
                    'tickTextSize': tickTextSize,
                    'tickTextColor': tickTextColor,
                    'tickLineColor': tickLineColor,
                    'xtickLineLength': xtickLineLength,
                    'ytickLineLength': ytickLineLength,
                    'axisPathWidth': axisPathWidth,
                    'axisPathColor': axisPathColor,
                    'legendColor': legendColor,
                    'legendSize': legendSize,
                    'legendTranX': legendTranX,
                    'legendTranY': legendTranY,
                    'legendColumnNo': legendColumnNo,
                    'legendRowGap': legendRowGap
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
                _.format && surveyplot.tickFormat(_.format);
                _.fontFamily && surveyplot.fontFamily(_.fontFamily);
                isFinite(_.duration) && surveyplot.duration(_.duration);

                isFinite(_.padding) && surveyplot.padding(_.padding);
                _.xLegend && surveyplot.xLegend(_.xLegend);
                _.yLegend && surveyplot.yLegend(_.yLegend);
                isFinite(_.xtickRotate) && surveyplot.xtickRotate(_.xtickRotate);
                isFinite(_.ytickRotate) && surveyplot.ytickRotate(_.ytickRotate);
                isFinite(_.labelSize) && surveyplot.labelSize(_.labelSize);
                _.labelColor && surveyplot.labelColor(_.labelColor);
                isFinite(_.ytickNumber) && surveyplot.ytickNumber(_.ytickNumber);
                isFinite(_.tickTextSize) && surveyplot.tickTextSize(_.tickTextSize);
                _.tickTextColor && surveyplot.tickTextColor(_.tickTextColor);
                _.tickLineColor && surveyplot.tickLineColor(_.tickLineColor);
                isFinite(_.xtickLineLength) && surveyplot.xtickLineLength(_.xtickLineLength);
                isFinite(_.ytickLineLength) && surveyplot.ytickLineLength(_.ytickLineLength);
                isFinite(_.axisPathWidth) && surveyplot.axisPathWidth(_.axisPathWidth);
                _.axisPathColor && surveyplot.axisPathColor(_.axisPathColor);

                _.legendColor && surveyplot.legendColor(_.legendColor);
                isFinite(_.legendSize) && surveyplot.legendSize(_.legendSize);
                legendTranX = isFinite(_.legendTranX) ? _.legendTranX : legendTranX;
                legendTranY = isFinite(_.legendTranY) ? _.legendTranY : legendTranY;
                isFinite(_.legendColumnNo) && surveyplot.legendColumnNo(_.legendColumnNo);
                isFinite(_.legendRowGap) && surveyplot.legendRowGap(_.legendRowGap);
                return this;
            }
        };

        if (arguments.length === 1)
            surveyplot.options(arguments[0]);
        return surveyplot;
    };
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
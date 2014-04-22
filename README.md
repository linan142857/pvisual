# Pvisual.js

<a href="http://pvisualjs.sinaapp.com/"><img src="http://pvisualjs.sinaapp.com/logo.png" align="left" width="85px" height="80px"></a>**Pvisual.js** 是一个基于可缩放矢量图形（Scalable Vector Graphics，SVG）的javascript动态生成数据可视化库。**Pvisual.js**   定位在满足可复用的大众化数据可视化需，基于svg，底层依赖开源图形库d3.js，提供直观、生动、交互、个性化定制的数据可视化图表。图表基于对DOM元素的的操作，支持多种输入和存储，支持动态数据更新。  
　
　　
- [项目主页](http://pvisualjs.sinaapp.com)
- [API文档](http://pvisualjs.sinaapp.com/api.html)
- [样例](http://pvisualjs.sinaapp.com/example.html)  


### For Example:

<img src="http://pvisualjs.sinaapp.com/img/main-page-graph.png" align="left" width="250px" height="250px" hspace="100px"/>
<img src="http://pvisualjs.sinaapp.com/img/main-page-chord.png" align="left" width="250px" height="250px" hspace="100px"/>


## Install
目前处于开发中，并未release正式版本，如需使用，请采用如下方式：

```bash
$ git clone git://github.com/linan142857/pvisual.git
```
需要注意的是 [example](https://github.com/TBEDP/datavjs/tree/master/example) 目录下的例子中有 `ajax` 存在，所以你需要一个服务器来托管这些静态文件。
如果您的computer中装有python，可以键入下面命令在搭建简单的服务器
```python
$ python simpleHTTPserver -m 8000 
```

## Requirements

- [D3.js]("https://github.com/mbostock/d3")
- [canvg.js](http://code.google.com/p/canvg/)
- [rgbcolor.js](http://www.phpied.com/rgb-color-parser-in-javascript/)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js)
- [jsPDF](https://github.com/MrRio/jsPDF)
- [js-xls](https://github.com/SheetJS/js-xls)
- [js-xlxs](https://github.com/SheetJS/js-xlxs)

## License

Pvisual.js 遵循开源协议 [MIT License](https://github.com/linan142857/pvisual/MIT-License).

## Contact

BUPTSSE · 创新项目“UGC数据分析与可视化开源web工具的研究” 创新小组制作
有问题可咨询：
lyl(shuixuling@gmail.com)
如有疑问，或发现Bug，也可[提交Bug](https://github.com/linan142857pviuals/issues/new)

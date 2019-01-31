# loadBar

[![npm (scoped)](https://img.shields.io/npm/v/@onaug6th/load-bar.svg)](https://www.npmjs.com/package/@onaug6th/load-bar)

A beautiful, ~~powerful~~ loadBar. Monitoring request status and show you http request progress.

English | [简体中文](./README.md)

[演示文档/Docs](https://onaug6th.github.io/loadBar/)

## Install
```
npm run dev
```

## Build
```
npm run build
```

## Usage

Using npm:

```bash
npm i @onaug6th/load-bar
```

Using script:

```html
<script src="/dist/loadBar.min.js"></script>
```

## Example

`Place the following <script>s near the end of your pages, right before the closing </body> tag, to enable them. jQuery must come first, then our JavaScript plugins.`

```js
$("body").loadBar();

var options = {...}
$("#other").loadBar(options);
```

## options config
```js
var opt = {
    displayOnRequest: false,
    height: 200,
    endLoad: function(){
        //  do sth
    }
}
$("body").loadBar(opt);
```
| Name | Detail | Type | Default |
| - | - | - | - |
| displayOnRequest | loadBar display on request | `Boolean` | `true` |
| background | loadBar backgrond color | `String` | `#29d` |
| img | use image? | `String` |  |
| height | loadBar height | `Number, String` | `2px` |
| all | every event will trigger | `Function` | `noop` |
| startLoad | loadBar before show trigger | `Function` | `noop` |
| endLoad | loadBar after hide trigger | `Function` | `noop` |
| mounted | loadBar on mounted trigger | `Function` | `noop` |

## Event
```js
$("body").on("startLoad", function(){
    //  do sth
})
```
| Name | Detail | Parameter |
| - | - | - |
| all | every event will trigger | `Function` |
| startLoad | loadBar before show trigger | `Function` |
| endLoad | loadBar after hide trigger | `Function` |
| mounted | load on mounted trigger | `Function` |

## Methods
```js
$("body").loadBar("start");
//  or
$("body").loadBar("getOpt", "img");
//  or
$("body").loadBar("setOpt", "img", yourPath);
```
| Name | Detail | Parameter |
| - | - | - |
| start | loadBar start | |
| end | loadBar end | |
| setOpt | set loadBar options | `attrName: String Object, value:String` |
| getOpt | get loadBar options | `attrName: String` |
| destroy | destroy loadBar | |
| sayName | greet some body | `name:string` |

## License

MIT

### have a nide day
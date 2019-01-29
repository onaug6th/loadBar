# loadBar

A funny, powerful and strange loadBar. show you http request progress.

English | [简体中文](./README.md)

[docs](https://onaug6th.github.io/loadBar/)

## Install
```
npm run dev
```

## Build
```
npm run build
```

## Usage

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

## loadBar config
| Name | Detail | Type | Default |
| - | - | - | - |
| background | loadBar backgrond color | `String` | `#29d` |
| img | use image? (image will replace background) | `String` |  |
| height | loadBar height | `Number, String` | `2px` |

## loadBar event
| Name | Detail | Parameter |
| - | - | - |
| all | every event will trigger | `Function` |
| startLoad | loadBar before show trigger | `Function` |
| endLoad | loadBar after hide trigger | `Function` |
| mounted | load on mounted trigger | `Function` |

## loadBar methods
| Name | Detail | Parameter |
| - | - | - |
| setOpt | set loadBar options | `attr:String|Object, value:String` |
| getOption | get loadBar options | |
| destroy | destroy loadBar | |
| sayName | greet some body | `name:string` |

## License

MIT

### have a nide day
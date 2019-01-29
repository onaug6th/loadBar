# loadBar

[![npm (scoped)](https://img.shields.io/npm/v/@onaug6th/load-bar.svg)](https://www.npmjs.com/package/@onaug6th/load-bar)

一个有趣，~~强大~~，漂亮的进度条插件。监听http请求的状态，并且直观的展示Http请求进度。

简体中文 | [English](./README-EN.md)

[Docs/演示文档](https://onaug6th.github.io/loadBar/)

## 启动
```
npm run dev
```

## 构建生产
```
npm run build
```

## 使用

使用 npm:

```bash
npm i @onaug6th/load-bar
```

使用script标签:

```html
<script src="/dist/loadBar.min.js"></script>
```

## 例子

`页面中先引入jquery，然后再引入loadBar.min.js。`

```js
$("body").loadBar();

var options = {...}
$("#other").loadBar(options);
```

## options 配置
| 名称 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| background | 进度条背景色 | `String` | `#29d` |
| img | 是否使用图片（注意，若图片存在，会替换掉背景色） | `String` |  |
| height | 进度条高度 | `Number, String` | `2px` |
| all | 任何事件都会触发 | `Function` | `noop` |
| startLoad | 进度条出现前触发 | `Function` | `noop` |
| endLoad | 进度条消失后触发 | `Function` | `noop` |
| mounted | 进度条挂载后触发 | `Function` | `noop` |

## 事件
| 名称 | 说明 | 类型 |
| - | - | - |
| all | 任何事件都会触发 | `Function` |
| startLoad | 进度条出现前触发 | `Function` |
| endLoad | 进度条消失后触发 | `Function` |
| mounted | 进度条挂载后触发 | `Function` |

## 方法
| 名称 | 说明 | 参数 |
| - | - | - |
| start | 进度条开始 | |
| end | 进度条结束 | |
| setOpt | 设置进度条配置属性 | `attr: String Object, value: String` |
| getOpt | 获取配置属性 | |
| destroy | 摧毁进度条 | |
| sayName | 打招呼 | `name:string` |

## License

MIT

### have a nide day
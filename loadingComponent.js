(function ($) {
    'use strict';

    var loadComponentCss = $("<style></style>")
        .append(`
                #progress{
                    position: fixed;
                    top: 1px;
                    height:2px;
                    transition: opacity 500ms linear;
                    background:#b91f1f;
                }
                #progress span {
                    position:absolute;
                    height:2px;
                    -webkit-box-shadow:#b91f1f 1px 0 6px 1px;
                    -webkit-border-radius:100%;
                    opacity:1;
                    width:150px;
                    right:-10px;
                    -webkit-animation:pulse 2s ease-out 0s infinite;
                }
                @-webkit-keyframes pulse {
                    30% {
                        opacity:.6
                    }
                    60% {
                        opacity:0;
                    }
                    100% {
                        opacity:.6
                    }
                }
                `
        )
    loadComponentCss.insertAfter("body");

    //  构造函数，LoadComponent
    var LoadComponent = function (el, options) {
        this.options = options;
        this.$el = $(el);
        this.$el_ = this.$el.clone();
        this.init();
    };

    //  默认配置
    var DEFAULTS = {
        color: 'red',
        onAll: function (name, args) {
            return false;
        },
        startLoad: function () {

        },
        endLoad: function () {

        },
        onPostBody: function () {
            return false;
        }
    };

    //  生命周期钩子事件
    LoadComponent.EVENTS = {
        'all': 'onAll',             //  默认执行
        'start-load': 'startLoad',  //  开始请求
        'end-load': 'endLoad'       //  结束请求
    };

    //  加载进度条原型链生成方法
    LoadComponent.prototype.init = function () {
        this.initContainer();
        this.$el.trigger($.Event("onPostBody"), args);
    };

    //  生成滚动条并追加到目标元素
    LoadComponent.prototype.initContainer = function () {
        this.$container = $([
            `<div id="progress" style=background:${this.options.color};><span></span></div>`
        ].join(''));
        this.$el.append(this.$container);
    };

    /**
     * 进度条内置方法("骂人")
     * @param {string} name 名称
     */
    LoadComponent.prototype.alert = function (name) {
        alert(name ? name : "" + 'silly b');
    };

    /**
     * 触发事件中间件
     * @param {*} name 事件参数名称
     */
    LoadComponent.prototype.trigger = function (name) {
        //  取出除事件名之后的参数
        var args = Array.prototype.slice.call(arguments, 1);
        /**
         * 从LoadComponent.EVENTS中取出对应的函数名执行
         */
        this.options[LoadComponent.EVENTS[name]].apply(this.options, args);
        this.$el.trigger($.Event(name), args);

        this.options.onAll(name, args);
        this.$el.trigger($.Event('all'), [name, args]);
    };

    //  允许在原型链调用的方法,保护方法
    var allowedMethods = [
        'alert'
    ];

    $.fn.loadComponent = function (option) {
        var value,
            args = Array.prototype.slice.call(arguments, 1);

        //  each遍历要生成的目标，可能是id单个或class多个
        this.each(function () {
            var $this = $(this),
                //  这里的data第一次插件实例化的时候不存在
                data = $this.data('loadComponent'),
                //  合并配置
                options = $.extend({}, DEFAULTS, $this.data(), typeof option === 'object' && option);

            //  如果传入选项为字符串，说明调用方法
            if (typeof option === 'string') {
                //  判断是否存在该方法
                if ($.inArray(option, allowedMethods) < 0) {
                    throw new Error("Unknown method: " + option);
                }
                //  如果!data，说明$el目标还没有生成插件。返回
                if (!data) {
                    return;
                }
                //  从实例化的data对象中取出方法，执行
                value = data[option].apply(data, args);
            }

            //  初始化，并将通过构造函数实例化后的对象存在当前$elDOM对象的data属性中。
            $this.data('loadComponent', (data = new LoadComponent(this, options)));

            //  监听开始请求结束
            $(document).ajaxStart(function () {
                data.trigger('start-load');
                $this.find("#progress").css("width", "0px").show().animate({ width: '80%' }, 300, function () {

                });
            }).ajaxStop(function () {
                data.trigger('end-load');
                $this.find("#progress").animate({ width: '100%' }, 100, function () {
                    $this.find("#progress").hide();
                });
            });
        });
    }
})($);

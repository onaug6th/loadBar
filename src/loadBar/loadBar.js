/**
 * @author yangwj
 * loadBar
 * 加载进度条组件
 */
; (function ($) {

    'use strict';

    if (!$.fn) {
        throw new Error("OMG !!! we need jquery!!! help me!!!");
    }

    /**
     * 构造函数，LoadBar
     * @param {*} el 挂载的目标
     * @param {object} options 配置参数
     */
    var LoadBar = function (el, options) {
        this.options = options;
        this.$el = $(el);
        this.$container = "";
        this.$bar = "";
        this.init();
    };

    //  默认配置
    var DEFAULTS = {
        //  默认背景色
        background: '#29d',
        //  图片
        img: "",
        //  默认高度
        height: 2,
        all: function () { },
        startLoad: function () { },
        endLoad: function () { },
        mounted: function () { }
    };

    //  允许调用的方法
    var allowedMethods = [
        "sayName",
        "setOpt",
        "getOption",
        "destroy"
    ];

    //  生命周期钩子事件，对应执行DEFAULTS中的回调函数
    LoadBar.EVENTS = {
        'all': 'all',               //  默认执行
        'start-load': 'startLoad',  //  开始请求
        'end-load': 'endLoad',      //  结束请求
        'destroy': 'destroy'        //  摧毁组件
    };

    //  加载进度条原型链生成方法
    LoadBar.prototype.init = function () {
        //  生成加载进度条的容器
        this.initContainer();
        //  执行实例化后的回调
        this.options.mounted(this.options);
        //  这里使用jquery trigger是为了触发，用户使用了 $("xxx").on("all" , function(){}); 这样的事件监听
        this.$el.trigger($.Event("mounted"), this.options);
    };

    //  生成滚动条并追加到目标元素
    LoadBar.prototype.initContainer = function () {
        var $container = $('<div class="load-bar"></div>');
        var $bar = $('<div class="bar"></div>');

        this.$bar = $bar;
        this.$container = $container.append($bar);

        this.$el[0].tagName == "BODY" ? this.$bar.css("position", "fixed") : this.$el.css("position", "relative");
        this.$el.prepend(this.$container);
    };

    /**
     * 进度条内置方法("打招呼")
     * @param {string} name 名称
     */
    LoadBar.prototype.sayName = function (name) {
        window["alert"]("hello" + name || "");
    };

    /**
     * 获取内部配置对象
     */
    LoadBar.prototype.getOption = function () {
        return this.options;
    }

    /**
     * 设置内部属性
     * @param {string | object} attr 属性名称
     * @param {string} value 属性值
     */
    LoadBar.prototype.setOpt = function (attr, value) {
        if (typeof attr == "object") {
            this.options = $.extend({}, this.options, attr);
        } else {
            this.options[attr] = value;
        }
    }

    LoadBar.prototype.destroy = function () {
        this.$container.remove();
        this.$el.removeData("loadBar");
    }

    /**
     * 触发事件中间件
     * @param {string} name 事件参数名称
     */
    LoadBar.prototype.trigger = function (name) {
        //  取出除事件名之后的参数
        var args = Array.prototype.slice.call(arguments, 1);

        //  从事件集合中取出对应的回调函数进行执行
        this.options[LoadBar.EVENTS[name]].apply(this.options, args);

        this.$el.trigger($.Event(name), args);

        //  默认执行回调函数
        this.options.all(name, args);
        //  这里使用jquery trigger是为了触发，用户使用了 $("xxx").on("all" , function(){}); 这样的事件监听
        this.$el.trigger($.Event('all'), [name, args]);
    };

    LoadBar.prototype.ajaxStart = function () {
        this.trigger('start-load');
        var options = this.options;
        var cssOpt = {
            "width": "0px",
            "height": options.height
        };
        if (options.img) {
            var $img = $("img");
            $img.attr("src", options.img);
            this.$bar.append($img);
            cssOpt["background"] = "";
            cssOpt["box-shadow"] = "";
        } else {
            this.$bar.find("img").remove();
            cssOpt["background"] = options.background;
            cssOpt["box-shadow"] = "0 0 10px" + options.background + ",0 0 5px" + options.background;
        }
        //  设置进度条各状态
        this.$bar.css(cssOpt).show().animate({ width: '80%' }, 300);
    }

    LoadBar.prototype.ajaxStop = function () {
        const that = this;
        that.trigger('end-load');
        that.$bar.animate({ width: '100%' }, {
            duration: 1000,
            complete: function () {
                that.$bar.fadeOut();
            }
        });
    }

    /**
     * 挂载到jquery上的方法，生成滚动条组件
     * @param { Object } option 配置属性
     */
    $.fn.loadBar = function (option) {

        //  预先声明value变量，用于后面函数结束返回
        var value,
            //  取出除第一个参数之后的全部参数
            args = Array.prototype.slice.call(arguments, 1);

        //  each遍历要生成的目标，可能是id单个或class多个
        this.each(function () {

            var $this = $(this),
                //  这里的data第一次插件实例化的时候不存在
                data = $this.data('loadBar'),
                //  合并配置
                options = $.extend({}, DEFAULTS, $this.data(), typeof option === 'object' && option);

            //  如果传入选项为字符串，说明调用方法
            if (typeof option === 'string') {

                //  判断是否存在该方法
                if ($.inArray(option, allowedMethods) < 0) {
                    return console.warn("Unknown method: " + option);
                }

                //  如果!data，说明$el目标还没有生成插件。返回
                if (!data) {
                    return;
                }

                //  从实例化的data对象中取出方法，执行
                value = data[option].apply(data, args);

            }

            //  初始化，并将通过构造函数实例化后的对象存在当前$elDOM对象的data属性中。
            !data && $this.data('loadBar', (data = new LoadBar(this, options)));
        });
        //  为了链式调用
        return typeof value === 'undefined' ? this : value;
    }

    $(function () {
        //  监听开始请求结束
        $(document).ajaxStart(function () {

            $(".load-bar").each(function () {
                var loadBar = $(this).parent().data()["loadBar"];
                loadBar && (loadBar.ajaxStart.call(loadBar));
            });

        }).ajaxStop(function () {

            $(".load-bar").each(function () {
                var loadBar = $(this).parent().data()["loadBar"];
                loadBar && (loadBar.ajaxStop.call(loadBar));
            });

        });
    });

})($);

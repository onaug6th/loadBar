/**
 * @author yangwj
 * 
 * loadingComponent
 * 加载进度条组件
 */

; (function ($) {

    'use strict';

    if (!$.fn) {
        throw new Error("OMG !!! we need jquery!!! help me!!!");
    }

    //  往页面上追加样式
    $("<style></style>")
        .append('\
                .loading-component{\
                    position: absolute;\
                    top: 1px;\
                    height: 2px;\
                    transition: opacity 500ms linear;\
                    background: #b91f1f;\
                }\
                .loading-component span {\
                    position: absolute;\
                    height: 2px;\
                    -webkit-box-shadow: #b91f1f 1px 0 6px 1px;\
                    -webkit-border-radius: 100%;\
                    opacity: 1;\
                    width: 150px;\
                    right: -10px;\
                    -webkit-animation: pulse 2s ease-out 0s infinite;\
                }\
                @-webkit-keyframes pulse {\
                    30% {\
                        opacity: .6\
                    }\
                    60% {\
                        opacity: 0;\
                    }\
                    100% {\
                        opacity: .6\
                    }\
                }\
                '
        ).insertAfter("body");

    /**
     * 构造函数，LoadComponent
     * @param {*} el 挂载的目标
     * @param {*} options 配置参数
     */
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
            console.info("生命周期", name, "被触发了");
        },
        startLoad: function () {

        },
        endLoad: function () {

        },
        onPostBody: function () {
            console.info("实例化加载进度条完毕");
        }
    };

    //  允许在原型链调用的方法,保护方法
    var allowedMethods = [
        "maPeople"
    ];

    //  生命周期钩子事件，对应执行DEFAULTS中的回调函数
    LoadComponent.EVENTS = {
        'all': 'onAll',             //  默认执行
        'start-load': 'startLoad',  //  开始请求
        'end-load': 'endLoad',      //  结束请求
        'destory': 'destory'
    };

    //  加载进度条原型链生成方法
    LoadComponent.prototype.init = function () {

        //  生成加载进度条的容器
        this.initContainer();

        //  执行实例化后的回调
        this.options.onPostBody(this.options);

        //  这里使用jquery trigger是为了触发，用户使用了 $("xxx").on("all" , function(){}); 这样的事件监听
        this.$el.trigger($.Event("onPostBody"), this.options);

    };

    //  生成滚动条并追加到目标元素
    LoadComponent.prototype.initContainer = function () {

        this.$container = $([
            '<div class="loading-component" style="background:' + this.options.color + '">\
                <span></span>\
            </div>'
        ].join(''));

        this.$el.append(this.$container);

    };

    /**
     * 进度条内置方法("骂人")
     * @param {string} name 名称
     */
    LoadComponent.prototype.maPeople = function (name) {
        window["alert"](name ? name + "silly b" : "" + 'silly b');
    };

    /**
     * 触发事件中间件
     * @param {*} name 事件参数名称
     */
    LoadComponent.prototype.trigger = function (name) {

        //  取出除事件名之后的参数
        var args = Array.prototype.slice.call(arguments, 1);

        //  从事件集合中取出对应的回调函数进行执行
        this.options[LoadComponent.EVENTS[name]].apply(this.options, args);

        this.$el.trigger($.Event(name), args);

        //  默认执行回调函数
        this.options.onAll(name, args);

        //  这里使用jquery trigger是为了触发，用户使用了 $("xxx").on("all" , function(){}); 这样的事件监听
        this.$el.trigger($.Event('all'), [name, args]);
        
    };

    /**
     * 挂载到jquery上的方法，生成滚动条组件
     * @param { Object } option 配置属性
     */
    $.fn.loadComponent = function (option) {

        //  取出除第一个参数之后的全部参数
        var args = Array.prototype.slice.call(arguments, 1);

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
                    console.warn("Unknown method: " + option);
                }

                //  如果!data，说明$el目标还没有生成插件。返回
                if (!data) {
                    return;
                }

                //  从实例化的data对象中取出方法，执行
                return data[option].apply(data, args);

            }

            //  初始化，并将通过构造函数实例化后的对象存在当前$elDOM对象的data属性中。
            $this.data('loadComponent', (data = new LoadComponent(this, options)));

            //  监听开始请求结束
            $(document).ajaxStart(function () {

                data.trigger('start-load');
                data.$container.css("width", "0px").show().animate({ width: '80%' }, 300);

            }).ajaxStop(function () {

                data.trigger('end-load');
                data.$container.animate({ width: '100%' }, 100, function () {
                    data.$container.hide();
                });

            });
        });
    }

})($);

require.config({
    baseUrl: '/js/',
    paths: {
        index: "index/index",
        flexible: "lib/flexible", //计算单位
        jquery: "lib/jquery",
        text: "lib/require.text",
        template: "../template/",
        handlebars: "lib/handlebars-v4.0.11",
        temp: "common/temp",
        swiper: "lib/swiper-4.3.3.min",
        lazyload: "lib/jquery.lazyload",
        search: "search/index",
        detail: "detail/index",
        getUrl: "common/getUrl",
        menu: "menu/index",
        reader: "text/index",
        base64: "lib/jquery.base64",
        login: "login/index"
    },
    shim: {
        lazyload: {
            exports: 'lazyload',
            deps: ['jquery']
        },
        base64: {
            exports: 'base64',
            deps: ['jquery']
        }
    }
});

require(['flexible'])
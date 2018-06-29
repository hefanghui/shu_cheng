define([
    'jquery',
    'temp',
    'lazyload',
    'text!template/dl-list.html'
], function($, temp, lazyload, dltext) {
    var storage = window.localStorage;
    var searchdata = JSON.parse(storage.getItem('searchinfo')) || [];
    renderSearchinfo();
    //初始显示页面
    $.getJSON("/api/searchKey").done(render);

    function render(data) {
        temp($('.text').html(), data, '.search-init');
    };

    //点击搜索
    $('.search-input__btn').on('click', function() {
        var inp = $(this).prev();
        var val = inp.val();
        if (val != "") {
            searchdata.unshift(val);
            storage.setItem('searchinfo', JSON.stringify(searchdata));
            renderSearchinfo();
            $.getJSON('/api/result', { value: val }, function(data) {
                //渲染搜索结果
                if (data.mes == "success") {
                    temp(dltext, data.cont, '.search-cont');
                    $('img.lazy').lazyload({
                        effect: "fadeIn",
                        container: $('.search-cont')
                    })
                } else {
                    $('.search-cont').html(data.mes);
                }
            })
        }
    });

    function renderSearchinfo() {
        temp($('.historytext').html(), searchdata, '.history-list');
    }
    //删除搜索记录
    $('.history-list').on('click', 'em', function() {
        var i = $(this).data('ind');
        searchdata.splice(i, 1);
        storage.setItem('searchinfo', JSON.stringify(searchdata));
        renderSearchinfo();
    })
});
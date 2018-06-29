define([
    'jquery',
    'temp',
    'getUrl',
    'base64'
], function($, temp, getUrl) {
    var storage = window.localStorage;
    //默认显示第一张
    var chapterId = getUrl('curchapter') || storage.getItem('chapterId') * 1 || 1;
    var fontSize = storage.getItem('fontSize') || 16;
    $('.content').css('fontSize', fontSize * 1);
    var bgcolor = ['#fff', '000', 'blue', 'red'];
    getText();
    //获取总章节
    var chaptersum = getUrl('chaptersum');
    $('.sum').html(chaptersum);
    //点击文字显示菜单
    $('.content').on('click', function() {
        $('.menu').show();
    });
    $('.menu').on('click', function() {
        $(this).hide();
    });
    //点击下一章
    $('.next-btn').on('click', function() {
        chapterId++;
        chapterId = chapterId >= chaptersum ? chaptersum : chapterId;
        getText();
        return false;
    });
    //点击上一章
    $('.prev-btn').on('click', function() {
        chapterId--;
        chapterId = chapterId <= 1 ? 1 : chapterId;
        getText();
        return false;
    });
    //点击目录
    $('.menu-btn').on('click', function() {
        window.location.href = "menu.html?id=" + getUrl('id') + '&active=' + chapterId;
        return false;
    });
    //点击字体大小
    $('.config-box').on('click', 'button', function() {
        fontSize = parseInt($('.content').css('fontSize'));
        console.log(fontSize);
        if ($(this).html() === '大') {
            $('.content').css('fontSize', ++fontSize);
        } else {
            $('.content').css('fontSize', --fontSize);
        }
        storage.setItem('fontSize', fontSize);
        return false;
    });
    //获取章节文本
    function getText() {
        storage.setItem('chapterId', chapterId);
        $.ajax({
            url: "/api/reader",
            dataType: 'json',
            data: {
                chapterNum: chapterId
            },
            success: function(data) {
                $('.cur').html(chapterId);
                jsonp(data.jsonp, function(data) {
                    var data = JSON.parse($.base64().decode(data));
                    temp($('.text').html(), data, '.content');
                })
            }
        })
    }

    function jsonp(url, success) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function(data) {
            success(data);
            document.head.removeChild(script);
        }
        script.src = url;
        document.head.appendChild(script);
    }
});
define([
    'jquery',
    'temp',
    'getUrl'
], function($, temp, getUrl) {
    var bookid = getUrl('id'),
        activeid = getUrl('active');
    var Storage = window.localStorage;
    $.ajax({
        url: "/api/chapter",
        data: {
            id: bookid
        },
        dataType: "json",
        success: function(data) {
            data.item.toc.map(function(v) {
                v.chapter_id == activeid ? v.active = true : v.active = false;
                false;
            });
            temp($('.text').html(), data.item.toc, '.list')
            scroll(data.item.toc.length);
        }
    })

    function scroll(n) {
        $('.main').scrollTop($('li.active').position().top);
        $('.list li').on('click', function() {
            if (Storage.getItem('userinfo')) {
                window.location.href = "text.html?id=" + bookid + '&chaptersum=' + n + '&curchapter=' + $(this).index();
            } else {
                alert('请先登录');
                window.location.href = "login.html"
            }
        });
    }
});
define([
    'jquery',
    'getUrl',
    'temp',
    'text!template/detail.html'
], function($, getUrl, temp, detailtext) {
    var $id = getUrl('id');
    $.ajax({
        url: "/api/detail?id=" + $id,
        dataType: "json",
        success: function(data) {
            $('.header-title').html(data.item.title);
            temp(detailtext, data, 'main');
        }
    })
});
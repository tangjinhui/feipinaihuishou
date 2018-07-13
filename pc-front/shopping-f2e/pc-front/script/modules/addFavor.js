define(['jquery', 'dialog', 'mini_login'], function($, dialog, mini_login) {
    $('body').on('click', '.addFavor', function() {
        var goodsId = $(this).attr("data-goodsId");
        $.ajax({
            url: '/front/member/favory/addFavory',
            type: 'get',
            dataType: 'jsonp',
            data: { goodsId: goodsId },
            success: function(res) {
                var content = '';
                if ('99' == res.code) {
                    mini_login.show();
                    return false;
                }
                if (res.code == '00') {
                    content = '关注成功';
                } else if (res.code == '01') {
                    content = '请选择要关注商品';
                } else if (res.code == '02') {
                    content = '商品不存在';
                } else if (res.code == '03') {
                    content = '商品已下架，不能添加到关注';
                } else if (res.code == '04') {
                    content = '该商品已关注，请不要重复添加';
                } else {
                    content = '网络繁忙，请您稍后重试';
                }
                dialog({ title: '系统提示', content: content });
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        });
        return false;
    })
});

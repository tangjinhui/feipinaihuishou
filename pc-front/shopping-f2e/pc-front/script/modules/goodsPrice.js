define(['jquery', 'dialog'], function($, dialog) {

    function loadGoodsPrice() {
        //获取实时价格
        var list = [];
        $('.goodsList').each(function(index, el) {
            list.push($(el).data('id'));
        });
        var data = {
            goodsIds: list
        };
        $.ajax({
            url: '/front/goodsPrice',
            type: 'GET',
            dataType: 'json',
            traditional: true,
            data: data,
            success: function(res) {
                if (res && res.code == '00') {
                    for (key in res.data) {
                        if (res.data[key]) {
                            var class_name = '.price_' + key;
                            $(class_name).html('￥' + res.data[key]);
                        }
                    }
                } else if (res && res.code == '01') {
                    dialog({
                        content: '没查到价格信息'
                    });
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                }
            },
            error: function() {
                dialog({
                    content: '网络繁忙，请您稍后重试'
                });
            }
        });
    }
    return loadGoodsPrice;
});

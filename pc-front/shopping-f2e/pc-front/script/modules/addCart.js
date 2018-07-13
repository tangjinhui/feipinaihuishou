define(['jquery', 'dialog', 'mini_login'], function($, dialog, mini_login) {

    $('body').on('click', '.addCart', function() {
        var goodsId = $(this).attr("data-goodsId");
        addCart(goodsId, 1);
    })

    $('.batchAddCart').on('click', function() {
        var ids = '';
        $('input[name="fid_goodsId"]:checked').each(function() {
            var fid_goodsId = $(this).val();
            var goodsId = fid_goodsId.split('_')[1];
            ids += goodsId + ',';
        });
        if (!ids) {
            dialog({ title: '系统提示', content: '请您至少选择一个关注商品加入购物车！' });
            return;
        } else {
            ids = ids.substr(0, ids.length - 1);
            addCart(ids, 1);
        }
    })

    function addCart(ids, buyNumber) {
        $.ajax({
            url: '/front/member/cart/addToCart',
            type: 'get',
            dataType: 'jsonp',
            data: { ids: ids, buyNumber: 1 },
            success: function(res) {
                var content = '';
                if ('99' == res.code) {
                    mini_login.show();
                    return false;
                }
                if (res.code == '00') {
                    $('body').append('<a href="javascript:void(0);" class="dn" id="openNewPage" target="_blank"><p></p></a>');
                    $('#openNewPage').attr('href', 'http://pfdev.ecgci.com/cart.html?flag=true').children('p').trigger('click');
                    $('#openNewPage').remove();
                    return false;
                } else if (res.code == '01') {
                    content = '商品不存在,添加失败';
                } else if (res.code == '02') {
                    content = '商品未上架，不可添加到购物车';
                } else if (res.code == '03') {
                    content = '商品 ' + res.data + '是一种特殊商品，不可加入购物车！';
                } else if (res.code == '04') {
                    content = '最多可添加50种商品，每个商品最多可购买999个';
                } else if (res.code == '05') {
                    content = '库存不足，不可添加到购物车';
                } else {
                    content = '网络繁忙，请您稍后重试';
                }
                dialog({ title: '系统提示', content: content });
            },
            error: function(res) {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        });
        return false;
    }
});

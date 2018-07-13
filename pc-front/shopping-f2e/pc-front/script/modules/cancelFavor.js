define(['jquery', 'dialog'], function($, dialog) {
    $('body').on('click', '.cancelFavor', function() {
        var fid = $(this).attr("data-fid");
        cancelFavor(fid);
    })
    $('.batchCancelFavor').on('click', function() {
        var ids = '';
        $('input[name="fid_goodsId"]:checked').each(function() {
            var fid_goodsId = $(this).val();
            var fid = fid_goodsId.split('_')[0];
            ids += fid + ',';
        });
        if (!ids) {
            dialog({ title: '系统提示', content: '请您至少选择一个商品取消关注！' });
            return;
        } else {
            ids = ids.substr(0, ids.length - 1);
            cancelFavor(ids);
        }
    })

    function cancelFavor(fids) {
        dialog({
            title: '系统提示',
            content: '确认取消关注该商品',
            type: 'confirm',
            callback: function() {
                $.ajax({
                    url: '/front/member/favory/cancelFavory',
                    type: 'get',
                    dataType: 'json',
                    data: { ids: fids },
                    success: function(res) {
                        if ('99' == res.code) {
                            window.location.href = 'https://passportdev.ecgci.com/login.html';
                        } else if (res.code == '00') {
                            dialog({ title: '系统提示', content: '取消关注商品成功' });
                            location.reload();
                        } else {
                            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                        }
                    },
                    error: function() {
                        dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                    }
                });
            }
        });
        return false;
    }
});

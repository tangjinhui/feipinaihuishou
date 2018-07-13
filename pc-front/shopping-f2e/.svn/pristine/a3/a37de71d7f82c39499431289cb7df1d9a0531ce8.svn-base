define(['jquery', 'dialog'], function($, dialog) {
    var orderId = null;

    $('body').on('click', '.cancel_order', function() {
        orderId = $(this).attr('data-id');
        $('.cancelOrderBox').show();
    });

    $('#close_cancel_layer, #to_close_layer_btn').on('click', function() {
        $('.cancelOrderBox').hide();
        initData();
    });

    $('#showReason').on('click', function() {
        $('#reasonList').show();
    });

    $('#reasonList input').on('click', function() {
        var val = $(this).next().html();
        var cancleId = $(this).attr('id').replace('radio_other', '');
        $('#showReason').attr('data-cancleId', cancleId).html(val);
        $('#reasonList').hide();
        if ('999' == cancleId) {
            $('#reasonArea').show();
        } else {
            $('#reasonArea').hide();
        }
    });

    $('#toCancelReason').on('click', function() {
        var cancleId = $('#showReason').attr('data-cancleId');
        if (!$('#showReason').html()) {
            dialog({ title: '系统提示', content: '请选择取消原因！' });
            return ;
        }
        var areatext = $('#showReason').html();
        if ('999' == cancleId) {
            areatext = $('#optionArea').val();
        }
        if ('999' == cancleId && !areatext) {
            var areatext = $('#optionArea').val();
            dialog({ title: '系统提示', content: '其他原因内容不能为空！' });
            return ;
        }
        $.ajax({
            url: '/front/member/order/confirmCancelOrder',
            type: 'post',
            dataType: 'json',
            data: {
                orderId: orderId,
                reasonId: cancleId,
                areatext: areatext
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    dialog({
                        title: '系统提示',
                        content: '订单取消处理中，请稍后查看！',
                        callback: function() {
                            $('#close_cancel_layer').trigger('click');
                            window.location.reload();
                        }
                    });
                } else if (res.code == '02') {
                    dialog({ content: '取消原因不能为空，并且最多只能输入30个字符！' });
                } else if (res.code == '03') {
                    dialog({ content: '此订单不符合取消条件！' });
                } else if (res.code == '04') {
                    dialog({ content: '正在取消中，请不要重复提交！' });
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' }); 
                }
                $('#close_cancel_layer').trigger('click');
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                $('#close_cancel_layer').trigger('click');
            }
        });
    });

    function initData() {
        $('#reasonList input').prop('checked', false);
        $('#showReason').attr('data-cancleId', '').html('');
        $('#optionArea').val('');
        $('#reasonArea').hide();
    }
});

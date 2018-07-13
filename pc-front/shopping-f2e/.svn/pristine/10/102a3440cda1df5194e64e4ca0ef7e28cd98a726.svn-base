require(['jquery', 'dialog', 'getUrlParam', 'header'], function($, dialog, getUrlParam) {
    var context = getUrlParam('context');
    if (!context) return;

    $.ajax({
        url: '/front/transaction/cmbcReturn',
        type: 'get',
        dataType: 'json',
        data: { context: context },
        success: function(res) {
            if (res.code == '00') {
                if (res.data.code == '0000') {
                    $('.retTitle').children('img').attr('src', 'http://static.ecgci.com/images/trans_member/bg.png');
                } else {
                    $('.retTitle').children('img').attr('src', 'http://static.ecgci.com/images/trans_member/error.png');
                }
                $('.retTitle').children('img').after('&nbsp;' + res.data.message);

                if (res.data.bindFlag == '1') {
                    $('.retTitle').children('p').show();
                } else {
                    $('.retTitle').children('p').hide();
                }
                if (res.data.transCode == 'CNP_T000004') {
                    $('.amt').html('提现金额：' + res.data.amt + '元').show();
                } else if (res.data.transCode == 'CNP_T000012') {
                    $('.amt').html('充值金额：' + res.data.amt + '元').show();
                } else {
                    $('.amt').hide();
                }

                $('.orderId').html('交易单号：' + res.data.orderId);
            } else {
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
            }
        },
        error: function() {
            dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
        }
    });
    var timmer = setInterval(function() {
        var val = parseInt($('#retMin').html());
        if (val == 1) {
            clearInterval(timmer);
            window.close();
        }
        $('#retMin').html(val - 1);
    }, 1000);

    $('#closeWin').click(function() {
        window.close();
    });
});

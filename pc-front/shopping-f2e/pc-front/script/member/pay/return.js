require(['jquery', 'handlebars', 'getUrlParam', 'dialog', 'header'], function($, Handlebars, getUrlParam, dialog) {
    var trade_status = getUrlParam('trade_status');
    var out_trade_no = getUrlParam('out_trade_no');
    var total_fee = getUrlParam('total_fee');
    var OrderStatus = getUrlParam('OrderStatus');
    var MerResv = getUrlParam('MerResv');
    var OrderAmt = getUrlParam('OrderAmt');

    var payOrderNo = out_trade_no || MerResv;
    var tradeStatus = trade_status || OrderStatus;
    var payFee = total_fee || OrderAmt;

    if (!payOrderNo || !tradeStatus || !payFee) return false;

    Handlebars.registerHelper("payReturnMsg", function(tradeResult) {
        if (tradeResult) {
            return '恭喜您支付成功！我们会尽快为您发货！';
        } else {
            return '订单支付失败！';
        }
    });

    $.ajax({
        url: '/front/member/order/payReturn',
        type: 'get',
        dataType: 'json',
        data: { payOrderNo: payOrderNo, tradeStatus: tradeStatus },
        success: function(res) {
            if ('99' == res.code) {
                window.location.href = 'https://passportdev.ecgci.com/login.html';
            } else if (res.code == '00') {
                res.data.payFee = payFee;
                var articleContentTemplate = Handlebars.compile($('#pay-return-template').html());
                $('#payReturn').html(articleContentTemplate(res.data));
            } else {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        },
        error: function() {
            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
        }
    });
});

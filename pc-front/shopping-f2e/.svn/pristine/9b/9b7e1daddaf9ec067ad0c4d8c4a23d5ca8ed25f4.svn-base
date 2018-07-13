require(['jquery', 'handlebars', 'getUrlParam', 'dialog', 'modules/orderPayLimit', 'header'], function($, Handlebars, getUrlParam, dialog) {
    var orderId = getUrlParam('orderId');
    if (!orderId) return false;

    Handlebars.registerHelper("imgConf", function(payImg) {
        return 'http://static.ecgci.com/images/bank_img/' + payImg.substring(29);
    });

    $.ajax({
        url: '/front/member/order/orderPayType',
        type: 'get',
        dataType: 'json',
        data: { orderId: orderId },
        success: function(res) {
            if ('99' == res.code) {
                window.location.href = 'https://passportdev.ecgci.com/login.html';
            } else if (res.code == '00') {
                $('.orderId').html(orderId);
                var actualPay = res.data.actualPay;
                var Pay = ('' + actualPay).indexOf('.') != -1 ? actualPay : actualPay + '.00';
                $('.actualPay').html('￥' + Pay);
                if (parseFloat(actualPay) >= 20000) {
                    $('.payRemind').show();
                } else {
                    $('.payRemind').hide();
                }
                var articleContentTemplate = Handlebars.compile($('#online-pay-type-template').html());
                $('#onlinePayType').html(articleContentTemplate(res.data));
                //银行汇款    
                if (res.data.canBankRemittance) {
                    $('.bankRemittancePays').show();
                    $('.bankRemittance').hide();
                } else {
                    $('.bankRemittancePays').hide();
                    $('.bankRemittance').hide().find('.payRadio').prop('checked', false);
                }
            } else if ('01' == res.code || '02' == res.code) {
                window.location.href = '/member/order.html';
            }else {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        },
        error: function() {
            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
        }
    });

    $('.delTypeCost').click(function() {
        var value = $(this).val();
        //银行汇款
        if ('10004' == value) {
            $('#zaixian').hide();
            $('#onlinePayType').hide();
            $('.xe_sm').hide();
            $('.payRadio').prop('checked', false);
            $('.bankRemittance').show();
            $('.bankRemittance').find('.payRadio').prop('checked', true);
        } else { //在线支付
            $('.bankRemittance').hide();
            $('.bankRemittance').find('.payRadio').prop('checked', false);
            $('#zaixian').show();
            $('#onlinePayType').show();
        }
    });

    $('.toPays').click(function() {
        var payType = $('input[name=payType]:checked').val();
        var returnmoney = $('#returnmoney').val();
        if (!payType) {
            dialog({ title: '系统提示', content: '请选择支付方式' });
            return;
        }
        if (payType == '10004') {
            var pattern = new RegExp("[`~!@%#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*;|{}【】‘；：”“'。，、？]");
            var money = "";
            for (var i = 0; i < returnmoney.length; i++) {
                money = money + returnmoney.substr(i, 1).replace(pattern, '');
            }
            if (!money) {
                dialog({ title: '系统提示', content: '汇款人(单位)信息必填' });
                return;
            }
        }
        $.ajax({
            url: '/front/member/order/updateOrderPayType',
            type: 'get',
            dataType: 'json',
            data: { orderId: orderId, payType: payType },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    if (payType == '10004') {
                         window.location.href = '/member/order/detail.html?orderId=' + orderId;
                    } else {
                        $('#jsPrompt1').show();
                        $('#toPayplatform').attr('href', res.data);
                        $('#toPayplatform').children('p').trigger('click');
                    }
                } else {
                    dialog({content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({content: '网络繁忙，请您稍后重试' });
            }
        });
    });

    $('.renewPay').click(function() {
        $('#jsPrompt1').hide();
        return;
    });

    $('.completePay').click(function() {
        $('#jsPrompt1').hide();
        window.location.href = '/member/order/detail.html?orderId=' + orderId;
        return false;
    });
});

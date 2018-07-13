define(['jquery', 'dialog'], function($, dialog) {
    //包含绑卡、充值和提现功能

    //绑卡
    function bindCard() {
        $.ajax({
            url: '/front/member/transaction/bindCard',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res.code == '00') {
                    $('.layer_ck_other .ck_title').text('绑卡中');
                    $('.layer_ck_other .ck_input').text('请在民生银行市场通网站中完成绑卡');
                    $('.layer_ck_other .ck_sub a.js_resh').text('已完成绑卡');
                    $('#layer_ck').removeClass('dn');
                    //访问民生接口
                    var result = JSON.parse(res.data);
                    submitForm(result);
                } else if (res.code == '01') {
                    dialog({ content: res.msg });
                } else if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '03') {
                    dialog({ content: '操作频繁，请您3分钟后再试' });
                    return;
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        });
    }

    function charge(num) { //充值
        $.ajax({
            url: '/front/member/transaction/transactionRecharge',
            type: 'GET',
            dataType: 'json',
            data: {
                amt: num
            },
            success: function(res) {
                if (res && res.code == '00') {
                    $('.layer_ck_other .ck_title').text('充值中');
                    $('.layer_ck_other .ck_input').text('请在民生银行市场通网站中完成充值');
                    $('.layer_ck_other .ck_sub a.js_resh').text('已完成充值');
                    $('.ydwt').hide();
                    $('#layer_ck').removeClass('dn');
                    //跳转民生
                    var result = JSON.parse(res.data);
                    submitForm(result);
                } else if (res && res.code == '01') {
                    dialog({
                        content: '请输入充值金额'
                    });
                } else if (res && res.code == '02') {
                    dialog({
                        content: '充值金额必须是整数'
                    });
                } else if (res && res.code == '03') {
                    dialog({
                        content: '数值过大，请重新输入'
                    });
                } else if (res && res.code == '04') {
                    dialog({
                        content: '充值金额不能小于5元，请重新输入'
                    });
                } else if (res && res.code == '05') {
                    dialog({
                        content: '充值失败'
                    });
                } else if (res && res.code == '06') {
                    dialog({
                        content: '不是交易账户'
                    });
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
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
    };

    function withdrawal(num) { //提现
        $.ajax({
            url: '/front/member/transaction/transactionShow',
            type: 'GET',
            dataType: 'json',
            data: {
                money: num
            },
            success: function(res) {
                if (res && res.code == '00') {
                    $('.layer_ck_other .ck_title').text('提现中');
                    $('.layer_ck_other .ck_input').text('请在民生银行市场通网站中完成提现');
                    $('.layer_ck_other .ck_sub a.js_resh').text('已完成提现');
                    $('.ydwt').hide();
                    $('#layer_ck').removeClass('dn');
                    //跳转民生  
                    var result = JSON.parse(res.data);
                    submitForm(result);
                } else if (res && res.code == '01') {
                    dialog({
                        content: '请输入提现金额'
                    });
                } else if (res && res.code == '02') {
                    dialog({
                        content: '请输入有效数字，小数点后保留两位'
                    });
                } else if (res && res.code == '03') {
                    $("#js_txje").val('');
                    dialog({
                        content: '数值过大，请重新输入'
                    });
                } else if (res && res.code == '04') {
                    $("#js_txje").val('');
                    dialog({
                        content: '您提现' + num + '元，需手续费10元，您的可提现余额不足'
                    });
                } else if (res && res.code == '05') {
                    $("#js_txje").val('');
                    dialog({
                        content: '您提现' + num + '元，需手续费5元，您的可提现余额不足'
                    });
                } else if (res && res.code == '06') {
                    $("#js_txje").val('');
                    dialog({
                        content: '用户提现失败'
                    });
                } else if (res && res.code == '07') {
                    $("#js_txje").val('');
                    dialog({
                        content: '不是交易账户'
                    });
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
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
    };

    //创建input
    function createInput(value, name) {
        var input = document.createElement('input');
        input.type = "text";
        input.name = name;
        input.value = value;
        return input;
    }

    //提交表单
    function submitForm(result) {
        var form = document.createElement("form");
        form.action = result.actionURL;
        form.method = "get";
        form.target = "_blank";
        form.style.display = "none";
        form.id = "cmbcForm";
        var inputContext = createInput(result.context, "context"),
            inputSecuNo = createInput(result.secuNo, "secuNo"),
            inputTransCode = createInput(result.transCode, "transCode");
        form.appendChild(inputContext);
        form.appendChild(inputSecuNo);
        form.appendChild(inputTransCode);
        document.body.appendChild(form);
        form.submit();
    }
    //关闭绑卡弹窗
    $('#closeCmbc,#bd_tx .ck_sub').on('click', function() {
        $('#layer_ck').addClass('dn');
        window.location.reload()
    });

    //取消充值弹窗
    $('#charge_box .closeLayer').on('click', function() {
        $("#js_czje").val('');
        $('#charge_box').addClass('dn');
    });

    //关闭提现弹窗
    $('#tx_tx .closeLayer').on('click', function() {
        $("#js_txje").val('');
        $('#withdrawal_box').addClass('dn');
    });

    //去充值
    $('#js_gocz').on('click', function() {
        var val = $.trim($('#js_czje').val());
        if (!val) {
            dialog({
                content: '请输入充值金额'
            })
            return false;
        }
        if (!/^\d+$/.test(val)) {
            dialog({
                content: '请输入有效数字'
            });
            return false;
        }
        if (val.length > 12) {
            dialog({
                content: '数值过大，请重新输入'
            });
            return false;
        }
        if (parseInt(val) < 5) {
            dialog({
                content: '充值金额最低为5元'
            });
            return false;
        }
        charge(val);
        $('#charge_box').addClass('dn');
    });

    //去提现
    $('#js_gotx').on('click', function() {
        var val = $.trim($('#js_txje').val());
        if (!val) {
            dialog({
                content: '请输入提现金额'
            });
            return false;
        }
        if (!/^\d+(?:\.\d{1,2})?$/.test(val)) {
            dialog({
                content: '请输入有效数字，小数点后保留两位'
            });
            return false;
        }
        if (val.length > 12) {
            dialog({
                content: '数值过大，请重新输入'
            });
            return false;
        }
        withdrawal(val);
        $('#withdrawal_box').addClass('dn');
    });

    //绑卡
    $('body').on('click', '#js_bind_card,#js_bk,.bindCmbc', function() {
        bindCard();
    });

    //充值
    $('body').on('click', '#js_cz,.charge_cmbc', function() {
        $('#charge_box').removeClass('dn');
    });

    //提现
    $('body').on('click', '#js_tx', function() {
        $('#withdrawal_box').removeClass('dn');
    });
});

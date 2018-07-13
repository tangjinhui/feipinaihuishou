require(['jquery', 'handlebars', 'modules/accountDialog', 'dialog', 'header', 'modules/menu'], function($, Handlebars, accountDialog, dialog) {
    Handlebars.registerHelper('showBtn', function(operateCode, options) {
        if (operateCode == '03') {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    //交易账户初始化
    $.ajax({
        //假数据：/front/member/transaction/yes 
        //真实数据：/front/member/transaction/transationAccountInfoAll
        url: '/front/member/transaction/transationAccountInfoAll',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            //00：不是交易账户 ；02：开户未绑卡；03：开户已绑卡  04：解绑后再次绑卡
            if (res.code == '00') {
                if (res.data.operateCode == '03' || res.data.operateCode == '04') {
                    $('.text_l h2').text('交易账户');
                    $('#dep_box').show();
                    var depTemp = Handlebars.compile($("#dep-template").html());
                    $('#dep_box').html(depTemp(res.data));
                } else if (res.data.operateCode == '02') {
                    $('.text_l h2').text('交易账户绑卡');
                    $('#bind_box').show();
                    $('#js_fundAcc').text(res.data.clientName);
                    $('#js_bindAcc').text(res.data.transactionAccount);
                }
            } else if (res.code == '01') {
                dialog({ content: '不是交易账户' });
            } else if (res.code == '99') {
                window.location.href = 'https://passportdev.ecgci.com/login.html';
            } else {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        },
        error: function() {
            dialog({ content: '网络繁忙，请您稍后重试' });
        }
    });

    //‘基本账户管理’‘更多’
    $('body').on('click', '#clientUser,#js_all a', function() {
        $.ajax({
            url: '/front/member/transaction/clientInfoPortal',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res.code == '00') {
                    //跳转民生
                    var result = JSON.parse(res.data);
                    submitForm(result);
                } else if (res.code == '02') {
                    dialog({ content: '不是交易账户' });
                } else if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        });
    });

    //解绑
    $('body').on('click', '#jcbd', function() {
        $.ajax({
            url: '/front/member/transaction/unbindCardOften',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res.code == '00') {
                    dialog({
                        content: '确定解绑您虚拟交易账户绑定的银行卡么？解绑后将不能进行充值、提现（不影响保证金交纳）。您可以解绑成功后再绑定新的银行卡。',
                        type: 'confirm',
                        callback: function() {
                            $.ajax({
                                url: '/front/member/transaction/unbindCard',
                                type: 'GET',
                                dataType: 'json',
                                success: function(res) {
                                    if (res.code == '00') {
                                        $('.layer_ck_other .ck_title').text('解绑中');
                                        $('.layer_ck_other .ck_input').text('请在民生银行市场通网站中完成解绑');
                                        $('.layer_ck_other .ck_sub a.js_resh').text('已完成解绑');
                                        $('#layer_ck').removeClass('dn');
                                        //跳转民生
                                        var result = JSON.parse(res.data);
                                        submitForm(result);
                                    } else if (res && res.code == '99') {
                                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                                    } else {
                                        dialog({ content: '网络繁忙，请您稍后重试' });
                                    }
                                },
                                error: function() {
                                    dialog({ content: '网络繁忙，请您稍后重试' });
                                }
                            });
                        }
                    });
                } else if (res.code == '01') {
                    dialog({ content: '操作频繁，请您3分钟后再试' });
                    return;
                }
            },
            error: function() {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        });
    });
    // $('body').on('click', '#jcbd', function() {
    //     dialog({
    //         content: '确定解绑您虚拟交易账户绑定的银行卡么？解绑后将不能进行充值、提现（不影响保证金交纳）。您可以解绑成功后再绑定新的银行卡。',
    //         type: 'confirm',
    //         callback: function() {
    //             $.ajax({
    //                 url: '/front/member/transaction/unbindCard',
    //                 type: 'GET',
    //                 dataType: 'json',
    //                 success: function(res) {
    //                     if (res.code == '00') {
    //                         $('.layer_ck_other .ck_title').text('解绑中');
    //                         $('.layer_ck_other .ck_input').text('请在民生银行市场通网站中完成解绑');
    //                         $('.layer_ck_other .ck_sub a.js_resh').text('已完成解绑');
    //                         $('#layer_ck').removeClass('dn');
    //                         //跳转民生
    //                         var result = JSON.parse(res.data);
    //                         submitForm(result);
    //                     } else if (res.code == '01') {
    //                         dialog({ content: '操作频繁，请您3分钟后再试' });
    //                         return;
    //                     } else if (res && res.code == '99') {
    //                         window.location.href = 'https://passportdev.ecgci.com/login.html';
    //                     } else {
    //                         dialog({ content: '网络繁忙，请您稍后重试' });
    //                     }
    //                 },
    //                 error: function() {
    //                     dialog({ content: '网络繁忙，请您稍后重试' });
    //                 }
    //             });
    //         }
    //     });
    // });

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

});
require(['jquery', 'form-valid', 'header', 'modules/menu'], function($, valid) {

    var mobileCode = false,
        rand = false,
        mobile = false,
        newMobileCode = false,
        newRand = false;
    valid.settings = {
        initTip: function(input, defaultTip) {

        },
        validTip: function(input, errorInfo, defaultTip) {
            if (errorInfo) {
                input.next('.msg-error').show().text(errorInfo);
            }
        }
    };
    valid.render({
        '#mobileCode': {
            option: 'blur',
            regexp: /^\d{6}$/,
            errorTip: '手机验证码有误，请重新输入',
            requiredTip: '请输入短信验证码',
            success: function(input) {
                mobileCode = true;
            },
            failed: function(input) {
                mobileCode = false;
            }
        },
        '#rand': {
            option: 'blur',
            len: 4,
            requiredTip: '请输入验证码',
            lenTip: '验证码错误',
            success: function(input) {
                rand = true;
            },
            failed: function(input) {
                rand = false;
            }
        },
        '#mobile': {
            type: 'mobile',
            option: 'blur',
            requiredTip: '请输入手机号',
            errorTip: '请输入正确的手机号码',
            success: function(input) {
                mobile = true;
            },
            failed: function(input) {
                mobile = false;
            }
        },
        '#mobileCode_s': {
            option: 'blur',
            regexp: /^\d{6}$/,
            errorTip: '手机验证码有误，请重新输入',
            requiredTip: '请输入短信验证码',
            success: function(input) {
                newMobileCode = true;
            },
            failed: function(input) {
                newMobileCode = false;
            }
        },
        '#rand_s': {
            option: 'blur',
            len: 4,
            requiredTip: '请输入验证码',
            lenTip: '验证码错误',
            success: function(input) {
                newRand = true;
            },
            failed: function(input) {
                newRand = false;
            }
        }
    }, {
        required: true
    });

    //step1
    $('#identity_code_img,#identity_code_btn').on('click', function() {
        $('#identity_code_img').attr('src', '/front/authCode?t=' + new Date().getTime());
    });

    $('#mobileCode,#rand,#mobile,#mobileCode_s,#rand_s').on('focus', function() {
        $(this).next('.msg-error').hide().text('');
    });
    init();
    function init() {
        $.ajax({
            url: '/front/member/security/getMobile',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    $('#validMobile').text(res.data);
                } else {
                    dialog({ content: '网络连接超时，请稍后重试' });
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请稍后重试' });
            }
        });
    }

    //发送手机验证码
    $('#sendMobileCode').on('click', function() {
        if ($('#sendMobileCode').prop('disabled')) {
            return false;
        }
        $('#sendMobileCode').attr('disabled', true);
        $.ajax({
            url: '/front/member/security/sendMobileCode',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    countDown($('#sendMobileCode'), 120)
                    $('#mobileCode').next('.msg-error').show().text('验证码已发送，请查收短信');
                } else if (res && res.code == '01') {
                    $('#mobileCode').next('.msg-error').show().text('短信验证码发送过于频繁，请稍后再试');
                } else {
                    $('#mobileCode').next('.msg-error').show().text('网络繁忙，请稍后重新获取验证码');
                }    
            },
            error: function() {
                $("#mobileCode").next(".msg-error").show().text("网络连接超时");
            }
        });
    });

     //120s倒计时
    function countDown(id, second) {
        var timer = setInterval(function() {
            second--;
            id.removeClass('button_anniu_w').addClass('anniuyzm').val(second + '秒后重新发送');
            if (second <= 0) {
                clearInterval(timer);
                id.removeClass('anniuyzm').addClass('button_anniu_w').val('获取短信验证码');
                id.prop('disabled', false);
            }
        }, 1000);
    }

    $('#identityNextBtn').on('click', function() {
        if ($('#identityNextBtn').prop('disabled')) {
            return;
        }
        if (!$('#mobileCode').val()) {
            $("#mobileCode").next('.msg-error').show().text('请输入短信验证码');
        }
        if (!$('#rand').val()) {
            $('#rand').next('.msg-error').show().text('请输入验证码');
        }
        if (!mobileCode) {
            return;
        }
        if (!rand) {
            return;
        }
        $('#identityNextBtn').attr('disabled', true);
        var _mobileCode = $.trim($('#mobileCode').val());
        var _rand = $.trim($('#rand').val());
        $.ajax({
            url: '/front/member/security/nextAuthentication',
            type: 'POST',
            data: {
                mobileCode: _mobileCode,
                imgCode: _rand
            },
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    $('#identity').hide();
                    $('#modify').show();
                    $('.flow_chart3').addClass('step2');
                    $('.flow_chart3 li').removeClass('cur');
                    $('.flow_chart3 li:nth(1)').addClass('cur');
                    $('.padl').html("修改已验证手机");
                    $('#modify_code_img').trigger("click");// 重置验证码
                } else if (res && res.code == '01') {
                    $("#mobileCode").next('.msg-error').show().text('请输入短信验证码');
                } else if (res && res.code == '02') {
                    $('#rand').next('.msg-error').show().text('请输入验证码');
                } else if (res && res.code == '03') {
                    $("#mobileCode").next('.msg-error').show().text('短信验证码错误');
                    $('#identity_code_img').trigger("click");
                } else if (res && res.code == '04') {
                    $('#rand').next('.msg-error').show().text('验证码错误，请重新输入');
                    $('#identity_code_img').trigger("click");
                } else {
                    dialog({ content: '网络繁忙，请稍后重试' });
                }  
                $('#identityNextBtn').prop('disabled', false);
            },
            error: function() {
                $('#identityNextBtn').prop('disabled', false);
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    });

    //step2
    $('#modify_code_img,#modify_code_btn').on('click', function() {
        $('#modify_code_img').attr('src', '/front/authCode?t=' + new Date().getTime());
    });

    //step2发送短信验证码
    $('#sendMobileCode_s').on('click', function() {
        var _mobile = $.trim($('#mobile').val());
        if ($('#sendMobileCode_s').prop('disabled')) {
            return;
        }
        if (!$('#mobile').val()) {
            $('#mobile').next('.msg-error').show().text('请输入手机号');
        }
        if (!mobile) {
            return;
        }
        $('#sendMobileCode_s').attr('disabled', true);
        $.ajax({
            url: '/front/member/security/sendUpdataMobileCode',
            type: 'GET',
            data: {
                mobile: _mobile
            },
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    countDown($('#sendMobileCode_s'), 120)
                    $('#mobileCode_s').next('.msg-error').show().text('验证码已发送，请查收短信');
                } else if (res && res.code == '01') {
                    $('#mobile').next('.msg-error').show().text('请输入手机号码');
                } else if (res && res.code == '02') {
                    $('#mobile').next('.msg-error').show().text('请输入正确的手机号码');
                } else if (res && res.code == '04') {
                    $('#mobile').next('.msg-error').show().text('您的手机号码已验证过，请更换手机号码');
                    $('#sendMobileCode_s').prop('disabled', false);
                } else if (res && res.code == '05') {
                    $('#mobile').next('.msg-error').show().text('短信验证码发送过于频繁，请稍后再试');
                } else {
                    $('#mobile').next('.msg-error').show().text('网络繁忙,请您稍后重试');
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
                $('#sendMobileCode_s').prop('disabled', false);
            }
        });
    });

    //step2提交
    $('#submitCode').on('click', function() {
        if ($('#submitCode').prop('disabled')) {
            return;
        }
        if (!$('#mobile').val()) {
            $('#mobile').next('.msg-error').show().text('请输入手机号码');
            return;
        }
        if (!$('#mobileCode_s').val()) {
            $('#mobileCode_s').next('.msg-error').show().text('请输入短信验证码');
            return;
        }
        if (!$('#rand_s').val()) {
            $('#rand_s').next('.msg-error').show().text('请输入验证码');
            return;
        }
        if (!mobile || !newMobileCode || !newRand) {
            return;
        }
        $('#submitCode').attr('disabled', true);
        var _mobile = $.trim($('#mobile').val());
        var _mobileCode = $.trim($('#mobileCode_s').val());
        var _rand = $.trim($('#rand_s').val());
        $.ajax({
            url: '/front/member/security/saveUpdateMobile',
            type: 'POST',
            data: {
                mobile: _mobile,
                mobileCode: _mobileCode,
                imgCode: _rand
            },
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    $('#modify').hide();
                    $('#finish').show();
                    $('.flow_chart3').addClass('step3');
                    $('.flow_chart3 li').removeClass('cur');
                    $('.flow_chart3 li:nth(2)').addClass('cur');
                    setFinishPage(res.data);
                    $('.padl').html("完成修改");
                } else if (res && res.code == '01') {
                    $('#mobile').next('.msg-error').show().text('请输入手机号码');
                } else if (res && res.code == '02') {
                    $('#mobile').next('.msg-error').show().text('请输入正确的手机号码');
                } else if (res && res.code == '03') {
                    $('#mobileCode_s').next('.msg-error').show().text('请输入短信验证码');
                } else if (res && res.code == '04') {
                    $('#rand_s').next('.msg-error').show().text('请输入验证码');
                } else if (res && res.code == '05') {
                    $('#mobile').next('.msg-error').show().text('您的手机号码已验证过，请更换手机号码');
                } else if (res && res.code == '06') {
                    $('#mobileCode_s').next('.msg-error').show().text('短信验证码错误');
                } else if (res && res.code == '07') {
                    $('#rand_s').next('.msg-error').show().text('验证码错误，请重新输入');
                } else {
                    $('#mobile').next('.msg-error').show().text('网络繁忙，请稍后重试');
                }
                $('#submitCode').prop('disabled', false);
                $('#modify_code_img').trigger("click");
            },
            error: function() {
                $('#submitCode').prop('disabled', false);
                dialog({ content: '网络连接超时，请稍后重试' });
            }
        });
    });

    //设置step3页面
    function setFinishPage(safeLevel) {
        safeLevel = safeLevel || 1;
        var level = {
            low: {
                text: '低',
                tip: '您的帐户安全级还能提升哦，快去<a href="/member/security.html" style="margin:0 5px;color:#ff3000">安全中心</a>完善其它安全设置提高评级吧！',
            },
            mid: {
                text: '中',
                tip: '您的帐户安全级还能提升哦，快去<a href="/member/security.html" style="margin:0 5px;color:#ff3000">安全中心</a>完善其它安全设置提高评级吧！'
            },
            high: {
                text: '高',
                tip: '您的账户安全级别较高。'
            }
        }
        var rand = '';
        if (safeLevel == 1) {
            rand = 'low';
        } else if (safeLevel == 2) {
            rand = 'mid';
        } else {
            rand = 'high';
        }
        $('.aq_dengji').find('#strength_title').removeClass().addClass('rank-text' + safeLevel).text(level[rand]['text']);
        $('.aq_dengji').find('#strength_content').removeClass().addClass('rank' + safeLevel);
        $('.aq_dengji').find('.acco-safe-prompt').html(level[rand]['tip']);
    }
});

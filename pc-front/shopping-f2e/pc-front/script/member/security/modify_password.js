require(['jquery', 'form-valid', 'base64', 'header', 'modules/menu'], function($, valid, base64) {

    var mobileCode = false,
        rand = false,
        delayTime = 120,
        newPassWord = false,
        reNewPassword = false,
        code = false;
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
        '#mobileCode_h': {
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
        '#rand_h': {
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
        "#newPassWord": {
            option: "blur",
            minlen: 6,
            maxlen: 20,
            lenTip: "6-20位字符，建议使用字母，数字组合",
            requiredTip: "请输入登录密码，密码长度在6-20位之间",
            success: function(input) {
                newPassWord = true;
                var npwd = $("#newPassWord").val();
                input.next(".msg-error").hide().text("");
                var strengthObj = {
                    text: "week",
                    rank: "rank1",
                    flag: false
                }
                var modes = 0;
                if (/\d/.test(npwd)) modes++;
                if (/[a-z]/.test(npwd)) modes++;
                if (/[A-Z]/.test(npwd)) modes++;
                if (/\W/.test(npwd)) modes++;
                var obj = {
                    week: {
                        _class: 'rank-text1',
                        rank: 'rank1',
                        text: '弱',
                        tip: '密码太弱，有被盗风险，请设置由多种字符组成的复杂密码'
                    },
                    middle: {
                        _class: 'rank-text2',
                        rank: 'rank2',
                        text: '中',
                        tip: ''
                    },
                    strong: {
                        _class: 'rank-text3',
                        rank: 'rank3',
                        text: '强',
                        tip: ''
                    }
                }
                var key = '';
                if (modes <= 1) {
                    key = 'week';
                } else if (modes == 2) {
                    key = 'middle';
                } else {
                    key = 'strong';
                }
                $("#strength").show().find("#strength_title").removeClass().addClass(obj[key]["_class"]).text(obj[key]["text"]);
                $("#strength").show().find("#strength_content").removeClass().addClass(obj[key]["rank"]);
                $("#strength_error").show().text(obj[key]["tip"]);
            },
            failed: function(input) {
                $("#strength").hide();
                $("#strength_error").hide();
                newPassWord = false;
            }
        },
        "#reNewPassWord": {
            option: "blur",
            requiredTip: "请确认密码",
            success: function(input) {
                var newP = $("#newPassWord").val();
                var rNewP = $("#reNewPassWord").val();
                if (newP != rNewP) {
                    $("#reNewPassWord").next(".msg-error").show().text("两次输入的密码不一致，请重试");
                    reNewPassword = false;
                } else {
                    $("#reNewPassWord").next(".msg-error").hide().text("");
                    reNewPassword = true;
                }
            },
            failed: function() {
                $("#reNewPassWord").next(".msg-error").hide();
                reNewPassword = false;
            }
        },
        "#newPassWord_rand": {
            option: "blur",
            len: 4,
            requiredTip: "请输入验证码",
            lenTip: "验证码错误",
            success: function(input) {
                code = true;
                $("#newPassWord_rand").next(".msg-error").hide();
            },
            failed: function(input) {
                code = false;
            }
        }
    }, {
        required: true
    });

    //step1
    $('#rand_h_img,#rand_h_btn').on('click', function() {
        $('#rand_h_img').attr('src', '/front/authCode?t=' + new Date().getTime());
    });

    $('#mobileCode_h,#rand_h').on('click', function() {
        $(this).next('.msg-error').show().text('');
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
                } else if (res && res.code == '00') {
                    $('#validMobile').text(res.data);
                } else {
                    dialog({ content: '网络连接超时，请重新登录' });
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    }

    //发送短信验证码
    $('#sendMobileCode_h').on('click', function() {
        if ($('#sendMobileCode_h').attr('disabled')) {
            return;
        }
        $('#sendMobileCode_h').attr('disabled', true);
        $.ajax({
            url: '/front/member/security/sendMobileCode',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    $('#mobileCode_h').next('.msg-error').show().text('验证码已发送，请查收短信');
                    countDown();
                } else if (res && res.code == '01') {
                    $('#mobileCode_h').next('.msg-error').show().text('短信验证码发送过于频繁，请稍后再试');
                } else {
                    $('#mobileCode_h').next('.msg-error').show().text('网络繁忙，请稍后重新获取验证码');
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    });
    //发短信倒计时
    function countDown() {
        var timer = setInterval(function() {
            delayTime--;
            $('#sendMobileCode_h').removeClass('button_anniu_w').addClass('anniuyzm').val(delayTime + '秒后重新发送');
            if (delayTime <= 0) {
                $('#sendMobileCode_h').removeClass('anniuyzm').addClass('button_anniu_w').val('获取短信验证码');
                clearInterval(timer);
                $('#sendMobileCode_h').prop('disabled', false);
            }
        }, 1000);
    }

    //下一步
    $('#identityNext').on('click', function() {
        if ($('#identityNext').attr('disabled')) {
            return;
        }
        if (!$('#mobileCode_h').val()) {
            $('#mobileCode_h').next('.msg-error').show().text('请输入短信验证码');
        }
        if (!$('#rand_h').val()) {
            $('#rand_h').next('.msg-error').show().text('请输入验证码');
        }
        if (!mobileCode) {
            return;
        }
        if (!rand) {
            return;
        }
        $('#identityNext').attr('disabled', true);
        var _mobileCode = $.trim($('#mobileCode_h').val());
        var _rand = $.trim($('#rand_h').val());
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
                    showNextStep();
                } else if (res && res.code == '01') {
                    $("#mobileCode_h").next('.msg-error').show().text('请输入短信验证码');
                } else if (res && res.code == '02') {
                    $("#rand_h").next('.msg-error').show().text('请输入验证码');
                } else if (res && res.code == '03') {
                    $("#mobileCode_h").next('.msg-error').text('短信验证码错误').show();
                    $('#rand_h_img').trigger("click");
                } else if (res && res.code == '04') {
                    $("#rand_h").next('.msg-error').show().text('验证码错误，请重新输入');
                    $('#rand_h_img').trigger("click");
                } else {
                    dialog({ content: '网络繁忙，请稍后重试' });
                }
                $('#identityNext').prop('disabled', false);
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
                $('#identityNext').prop('disabled', false);
                $('#rand_h_img').trigger("click");
            }
        });
    });

    function showNextStep() {
        $('#newPassWord_rand_img').attr('src', '/front/authCode?t=' + new Date().getTime()); // 重置验证码
        $('.padl').text('设置登录密码');
        $('#identity').hide();
        $('#modify').show();
        $('.flow_chart3').addClass('step2');
        $('.flow_chart3 li').removeClass('cur');
        $('.flow_chart3 li:nth(1)').addClass('cur');
    }

    //step2
    $('#newPassWord_rand_img,#newPassWord_rand_btn').on('click', function() {
        $('#newPassWord_rand_img').attr('src', '/front/authCode?t=' + new Date().getTime());
    });

    $('#modify_next_btn').on('click', function() {
        if ($('#modify_next_btn').attr('disabled')) {
            return;
        }
        if (!$("#newPassWord").val()) {
            $("#newPassWord").next('.msg-error').show().text("请输入登录密码，密码长度在6-20位之间");
        }
        if (!$("#reNewPassWord").val()) {
            $("#reNewPassWord").next('.msg-error').show().text("请确认密码");
        }
        if (!$("#newPassWord_rand").val()) {
            $("#newPassWord_rand").next('.msg-error').show().text("请输入验证码");
        }
        if (!newPassWord) {
            return;
        }
        if (!reNewPassword) {
            return;
        }
        if (!code) {
            return;
        }
        $("#modify_next_btn").attr("disabled", "disabled");
        var newP = $("#newPassWord").val();
        var nPwdCode = $("#newPassWord_rand").val();
        newP = base64.encode(newP);
        $.ajax({
            url: '/front/member/security/saveUserNewPwd',
            type: 'POST',
            data: {
                newPassword: newP,
                imgCode: nPwdCode
            },
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == "00") {
                    newShowNextStep();
                    setSucSafeLevel(res.data);
                } else if (res && res.code == "01") {
                    $("#newPassWord").next(".msg-error").show().text("请输入密码，密码长度在6-20位之间");
                } else if (res && res.code == "02") {
                    $("#newPassWord_rand").next(".msg-error").show().text("验证码错误");
                  } else if (res && res.code == "03") {
                    newShowFailNextStep();
                } else {
                    dialog({ content: '网络连接超时，请重新修改登录密码' });
                } 
                $('#newPassWord_rand_img').trigger("click");              
                $("#modify_next_btn").removeAttr("disabled");
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
                $("#modify_next_btn").removeAttr("disabled");
                $("#newPassWord_rand_img").src = "/front/authCode?t=" + new Date().getTime();
            }
        });
    });
   
   //step3
    function newShowNextStep() {
        $(".flow_chart3").addClass("step3");
        $(".flow_chart3 li").removeClass("cur");
        $(".flow_chart3 li:nth(2)").addClass("cur");
        $("#modify").hide();
        $("#finish").show();
    }

    function newShowFailNextStep() {
        $(".flow_chart3").addClass("step3");
        $(".flow_chart3 li").removeClass("cur");
        $(".flow_chart3 li:nth(2)").addClass("cur");
        $('#isSuc').text('失败');
        $('.yz_fail').show();
        $('.yz_success').hide();
        $("#modify").hide();
        $("#finish").show();
    }

    function setSucSafeLevel(safeLevel) {
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
        if (safeLevel == '1') {
            rand = 'low';
        } else if (safeLevel == '2') {
            rand = 'mid';
        } else {
            rand = 'high';
        }
        $('.aq_dengji').find('#strength_title').removeClass().addClass('rank-text' + safeLevel).text(level[rand]['text']);
        $('.aq_dengji').find('#strength_content').removeClass().addClass('rank' + safeLevel);
        $('.aq_dengji').find('.acco-safe-prompt').html(level[rand]['tip']);
    }

});

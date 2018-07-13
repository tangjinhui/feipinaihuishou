define(['jquery', 'form-valid', 'dialog'], function($, valid, dialog) {

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
        "#mobileCode": {
            option: "blur",
            regexp: /^\d{6}$/,
            errorTip: "手机验证码有误，请重新输入",
            requiredTip: "请输入短信验证码",
            success: function(input) {
                verify["mobileCode"] = true;
            },
            failed: function(input) {
                verify["mobileCode"] = false;
            }
        },
        "#verifyRand": {
            option: "blur",
            len: 4,
            requiredTip: "请输入验证码",
            lenTip: "验证码错误",
            success: function(input) {
                verify["verifyRand"] = true;
            },
            failed: function(input) {
                verify["verifyRand"] = false;
            }
        }
    }, {
        required: true
    });

    var verify = {
        delayTime: 120,
        mobileCode: false,
        verifyRand: false,
        sendMobileCode: function() {
            if ($("#sendMobileCode_h").attr("disabled")) {
                return false;
            }
            $("#sendMobileCode_h").attr("disabled", true);
            $.ajax({
                url: '/front/findPwdSendSms',
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    if (res && res.code == "00") {
                        var timer = setTimeout(verify["countDown"], 1000);
                        $("#mobileCode").next(".msg-error").show().text("验证码已发送，请查收短信。");
                    } else if (res && res.code == "01") {
                        $("#mobileCode").next(".msg-error").show().text("身份信息已过期，请稍后重新获取验证码");
                    } else if (res && res.code == "02") {
                        $("#mobileCode").next(".msg-error").show().text("短信验证码发送过于频繁，请稍后再试");
                    } else {
                        $("#mobileCode").next(".msg-error").show().text("网络繁忙，请稍后重新获取验证码");
                    }
                },
                error: function() {
                    $("#mobileCode").next(".msg-error").show().text("网络连接超时，请重新修改登录密码");
                    changeCode();
                }
            });
        },
        countDown: function() {
            verify["delayTime"]--;
            $("#sendMobileCode_h").attr("disabled", true).addClass('anniuyzm');
            $("#sendMobileCode_h").val(verify["delayTime"] + "秒后重新发送");
            timer = setTimeout(verify["countDown"], 1000);
            if (verify["delayTime"] <= 1) {
                verify["delayTime"] = 120
                $("#sendMobileCode_h").removeAttr("disabled").removeClass('anniuyzm').val("获取短信验证码");
                $("#mobileCode_error").hide()
                clearTimeout(timer);
            }
        },
        submit: function() {
            if ($("#verifyNextBtn").attr("disabled")) {
                return;
            }
            if (!$("#mobileCode").val()) {
                $("#mobileCode").next('.msg-error').show().text("请输入短信验证码");
            }
            if (!$("#verifyRand").val()) {
                $("#verifyRand").next('.msg-error').show().text("请输入验证码");
            }
            if (!this["mobileCode"]) {
                return;
            }
            if (!this["verifyRand"]) {
                return;
            }
            $("#verifyNextBtn").attr("disabled", "disabled");
            var mobileCode = $("#mobileCode").val();
            var verifyRand = $("#verifyRand").val();
            $.ajax({
                url: '/front/findPwdCheckMobCode',
                type: 'GET',
                data: {
                    mobileCode: mobileCode,
                    code: verifyRand
                },
                dataType: 'json',
                success: function(res) {
                    if (res && res.code == "00") {
                        $(".flow_chart4").addClass("step3");
                        $(".flow_chart4 li").removeClass("cur");
                        $(".flow_chart4 li:nth(2)").addClass("cur");
                        $("#newPassWord_code").trigger("click");
                        $("#verify").hide();
                        $("#newpassword").show();
                        return;
                    } else if (res && res.code == "01") {
                        $("#verifyRand").next(".msg-error").show().text("验证码不可为空");
                    } else if (res && res.code == "02") {
                        $("#verifyRand").next(".msg-error").show().text("验证码错误，请重新输入");
                    } else if (res && res.code == "03") {
                        $("#mobileCode").next(".msg-error").show().text("短信验证码错误");
                    } else {
                        dialog({ content: '网络连接超时，请重新修改登录密码' });
                    }
                    $("#verifyRandImg").trigger("click");
                    $("#verifyNextBtn").removeAttr("disabled");
                },
                error: function() {
                    dialog({ content: '网络连接超时，请您稍后重试' });
                    $("#verifyNextBtn").removeAttr("disabled");
                    $("#verifyRandImg").trigger("click");
                }
            });
        }
    }

    return verify;

});

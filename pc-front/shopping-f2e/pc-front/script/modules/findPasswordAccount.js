define(['jquery', 'form-valid'], function($, valid) {

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
        '#username': {
            option: 'blur',
            requiredTip: '请输入您的注册手机号/会员账号',
            success: function(input) {
                account['username'] = true;
            },
            failed: function(input) {
                account['username'] = false;
            }
        },
        '#accountRand': {
            option: 'blur',
            len: 4,
            requiredTip: '请输入验证码',
            lenTip: '验证码错误',
            success: function(input) {
                account['userNameRand'] = true;
            },
            failed: function(input) {
                account['userNameRand'] = false;
            }
        }
    }, {
        required: true
    });

    var account = {
        userName: false,
        userNameRand: false,
        submit: function() {
            if ($("#accountNextBtn").attr("disabled")) {
                return;
            }
            if (!$("#username").val()) {
                $("#username").next('.msg-error').show().text("请输入您的注册手机号/会员账号");
            }
            if (!$("#accountRand").val()) {
                $("#accountRand").next('.msg-error').show().text("请输入验证码");
            }
            if (!this["username"]) {
                return;
            }
            if (!this["userNameRand"]) {
                return;
            }
            $("#accountNextBtn").attr("disabled", "disabled");
            var username = $("#username").val();
            var randCode = $("#accountRand").val();
            $.ajax({
                url: '/front/findPwdCheckAccount',
                type: 'get',
                data: {
                    username: username,
                    code: randCode
                },
                dataType: 'json',
                success: function(res) {
                    if (res && res.code == "00") {
                        $(".flow_chart4").addClass("step2");
                        $(".flow_chart4 li").removeClass("cur");
                        $(".flow_chart4 li:nth(1)").addClass("cur");
                        $("#account").hide();
                        $("#verify").show();
                        $("#nickName").text(res.data.nickname);
                        $("#mobile").text(res.data.mobile);
                        $("#verifyRandImg").attr("src", "/front/authCode?t=" + new Date().getTime());
                        return;
                    } else if (res && res.code == "02") {
                        $("#accountRand").next(".msg-error").show().text("验证码错误，请重新输入。");
                    } else if (res && res.code == "03") {
                        $("#username").next(".msg-error").show().text("您输入的账户名不存在，请核对后重新输入。");
                    } else {
                        dialog({ content: '网络连接超时，请重新修改登录密码' });
                    }
                    $("#accountRandImg").attr("src", "/front/authCode?t=" + new Date().getTime());
                    $("#accountNextBtn").removeAttr("disabled");
                },
                error: function() {
                    dialog({ content: '网络连接超时，请您稍后重试' });
                    $("#accountNextBtn").removeAttr("disabled");
                    $("#accountRandImg").attr("src", "/front/authCode?t=" + new Date().getTime());
                }
            });
        }
    }
    return account;
});

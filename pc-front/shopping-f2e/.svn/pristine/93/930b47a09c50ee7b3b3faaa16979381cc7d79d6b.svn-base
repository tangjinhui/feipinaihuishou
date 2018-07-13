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
        "#newPassWord": {
            option: "blur",
            minlen: 6,
            maxlen: 20,
            lenTip: "6-20位字符，建议使用字母，数字组合",
            requiredTip: "请输入登录密码，密码长度在6-20位之间",
            success: function(input) {
                newpassword["newPassWord"] = true;
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
                $("#strength").show().find("#strength_title").text(obj[key]["text"]);
                $("#strength").show().find("#strength_content").removeClass().addClass(obj[key]["rank"]);
                $("#strength_error").show().text(obj[key]["tip"]);
            },
            failed: function(input) {
                $("#strength").hide();
                $("#strength_error").hide();
                newpassword["newPassWord"] = false;
            }
        },
        "#queryNewPassWord": {
            option: "blur",
            requiredTip: "请确认密码",
            success: function(input) {
                var newP = $("#newPassWord").val();
                var rNewP = $("#queryNewPassWord").val();
                if (newP != rNewP) {
                    $("#queryNewPassWord").next(".msg-error").show().text("两次输入的密码不一致，请重试");
                    newpassword["reNewPassword"] = false;
                } else {
                    $("#queryNewPassWord").next(".msg-error").hide().text("");
                    newpassword["reNewPassword"] = true;
                }
            },
            failed: function() {
                $("#queryNewPassWord").next(".msg-error").hide();
                newpassword["reNewPassword"] = false;
            }
        },
        "#newPassWord_rand": {
            option: "blur",
            len: 4,
            requiredTip: "请输入验证码",
            lenTip: "验证码错误",
            success: function(input) {
                newpassword["code"] = true;
                $("#newPassWord_rand").next(".msg-error").hide();
            },
            failed: function(input) {
                newpassword["code"] = false;
            }
        }
    }, {
        required: true
    })

    var newpassword = {
        newPassWord: false,
        reNewPassword: false,
        code: false,
        submit: function() {
            if ($("#passworda").attr("disabled")) {
                return;
            }
            if (!$("#newPassWord").val()) {
                $("#newPassWord").next('.msg-error').show().text("请输入登录密码，密码长度在6-20位之间");
            }
            if (!$("#queryNewPassWord").val()) {
                $("#queryNewPassWord").next('.msg-error').show().text("请确认密码");
            }
            if (!$("#newPassWord_rand").val()) {
                $("#newPassWord_rand").next('.msg-error').show().text("请输入验证码");
            }
            if (!this["newPassWord"]) {
                return;
            }
            if (!this["reNewPassword"]) {
                return;
            }
            if (!this["code"]) {
                return;
            }
            $("#passworda").attr("disabled", "disabled");
            var newP = $("#newPassWord").val();
            var rNewP = $("#queryNewPassWord").val();
            var nPwdCode = $("#newPassWord_rand").val();
            $.ajax({
                url: '/front/findPwdModifyPwd',
                type: 'POST',
                data: {
                    password: newP,
                    repassword: rNewP,
                    code: nPwdCode
                },
                dataType: 'json',
                success: function(res) {
                    if (res && res.code == "00") {
                        $(".flow_chart4").addClass("step4");
                        $(".flow_chart4 li").removeClass("cur");
                        $(".flow_chart4 li:nth(3)").addClass("cur");
                        $("#newpassword").hide();
                        $("#modify").show();
                    } else if (res && (res.code == "01" || res.code == "03")) {
                        $("#newPassWord").next(".msg-error").show().text(res.msg);
                    } else if (res && res.code == "02") {
                        $("#newPassWord_rand").next(".msg-error").show().text("验证码错误");
                    } else if (res && res.code == "04") {
                        window.location.reload();
                    }else {
                        dialog({ content: '网络连接超时，请重新修改登录密码' });
                    }
                    $("#newPassWord_code").trigger("click");
                    $("#passworda").removeAttr("disabled");
                },
                error: function() {
                    dialog({ content: '网络连接超时，请您稍后重试' });
                    $("#passworda").removeAttr("disabled");
                    $("#newPassWord_code").trigger("click");
                }
            });
        }
    }

    return newpassword;

});

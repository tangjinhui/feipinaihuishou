require(['jquery', 'form-valid', 'base64', 'postMessage'], function($, valid, base64) {

    function blurInput() {
        $("#infoText").hide();
        $("#errorTemp").hide();
        $("#randTemp").hide();
    }

    $("#loginName").blur(function() {
        blurInput()
        var a_loginName = $.trim($("#loginName").val());
        if (!a_loginName) {

            $("#infoText").show();
            $("#infoText").html("请输入注册手机号/会员账号");
        } else {
            $("#infoText").hide();
        }

    });

    $('#js_nopass').on('click', function() {
        var parent_url = window.location.hash.substring(1, window.location.hash.length);
        var _href = $(this).attr('href');
        $.postMessage(
            _href,
            parent_url,
            parent
        );
        return false;
    });

    $('#js_nouser').on('click', function() {
        var parent_url = window.location.hash.substring(1, window.location.hash.length);
        var _href = $(this).attr('href');
        $.postMessage(
            _href,
            parent_url,
            parent
        );
        return false;
    });

    $('.lhy_detail').on('click', 'a', function() {
        var parent_url = window.location.hash.substring(1, window.location.hash.length),
            _href = $(this).attr('href');
        $.postMessage(
            _href,
            parent_url,
            parent
        );
        return false;
    });

    $('#jsClose').on('click', function() {
        var parent_url = window.location.hash.substring(1, window.location.hash.length);
        $.postMessage(
            'close_mini',
            parent_url,
            parent
        );
        return false;
    });


    $("#password").blur(function(event) {
        blurInput()
        var a_password = $.trim($("#password").val());
        if (!a_password) {

            $("#errorTemp").show();
            $("#errorTemp").html("请输入密码");
        } else {
            $("#errorTemp").hide();
            enter(event);
        }

    });

    $("#rand").blur(function() {
        blurInput()
        var a_rand = $.trim($("#rand").val());
        if (!a_rand) {

            $("#randTemp").show();
            $("#randTemp").html("请输入验证码");
        } else {
            $("#randTemp").hide();
        }
    });

    $.ajaxSetup({ cache: false });


    function doDiscuzLogin() {
        //先清除以前的错误信息
        $("#infoText").hide();
        $("#errorTemp").hide();
        $("#randTemp").hide();

        var frm = document.getElementById("logMiniFrm");
        var a_loginName = $.trim($("#loginName").val());
        var a_password = $.trim($("#password").val());
        var a_rand = $.trim($("#rand").val());
        var pattern = /[\*\(\)\+\"\{\}\\\/;'\[\]]/im;
        if (!a_loginName) {
            $("#infoText").show();
            $("#infoText").html("请输入注册手机号/会员账号");
        } else if (a_loginName && pattern.test(a_loginName)) {
            $("#loginName").attr("style", "border-color:#e4393c");
            $("#infoText").show();
            $("#infoText").html("登录名中含有特殊字符");
        } else if (!a_password) {
            $("#errorTemp").show();
            $("#errorTemp").html("请输入密码");
        } else if (!$("#loginFailedRand").is(':hidden') && !a_rand) {
            $("#randTemp").show();
            $("#randTemp").html("请输入验证码");
        } else {
            $("#login_user").attr('disabled', true).val('正在登录...');
            var username = a_loginName;
            var pwd = $.base64.btoa(a_password);
            var rand = a_rand;
            var data = {
                username: username,
                password: pwd,
                code: rand
            }
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: data,
                dataType: 'json',
                success: function(res) {
                    if (res && '00' != res.code) {
                        if (res.data.auth || $("#js_code").is(":visible")) {
                            $("#loginFailedRand").show();
                            changeCode();
                        }
                        $('#login_user').removeAttr('disabled').val('登录');
                        if (res.msg == '验证码错误') {
                            $('#randTemp').show().html(res.msg);
                        } else {
                            $('#infoText').show().html(res.msg);
                        }
                    } else {
                        $('#infoText').hide();
                        $('#errorTemp').hide();
                        $('#randTemp').hide();
                        var parent_url = window.location.hash.substring(1, window.location.hash.length);
                        $.postMessage(
                            'isLogin',
                            parent_url,
                            parent
                        );
                    }
                },
                error: function() {
                    $('#login_user').removeAttr('disabled').val('登录');
                    $('#infoText').show().html('用户名或密码不匹配');
                }
            });
        }

    }

    $('#login_user').click(function() {
        doDiscuzLogin();
    });

    $('#jsChangeCode,#change_code').click(function(){
        changeCode();
    });

    function changeCode(){
        $('#change_code').attr('src', '/user/authCode?t=' + new Date().getTime());
    }

    function enter(evt, frm) {
        if (window.event != null) {
            if (window.event.keyCode == 13) {
                doDiscuzLogin();
            }
        } else {
            if (evt.keyCode == 13) {
                doDiscuzLogin();
            }
        }
    }
    document.onkeydown = function(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            doDiscuzLogin();
        }
    };

});

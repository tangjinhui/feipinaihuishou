require(['jquery', 'form-valid', 'base64'], function($, valid, base64) {

    valid.settings = {
        initTip: function(input, defaultTip) {

        },
        validTip: function(input, errorInfo, defaultTip) {
            if (errorInfo) {
                $('#js_err').html(errorInfo);
            }
        }
    };
    valid.render({
        '#js_username': {
            option: 'blur',
            requiredTip: '请输入注册手机号/会员账号'
        },
        '#js_password': {
            option: 'blur',
            requiredTip: '请输入密码',
            minlen: 6,
            maxlen: 20,
            lenTip: '用户名或密码不匹配'
        }
    }, {
        required: true,
        success: function(input) {
            $('#js_err').html('');
        }
    });

    $('#js_loginForm').on('submit', function() {
        var commonValider = {
            interrupt: true
        }
        var bool = $(this).formValid(null, commonValider);
        if (!bool) return false;
        var code = $.trim($('#js_code_text').val());
        if ($("#js_code").is(":visible") && !code) {
            $('#js_err').html('请输入验证码');
            return false;
        }
        var username = $('#js_username').val(),
            password = base64.btoa($('#js_password').val(), true),
            code = $('#js_code_text').val();
        $('#js_submit').attr('disabled', true).addClass('disabled').text('正在登录...');
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password,
                code: code
            },
            dataType: 'json',
            success: function(res) {
                if (res && '00' != res.code) {
                    if (res.data.auth || $("#js_code").is(":visible")) {
                        $('#js_code').show();
                        $('#js_changeCode').trigger('click');
                    }
                    $('#js_submit').removeAttr('disabled').removeClass('disabled').text('登录');
                    $('#js_err').html(res.msg);
                } else {
                    $('#js_submit').removeAttr('disabled');
                    var ref = document.referrer;
                    if (!ref || ref == 'https://passportdev.ecgci.com/regist.html' || ref == 'http://pfdev.ecgci.com/find_password.html'){
                        ref = 'http://pfdev.ecgci.com/index.html';
                    }
                    window.location = ref;
                }
            },
            error: function() {
                $('#js_submit').removeAttr('disabled').removeClass('disabled').text('登录');
                $('#js_err').html('用户名或密码不匹配');
            }
        });
        return false;
    });

    $('#js_changeCode,#js_code_img').on('click', function() {
        $('#js_code_img').attr('src', '/user/authCode?t=' + new Date().getTime());
    });
});

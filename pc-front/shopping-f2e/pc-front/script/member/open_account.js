require(['jquery', 'dialog', 'header', 'modules/menu'], function($, dialog) {
    var isRead = true;
    init();

    function init() {
        $.ajax({
            url: '/front/member/transaction/getMemberDetail',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res && res.code == '00') {
                    $('#realName').text(res.data.realName);
                    $('#mobile').text(res.data.mobile);
                    $('#psCode').text(res.data.psCode);
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html'
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

    function openAccount() {
        var sex = $.trim($('input[name="sex"]:checked').val());
        var email = $.trim($('input[name=email]').val());
        if ($('#go_open').attr('disabled')) {
            return;
        }
        if (!sex) {
            dialog({
                content: '请选择性别'
            });
            return;
        }
        if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
            dialog({
                content: '邮箱格式错误，请重新输入'
            });
            return;
        }
        if (email.length > 40) {
            dialog({
                content: '邮箱长度过长，请重新输入'
            });
            return;
        }
        if (!isRead) {
            return;
        }
        $('#go_open').attr('disabled', true);
        $.ajax({
            url: '/front/member/transaction/createTransationAccount',
            type: 'GET',
            dataType: 'json',
            data: {
                email: email,
                sex: sex
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    //跳转至民生
                    var result = JSON.parse(res.data);
                    var form = document.createElement("form");
                    form.action = result.actionURL;
                    form.method = "post";
                    //form.target = "_blank";
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
                } else if (res && res.code == '01') { //01
                    dialog({
                        content: '请选择性别'
                    });
                } else if (res && res.code == '02') { //02
                    dialog({
                        content: '邮箱格式错误，请重新输入'
                    });
                } else if (res && res.code == '03') { //03
                    dialog({
                        content: '邮箱长度过长，请重新输入'
                    });
                } else if (res && res.code == '04') { //04
                    dialog({
                        content: '操作频繁，请您3分钟后再试！'
                    });
                } else if (res && res.code == '05') { //04
                    dialog({
                        content: '您已经提交过开户申请，请刷新页面或稍后再试！'
                    });
                } else if (res && res.code == '06') { //06
                    dialog({
                        content: '不是交易账户'
                    });
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                }
                $('#go_open').prop('disabled', false);
            },
            error: function() {
                $('#go_open').prop('disabled', false);
                dialog({
                    content: '网络连接超时，请您稍后重试'
                });
            }
        });
    }

    $('#go_open').on('click', function() {
        openAccount();
    });

    $('.open_error a').on('click', function() {
        $('.open_error_msg').removeClass('dn');
        return false;
    });

    //同意阅读
    $('#open_check').on('change', function() {
        isRead = !isRead;
        if (isRead) {
            $('#go_open').addClass('btndis').prop('disabled', false);
        } else {
            $('#go_open').removeClass('btndis').prop('disabled', true);
        }
    });

    //创建input
    function createInput(value, name) {
        var input = document.createElement('input');
        input.type = "text";
        input.name = name;
        input.value = value;
        return input;
    }

});

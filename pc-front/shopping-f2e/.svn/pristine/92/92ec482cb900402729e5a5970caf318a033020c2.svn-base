define(['jquery', 'dialog', 'getCookie', 'setCookie'], function($, dialog, getCookie, setCookie) {
    var account = getCookie('transMember') ? getCookie('transMember') : '';
    var nickname = getCookie('nickname');
    if (!account) {
        checkAccount();
    }
    if (account == '1') {
        $('#accountTab').removeClass('dn');
    }
    if (account == '2') {
        $('#accountTab').addClass('dn');
    }

    function checkAccount() {
        var _domain = '.' + document.domain.split('.').slice(-2).join('.');
        $.ajax({
            url: '/front/member/transaction/isTransMemberYesOrNo',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res.code == '03' || res.code == '04') {
                    setCookie('transMember', 1, { path: '/', domain: _domain });
                    $('#accountTab').removeClass('dn');
                } else if (res.code == '00' || res.code == '02') {
                    setCookie('transMember', 2, { path: '/', domain: _domain });
                    $('#accountTab').addClass('dn');
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
    }
});

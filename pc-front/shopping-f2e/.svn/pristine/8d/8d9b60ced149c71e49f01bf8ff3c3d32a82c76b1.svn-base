require(['jquery', 'header', 'modules/menu'], function($) {

    $.ajax({
        url: '/front/member/security/viewMemberValidate',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            if ('99' == res.code) {
                window.location.href = 'https://passportdev.ecgci.com/login.html';
            }
            var imgUrl = img_domain_data[0];
            if (res && res.code == '01') {
                $(".txt_pos").css("top","200px");// 驳回时样式
                $('.cj_sjcborder').show();
                $('.cj_sjcborder').text('审核不通过原因：' + res.data.auditReason);
                $('input[name="cardId"]').val(res.data.cardId);
                $('input[name="realName"]').val(res.data.realName);
                $('#loadImage a').attr('href', imgUrl + res.data.picFront);
                $('#loadImage img').attr('src', imgUrl + res.data.picFront);
                $('#loadImageBack a').attr('href', imgUrl + res.data.picBack);
                $('#loadImageBack img').attr('src', imgUrl + res.data.picBack);
            } else if (res && res.code == '02') {
                $('.cj_sjcborder').hide();
                $('input[name="cardId"]').val(res.data.cardId);
                $('input[name="realName"]').val(res.data.realName);
                $('#loadImage a').attr('href', imgUrl + res.data.picFront);
                $('#loadImage img').attr('src', imgUrl + res.data.picFront);
                $('#loadImageBack a').attr('href', imgUrl + res.data.picBack);
                $('#loadImageBack img').attr('src', imgUrl + res.data.picBack);
            } else {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        },
        error: function() {
            dialog({ content: '网络连接超时，请您稍后重试' });
        }
    });

    $('#returnBut').on('click', function() {
        window.location.href = '/member/security.html';
    });

});

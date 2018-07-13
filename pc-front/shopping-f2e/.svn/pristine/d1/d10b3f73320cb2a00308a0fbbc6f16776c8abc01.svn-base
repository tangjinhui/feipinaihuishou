require(['jquery', 'getCookie', 'base64'], function($, getCookie, base64) {
    var nickName = $.base64.atob(decodeURI(getCookie('nickname')));
    if (nickName) {
        $(".nickname").html(nickName);
    }
    $('.toIndex').click(function() {
        window.location.href = 'http://pfdev.ecgci.com/index.html';
    });

    var i = 10;
    var timer = setInterval(function() {
        $('#ShowSpan2').text(i--);
        if (i == 0) {
            window.location.href = 'http://pfdev.ecgci.com/index.html';
            clearInterval(timer);
        }
    }, 1000);
});

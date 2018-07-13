define(['jquery', 'postMessage'], function($) {

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    }

    var iframeUrl = 'https://passportdev.ecgci.com/mini_login.html#' + window.location.origin;

    var iframe = '<div class="thickdiv"></div><iframe id="logForm_s" src="' + iframeUrl + '" frameborder="0"></iframe>';

    $('body').append(iframe);

    var Login = {

        show: function() {
            $('.thickdiv').show();
            $('#logForm_s').show();
        },

        hide: function() {
            $('.thickdiv').hide();
            $('#logForm_s').hide();
        }

    }

    $.receiveMessage(
        function(e) { 
            if (e.data == 'close_mini') {
                Login.hide();
            } else if (e.data == 'isLogin') {
                window.location.reload();
            } else {
                window.location.href = e.data;
            }
        }
    );

    return Login;

});

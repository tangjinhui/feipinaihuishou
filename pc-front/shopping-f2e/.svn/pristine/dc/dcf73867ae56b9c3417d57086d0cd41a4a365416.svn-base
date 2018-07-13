require(['jquery', 'modules/findPasswordAccount', 'modules/findPasswordVerify', 'modules/findPasswordNewpassword', 'header'], function($, Account, Verify, Newpassword) {

    function changeCode(objId) {
        var timeNum = new Date().getTime();
        objId.src = "/front/authCode?t=" + timeNum;
    }

    $("#accountRandImg,#accountCodeBtn").on('click', function() {
        var accountRandImg = document.getElementById('accountRandImg');
        changeCode(accountRandImg);
    });

    $("#verifyRandImg,#verifyCodeBtn").on('click', function() {
        var verifyRandImg = document.getElementById('verifyRandImg');
        changeCode(verifyRandImg);
    });

    $("#newPassWord_code,#codeBtn").on('click', function() {
        var newPassWord_code = document.getElementById('newPassWord_code');
        changeCode(newPassWord_code);
    });

    $('#accountNextBtn').on('click', function() {
        Account.submit();
    });

    $('#verifyNextBtn').on('click', function() {
        Verify.submit();
    });

    $("#sendMobileCode_h").on("click", function() {
        Verify.sendMobileCode();
    });

    $("#passworda").on("click", function() {
        Newpassword.submit();
    });

    $("#username,#accountRand,#mobileCode,#verifyRand").on('focus', function() {
        $(this).next('.msg-error').hide();
    });

});

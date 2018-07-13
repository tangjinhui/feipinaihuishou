require(['jquery', 'handlebars', 'dialog', 'getUrlParam', 'base64', 'header'], function($, Handlebars, dialog, getUrlParam, base64) {
    var newSignature = getUrlParam('newSignature');
    //var newSignature = 'MDAwMDAwOjE1OTg2NTozMDIwOjM2MDE3NyYwMDAwMDA6MTU5ODY2OjY0ODgwOjM2MDE3Nw==';    
    if (!newSignature) return;

    Handlebars.registerHelper("orderPayActual", function(orderPrice) {
        return parseFloat(orderPrice).toFixed(2);
    });

    var orderId = '';
    submitOrderDetail();

    function submitOrderDetail() {
        var orderDeail = base64.decode(newSignature);
        var successOrderList = new Array();
        var failOrderGoodsId = "";
        var failFlag = '';
        // var flag = orderDeail.indexOf("&");
        var arrVO = orderDeail.split("&");
        for (var i = 0; i < arrVO.length; i++) {
            arr = arrVO[i].split(":");
            if (i == 0) {
                orderId = arr[1];
            }
            if ("000000" == arr[0]) {
                successOrderList.push({ orderId: arr[1], orderPrice: arr[2] });
            } else {
                failFlag += arr[0] + ','
                failOrderGoodsId += arr[1] + ',';
            }
        }

        var data = {
            successOrderList: successOrderList,
        }
        if (successOrderList.length) {
            timeAjax(failFlag, failOrderGoodsId);
            $("#success").show();
            var listTemp = Handlebars.compile($("#content-template").html());
            $('#content_box').html(listTemp(data));
        } else {
            $("#error").show();
        }

    }
    var timeFail = '';
    var orderStatus = '';

    function timeAjax(failFlag, failOrderGoodsId) {
        $.ajax({
            url: '/front/member/order/getSubmitOrderDetail',
            type: 'get',
            dataType: 'json',
            data: {
                orderId: orderId,
                failFlag: failFlag,
                failOrderGoodsId: failOrderGoodsId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    $("#timeOut").text(res.data.orderFilureTimeShow);
                    timeFail = res.data.timeOut;
                    orderStatus = res.data.orderStatus;
                    var failOrderList = res.data.failSubmitOrderList;
                    if (failOrderList.length) {
                        var str = '';
                        for (var i = 0; i < failOrderList.length; i++) {
                            str += '<div>' + failOrderList[i] + '</div>'
                        }
                        $('#goods').html(str);
                        $('#hqp').show();
                        $('#jsShwin').show();
                    }
                    countdown();
                    getRTime();
                } else if (res.code == '01') {
                    $('#content_box').hide();
                    window.location.href = 'http://pfdev.ecgci.com/member/order.html';
                } else {
                    $('#content_box').hide();
                    dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
                }
            },
            error: function() {
                $('#content_box').hide();
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
            }
        });
    }

    $('body').on('click', "#chooseBlank", function() {
        var orderId = $(this).attr('data-orderId');
        var hh = $('#jp_cpword_timeH').html(); // 时
        var mm = $('#jp_cpword_timeM').html(); // 分
        var ss = $('#jp_cpword_timeS').html(); // 秒
        if ((hh == 0 && mm == 0 && ss == 0) || (orderStatus == '-3')) { //orderStatus == '-3'
            document.location.href = "/member/order.html"
        } else {
            window.open("/member/order/pay_type.html?orderId=" + orderId);
        }

    });
    $('body').on('click', '#orderId', function() {
        var orderId = $(this).attr('data-orderId');
        document.location.href = "/member/order/detail.html?orderId=" + orderId;
    });

    var t;

    function getRTime() {
        if (timeFail > 0) {
            t = setInterval(countdown, 1000);
        }
    }

    function countdown() {
        var d = Math.floor(timeFail / 60 / 60 / 24 % 24);
        var h = Math.floor(timeFail / 60 / 60 % 24);
        var m = Math.floor(timeFail / 60 % 60);
        var s = Math.floor(timeFail % 60);
        if (d > 0) {
            $('#jp_cpword_timeD').text(d + ':天');
        } else {
            $('#jp_cpword_timeD').hide();
        }
        $('#jp_cpword_timeH').text(h + ':');
        $('#jp_cpword_timeM').text(m + ':');
        $('#jp_cpword_timeS').text(s);
        if (timeFail <= 0 && typeof(t) != 'undefined') {
            clearInterval(t);
        }
        timeFail = timeFail - 1;
    }
    $('body').on('click', '#topQueDing', function() {
        $('#jsShwin').hide();
        $('#hqp').hide();
    });
    $('body').on('mouseover', '#topQueDing', function() {
        $("#topQueDing").css("background-color", "#e43a3d");
        $("#topQueDing").css("color", "#f6f6f6");
    });
    $('body').on('mouseout', '#topQueDing', function() {
        $("#topQueDing").css("background-color", "#ffffff");
        $("#topQueDing").css("color", "#666");
    });
});

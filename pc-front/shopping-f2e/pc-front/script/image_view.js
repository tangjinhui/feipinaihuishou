require(['jquery', 'handlebars', 'getUrlParam', 'mini_login', 'dialog', 'modules/addCart', 'modules/addFavor'], function($, Handlebars, getUrlParam, mini_login, dialog) {

    var goodsId = getUrlParam('goodsId');
    if (!goodsId) {
        return false;
    }
    var currNum;
    var maxNum;
    var imgUrl = 'http://static.ecgci.com/';
    init();

    function init() {
        $.ajax({
            url: '/front/imageView',
            type: 'get',
            dataType: 'json',
            data: { goodsId: goodsId },
            success: function(res) {
                if (res.code == '00') {
                    $('.tit').html(res.data.goodsName);
                    $('.tit').next().attr('href', 'http://itemdev.ecgci.com/product_detail_' + goodsId + '.html');
                    $('.addCart').attr('data-goodsId', goodsId);
                    $('.addFavor').attr('data-goodsId', goodsId);
                    if (res.data.canAddCart) {
                        $('.addCart').show();
                    } else {
                        $('.addCart').hide();
                    }
                    var imageInfoTemplate = Handlebars.compile($('#image-info-template').html());
                    $('#imageInfo').html(imageInfoTemplate(res.data));

                    maxNum = parseInt($(".Pro_Images img").length);
                    $(".Pro_Images img").first().addClass('active');
                    $(".Pro_Images img").each(function(index) {
                        if (index > 0) {
                            $(this).removeClass("active");
                            $(this).css({ 'filter': 'alpha(opacity=30)', 'opacity': '0.3' });
                        }
                    })
                    var firstObjName = $(".Pro_Images img").first().attr('name');
                    $(".Pro_BigImage img").attr('name', firstObjName.split("||")[0]).attr('src', imgUrl + firstObjName.split("||")[1]);
                    $(".Pro_BigImage img").click(function() {
                        getNum("next");
                    })
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        });
    }

    $('.uppre').click(function() {
        getNum("prev");
    })

    $('.downpre').click(function() {
        getNum("next");
    })

    function getNum(action) {
        currNum = parseInt($(".Pro_BigImage img").attr('name'));
        var currNumTemp;
        if (action == "prev") {
            if (currNum == 0) {
                currNum = maxNum;
            };
            currNumTemp = currNum - 1;
        } else {
            if (currNum == maxNum - 1) {
                currNum = -1;
            };
            currNumTemp = currNum + 1;
        }
        $(".Pro_Images img").each(function() {
            $(this).removeClass("active");
            $(this).css({ 'filter': 'alpha(opacity=30)', 'opacity': '0.3' });
        })
        $(".Pro_Images img").eq(currNumTemp).addClass('active');
        $(".Pro_Images img").eq(currNumTemp).css({ 'filter': 'alpha(opacity=100)', 'opacity': '1' });
        $(".Pro_BigImage img").hide();
        var currImageName = $(".Pro_Images img").eq(currNumTemp).attr('name');
        $(".Pro_BigImage img").attr('name', currImageName.split("||")[0]).attr('src', imgUrl + currImageName.split("||")[1]);
        $(".Pro_BigImage img").fadeIn();
    }

    $('body').on('mouseover', '.Pro_Images img', function() {
        $(this).css({ 'filter': 'alpha(opacity=100)', 'opacity': '1' });
    });
    $('body').on('mouseout', '.Pro_Images img', function() {
        if (!$(this).hasClass('active')) {
            $(this).css({ 'filter': 'alpha(opacity=30)', 'opacity': '0.3' });
        }
    });
    $('body').on('click', '.Pro_Images img', function() {
        $(".Pro_Images img").each(function() {
            $(this).removeClass("active");
            $(this).css({ 'filter': 'alpha(opacity=30)', 'opacity': '0.3' });
        })
        $(this).addClass('active').css("filter", "alpha(opacity=100)").css("opacity", "1");
        var thisObjName = $(this).attr('name');
        $(".Pro_BigImage img").hide();
        $(".Pro_BigImage img").first().attr('src', imgUrl + thisObjName.split("||")[1]).attr('name', thisObjName.split("||")[0]);
        $(".Pro_BigImage img").fadeIn();
    });
});

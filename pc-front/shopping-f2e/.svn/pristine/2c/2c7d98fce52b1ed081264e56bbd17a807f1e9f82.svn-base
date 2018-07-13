require(['jquery', 'handlebars', 'limitPage', 'header', 'header', 'modules/menu'], function($, Handlebars, limitPage) {

    Handlebars.registerHelper("formatMaxPrice", function(maxPrice) {
        maxPrice = '' + maxPrice;
        return maxPrice.indexOf('.') != -1 ? maxPrice : maxPrice + '.00';
    });


    initData();

    function initData(pageNum) {
        var data = {
            pageNum: pageNum || 1,
            appliyStatus: $('.appliyStatus').find('.select').attr("data-status")
        }
        $.ajax({
            url: '/front/member/auction/myAuctionList',
            type: 'get',
            dataType: 'json',
            data: data,
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemp(res.data.page));
                    if (res.data.page.list.length) {
                        $('.None_record').hide();
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    } else {
                        $('.pageLimit').hide();
                        $('.None_record').show();
                    }


                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        });
    }

    function initLimitPage(pages, currentPage) {
        $('.pageLimit').show();
        $('#light-pagination').pagination({
            pages: pages,
            cssStyle: 'light-theme',
            displayedPages: 3,
            edges: 3,
            currentPage: currentPage,
            prevText: '上一页',
            nextText: '下一页',
            onPageClick: function(page) {
                initData(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }

    $('.appliyStatus').find('li').on('click', function() {
        $(this).siblings().removeClass("select");
        $(this).addClass("select");
        initData(1);
    });

    Handlebars.registerHelper("power", function(orderId) {
        var str = '';
        if (orderId != null) {
            str += '<a href="/member/order/detail.html?orderId=' + orderId + '">查看订单</a>';
        }
        return str;
    });
});

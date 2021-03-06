require(['jquery', 'handlebars', 'limitPage', 'dialog', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog) {

    Handlebars.registerHelper("addIndex", function(index, options) {
        return parseInt(index) + 1;
    });

    var isFirst = true;

    //初始加载
    conductReserve();
    function conductReserve(pageNum) {
        var data = {
            pageNum: pageNum || 1
        }
        $.ajax({
            url: '/front/member/reserve/myConductReserveList',
            type: 'get',
            data: data,
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    if(isFirst && !res.data.length) {
                        $('.js_tab').removeClass('act').last().addClass("act");
                        moreReserve();
                        isFirst = false;
                        return ;
                    }
                    var listTemp = Handlebars.compile($("#reserve-template").html());
                    $('.R_box').html(listTemp(res.data));
                    if (res.data.length) {
                        $('.None_record').hide();
                    } else {
                        $('.None_record').show();
                    }
                   
                } else {
                    dialog({content: '网络繁忙，请稍后重试' });
                }
            },
            error: function() {
                dialog({content: '网络繁忙，请稍后重试' });
            }
        });
    }

    function moreReserve(pageNum) {
        var data = {
            pageNum: pageNum || 1
        }
        $.ajax({
            url: '/front/member/reserve/myReserveList',
            type: 'get',
            dataType: 'json',
            data: data,
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('.R_box').html(listTemp(res.data.page));
                    if (res.data.page.list.length) {
                        $('.None_record').hide();
                        initLimitPage(res.data.page.pages, res.data.page.pageNum, moreReserve);
                    } else {
                        $('.None_record').show();
                    }
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
            }
        });
    }

    function initLimitPage(pages, currentPage, init) {
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
                init(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }

    $('.flag').find('span').on('click', function() {
        $(this).siblings().removeClass("act");
        $(this).addClass("act");
        var flag = $(this).attr("data-status");
        if (0 == flag) {
            moreReserve();
        } else if (1 == flag) {
            conductReserve();
        }
    });

    Handlebars.registerHelper("power", function(orderId) {
        var str = '';
        if (orderId != null) {
            str += '<a href="http://pfdev.ecgci.com/member/order/detail.html?orderId=' + orderId + '">查看订单</a>';
        }
        return str;
    });

});

require(['jquery', 'handlebars', 'limitPage', 'dialog', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog) {


    Handlebars.registerHelper("addIndex", function(index, options) {
        return parseInt(index) + 1;
    });
    Handlebars.registerHelper("power", function(can, status) {
        var str = '';
        if (can) {
            str += '<a data-id="{{orderId}}" href="/member/order.html?orderType=51">查看订单</a>'
        }
        if (status == '已中签' || status == '履约中' || status == '履约完毕' || status == '已违约') {
            str += '&nbsp;<a href="/doing/year_reserve.html" target="_blank">协议下载</a>'
        }
        return str;
    });
    initDataAjax();

    function initDataAjax(pageNum) {
        var data = {
            pageNum: pageNum || 1
        }
        $.ajax({
            url: '/front/member/reserve/myReserveYearList',
            type: 'get',
            dataType: 'json',
            data: data,
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    initData(res.data);
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
            }
        });
    }

    function initData(data) {
        var listTemp = Handlebars.compile($("#list-template").html());
        $('#list_box').html(listTemp(data.page));
        if (data.page.list.length) {
            $('.None_record').hide();
            initLimitPage(data.page.pages, data.page.pageNum);
        } else {
            $('.pageLimit').hide();
            $('.None_record').show();
        }
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
                initDataAjax(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }


});

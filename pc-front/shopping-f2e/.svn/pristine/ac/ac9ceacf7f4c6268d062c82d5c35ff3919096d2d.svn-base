require(['jquery', 'handlebars', 'limitPage', 'header', 'modules/menu'], function($, Handlebars, limitPage) {

    Handlebars.registerHelper("replyData", function(data) {
        var str = '';
        if (data) {
            str = data;
        } else {
            str = '咨询的问题正在受理中......';
        }
        return str;
    });

    initDate();

    function initDate(pageNum) {
        $.ajax({
            url: '/front/member/consult/queryEsGoodsConsultingList',
            type: 'get',
            dataType: 'json',
            data: {
                pageNum: pageNum || 1
            },
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
                initDate(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }
});

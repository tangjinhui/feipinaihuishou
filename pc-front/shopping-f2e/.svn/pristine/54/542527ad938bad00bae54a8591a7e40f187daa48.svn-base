require(['jquery', 'handlebars', 'limitPage', 'dialog', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog) {

    Handlebars.registerHelper('setType', function(type, option) {
        if (type >= 0) {
            return '增加';
        } else {
            return '扣减';
        }
    });
    Handlebars.registerHelper('setFontColor', function(num, option) {
        if (num >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    });
    Handlebars.registerHelper("dataLen", function(list, options) {
        if (list.length) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    init();

    //init 初始化页面数据
    function init(pageNum) {
        var data = {
            pageNum: pageNum || 1,
            flag: $('[name=flag1]').val()
        };
        $.ajax({
            url: '/front/member/point/accontPointList',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function(res) {
                if (res && res.code == '00') {
                    $('#points').text(res.data.points);
                    var beanTemplate = Handlebars.compile($('#list-template').html());
                    $('#list_box').html(beanTemplate(res.data.page));
                    if (res.data.page.pages >= 1) {
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    } else {
                        $('.pageLimit').hide();
                    }
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                }
            },
            error: function() {
                dialog({
                    content: '网络繁忙，请您稍后重试'
                });
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
                init(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }

    $('select').on('change', function() {
        init();
    });

});

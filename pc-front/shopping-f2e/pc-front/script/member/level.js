require(['jquery', 'handlebars', 'limitPage', 'dialog', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog) {

    Handlebars.registerHelper("dataLen", function(list, options) {
        if (list.length) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    init();

    function init(pageNum) {
        $.ajax({
            url: '/front/member/level/accountLevelList',
            type: 'GET',
            dataType: 'json',
            data: {
                pageNum: pageNum || 1
            },
            success: function(res) {
                if (res && res.code == '00') {
                    $('#levelName').text(res.data.levelInfo.levelName);
                    $('#levelImg').attr('src', img_domain_data[1234 % img_domain_data.length] + res.data.levelInfo.levelImg);
                    $('#markValue').text(res.data.levelInfo.markValue);
                    var listTemplate = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemplate(res.data.page));
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

});

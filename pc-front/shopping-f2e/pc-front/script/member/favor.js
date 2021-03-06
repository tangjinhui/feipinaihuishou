require(['jquery', 'handlebars', 'limitPage', 'dialog', 'modules/addCart', 'modules/cancelFavor', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog) {

    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });

    Handlebars.registerHelper("commentStar", function(star) {
        var str = '';
        for (var i = 0; i < star; i++) {
            str += '<span class="cur"></span>';
        }
        if (star < 5) {
            for (var i = 0; i < 5 - star; i++) {
                str += '<span></span>';
            }
        }
        return str;
    });

    Handlebars.registerHelper("formatPrice", function(price) {
        if (!price) {
            return '0';
        }
        return parseFloat(price).toFixed(2);
    });
    initData();

    function initData(pageNum) {
        $.ajax({
            url: '/front/member/favory/myFavorList',
            type: 'get',
            dataType: 'json',
            data: { pageNum: pageNum || 1 },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemp(res.data.page));
                    $('.favorCount').html(res.data.page.total);
                    if (res.data.page.list.length) {
                        $('.bord').hide();
                        var count=$('#list_box .addCart').length;
                        if (count == 0) {
                            $('#joinCartUp').hide();
                        }else{
                            $('#joinCartUp').show();
                        }
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    } else {
                        $('.pageLimit').hide();
                        $('.favor-table').hide();
                        $('.bord').show();
                    }
                    $('.allbox').prop('checked', false);
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

    $('body').on('change', '.allbox', function() {
        var checked = $(this).is(':checked');
        $('input[type=checkbox]').prop('checked', checked);
    });

    $('body').on('change', 'input[name=fid_goodsId][type=checkbox]', function() {
        var checkedLen = $('input[name=fid_goodsId][type=checkbox]:checked').length;
        var trLen = $('input[name=fid_goodsId][type=checkbox]').length;
        if (checkedLen == trLen) {
            $('.allbox').prop('checked', true);
        } else {
            $('.allbox').prop('checked', false);
        }
    });
});

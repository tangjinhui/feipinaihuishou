require(['jquery', 'handlebars', 'getUrlParam', 'dialog', 'limitPage', 'header'], function($, Handlebars, getUrlParam, dialog, limitPage) {

    var goodsId = getUrlParam('goodsId');
    if (!goodsId) {
        return false;
    }
    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });

    Handlebars.registerHelper("starComment", function(star) {
        if (star == '0') {
            return 5;
        } else {
            return star;
        }
    })

    Handlebars.registerHelper("formatPrice", function(price) {
        if (!price) {
            return '';
        }
        return parseFloat(price).toFixed(2);
    });

    Handlebars.registerHelper('rowClass', function(handleStatus, index) {
        var str = 'class="clearfix"';
        if (parseInt(handleStatus) == -6 || parseInt(handleStatus) == -5) {
            str = 'class="clearfix red"';
        }
        return str;
    });

    Handlebars.registerHelper('dis', function(orderType) {
        if ('onlinePerson' == orderType) {
            return "inBlock";
        } else {
            return "dn";
        }
    });


    Handlebars.registerHelper('status', function(handleStatus) {
        var str = '已成交';
        if (parseInt(handleStatus) == -6) {
            str = '成交后退货/退订';
        } else if (parseInt(handleStatus) == -5) {
            str = '成交后部分退货'
        }
        return str;
    });

    initDetail();
    init();

    function initDetail() {
        $.ajax({
            url: '/front/comment/productGoodsDetail',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId,
            },
            success: function(res) {
                if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#goods-template").html());
                    $('#goodsInfo').html(listTemp(res.data));
                    $('#goodsLink').html('<a href="http://itemdev.ecgci.com/product_detail_'+res.data.goodsId+'.html">'+res.data.goodsName+'</a>');
                } else {
                    dialog({
                        content: '网络连接超时，请您稍后重试',
                    });
                    return false;
                }
            },
            error: function() {
                dialog({
                    content: '网络连接超时，请您稍后重试',
                });
                return false;
            }
        });
    };

    function init(pageNum) {
        $.ajax({
            url: '/front/comment/buyRecordList',
            type: 'get',
            dataType: 'json',
            data: {
                pageNum: pageNum || 1,
                goodsId: goodsId
            },
            success: function(res) {
                if (res.code == '00') {
                    var buyRecordTemp = Handlebars.compile($("#buy-record-template").html());
                    $('#buyRecord').html(buyRecordTemp(res.data.page));
                    if (res.data.page.list.length) {
                        $('.pagetycp').show();
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    } else {
                        $('.pageLimit').hide();
                        $('.pagetycp').hide();
                    }
                } else {
                    dialog({
                        content: '网络连接超时，请您稍后重试',
                    });
                    return false;
                }
            },
            error: function() {
                dialog({
                    content: '网络连接超时，请您稍后重试',
                });
                return false;
            }
        });
    }

    function initLimitPage(pages, currentPage) {
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
                return false;
            }
        });
    }

    $('body').on('mouseenter', '.inBlock', function() {
        $(this).find('.border_red').show();
    }).on('mouseleave', '.inBlock', function() {
        $(this).find('.border_red').hide();
    })
});

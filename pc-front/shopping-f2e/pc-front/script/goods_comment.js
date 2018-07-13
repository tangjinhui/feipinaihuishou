require(['jquery', 'handlebars', 'getUrlParam', 'limitPage', 'dialog', 'header'], function($, Handlebars, getUrlParam, limitPage, dialog ) {
    var goodsId = getUrlParam('goodsId');

    if (!goodsId) {
        return false;
    };

    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });

    Handlebars.registerHelper("starComment", function(star) {
        if (star == '0') {
            return 5;
        } else {
            return star;
        }
    });

    Handlebars.registerHelper("formatPrice", function(price) {
        if (!price) {
            return '';
        }else{
            return parseFloat(price).toFixed(2);
        }
    });

    Handlebars.registerHelper("info", function(count, options) {
        if (count > 0) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper("addIndex", function(index, replyCount) {
        return (replyCount - index);
    });

    Handlebars.registerHelper("compare", function(index, count, options) {
        if (index < count) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('dateSub', function(date) {
        return date.substring(0, 10);
    });

    Handlebars.registerHelper('topic', function(essence, options) {
        if (essence == '0') {
            return options.fn(this);
        }
    });

    initDetail();

    initCommentCount();

    initCommentList("all");
    //点击赞
    $("body").on('click', '.btn-agree', function() {
        var count = $(this).children("font");
        var commentId = $(this).attr("data-commentId");
        if (!$.trim(commentId)) {
            return false;
        };
        $.ajax({
            url: '/front/member/comment/praise',
            type: 'GET',
            dataType: 'json',
            data: {
                commentId: commentId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    count.text(res.data);
                } else if (res.code == '01') {
                    dialog({ content: '请填写回复内容' });
                    return false;
                } else if (res.code == '02') {
                    dialog({ content: '同一个评价,您只能点击一次哦~' });
                    return false;
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                    return false;
                }
            },
            error: function() {
                dialog({ content: '网络繁忙，请您稍后重试' });
                return false;
            }
        });
    });

    //单独回复
    $('body').on('click', '.btn-reply', function() {
        var status = $($(this).parent(".btns")).next().css('display');
        if (status == 'none') {
            $($(this).parent(".btns")).next().show();
        } else {
            $($(this).parent(".btns")).next().hide();
        }
    });

    //分别回复
    $("body").on('click', '.p-bfc', function() {
        var status = $($(this).parent(".reply-meta")).next().css("display");
        if (status == 'none') {
            $($(this).parent(".reply-meta")).next().show();
        } else {
            $($(this).parent(".reply-meta")).next().hide();
        }
    });

    //回复保存
    $("body").on("click", ".btn-gray", function() {
        var content = $.trim($(this).prev().children("input").val());
        var account = $.trim($(this).attr("data-account"));
        var commentId = $.trim($(this).attr("data-commentid"));
        var info = $(this).prev().children("input");
        if (!commentId) {
            return false;
        };
        if (!account) {
            dialog({ content: '网络繁忙，请您稍后重试' });
            return false;
        };
        if (!content) {
            dialog({ content: '请输入回复内容!' });
            return false;
        };
        if (content.length > 100) {
            dialog({ content: '回复内容不能超过100个字' });
            return false;
        };
        $.ajax({
            url: '/front/member/comment/saveReplyContent',
            type: 'POST',
            dataType: 'json',
            data: {
                commentId: commentId,
                commentAccount: account,
                content: content
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    dialog({ title: '系统提示', content: '内容已提交，请耐心等待后台审核' });
                    info.val(null);
                    return false;
                } else if (res.code == '01') {
                    dialog({ title: '系统提示', content: '请填写回复内容' });
                    return false;
                } else if (res.code == '02') {
                    dialog({ title: '系统提示', content: '回复内容不能超过100个字' });
                    return false;
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                    return false;
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                return false;
            }
        });
    });

    //点击查看各类评价
    $("body").on("click", "#pingjia li", function() {
        var key = $(this).attr('data-key');
        if (!$(this).is(".select")) {
            $($(this).parent("#pingjia")).children().removeClass("select");
            $(this).addClass("select");
            initCommentList(key);
        }
    });

    function initDetail() {
        $.ajax({
            url: '/front/comment/productGoodsDetail',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId
            },
            success: function(res) {
                if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#goods-template").html());
                    $('#goodsInfo').html(listTemp(res.data));
                    $('#goodsLink').html('<a href="http://itemdev.ecgci.com/product_detail_'+res.data.goodsId+'.html">'+res.data.goodsName+'</a>');   
                } else {
                    dialog({
                        content: '网络连接超时，请您稍后重试'
                    });
                    return false;
                }
            },
            error: function() {
                dialog({
                    content: '网络连接超时，请您稍后重试'
                });
                return false;
            }
        });
    };

    function initCommentCount() {
        $.ajax({
            url: '/front/comment/productDetailCommentCount',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId
            },
            success: function(res) {
                if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#praise-template").html());
                    $('#goodsPraise').html(listTemp(res.data));
                } else {
                    dialog({ content: '网络连接超时，请您稍后重试' });
                    return false;
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
                return false;
            }
        });
    };

    function initCommentList(flag, pageNum) {
        $.ajax({
            url: '/front/comment/productDetailEsCommentList',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId,
                flag: flag || 'all',
                pageNum: pageNum || 1
            },
            success: function(res) {
                if (res.code == '00') {
                    $(".none_record").hide();
                    var listTemp = Handlebars.compile($("#comment-template").html());
                    $('#goodsCommentList').html(listTemp(res.data.page));
                    if (res.data.page.pageNum != 0) {
                        initLimitPage(res.data.page.pages, res.data.page.pageNum, flag);
                    } else {
                        $(".none_record").show();
                    }
                } else {
                    dialog({
                        content: '网络连接超时，请您稍后重试'
                    });
                    return false;
                }
            },
            error: function() {
                dialog({
                    content: '网络连接超时，请您稍后重试'
                });
                return false;
            }
        });
    };

    function initLimitPage(pages, currentPage, flag) {
        $('#light-pagination').pagination({
            pages: pages,
            cssStyle: 'light-theme',
            displayedPages: 3,
            edges: 3,
            currentPage: currentPage,
            prevText: '上一页',
            nextText: '下一页',
            onPageClick: function(page) {
                initCommentList(flag, page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    };

});

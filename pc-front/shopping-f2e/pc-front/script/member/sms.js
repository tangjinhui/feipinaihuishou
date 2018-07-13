require(['jquery', 'handlebars', 'limitPage', 'dialog', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog) {

    Handlebars.registerHelper("style", function(readFlag) {
        var str = "";
        if (!readFlag || readFlag == 0) {
            str = "sms_style"
        }
        return str;
    })

    initDate();

    function initDate(pageNum) {
        $.ajax({
            url: '/front/member/message/messageList',
            type: 'get',
            dataType: 'json',
            data: {
                pageNum: pageNum || 1
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    $("#messageCount").text(res.data.noReadMemberMessageCount);
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemp(res.data.page));
                    if (res.data.page.pageNum != 0) {
                        $('.none_record').hide();
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    } else {
                        $('.pageLimit').hide();
                        $('.none_record').show();
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

    $('body').on('click', '.title', function() {
        $($(this).parents('tr')[0]).next().show();
        var msgId = $.trim($(this).attr('data-msgId'));
        if (!msgId) {
            dialog({
                content: '网络繁忙，请您稍后重试'
            });
            return false;
        }
        var removeType = $(this).parents("tr").children("td");
        if (!removeType.hasClass('sms_style')) {
            return;
        }
        $.ajax({
            url: '/front/member/message/readMessage',
            type: 'GET',
            dataType: 'json',
            data: {
                memMsgId: msgId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    removeType.removeClass('sms_style');
                    var messageCount = $("#messageCount").text();
                    $("#messageCount").text(parseInt(messageCount) - 1);
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                    return false;
                }
            },
            error: function() {
                dialog({
                    content: '网络繁忙，请您稍后重试'
                });
                return false;
            }
        });
    });

    $("body").on("click", ".detele", function() {
        var msgId = $.trim($(this).attr('data-msgId'));
        if (!msgId) {
            dialog({
                content: '网络繁忙，请您稍后重试'
            });
            return false;
        }
        $.ajax({
            url: '/front/member/message/deleteMessage',
            type: 'GET',
            dataType: 'json',
            data: {
                memMsgId: msgId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    initDate(1);
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                    return false;
                }
            },
            error: function() {
                dialog({
                    content: '网络繁忙，请您稍后重试'
                });
                return false;
            }
        });
    });

    $('body').on('click', '.close', function() {
        $($(this).parents('tr')).hide();
    })
});

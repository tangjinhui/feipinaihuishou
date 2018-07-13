require(['jquery', 'handlebars', 'limitPage', 'dialog', 'getUrlParam', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog, getUrlParam) {
    var complaintId = getUrlParam('complaintId');
    if (!complaintId) return false;

    Handlebars.registerHelper("statusName", function(status) {
        var str = '';
        if (0 == parseInt(status)) {
            str = '未回复';
        } else if (1 == parseInt(status)) {
            str = '已回复';
        } else if (2 == parseInt(status)) {
            str = '已解决';
        }
        return str;
    });

    Handlebars.registerHelper("statusDesc", function(status) {
        var str = '';
        if (0 == parseInt(status)) {
            str = '处理中：请您等待，我们的客服人员将尽快回复您的投诉。';
        } else if (1 == parseInt(status)) {
            str = '已回复：如您对该回复仍不满意，请在下方继续留言。';
        } else if (2 == parseInt(status)) {
            str = '已解决：感谢您的合作，愿您在以后的购物中更加满意。';
        }
        return str;
    });

    Handlebars.registerHelper("replyTypeFun", function(replyType, options) {
        if (0 == parseInt(replyType)) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    $.ajax({
        url: '/front/member/complaint/view',
        type: 'get',
        dataType: 'json',
        data: {
            complaintId: complaintId
        },
        success: function(res) {
            if ('99' == res.code) {
                window.location.href = 'https://passportdev.ecgci.com/login.html';
            } else if (res.code == '00') {
                var viewComplain = Handlebars.compile($("#view-complain-template").html());
                $('#view-complain').html(viewComplain(res.data.complaint));

                var viewComplainDetail = Handlebars.compile($("#view-complain-detail-template").html());
                $('#view-complain-detail').html(viewComplainDetail(res.data));

            }else if(res.code == '01'){
                window.location.href = "/member/complain.html";
            } else {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        },
        error: function() {
            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
        }
    });
    
    $('#complaintForm').on('click', function() {
        var replyDetail = $.trim($('#replyDetail').val());
        if (!replyDetail || replyDetail.length > 200) {
            dialog({
                content: '留言内容不可为空，最多200个字符',
            });
            return false;
        }
        $.ajax({
            url: '/front/member/complaint/saveComplaintDetail',
            type: 'post',
            dataType: 'json',
            data: {
                complaintId: complaintId,
                replyDetail: replyDetail
            },
            success: function(res) {
                if (res && res.code == "00") {
                    window.location.href=window.location.href;
                } else if (res && res.code == "02") {
                    dialog({content: '请输入留言内容'});
                    return false;
                } else if (res && res.code == "03") {
                    dialog({content: '留言内容最多可输入200字符数'});
                    return false;
                } else {
                    dialog({ content: '网络繁忙，请稍后重试'});
                    return false;
                }
            },
            error: function() {
                dialog({content: '网络连接超时，请您稍后重试'});
                return false;
            }
        });
    });
    
    $("body").on("keyup","#replyDetail",function () {
        var length = $(this).val().length;
        if (length < 200){
            $("#shengyu").html("还可以输入"+(200-length)+"字");
         }else {
            $(this).val().substring(0,200);
            $("#shengyu").html("还可以输入0字");
        }
    })
    
    
    
    
    
    
});

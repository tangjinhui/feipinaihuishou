require(['jquery', 'handlebars', 'limitPage', 'dialog', 'plupload', 'getUrlParam', 'header', 'modules/menu'], function($, Handlebars, limitPage, dialog, plupload,getUrlParam) {
   
    var status = getUrlParam('status');
    if (status) {
        $('select[name=type]').val('0');
    }

    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });

    Handlebars.registerHelper('show', function(goodsId, commentId, status) {
        var str = '';
        if ('0' == status) {
            str = '<a class="commentForm" href="#pj_biaod" style="color: red" data-commentId="' + commentId + '"  data-goodsId="' + goodsId + '">发表评价/晒单</a>';
        }
        if ('1' == status) {
            str = '<span class="waitAudit" style="color: black">等待审核</span>';
        }
        if ('-1' == status) {
            str = '<span class="notPass" style="color: black">审核不通过</span>';
        }
        if ('2' == status || '3' == status) {
            str = '<a class="comment" href="/comment_detail.html?goodsId=' + goodsId + '&commentId=' + commentId +'">已评价/晒单</a>';
        }
        return str;
    });

    initDate();

    function initDate(pageNum) {
        $.ajax({
            url: '/front/member/comment/commentList',
            type: 'get',
            dataType: 'json',
            data: {
                pageNum: pageNum || 1,
                flag: $('[name=type]').val()
            },
            success: function(res) {
                if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemp(res.data.page));
                    if (res.data.page.list.length) {
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                        $(".none_record").hide();
                    } else {
                        $('.pageLimit').hide();
                        $(".none_record").show();
                    }
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                    return;
                }
            },
            error: function() {
                dialog({content: '网络繁忙，请您稍后重试'});
                return;
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
                return;
            }
        });
    }

    $('select').on('change', function() {
        initDate();
    });

  
     //晒单图片上传方法
    var fileStr = "";

    var uploadFlag1 = false;
    var uploaderFornt = new plupload.Uploader({
        runtimes : 'html5,silverlight,html4,flash',
        browse_button: 'pickfiles',
        container: 'container',
        url: '/front/member/upload/commentPicture',
        flash_swf_url: '/plupload/Moxie.swf',
        silverlight_xap_url: '/plupload/Moxie.xap',
        filters: {
            max_file_size: '1mb',
            mime_types: [
                { title: "Image files", extensions: "jpg,jpeg,gif,png" }
            ],
            prevent_duplicates: true //不允许选取重复文件
        },
        resize: {//前端压缩图片尺寸和质量
            quality: 75,
            preserve_headers: false
        },
        init: {
            QueueChanged: function() { //当用户选择文件发生变化，会自动上传
                if (uploadFlag1 == true) return;
            },

            FilesAdded: function(up, files) {
                if (up.files.length > 6) {
                    up.splice((up.files.length - files.length), up.files.length);
                    dialog({ title: '系统提示', content: '最多上传6张图片' });
                    return;
                } else {
                    //开始上传
                    up.start();
                    uploadFlag1 = true;
                }
            },
            UploadProgress: function(up, file) {
                $("#YyzzUploadProgress").text("上传进度  " + file.percent + "%").show();
            },
            FileUploaded: function(up, file, res) { //单文件上传完成后
                var res = JSON.parse(res.response);
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '02') {
                    dialog({ content: res.msg });
                    uploaderFornt.splice(uploaderFornt.splice - 1, uploaderFornt.files.length);
                } else if (res.code == '00') {
                    fileStr += res.data.standardPath + ",";
                    var imgUrl = img_domain_data[0] + '/' + res.data.standardPath;
                    $(".commentPic").append('<li class="sczp"><a href=' + imgUrl + '  target="_blank"><img src=' + imgUrl + ' class="sydsImg"></a></li>');
                } else {
                    $("#YyzzUploadProgress").text("图片上传失败，请重新上传").show();
                    uploaderFornt.splice(uploaderFornt.splice - 1, uploaderFornt.files.length);
                }
            },
            UploadComplete: function(up, files) { //文件队列上传完成后
                uploadFlag1 = false;
                $("#YyzzUploadProgress").css('display', 'none');
            },

            Error: function(up, err) {
                uploadFlag1 = false;
                if (err.code < 0) {
                    if (err.code == -300) {
                        dialog({ title: '系统提示', content: '您本地的图片不可读取，请检查后重新上传！' });
                    } else if (err.code == -600 || err.code == -702) {
                        dialog({ title: '系统提示', content: '图片大小不能超过1M，请重新上传！' });
                    } else if (err.code == -601 || err.code == -700) {
                        dialog({ title: '系统提示', content: '您上传的图片类型不符合要求！' });
                    } else if (err.code == -602) {
                        dialog({ title: '系统提示', content: '请不要重复上传相同的图片！' });
                    } else {
                        dialog({ title: '系统提示', content: '网络异常，请稍后再试！' });
                    }
                }
            }
        }
    });
    uploaderFornt.init(); //初始化Plupload实例

    //点击发表评价
    $("body").on("click", ".commentForm", function() {
        var goodsId = $(this).attr("data-goodsId");
        var commentId = $(this).attr("data-commentId");
        if (!$.trim(goodsId) || !$.trim(commentId)) {
            return;
        }
        $("#goodsId").val(goodsId);
        $("#commentId").val(commentId);
        if ($("#pj_biaod").is(":visible")) {
           pjBiaodHide();
        } else {
            $("#pj_biaod").show();
            $.ajax({
                url: '/front/member/comment/impressionStr',
                type: 'get',
                dataType: 'json',
                data: {
                    goodsId: goodsId
                },
                success: function(res) {
                    if ('99' == res.code) {
                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                    } else if (res.code == '00') {
                        $('#impression_tr').show();
                        var arr = res.data;
                        var str = "";
                        for (var i = 0; i < arr.length; i++) {
                            str += '<li style="float:left;"><input type="checkbox" name="yinxiang" value="' + arr[i].impressId + '">' + arr[i].impressionValue + '</li>';
                        }
                        $("#impression_val").append(str);
                    } else {
                        $('#impression_tr').hide();
                    }
                },
                error: function() {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            });
        }
    });
    function pjBiaodHide(){
        $("#impression_val").find("li").remove();
        $("#pj_biaod").hide();
        $("#title").val(null);
        $("#biaotiTip").text("已输入0个字符");
        $("#biaotiTip").attr("style","color: black");
        $(".star-list").children("img").attr("src","http://static.ecgci.com/images/xing.gif")
        $("#content").val(null);
        $("#contactTips").text("");
        $(".commentPic").children("li").remove();
        fileStr = "";
        uploaderFornt.splice(0,uploaderFornt.files.length);
    }


    /*评价等级*/
    $("body").on("click", ".star-list img", function() {
        $(this).prevAll("img").each(function() {
            this.src = "http://static.ecgci.com/images/xing.gif"
        });
        this.src = "http://static.ecgci.com/images/xing.gif";
        $(this).nextAll("img").each(function() {
            this.src = "http://static.ecgci.com/images/xing2.gif"
        });
        $(this).parent(".star-list").find(".coment-text").text($(this).attr("ref"));

        $(".coment-text").each(function(idx) {
            if ($(".coment-text").eq(idx).text() == '很差') {
                $('#commentRank' + idx).val('1');
            }
            if ($(".coment-text").eq(idx).text() == '较差') {
                $('#commentRank' + idx).val('2');
            }
            if ($(".coment-text").eq(idx).text() == '还行') {
                $('#commentRank' + idx).val('3');
            }
            if ($(".coment-text").eq(idx).text() == '推荐') {
                $('#commentRank' + idx).val('4');
            }
            if ($(".coment-text").eq(idx).text() == '力荐') {
                $('#commentRank' + idx).val('5');
            }
        });
    });

     //title 字符显示
    $("body").on("keyup", "#title", function() {
        artTxtCount(this, $('#biaotiTip'), 1, 50);
    });

    //content字数显示
    $("body").on("keyup", "#content", function() {
        artTxtCount(this, $('#contactTips'), 1, 500);
    })

    //参数：textarea的id，div的id, 最少字符数, 限定最长字符数
    function artTxtCount(obj, info, minNum, maxNum) {
        var totalLen = $.trim($(obj).val()).length;
        if (totalLen < minNum) {
            info.css("color", "black");
            info.html("已输入0个字符。");
        } else if ((totalLen < maxNum) && (totalLen >= minNum)) {
            info.css("color", "black");
            info.html("还可以输入" + (maxNum - totalLen) + "个字符");
        } else {
            $(obj).val().substring(0, maxNum);
            info.html("还可以输入0个字符");
            info.css("color", "red");
        }
    }

    //保存评价单
    $("#commentBtn").click(function() {
        if ($(this).prop('disabled')) {
            return;
        }
        var title = $("#title").val().replace(/\s+/g, "");
        var content = $("#content").val().replace(/\s+/g, "");
        if (!title) {
            dialog({content: '评价/晒单标题内容不能为空,请输入！' });
            return;
        }
        if (!content) {
            dialog({content: '心得内容不能为空,请输入！' });
            return;
        }
        if (content.length < 10) {
            dialog({content: '心得内容不少于10个字，请继续输入！' });
            return;
        }
        if (content.length > 500) {
            dialog({content: '心得不能超过500个字' });
            return;
        }
        //图片路径
        if (fileStr != "") {
            fileStr = fileStr.substring(0, fileStr.length - 1);
        }
        //印象值
        var yinxiang = '';
        if ('input[name="yinxiang"]' != null) {
            $('input[name="yinxiang"]:checked').each(function() {
                yinxiang += $(this).val() + ",";
            });
        }
        if (yinxiang != '') {
            yinxiang = yinxiang.substring(0, yinxiang.length - 1);
        }
        var goodsId = $.trim($("#goodsId").val());
        var commentId = $.trim($("#commentId").val());
        var commentRank0 = $("#commentRank0").val();
        var commentRank1 = $("#commentRank1").val();
        var commentRank2 = $("#commentRank2").val();
        var commentRank3 = $("#commentRank3").val();
        $(this).prop('disabled', true);
        $.ajax({
            url: '/front/member/comment/saveComment',
            type: 'POST',
            dataType: 'json',
            data: {
                title: title,
                goodsPoints: commentRank0,
                servicePoints: commentRank1,
                logisticsPoints: commentRank2,
                packingPoints: commentRank3,
                content: content,
                impress: yinxiang,
                images: fileStr,
                goodsId: goodsId,
                commentId: commentId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    pjBiaodHide(); 
                    window.location.href = "/member/assess.html?status=0";
                } else if (res.code == '02') {
                    dialog({content: '评价/晒单标题内容不能为空,请输入!' });
                } else if (res.code == '08') {
                    dialog({content: '评价/晒单标题内容不能超过50个字' });
                } else if (res.code == '03') {
                    dialog({content: '心得内容不能为空,请输入！'});
                } else if (res.code == '04') {
                    dialog({content: '心得内容不少于10个字，请继续输入' });
                } else if (res.code == '09') {
                    dialog({content: '心得不能超过500个字' });
                } else if (res.code == '05') {
                    dialog({content: '最多6张图片,请重新晒单' });
                } else if (res.code == '07') {
                    dialog({content: '评价不成功，一个人只能对一个商品评价' });
                } else {
                    dialog({content: '网络繁忙，请您稍后重试' });
                }
                $('#commentBtn').prop('disabled', false);
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                $('#commentBtn').prop('disabled', false);
            }
        });
    }) 
});

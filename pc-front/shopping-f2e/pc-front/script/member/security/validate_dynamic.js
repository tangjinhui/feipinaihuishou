require(['jquery', 'form-valid', 'plupload', 'dialog', 'header', 'modules/menu'], function($, valid, plupload, dialog) {
    var mobileCode = false;
    var rand = false;
    var legendId = ''; //手势ID

    valid.settings = {
        initTip: function(input, defaultTip) {

        },
        validTip: function(input, errorInfo, defaultTip) {
            if (errorInfo) {
                input.next('.msg-error').show().text(errorInfo);
            }
        }
    };
    valid.render({
        '#mobileCode': {
            option: 'blur',
            regexp: /^\d{6}$/,
            errorTip: '手机验证码有误，请重新输入',
            requiredTip: '请输入短信验证码',
            success: function(input) {
                mobileCode = true;
            },
            failed: function(input) {
                mobileCode = false;
            }
        },
        '#rand': {
            option: 'blur',
            len: 4,
            requiredTip: '请输入验证码',
            lenTip: '验证码错误',
            success: function(input) {
                rand = true;
            },
            failed: function(input) {
                rand = false;
            }
        }
    }, {
        required: true
    });

    //step1
    //更换图片验证码
    $('#identity_code_img,#identity_code_btn').on('click', function() {
        $('#identity_code_img').attr('src', '/front/authCode?t=' + new Date().getTime());
    });

    $('#mobileCode,#rand').on('focus', function() {
        $(this).next('.msg-error').hide().text('');
    });
    init();
    function init() {
        $.ajax({
            url: '/front/member/security/getMobile',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res && res.code == '00') {
                    $('#validMobile').text(res.data);
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({content: '网络繁忙，请您稍后重试'});
                }
            },
            error: function() {
                dialog({content: '网络繁忙，请您稍后重试'});
            }
        });
    }

    //发送手机验证码
    $('#sendMobileCode').on('click', function() {
        if ($('#sendMobileCode').prop('disabled')) {
            return false;
        }
        $('#sendMobileCode').attr('disabled', true);
        $.ajax({
            url: '/front/member/security/sendMobileCode',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                }
                if (res && res.code == '00') {
                    countDown();
                    $('#mobileCode').next('.msg-error').show().text('验证码已发送，请查收短信');
                } else if (res && res.code == '01') {
                    $('#mobileCode').next('.msg-error').show().text('短信验证码发送过于频繁，请稍后再试');
                } else {
                    $('#mobileCode').next('.msg-error').show().text('网络繁忙，请稍后重新获取验证码');
                }
            },
            error: function() {
                $("#mobileCode").next(".msg-error").show().text("网络连接超时");
            }
        });
    });

    //发短信倒计时
    function countDown() {
        var delayTime = 120;
        var timer = setInterval(function() {
            delayTime--;
            $('#sendMobileCode').removeClass('button_anniu_w').addClass('anniuyzm').val(delayTime + '秒后重新发送');
            if (delayTime <= 0) {
                clearInterval(timer);
                $('#sendMobileCode').removeClass('anniuyzm').addClass('button_anniu_w').val('获取短信验证码');
                $('#sendMobileCode').prop('disabled', false);
            }
        }, 1000);
    }

    $('#identityNextBtn').on('click', function() {
        if ($('#identityNextBtn').attr('disabled')) {
            return;
        }
        if (!$('#mobileCode').val()) {
            $("#mobileCode").next('.msg-error').show().text('请输入短信验证码');
            return;
        }
        if (!$('#rand').val()) {
            $('#rand').next('.msg-error').show().text('请输入验证码');
            return;
        }
        if (!mobileCode || !rand) {
            return;
        }
        $('#identityNextBtn').attr('disabled', true);
        $.ajax({
            url: '/front/member/security/nextAuthentication',
            type: 'POST',
            data: {
                mobileCode: $.trim($('#mobileCode').val()),
                imgCode: $.trim($('#rand').val())
            },
            dataType: 'json',
            success: function(res) {
                if (res && res.code == '00') {
                    next($('#identity'), $('#setDynamic'), 1);
                    dynamicInit();
                    upLoadImg();
                    reUpLoadImg();
                    if (!$('#setDynamic').hasClass('dn')) {
                        var t=600;
                        var dynamicTimer = setInterval(function() {
                            if(t > 0){
                                t--;
                            }
                            $('#showtimes1').html("上传图片" + t + "s");
                            $('#showtimes2').html(t + "s");
                            if (t <= 0) {
                                clearInterval(dynamicTimer);
                                window.location.href=window.location.href; 
                            }
                        }, 1000);
                    };
                } else if (res && res.code == '01') {
                    $("#mobileCode").next('.msg-error').show().text('请输入短信验证码');
                } else if (res && res.code == '02') {
                    $('#rand').next('.msg-error').show().text('请输入验证码');
                } else if (res && res.code == '03') {
                    $("#mobileCode").next('.msg-error').show().text('短信验证码错误');
                } else if (res && res.code == '04') {
                    $('#rand').next('.msg-error').show().text('验证码错误，请重新输入');
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试'});
                }
                $('#identityNextBtn').prop('disabled', false);
                $('#identity_code_img').attr('src', '/front/authCode?t=' + new Date().getTime());
            },
            error: function() {
                $('#identityNextBtn').prop('disabled', false);
                dialog({
                    content: '网络繁忙，请您稍后重试'
                });
            }
        });
    });

    //显示下一步
    function next(id1, id2, n) { //n:要显示的li的index
        id1.addClass('dn');
        id2.removeClass('dn');
        $('.flow_chart3').addClass('step' + (n + 1));
        $('.flow_chart3 li').removeClass('cur');
        $('.flow_chart3 li:nth(' + n + ')').addClass('cur');
    }

    function dynamicInit() {
        $.ajax({
            url: '/front/member/security/validateDynamicInfo',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                 var imgUrl = img_domain_data[0];
                if (res && res.code == '00') {   
                    legendId = res.data.vdlId;
                    $('.legendName').text(res.data.legendName);
                    $('.sl_pic img').attr('src', imgUrl + res.data.legendPath);
                } else if (res && res.code == '01') {
                    legendId = res.data.vdlId;
                    $('#noPass').removeClass('dn');
                    $('#auditReason').text(res.data.auditReason);
                    $('.legendName').text(res.data.legendName);
                    $('.sl_pic img').attr('src', imgUrl + res.data.legendPath);
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试'});
                }
            },
            error: function() {
                dialog({content: '网络繁忙，请您稍后重试'});
            }
        });
    }

    //动态实名认证上传方法
    function upLoadImg() {
        var uploadFlag1 = false;
        var uploaderFornt = new plupload.Uploader({
            runtimes : 'html5,silverlight,html4,flash',
            browse_button: 'pickfiles',
            container: 'container',
            url: '/front/member/upload/dynamicValidatePicture',
            flash_swf_url: '/plupload/Moxie.swf',
            silverlight_xap_url: '/plupload/Moxie.xap',
            multi_selection: false,
            filters: {
                mime_types: [
                    { title: "Image files", extensions: "jpg,png" }
                ],
                max_file_size: '1mb'
            },
            init: {
                QueueChanged: function() { //当用户选择文件发生变化，会自动上传
                    if (uploadFlag1) return;
                    uploadFlag1 = true;
                    $('#showtimes1').html("上传中...");
                    uploaderFornt.start();
                },
                UploadProgress: function(up, file) {},
                FileUploaded: function(up, file, res) { //单文件上传完成后
                    var res = JSON.parse(res.response);
                    if ('99' == res.code) {
                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                    } else if (res.code == '02') {
                         if ('宽不符合要求' == res.msg) {
                            dialog({ content: '您上传的照片宽度过小，请上传宽度大于800px的照片！' });
                        } else {
                            dialog({ content: res.msg });
                        }
                    } else if (res && res.code == '00') {
                        $("#loadImage img").attr("src", img_domain_data[0] + res.data.path + '?'+Math.random());
                        $("#uploadDiv").addClass("re_pic");
                    } else {
                        dialog({ content: '图片上传失败，请重新上传' });
                    }
                },
                UploadComplete: function(uploader, files) { //文件队列上传完成后
                    uploadFlag1 = false;
                },
                Error: function(up, err) {
                    uploadFlag1 = false;
                    if (-600==err.code) {
                        dialog({ content: '请上传文件大小1M以内，格式正确的图片' });
                    }else if (-601==err.code) {
                        dialog({ content: '请上传文件大小1M以内，格式正确的图片' });
                    }else{
                        dialog({ content: '图片上传失败，请重新上传' });
                    }
                }
            }
        });
        uploaderFornt.init();
    }

    //重新上传
    function reUpLoadImg() {
        var uploadFlag2 = false;
        var uploaderFornt2 = new plupload.Uploader({
            runtimes : 'html5,silverlight,html4,flash',
            browse_button: 'pickfilesch',
            container: 'container2',
            url: '/front/member/upload/dynamicValidatePicture',
            flash_swf_url: '/plupload/Moxie.swf',
            silverlight_xap_url: '/plupload/Moxie.xap',
            multi_selection: false,
            filters: {
                mime_types: [
                    { title: "Image files", extensions: "jpg,png" }
                ],
                max_file_size: '1mb'
            },
            init: {
                QueueChanged: function() { //当用户选择文件发生变化，会自动上传
                    if (uploadFlag2 == true) return;
                    uploadFlag2 = true;
                    $('#pickfilesch').html('上传中...');
                    uploaderFornt2.start();
                },
                UploadProgress: function(up, file) {},
                FileUploaded: function(up, file, res) { //单文件上传完成后  
                    var res = JSON.parse(res.response);
                    if ('99' == res.code) {
                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                    } else if (res.code == '02') {
                        if ('宽不符合要求' == res.msg) {
                            dialog({ content: '您上传的照片宽度过小，请上传宽度大于800px的照片！' });
                        } else {
                            dialog({ content: res.msg });
                        }
                    } else if (res && res.code == '00') {
                        $("#loadImage img").attr("src", img_domain_data[0] + res.data.path + '?'+Math.random());
                        $("#uploadDiv").addClass("re_pic");
                    } else {
                        dialog({ content: '图片上传失败，请重新上传' });
                    }
                },
                UploadComplete: function(uploader, files) { //文件队列上传完成后
                    uploadFlag2 = false;
                    $('#pickfilesch').html('重新上传');
                },

                Error: function(up, err) {
                    uploadFlag2 = false;
                     if (-600==err.code) {
                        dialog({ content: '上传的照片大小不可超过1M' });
                    }else if (-601==err.code) {
                        dialog({ content: '只能上传jpg、png格式图片' });
                    }else{
                        dialog({ content: '图片上传失败，请重新上传' });
                    }
                    $('#pickfilesch').html('重新上传');
                }
            }
        });
        uploaderFornt2.init();
    }

    $('#dynamicsubmit').on('click', function() {
        var loadImgPath = $('#loadImage img').attr('src');
        $.ajax({
            url: '/front/member/security/saveEsMemberValidateDynamicLegned',
            type: 'POST',
            dataType: 'json',
            data: {
                dynamicPic: loadImgPath,
                legendId: legendId
            },
            success: function(res) {
                if (res && res.code == '00') {
                    dialog({
                        content: '提交成功！',
                        type: 'dn',
                        callback: function() {
                            $("html,body").animate({ scrollTop: 0 }, 500); // 返回顶部
                            next($('#setDynamic'), $('#setDynamicComplate'), 2);
                            timmer();
                        }
                    });
                } else if (res && res.code == '01') {
                    dialog({content: '请上传图片！'});
                } else if (res && res.code == '02') {
                    dialog({ content: res.data.msg });
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
    });

    //10秒倒计时
    function timmer() {
        var num = 10;
        var t = setInterval(function() {
            num--;
            $('#ShowSpan2').text(num)
            if (num <= 0) {
                window.location.href = '/index.html';
                clearInterval(t);
            }
        }, 1000);
    }

});
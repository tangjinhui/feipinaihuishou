require(['jquery', 'form-valid', 'plupload', 'idcard-valid', 'dialog', 'header', 'modules/menu'], function($, valid, plupload, Idvalid, dialog) {
    var mobileCode = false;
    var rand = false;
    var checkCard = false;
    var checkName = false;

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
    init();
    //更换图片验证码
    $('#identity_code_img,#identity_code_btn').on('click', function() {
        $('#identity_code_img').attr('src', '/front/authCode?t=' + new Date().getTime());
    });

    $('#mobileCode,#rand').on('focus', function() {
        $(this).next('.msg-error').hide().text('');
    });

    //step1
    function init() {
        $.ajax({
            url: '/front/member/security/getMobile',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res.code == '00') {
                    $('#validMobile').text(res.data);
                } else if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({ content: '网络连接超时，请重新登录' });
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请稍后重试' });
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
                if (res.code == '00') {
                    countDown();
                    $('#mobileCode').next('.msg-error').show().text('验证码已发送，请查收短信');
                } else if (res.code == '01') {
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

    //倒计时
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

    //下一步
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
                    next($('#identity'), $('#setCdInfo'), 1);
                    cardInfoView();
                    $(".padl").html('上传身份证资料');
                    //上传身份证正面
                    upLoadFront('pickfiles');
                    upLoadFront('pickfiles1');
                    //上传身份证反面
                    upLoadBack('pickfilesBack');
                    upLoadBack('pickfilesBack1');
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
                    dialog({ content: '网络繁忙，请稍后重试' });
                }
                $('#identityNextBtn').prop('disabled', false);
                $('#identity_code_img').attr('src', '/front/authCode?t=' + new Date().getTime());
            },
            error: function() {
                $('#identityNextBtn').prop('disabled', false);
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    });

    //显示下一步
    function next(id1, id2, n) { //n:要显示的li的index
        id1.hide();
        id2.show();
        $('.flow_chart3').addClass('step' + (n + 1));
        $('.flow_chart3 li').removeClass('cur');
        $('.flow_chart3 li:nth(' + n + ')').addClass('cur');
    }

    //step2
    //失焦校验身份证
    $('#cardId').on({
        'blur':function() {
            var cardId = $.trim($('#cardId').val());
            if (!cardId) {
                $('#cardIdError').text('请输入身份证号').fadeTo('slow', 0.99);
                checkCard = false;
            }else if (!IdCardValidate(cardId)) {
                $('#cardIdError').text('请您输入正确的身份证号').fadeTo('slow', 0.99);
                checkCard = false;
            } else {
                checkCard = true;
            }
        },
        "keyup" : function() {
            $(this).val($(this).val().replace(/[^\dXx]/g,""));
        }
    });

    //失焦校验姓名
    $('#realName').on('blur', function() {
        var realName = $.trim($('#realName').val());
        if (!realName) {
            $('#realNameError').text('请输入真实姓名').fadeTo('slow', 0.99);
            checkName = false;
        } else {
            checkName = true;
        }
    });

    $('#cardId,#realName').on('focus', function() {
        $(this).parent('.cj_sjcm_inputleftv').next('.msg-error').hide();
    });

    $('#pickfiles,#pickfilesBack,#pickfiles1,#pickfilesBack1').on('click', function() {
        $(this).parent('.sc_menu').next('.msg-error').hide();
    });

    //提交
    $('#cdSubmitBut').on('click', function() {
        if ($('#cdSubmitBut').attr('disabled')) {
            return;
        }
        var cardId = $.trim($('#cardId').val());
        var realName = $.trim($('#realName').val());
        var loadImage = $('#loadImage img').attr('src');
        var loadImageBack = $('#loadImageBack img').attr('src');       
        $('#cardId').trigger('blur');
        $('#realName').trigger('blur');
        if (!checkCard || !checkName) {
            return;
        }
        if (loadImage.indexOf('sfzsl.jpg') > 0) {
            $('#picFrontError').fadeTo('slow', 0.99);
            return;
        }
        if (loadImageBack.indexOf('sfzsl.jpg') > 0) {
            $('#picBackError').fadeTo('slow', 0.99);
            return;
        }
        $('#cdSubmitBut').attr('disabled', true);
        $.ajax({
            url: '/front/member/security/saveEsMemberValidate',
            type: 'POST',
            dataType: 'json',
            data: {
                cardId: cardId,
                realName: realName,
                picFront: loadImage,
                picBack: loadImageBack
            },
            success: function(res) {
                if (res && res.code == '00') {
                    dialog({
                        content: '提交成功！',
                        type: 'dn',
                        callback: function() {
                            $("html,body").animate({ scrollTop: 0 }, 500); // 返回顶部
                            next($('#setCdInfo'), $('#setCdComplate'), 2);
                            timmer();
                            $(".padl").html('提交成功');
                        }
                    });
                } else if (res && res.code == '04') {
                    //$('#cardIdError').fadeTo('slow', 0.99);
                    dialog({ content: res.msg });
                } else if (res && res.code == '05') {
                    //$('#cardIdError').text(res.msg).fadeTo('slow', 0.99);
                    dialog({ content: res.msg });
                } else if (res && res.code == '06') {
                    //$('#cardIdError').text(res.msg).fadeTo('slow', 0.99);
                    dialog({ content: res.msg });
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                }
                $('#cdSubmitBut').prop('disabled', false);
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
                $('#cdSubmitBut').prop('disabled', false);
            }
        });
    });

    //step2
    //身份证正面照片上传方法
    function upLoadFront(pickfiles) {
        var uploadFlag1 = false;
        var uploaderFornt = new plupload.Uploader({
            runtimes : 'html5,silverlight,html4,flash',
            browse_button: pickfiles,
            container: 'container',
            url: '/front/member/upload/realNameValidatePicture?pos=front',
            flash_swf_url: '/plupload/Moxie.swf',
            silverlight_xap_url: '/plupload/Moxie.xap',
            multi_selection: false,
            filters: {
                max_file_size: '1mb',
                mime_types: [
                    { title: "Image files", extensions: "jpg,png" }
                ]
            },
            resize: { //前端压缩图片尺寸和质量
                //  width: 400,
                //  height: 400,
                quality: 75,
                preserve_headers: false
            },
            init: {
                PostInit: function() {},

                QueueChanged: function() { //当用户选择文件发生变化，会自动上传
                    if (uploadFlag1 == true) return;
                    uploaderFornt.start();
                    uploadFlag1 = true;
                },

                UploadProgress: function(up, file) {
                    $("#uploadProgress").text("上传进度  " + file.percent + "%").show();
                },
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
                    } else {
                        dialog({ content: '图片上传失败，请重新上传' });
                    }
                },
                UploadComplete: function(uploader, files) { //文件队列上传完成后
                    uploadFlag1 = false;
                    $("#uploadProgress").hide();
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
        uploaderFornt.init(); //初始化Plupload实例
    }

    //身份证反面照片上传方法
    function upLoadBack(pickfilesBack) {
        var uploadFlag2 = false;
        var uploaderBack = new plupload.Uploader({
            runtimes : 'html5,silverlight,html4,flash',
            browse_button: pickfilesBack,
            container: 'containerBack',
            url: '/front/member/upload/realNameValidatePicture?pos=back',
            flash_swf_url: '/plupload/Moxie.swf',
            silverlight_xap_url: '/plupload/Moxie.xap',
            multi_selection: false,
            filters: {
                max_file_size: '1mb',
                mime_types: [
                    { title: "Image files", extensions: "jpg,png" }
                ]
            },
            resize: { //前端压缩图片尺寸和质量
                //  width: 400,
                //  height: 400,
                quality: 75,
                preserve_headers: false
            },
            init: {
                PostInit: function() {},

                QueueChanged: function() { //当用户选择文件发生变化，会自动上传
                    if (uploadFlag2 == true) return;
                    uploaderBack.start();
                    uploadFlag2 == true;
                },

                UploadProgress: function(up, file) {
                    $("#uploadProgressBack").text("上传进度  " + file.percent + "%").show();

                },
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
                        $("#loadImageBack img").attr("src", img_domain_data[0] + res.data.path +'?'+Math.random());
                    } else {
                        dialog({ content: '图片上传失败，请重新上传' });
                    }
                },
                UploadComplete: function(uploader, files) { //文件队列上传完成后
                    uploadFlag2 = false;
                    $("#uploadProgressBack").hide();
                },
                Error: function(up, err) {
                    uploadFlag2 = false;
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
        uploaderBack.init();
    }

    //认证失败后再次认证,回显数据和失败原因
    function cardInfoView() {
        $.ajax({
            url: '/front/member/security/viewMemberValidate',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '01') {
                    var imgUrl = img_domain_data[0];
                    $(".txt_pos").css("top", "200px"); // 驳回时样式
                    $('.cj_sjcborder').show();
                    $('.cj_sjcborder').text('审核不通过原因：' + res.data.auditReason);
                    $('input[name="cardId"]').val(res.data.cardId);
                    $('input[name="realName"]').val(res.data.realName);
                    $('#loadImage img').attr('src', imgUrl + res.data.picFront);
                    $('#loadImageBack img').attr('src', imgUrl + res.data.picBack);
                } else {
                    $('.cj_sjcborder').hide();
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    }

    //step3
    //5秒倒计时
    function timmer() {
        var num = $('#ShowSpan2').text();
        var t = setInterval(function() {
            num--;
            $('#ShowSpan2').text(num)
            if (num <= 0) {
                clearInterval(t);
                window.location.href = '/index.html';
            }
        }, 1000);
    }
});

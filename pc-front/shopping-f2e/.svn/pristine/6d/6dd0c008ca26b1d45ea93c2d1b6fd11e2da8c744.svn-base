require(['jquery', 'handlebars', 'plupload', 'dialog', 'getUrlParam', 'header', 'modules/menu'], function($, Handlebars, plupload, dialog, getUrlParam) {
    var afterSaleId = getUrlParam('afterSaleId');
    if (!afterSaleId) return;

    Handlebars.registerHelper("addIndex", function(index, options) {
        return parseInt(index) + 1;
    });

    Handlebars.registerHelper("formatUnitPrice", function(unitPrice) {
        unitPrice = '' + unitPrice;
        return unitPrice.indexOf('.') != -1 ? unitPrice : unitPrice + '.00';
    });
     Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });
    Handlebars.registerHelper("returnRolicy", function(isReturnAble, isChangeAble) {
        var str = '';
        if (parseInt(isReturnAble) == 1 && parseInt(isChangeAble) == 1) {
            str = "可退可换";
        } else if (parseInt(isReturnAble) == 1 && parseInt(isChangeAble) != 1) {
            str = "只退不换";
        } else if (parseInt(isReturnAble) != 1 && parseInt(isChangeAble) == 1) {
            str = "只换不退";
        } else if (parseInt(isReturnAble) != 1 && parseInt(isChangeAble) != 1) {
            str = "不退不换";
        }
        return str;
    });

    Handlebars.registerHelper("protocolUrl", function(orderoAdscription) {
        var str = '';
        if ('001002007' == orderoAdscription) {
            str = '/doing/helpCenter.html#aftersalePolicyBj';
        } else if ('001002002' == orderoAdscription) {
            str = '/doing/helpCenter.html#aftersalePolicySz';
        } else if ('001002008' == orderoAdscription){
            str = '/doing/helpCenter.html#aftersalePolicyXc';
        }
        return str;
    });
    Handlebars.registerHelper("checkContentDesc", function(contentDesc) {
        if (contentDesc) {
            return contentDesc;
        } else {
            return '暂无';
        }
    });
    initData()
    function initData() {
        var data = {
            afterSaleId: afterSaleId
        }
        $.ajax({
            url: '/front/member/afterSale/toUpdateReturnGoodsPage',
            type: 'get',
            dataType: 'json',
            data: data,
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if ('98' == res.code) {
                    dialog({ title: '系统提示', content: '数据异常' });
                } else if (res.code == '00') {
                    var contentTemp = Handlebars.compile($("#content-template").html());
                    $('#content_box').html(contentTemp(res.data));
                    $("#reason").val(res.data.servReason);
                    var orderId = res.data.orderId;
                    uploadImg(orderId);
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
            }
        });
    }
    var upstate = true;
    function uploadImg(orderId) {
        var uploader = new plupload.Uploader({
            runtimes : 'html5,silverlight,html4,flash',
            browse_button: 'returnOrderPictures',
            url: '/front/member/upload/returnGoodsPicture?orderId=' + orderId,
            flash_swf_url: '/plupload/Moxie.swf',
            silverlight_xap_url: '/plupload/Moxie.xap',
            filters: {
                mime_types: [ //只允许上传图片文件
                    { title: "图片文件", extensions: "bmp,gif,jpg,png,jpeg" }
                ],
                max_file_size: '5mb', //最大只能上传5M的文件5120kb
                prevent_duplicates: true //不允许队列中存在重复文件
            },
            init: {
                FilesAdded: function(up, files) {
                    var maxlength = 10 - $('input[name="file-pic-c"]').length;
                    if (files.length > maxlength) {
                        uploader.splice((uploader.files.length - files.length), uploader.files.length);
                        dialog({content: '最多可上传10张图片！' });
                        return;
                    } else {
                        //开始上传
                        $('#console').text('图片正在上传中，请稍候...');
                        uploader.start();
                    }
                    plupload.each(files, function(file) {
                        //构造html来更新UI
                        var html = '<li id="file-' + file.id + '"><p class="file-name">' + file.name +
                            '</p><p id="file-' + file.id + '-progress">上传进度：0%</p></li>';
                        $(html).appendTo('#file-list');
                    });
                },
                UploadProgress: function(up, file) {
                    $('#file-' + file.id + '-progress').text('上传进度：' + file.percent + '%');
                },
                FileUploaded: function(up, file, res) { //单文件上传完成后  
                    var res = JSON.parse(res.response);
                    if ('99' == res.code) {
                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                    } else if (res.code == '00') {
                        $('#file-' + file.id).append('<input type="hidden" name="file-pic-s" value="'+res.data.standardPath+'"/>');
                        $('#file-' + file.id).append('<input type="hidden" name="file-pic-c" value="'+res.data.compressPath+'"/>');
                        $('#file-' + file.id).append('<img id="file-pic-src" src="http://static.ecgci.com'+res.data.compressPath+'"/>');
                    } else if (res.code == '02') {
                        dialog({ content: res.msg });
                        up.splice(up.splice - 1, up.files.length);
                        $('#file-' + file.id).remove();
                    } else {
                        dialog({ content: '图片上传失败，请重新上传' });
                        up.splice(up.splice - 1, up.files.length);
                        $('#file-' + file.id).remove();
                    }
                },
                UploadComplete: function(up, files) { //上传完所有文件后
                    upstate = true;
                    $('#console').text('您好，所有图片上传完成！');
                },
                Error: function(up, err) {
                    upstate = true;
                    if (err.code < 0) {
                        if (err.code == -300) {
                            dialog({ title: '系统提示', content: '您本地的图片不可读取，请检查后重新上传！' });
                        } else if (err.code == -600 || err.code == -702) {
                            dialog({ title: '系统提示', content: '图片大小不能超过5M，请压缩图片重新上传！' });
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
        uploader.init(); //初始化
    }

    $('body').on('click', '.returnGoodsSubmit', function() {
        if ($(this).attr('disabled')) {
            return;
        }
        var reason = $("#reason").val();
        var describe = $("#returnOrderDescription").val();
        var agreement = $("input[type='checkbox']").prop('checked');
         if (!reason) {
            dialog({ title: '系统提示', content: '请选择申请理由！' });
            return;
        }
        if (!describe || describe.length < 10 || describe.length > 500) {
            dialog({ title: '系统提示', content: '请按要求输入问题描述！' });
            return;
        }
        if (!agreement) {
            dialog({ title: '系统提示', content: '您必须同意中国金币网上商城退换货协议后，才能提交申请！' });
            return;
        }

        //组装上传图片路径
        var returnPicSArray = '';
        $('input[name="file-pic-s"]').each(function(i) {
            returnPicSArray += $(this).val() + ',';
        });
        var returnPicCArray = '';
        $('input[name="file-pic-c"]').each(function(i) {
            returnPicCArray += $(this).val() + ',';
        });
        //上传了图片
        if (returnPicSArray && returnPicSArray.length > 0) {
            if (!upstate) {
                dialog({ title: '系统提示', content: '待图片上传完成后，再提交！' });
                return;
            }
        }
        var data = {
            afterSaleId: afterSaleId,
            reason: reason,
            describe: describe,
            agreement: agreement,
            returnPicSArray: returnPicSArray,
            returnPicCArray: returnPicCArray
        }
        $(this).attr('disabled', true);
        $.ajax({
            url: '/front/member/afterSale/updateReturnGoodsSubmit',
            type: 'get',
            dataType: 'json',
            data: data,
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '02') {
                    dialog({ content: '请按要求填写售后服务申请！' });
                } else if (res.code == '03') {
                    dialog({ content: '修改售后服务申请失败！' });
                } else if (res.code == '04') {
                    dialog({
                        content: '修改退货服务申请单状态已经变化，不能进行修改！',
                        callback: function() {
                            window.location.href = '/member/after_sale.html';
                        }
                    });
                } else if (res.code == '00') {
                    dialog({
                        content: '您的退货服务申请单已经修改成功，正在审核中，审核结果将以短信通知您!',
                        callback: function() {
                            window.location.href = '/member/after_sale.html';
                        }
                    });
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
                }
                $('.returnGoodsSubmit').prop('disabled', false);
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
                $('.returnGoodsSubmit').prop('disabled', false);
            }
        });
    });
     $('body').on('click', '.del_btn', function() {
        $(this).parent().remove();
     });
     $('body').on('click', 'input[name=cheK]', function() {
        var checked = $(this).is(':checked');
        if(checked){
            $('#checTemp_active').hide();
        }else{
            $('#checTemp_active').show();
        }
     });
});

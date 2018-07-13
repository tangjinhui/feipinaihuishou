define(['jquery', 'handlebars', 'dialog', 'form-valid', 'distpicker'], function($, Handlebars, dialog, valid) {

    var city0_val = '';
    var city1_val = '';
    var city2_val = '';
    var addressId = '';
    var addAddress = {
        consignee: false,
        address: false,
        detailsAddress: false,
        mobile: false,
        tel: true,
        email: true,
        zipcode: true,
        addressTag: true,
        add: function() {
            $('.addAddress_box').removeClass('dn');
            var beanTemplate = Handlebars.compile($('#content-template').html());
            $('#content-box').html(beanTemplate());
            $('#selectbox').distpicker({
                autoSelect: false
            });
            validForm();
        },
        edit: function(id) {
            addressId = id;
            initAddress(id);
        }
    }

    //地址-省
    $('body').on('change', '#city0', function() {
        var city0 = $('#city0').find("option:selected").attr('data-code');
        if (city0) {
            $('#city1').removeClass('dn');
            city0_val = $('#city0').find("option:selected").val();
        } else {
            $('#city1').addClass('dn');
            $('#city2').addClass('dn');
            city0_val = '';
        }
        $('#citySpan').removeClass('dn').text(city0_val);
    });

    //地址-市
    $('body').on('change', '#city1', function() {
        var city1 = $('#city1').find("option:selected").attr('data-code');
        if (city1) {
            $('#city2').removeClass('dn');
            city1_val = $('#city1').find("option:selected").val();
        } else {
            $('#city2').addClass('dn');
            city1_val = '';
        }
        $('#citySpan').removeClass('dn').text(city0_val + city1_val);
    });

    //地址-县
    $('body').on('change', '#city2', function() {
        var city2 = $('#city2').find("option:selected").attr('data-code');
        if (city2) {
            city2_val = $('#city2').find("option:selected").val();
        } else {
            city2_val = '';
        }
        $('#citySpan').removeClass('dn').text(city0_val + city1_val + city2_val);
    });

    //初始化编辑弹窗
    function initAddress(id) {
        $.ajax({
            url: '/front/member/address/goUpdateAddress',
            type: 'GET',
            dataType: 'json',
            data: {
                addressId: id
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                }else if (res && res.code == '00') {
                     $('.addAddress_box').removeClass('dn');
                    var beanTemplate = Handlebars.compile($('#content-template').html());
                    $('#content-box').html(beanTemplate(res.data));
                    $('#selectbox').distpicker({
                        autoSelect: false
                    });
                    $('#city0 option[data-code="' + res.data.province + '"]').prop('selected', 'selected');
                    $('#city0').trigger('change');
                    $('#city1 option[data-code="' + res.data.city + '"]').prop('selected', 'selected');
                    $('#city1').trigger('change');
                    $('#city2 option[data-code="' + res.data.county + '"]').prop('selected', 'selected');
                    $('#city2').trigger('change');
                    validForm();
                } else if (res && res.code == '01') {
                    dialog({
                        content: '数据出错了'
                    });
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

    //校验表格
    function validForm() {
        valid.settings = {
            initTip: function(input, defaultTip) {},
            validTip: function(input, errorInfo, defaultTip) {
                if (errorInfo) {
                    input.next().next('.msg-info').hide();
                    input.next('.msg-error').show().find('.msg-img').text(errorInfo);
                }
            }
        };
        valid.render({
            '#consignee': {
                option: 'blur',
                regexp: /^[\u4e00-\u9fa5_a-zA-Z0-9\(\)\（\）\-\·\@\#\$\%\^\&\*\[\]\>\<\?\？\`\~\!\！\】\【\￥\…\……\+\-\=\\\/\：\，\|\.\。\;\"\'\“\”\‘\’\{\}\《\》\、\——]{0,40}$/,
                required: true,
                requiredTip: '该选项必填',
                errorTip: '不能含有特殊字符',
                success: function(input) {
                    addAddress['consignee'] = true;
                    input.next('.msg-error').hide()
                    input.next().next('.msg-info').show();
                },
                failed: function(input) {
                    addAddress['consignee'] = false;
                }
            },
            '#detailsAddress': {
                option: 'blur',
                regexp: /^[\u4E00-\u9FA5\w\d]+$/,
                required: true,
                requiredTip: '该选项必填',
                errorTip: '不能含有特殊字符',
                success: function(input) {
                    addAddress['detailsAddress'] = true;
                    input.next('.msg-error').hide()
                    input.next().next('.msg-info').show();
                },
                failed: function(input) {
                    addAddress['detailsAddress'] = false;
                }
            },
            '#mobile': {
                option: 'blur',
                regexp: /^0?(1)[0-9]{10}$/,
                required: true,
                requiredTip: '该选项必填',
                errorTip: '无效的手机号码',
                success: function(input) {
                    addAddress['mobile'] = true;
                    input.next('.msg-error').hide()
                    input.next().next('.msg-info').show();
                },
                failed: function(input) {
                    addAddress['mobile'] = false;
                }
            },
            '#tel': {
                option: 'blur',
                regexp: /^\d[\d-]{0,19}$/,                
                required: false,
                errorTip: '无效的电话号码',
                success: function(input) {
                    addAddress['tel'] = true;
                    if (input.val()) {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').show();
                    } else {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').hide();
                    }
                },
                failed: function(input) {
                    addAddress['tel'] = false;
                }
            },

            '#email': {
                option: 'blur',
                regexp: /^.*([@.]).*(?!\1)[@.].*$/,
                required: false,
                errorTip: '无效的邮件地址',
                success: function(input) {
                    addAddress['email'] = true;
                    if (input.val()) {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').show();
                    } else {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').hide();
                    }
                },
                failed: function(input) {
                    addAddress['email'] = false;
                }
            },
            '#zipcode': {
                option: 'blur',
                regexp: /^\d{6}$/,
                required: false,
                errorTip: '无效的邮政编码',
                success: function(input) {
                    addAddress['zipcode'] = true;
                    if (input.val()) {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').show();
                    } else {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').hide();
                    }
                },
                failed: function(input) {
                    addAddress['zipcode'] = false;
                }
            },
            '#addressTag': {
                option: 'blur',
                regexp: /^[\u4E00-\u9FA5\w\d\——\—]+$/,
                required: false,
                errorTip: '不能含有特殊字符',
                success: function(input) {
                    addAddress['addressTag'] = true;
                    if (input.val()) {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').show();
                    } else {
                        input.next('.msg-error').hide()
                        input.next().next('.msg-info').hide();
                    }
                },
                failed: function(input) {
                    addAddress['addressTag'] = false;
                }
            }
        });
        

    }

    //关闭弹窗
    $('body').on('click', '.ui-dialog-close', function() {
        $('.addAddress_box').addClass('dn');
        location.reload();
    });

    //提交表单
    $('body').on('click', '.in_btn', function() {
        var consignee = $.trim($('#consignee').val());
        var county = $('#city2').find("option:selected").attr('data-code');
        var detailsAddress = $.trim($('#detailsAddress').val());
        var mobile = $.trim($('#mobile').val());
        var tel = $.trim($('#tel').val());
        var email = $.trim($('#email').val());
        var zipcode = $.trim($('#zipcode').val());
        var addressTag = $.trim($('#addressTag').val());
        if (!consignee) {
            $('#consignee').next('.msg-error').show();
            return;
        }else if(consignee.length > 8){
            $('#consignee').nextAll('.name-error').show();
            return;
        } else {
            $('#consignee').trigger('blur');
        }
        if (!detailsAddress) {
            $('#detailsAddress').next('.msg-error').show();
            if (!county) {
                $('#citySpan').removeClass('dn').html('<strong class="red">请选择地区</strong>');
            }
            return;
        } else {
            $('#detailsAddress').trigger('blur');
        }
        if (!mobile) {
            $('#mobile').next('.msg-error').show();
            return;
        } else {
            $('#mobile').trigger('blur');
        }
        if (!county) {
            $('#citySpan').removeClass('dn').html('<strong class="red">请选择地区</strong>');
            return;
        }
        if (!isRequiredTure()) {
            return;
        }
        if (!$(this).attr('disabled')) {
            $(this).attr('disabled', true);
        }
        var data = {
            addressId: addressId,
            consignee: consignee,
            county: county,
            address: detailsAddress,
            mobile: mobile,
            tel: tel,
            email: email,
            zipCode: zipcode,
            addressTag: addressTag
        };
        $.ajax({
            url: '/front/member/address/updateOrSaveAddress',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(res) {
                if (res && res.code == '00') {
                    $('.addAddress_box').addClass('dn');
                    location.reload();
                } else if (res && res.code == '01') {
                    dialog({
                        content: '请选择地区'
                    });
                } else if (res && res.code == '02') {
                    dialog({
                        content: '请求失败'
                    });
                } else if (res && res.code == '03') {
                    dialog({
                        content: '最多可添加10个收货地址'
                    });
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                }
                $('#saveNewAddressBtn').prop('disabled', false);
            },
            error: function() {
                dialog({
                    content: '网络繁忙，请您稍后重试'
                });
                $('#saveNewAddressBtn').prop('disabled', false);
            }
        });
    });

    //判断必传值
    function isRequiredTure() {
        // console.log(addAddress.consignee+','+addAddress.detailsAddress+','+addAddress.mobile+','+addAddress.tel+','
        //     +addAddress.email+','+addAddress.zipcode+','+addAddress.addressTag );
        var flag = true;
        if (!addAddress.consignee || !addAddress.detailsAddress || !addAddress.mobile || !addAddress.tel ||
            !addAddress.email || !addAddress.zipcode || !addAddress.addressTag) {
            flag = false;
        }
        return flag;
    }

    return addAddress;

});

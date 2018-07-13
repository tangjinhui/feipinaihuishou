define(['jquery', 'handlebars', 'dialog', 'distpicker', ], function($, Handlebars, dialog) {
    var orderId = "";
    $('body').on('click', '.changeAddress', function() {
        
        orderId = $(this).attr('data-orderId');
        $.ajax({
            url: '/front/member/order/getAddressDetail',
            type: 'get',
            dataType: 'json',
            data: {
                orderId: orderId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    $('.address_box').show();
                    addressDetail(res.data);
                } else if (res.code == '01') {
                    dialog({ title: '系统提示', content: '订单号有误' });
                } else {
                    dialog({ title: '系统提示', content: '修改异常' });
                }
            }
        });

    });

    $('#closeAddressLayer').on('click', function() {
        $('.address_box').hide();
        location.reload();
    });
    var city0_val = '';
    var city1_val = '';
    var city2_val = '';

    function addressDetail(data) {
        var beanTemplate = Handlebars.compile($('#content-template').html());
        $('#content-box').html(beanTemplate(data));
        $('#selectbox').distpicker({
            autoSelect: false
        });
        $('#city0 option[data-code="' + data.province + '"]').prop('selected', 'selected');
        $('#city0').trigger('change');
        $('#city1 option[data-code="' + data.city + '"]').prop('selected', 'selected');
        $('#city1').trigger('change');
        $('#city2 option[data-code="' + data.county + '"]').prop('selected', 'selected');
        $('#city2').trigger('change');

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
    //确定修改地址
    $('body').on('click', '.submitAddress', function() {
        var name = $.trim($("#name").val());
        var email = $.trim($("#email").val());
        var province = $('#city0').find("option:selected").attr('data-code');
        var city = $('#city1').find("option:selected").attr('data-code');
        var departmentCode = $('#city2').find("option:selected").attr('data-code');
        var addressDetail = $("#address").val();
        var address = city0_val+'-' + city1_val+'-' + city2_val + addressDetail;
        var postCode = $.trim($("#zipcode").val());
        var tel = $.trim($("#tel").val());
        var mobile = $.trim($("#mobile").val());
        $('.cj_sjcm_inputright2').hide();
        if (!name) {
            $("#consigneeError").text('收货人不能为空');
            $("#consigneeError").show();
            return;
        } else if (name.indexOf(",") > 0 || name.indexOf(":") > 0) {
            $("#consigneeError").text('不能输入特殊字符');
            $("#consigneeError").show();
            return;
        }else if(name.length > 8){
            $("#consigneeError").text('收货人不能超过8个字');
            $("#consigneeError").show();
            return;
        } else {
            $("#consigneeError").hide();
        }

        if(email.length > 40){
             $("#emailError").show();
             return;
        }
       
        if (email) {
            if (email.indexOf("@") < 0 || email.indexOf(".") < 0) {
                $("#emailError").show();
                return;
            } else {
                $("#emailError").hide();
            }
        } else {
            $("#emailError").hide();
        }

        if (!province) {
            $('#cityError').show();
            return;
        } else {
            $('#cityError').hide();
        }
        if (!city) {
            $('#cityError').show();
            return;
        } else {
            $('#cityError').hide();
        }
        if (!departmentCode) {
            $('#cityError').show();
            return;
        } else {
            $('#cityError').hide();
        }

        //^[\u4E00-\u9FA5\w\d]+$
        var str = /^[\u4E00-\u9FA5a-zA-Z0-9_]*$/;
        if (!addressDetail) {
            $("#addressError").text('请输入有效的收货地址');
            $("#addressError").show();
            return;
        } else if (!str.exec(addressDetail)) {
            $("#addressError").text('不能含有特殊字符');
            $("#addressError").show();
            return;
        } else {
            $("#addressError").hide();
        }

      
        var reg = /^[0-9]+$/;
        //var telReg = /0\d{2,3}-\d{7,8}/;
        if(tel.length > 20){
            $("#telError").show();
            return;
        }else{
            $("#telError").hide();
        }
        if(tel.length > 0 ){
            if(tel.indexOf("-") < 0){
                if(!reg.test(tel)){
                    $("#telError").show();
                    return;
                } 
            }else{
                var telVo = tel.replace(/-/g,"");
                if(!reg.test(telVo)){
                    $("#telError").show();
                    return;
                } 
            }
        }else{
             $("#telError").hide();
        }
         var pattern = /^[0-9]{6}$/;
        
        if (postCode.length > 0 && !pattern.exec(postCode)) {
            $("#zipcodeError").show();
            return;
        } else {
            $("#zipcodeError").hide();
        }
        
        if (mobile.length == 0) {
            $("#mobileError").hide();
            $("#mobileNull").show();
            return;
        } else {
            $("#mobileNull").hide();
        }
        var reg = /^0?(1)[0-9]{10}$/;
        if (!reg.test(mobile)) {
            $("#mobileNull").hide();
            $("#mobileError").show();
            return;
        } else {
            $("#mobileError").hide();
        }
        $.ajax({
            url: '/front/member/order/saveUpdateAddress',
            type: 'get',
            dataType: 'json',
            data: {
                county: departmentCode,
                zipcode: postCode,
                address: addressDetail,
                consignee: name,
                tel: tel,
                mobile: mobile,
                email: email,
                orderId: orderId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res && res.code == '00') {
                    dialog({ title: '系统提示', content: '修改成功' });
                    $('.address_box').hide();
                } else {
                    dialog({ title: '系统提示', content: '修改失败' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请稍后重试' });
            }
        });
    });


});

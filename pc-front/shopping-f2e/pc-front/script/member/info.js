require(['jquery', 'handlebars', 'form-valid', 'dialog', 'distpicker', 'header', 'modules/menu'], function($, Handlebars, valid, dialog) {

    var city0_val = '';
    var city1_val = '';
    var city2_val = '';

    Handlebars.registerHelper('if_sex', function(v1, v2, opts) {
        if (v1 == v2)
            return opts.fn(this);
        else
            return opts.inverse(this);
    });
    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });
    Handlebars.registerHelper("addressSpan", function(province, city, county) {
        var addressStr = '';
        if (province) {
            addressStr += ChineseDistricts[86][province];
        }
        if (city) {
            addressStr += ChineseDistricts[province][city];
        }
        if (county) {
            addressStr += ChineseDistricts[city][county];
        }
        return addressStr;
    });

    //init 渲染页面数据
    $.ajax({
        url: '/front/member/searchAccountInfo',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            if (res && res.code == '00') {
                var source = $("#baseInfo-template").html();
                var template = Handlebars.compile(source);
                var html = template(res.data);
                $('#baseInfo').html(html);
                setBirth();
                //地址
                $('#selectbox').distpicker({
                    autoSelect: false
                });
                //js渲染
                var province = res.data.addressMap.province; //地址-省
                var city = res.data.addressMap.city; //地址-市
                var county = res.data.addressMap.county; //地址-县
                var year = res.data.birthdayMap.year; //生日-年
                var month = res.data.birthdayMap.month; //生日-月
                var day = res.data.birthdayMap.day; //生日-日
                var maritalStatus = res.data.accountInformation.maritalStatus; //婚姻状况
                var monthlyIncome = res.data.accountInformation.monthlyIncome; //月收入
                var interests = res.data.accountInformation.interests; //爱好
                if (province) {
                    $('#city0 option[data-code="' + province + '"]').prop('selected', 'selected');
                    $('#city0').trigger('change');
                }
                if (city) {
                    $('#city1 option[data-code="' + city + '"]').prop('selected', 'selected');
                    $('#city1').trigger('change');
                }
                if (county) {
                    $('#city2 option[data-code="' + county + '"]').prop('selected', 'selected');
                    $('#city2').trigger('change');
                }
                if (year) {
                    $('select[name="birthdayYear"] option[value="' + year + '"]').prop('selected', true);
                }
                if (month) {
                    $('select[name="birthdayMonth"] option[value="' + month + '"]').prop('selected', true);
                }
                if (day) {
                    $('select[name="birthdayDay"] option[value="' + day + '"]').prop('selected', true);
                }
                if (maritalStatus) {
                    $('#maritalStatus input:eq(' + maritalStatus + ')').prop('checked', true);
                }
                if (monthlyIncome) {
                    $('select[name="monthlyIncome"] option:eq(' + monthlyIncome + ')').prop('selected', true);
                }
                if (interests) {
                    setInterests(interests);
                }
                validForm();
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

    //初始化爱好，截取爱好返回值
    function setInterests(str) {
        var arr = str.split(",");
        for (var i = 0; i < arr.length - 1; i++) {
            $('#interests input:eq(' + (arr[i] - 1) + ')').prop('checked', true);
        }
    }

    //初始化生日
    function setBirth() {
        var birthYear = '';
        var birthMonth = '';
        var birthMonth = '';
        var birthDay = '';
        var nowYear = new Date().getFullYear();
        for (var i = 1917; i <= nowYear; i++) {
            birthYear += '<option value="' + i + '">' + i + '</option>';
        }
        for (var i = 1; i < 13; i++) {
            var m = 1;
            if (i < 10) {
                m = '0' + i;
            } else {
                m = i;
            }
            birthMonth += '<option value="' + m + '">' + m + '</option>';
        }
        for (var i = 1; i < 32; i++) {
            birthDay += '<option value="' + i + '">' + i + '</option>';
        }
        $('#birthdayYear').html(birthYear);
        $('#birthdayMonth').html(birthMonth);
        $('#birthdayDay').html(birthDay);
    }

    //校验input
    function validForm() {
        valid.settings = {
            initTip: function(input, defaultTip) {},
            validTip: function(input, errorInfo, defaultTip) {
                if (errorInfo) {
                    input.next().next('.formSuc').hide();
                    input.next('.formError').show().find('.formErrorContent').text(errorInfo);
                }
            }
        };
        valid.render({
            '#nc': {
                option: 'blur',
                required: true,
                requiredTip: '该选项必填',
                success: function(input) {
                    input.next('.formError').hide()
                    input.next().next('.formSuc').show();
                },
                failed: function(input) {}
            },
            '#address': {
                option: 'blur',
                required: true,
                requiredTip: '该选项必填',
                success: function(input) {
                    input.next('.formError').hide()
                    input.next().next('.formSuc').show();
                },
                failed: function(input) {}
            }
        });
    }

    //判断是否闰年
    function isLeapYear(year) {
        return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
    }

    //判断二月天数
    function isFebruary(month, days) {
        var day = '';
        if (month == '02') {
            for (var i = 1; i <= days; i++) {
                day += '<option value="' + i + '">' + i + '</option>';
            }
        } else if (month == '04' || month == '06' || month == '09' || month == '11') {
            for (var i = 1; i <= 30; i++) {
                day += '<option value="' + i + '">' + i + '</option>';
            }
        } else {
            for (var i = 1; i <= 31; i++) {
                day += '<option value="' + i + '">' + i + '</option>';
            }
        }
        return day;
    }

    //保存修改
    $('#modify').on('click', function() {
        var accountName = $.trim($('#nc').val());
        var county = $('#city2').find("option:selected").attr('data-code');
        var address = $.trim($('#address').val());
        var sex = $('input:radio[name="sex"]:checked').val();
        var birthdayYear = $('select[name="birthdayYear"]').val();
        var birthdayMonth = $('select[name="birthdayMonth"]').val();
        var birthdayDay = $('select[name="birthdayDay"]').val();
        var maritalStatus = $('input:radio[name="maritalStatus"]:checked').val();
        var monthlyIncome = $('select[name="monthlyIncome"]').val();
        var interests = '';
        var chk = $('input:checkbox[name="interest"]:checked');
        chk.each(function() {
            interests += $(this).val() + ',';
        });
        //校验非空
        if (!accountName) {
            $('#nc').next('.formError').show();
            return;
        } else {
            $('#nc').next('.formError').hide();
            $('#nc').next('.formError').next('.formSuc').show();
        }
        if (!address) {
            $('#address').next('.formError').show();
            return;
        } else {
            $('#address').next('.formError').hide();
            $('#address').next('.formError').next('.formSuc').show();
        }
        $.ajax({
            url: '/front/member/saveAccountInfo',
            type: 'POST',
            dataType: 'json',
            data: {
                accountName: accountName,
                county: county,
                address: address,
                sex: sex,
                birthdayYear: birthdayYear,
                birthdayMonth: birthdayMonth,
                birthdayDay: birthdayDay,
                maritalStatus: maritalStatus,
                monthlyIncome: monthlyIncome,
                interests: interests
            },
            success: function(res) {
                if (res && res.code == '00') {
                    dialog({
                        title: '系统提示',
                        content: '用户信息修改成功!',
                        callback: function() {
                            location.reload();
                        }
                    });
                } else if (res && res.code == '01') {
                    $('#nc').next('.formError').show();
                    dialog({
                        content: '请填写昵称'
                    });
                } else if (res && res.code == '02') {
                    dialog({
                        content: '昵称过长，请重新输入'
                    });
                } else if (res && res.code == '03') {
                    $('#address').next('.formError').show();
                    dialog({
                        content: '请填写详细地址'
                    });
                } else if (res && res.code == '04') {
                    dialog({
                        content: '地址过长，请重新填写'
                    });
                } else if (res && res.code == '05') {
                    dialog({
                        content: '请选择地址'
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
    });

    //月份改变，天数改变
    $('body').on('change', '#birthdayMonth', function() {
        var month = $(this).val();
        var year = $('#birthdayYear').val();
        var day = '';
        if (month == '02') { //	2月
            if (isLeapYear(year)) {
                for (var i = 1; i <= 29; i++) {
                    day += '<option value="' + i + '">' + i + '</option>';
                }
            } else {
                for (var i = 1; i <= 28; i++) {
                    day += '<option value="' + i + '">' + i + '</option>';
                }
            }
        } else if (month == '04' || month == '06' || month == '09' || month == '11') {
            for (var i = 1; i <= 30; i++) {
                day += '<option value="' + i + '">' + i + '</option>';
            }
        } else {
            for (var i = 1; i <= 31; i++) {
                day += '<option value="' + i + '">' + i + '</option>';
            }
        }
        $('#birthdayDay').html(day);
    });

    //年份改变，天数改变
    $('body').on('change', '#birthdayYear', function() {
        var year = $(this).val();
        var month = $('#birthdayMonth').val();
        var day = '';
        if (isLeapYear(year)) {
            day = isFebruary(month, 29);
        } else {
            day = isFebruary(month, 28)
        }
        $('#birthdayDay').html(day);
    });

    //改变地址-省
    $('body').on('change', '#city0', function() {
        var city0 = $('#city0').find("option:selected").attr('data-code');
        if (!city0) {
            $('#city1').addClass('dn');
            $('#city2').addClass('dn');
        } else {
            $('#city1').removeClass('dn');
            $('#city2').addClass('dn');
            city0_val = $('#city0').find("option:selected").val();
        }
        $('#citySpan').text(city0_val);
    });

    //改变地址-市
    $('body').on('change', '#city1', function() {
        var city1 = $('#city1').find("option:selected").attr('data-code');
        if (!city1) {
            $('#city2').addClass('dn');
        } else {
            $('#city2').removeClass('dn');
            city1_val = $('#city1').find("option:selected").val();
        }
        $('#citySpan').text(city0_val + city1_val);
    });

    //改变地址-县
    $('body').on('change', '#city2', function() {
        var city2 = $('#city2').find("option:selected").attr('data-code');
        if (city2) {
            city2_val = $('#city2').find("option:selected").val();
        } else {
            city2_val = '';
        }
        $('#citySpan').text(city0_val + city1_val + city2_val);
    });

});

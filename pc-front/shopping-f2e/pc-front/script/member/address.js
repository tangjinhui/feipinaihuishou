require(['jquery', 'handlebars', 'dialog', 'modules/addAddress', 'header', 'modules/menu'], function($, Handlebars, dialog, addAddress) {
    var addressIdArr = [];
    var setDefaultIndex = '';
    var total = 0;
    init();

    Handlebars.registerHelper('ifDefault', function(flag, option) {
        if (flag && flag == '1') {
            return '（默认收货地址）';
        }
    });
    Handlebars.registerHelper('isDefaultBtn', function(flag, option) {
        if (flag == '0') {
            return new Handlebars.SafeString('<li><a href="javascript:void(0)" class="anniu setDefaultBtn">设置默认</a></li>');
        }
    });
    Handlebars.registerHelper("dataLen", function(list, options) {
        if (list.length) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    //init
    function init() {
        $.ajax({
            url: '/front/member/address/getMemberAddressList',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                if (res && res.code == '00') {
                    var list = res.data.page.list;
                    total = res.data.page.total;
                    for (var i = 0; i < list.length; i++) {
                        addressIdArr.push(list[i].addressId);
                    }
                    var beanTemplate = Handlebars.compile($('#list-template').html());
                    $('#list_box').html(beanTemplate(res.data.page));
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

    //设置默认地址
    function setDefaultAddress(n) {
        var addressId = addressIdArr[n];
        $.ajax({
            url: '/front/member/address/updateDefaultFlag',
            type: 'GET',
            dataType: 'json',
            data: {
                addressId: addressId
            },
            success: function(res) {
                if (res && res.code == '00') {
                    window.location.reload();
                } else if (res && res.code == '01') {
                    dialog({ content: res.msg });
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

    //新增地址
    $('#addAddress').on('click', function() {
        if (total >= 10) {
            dialog({
                title: '系统提示',
                content: '最多可添加10个收货地址'
            });
        } else {
            addAddress.add();
        }
    });

    //设置为默认收货地址
    $(document).on("click", ".setDefaultBtn", function() {
        var setDefaultIdN = $(this).parents('.adrnav').attr('id');
        setDefaultIndex = setDefaultIdN.substr(setDefaultIdN.length-1, 1);
        dialog({
            title: '操作确认',
            type: 'confirm',
            content: '确认设为默认地址吗？',
            callback: function() {
                setDefaultAddress(setDefaultIndex);
            }
        });
    });

    //编辑收货地址
    $(document).on("click", ".edit", function() {
        var addressId = $(this).attr('data-addressId');
        addAddress.edit(addressId);
    });

});

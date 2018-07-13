require(['jquery', 'handlebars', 'dialog', 'base64', 'getUrlParam', 'header'], function($, Handlebars, dialog, base64, getUrlParam) {

    var len = $('#user_is_login').length;
    if (!len) {
        window.location.href = 'https://passportdev.ecgci.com/login.html';
    }

    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });

    Handlebars.registerHelper("formatPrice", function(price) {
        return formatPrice(price);
    });

    Handlebars.registerHelper("pandaTrading", function(pandacoins, isPandaTradinghours, options) {
        if (pandacoins && !isPandaTradinghours) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    initAjax();

    function initAjax() {
        $.ajax({
            url: '/front/member/cart/cartList',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    if(res.data.cartInfos.length<=0){
                        $('.cart-empty').show();
                        $('#cartList').hide();
                    } else {
                        var flag = getUrlParam('flag');
                        if (flag) {
                            $('#success_flag').removeClass('dn');
                        } else {
                            $('#success_flag').addClass('dn');
                        }
                        var cartTemp = Handlebars.compile($("#cart-template").html());
                        $('#cartBox').html(cartTemp(res.data));

                        var allPrice = 0;
                        var allPoint = 0;
                        var allGoodsLen = 0;
                        var allBoxChecked = false;
                        for (var i = 0; i < res.data.cartInfos.length; i++) {
                            if($('input[type=checkbox][value='+res.data.cartInfos[i].goodsId+']').is(':checked')){
                                allPrice += res.data.cartInfos[i].totalPrice;
                                allPoint += res.data.cartInfos[i].payPoint;
                                allGoodsLen++;
                            }
                        }
                        $('.goodsAllLen').text(allGoodsLen);
                        $('.goodsAllPrice').text(formatPrice(allPrice));
                        $('.goodsAllbean').text(allPoint);
                        if (allGoodsLen == $('input[type=checkbox][name=goodsId]').length) {
                            $('.allbox').prop('checked', true);
                        }
                        $('.cart-empty').hide();
                        $('#cartList').show();
                    }
                }
               
            }
        });
    }

    $('body').on('change', '.allbox', function() {
        var checked = $(this).is(':checked');
        $('input[type=checkbox]').prop('checked', checked);
        countPrice(true);
    });

    $('body').on('change', '.border_all input[type=checkbox]', function() {
        var checkedLen = $('.border_all input[type=checkbox]:checked').length;
        var trLen = $('.border_all input[type=checkbox]').length;
        if (checkedLen == trLen) {
            $('.allbox').prop('checked', true);
        } else {
            $('.allbox').prop('checked', false);
        }
        countPrice(true);
    });

    //点击-
    $('body').on('click', '.reduce', function() {
        var val = $.trim($(this).next(".num_gwc").val());
        val = parseInt(val) - 1;
        if (val < 1) {
            dialog({ content: '购买每款商品数量不可以小于1' });
            return ;
        }
        var goodsId = $(this).next(".num_gwc").attr("data-goodsId");
        goodsNumChange(goodsId, val, this);
    });
    //点击+
    $('body').on('click', '.add', function() {
        var val = $.trim($(this).prev(".num_gwc").val());
        val = parseInt(val) + 1;
        if (parseInt(val) > 999) {
            dialog({ content: '购买商品数量为1-999' });
            return ;
        }
        var goodsId = $(this).prev(".num_gwc").attr("data-goodsId");
        goodsNumChange(goodsId, val, this);
    });
    //商品数量变化，input
    $("body").on("keyup", ".num_gwc", function(e) {
        var keyCode = e.keyCode;
        var goodsId = $(this).attr("data-goodsid");
        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || keyCode == 8 || keyCode == 37 || keyCode == 39) {
            var val = $(this).val();
            if (val == "") {
                val = "1";
            }
            if (val.indexOf("0") == 0) {
                val = val.substring(1, val.length);
                $(this).val(val);
            }
            if (val > 999) {
                dialog({ content: '购买商品数量为1-999' });
                $(this).val('999');
            }
            goodsNumChange(goodsId, val, this);
        } else {
            $(this).val(1);
            goodsNumChange(goodsId, 1, this);
            dialog({ title: '系统提示', content: '请输入有效数字' });
            return ;
        }
    });

    function goodsNumChange(goodsId, num, _this) {
        $.ajax({
            url: '/front/member/cart/changeGoodsNum',
            type: 'get',
            data: {
                goodsId: goodsId,
                buyNumber: num
            },
            dataType: 'json',
            success: function(res) {
                if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                }
                if (res.code == '00') {
                    var shopPrice = $(_this).parent().prevAll().find('.shopPrice').attr('data-shopPrice');
                    var totalPrice = (parseFloat(shopPrice) * parseInt(num)).toFixed(2);
                    $(_this).parent().find('.num_gwc').val(num);
                    $(_this).parent().next().find('.totalPrice').text(formatPrice(totalPrice));
                    countPrice();
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                    return false;
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                return false;
            }
        });
    }

    function countPrice(updatePitchOn) {
        var tr = $('.no_border');
        var allPrice = 0;
        var allPoint = 0;
        var goodsLen = 0;
        var str = '';
        tr.each(function() {
            var isChecked = $(this).find('input[type=checkbox]').is(':checked');
            if (isChecked) {
                allPrice += parseFloat($(this).find('.totalPrice').text());
                allPoint += parseFloat($(this).find('.bean').text());
                goodsLen++;
            }
            var goodsId = $(this).find('input[type=checkbox]').val();
            if (goodsId) {
                str += goodsId + '#' + isChecked + '@';
            }
        });
        $('.goodsAllPrice').text(formatPrice(allPrice));
        $('.goodsAllLen').text(goodsLen);
        $('.goodsAllbean').text(allPoint);
        if (updatePitchOn) {
            $.ajax({
                url: '/front/member/cart/setCartPitchOn',
                type: 'get',
                data: {
                    param: str
                },
                dataType: 'json',
                success: function(res) {
                    if (res.code == '99') {
                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                    } else if (res.code == '00') {

                    } else {
                        dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                    }
                },
                error: function() {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            });
        }
    }

    function formatPrice(price) {
       if (!price) {
            return '';
        }
        return parseFloat(price).toFixed(2);
    }

    $('body').on('click', '.delCartGoods', function() {
        var _this = this;
        dialog({
            content: '确定从购物车中删除此商品吗？',
            callback: function() {
                var goodsId = $(_this).attr('data-goodsId');
                $.ajax({
                    url: '/front/member/cart/cancelFromCart',
                    type: 'get',
                    data: {
                        ids: goodsId
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.code == '99') {
                            window.location.href = 'https://passportdev.ecgci.com/login.html';
                        } else if (res.code == '00') {
                            window.location.reload();
                        } else {
                            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                        }
                    },
                    error: function() {
                        dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                    }
                });
            },
            type: 'confirm'
        });
    });

    $('body').on('click', '#delAllGoods', function() {
        var _this = this;
        var tr = $('.trcheck');
        var str = '';
        tr.each(function() {
            var isChecked = $(this).find('input[type=checkbox]').is(':checked');
            if (isChecked) {
                var goodsId = $(this).find('input[type=checkbox]').val();
                str += goodsId + ',';
            }
        });
        if (!str.length) {
            dialog({
                content: '请至少选择一个要删除的商品。'
            });
            return;
        }
        dialog({
            content: '确定从购物车中删除已选中的商品吗？',
            callback: function() {
                var goodsId = $(_this).attr('data-goodsId');
                $.ajax({
                    url: '/front/member/cart/cancelFromCart',
                    type: 'get',
                    data: {
                        ids: str
                    },
                    dataType: 'json',
                    success: function(res) {
                        if (res.code == '99') {
                            window.location.href = 'https://passportdev.ecgci.com/login.html';
                        } else if (res.code == '00') {
                            window.location.reload();
                        } else {
                            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                        }
                    },
                    error: function() {
                        dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                    }
                });
            },
            type: 'confirm'
        });
    });

    $('body').on('click', '#sub_order', function() {
        var tr = $('.trcheck');
        var allId = '';
        var allNum = '';
        var joint = "[";
        tr.each(function() {
            var isChecked = $(this).find('input[type=checkbox]').is(':checked');
            if (isChecked) {
                var goodsId = $(this).find('input[type=checkbox]').val();
                var num = $(this).find('.num_gwc').val();
                joint += '{"goodsId":' + goodsId + ',"userBuyNum":' + num + '},';
                allId += goodsId + ',';
                allNum += num + ',';
            }
        });
        if (joint.length > 1) {
            joint = joint.substring(0, joint.length - 1);
        }
        joint += "]";
        if (!allId.length) {
            dialog({
                content: '请您至少选择一个商品去结算'
            });
            return ;
        }
        subOrderCheck(joint, allId, allNum);
    });

    function subOrderCheck(goodsInfo, allId, allNum) {
        $.ajax({
            url: '/front/member/cart/buyGoodsCheck',
            type: 'get',
            data: { goodsInfo: goodsInfo },
            dataType: 'json',
            success: function(res) {
                if (res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    var orderStr = allId + ':' + allNum;
                    orderStr = base64.btoa(base64.btoa(orderStr));
                    var url = 'http://orderdev.ecgci.com/order/list?param=' + orderStr;
                    if (true == res.data) {
                        dialog({
                            content: '已购商品中包含实时交易熊猫币，提交订单时请阅读相关购买协议！',
                            type: 'confirm',
                            callback: function() {
                                window.location.href = url;
                            }
                        });
                    } else {
                        window.location.href = url;
                    }

                } else if (res.code == '01') {
                    dialog({ content: '请您至少选择一个商品去结算' });
                    return false;
                } else if (res.code == '04') {
                    dialog({ content: '【' + res.data + '】商品已下架' });
                    return false;
                } else if (res.code == '05') {
                    dialog({ content: '【' + res.data + '】商品库存不足，请重新选择商品结算' });
                    return false;
                } else if (res.code == '06') {
                    dialog({ content: '【' + res.data.goodsName + '】商品单用户最小起购量【' + res.data.leastBuyNum + '】枚/套，请您重新选购，谢谢！' });
                    return false;
                } else if (res.code == '07') {
                    dialog({ content: '【' + res.data.goodsName + '】商品单用户限购【' + res.data.limitedNumber + '】枚/套，您还可以购买【' + res.data.ableBuyNumber + '】枚/套，请您重新选购，谢谢！' });
                    return false;
                } else if (res.code == '08') {
                    dialog({ link:'/member/security.html', content: '您购买的商品：' + res.data + '，只允许实名会员购买。快点击“确定”进行实名认证申请吧。' });
                    return false;
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                    return false;
                }
            },
            error: function() {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        });
    }
});

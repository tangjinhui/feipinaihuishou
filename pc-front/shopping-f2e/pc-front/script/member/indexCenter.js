require(['jquery', 'handlebars', 'limitPage', 'modules/accountDialog', 'dialog', 'modules/menu', 'header'], function($, Handlebars, limitPage, accountDialog, dialog) {
    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });
    Handlebars.registerHelper("dataLen", function(list, options) {
        if (list.length) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper("power", function(can, orderId) {
        var str = '';
        if (can) {
            str = '<div><a class="checkOrderDetail" href="/member/order/detail.html?orderId=' + orderId + '">查看</a></div>';
        }
        return str;
    });
    Handlebars.registerHelper("formatPrice", function(price) {
        if (!price) {
            return '';
        }
        return parseFloat(price).toFixed(2);
    });

    Handlebars.registerHelper("deliveryInfo", function(deliveryType, deliveryNo) {
        if(!deliveryType || !deliveryNo){
            return '';
        }
        if ('1'==deliveryType){
             return deliveryNo + '<br/>(民航快递)';
        }else if ('2'==deliveryType){
             return deliveryNo + '<br/>(顺丰)';
        }else if ('3'==deliveryType){
             return '电子券号：' + deliveryNo + '<br/>(上门自提)';
        }else if ('4'==deliveryType){
             return deliveryNo + '<br/>(EMS)';
        }else if ('5'==deliveryType){
             return deliveryNo + '<br/>(挂号信)';
        }else if ('-1'==deliveryType){
             return deliveryNo + '<br/>(其他)';
        }else {
            return '';
        }
    });

    initData();
    initList();

    function initData() {
        $.ajax({
            url: '/front/member/index',
            type: 'get',
            dataType: 'json',
            success: function(res) {
                if (res.code == '00') {
                    var levelInfo = {};
                    var accountInfo = {};
                    if (res.data.memberSafeLevelInfo == 1) {
                        levelInfo.level = 1;
                        levelInfo.text = '低';
                    } else if (res.data.memberSafeLevelInfo == 3) {
                        levelInfo.level = 3;
                        levelInfo.text = '高';
                    } else {
                        levelInfo.level = 2;
                        levelInfo.text = '中';
                    }
                    if (res.data.mobileValid == 1) {
                        levelInfo.mobileText = '手机已验证';
                        levelInfo.mobileClass = 'sec';
                    } else {
                        levelInfo.mobileText = '手机未验证';
                        levelInfo.mobileClass = 'unSec';
                    }
                    if (res.data.memberValidateDynamic == 0 || res.data.memberValidateDynamic == 1) {
                        levelInfo.dynamicText = '身份未验证';
                        levelInfo.dynamicClass = 'spsdn';
                    } else if (res.data.memberValidateDynamic == 3 || res.data.memberValidateDynamic == 7) {
                        levelInfo.dynamicText = '身份已验证';
                        levelInfo.dynamicClass = 'spsd';
                    } else if (res.data.memberValidateDynamic == 4 || res.data.memberValidateDynamic == 6) {
                        levelInfo.dynamicText = '待动态实名认证';
                        levelInfo.dynamicClass = 'spsdn';
                    } else if (res.data.memberValidateDynamic == 5) {
                        levelInfo.dynamicText = '动态实名认证核查中';
                        levelInfo.dynamicClass = 'spsdn';
                    } else if (res.data.memberValidateDynamic == 2) {
                        levelInfo.dynamicText = '身份审核中';
                        levelInfo.dynamicClass = 'spsd';
                    } else {
                        levelInfo.dynamicText = '实名属性锁定';
                        levelInfo.dynamicClass = 'spsd';
                    }
                    //渲染会员/订单相关数据
                    $('#levelImg').attr('src', 'http://static.ecgci.com' + res.data.levelImg);
                    $('#account').text(res.data.account);
                    $('#levelName').text(res.data.levelName);
                    $('#nextMarkValue').text(res.data.nextMarkValue);
                    $('#memberSafeLevel').addClass('rank-text' + levelInfo.level);
                    $('#memberSafeLevel').text(levelInfo.text);
                    $('#cla').addClass('rank' + levelInfo.level);
                    $('#mobileValid').text(levelInfo.mobileText);
                    $('.tel s').addClass(levelInfo.mobileClass);
                    $('#memberValidateDynamic').text(levelInfo.dynamicText);
                    $('.memberDynamic s').addClass(levelInfo.dynamicClass);
                    $('#dai_zf').text(res.data.noPayOrderCount);
                    $('#dai_pj').text(res.data.noCommentOrderCount);
                    $('#dai_qr').text(res.data.noReceivingOrderCount);
                    if (parseInt(res.data.validPredeposit) == 0) {
                        $('#validPredeposit').text('￥' + '0.00');
                    } else {
                        $('#validPredeposit').text('￥' + res.data.validPredeposit);
                    }

                    $('#no_read_msg').text(res.data.noReadMemberMessageCount);
                    $('#goods_consulting').text(res.data.goodsConsultingCount);
                    $('#my_bean').text(res.data.points);
                    //渲染账户相关数据
                    var isShowAccount = false;
                    if (res.data.operate == 1) { //1
                        accountInfo.accountText = '您尚未开通商城交易账户';
                        accountInfo.buttonText = '立即开通';
                        accountInfo.buttonClass = 'go_open open_cmbc';
                        accountInfo.buttonHref = '/member/open_account.html';
                        accountInfo.linkText = '什么是交易账户?';
                        accountInfo.linkHref = '/doing/virtual_account.html#what';
                        isShowAccount = true;
                    } else if (res.data.operate == -1) { //-1
                        accountInfo.accountText = '您尚未开通商城交易账户';
                        accountInfo.buttonText = '开通中';
                        accountInfo.buttonClass = 'no_open';
                        accountInfo.buttonHref = 'javascript:void(0);';
                        accountInfo.linkText = '什么是交易账户?';
                        accountInfo.linkHref = '/doing/virtual_account.html#what';
                        isShowAccount = true;
                    } else if (res.data.operate == 2 || res.data.operate == 4) { //2
                        accountInfo.accountText = '您的交易账户尚未绑定银行卡<a href="/member/account.html" style="color:#30f;"> 查看账户详情>></a>';
                        accountInfo.buttonText = '去绑卡';
                        accountInfo.buttonClass = 'go_open bindCmbc';
                        accountInfo.buttonHref = 'javascript:void(0);';
                        accountInfo.linkText = '为什么要绑卡?';
                        accountInfo.linkHref = '/doing/virtual_account.html#card_why';
                        isShowAccount = true;
                    } else if (res.data.operate == 3) { //3
                        accountInfo.accountText = '账户余额: <span class="zhye">' + res.data.balance + '</span>元, 其中可用余额: <span class="kyye">' + res.data.useBalance + '</span>元';
                        accountInfo.buttonText = '去充值';
                        accountInfo.buttonClass = 'go_open charge_cmbc';
                        accountInfo.buttonHref = 'javascript:void(0);';
                        accountInfo.linkText = '查看账户详情>>';
                        accountInfo.linkHref = '/member/account.html';
                        isShowAccount = true;
                    } else if (res.data.operate == -3) { //-3
                        accountInfo.accountText = '您的交易账户尚未绑定银行卡<a href="/member/account.html" style="color:#30f;"> 查看账户详情>></a>';
                        accountInfo.buttonText = '绑卡中';
                        accountInfo.buttonClass = 'no_open';
                        accountInfo.buttonHref = 'javascript:void(0);';
                        accountInfo.linkText = '什么是交易会员?';
                        accountInfo.linkHref = '/doing/trade_member.html';
                        isShowAccount = true;
                    }
                    if (!isShowAccount) { //operate：0 未进行实名认证 或 实名认证未成功
                        $('#open_account').addClass('dn');
                    } else {
                        if (res.data.operate == 1) {
                            $('#index_open').hide();
                            $('#open_account').removeClass('dn');
                            $('#accountText').html(accountInfo.accountText);
                            $('#open_cmbc').text(accountInfo.buttonText).attr('href', accountInfo.buttonHref).removeClass().addClass(accountInfo.buttonClass);
                            $('#linkText').text(accountInfo.linkText).attr('href', accountInfo.linkHref);
                        } else {
                            $('#open_cmbc').hide();
                            $('#open_account').removeClass('dn');
                            $('#accountText').html(accountInfo.accountText);
                            $('#index_open').text(accountInfo.buttonText).attr('href', accountInfo.buttonHref).removeClass().addClass(accountInfo.buttonClass);
                            $('#linkText').text(accountInfo.linkText).attr('href', accountInfo.linkHref);
                        }
                    }
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

    function initList(pageNum) {
        var data = {
            pageNum: pageNum || 1,
            orderType: $('[name=orderType]').val(),
            orderStatus: $('[name=orderStatus]').val(),
            flag: $('[name=flag]').val()
        };
        $.ajax({
            url: '/front/member/memberCenterorderList',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function(res) {
                if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemp(res.data.page));
                    initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    if (!res.data.page.list.length) {
                        $('.pageLimit').hide();
                    }
                } else if (res && res.code == '99') {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else {
                    dialog({
                        content: '网络繁忙，请您稍后重试'
                    });
                }
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
                initList(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }

    $('select').on('change', function() {
        initList();
    });

    //开户确认弹窗
    $('#open_cmbc').click(function() {
        $('.layer_ck_other .ck_title').text('开户中');
        $('.layer_ck_other .ck_input').text('请在民生银行市场通网站中完成开户');
        $('.layer_ck_other .ck_sub a.js_resh').text('已完成开户');
        $('#layer_ck').removeClass('dn');
    });
});

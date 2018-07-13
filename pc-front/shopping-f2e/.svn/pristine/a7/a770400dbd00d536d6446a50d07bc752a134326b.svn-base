require(['jquery', 'handlebars', 'limitPage', 'modules/logisticsInformation', 'dialog', 'getUrlParam', 'header', 'modules/menu'], function($, Handlebars, limitPage, logisticsInformation, dialog, getUrlParam) {

    var orderId = getUrlParam('orderId');

    Handlebars.registerHelper('show', function(can, cancel, delivery, update, detail, id, orderId) {
        var str = '';

        if (can) {
            str += '<div><a class="check" href="/member/after_sale/view.html?afterSaleId=' + id + '">查看</a></div>';
        }
        if (delivery) {
            str += '<div><a class="logisticsInfo" style="color: red;" data-afterSaleId="' + id + '"  data-orderId="' + orderId + '" href="javascript:void(0)">填写快递信息</a></div>';
        }
        if (cancel) {
            str += '<div><a href="javascript:void(0)" class="cancelAfterSale" data-afterSaleId="' + id + '" >取消</a></div>';
        }
        if (update) {
            str += '<div><a class="modifyAfterSale" href="/member/after_sale/update_return_goods.html?afterSaleId=' + id + '">修改</a></div>';
        }
        if (detail) {
            str += '<div><a class="afterSaleDetail" href="/member/refund.html?afterSaleId=' + id + '">退款详情</a></div>';
        }
        return str;

    });

    init();

    function init(pageNum) {
        var data = {
            pageNum: pageNum || 1,
            status: $('[name=status]').val() || 0,
            orderId: orderId
        }
        $.ajax({
            url: '/front/member/afterSale/getEsAfterSaleList',
            type: 'get',
            data: data,
            dataType: 'json',
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#list-template").html());
                    $('#list_box').html(listTemp(res.data));
                    if (res.data.list.length) {
                        $('.None_record').hide();
                        initLimitPage(res.data.pages, res.data.pageNum);
                    } else {
                        $('.pageLimit').hide();
                        $('.None_record').show();
                    }
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
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
                init(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }

    $('select').on('change', function() {
        init();
    });

    $('body').on('click', '.cancelAfterSale', function() {
        var afterSaleId = $.trim($(this).attr('data-afterSaleId'));
        if (!afterSaleId) {
            dialog({
                content: '网络连接超时，请您稍后重试'
            });
            return false;
        }
        dialog({
            content: '取消售后申请？',
            type: 'confirm',
            callback: function() {
                $.ajax({
                    url: '/front/member/afterSale/cancelAfterSale',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        afterSaleId: afterSaleId
                    },
                    success: function(res) {
                        if ('99' == res.code) {
                            window.location.href = 'https://passportdev.ecgci.com/login.html';
                        } else if (res.code == '00') {
                            init();
                        } else {
                            dialog({
                                content: '网络连接超时，请您稍后重试'
                            });
                            return false;
                        }
                    },
                    error: function() {
                        dialog({
                            content: '网络连接超时，请您稍后重试'
                        });
                        return false;
                    }
                });
            }
        });
    });

    var pre = true;
    if (pre) {
        $("body").on("click", "#saveTrackingNumber", function() {
            var afterSaleId = $.trim($("#deliveryAfterSaleId").text());
            var deliveryCompanyName = $.trim($("#deliveryCompanyName").val());
            var deliveryNumber = $.trim($("#deliveryNumber").val());
            if (!afterSaleId) {
                dialog({ content: '出错了' });
                return false;
            }
            if (!deliveryCompanyName) {
                dialog({ content: '请填写快递公司名称' });
                return false;
            } else if (deliveryCompanyName.length > 20) {
                dialog({ content: '请填写正确的快递公司名称' });
                return false;
            }
            if (!deliveryNumber) {
                dialog({ content: '请填写运单号' });
                return false;
            } else {
                var reg = new RegExp("^[A-Za-z0-9]+$");
                if (!reg.test(deliveryNumber) || deliveryNumber.length > 20) {
                    dialog({ content: '请输入正确的运单号' });
                    return false;
                }
            }
            $.ajax({
                url: '/front/member/afterSale/saveTrackingNumber',
                type: 'POST',
                dataType: 'json',
                async: false,
                data: {
                    afterSaleId: afterSaleId,
                    deliveryCompanyName: deliveryCompanyName,
                    deliveryNumber: deliveryNumber
                },
                success: function(res) {
                    if ('99' == res.code) {
                        window.location.href = 'https://passportdev.ecgci.com/login.html';
                    } else if (res.code == '00') {
                        pre = false;
                        window.location.reload();
                    } else if (res.code == '02') {
                        dialog({ content: '请填写快递公司名称' });
                        return false;
                    } else if (res.code == '03') {
                        dialog({ content: '请填写运单号' });
                        return false;
                    } else if (res.code == '04' || res.code == '05') {
                        dialog({ content: '服务单不可填写物流信息' });
                        return false;
                    } else {
                        dialog({ content: '网络繁忙，请您稍后重试' });
                        return false;
                    }
                },
                error: function() {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                    return false;
                }
            });

        });
    }

});

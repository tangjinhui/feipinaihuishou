define(['jquery', 'dialog'], function($, dialog) {
    var orderId = '';
    $('body').on('click', '.changeInvoice', function() {
        orderId = $(this).attr('data-orderId');
        $.ajax({
            url: '/front/member/order/getInvoiceDetail',
            type: 'get',
            dataType: 'json',
            data: {
                orderId: orderId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if (res.code == '00') {
                    $('.invoice_layer').show();
                    invoiceDetail(res.data);
                } else if (res.code == '01') {
                    dialog({ title: '系统提示', content: '订单号有误' });
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        });
    });

    function invoiceDetail(data) {
        var isSendTax = data.isSendTax; //是否开发票
        var invoiceTitle = data.invoiceTitle; //发票抬头
        var invoiceType = data.invoiceType; //发票类型
        var companyName = data.provinceName; //公司名称
        var taxCode = data.packetType; //纳税人识别号
        if (!data.isCanJiNianBi) {
            invoiceType = '10';
            $('input[name=chkcontent][value=11]').hide().next().hide();
        }
        $('input[name=isSendTax][value=' + isSendTax + ']').prop('checked', true);
        if (invoiceTitle) {
            $('input[name=chktitle][value=' + invoiceTitle + ']').prop('checked', true);
        }

        if (invoiceType) {
            $('input[name=chkcontent][value=' + invoiceType + ']').prop('checked', true);
        }

        $('input[name=comPanyName]').val(companyName);
        $('input[name=taxCode]').val(taxCode);

        $('input[name=isSendTax]:checked').trigger('click');
        $('input[name=chktitle]:checked').trigger('click');
    }

    $('#closeInvoice').on('click', function() {
        $('.invoice_layer').hide();
    });


    $('input[name=chktitle]').on('click', function() {
        var val = $(this).val();
        if (parseInt(val) == 21) {
            $('#company_span').css('display','inline-block');
        } else {
            $('#company_span').css('display','none');
        }
    });

    $('input[name=isSendTax]').on('click', function() {
        var val = $(this).val();
        if (!parseInt(val)) {
            $('.invoice_content').show();
        } else {
            $('.invoice_content').hide();
        }
    });

    $('body').on('click', '.submitInvoice', function() {
        var isSendTax = $('input[name=isSendTax]:checked').val();
        var invoiceTitle = $('input[name=chktitle]:checked').val();
        var invoiceType = $('input[name=chkcontent]:checked').val();
        var companyName = $.trim($('input[name=comPanyName]').val());
        var taxCode = $.trim($('input[name=taxCode]').val());
        if ('0' == isSendTax && '21' == invoiceTitle) {
            companyName = checkCompany(companyName);
            if(!companyName){
                dialog({ title: '系统提示', content: '公司名称不能为空' });
                return false;
            }
            if (companyName.length > 40 ) {
                dialog({ title: '系统提示', content: '公司名称填写有误' });
                return false;
            }
            if('北京新文时代金币文化传播有限公司' == companyName){
                dialog({ title: '系统提示', content: '发票抬头不能为此公司' });
                return false;
            }
            if(!taxCode){
                dialog({ title: '系统提示', content: '纳税人识别号不能为空' });
                return false;
            }
             var pattern = /^[0-9a-zA-Z]+$/;
            if (taxCode) {
                if (!pattern.exec(taxCode)) {
                    dialog({ title: '系统提示', content: '请按实际纳税人识别号输入' });
                    return false;
                }
            }
            if (taxCode && taxCode.length != 15 && taxCode.length != 18) {
                dialog({ title: '系统提示', content: '纳税人识别号长度只能是15位或18位' });
                return false;
            }
           
        }
        $.ajax({
            url: '/front/member/order/saveUpdateInvoice',
            type: 'get',
            dataType: 'json',
            data: {
                invoiceType: invoiceType,
                invoiceTitle: invoiceTitle,
                companyName: companyName,
                taxCode: taxCode,
                isSendTax: isSendTax,
                orderId: orderId
            },
            success: function(res) {
                if ('99' == res.code) {
                    window.location.href = 'https://passportdev.ecgci.com/login.html';
                } else if ('00' == res.code) {
                    dialog({ title: '系统提示', content: '修改成功' });
                    $('.invoice_layer').hide();
                } else {
                    dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        });
    });

    function checkCompany(companyName) {
        var pattern = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*;|{}【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < companyName.length; i++) {
            rs = rs + companyName.substr(i, 1).replace(pattern, '').replace(/\\/,"");
        }
        return rs;
    }
});

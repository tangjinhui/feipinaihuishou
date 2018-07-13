require(['jquery', 'form-valid', 'handlebars', 'dialog', 'header'], function($, valid, Handlebars, dialog) {

    Handlebars.registerHelper('showList', function(list) {
        var lines =  Math.ceil(list.length/10);
        var trs = '';
        for(var i=0; i<lines; i++){
            var items = '';
            for(var j=i*10; j<(i*10+10); j++){
                if(list[j]){
                    items += '<td>' + list[j] + '</td>';
                }
            }
            trs += '<tr>' + items + '</tr>';
        }
        return trs;
    });

    var flag = {
        goldValueFlag : false,
        silverValueFlag : false,
        reserveIdNoFlag : false,
        luckyNumberFlag : false
    };

    valid.settings = {
        initTip: function(input, defaultTip) {

        },
        validTip: function(input, errorInfo, defaultTip) {
            if (errorInfo) {
                $(input).next('.errorTip').html(errorInfo).show();
                $(input).parent().find('.font').html('');
                $(input).parent().find('.sucTip').hide('');
            }
        }
    };
    valid.render({
        '#goldValue': {
            type: 'number',
            option: 'blur',
            requiredTip: '该选项必填',
            errorTip: '无效的数值',
            success: function(input) {
                $(input).next('.errorTip').html('').hide();
                $(input).parent().find('.font').html('');
                $(input).parent().find('.sucTip').show();
                flag.goldValueFlag = true;
            },
            failed: function(input) {
                flag.goldValueFlag = false;
            }
        },
        '#silverValue': {
            type: 'number',
            option: 'blur',
            requiredTip: '该选项必填',
            errorTip: '无效的数值',
            success: function(input) {
                $(input).next('.errorTip').html('').hide();
                $(input).parent().find('.font').html('');
                $(input).parent().find('.sucTip').show();
                flag.silverValueFlag = true;
            },
            failed: function(input) {
                flag.silverValueFlag = false;
            }
        },
        '#reserveIdNo': {
            type: 'integer',
            option: 'blur',
            requiredTip: '该选项必填',
            errorTip: '无效的整数',
            success: function(input) {
                $(input).next('.errorTip').html('').hide();
                $(input).parent().find('.font').html('');
                $(input).parent().find('.sucTip').show();
                flag.reserveIdNoFlag = true;
            },
            failed: function(input) {
                flag.reserveIdNoFlag = false;
            }
        },
        '#luckyNumber': {
            type: 'integer',
            option: 'blur',
            requiredTip: '该选项必填',
            errorTip: '无效的整数',
            success: function(input) {
                $(input).next('.errorTip').html('').hide();
                $(input).parent().find('.font').html('');
                $(input).parent().find('.sucTip').show();
                flag.luckyNumberFlag = true;
            },
            failed: function(input) {
                flag.luckyNumberFlag = false;
            }
        }
    }, {
        required: true
    });

    $('#reckonNumber').click(function() {       
        var goldValue = $.trim($("#goldValue").val());
        var silverValue = $.trim($("#silverValue").val());
        var totalPerson = parseInt($.trim($("#reserveIdNo").val()));
        var luckyNumber = parseInt($.trim($("#luckyNumber").val()));

        if (luckyNumber > totalPerson) {
            dialog({ content: '中签人数不能大于参与人数！' });
            return;
        }
        
        if(!flag.goldValueFlag || !flag.silverValueFlag || !flag.reserveIdNoFlag || !flag.luckyNumberFlag){
            for(item in flag){
                if(!flag[item]){
                    $('#'+item.split('Flag')[0]).trigger('blur');
                }
            }
            return ;
        }else{
            getResult(goldValue,silverValue,totalPerson,luckyNumber);
        }

    });

    function getResult(goldVal,silverVal,total,luckyNum){
        $.ajax({
            url: '/front/reserve/reserveResultCalculate',
            type: 'get',
            dataType: 'json',
            data: { 
                goldValue: goldVal, 
                silverValue: silverVal, 
                totalPerson: total, 
                luckyNumber: luckyNum
            },
            success: function(res) {
                if (res && res.code == '00') {
                    var reserveNumbersTemplate = Handlebars.compile($('#reserveNumbers-template').html());
                    $('#reserveNumbers').html(reserveNumbersTemplate(res.data));
                } else {
                    dialog({ content: '网络繁忙，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ content: '网络繁忙，请您稍后重试' });
            }
        });
    }

});

require(['jquery', 'avalon', 'getCookie', 'dialog', 'mini_login', 'header'], function($, avalon, getCookie, dialog, mini_login){

	var id = $('#auctionId').val();
    if(!id) return;

    var recordPage = [], pageCount = 10, timmer = null, relativeRow = 1, flag = true, is_deposit = 0;

    //渲染出价记录
    var recordAva = avalon.define({
        $id: 'recordAva',
        items: [],
        yRecStatus: true,
        nRecStatus: true,
        recordText: '等待出价',
        firstText: '',
        otherText: ''
    });

    //Tab标签切换
    $('#jsTab').on('click', 'div', function(){

        if($(this).hasClass('act')) return;

        recordAva.items.length = 0; //重置出价记录数据

        var scroll = $('#jsTab').offset().top - 10,
            _this = this,
            _tab = $(this).attr('data-tab');

        $(this).addClass('act').siblings().removeClass('act');  
        //切换内容区域
        $('#jsContent').find('.'+_tab).removeClass('dn').siblings().addClass('dn');  

        $('body,html').stop().animate({
            scrollTop: scroll
        }, 300, function(){

        });

        if(_tab != 'record') return;

        recordPage.length = 0;

        recordAva.items.length = 0;

        relativeRow = parseInt(detailVav.auction_counts) ? detailVav.auction_counts : relativeRow;

        getRecordData(1, function(){
            $(window).trigger('scroll');
        });

    });

        //获取出价记录
    function getRecordData(page, fn){

        if($.inArray(page, recordPage) >= 0) return;

        recordPage.push(page);

        $.ajax({
            url: '/api/auction/recordList?_t='+new Date().getTime(),
            type: 'get',
            dataType: 'json',
            data: {
                auctionId: id,
                pageNo: page,
                relativeRow: relativeRow
            },
            success: function(res){
                if(res.code != '00000') return;

                if(page == 1){
                    recordAva.yRecStatus = !!res.data.length;
                    recordAva.nRecStatus = !res.data.length;
                }
                for(var i = 0; i < res.data.length; i++){
                    recordAva.items.push(res.data[i]);
                }
                typeof fn == 'function' && fn();

            }
        });
    }

    //下拉滚动加载出价记录更多
    $(window).scroll(function(){

        var $panel = $('.show_big_panel'), $line = $('.show_big_panel .line');

        if($panel.is(':hidden') || !$line.length) return false;

        var winHei = $(window).height(),
            scrollTop = $(window).scrollTop(), 
            docHei = $(document).height(),
            panHei = $panel.height() + $panel.offset().top,
            wsHei = winHei + scrollTop;
       
        if(parseInt(panHei) < parseInt(wsHei)){
            var len = $line.length;
            var page = parseInt(len / pageCount) + 1;

            getRecordData(page);
        }

    });

    //竞拍内容渲染初始化JSON
    var detailVav = avalon.define({
        $id: 'jsDetail',
        record: [],
        endTime: '' ,
        beginTime: '' ,
        yRecStatus: true,
        nRecStatus: true,
        recordLenStatus: true,
        auction_price: 0,
        thou_auction_price: 0,
        auction_counts: 0,
        lowest_increase: 0,
        maxi_increase: 0,
        user_type: 2,
        alive: 2,
        status: 0,
        auctionLucky: 3,
        recordText: '等待出价',
        firstText: '',
        otherText: '',
        is_deposit: 0    
    });

    depositPrice = parseInt(cashDeposit);

    if(depositPrice > 0){
        $.ajax({
            url: '/api/auction/isPayDeposit',
            type: 'get',
            dataType: 'json',
            async: false,
            data: {
                auctionId: id,
                ticket: getCookie('token'),
                _t: new Date().getTime()
            },
            success: function(res){
                if(res.code != '00000'){
                    is_deposit = 1
                }
            }
        });
    }

    getDetail();

    //请求竞拍详情
    function getDetail(){
        $.ajax({
            url: '/api/auction/detail?_t='+new Date().getTime(),
            type: 'get',
            dataType: 'json',
            data: {
                auctionId: id,
                ticket: getCookie('token')
            },
            success: function(res){
                if(res.code != '00000') return;
                //重新渲染出价json对象
                detailVav.alive = res.data.detail.alive;
                detailVav.auction_counts = res.data.detail.auction_counts;
                detailVav.lowest_increase = res.data.detail.lowest_increase;
                detailVav.maxi_increase = res.data.detail.maxi_increase;
                detailVav.status = res.data.detail.status;
                detailVav.user_type = res.data.detail.user_type;
                detailVav.auction_price = res.data.detail.auction_price;
                detailVav.thou_auction_price = $._comdify(res.data.detail.auction_price + ""); //转千分位
                detailVav.is_deposit = is_deposit;

                if(!parseInt(detailVav.alive)){
                     if(!$('#layer').length){
                        $('#yes_start, #no_start, .go_pay, #deposit').append('<div id="layer"></div>');
                        $('#deposit').css('background', '#666').addClass('disabled');
                     }
                }else{
                    $('#layer').remove();
                    $('#deposit').css('background', '#e54243').removeClass('disabled');
                }
                
                if(flag && parseInt(detailVav.status) == 1){
                    $('#in_auction_price').val(detailVav.auction_price);
                    flag = !flag;
                }

                var recLen = !!res.data.record.length;
                //右侧实时出价记录数据状态判断
                if(recLen){
                    detailVav.yRecStatus = false;
                    detailVav.nRecStatus = true;
                    if(res.data.record.length > 8){
                        detailVav.recordLenStatus = false;
                    }
                }else{
                    detailVav.yRecStatus = true;
                    detailVav.nRecStatus = false;
                }

                detailVav.record = res.data.record;
                //判断当前竞拍状态
                if(parseInt(detailVav.status) == 0){
                    detailVav.beginTime = $.formatTimerShow(res.data.detail.rangeTime, 'start');
                    recordAva.firstText = detailVav.firstText = "领先";
                    recordAva.otherText = detailVav.otherText = "落后";
                    startTimeout()

                }else if(parseInt(detailVav.status) == 1){
                    detailVav.beginTime = $.formatTimerShow(res.data.detail.rangeTime, 'end');
                    recordAva.firstText = detailVav.firstText = "领先";
                    recordAva.otherText = detailVav.otherText = "落后";
                    startTimeout()

                }else if(parseInt(detailVav.status) == 4){
                    detailVav.endTime = $._formatDate(res.data.detail.end_time);
                    recordAva.firstText = detailVav.firstText = "获拍";
                    recordAva.otherText = detailVav.otherText = "出局";
                    startTimeout()
                    
                }else{
                    clearTimeout(timmer);
                    detailVav.endTime = $._formatDate(res.data.detail.end_time);
                    recordAva.firstText = detailVav.firstText = "获拍";
                    recordAva.otherText = detailVav.otherText = "出局";
                    if(!detailVav.record.length){
                        detailVav.recordText = '无出价记录';
                        recordAva.recordText = '无出价记录';
                    }
                }
                $('body').removeClass('dn');
            }
        });
    }
    //每一秒钟请求一次竞拍数据
    function startTimeout(){
        timmer = setTimeout(function(){
            getDetail();
        }, 1000);

    }

    $(window).on('focus blur', function(){
        clearTimeout(timmer);
        startTimeout();
    });

    //点击查看更多
    $('body').on('click','#jsLinkMore', function(){
        var scroll = $('#jsTab').offset().top - 10;
        $('body,html').stop().animate({
            scrollTop: scroll
        }, 300);
        $('#jsTab > [data-tab=record]').removeClass('act').trigger('click');
    });

    /*$('body').on('click', '#no_start .add, #no_start .reduce, #no_start .show_btn', function(){

        $._alert('活动未开始');

    });*/

    $('body').on('click', '#jsPicBox .list_item', function(){
        if($(this).hasClass('act')) return;

        $(this).addClass('act').siblings().removeClass('act');

        var _src = $(this).find('img').attr('src');
        $('#jsBigger').attr('src', _src);

    });
    //初始化第一张竞拍图片
    $('#jsPicBox .list_item:first').trigger('click');
    //出价加减功能实现
    $('body').on('click', '#yes_start .math>div', function(){

        var _class = $(this).attr('class'),
            auctionPrice = parseInt(detailVav.auction_price),
            auctionLow = parseInt(detailVav.lowest_increase);

        if(auctionPrice >= 0){
            var val = _class == 'add' ? auctionPrice + auctionLow : auctionPrice - auctionLow;
            if(val >= 0){
                $('#in_auction_price').val(val);
            }
        }

    });
    //开始出价，提交出价价格
    $('body').on('click', '#yes_start .show_btn', function(){
        var auctionPrice = parseInt(detailVav.auction_price),
            auctionMax = parseInt(detailVav.maxi_increase),
            auctionLow = parseInt(detailVav.lowest_increase),
            userPrice = parseInt($('#in_auction_price').val()),
            ticket = getCookie('token'); 
            
        if(!ticket){
            alertConfig['10000']();
            return;
        }   

        //用户所出价格是不是当前最高价
        if(userPrice < auctionPrice){
            alertConfig['10002']();
            return;
        }

        //所出价格小于当前最高价+最低加价
        if(userPrice < auctionPrice + auctionLow){
            alertConfig['20004']();
            return;
        }

        //所出价格是不是超过了当前最高价+最高加价
        if(userPrice > auctionPrice + auctionMax){
            alertConfig['10005']();
            return; 
        }
        var _this = this;
        if($(this).hasClass('disable')){
            return false;
        }
        $(this).addClass('disable');
        $.ajax({
            url: '/api/auction/offerPrice?_t='+new Date().getTime(),
            type: 'post',
            dataType: 'json',
            contentType:"application/x-www-form-urlencoded; charset=utf-8",
            data: {
                auctionId: id,
                ticket: getCookie('token'),
                price: userPrice
            },
            success: function(res){
                $(_this).removeClass('disable');
                res.code && alertConfig[res.code]();
            }
        });

    });
    //出价提示
    var alertConfig = {
        '10000': function(){
            mini_login.show();
        },
        '10001': function(){
            var val = $('#aucTitle').text();
            $._alert('您参加的活动：'+val+'，只允许实名会员参与。快点击"确认"进行实名认证申请吧。', function(){
                window.location = 'http://pfdev.ecgci.com/member/security.html';
            });
        },
        '10002': function(){
            $('#in_auction_price').val(detailVav.auction_price);
            $._alert('您所出价格已经落后当前价，请重新出价');
        },
        '10003': function(){
            alertConfig['10000']();
        },
        '10004': function(){
            $._alert('活动不存在');
        },
        '10005': function(){
            $('#in_auction_price').val(detailVav.auction_price);
            $._alert('您的出价过高，请合理加价');
        },
        '10007': function(){
            $._alert('本次竞价限交易会员参与，您还不是交易会员，请按系统引导流程完成交易会员认证', function(){
                window.location = 'http://pfdev.ecgci.com/member/index.html';
            });
        },
        '20001': function(){
            $._alert('活动未开始');
        },
        '20002': function(){
            $._alert('活动已结束');
        },
        '20003': function(){
            $._alert('活动未启用');
        },
        '20004': function(){
            $('#in_auction_price').val(detailVav.auction_price);
            $._alert('您的加价幅度不够最小加价，请重新加价');
        },
        '20005': function(){
            $._alert('出价成功');
        },
        '20006': function(){
            $('#in_auction_price').val(detailVav.auction_price);
            $._alert('您上次出价已经领先了，不用再出价了');
        },
        '20007': function(){
            $._alert('出价失败，请重试');
        },
        '10006': function(){
            $._alert('请先交纳保证金，才能参与竞价！', function(){
                window.location.reload();
            });
        }
    }

    $('body').on('blur', '#in_auction_price', function(){
        var num = $('#in_auction_price').val();

        if(!/^[0-9]*[0-9][0-9]*$/.test(num)){
            $('#in_auction_price').val(detailVav.auction_price);
            $._alert('请输入有效数字!');
        }

        return false;
    });

    $('body').on('click', '.to_order', function(){

        window.location = "http://pfdev.ecgci.com/member/order.html";
    });

    $('body').on('click', '#deposit',function(){
            if($(this).hasClass('disabled')) return;
            $(this).addClass('disabled');
            var _this = this;              
            if(!$('#user_is_login').length){
                mini_login.show();
                $(_this).removeClass('disabled');
            }else{
                $('#reserve_loading').show();
                $.ajax({
                    url: 'http://account.ecgci.com/auction/checkPreDeposit',
                    type: 'get',
                    dataType: 'jsonp',
                    data: {
                        'sourceId': $.base64.btoa(id)
                    },
                    success: function(r){
                        $('#reserve_loading').hide();
                        if(r.code == '00001'){
                            var is_real = parseInt(r.is_real);
                            var txt = '本活动需实名会员才能参与，您还不是实名会员，点击确认去进行实名认证';
                            if(is_real == 3){
                                txt = '本次竞价限交易会员参与，您还不是交易会员，请按系统引导流程完成交易会员认证';
                            }
                            $._alert(txt, function(){
                                window.location = 'http://pfdev.ecgci.com/member/security.html';
                            });
                        }else if(r.code == '00002'){
                            $('#go_give_money').find('.reserveMoney').text('￥'+r.reserveMoney);
                            $('#go_give_money').show();
                            $('.dep_class').show();
                        }else if(r.code == '00003'){
                            $('#go_recharge').find('.reserveMoney').text('￥'+r.reserveMoney);
                            $('#go_recharge').find('.userMoney').text('￥'+r.userMoney);
                            $('#go_recharge').show();
                            $('.dep_class').show();
                        }else if(r.code == '00000'){
                            $('#go_open_account').find('.reserveMoney').text('￥'+r.reserveMoney);
                            $('#go_open_account').find('.userMoney').text('￥'+r.userMoney);
                            $('#go_open_account').show();
                            $('.dep_class').show();
                        }else if(r.code == '00005'){
                            $._alert('此活动已结束，请关注其它正在进行的活动', function(){
                                window.location.reload();
                            });
                        }else if(r.code == '00006'){
                            mini_login.show();
                        }
                        $(_this).removeClass('disabled');
                    },
                    error: function(){
                        $('#reserve_loading').hide();
                        $(_this).removeClass('disabled');
                        alert('系统异常请重试')
                    }
                });
            }
        });

        $('.depClose').on('click', function(){
            $('#go_open_account, #go_recharge, #go_give_money, .dep_class').hide();
        });

        $('.win_open').on('click', function(){
            var _href = $(this).attr('href');
            $('.depClose').trigger('click');
            window.open(_href);
            return false;
        });

        $('.sub_form').on('click', function(){
            if($(this).hasClass('disabled')) return false;
            $(this).addClass('disabled');
            if(!$('#go_open_account input[type=checkbox]').is(':checked')){
                alert('您必须同意中国金币网上商城保证金签约协议后，才能交纳保证金');
                $(this).removeClass('disabled');
                return false;
            }
            var r = confirm('商城将从您的交易账户中冻结相应金额作为竞价报名的保证金，请您仔细阅读保证金签约协议，如果您确认交纳保证金表明您已同意该协议。');
            if(!r){
                $(this).removeClass('disabled');
                return false;
            }
            var _this = this;
            $.ajax({
                url: 'http://account.ecgci.com/auction/lockPreDeposit',
                type: 'get',
                data:{
                    sourceId: $.base64.btoa(id),
                    sourceType: 'auction'
                },
                dataType: 'jsonp',
                success: function(result){
                    $(_this).removeClass('disabled');
                    $('.depClose').trigger('click');
                    if(result.code == '00000'){
                        $._alert('保证金交纳成功，您可以报名本次竞价活动了。', function(){
                            window.location.reload();
                        });
                    }else if(result.code == '00002'){
                        $._alert('正在交纳保证金...');
                    }else if(result.code == '00003'){
                        $._alert('您已交纳过保证金', function(){
                            window.location.reload();
                        });
                    }else if(result.code == '00004'){
                        $._alert('您已经交纳过一次保证金正在等待系统确认，请稍后刷新竞价详情页面，参与出价或再次交纳。');
                    }else if(r.code == '00005'){
                        $._alert('此活动已结束，请关注其它正在进行的活动', function(){
                            window.location.reload();
                        });
                    }else if(r.code == '00006'){
                        mini_login.show();
                    }else{
                        $._alert('保证金扣除失败，请重试');
                    }
                },
                error: function(){
                    $(this).removeClass('disabled');
                    alert('系统异常请重试');
                }
            });
            return false;
        });

        function createInput(value, name) {
            var input = document.createElement('input');
            input.type = "text";
            input.name = name;
            input.value = value;
            return input;
        }

        $('#jsSmsLink').on('click', function(){
            if($(this).hasClass('smsIsNot')) return;
            if($(this).hasClass('isClick')) return;
            $(this).addClass('isClick');
            var _this = this;
            $.ajax({
                url: 'http://public.ecgci.com/new/reserve/smsSend',
                type: 'get',
                dataType: 'jsonp',
                success: function(res){
                    $(_this).removeClass('isClick');
                    if(res.code == '000000'){
                        $(_this).addClass('smsIsNot');
                        $('#jsCodetext').focus();
                        $('#mobile_local').text('验证码已发到您尾号'+res.mobileCode+'的手机上').removeClass('dn');
                        $('#jsSmsLink').html('<i id="min_setInter">120</i>秒后重新发送');
                        smsTime();
                    }else if(res.code == '000001'){
                        alert('您已在两分钟内申请过短信验证码了，请稍后再试')
                    }else{
                        alert('验证码发送失败，请重试')
                    }
                },
                error: function(){
                    alert('验证码发送失败，请重试');
                    $(_this).removeClass('isClick');
                }
            })
        });

        function smsTime(){
            var i = 120;
            var timer = setInterval(function(){
                $('#min_setInter').text(i--);
                $('#mobile_local').removeClass('dn');
                if(i == 0){
                    $('#jsSmsLink').removeClass('smsIsNot').text('发送短信验证码');
                    $('#mobile_local').addClass('dn');
                    clearInterval(timer);
                }
            }, 1000);
        }


    $.extend({

        _formatDate: function(ms, flag){

            ms = parseInt(ms);

            var _d = new Date(ms);

            var year = _d.getFullYear(), month = $.setTwoDigits(_d.getMonth() + 1), day = $.setTwoDigits(_d.getDate()), hour = $.setTwoDigits(_d.getHours()),
                minutes = $.setTwoDigits(_d.getMinutes()),
                seconds = $.setTwoDigits(_d.getSeconds()),
                formatDate = '结束于: <span style="display: inline-block;" class="r">'+year+' <b>-</b> '+ month+' <b>-</b> '+day+'&nbsp;&nbsp;&nbsp;&nbsp;<span class="f16">'+hour+'<b> : </b>'+minutes+'<b> : </b>'+seconds+'</span></span>';

            return formatDate;
            
        },

        setTwoDigits: function(a) {
            return String(a).length < 2 && (a = "0" + a), a
        },

        parseTwo: function(a){
            return $.setTwoDigits(parseInt(a));
        },

        formatTimerShow: function(secondcount,flag) {
            var second = 60,
                hourSecond = 60 * 60,
                daySecond = 60 * 60 * 24,
                millisecond = secondcount,
                secondcount = parseInt(secondcount/1000),

                flag = flag || 'end',
                text = {
                    "start" : '开始',
                    "end" : '结束'
                },
                result = {} ;
            flag == "start" ? leaveStart = millisecond : leaveEnd= millisecond;
            result.secondcount = secondcount;
            result.day = $.parseTwo(secondcount / (daySecond));
            result.hour = $.parseTwo((secondcount % (daySecond)) / (hourSecond));
            result.minute = $.parseTwo((secondcount % (hourSecond)) / (second));
            result.second = $.parseTwo((secondcount % second) / (1));
            result.millisecond = $.parseTwo((millisecond%1000)/10);
            var str = '距离竞价'+ text[flag] +': <span class="r"><span class="f16"><strong>'+ result.day +'</strong> <b>天</b> <strong>'+ result.hour +'</strong> <b>小时</b> <strong>'+ result.minute +'</strong> <b>分</b> <strong>'+ result.second +'</strong> <b>秒</b> <strong class="bg"></strong></span></span>';
            return str;

        },

        _alert: function(txt, callback){

            dialog({content: txt, callback: callback})

        },

        _comdify: function(n){

            var re=/\d{1,3}(?=(\d{3})+$)/g;
            var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});

            return n1;

        }

    });    
	
    avalon.scan(document.body);

});
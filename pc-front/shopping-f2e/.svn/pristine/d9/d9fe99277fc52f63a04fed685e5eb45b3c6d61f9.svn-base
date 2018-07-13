require(['jquery', 'handlebars', 'timer', 'header', 'lazyLoad'], function($, Handlebars){

    var mainObj = {
        setHistoryEle: function(){
            var $listItem = $('#jsHistory .item');
            var listLength = $listItem.length;
            $listItem.removeClass('bor');

            $listItem.each(function(index, el){
                var i = index+1;
                if(!(i%3) || !(i%listLength)) $(el).addClass('bor');
            });
            $('#jsHistory .crumbs')[listLength>0?'removeClass':'addClass']('dn');
        },
        init: function(){
            this.load(auctionIds);
        },
        load: function(id){
            var $listItem = $('#jsHistory .item');
            var listLength = $listItem.length;
            $listItem.each(function(index, el){
                var i = index+1;
                if(!(i%3) || !(i%listLength)) $(el).addClass('bor');
            });
            
            var params = {auctionIds: id, t: new Date().getTime()}
            var _this = this;
            if(id.length<1){
                _this.setHistoryEle();
                // 触发懒加载
                $("[data-original]").lazyload({
                    effect : "fadeIn",
                    load : function(){
                        $(this).removeClass('img_loading');
                    },
                    threshold : 200
                });
                return false;
            }
            $.get('/api/auction/list' ,params, true)
                .done(function(data, status, xhr){
                    if(data.code == '00000'){
                        var res = data.data;
                        for(var i in res){
                            if(res[i].auction_counts>0){
                                res[i].isDeal = true;
                            }
                        }
                        var willArr = [];
                        var ingArr = [];
                        var hisArr = [];
                        var this_time = Date.parse(xhr.getResponseHeader('Date'));
                        for(var i in res){
                            if(res[i].start_time>this_time){
                                // 即将开始数据
                                willArr.push(res[i]);
                            }else if(res[i].end_time>this_time){
                                // 正在进行数据
                                ingArr.push(res[i]);
                            }else{
                                // 历史数据
                                hisArr.push(res[i]);
                            }
                        }

                        willArr = willArr.sort(function(a,b){
                            return a.start_time - b.start_time;
                        });

                        ingArr = ingArr.sort(function(a,b){
                            return a.end_time - b.end_time;
                        });

                        hisArr = hisArr.sort(function(a,b){
                            return b.end_time - a.end_time;
                        });

                        // 千分位
                        Handlebars.registerHelper('formatnumber', function(num, options){
                            num = num + '';
                            return num.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g,',$1');
                        });
                        Handlebars.registerHelper('imgServer', function(server, options){
                            return imgServer+"/"+server;
                        });
                        var willHtml = _this.loadDocument('#willTempalte', willArr);
                        var ingHtml = _this.loadDocument('#ingTempalte', ingArr);
                        var hisHtml = _this.loadDocument('#hisTempalte', hisArr);


                        $('.active_list').html(ingHtml);
                        $('.will_start .box').html(willHtml);
                        $('.history').prepend(hisHtml);

                        /*设置边框样式*/
                        _this.bingTimer(this_time);
                        _this.showTitle(ingArr,willArr);

                    }else{
                        promptNew('网络异常');
                    }
                    _this.setHistoryEle();
                    // 触发懒加载
                    $("[data-original]").lazyload({
                        effect : "fadeIn",
                        load : function(){
                            $(this).removeClass('img_loading');
                        },
                        threshold : 200
                    });

                })
                .fail(function(data){
                    _this.setHistoryEle();
                    // 触发懒加载
                    $("[data-original]").lazyload({
                        effect : "fadeIn",
                        load : function(){
                            $(this).removeClass('img_loading');
                        },
                        threshold : 200
                    });
                })
        },
        arraySort: function(arr,fn){
            return arr.sort(fn);
        },
        loadDocument: function(id, data){
            var myTemplate = Handlebars.compile($(id).html())
            return myTemplate(data);
        },
        // 绑定倒计时
        bingTimer: function(this_time){

            var time = this_time;
            $('body').find('[data-timer]').each(function(index, el){
                var $this = $(this);
                var data = eval('('+$this.data('timer')+')');
                var start = data.start-time;
                start = start==0?-1:start;
                var end = data.end-time;
                end = end==0?-1:end;
                // 判断是 true正在进行还是 false即将开始的
                var isFlag = $(this).closest('#jsActive').length;
                $this.timer({
                        timeData: {
                            start: start,
                            end: end
                        },
                        timeStart: function (obj,$theObj,leaveEnd) {
                            if (leaveEnd < 1) {
                                location.reload();
                            }
                        },
                        timeEnd: function (obj,$theObj,leaveEnd) {
                            if (leaveEnd < 1) {
                                location.reload();
                            }
                        },
                        tpl: function(d,h,m,s,mm,parseTwo){
                            var hh = parseTwo(parseInt(h)+parseInt(d*24));
                            return isFlag? '<span class="fl bg">'+hh+'</span>'+
                            '<span class="fl">小时</span>'+
                            '<span class="fl bg">'+m+'</span>'+
                            '<span class="fl">分</span>'+
                            '<span class="fl bg">'+s+'</span>'+
                            '<span class="fl">秒</span>'+
                            '<span class="fl bg mm"></span>'
                            : d+'天'+h+'小时'+m+'分'+s+'秒';
                        }
                   });
            });

        },
        formatPrice: function(num){
            return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        },
        returnTime: function(){
            var t;
            $.ajax({
                type:'HEAD',
                async: false,
                success: function(data, status, xhr){
                    t = Date.parse(xhr.getResponseHeader('Date'));
                }
            });
            t = t || new Date();
            return t;
        },
        showTitle: function(arr1,arr2){
            $('#jsActive .crumbs').removeClass(arr1.length?'dn':'');
            $('#jsWill .crumbs').removeClass(arr2.length?'dn':'');
            $('#jsHistory .crumbs').removeClass($('#jsHistory .item').length>0?'dn':'');
        }

    }

    mainObj.init();

	// 显示隐藏
	$('#jsWill').on('mouseenter', '.item', function(e){
		e.stopPropagation();
		$(this).find('.dialog').removeClass('dn');
        var $box = $(this).find('.padding');
        var h = $box.outerHeight(true);
        var _h = h/2;
        var _w = $box.outerWidth(true)/2;
        $(this).find('.small_black').css({
            'height': h,
            'margin-left': -_w,
            'margin-top': -_h
        });

	});

	$('#jsWill').on('mouseleave', '.item', function(e){
		e.stopPropagation();
		$(this).find('.dialog').addClass('dn');
	});

	
});
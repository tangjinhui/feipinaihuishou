require(['jquery', 'handlebars' , 'setCookie', 'getCookie', 'mini_login', 'dialog', 'base64', 'jqzoom', 'jdMarquee', 'header'], function ($, Handlebars, setCookie, getCookie, mini_login, dialog, base64){

	var id = $('#detailId').val();
	$('input[name=keyval]').val('');
	var goodsNum = 0;

	if(!id) return false;

	$(".jqzoom").jqueryzoom({
		xzoom:400,
		yzoom:400,
		offset:10,
		position:"right",
		preload:1,
		lens:1
	});

	// 小图多图轮播
	$("#spec-list").jdMarquee({
		deriction:"left",
		width:347,
		height:100,
		step:1,
		speed:4,
		delay:10,
		control:true,
		_front:"#spec-right",
		_back:"#spec-left",
		convert:1	
	});

	// 小图切换
	$("#spec-list img").on({
		'mouseover': function(){
			var src=$(this).attr("src");
			$("#spec-n1 img").eq(0).attr({
				src:src.replace("\/n5\/","\/n1\/"),
				jqimg:src.replace("\/n5\/","\/n0\/")
			});
			$(this).css({
				"border":"1px solid #cd4e3d",
				"padding":"0px"
			}).addClass("cha_cate");
		},
		'mouseout': function(){
			$(this).css({
				"border":"1px solid #ccc"
			});
		}
	});



	// 锚点滚动
	$('.menu4 .scrollSource').on('click', function(){
		var $this = $(this);
		$this.addClass('active').siblings('li').removeClass('active');
		var index = $this.index();
		var targetTop = $('#spjsss .jianttr').eq(index).offset().top;
		$('html,body').stop().animate({
			scrollTop: targetTop
		});
	});

	// 滚动加载移动到顶部
	$(window).on('scroll',setMenu()).trigger('scroll');

	function setMenu(){
		var $menu = $('#jsMenu'),
			menuTop = $menu.offset().top;
		return function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop>menuTop){
				$menu.addClass('fixedMenu');
			}else{
				$menu.removeClass('fixedMenu');
			}
		}
	}

	$('#jsAddCart').on({
		mouseenter: function(event){
			$('#jsCart').removeClass('dn');
		}
	});

	$('#jsCart').on({
		mouseleave: function(event){
			$(this).addClass('dn');
		}
	});

	

	$('#record_assess_list').on('mouseenter', '.js_move_pic', function(){
 		$(this).siblings('.border_red').show();
 	}).on('mouseleave', '.js_move_pic', function(){
 		$(this).siblings('.border_red').hide();
 	});

 	// 表格样式填充
 	var $dom = $('#spsx .tab tr').last();
	var l = $dom.find('td').length;
	if(l!=3){
		for(var i=0; i<3-l; i++){
			$dom.append('<td></td>');
		}
	}

	$.ajax({
		url: '/getDetail?_t='+new Date().getTime(),
		type: 'get',
		data: {
			detail_id: id
		},
		dataType: 'json',
		success: function(res){
			if(res.code == '000001'){
				dialog({content:res.msg});
			}else if(res.code == '000002'){
				Detail.initMsg(res.msg);
				Detail.initScroll();
				Detail.scrollStatus();
			}else if(res.code == '000003'){
				dialog({content:'此商品发货仓库异常，请您选购其他商品！'});
			}
		},
		error: function(){
			dialog({content:'系统异常请重试！'});
		}
	});

	var Detail = {

		initMsg: function(obj){
			if(typeof obj != 'object') return false;
			$('#goodsNameLong').text(obj.goodsName);
			$('#goodsName').text(obj.goodsNameLong);
			var price = '';
			if(Math.ceil(obj.shopPrice) == 0){
				price = '暂无价格';
				obj.alive = 0;
			}else{
				price = '￥'+obj.shopPrice;
			}
			$('#shopPrice').text(price);
			$('#jsCart .p-name').text(obj.goodsName);
			$('#jsCart .p-img').find('img').attr('src', $('#dpic').attr('src'));
			$('#jsCart .p-price').find('span').text(price);
			$('#goodsNumber').val(obj.goodsNumber);
			goodsNum = obj.showNum;
			if(obj.reserveId != "null" && $.trim(obj.reserveId)){
				var nowTime = new Date().getTime();
				var _t = obj.reserveEnd.replace(/-/g, "/");
				var resTime = new Date(Date.parse(_t.replace(/\.0/, ''))).getTime();
				if(nowTime < resTime){
					$('.wrap_reserve').show();
					var href = 'http://ydingdev.ecgci.com/detail/'+obj.reserveId+'.html';
					$('.wrap_reserve a').attr('href', href);
				}
			}
/*			var able = '';
			if(obj.isChangeAble == 1 && obj.isReturnAble == 1){
				able = '可退可换';	
			}else if(obj.isChangeAble == 1 && obj.isReturnAble != 1){
				able = '只换不退';	
			}else if(obj.isChangeAble != 1 && obj.isReturnAble == 1){
				able = '只退不换';	
			}else if(obj.isChangeAble != 1 && obj.isReturnAble != 1){
				able = '不退不换';	
			}
			$('#isReturnAble').text(able);*/
			var storageStr = '';
			if(obj.isStorage == 1){
				storageStr = '库存紧张';
			}else if(obj.isStorage == 2){
				storageStr = '暂无库存，您可以先<a class="concern" href="javascript:void(0);">关注</a>此商品';
			}
			$('#storage').html(storageStr);
			if(obj.alive == 1 && obj.isStorage != 2){
				$('#gwc5 dt').removeClass('no-car');
				$('#gwc').show();
			}else{
				$('#gzConcern').show();
			}
			if(obj.alive != 1){
				$('#isLive').show();
			} 
			setRecetGoods(id, obj.goodsName, $('#dpic').attr('src'), window.location.pathname);
		},

		scrollStatus: function(){
			var	advisoryTop = $('#advisory').offset().top,
				assessallTop = $('#assessall').offset().top,
				recordTop = $('#record').offset().top;
				var winHeight = $(document).scrollTop() + $(window).height();
		    if(winHeight > advisoryTop){
				Detail.createModule({
					id: id,
					module: 'advisory',
					startRow: 0,
					pageSize: 2
				});
		    }
		    if(winHeight > assessallTop){
				Detail.createModule({
					id: id,
					module: 'assessall',
					startRow: 0,
					pageSize: 3
				});
		    }
		    if(winHeight > recordTop){
		    	Detail.createModule({
					id: id,
					module: 'record',
					startRow: 0,
					pageSize: 9
				});
		    }
		},

		initScroll: function(){
		    $(window).scroll( function() { 
			    Detail.scrollStatus();
			}); 
		},

		flagConfig: {
			advisoryFlag: true,
			assessallFlag: true,
			recordFlag: true,
			advisoryPage: 3,
			productadvisoryPage: 3,
			inventoryPage: 3,
			paymentPage: 3,
			afterPage: 3,
			otherissuesPage: 3,
			assessallPage: 4,
			goodPage: 4,
			middlePage: 4,
			badPage: 4,
			imagePage: 4,
			recordPage: 10
		},

		createModule: function(obj){
			var flag = this.flagConfig[obj.module+'Flag'];
			if(!flag) return false;
			this.flagConfig[obj.module+'Flag'] = !flag;
			this.moduleData(obj);
		},

		moduleData: function(obj){
			$('.i_'+obj.module).html('<p style="text-align: center;font-size: 14px;padding: 10px 0;">正在加载...</p>');
			obj['row'] = Detail.flagConfig[obj.module + 'Page'];
			$.ajax({
				url: '/detailModule?_t='+new Date().getTime(),
				type: 'get',
				data: obj,
				dataType: 'json',
				success: function(res){
					if(res.code == '000001' || !res.msg.length){
						$('.i_'+obj.module).html('<p style="text-align: center;font-size: 14px; padding: 10px 0;">暂无更多</p>');
						return false;
					}
					var arr = [];
					for(var i = 0; i < res.msg.length; i++){
						var newArr = JSON.parse(res.msg[i]);
						arr.push(newArr[0]);
					}
					var sizeArr = [];
					var newSize = res.size;
					res.size = Math.ceil(res.size) > 8 ? 8 : Math.ceil(res.size);
					var _pageSize = parseInt(Detail.flagConfig[obj.module+'Page']);
					for(var i = 0; i < res.size; i++){
						sizeArr.push({
							module: obj.module,
							startRow: i * _pageSize,
							pageSize: _pageSize + (i * _pageSize) - 1,
							size: i + 1,
							prevRow: obj.startRow
						});
					}
					var _obj = {
						data: arr,
						sizeArr: sizeArr,
						goodsId: res.goodsId,
						serverUrl: 'http://pfdev.ecgci.com'
					}
					var myTemplate = Handlebars.compile($(".h_"+obj.module).html());
					Handlebars.registerHelper("sizeDis",function(){
			        	if(Math.ceil(newSize) <= 8){
			        		return 'display:none;';
			        	}
			        });
					Handlebars.registerHelper("selected",function(startRow,options){
			        	if(startRow == obj.startRow){
			        		return 'selected';
			        	}
			        });
			        Handlebars.registerHelper("star",function(comment_rank){
			        	return "star sa"+comment_rank;
			        });
			        Handlebars.registerHelper("essenceHan",function(essence){
			        	if(parseInt(essence)){
			        		return "display:none";
			        	}
			        });
			        Handlebars.registerHelper("accountHan",function(account){
			        	var strStart = '';
			        	var ran = parseInt(3+Math.random()*(5-3+1));
			        	for(var i = 0 ; i < ran; i++){
			        		strStart += '*';
			        	}
						var firstChar = account.charAt(0),
							endChar = account.charAt(account.length-1);
						return firstChar + strStart + endChar;
			        });
			        Handlebars.registerHelper("display",function(replyContent){
			        	replyContent = $.trim(replyContent);
			        	if(!replyContent){
			        		return "display:none";
			        	}
			        });
			        Handlebars.registerHelper("img_list", function(image_list, image_num, commentId){
			        	if(!parseInt(image_num)) return;
			        	image_list = image_list ? image_list : '';
			        	image_num = image_num ? image_num : '...';
			        	var arr = image_list.split('|') || [];
			        	if(!arr.length) return;
			        	var td = '';
			        	var len = arr.length > 3 ? 3 : arr.length;
			        	var href = 'http://pfdev.ecgci.com/comment_detail.html?goodsId='+id+'&commentId='+commentId;
			        	for(var i = 0; i < len; i++){
			        		td += '<td><a target="_blank" href="'+href+'"><img src="'+arr[i]+'" width="75px" height="75px"></a></td>';
			        	}
			        	var str = '<div class="comment-show-pic"><table cellspacing="10"><tbody><tr>'+td+'</tr></tbody></table><span> <b style="margin-right:5px;" class="fl">共'+image_num+'张图片</b> <a target="_blank" data-bool="shaidan" class="to_reply listred" href="javascript:void(0);" class="listred"> 查看晒单&gt;</a></span></div>';
			        	return str;
			        });
			        Handlebars.registerHelper("level",function(levelId){
			        	var level = '';
			        	if(levelId == 1){
			        		level = '注册会员';
			        	}else if(levelId == 2){
							level = '铜牌会员';
			        	}else if(levelId == 5){
							level = '银牌会员';
			        	}else if(levelId == 6){
							level = '金牌会员';
			        	}else if(levelId == 7){
							level = '钻石会员';
			        	}
			        	return level;
			        });
			        var len = res.msg.length;
			        Handlebars.registerHelper("hqq",function(__this){
			        	return len--;
			        });
			        Handlebars.registerHelper("parData",function(replyDate){
			        	return replyDate.replace(/\.0/, '');
			        });
			        Handlebars.registerHelper("status",function(handle_status, n){
			        	var _txt = '已成交',
			        		_class = '';
			        	if(handle_status == -5){
			        		_txt = '成交后部分退货';
			        		_class = 'listred';
			        	}else if(handle_status == -6){
			        		_txt = '成交后退货/退订';
			        		_class = 'listred';
			        	}
			        	return n == 1 ? _txt : _class;
			        });
			        Handlebars.registerHelper("dis",function(order_type){
			        	if(order_type != 'onlinePerson'){
			        		return 'display:none';
			        	}
			        });
					$('.i_'+obj.module).html(myTemplate(_obj));
					if(obj.module == 'assessall' || obj.module == 'good' || obj.module == 'middle' || obj.module == 'bad' || obj.module == 'image'){
						_obj.data && Detail.initAgree(_obj.data);
					}
					if(res.size == 1){
						$('.i_'+obj.module).find('.page').hide();
					}
				},
				error: function(){
					$('.i_'+obj.module).html('<p style="text-align: center;font-size: 14px; padding: 10px 0;">暂无更多</p>');
				}
			}); 
		},

		initAgree: function(data){
			var arrId = [];
			for(var i = 0; i < data.length; i++){
				arrId.push(data[i]['commentId']);
			}
			if(!arrId) return false;
			arrId.push('luaIsBug')
			$.ajax({
				url: '/agree?_t='+new Date().getTime(),
				type: 'get',
				data: $.param({
					arrId: arrId
				}, true),
				dataType: 'json',
				success: function(res){
					if(res.code == '000001'){
						var arr = res.msg;
						for(var i = 0; i < arr.length; i++){
							var newArr = arr[i].split('|');
							$('.comm_'+newArr[0]).text(newArr[1]);
						}
					}
				},
				error: function(){
					dialog({content:'系统异常请重试！'});
				}
			});
		}

	}

	$('body').on('click', '.page a',function(){
		var flag = $(this).hasClass('selected');
		if(flag) return false;
		var m = $(this).attr('data-module'),
			s = $(this).attr('data-startRow'),
			p = $(this).attr('data-pageSize');
		$('.menu_'+m).trigger('click');
		Detail.moduleData({
			id: id,
			module: m,
			startRow: s,
			pageSize: p
		});
	});

	$('.com_modu li').on('click', function(){
		var flag = $(this).hasClass('select');
		if(flag) return false;
		$(this).addClass('select').siblings('li').removeClass('select');
		var m = $(this).attr('data-module'),
			s = $(this).attr('data-startRow'),
			p = $(this).attr('data-pageSize');
		Detail.moduleData({
			id: id,
			module: m,
			startRow: s,
			pageSize: p
		});
		return false;
	});

	$('#detailBuy').on('click', function(){
		var num = $('#goodsNumber').val();
		if(!/^[0-9]*[1-9][0-9]*$/.test(num)){
			dialog({content:'请输入有效数字!'});
			return false;
		}
		if($(this).parent().hasClass('no-car')) return false;
		$(this).parent().addClass('no-car');
		var _this = this;
		$.ajax({
			url: '/buy?_t='+new Date().getTime(),
			type: 'post',
			data: {
				id: id,
				num: num
			},
			dataType: 'json',
			success: function(res){
				$(_this).parent().removeClass('no-car');
				if(res.code == '000000' || res.code == '000003'){
					mini_login.show();
				}else if(res.code == '000002'){
					var val = $('#goodsName').text();
					dialog({
						content:'您购买的商品：'+val+'，只允许实名会员购买。快点击"确认"进行实名认证申请吧。',
						callback: function(){
							window.location.href = 'http://pfdev.ecgci.com/member/security.html';
						}
					});
				}else if(res.code == '000009'){
					window.location.href = 'http://orderdev.ecgci.com/order/list?param='+res.msg;
				}else if(res.code == '000008'){
					dialog({
						content:'已购商品中包含实时交易熊猫币，提交订单时请阅读相关购买协议！',
						callback: function(){
							window.location.href = 'http://orderdev.ecgci.com/order/list?param='+res.msg;
						}
					});
				}else{
					dialog({content:res.msg});
				}
			},
			error: function(){
				dialog({content:'系统异常请重试！'});
			}
		});
		return false;
	});

	$('.sel-num a').on('click', function(){
		var flag = $(this).hasClass('btn-add');
		var num = parseInt($('#goodsNumber').val());
		if(flag){
			num = num == 999 ? 999 : num + 1;
		}else{
			num = num == 1 ? 1 : num - 1;
		}
		$('#goodsNumber').val(num);
		return false;
	});

	$('body').on('click', '.concern', function(){
		$.ajax({
			url: '/concern?_t='+new Date().getTime(),
			type: 'post',
			data: {
				id: id
			},
			dataType: 'json',
			success: function(res){
				if(res.code == '000002'){
					mini_login.show();
				}else{
					dialog({content:res.msg});
				}
			},
			error: function(){
				dialog({content:'系统异常请重试！'});
			}
		});
	});

	$('body').on('click', '.to_reply', function(){
		var commentId = $(this).parents('.commentId').attr('data-commentId');
		var href = 'http://pfdev.ecgci.com/comment_detail.html';
		$(this).attr('href', href + '?goodsId='+id+'&commentId='+commentId);
	});

	$('#gwc,#jsAddCart').on('click', function(){
		var isNoCar = $(this).parent().hasClass('no-car');
		if(isNoCar) return false;
		var goodsId = id;
      	var buyNumber = $("#goodsNumber").val();
		if(!/^\d{1,3}$/.test(buyNumber)){
   			dialog({content:"请输入有效数字！"});
   			return false;
     	}
      	if(parseInt(buyNumber) < parseInt(goodsNum)){
      		dialog({content:'此商品单用户最小起购量【'+goodsNum+'】枚/套，请您重新选购，谢谢！'});
      		return false;
      	}
      	var data = {ids: goodsId,buyNumber : buyNumber};
      	addCart(data, this);
	});

	function addCart(obj, _this){
		$(_this).attr('href', 'javascript:void(0);')
		$.ajax({
			url: 'http://pfdev.ecgci.com/front/member/cart/addToCart',
			type: 'get',
			dataType: 'jsonp',
			data: obj,
			success: function(res){
				var content='';
				if('99'==res.code){
					mini_login.show();
					return false;
				}
				if(res.code == '00'){ 
					$('.cart_link')[0].click();
					return false;
				}else if(res.code == '01'){
					content = '商品不存在,添加失败';
				}else if(res.code == '02'){
					content = '商品未上架，不可添加到购物车';
				}else if(res.code == '03'){
					content = '此商品不可加入购物车';
				}else if(res.code == '04'){
					content = '最多可添加50种商品，每个商品最多可购买999个';
				}else if(res.code == '05'){
					content = '库存不足，不可添加到购物车';
				}else{
                    content =  '网络繁忙，请您稍后重试';
                }
				dialog({content: content});
			},
			error:function(){
            	dialog({content: '网络繁忙，请您稍后重试'});
            }
		});	
	}

	$('.likeCart').on('click', function(){
		var goodsId = $(this).attr('data-cartId');
		var data = {ids: goodsId,buyNumber: 1};
      	addCart(data, this);
      	return false;
	});

	$('body').on('click', '.addComm', function(){
		var comId = $(this).find('font').attr('data-commentId');
		var _this = this;
		$.ajax({
			url: '/addAgree?_t='+new Date().getTime(),
			type: 'get',
			data: {
				commId: comId
			},
			dataType: 'json',
			success: function(res){
				if(res.code == '000001'){
					var num = $(_this).find('font').text();
					$(_this).find('font').text(parseInt(num) + 1);
				}else if(res.code == '000002'){
					dialog({content:res.msg});
				}else if(res.code == '000000'){
					mini_login.show();
				}
			},
			error: function(){
				dialog({content:'系统异常请重试！'});
			}
		});
		return false;
	});

	$('.zxall').on('click', function(){
		$.ajax({
			url: '/toAssess?_t='+new Date().getTime(),
			type: 'get',
			dataType: 'json',
			async: false,
			success: function(res){
				if(res.code == '000000'){
					mini_login.show();
				}else{
					$('#esGoodsConsultingFormDiv').show();
				}
			}
		});
		return false;
	});

	$('#esGoodsConsultingForm input[type=button]').on('click', function(){
		var type = $('#esGoodsConsultingForm').find('input[name=test]:checked').val(),
			content = $.trim($('#content').val());
		if(!content){
			dialog({content:'咨询内容不能为空!'});
			return false;
		}
		if($(this).hasClass('no-car-ad')) return false;
		$(this).addClass('no-car-ad');
		var _this = this;
		$.ajax({
			url: '/advice?_t='+new Date().getTime(),
			type: 'post',
			data: {
				id: id,
				type: type,
				content: content
			},
			dataType: 'json',
			success: function(res){
				$(_this).removeClass('no-car-ad');
				if(res.code == '000001'){
					dialog({content:'咨询成功，请耐心等待客服审核！'});
					$('#content').val('').trigger('blur').trigger('keyup');
				}else if(res.code == '000000'){
					mini_login.show();
				}
			},
			error: function(){
				dialog({content:'系统异常请重试！'});
			}
		});
	});

	$('#wantReply').on('click', function(){
		var bool = false;
		$.ajax({
			url: '/toAssess?_t='+new Date().getTime(),
			type: 'get',
			dataType: 'json',
			async: false,
			success: function(res){
				if(res.code == '000000'){
					mini_login.show();
				}else{
					bool = true;
				}
			}
		});
		return bool;
	});

	$('#content').on({
        blur: function(){
            var length = $(this).val().length;
            var endLength = 200-length;
            length==0?$(this).siblings('.error').removeClass('dn'):$(this).siblings('.error').addClass('dn');
            $('#contentTips').html('还可以输入'+endLength+'字').addClass(endLength==0?'listred':'');
            if(endLength<0){
                var str = $(this).val().substring(0,200);
                $(this).val(str).trigger('keyup');
            }else{
                $('#contentTips').html('还可以输入'+endLength+'字').addClass(endLength==0?'listred':'');
            }
        },
        keyup: function(){
            var endLength = 200-$(this).val().length;
            if(endLength<0){
                var str = $(this).val().substring(0,200);
                $(this).val(str).trigger('keyup');
            }else{
                $('#contentTips').html('还可以输入'+endLength+'字').addClass(endLength==0?'listred':'');
            }
        }
    });

    $('#goodsNumber').on('blur', function(){
    	var num = $('#goodsNumber').val();
		if(!/^[0-9]*[1-9][0-9]*$/.test(num)){
			$('#goodsNumber').val(goodsNum);
			dialog({content:'请输入有效数字!'});
		}
		return false;
    });

    function setRecetGoods(id, name, img, url){
    	var recetGoods = getCookie('product_recet') ? base64.decode((getCookie('product_recet'))) : '';
    	if(recetGoods){
    		if(recetGoods.indexOf(id+'^') != -1){
    			setRecetList();
    			return false;
    		}
    		if(recetGoods.split('|').length >= 9){
    			var arr = recetGoods.split('|');
    			arr.shift();
    			recetGoods = arr.join('|');
    		}
    	}
    	recetGoods +=id+'^'+ img+'^'+encodeURIComponent(name)+'^'+url+'|';
    	setCookie('product_recet', base64.encode(recetGoods, true), { expires: 365});
    	setRecetList();
    }

    function setRecetList(){
    	var arr = base64.decode( getCookie('product_recet')).split('|');
    	var htmlstring = '';
    	for(var i = arr.length; i >= 0; i--){
    		if(!arr[i]) continue;
    		var arr2 = arr[i].split('^');
    		if(arr2.length != 4) continue;
    		if(arr2[0] == id) continue;
			htmlstring+='<dl class="dl_11 clearfix">';
			htmlstring+='<dt>';
			htmlstring+='<a href="'+arr2[3]+'"><img title="'+decodeURIComponent(arr2[2])+'" src="'+arr2[1]+'" />'+'</a>';
			htmlstring+='</dt>';
	        htmlstring+='<dd>';
			htmlstring+='<a href="'+arr2[3]+'" target="_blank" title="'+decodeURIComponent(arr2[2])+'">'+decodeURIComponent(arr2[2]);
			htmlstring+='</a>';
			htmlstring+='</dd>';
			htmlstring+='</dl>';
    	}
    	htmlstring+='<p class="clear" />';
	 	$('#recentgoods').html(htmlstring);
    }

    $('#clearRecet').on('click', function(){
    	setCookie('product_recet', '', { expires: -1,path:'/'});
		$('#recentgoods').html('<p class="clear" />');
    });

    //寻宝活动
    var baseUrl = window.location.toString();

    if(/ecgci/.test(baseUrl)){
        baseUrl = 'http://mtest.ecgci.com';
    }else{
        baseUrl = 'http://m.chinagoldcoin.net';
    } 

    var address_url ='http://pfdev.ecgci.com/member/address.html';

    $('#cim_set_addr').attr('href', address_url);

    var token = null;
    var addressId = null;
    var ansVal = null;

    var winHeight = $(window).height() * 3;
    var winWidth = $(document).width();

    var _lw = winWidth - winWidth * 0.9;
    var _rw = winWidth - winWidth * 0.1;

    var _th = winHeight - winHeight * 0.9;
    var _bh = winHeight - winHeight * 0.1;

    var ranWidth = Math.floor(Math.random() * (_rw - _lw) + _lw);
    var ranHeight = Math.floor(Math.random() * (_bh - _th) + _th);

    $.ajax({
        url: baseUrl + '/find/isShow?_t=' + new Date().getTime(),
        type: 'get',
        dataType: 'jsonp',
        data: {
            page_url: window.location.toString()
        },
        success: function(res){
            if(res.status == 10){
                $('#IamGold').css({
                    left: ranWidth,
                    top: ranHeight
                }).show();
                token = res.token;
            }
        }
    });

    $('#IamGold').on('click', function(){
		var ticket = getCookie('ticket');
        if(!ticket || $('#ls_ul1').find('.link_top_login').length){
            mini_login.show();
            return false;
        }
        var _this = this;
        $.ajax({
            url: baseUrl + '/find/isQuestion?_t=' + new Date().getTime(),
            type: 'get',
            dataType: 'jsonp',
            data: {
                page_url: window.location.toString(),
                token: token,
                ticket: ticket
            },
            success: function(res){
                $(_this).hide();
                if(res.status == 10){
                    if(res.questionFlag == 1){
                        $('#wd_img_url').attr('src', res.questionUrl);
                        $('.wendalayer').show();
                    }else{
                        $('.cimelia').show().find('.cimelia_start').show();
                    }
                }else if(res.status == 13){
                    mini_login.show();
                }
            }
        });

    });

     $('#wd_sub_ans').on('click', function(){
        var ticket = getCookie('ticket');
        if(!ticket || $('#ls_ul1').find('.link_top_login').length){
            mini_login.show();
            return false;
        }
        var val = $('#wd_ans').val();
        if(!$.trim(val)){
            $('.wd_error').show().text('请先输入答案');
            return false;
        }
        var _this = this;
        $.ajax({
            url: baseUrl + '/find/checkQuestion?_t=' + new Date().getTime(),
            type: 'get',
            dataType: 'jsonp',
            data: {
                page_url: window.location.toString(),
                token: token,
                ticket: ticket,
                answer: val
            },
            success: function(res){
                /*$(_this).hide();*/
                if(res.status == 10){
                    ansVal = val;
                    $('.wendalayer').hide();
                    $('.cimelia').show().find('.cimelia_start').show();
                }else if(res.status == 13){
                    mini_login.show();
                }else if(res.status == 24){
                    $('#wd_ans').val('');
                    $('.wd_error').show().text('答案错误，请重新回答');
                }else{
                    dialog({content: '手慢了，欢迎您下次参与'});
                    $('.wendalayer').hide();
                }
            }
        });
    });

    $('#close_webda').click(function(){
        $('.wendalayer').hide();
        $('.wd_error').hide().text('');
    });

    $("#wd_ans").keydown(function(e){
        if (e.keyCode==13) {
            $("#wd_sub_ans").trigger("click");
        }
    });

    $('.get_present').on('click', function(){
        var ticket = getTicket();
        if(!ticket || $('#ls_ul1').find('.link_top_login').length){
            mini_login.show();
            return false;
        }
        if($(this).hasClass('isAjax')){
            return false;
        };
        $(this).addClass('isAjax');
        var _this = this;
        $.ajax({
            url: baseUrl + '/find/isExists?_t=' + new Date().getTime(),
            type: 'get',
            dataType: 'jsonp',
            data: {
                page_url: window.location.toString(),
                token: token,
                ticket: ticket
            },
            success: function(res){
                $(_this).removeClass('isAjax');
                var type = 'cimelia_no';
                if(res.status == 10){
                    type = 'cimelia_address';
                    token = res.token;
                    addressId = res.addressid;
                    $('#cim_address_name').text(res.reserver);
                    $('#cim_address_mobile').text(res.mobile);
                    $('#cim_address_text').text(res.address);
                }else if(res.status == 14){
                    type = 'cimelia_ylq';
                }else if(res.status == 16){
                    type = 'cimelia_address';
                    $('#cim_set_addr').show();
                }else if(res.status == 13){
                    mini_login.show();
                    return false;
                }else if(res.status == 23){
                	$('.cimelia').hide();
                    dialog({content: '本次活动仅限实名会员参与'});
                    return false;
                }else if(res.status == 0){
                    alert('系统繁忙请重试！');
                    return false;
                }
                if(isIE){
                    $('.cimelia_start').hide();
                    $('.'+type).show();
                }else{
                    $('.'+type).show(function(){
                        $('.cimelia_start').addClass('rotateClass');
                        $('.'+type).addClass('classRotate');
                    });
                }
            },
            error: function(){
                $(_this).removeClass('isAjax');
                alert('系统繁忙请重试！');
            }
        });
    });

    $('.cimelia_set_address').on('click', function(){
        var ticket = getCookie('ticket');
        if(!ticket || $('#ls_ul1').find('.link_top_login').length){
            mini_login.show();
            return false;
        }
        if(!addressId){
            dialog({content: '请先编辑默认地址'});
            return false;
        }
        if($(this).hasClass('isAjax')){
            return false;
        };
        $(this).addClass('isAjax');
        var _this = this;
        $.ajax({
            url: baseUrl + '/find/saveInfo?_t=' + new Date().getTime(),
            type: 'get',
            dataType: 'jsonp',
            data: {
                page_url: window.location.toString(),
                token: token,
                ticket: ticket,
                addressid: addressId,
                address: $('#cim_address_text').text(),
                mobile: $('#cim_address_mobile').text(),
                reserver: $('#cim_address_name').text()
            },
            success: function(res){
                $(_this).removeClass('isAjax');
                $('.cimelia').hide();
                if(res.status == 10){
                    dialog({content: '恭喜您领取成功，您是第'+res.luckyNum+'位成功领取奖品的会员'});
                }else if(res.status == 14){
                    dialog({content: '今日您已领取，欢迎下次参与'});
                }else if(res.status == 23){
                    dialog({content: '本次活动仅限实名会员参与'});
                }else{
                    dialog({content: '手慢了，欢迎您下次参与'});
                }
            },
            error: function(){
                $(_this).removeClass('isAjax');
                alert('系统繁忙请重试！');
            }
        });
    });

    $('.close_layer').on('click', function(){
        $('.cimelia').hide();
        $('#cim_address_name').text('');
        $('#cim_address_mobile').text('');
        $('#cim_address_text').text('');
        $('#cim_set_addr').hide();
    });

    $('#close_all_cim').on('click', function(){
        $('.cimelia').hide();
    });

    $('#thh_box').on('mouseenter', function(){
        $('#thh_content').animate({
            right: 44
        }, 600)
    });

    $('#thh_box').on('mouseleave', function(){
        $('#thh_content').animate({
            right: -222
        }, 600)
    });

    $.ajax({
        url: baseUrl + '/api/goodsLimitedNum?_t=' + new Date().getTime(),
        type: 'get',
        dataType: 'jsonp',
        data: {
            goodsId: $('#detailId').val()
        },
        success: function(res){
            if(res.code == '000000' && parseInt(res.data.limitedNum) > 0){
                $('.isXIngou').show();
                $('#xiangou').text('单用户限购'+ res.data.limitedNum +'枚/套');
            }
        },
        error: function(){

        }
    });

    $(window).on('scroll',setMenu()).trigger('scroll');

	function setMenu(){
		var $menu = $('#jsMenu'),
			menuTop = $menu.offset().top;
		return function(){
			var scrollTop = $(window).scrollTop();
			if(scrollTop>menuTop){
				$menu.addClass('fixedMenu');
			}else{
				$menu.removeClass('fixedMenu');
			}
		}
	}

	$(window).scroll(function(){
        //滚动出现返回顶部 1.4
        var top = document.documentElement.scrollTop || document.body.scrollTop; 
        if( top >= 200) {
            $(".fr_menu").show();
        } else {
            $(".fr_menu").hide();
        }
    });

   	$('#jsScrollTop').on('click', function(){
		$('html,body').animate({
            scrollTop: 0
        });
   	})
   	function getTicket() {
        var strcookie = document.cookie; //获取cookie字符串
        var arrcookie = strcookie.split("; "); //分割
        //遍历匹配
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == 'ticket') {
                return arrcookie[i].substr(7);
            }
        }
        return "";
    }

});
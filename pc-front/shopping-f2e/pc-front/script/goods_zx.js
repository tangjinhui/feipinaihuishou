require(['jquery', 'handlebars', 'getUrlParam', 'dialog', 'limitPage', 'mini_login', 'header'], function($, Handlebars, getUrlParam, dialog, limitPage, mini_login) {
	
	var goodsId = getUrlParam('goodsId');
    if (!goodsId) {
        return false;
    }
     Handlebars.registerHelper("starComment", function(star) {
        if (star == '0') {
            return 5;
        } else {
            return star;
        }
    })
     Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });
    Handlebars.registerHelper("formatPrice", function(price) {
        if (!price) {
            return '';
        }
        return parseFloat(price).toFixed(2);
    });
    Handlebars.registerHelper("memberType",function(levelId){
    	var str = '';
    	if(parseInt(levelId) == 1){
    		str="注册会员";
    	}else if(parseInt(levelId) == 2){
    		str="铜牌会员";
    	}else if(parseInt(levelId) == 5){
    		str="银牌会员";
    	}else if(parseInt(levelId) == 6){
    		str="金牌会员";
    	}else if(parseInt(levelId) == 7){
    		str="钻石会员";
    	}
    	return str;
    });
    goodsInfo();
    function goodsInfo() {
       $.ajax({
            url: '/front/comment/productGoodsDetail',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId,
            },
            success: function(res) {
                 if (res.code == '00') {
                    var listTemp = Handlebars.compile($("#goods-template").html());
                    $('#goodsInfo').html(listTemp(res.data));
                    $('#goodsLink').html('<a href="http://itemdev.ecgci.com/product_detail_'+res.data.goodsId+'.html">'+res.data.goodsName+'</a>');
                } else {
                    dialog({
                        content: '网络连接超时，请您稍后重试',
                    });
                    return;
                }
            },
            error: function() {
                dialog({
                    content: '网络连接超时，请您稍后重试',
                });
                return;
            }
        });
    };
    function initGoodsZxData(type,pageNum){
    	$.ajax({
            url: '/front/goodsZx/getGoodsZxData',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId,
                type: type,
                pageNum: pageNum
            },
            success: function(res) {
                 if (res.code == '00') {
                	if(!res.data.page.pages){
                		$("#load").hide();
                		$("#noGoodsZx").show();
                		$('#goodsZxPage').hide();
                		return;
                	}
                	$("#noGoodsZx").hide();
                    var contentTemp = Handlebars.compile($("#all-goods-zx").html());
                    $('#goodsZx').html(contentTemp(res.data.page));
                    if (res.data.page.pages > 0) {
                        initLimitPage(res.data.page.pages, res.data.page.pageNum);
                    } else {
                        $('.pageLimit').hide();
                    }
                } else {
                    dialog({ content: '网络连接超时，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    }
    function commitZx(type,content){
    	$.ajax({
            url: '/front/member/goodsZx/submitGoodsZxData',
            type: 'get',
            dataType: 'json',
            data: {
                goodsId: goodsId,
                type: type,
                content: content
            },
            success: function(res) {
                if ('99' == res.code) {
                    mini_login.show();
                    return;
                } else if (res.code == '00') {
                    $("#content").val("");
                    $('#contentTips').html('还可以输入200字')
                    $('#content').siblings('.error').removeClass('dn');
                    dialog({ content: '咨询成功，请耐心等待客服审核！' });
                } else {
                    dialog({ content: '网络连接超时，请您稍后重试' });
                }
            },
            error: function() {
                dialog({ content: '网络连接超时，请您稍后重试' });
            }
        });
    }
     function initData(pageNum) {
        var type = $('.tabs').find('.select').attr('data-status');
        initGoodsZxData(type,pageNum)
    }
    $('.tabs').find('li').on('click', function() {
        $(this).siblings().removeClass("select");
        $(this).addClass("select");
        initData(1);
    });
    $('.tabs').find('li').first().trigger("click");


    $('body').on('click','#jsZX',function(){
           var len = $('#user_is_login').length;
            if (!len) {
               mini_login.show();
                return;
            }
    	$("#esGoodsConsultingFormDiv").show();
    });

    $('body').on('click','#jsSubmitZX',function(){
    	var type = $('#esGoodsConsultingForm').find('input[name="test"]:checked').val();
    	var content = $("#content").val();
    	if(!content.length){
			dialog({ title: '系统提示', content: '咨询内容不能为空！' });
            return;
    	}else if(content.length > 200){
			dialog({ title: '系统提示', content: '咨询内容过长！' });
            return;
    	}
    	commitZx(type,content);
    });

    $('body').on('keyup','#content',function(){
    	var endLength = 200-$(this).val().length;
            if(endLength<0){
                var str = $(this).val().substring(0,200);
                $(this).val(str).trigger('keyup');
            }else{
                $('#contentTips').html('还可以输入'+endLength+'字').addClass(endLength==0?'red':'');
            }
    });
    $('body').on('blur','#content',function(){
    	var length = $(this).val().length;
            var endLength = 200-length;
            length==0?$(this).siblings('.error').removeClass('dn'):$(this).siblings('.error').addClass('dn');
            $('#contentTips').html('还可以输入'+endLength+'字').addClass(endLength==0?'red':'');
            if(endLength<0){
                var str = $(this).val().substring(0,200);
                $(this).val(str).trigger('keyup');
            }else{
                $('#contentTips').html('还可以输入'+endLength+'字').addClass(endLength==0?'red':'');
            }
    });

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
                initData(page);
                var top = $('#navi').height();
                $('html,body').animate({
                    scrollTop: top
                }, 300);
                return false;
            }
        });
    }
});
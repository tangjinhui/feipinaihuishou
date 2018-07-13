
$(function(){

    //侧栏切换
    $(".four-nav1>ul>li>a").click(function(){
        $this = $(this);
        $(".four-nav1>ul>li").removeClass("show");
        $this.parent("li").addClass("show");
        return false;
    });

    $(".four-nav1>ul>li>ul>li>a").click(function(){
        $this = $(this);
        $(".four-nav1>ul>li>ul>li>a").removeClass("active");
        $this.addClass("active");
        var _href = $(this).attr('href');
        window.location.hash = _href;
        switchIframe();
        return false;
    });

    //切换iframe
    function switchIframe(){
        var _href = getHash(),
            _dir = $('a[href=#'+_href+']').parent().attr('data-dir');
            if(_href == "onlineService"){
            	/*window.open('http://www.sobot.com/chat/pc/index.html?sysNum=cb163f1d67d348a891ba4979a2440858',"_blank");
            	$(".mask").show();
            	$(".login_tips").show();*/
            	toKefu();
            }
        var ifmsrc = '/doing/hel/html/'+_dir+'/'+_href+'.html';
        //var ifmsrc = 'http://127.0.0.1:8020/hel/html/'+_dir+'/'+_href+'.html';
        $("#showIframe").attr("src",ifmsrc);
    }

    function getHash(){
        var _href = window.location.hash;
        var len = $('a[href='+_href+']').length;
        if(!_href || !len) _href = '#mallTransfTerms';
        _href = _href.substring(1);
        return _href;
    }

    var _hash = getHash();
    $('a[href=#'+_hash+']').trigger('click').parents('.itemPointer').find('>a').trigger('click');

    $('.categorys').hover(function(){
        $(".cate_left").show();
    }, function(){
        $(".cate_left").hide();
    })

    $(".cate_left li").hover(function(){
            $(this).css("background-color","#b61d1d");
            $(this).children("a").css("color","#fff");
            $(this).children("h2").children("a").css({"color":"#fff","text-decoration":"none","cursor":"default"});
            $(this).children('div').show();
        },function(){
            $(this).css("background-color","#fff");
            $(this).children("a").css("color","#5e5e5e");
            $(this).children("h2").children("a").css({"color":"#b61d1d","text-decoration":"none","cursor":"default"});
            $(this).children('div').hide();
        });
        
    $(".close_btn").click(function(){
        $(".mask").hide();
        $(".login_tips").hide();
    });
    $(".no_login").click(function(){
        $(".mask").hide();
        $(".login_tips").hide();
    });

})

//iframe 高度自适应
    function SetCwinHeight(){
	//debugger;
  	var iframeid=document.getElementById("showIframe");
  	if (document.getElementById){
   		if (iframeid && !window.opera){
    		if (iframeid.contentDocument && iframeid.contentDocument.body.offsetHeight){
     			//iframeid.height = iframeid.contentDocument.body.offsetHeight;
     			iframeid.height = iframeid.contentDocument.all[0].offsetHeight+60;
    		}else if(iframeid.Document && iframeid.Document.body.scrollHeight){
     			iframeid.height = iframeid.Document.body.scrollHeight+60;
    		}
   		}
  	}
 }

//打开客服系统
function toKefu(){
    $.get(__contextRoot__+"/actions/common/is_member_online_returnid.bsh?t="+(new Date()).getTime(),function(data){
        if (data!=0){
            window.open('http://www.sobot.com/chat/pc/index.html?sysNum=cb163f1d67d348a891ba4979a2440858&partnerId='+data, "_blank");
        }else{
            $(".mask").show();
            $(".login_tips").show();
            //document.getElementById("login_tips").style.top=$(document).scrollTop()+document.getElementById("login_tips").offsetHeight+'px';
        }
    });
}

//右侧“在线客服”小熊猫鼠标效果
$(".xm_nav").hover(function(){
          $(this).stop(true,true).animate({right:-105},150).animate({right:-95},150);
          $(".xm_navt").stop(true,true).fadeIn(400);
    },function(){
      $(this).stop(true,true).animate({right:-95},150).animate({right:-105},150);
          $(".xm_navt").stop(true,true).fadeOut(400);
    });
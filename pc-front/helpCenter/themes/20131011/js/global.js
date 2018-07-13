// JavaScript Document
$(document).ready(function (){
    
    //鐐瑰嚮鍒嗙被闅愯棌澶ф
    $(".cate_left li>div>dl a").click(function(){
        $(".cate_left li>div").hide();
    });
    
    //寮傛鍔犺浇鎺ㄨ崘椤圭洰
    $("#loadRecommendedItem").load("/views/contents/home201381/nav_recommendedItem.jsp");
    
    $("#pcomprare table tr").hover(function(){
        $(this).addClass("hover");  
    },function(){
        $(this).removeClass("hover");   
    })
    $('a,input[type="button"]').focus(function(){
        $(this).blur();      //鍦ㄨ幏鍙栫劍鐐圭殑鏃跺€欓┈涓婂け鍘荤劍鐐癸紱
     })
    /*鍥涚骇瀵艰埅 start*/
    $(".four-nav1 h2").click(function(){ 
        $(".four-nav1 h2").next().hide();
        $(this).next("ul").show();
    });
    $(".four-nav1 ul li").click(function(){ 
        $(this).parents(".four-nav1").find("ul li ul").hide();
        $(this).children("ul").eq(0).show();
    }) 
    $(".four-nav1:last h2").css("border-bottom","0");
    /*鍥涚骇瀵艰埅 end*/
    $("#edit_edc_button").live("click",function(){
            $("#edit_edc").toggle();    
    });
    $("#edit_work_button").live("click",function(){
            $("#edit_work").toggle();   
    }); 
//tab鍒囨崲                        
  $(".tabs").find("li").click(function(e) {
            if (e.target == this) {
                var tabs = $(this).parent().children("li");
                var panels = $(this).parents(".tabqh").children(".ui-tabs-panel");
                var index = $.inArray(this, tabs);
                $(".formError").hide();
                if (panels.eq(index)[0]) {
                    tabs.removeClass("select")
                        .eq(index).addClass("select");
                    panels.addClass("ui-tabs-hide")
                        .eq(index).removeClass("ui-tabs-hide");
                }
            }
        });
  /*鍥炲*/
  $(".jp_xinxtb2 li").live("click",function(){
        $(".jp_xinxtb2 li").removeClass("select");
        $(this).addClass("select");
        });
  $(".jp_xinxtb3 li").live("click",function(){
        $(".jp_xinxtb3 li").removeClass("select");
        $(this).addClass("select");
        });
  $('.item-reply').hover(function() {
                                    $(this).find('.reply-meta a').css('visibility', 'visible');
                                    }, function() {
                                        if ( $(this).find('.replay-form').css('display') === 'none' ) {
                                            $(this).find('.reply-meta a').css('visibility', 'hidden');
                                    }
        });
  $(".p-bfc").live('click',function(){  
        var ob = $(this).parent().next('.replay-form'); 
        var er = ob.children('.reply-wrap').children('.reply-input').children('.fl').children('label');
        if(er){
                er.remove();
        }
        ob.slideToggle(100); 
        });
  $("a.btn-reply").live("click",function(){ 
        var ob = $(this).parent().next('.item-reply');  
        var er = ob.children().children().children('.reply-wrap').children('.reply-input').children('.fl').children('label');
        if(er){
            er.remove();
        }
        ob.slideToggle(100); 
    }); 
  /*寮€鍚閫夋ā寮�*/
  $("#kaiqi").click(function(){
    if($(this).html()=="寮€鍚閫夋ā寮�"){
        $(this).html("鍏抽棴澶氶€夋ā寮�");
        //$(".yx_tj").css("display","none");
        $(this).parents(".ss_tj").find("dl").addClass("keywords");
        $(this).parents(".ss_tj").find("li").removeClass("last");
        $("#submit-reset").css("display","block");
        $("#submit-reset").addClass("last");
        xianshi();
        }else{
        $(this).html("寮€鍚閫夋ā寮�");
        var len=$(".ss_tj li").length-2;
        $("#submit-reset").css("display","none");
        $(this).parents(".ss_tj").find("dl").removeClass("keywords");
        $(".ss_tj li").eq(len).addClass("last");
        ychang();
        }

  });
    $(".xm_nav").hover(function(){
          $(this).stop(true,true).animate({right:-105},150).animate({right:-95},150);
          $(".xm_navt").stop(true,true).fadeIn(400);
    },function(){
      $(this).stop(true,true).animate({right:-95},150).animate({right:-105},150);
          $(".xm_navt").stop(true,true).fadeOut(400);
    });
  /*璇勪环绛夌骇*/
  $(".star-list img").click(
        function(){
            $(this).prevAll("img").each(function(){
                this.src="/themes/default/images/xing.gif"
            });
            this.src="/themes/default/images/xing.gif"; 
            $(this).nextAll("img").each(function(){
                this.src="/themes/default/images/xing2.gif"
            });
            $(this).parent(".star-list").find(".coment-text").text($(this).attr("ref"));
            
            $(".coment-text").each(function(idx){
                if($(".coment-text").eq(idx).text()=='寰堝樊'){
                $('#commentRank'+idx).val('1');
            }
            if($(".coment-text").eq(idx).text()=='杈冨樊'){
                $('#commentRank'+idx).val('2');
            }
            if($(".coment-text").eq(idx).text()=='杩樿'){
                $('#commentRank'+idx).val('3');
            }
            if($(".coment-text").eq(idx).text()=='鎺ㄨ崘'){
                $('#commentRank'+idx).val('4');
            }
            if($(".coment-text").eq(idx).text()=='鍔涜崘'){
                $('#commentRank'+idx).val('5');
            }                             
            });
            
        },
        function(){
            
        }
    );
/*宸︿晶鎼滅储鏍�*/
$(".ss_left h3").each(function(){
    $(this).click(function(){
        $(".ss_left").find("ul").hide();
        $(".ss_left").find("div").removeClass("over");
        $(this).next("ul").show();
        $(this).parent("div").addClass("over");
    });                            
})
    $(".duibi").click(function(){
        var wid=(window.screen.width-1257)/2; 
        $(".db_lan").css("right",wid);
        $(".db_xians").hide();
        $(".db_lan").show();
        });
    $(".db_yinc img").click(function(){
        $(".db_lan").hide();
        var wid=(window.screen.width-1257)/2-44; 
        $(".db_xians").show();
        $(".db_xians").css("right",wid);
                
    });
    $(".db_xians").click(function(){
    var wid=(window.screen.width-1257)/2; 
        $(".db_lan").css("right",wid);
        $(".db_xians").hide();
        $(".db_lan").show();
        $(this).hide();
    }); 
//娴姩灞傚垏鎹�
    $(".categorys").hover(function(){
        $(".cate_left").show(); 
    },function(){
        $(".cate_left").hide(); 
    });
    $(".fly").hover(function(){
       $(this).find(".fly_cont").show();
        $(this).find(".buy_unline").show();
    },function(){
       $(this).find(".fly_cont").hide();
       $(this).find(".buy_unline").hide();
     });
    $(".notes").hover(function(){
       $(this).addClass("select");
    },function(){
       $(this).removeClass("select");
     });
    //$(".categorys li").hover(function(){
     //  $(this).addClass("select");
    //},function(){
    //   $(this).removeClass("select");
  //   });
    $(".out").hover(function(){
       $(this).addClass("in");
    },function(){
       $(this).removeClass("in");
     });
    //$(".nav_mune li").hover(function(){
    //   $(this).next().find("a").addClass("next");
    //},function(){
    //   $(this).next().find("a").removeClass("next");
   //  });
    
    $('#textts').val('');
    var limitNum = 200;
    var pattern = '杩樺彲浠ヨ緭鍏�' + limitNum + '瀛�';
    $('#shengyu').html(pattern);
    $('#textts').keyup(
        function() {
            var remain = $(this).val().length;
            if (remain > 200) {
            pattern ='瀛楁暟瓒呰繃闄愬埗锛岃閫傚綋鍒犻櫎閮ㄥ垎鍐呭';
            }
            else {
            var result = limitNum - remain;
            pattern = '杩樺彲浠ヨ緭鍏�' + result + '瀛�';
        }
        $('#shengyu').html(pattern);
    });/* 
        $(".tj1").jCarouselLite({
            vertical: false,
            btnNext: ".next1",
            btnPrev: ".prev1",
            visible: 4,
            scroll:1
        });
        $(".tj5").jCarouselLite({
            vertical: false,
            btnNext: ".next5",
            btnPrev: ".prev5",
            visible: 4,
            scroll:1
        });
        $(".tj2").jCarouselLite({
            vertical: false,
            btnNext: ".next2",
            btnPrev: ".prev2",
            visible: 4,
            scroll:1
        });
        $(".tj3").jCarouselLite({
            vertical: false,
            btnNext: ".next3",
            btnPrev: ".prev3",
            visible: 4,
            scroll:1
        });
        $(".tj4").jCarouselLite({
            vertical: false,
            btnNext: ".next4",
            btnPrev: ".prev4",
            visible: 4,
            scroll:1
        });
        $(".jp_list").jCarouselLite({
        btnNext: ".jp_right",
        btnPrev: ".jp_left",
        visible: 5,
        scroll:1
    });
        
    $("#pj-list").jCarouselLite({
        btnNext: "#pj-lefts",
        btnPrev: "#pj-rights",
        visible: 4,
        scroll:1
    });
    $(".gd_list").jCarouselLite({
        btnNext: ".gd_right",
        btnPrev: ".gd_left",
        visible: 4,
        scroll:1
    });
        $(".tg_list").jCarouselLite({
        btnNext: ".tg_right",
        btnPrev: ".tg_left",
        visible: 4,
        scroll:1
    });
    $(".xt_tj").jCarouselLite({
            vertical: false,
            btnNext: ".xt-left",
            btnPrev: ".xt-right",
            visible: 5,
            scroll:1
        });
    $(".cn_xz").jCarouselLite({
        btnNext: ".like_right",
        btnPrev: ".like_left",
        visible: 5,
        scroll:1
    });*/
    $(".sm_detail").toggle(function(){
        $(this).parentsUntil("no_border").next().addClass("detail_hide");
        $(this).removeClass("sm_close").addClass("sm_open");
    },function(){
        $(this).parentsUntil("no_border").next().removeClass("detail_hide");
        $(this).removeClass("sm_open").addClass("sm_close");
    });
    $(".product dl").hover(function(){
       $(this).addClass("cur");
    },function(){
       $(this).removeClass("cur");
     });

    window.setTimeout(function(){
    $("#jdt_mirror").hide();
    $("#jdt").show();
    },5000); 

    //宸﹀彸杞挱鐨則ab鍒囨崲
$(".tablb ul li").each(function (idx) {
   $(this).click(function () {
      $(".tablb ul li").removeClass("select");
      $(this).addClass("select");
      $(".tabqh .ui-tabs-panel").hide();
      $(".tabqh .ui-tabs-panel").eq(idx).show();
      
    });

}); 
    $("#dialog").dialog({
    bgiframe: true,
    resizable: false,
    height:140,
    modal: true,
    overlay: {
        backgroundColor: '#000',
        opacity: 0.5
    },
    buttons: {
        'Delete all items in recycle bin': function() {
            $(this).dialog('close');
        },
        Cancel: function() {
            $(this).dialog('close');
        }
    }
});
    
    $(".fr_menu .top").click(function(){
        $("html,body").animate({scrollTop:0}); 
    });
    $(".clo").click(function(){
        $(".marl5").hide();
    });
    swithImgjt();
});
//鐒︾偣鍥�
function swithImgjt() {
        var _t2 = 2; 
        var _tn = 0;        
        var _tl = null;
        var _tnum = $('.focusPic').length - 1;      
         var _width=$(".focusPic").outerWidth();
         var totalWidth=(_tnum+1)*_width;
         $("#adWrapper").width(totalWidth+"px");
        if (_tnum < 2) return;
        
        $("#adWrapper").append($(".focusPic:first").clone());
        
        $('#index_page a,.focusPic').mouseover(function () {   
                 window.clearInterval(_tt1);
               setFocus( $(this).index());      
        }).mouseleave(function () {
            _tt1 = window.setInterval(change_img, _t2 * 3000);
        });
        
        _tt1 = window.setInterval(change_img, _t2 * 3000);

        function change_img() {
                var currentWidth= -_tn*_width;
            if (_tn >= _tnum) { 
                 _tn = 0; 
                $("#adWrapper").stop(true,false).animate({marginLeft:currentWidth+"px"},500,function(){
                            
                $("#adWrapper").css({marginLeft:"0px"});                                                         
                                                                                     });
            }else{
                $("#adWrapper").stop(true,false).animate({marginLeft:currentWidth+"px"},500);
            }
            $('#index_page a').removeClass("current");
            $('#index_page a').eq(_tn).addClass("current");
            _tn++;
        }
        function setFocus(i) {
            window.clearInterval(_tt1);
            _tn = i;
            change_img()

        }
    }


//

window.onscroll = function(){
    var tth = document.documentElement.scrollTop || document.body.scrollTop; 
    var ttb = document.documentElement.scrollBottom || document.body.scrollBottom; 
    if( tth >= 200) {
        $(".fr_menu").show();
    } else {
        $(".fr_menu").hide();
    }
    if( tth >= 500 ) {
        $(".tong_buy").show();
    } else {
    
        $(".tong_buy").hide();
    }
    
}       
function yinc(){
    $(".ss_tj li.shuju").each(function(idx){
            if(idx>=5){
                $(".ss_tj li.shuju").eq(idx).hide();    
            }
            
        });
    var len=$(".ss_tj li.shuju").length;
    
    if(len<5){$(".more").hide();}else{$(".ss_tj li.shuju").eq(4).addClass("last");}
    }
function xianshi(){
        $(".ss_tj li.shuju").show();
        var len=$(".ss_tj li.shuju").length;
    //if(len<5){$(".more").hide();}else{
        $(".ss_tj li.shuju").eq(4).removeClass("last");
        $(".xians").hide();
        $(".yinc").show();
    //  }
        }   
function ychang(){
        yinc();
        var len=$(".ss_tj li.shuju").length;
    //  if(len<5){$(".more").hide();}else{
        $(".xians").show();
        $(".yinc").hide();
    //  }
}
function add_cencel(){
        $("#edit_edc").hide();
    }
    
function copyToClipboard(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
        alert("宸茬粡鎴愬姛澶嶅埗鍒板壀甯栨澘涓婏紒");
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch(e) {
            alert("琚祻瑙堝櫒鎷掔粷锛乗n璇峰湪娴忚鍣ㄥ湴鍧€鏍忚緭鍏�'about:config'骞跺洖杞n鐒跺悗灏�'signed.applets.codebase_principal_support'璁剧疆涓�'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip) return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans) return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip) return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        alert("宸茬粡鎴愬姛澶嶅埗鍒板壀甯栨澘涓婏紒");
    }
}
function copyTo() {
    var txt = $("input[name=copy_link]").val();
    copyToClipboard(txt);
} 
/**娣诲姞鍟嗗搧鍒拌喘鐗╄溅*/
function addCart(goodsId,sourceType,buyNumber,showAlert){
 if(typeof(pageTracker) != 'undefined'){
     pageTracker._trackEvent('鐢靛瓙鍟嗗姟', '鍔犲叆璐墿杞�',goodsId+'_'+sourceType+'_'+buyNumber);
 }
 var giftId = '';
 if($('input[name="giftRadio"]')){
   giftId = $('input[name="giftRadio"]:checked').val();
 }
 $.get('/views/contents/shop/cart/add_cart.jsp',
      {id:goodsId,
      sourceType:sourceType,
      buyNumber:buyNumber,
      giftId:giftId
      },function (data){
        if(data=='nogoods'){
              $.alert("鍟嗗搧缂鸿揣锛屾棤娉曟坊鍔犲埌璐墿杞�!");
         }else if(data=='noalive'){
              $.alert("鍟嗗搧涓嬫灦锛屾棤娉曟坊鍔犲埌璐墿杞�!");
         }else if(data.indexOf("packet")>-1){
            var tmp = new Array();
            tmp = data.split(",");
            $.alert(tmp[1]);
         }else if(data=='xianliang'){
             $.alert("浠婃棩闄愯喘10鍙板凡鍞畬锛岃缁х画鍏虫敞!");
         }else{
         if(data=='success'){
            setCartItemCountState();
            if(showAlert==null){
                $.alert("鎴愬姛娣诲姞鍟嗗搧鍒拌喘鐗╄溅");
            }
            //if($("#gouwuche")[0]){
            //  __loadCart();
            //}
         }else if(data=='maxsize'){
            setCartItemCountState();
             $.alert("鍟嗗搧鏁伴噺涓嶈兘瓒呰繃100涓�!");
            //if($("#gouwuche")[0]){
            //  __loadCart();
            //}
         }
//         else if(data == 'isgoodsId'){
//          var val = "璇峰厛鍙備笌<a href='/zt/yql/cgyx.jsp'>闂叧娓告垙</a>锛屾墠鑳借繘琛岃喘涔�!";
//          $.alert(val);
//         }
       }
       //鍒锋柊璐墿杞�
       if($("#gouwuche")[0]){
            __loadCart();
        }
  });
}
//鑾峰彇璧犲搧浜岄€変竴鐨剈rl鍙傛暟
function giftParam(name,url){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    if(url!=undefined){
        url = url.substr(url.indexOf('?'));
    }
    var r =(url||window.location.search).substr(1).match(reg);   
    if (r!=null){
        return unescape(r[2]);
    }
    return null;
}

function addCartWithReturn(goodsId,sourceType,buyNumber,callback){
 if(typeof(pageTracker) != 'undefined'){
     pageTracker._trackEvent('鐢靛瓙鍟嗗姟', '鍔犲叆璐墿杞�',goodsId+'_'+sourceType+'_'+buyNumber);
 }
 
 $.get('/views/contents/shop/cart/add_cart.jsp',
      {id:goodsId,
      sourceType:sourceType,
      buyNumber:buyNumber
      },function (data){
         if(data=='nogoods'){
              $.alert("鍟嗗搧缂鸿揣锛屾棤娉曟坊鍔犲埌璐墿杞�!");
         }else if(data=='noalive'){
              $.alert("鍟嗗搧涓嬫灦锛屾棤娉曟坊鍔犲埌璐墿杞�!");
         }else if(data.indexOf("packet")>-1){
            var tmp = new Array();
            tmp = data.split(",");
            $.alert(tmp[1]);
         }else{
             if(data=='success'){
                setCartItemCountState();
                if($("#gouwuche")[0]){
                    __loadCart();
                }
                if(jQuery.isFunction(callback)){ callback(); }
             }else if(data=='maxsize'){
                 $.alert("鍟嗗搧鏁伴噺涓嶈兘瓒呰繃100涓�!");
                 setCartItemCountState();
                if($("#gouwuche")[0]){
                    __loadCart();
                }
                if(jQuery.isFunction(callback)){ callback(); }
             }
        }
  });
}

//鍔犲叆鍏虫敞
function insertFavor(goodsId) {
    if(typeof(pageTracker) != 'undefined'){
         pageTracker._trackEvent('浼氬憳', '鍔犲叆鍏虫敞',goodsId);
    }
    $.post(__contextRoot__+"/actions/member/es_favory/save_es_favory.bsh?goodsId="+goodsId,function(data){
        
        if(data!=null &&  data!='' && data=='璇风櫥褰曞悗鍐嶆坊鍔�'){
            jQuery.ajax({
                type : "GET",
                url : "/views/contents/member/login/mini_login.jsp",
                dataType :"html",
                success : function(data, textStatus) {
                    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
                    $("#logForm_s").hide();
                    $("#logForm_s").html(data);
                    $("#logForm_s").show();
                    document.getElementById("thickbox").style.top=scrollTop+(document.documentElement.clientHeight-document.getElementById("thickbox").offsetHeight)/2-150+'px';
                    document.getElementById("thickbox").style.left=(window.screen.width-document.getElementById("thickbox").offsetWidth)/2-10+'px';
                },
                error : function() {
                }
            });
        }else{
            $.alert(data);
        }
    });
}
function callKF() {
    if (__isMemberHasLogin__ == 0) {
        $.alert("璇锋偍鐧诲綍!",function(){window.location.replace("/login.html");});
        return;
    }
    var account=$.cookie("account");
    var name=$.cookie("name");
    var mobile=$.cookie("mobile");
    var memberLevelName=$.cookie("memberLevelName");
    if(account==null){
        account='';
    }
    if(name==null){
        name='';
    }
    if(mobile==null){
        mobile='';
    }
    if(memberLevelName==null){
        memberLevelName='';
    }
    var url="http://219.143.15.14:8084/aiocc-ocsclient/modules/customer/ocs.jsp?account="+account+"&name="+name+"&mobile="+mobile+"&memberLevel="+memberLevelName+"";
    window.open(url, "win","left=174,top=126,width=720,height=500,location=no,menubar=no,toolbar=no,directories=no,resizable=no,scrollbars=no,status=no");
}
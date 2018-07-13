// JavaScript Document
 function drop_listShow(){
		$(".drop_list").show();	}
    function drop_listHide(){
	$(".drop_list").hide();}
    //打开客服系统
    function toKefu(){
	$.get(__contextRoot__+"/actions/common/is_member_online_returnid.bsh?t="+(new Date()).getTime(),    function(data){
		if (data!=0){
			window.open(    'http://www.sobot.com/chat/pc/index.html?sysNum=cb163f1d67d348a891ba4979a2440858&partnerId='+data, "_blank");
		}else{
			$(".mask").show();
			$(".login_tips").show();
			//document.getElementById("login_tips").style.top=$(document).scrollTop()+document.getElementById("login_tips").offsetHeight+'px';
		}
	});
}
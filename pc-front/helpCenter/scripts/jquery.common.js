//validator default
jQuery.extend(jQuery.validator.messages, {
    required: "<font color=red>*蹇呭～椤�</font>",
    remote: "璇蜂慨姝ｈ椤�",
    requiredChoose: "<font color=red>*蹇呴€夐」</font>",
    email: "<font color=red>*璇疯緭鍏ユ纭牸寮忕殑鐢靛瓙閭欢</font>",
    url: "璇疯緭鍏ュ悎娉曠殑缃戝潃",
    date: "璇疯緭鍏ュ悎娉曠殑鏃ユ湡",
    dateISO: "鏃ユ湡鏍煎紡蹇呴』涓簓yyy-mm-dd",
    number: "<font color=red>*璇疯緭鍏ュ悎娉曠殑鏁板瓧</font>",
    digits: "鍙兘杈撳叆鏁存暟",
    creditcard: "璇疯緭鍏ュ悎娉曠殑淇＄敤鍗″彿",
    equalTo: "璇峰啀娆¤緭鍏ョ浉鍚岀殑鍊�",
    accept: "璇疯緭鍏ユ嫢鏈夊悎娉曞悗缂€鍚嶇殑瀛楃涓�",
    maxlength: jQuery.validator.format("璇疯緭鍏ヤ竴涓暱搴︽渶澶氭槸 {0} 鐨勫瓧绗︿覆"),
    minlength: jQuery.validator.format("璇疯緭鍏ヤ竴涓暱搴︽渶灏戞槸 {0} 鐨勫瓧绗︿覆"),
    rangelength: jQuery.validator.format("璇疯緭鍏ヤ竴涓暱搴︿粙浜� {0} 鍜� {1} 涔嬮棿鐨勫瓧绗︿覆"),
    range: jQuery.validator.format("璇疯緭鍏ヤ竴涓粙浜� {0} 鍜� {1} 涔嬮棿鐨勫€�"),
    max: jQuery.validator.format("璇疯緭鍏ヤ竴涓渶澶т负 {0} 鐨勫€�"),
    min: jQuery.validator.format("璇疯緭鍏ヤ竴涓渶灏忎负 {0} 鐨勫€�")
});

jQuery(function() {
//dialog default
    $.ui.dialog.defaults.bgiframe = true;
    $.ui.dialog.defaults.autoOpen = false;

//datepicker default
    $.datepicker.setDefaults($.extend($.datepicker.regional['']));
    $('input.datepicker').datepicker({
        showOn: 'button',
        buttonImage: '/themes/default/images/calendar.gif',
        buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd',
        dayNames: ['鏄熸湡鏃�','鏄熸湡涓€','鏄熸湡浜�','鏄熸湡涓�','鏄熸湡鍥�','鏄熸湡浜�','鏄熸湡鍏�'],
        dayNamesMin: ['鏃�','涓€','浜�','涓�','鍥�','浜�','鍏�'],
        dayNamesShort: ['鍛ㄦ棩','鍛ㄤ竴','鍛ㄤ簩','鍛ㄤ笁','鍛ㄥ洓','鍛ㄤ簲','鍛ㄥ叚'],
        monthNames: ['涓€鏈�','浜屾湀','涓夋湀','鍥涙湀','浜旀湀','鍏湀','涓冩湀','鍏湀','涔濇湀','鍗佹湀','鍗佷竴鏈�','鍗佷簩鏈�'],
        monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
        showMonthAfterYear: true,
        yearRange: '1970:2030',
        onClose: function() { $(this).focus(); }
    },$.datepicker.regional['zh-CN']);

    //瀛楃涓�
    $.validator.addMethod("isWord",function(value, element) {
        return this.optional(element) || /^\w+$/.test(value);
    },"鍙兘鍖呭惈鏁板瓧銆佸瓧绗︽垨涓嬪垝绾�");
    //绾眽瀛�
    $.validator.addMethod("chinese",function(value, element) {
        return this.optional(element) || /^[\u4E00-\u9FA5]+$/.test(value);
    },"<font color=red>鍙兘浣跨敤姹夊瓧</font>");
    //韬唤璇�
    $.validator.addMethod("idCard",function(value, element) {
        return this.optional(element) || /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(value);
    },"璇疯緭鍏�15鎴�18浣嶈韩浠借瘉鍙风爜锛�18浣嶆湯灏惧彲浠ユ槸X");
    //閫夋嫨妗�
    $.validator.addMethod("selectRequired",function(value, element) {
        if(value == '0') { return this.optional(element) }
        else { return true };
    },$.validator.messages.required);
    $.validator.addMethod("userRequired",function(value, element) {
        return this.optional(element) || /^[a-z\A-Z\d\u4E00-\u9FA5-_]+$/.test(value);
    },"<font color=red>鍙兘鍖呭惈涓枃銆佹暟瀛椼€佸瓧绗︽垨涓嬪垝绾�</font>");
    $.validator.addMethod("emailRequired",function(value, element) {
        return this.optional(element) || /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
    },"<font color=red>璇疯緭鍏ユ纭殑鐢靛瓙閭!</font>");
    //浜岄€変竴
    $.validator.addMethod("oneRequired",function(value, element, param) {
        var paramVal = $(param).val();
        if(value == '' && paramVal == '') { return false }
        else { return true };
    },$.validator.messages.required);
    //鐢佃瘽
    $.validator.addMethod("telephone",function(value, element) {
        return this.optional(element) || /^\d{3,4}-\d{7,9}$/.test(value);
    },"<font color=red>鐢佃瘽鏍煎紡涓�010-12345678</font>");
    //鑱旂郴鐢佃瘽
    $.validator.addMethod("phone",function(value, element) {
       return this.optional(element) || /^[0-9-]{1,}$/.test(value);
    },"<font color=red>鐢佃瘽鏍煎紡涓�0310-12345678</font>");
    //鎵嬫満     
    $.validator.addMethod("mobile",function(value, element) {
        return this.optional(element) || /^(13|15|18)[0-9]{9}$/.test(value);
    },"<font color=red>璇疯緭鍏ユ纭殑鎵嬫満鍙�</font>");
    //閭紪
    $.validator.addMethod("isZipCode", function(value, element) {
        return this.optional(element) || /^[0-9]{6}$/.test(value);
    }, "<font color=red>璇疯緭鍏ユ纭殑閭斂缂栫爜</font>");
    //鏃堕棿姣旇緝
    $.validator.addMethod("dateCompare",function(value, element, param) {
        var paramtime = $(param).val();
        var comp = comptime(paramtime,value);
        if(comp == true) { return true }
        else { return this.optional(element); }
    },"鑷彁鏃堕棿蹇呴』鏃╀簬褰撳墠鏃堕棿");
    
    //鍙峰崱韬唤璇�
    //$.validator.addMethod("simcardIdCard1",function(value, element) {
        //return this.optional(element) || /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(value);
    //},"<font color=red>璇疯緭鍏�15鎴�18浣嶈韩浠借瘉鍙风爜锛�18浣嶆湯灏惧彲浠ユ槸X</font>");
    //鍙峰崱韬唤璇�
    jQuery.validator.addMethod("simcardIdCard", function(value, element) { 
        return this.optional(element) || idCardNoUtil.checkIdCardNo(value);     
    }, "<font color=red>韬唤璇佹湁璇�</font>"); 

    
    //鍙峰崱鎵嬫満鍙蜂笌搴ф満鏍￠獙
    $.validator.addMethod("simcardMobileOrTel",function(value, element) {
        if(value.indexOf("-") == -1) {  //鎵嬫満鍙�
            return this.optional(element) || /^(13|15|18)[0-9]{9}$/.test(value);
        } else {    //搴ф満
            return this.optional(element) || /^\d{3,4}-\d{7,9}$/.test(value);
        }
    }, "<font color=red>鍙风爜鏍煎紡閿欒</font>");

    $.validator.addClassRules({
        username: {
            isWord:true,
            rangelength:[6,18]
        },
        password: {
            isWord:true,
            rangelength:[6,12]
        },
        realname: {
            chinese:true,
            minlength:2
        }
    });
    
    //甯哥敤椤电爜
    if($('.page-number-detail') && $('.page-number-detail').length>0) {
        $('.page-number-detail').each(function(){
            var $this = $(this);
            var spanHtml = '';
            var pageTotal = parseInt($this.find('input[name="pagetotal"]').val());
            var pageCurrent = parseInt($this.find('input[name="pagecurrent"]').val());
            var pageurl = $this.find('input[name="pageurl"]').val();
            var pageparm = $this.find('input[name="pageparm"]').val();
            var pageBegin = 1;
            var pageFinish = 10;
            if(pageTotal<=10){
                pageBegin = 1;
                pageFinish = pageTotal;
            }else if(pageCurrent<=6){
                pageBegin = 1;
                pageFinish = 10;
            }else if(pageCurrent>=pageTotal-4){
                pageFinish = pageTotal;
                pageBegin = pageTotal - 9;
            }else{
                pageBegin = pageCurrent - 5;
                pageFinish = pageCurrent + 4;
            }
            if(pageBegin>1){
                spanHtml += '<em>...</em>';
            }
            for(i = pageBegin;i <= pageFinish;i++){
                if(i == pageCurrent){
                    spanHtml += " <a class='current'>" + i + "</a> ";
                }else{
                    spanHtml += ' <a href="'+pageurl + i + pageparm +'">' + i + "</a> ";
                }
            }
            if(pageFinish<pageTotal){
                spanHtml += '<em>...</em>';
            }
            $this.find('input[name="topageNo"]').val(pageCurrent);
            $this.find('.page-num').html(spanHtml);
            $this.find('input[name="gotopage"]').click(function(){
                var num = $this.find('input[name="topageNo"]').val();
                window.location = pageurl + num + pageparm;
            });
        });
    }


});

function comptime(beginTime,endTime){
    var today = getNowFormatDate();
    var startDate = new Date(today.replace("-",",")).getTime() ;
    var endDate = new Date(edate.replace("-",",")).getTime() ;
    
    if( startDate > endDate )
    {  
       return false;
    }
    return true;
}

function getNowFormatDate()
{
   var day = new Date();

   var Year = 0;
   var Month = 0;
   var Day = 0;
   var CurrentDate = "";
   //鍒濆鍖栨椂闂�   
   Year       = day.getFullYear();
   Month      = day.getMonth()+1;
   Day        = day.getDate();
  
   CurrentDate += Year + "-";
  
   if (Month >= 10 )
   {
    CurrentDate += Month + "-";
   }
   else
   {
    CurrentDate += "0" + Month + "-";
   }
   if (Day >= 10 )
   {
    CurrentDate += Day ;
   }
   else
   {
    CurrentDate += "0" + Day ;
   }
   return CurrentDate;
} 

jQuery.extend({
     
    alert:function(txt,callback){
       
        var htmlAlert = '<div id="systemAlert" title="绯荤粺鎻愮ず">';
        htmlAlert += '<div class="msg">' + txt + '</div></div>';
        $('body').append(htmlAlert);
        if ($('body')[0]){
            $('body')[0].style.width='auto';
        }
        var $systemAlert = $('#systemAlert').dialog({
            bgiframe: true,
            autoOpen: true,
            modal: true,
            position: "middle", 
            resizable: false,
            buttons: {
                纭畾: function() {
                    $(this).dialog('close');
                    if(jQuery.isFunction(callback)){ callback(); }
                    if ($('body')[0]) {
                            $('body')[0].style.position='relative';
                            $('body')[0].style.width='';
                        }
                    $('#systemAlert').remove();
                }
            },
            close:function(){
                $('#systemAlert').dialog('destroy').remove();
                if ($('body')[0]){
                        $('body')[0].style.position='relative';
                        $('body')[0].style.width='';
                    }
                $('#systemAlert').remove();
            }
        })
        .parent();
        if ($systemAlert.length > 0) {
            var bodyWidth = $("body").width();  
            var width = $systemAlert.width() / 2;
            var height = $systemAlert.height() / 2; 
            var top = $(window).scrollTop() + $(window).height()/2;
            $systemAlert.css({
                "left" : bodyWidth < 1240 ? "620px" : "50%",
                "top" : top + "px",
                "margin-left" : "-"+width+"px",
                "margin-top" : "-"+height+"px"
            });
        };
    },
    confirm:function(txt,callback){
        var htmlConfirm = '<div id="systemConfirm" title="鎿嶄綔纭">';
        htmlConfirm += '<div class="msg">' + txt + '</div></div>';
        $('body').append(htmlConfirm);
        if ($('body')[0]){
            $('body')[0].style.width='auto';
        }
        var $systemAlert = $('#systemConfirm').dialog({
            bgiframe: true,
            autoOpen: true,
            position: "middle", 
            modal: true,
            resizable: false,
            buttons: {
                纭畾: function() {
                    $(this).dialog('close');
                    if(jQuery.isFunction(callback)){ callback(); }
                    if ($('body')[0]){
                        $('body')[0].style.position='relative';
                        $('body')[0].style.width='';
                    }
                },
                鍙栨秷: function(){
                    $(this).dialog('close');
                    if ($('body')[0]){
                        $('body')[0].style.position='relative';
                        $('body')[0].style.width='';
                    }
                }
            },
            close:function(){
                $('#systemConfirm').dialog('destroy').remove();
                if ($('body')[0]){
                    $('body')[0].style.position='relative';
                    $('body')[0].style.width='';
                }
            }
        })
        .parent();
        if ($systemAlert.length > 0) {
            var bodyWidth = $("body").width();  
            var width = $systemAlert.width() / 2;
            var height = $systemAlert.height() / 2; 
            var top = $(window).scrollTop() + $(window).height()/2;
            $systemAlert.css({
                "left" : bodyWidth < 1240 ? "620px" : "50%",
                "top" : top + "px",
                "margin-left" : "-"+width+"px",
                "margin-top" : "-"+height+"px"
            });
        };

    }
});

// 闃叉閲嶅鎻愪氦
jQuery.extend({
    token:function(obj,callback){
        $(obj).click(function(){
            $.alert("宸叉彁浜わ紝璇风◢鍚庘€︹€�");
        });
        if(jQuery.isFunction(callback)){ callback(); }
    }
});

var idCardNoUtil = {

provinceAndCitys: {11:"鍖椾含",12:"澶╂触",13:"娌冲寳",14:"灞辫タ",15:"鍐呰挋鍙�",21:"杈藉畞",22:"鍚夋灄",23:"榛戦緳姹�",
31:"涓婃捣",32:"姹熻嫃",33:"娴欐睙",34:"瀹夊窘",35:"绂忓缓",36:"姹熻タ",37:"灞变笢",41:"娌冲崡",42:"婀栧寳",43:"婀栧崡",44:"骞夸笢",
45:"骞胯タ",46:"娴峰崡",50:"閲嶅簡",51:"鍥涘窛",52:"璐靛窞",53:"浜戝崡",54:"瑗胯棌",61:"闄曡タ",62:"鐢樿們",63:"闈掓捣",64:"瀹佸",
65:"鏂扮枂",71:"鍙版咕",81:"棣欐腐",82:"婢抽棬",91:"鍥藉"},


powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],


parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],


genders: {male:"鐢�",female:"濂�"},


checkAddressCode: function(addressCode){
var check = /^[1-9]\d{5}$/.test(addressCode);
if(!check) return false;
if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
return true;
}else{
return false;
}
},


checkBirthDayCode: function(birDayCode){
var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
if(!check) return false;
var yyyy = parseInt(birDayCode.substring(0,4),10);
var mm = parseInt(birDayCode.substring(4,6),10);
var dd = parseInt(birDayCode.substring(6),10);
var xdata = new Date(yyyy,mm-1,dd);
if(xdata > new Date()){
return false;//鐢熸棩涓嶈兘澶т簬褰撳墠鏃ユ湡
}else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
return true;
}else{
return false;
}
},


getParityBit: function(idCardNo){
var id17 = idCardNo.substring(0,17);

var power = 0;
for(var i=0;i<17;i++){
power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
}

var mod = power % 11;
return idCardNoUtil.parityBit[mod];
},


checkParityBit: function(idCardNo){
var parityBit = idCardNo.charAt(17).toUpperCase();
if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
return true;
}else{
return false;
}
},


checkIdCardNo: function(idCardNo){
//15浣嶅拰18浣嶈韩浠借瘉鍙风爜鐨勫熀鏈牎楠�
var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
if(!check) return false;
//鍒ゆ柇闀垮害涓�15浣嶆垨18浣�
if(idCardNo.length==15){
return idCardNoUtil.check15IdCardNo(idCardNo);
}else if(idCardNo.length==18){
return idCardNoUtil.check18IdCardNo(idCardNo);
}else{
return false;
}
},

//鏍￠獙15浣嶇殑韬唤璇佸彿鐮�
check15IdCardNo: function(idCardNo){
//15浣嶈韩浠借瘉鍙风爜鐨勫熀鏈牎楠�
var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
if(!check) return false;
//鏍￠獙鍦板潃鐮�
var addressCode = idCardNo.substring(0,6);
check = idCardNoUtil.checkAddressCode(addressCode);
if(!check) return false;
var birDayCode = '19' + idCardNo.substring(6,12);
//鏍￠獙鏃ユ湡鐮�
return idCardNoUtil.checkBirthDayCode(birDayCode);
},

//鏍￠獙18浣嶇殑韬唤璇佸彿鐮�
check18IdCardNo: function(idCardNo){
//18浣嶈韩浠借瘉鍙风爜鐨勫熀鏈牸寮忔牎楠�
var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
if(!check) return false;
//鏍￠獙鍦板潃鐮�
var addressCode = idCardNo.substring(0,6);
check = idCardNoUtil.checkAddressCode(addressCode);
if(!check) return false;
//鏍￠獙鏃ユ湡鐮�
var birDayCode = idCardNo.substring(6,14);
check = idCardNoUtil.checkBirthDayCode(birDayCode);
if(!check) return false;
//楠岃瘉鏍℃鐮�
return idCardNoUtil.checkParityBit(idCardNo);
},

formateDateCN: function(day){
var yyyy =day.substring(0,4);
var mm = day.substring(4,6);
var dd = day.substring(6);
return yyyy + '-' + mm +'-' + dd;
},

//鑾峰彇淇℃伅
getIdCardInfo: function(idCardNo){
var idCardInfo = {
gender:"", //鎬у埆
birthday:"" // 鍑虹敓鏃ユ湡(yyyy-mm-dd)
};
if(idCardNo.length==15){
var aday = '19' + idCardNo.substring(6,12);
idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
if(parseInt(idCardNo.charAt(14))%2==0){
idCardInfo.gender=idCardNoUtil.genders.female;
}else{
idCardInfo.gender=idCardNoUtil.genders.male;
}
}else if(idCardNo.length==18){
var aday = idCardNo.substring(6,14);
idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
if(parseInt(idCardNo.charAt(16))%2==0){
idCardInfo.gender=idCardNoUtil.genders.female;
}else{
idCardInfo.gender=idCardNoUtil.genders.male;
}

}
return idCardInfo;
},


getId15:function(idCardNo){
if(idCardNo.length==15){
return idCardNo;
}else if(idCardNo.length==18){
return idCardNo.substring(0,6) + idCardNo.substring(8,17);
}else{
return null;
}
},


getId18: function(idCardNo){
if(idCardNo.length==15){
var id17 = idCardNo.substring(0,6) + '19' + idCardNo.substring(6);
var parityBit = idCardNoUtil.getParityBit(id17);
return id17 + parityBit;
}else if(idCardNo.length==18){
return idCardNo;
}else{
return null;
}
}
};

 
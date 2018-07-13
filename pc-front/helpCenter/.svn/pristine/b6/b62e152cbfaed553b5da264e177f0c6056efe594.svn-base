(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": {               
                        "regex":"none",
                    "alertText":"璇ラ€夐」蹇呭～",
                    "alertTextCheckboxMultiple":"璇烽€夋嫨涓€涓」鐩�",
                    "alertTextCheckboxe":"璇ラ€夐」涓哄繀閫�",
                    "alertTextDateRange":"鏃ユ湡鑼冨洿涓嶅彲绌虹櫧"
                },
                "dateRange":{
                    "regex":"none",
                    "alertText":"鏃犳晥鐨� ",
                    "alertText2":" 鏃ユ湡鑼冨洿"
                },
                "dateTimeRange":{
                    "regex":"none",
                    "alertText":"鏃犳晥鐨� ",
                    "alertText2":" 鏃堕棿鑼冨洿"
                },
                "minSize": {
                    "regex":"none",
                    "alertText":"鏈€灏� ",
                    "alertText2":" 涓瓧绗�"
                },
                "maxSize": {
                    "regex":"none",
                    "alertText":"鏈€澶� ",
                    "alertText2":" 涓瓧绗�"
                },
                "groupRequired": {
                    "regex":"none",
                    "alertText":"鑷冲皯濉啓鍏朵腑涓€椤�"
                },
                "min": {
                    "regex":"none",
                    "alertText":"鏈€灏忓€间负 "
                },
                "max": {
                    "regex":"none",
                    "alertText":"鏈€澶у€间负 "
                },
                "past": {
                    "regex":"none",
                    "alertText":"鏃ユ湡闇€鍦� ",
                    "alertText2":" 涔嬪墠"
                },
                "future": {
                    "regex":"none",
                    "alertText":"鏃ユ湡闇€鍦� ",
                    "alertText2":" 涔嬪悗"
                },  
                "maxCheckbox": {
                    "regex":"none",
                    "alertText":"鏈€澶氶€夋嫨 ",
                    "alertText2":" 涓」鐩�"
                },
                "minCheckbox": {
                    "regex":"none",
                    "alertText":"鏈€灏戦€夋嫨 ",
                    "alertText2":" 涓」鐩�"
                },
                "equals": {
                    "regex":"none",
                    "alertText":"涓ゆ杈撳叆鐨勫瘑鐮佷笉涓€鑷�"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "鏃犳晥鐨勪俊鐢ㄥ崱鍙风爜"
                },
                "phone": {
                    //淇敼楠岃瘉鎵嬫満姝ｅ垯 chenxing
                    "regex":/^0?(13|15|18|14|17)[0-9]{9}$/,
                    "alertText":"鏃犳晥鐨勬墜鏈哄彿鐮�"
                },
                "tel": {
               //   "regex":/^[+]{0,1}(d){1,3}[ ]?([-]?(d){1,12})+$/,
                    "regex":/(^(\d{2,4}[-_锛嶁€擼?)?\d{3,8}([-_锛嶁€擼?\d{3,8})?([-_锛嶁€擼?\d{1,7})?$)|(^0?1[35]\d{9}$)/,
                    "alertText":"鏃犳晥鐨勭數璇濆彿鐮�"
                },
                "phoneOrTel":{
                    "regex":/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3587]\d{9})$)/,
                    "alertText":"鏃犳晥鐨勬敞鍐岀數璇�"
                },
                "email": {
                    "regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText":"鏃犳晥鐨勯偖浠跺湴鍧€"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText":"鏃犳晥鐨勬暣鏁�"
                },
                "number": {
                    "regex": /^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/,
                    "alertText":"鏃犳晥鐨勬暟鍊�"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText":"鏃犳晥鐨勬棩鏈燂紝鏍煎紡蹇呴渶涓� YYYY-MM-DD"
                },
                "ipv4": {
                    "regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
                    "alertText":"鏃犳晥鐨� IP 鍦板潃"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText":"鏃犳晥鐨勭綉鍧€"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText":"鍙兘濉啓鏁板瓧"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText":"鍙兘濉啓鑻辨枃瀛楁瘝"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText":"鍙兘濉啓鏁板瓧涓庤嫳鏂囧瓧姣�"
                },
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    "extraData": "name=eric",
                    "alertText": "姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    "alertTextLoad": "姝ｅ湪纭甯愬彿鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                },
                "ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    "extraData": "name=eric",
                    "alertTextOk": "姝ゅ笎鍙峰悕绉板彲浠ヤ娇鐢�",
                    "alertText": "姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    "alertTextLoad": "姝ｅ湪纭甯愬彿鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                },
                "ajaxNameCall": {
                    "url": "ajaxValidateFieldName",
                    "alertText": "姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    "alertTextOk": "姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                    "alertTextLoad": "姝ｅ湪纭鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                },
                 "ajaxNameCallPhp": {
                        "url": "phpajax/ajaxValidateFieldName.php",
                        "alertText": "姝ゅ悕绉板凡琚叾浠栦汉浣跨敤",
                        "alertTextLoad": "姝ｅ湪纭鍚嶇О鏄惁鏈夊叾浠栦汉浣跨敤锛岃绋嶇瓑銆�"
                    },
                "validate2fields": {
                    "alertText": "璇疯緭鍏� HELLO"
                },
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText":"鏃犳晥鐨勬棩鏈熸牸寮�"
                },
                "dateTimeFormat": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText":"鏃犳晥鐨勬棩鏈熸垨鏃堕棿鏍煎紡",
                    "alertText2":"鍙帴鍙楃殑鏍煎紡锛� ",
                    "alertText3":"mm/dd/yyyy hh:mm:ss AM|PM 鎴� ", 
                    "alertText4":"yyyy-mm-dd hh:mm:ss AM|PM"
                },
                "chinese":{
                    "regex":/^[\u4E00-\u9FA5]+$/,
                    "alertText":"鍙兘濉啓涓枃姹夊瓧"
                },
                "chinaId":{
                    "regex":/^[1-9]\d{5}[1-9]\d{3}(((0[13578]|1[02])(0[1-9]|[12]\d|3[0-1]))|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))(\d{4}|\d{3}[xX])$/,
                    "alertText":"鏃犳晥鐨勮韩浠借瘉鍙风爜"
                },
                "chinaIdLoose":{
                    "regex":/^(\d{18}|\d{15}|\d{17}[xX])$/,
                    "alertText":"鏃犳晥鐨勮韩浠借瘉鍙风爜"
                },
                "chinaZip":{
                    "regex":/^\d{6}$/,
                    "alertText":"鏃犳晥鐨勯偖鏀跨紪鐮�"
                },
                "qq":{
                    "regex":/^[1-9]\d{4,10}$/,
                    "alertText":"鏃犳晥鐨� QQ 鍙风爜"
                },
                "inputText":{
                    "regex":/^[\u4E00-\u9FA5\w\d]+$/,
                    "alertText":"涓嶈兘鍚湁鐗规畩瀛楃"
                },
                "onlyChineseLetter":{
                    "regex":/^[\u4E00-\u9FA5A-Za-z_]$/,
                    "alertText":"鍙兘濉啓涓枃涓庤嫳鏂�"
                },
                "onlySpecifiedCharacter":{
                    "regex": /^[\u4e00-\u9fa5_a-zA-Z0-9\(\)\锛圽锛塡-]{0,40}$/,
                    "alertText":"鍙兘濉啓涓嫳鏂囥€佹暟瀛楀強鈥淿鈥濄€佲€�-鈥濄€佲€滐紙锛夆€濄€佲€�()鈥�"
                }
            };
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
(function($) {
    var methods = {
        init: function(options) {
            
            var form = this;
            if (!form.data('jqv') || form.data('jqv') == null ) {
                methods._saveOptions(form, options);
                $(".formError").live("click", function() {
                    $(this).fadeOut(150, function() {
                        $(this).remove();
                    });
                });
            }
        },
        attach: function(userOptions) {
            var form = this;
            var options;
            if(userOptions)
                options = methods._saveOptions(form, userOptions);
            else
                options = form.data('jqv');
            var validateAttribute = (form.find("[data-validation-engine*=validate]")) ? "data-validation-engine" : "class";
            if (!options.binded) {
                    if (options.bindMethod == "bind"){
                        form.find("[class*=validate]:not([type=checkbox])").not("[type=radio]").not(".datepicker").bind(options.validationEventTrigger, methods._onFieldEvent);
                        form.find("[class*=validate][type=checkbox],[class*=validate][type=radio]").bind("click", methods._onFieldEvent);
                        form.find("[class*=validate][class*=datepicker]").bind(options.validationEventTrigger,{"delay": 300}, methods._onFieldEvent);
                        form.bind("submit", methods._onSubmitEvent);
                    } else if (options.bindMethod == "live") {
                        form.find("[class*=validate]:not([type=checkbox])").not(".datepicker").live(options.validationEventTrigger, methods._onFieldEvent);
                        form.find("[class*=validate][type=checkbox]").live("click", methods._onFieldEvent);
                        form.find("[class*=validate][class*=datepicker]").live(options.validationEventTrigger,{"delay": 300}, methods._onFieldEvent);
                        form.live("submit", methods._onSubmitEvent);
                    }
                options.binded = true;
            }
        },
        detach: function() {
            var form = this;
            var options = form.data('jqv');
            if (options.binded) {
                form.find("[class*=validate]").not("[type=checkbox]").unbind(options.validationEventTrigger, methods._onFieldEvent);
                form.find("[class*=validate][type=checkbox],[class*=validate][type=radio]").unbind("click", methods._onFieldEvent);
                form.unbind("submit", methods.onAjaxFormComplete);
                form.find("[class*=validate]").not("[type=checkbox]").die(options.validationEventTrigger, methods._onFieldEvent);
                form.find("[class*=validate][type=checkbox]").die("click", methods._onFieldEvent);
                form.die("submit", methods.onAjaxFormComplete);
                form.removeData('jqv');
            }
        },
        validate: function() {
            return methods._validateFields(this);
        },
        validateField: function(el) {
            var options = $(this).data('jqv');
            return methods._validateField($(el), options);
        },
        validateform: function() {
            return methods._onSubmitEvent.call(this);
        },
        updatePromptsPosition: function() {
            var form = this.closest('form');
            var options = form.data('jqv');
            form.find('[class*=validate]').not(':hidden').not(":disabled").each(function(){
                var field = $(this);

                var prompt = methods._getPrompt(field);
                var promptText = $(prompt).find(".formErrorContent").html();

                if(prompt) methods._updatePrompt(field, $(prompt), promptText, undefined, false, options);
            })
        },
        showPrompt: function(promptText, type, promptPosition, showArrow) {
            var form = this.closest('form');
            var options = form.data('jqv');
            if(!options) {options = methods._saveOptions(this, options);}
            if(promptPosition){
                options.promptPosition=promptPosition;}
            options.showArrow = showArrow==true;

            methods._showPrompt(this, promptText, type, false, options);
        },
        hidePrompt: function() {
            var promptClass =  "."+ methods._getClassName($(this).attr("id")) + "formError";
            $(promptClass).fadeTo("fast", 0.3, function() {
                $(this).remove();
            });
        },
        hide: function() {
            var closingtag;
            if($(this).is("form")){
                closingtag = "parentForm"+$(this).attr('id');
            }else{
                closingtag = $(this).attr('id') +"formError";
            }
            $('.'+closingtag).fadeTo("fast", 0.3, function() {
                $(this).remove();
            });
        },
        hideAll: function() {
            $('.formError').fadeTo("fast", 0.3, function() {
                $(this).remove();
            });
        },
        _onFieldEvent: function(event) {
            var field = $(this);
            var form = field.closest('form');
            var options = form.data('jqv');
            // validate the current field
            window.setTimeout(function() {
                methods._validateField(field, options);
            }, (event.data) ? event.data.delay : 0);
            
        },
        _onSubmitEvent: function() {
            var form = $(this);
            var options = form.data('jqv');
            var r=methods._validateFields(form, true);
        
            if (r && options.ajaxFormValidation) {
                methods._validateFormWithAjax(form, options);
                return false;
            }

            if(options.onValidationComplete) {
                options.onValidationComplete(form, r);
                return false;
            }
            return r;
        },
        _checkAjaxStatus: function(options) {
            var status = true;
            $.each(options.ajaxValidCache, function(key, value) {
                if (!value) {
                    status = false;
                    // break the each
                    return false;
                }
            });
            return status;
        },
        _validateFields: function(form, skipAjaxValidation) {
            var options = form.data('jqv');
            var errorFound = false;
            form.trigger("jqv.form.validating");
            form.find('[class*=validate]').not(':hidden').not(":disabled").each( function() {
                var field = $(this);
                errorFound |= methods._validateField(field, options, skipAjaxValidation);
            });
            form.trigger("jqv.form.result", [errorFound]);
            if (errorFound) {
                if (options.scroll) {
                    var destination = Number.MAX_VALUE;
                    var fixleft = 0;
                    var lst = $(".formError:not('.greenPopup')");

                    for (var i = 0; i < lst.length; i++) {
                        var d = $(lst[i]).offset().top;
                        if (d < destination){
                            destination = d;
                            fixleft = $(lst[i]).offset().left;
                        }
                    }
                    if (!options.isOverflown)
                        $("html:not(:animated),body:not(:animated)").animate({
                            scrollTop: destination,
                            scrollLeft: fixleft
                        }, 1100);
                    else {
                        var overflowDIV = $(options.overflownDIV);
                        var scrollContainerScroll = overflowDIV.scrollTop();
                        var scrollContainerPos = -parseInt(overflowDIV.offset().top);

                        destination += scrollContainerScroll + scrollContainerPos - 5;
                        var scrollContainer = $(options.overflownDIV + ":not(:animated)");

                        scrollContainer.animate({
                            scrollTop: destination
                        }, 1100);

                        $("html:not(:animated),body:not(:animated)").animate({
                            scrollTop: overflowDIV.offset().top,
                            scrollLeft: fixleft
                        }, 1100);
                    }
                }
                return false;
            }
            return true;
        },
        _validateFormWithAjax: function(form, options) {
            var data = form.serialize();
            var url = (options.ajaxFormValidationURL) ? options.ajaxFormValidationURL : form.attr("action");
            $.ajax({
                type: "GET",
                url: url,
                cache: false,
                dataType: "json",
                data: data,
                form: form,
                methods: methods,
                options: options,
                beforeSend: function() {
                    return options.onBeforeAjaxFormValidation(form, options);
                },
                error: function(data, transport) {
                    methods._ajaxError(data, transport);
                },
                success: function(json) {
                    if (json !== true) {
                        var errorInForm=false;
                        for (var i = 0; i < json.length; i++) {
                            var value = json[i];
                            var errorFieldId = value[0];
                            var errorField = $($("#" + errorFieldId)[0]);
                            if (errorField.length == 1) {
                                var msg = value[2];
                                if (value[1] == true) {

                                    if (msg == ""  || !msg){
                                        methods._closePrompt(errorField);
                                    } else {
                                        if (options.allrules[msg]) {
                                            var txt = options.allrules[msg].alertTextOk;
                                            if (txt)
                                                msg = txt;
                                        }
                                        methods._showPrompt(errorField, msg, "pass", false, options, true);
                                    }

                                } else {
                                    errorInForm|=true;
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertText;
                                        if (txt)
                                            msg = txt;
                                    }
                                    methods._showPrompt(errorField, msg, "", false, options, true);
                                }
                            }
                        }
                        options.onAjaxFormComplete(!errorInForm, form, json, options);
                    } else
                        options.onAjaxFormComplete(true, form, "", options);
                }
            });

        },
        _validateField: function(field, options, skipAjaxValidation) {
            if (!field.attr("id"))
                $.error("jQueryValidate: an ID attribute is required for this field: " + field.attr("name") + " class:" +
                field.attr("class"));
            var rulesParsing = field.attr('class');
            var getRules = /validate\[(.*)\]/.exec(rulesParsing);
            if (!getRules)
                return false;
            var str = getRules[1];
            var rules = str.split(/\[|,|\]/);
            var isAjaxValidator = false;
            var fieldName = field.attr("name");
            var promptText = "";
            var required = false;
            options.isError = false;
            options.showArrow = true;
            for (var i = 0; i < rules.length; i++) {
                var errorMsg = undefined;
                switch (rules[i]) {

                    case "required":
                        required = true;
                        errorMsg = methods._required(field, rules, i, options);
                        break;
                    case "custom":
                        errorMsg = methods._customRegex(field, rules, i, options);
                        break;
                    case "groupRequired":
                        var classGroup = "[class*=" +rules[i + 1] +"]"; 
                        var firstOfGroup = field.closest("form").find(classGroup).eq(0);
                        if(firstOfGroup[0] != field[0]){
                            methods._validateField(firstOfGroup, options, skipAjaxValidation)
                            options.showArrow = true;
                            continue;
                        };
                        errorMsg = methods._groupRequired(field, rules, i, options);
                        if(errorMsg) required = true;
                        options.showArrow = false;
                        break;
                    case "ajax":
                        if(!skipAjaxValidation){
                            methods._ajax(field, rules, i, options);
                            isAjaxValidator = true;
                        }
                        break;
                    case "minSize":
                        errorMsg = methods._minSize(field, rules, i, options);
                        break;
                    case "maxSize":
                        errorMsg = methods._maxSize(field, rules, i, options);
                        break;
                    case "min":
                        errorMsg = methods._min(field, rules, i, options);
                        break;
                    case "max":
                        errorMsg = methods._max(field, rules, i, options);
                        break;
                    case "past":
                        errorMsg = methods._past(field, rules, i, options);
                        break;
                    case "future":
                        errorMsg = methods._future(field, rules, i, options);
                        break;
                    case "dateRange":
                        errorMsg = methods._dateRange(field, rules, i, options);
                        field = $($("input[name='" + fieldName + "']"));
                        break;
                    case "dateTimeRange":
                        errorMsg = methods._dateTimeRange(field, rules, i, options);
                        field = $($("input[name='" + fieldName + "']"));
                        break;
                    case "maxCheckbox":
                        errorMsg = methods._maxCheckbox(field, rules, i, options);
                        field = $($("input[name='" + fieldName + "']"));
                        break;
                    case "minCheckbox":
                        errorMsg = methods._minCheckbox(field, rules, i, options);
                        field = $($("input[name='" + fieldName + "']"));
                        break;
                    case "equals":
                        errorMsg = methods._equals(field, rules, i, options);
                        break;
                    case "funcCall":
                        errorMsg = methods._funcCall(field, rules, i, options);
                        break;

                    default:
                }
                if (errorMsg !== undefined) {
                    promptText += errorMsg;
                    options.isError = true;
                    break;                  
                }
            }
            if(!required){
                if(field.val() == "") options.isError = false;
            }           
            var fieldType = field.attr("type");

            if ((fieldType == "radio" || fieldType == "checkbox") && $("input[name='" + fieldName + "']").size() > 1) {
                field = $($("input[name='" + fieldName + "'][type!=hidden]:first"));
                options.showArrow = false;
            }
            if (options.isError){
                methods._showPrompt(field, promptText, "", false, options);
            }else{
                if(promptText=="" || promptText==null){
                 methods._showPrompt(field, promptText, "pass", false, options);
                }else{
                 methods._closePrompt(field, options);  
                }
            }
            field.trigger("jqv.field.result", [field, options.isError, promptText]);
            return options.isError;
        },
        _required: function(field, rules, i, options) {
            switch (field.attr("type")) {
                case "text":
                case "password":
                case "textarea":
                case "file":
                default:
                    if (!field.val())
                        return options.allrules[rules[i]].alertText;
                    break;
                case "radio":
                case "checkbox":
                    var name = field.attr("name");
                    if ($("input[name='" + name + "']:checked").size() == 0) {
                        if ($("input[name='" + name + "']").size() == 1)
                            return options.allrules[rules[i]].alertTextCheckboxe;
                        else
                            return options.allrules[rules[i]].alertTextCheckboxMultiple;
                    }
                    break;
                case "dateTimeRange":
                case "dateRange":
                    var name = field.attr("name");
                    var dateRangeFields = $("input[name='" + name + "']");
                    if (!dateRangeFields[0].val() || !dateRangeFields[1].val())
                        return options.allrules[rules[i]].alertTextDateRange;
                    break;
                case "select-one":
                    if (!field.val())
                        return options.allrules[rules[i]].alertText;
                    break;
                case "select-multiple":
                    if (!field.find("option:selected").val())
                        return options.allrules[rules[i]].alertText;
                    break;
            }
        },
        _groupRequired: function(field, rules, i, options) {
            var classGroup = "[class*=" +rules[i + 1] +"]";
            var isValid = false;
            field.closest("form").find(classGroup).each(function(){
                if(!methods._required($(this), rules, i, options)){
                    isValid = true;
                    return false;
                }
            })
            
            if(!isValid) return options.allrules[rules[i]].alertText;
        },
        _customRegex: function(field, rules, i, options) {
            var customRule = rules[i + 1];
            var rule = options.allrules[customRule];
            if(!rule) {
                alert("jqv:custom rule not found "+customRule);
                return;
            }
            var ex=rule.regex;
            if(!ex) {
                alert("jqv:custom regex not found "+customRule);
                return;
            }
            var pattern = new RegExp(ex);
            if (!pattern.test(field.val()))
                return options.allrules[customRule].alertText;
        },
        _funcCall: function(field, rules, i, options) {
            var functionName = rules[i + 1];
            var fn = window[functionName];
            if (typeof(fn) == 'function')
                return fn(field, rules, i, options);

        },
        _equals: function(field, rules, i, options) {
            var equalsField = rules[i + 1];

            if (field.val() != $("#" + equalsField).val())
                return options.allrules.equals.alertText;
        },
        _maxSize: function(field, rules, i, options) {
            var max = rules[i + 1];
            var len = field.val().length;

            if (len > max) {
                var rule = options.allrules.maxSize;
                return rule.alertText + max + rule.alertText2;
            }
        },
        _minSize: function(field, rules, i, options) {
            var min = rules[i + 1];
            var len = field.val().length;

            if (len < min) {
                var rule = options.allrules.minSize;
                return rule.alertText + min + rule.alertText2;
            }
        },
        _min: function(field, rules, i, options) {
            var min = parseFloat(rules[i + 1]);
            var len = parseFloat(field.val());

            if (len < min) {
                var rule = options.allrules.min;
                if (rule.alertText2) return rule.alertText + min + rule.alertText2;
                return rule.alertText + min;
            }
        },
        _max: function(field, rules, i, options) {
            var max = parseFloat(rules[i + 1]);
            var len = parseFloat(field.val());

            if (len >max ) {
                var rule = options.allrules.max;
                if (rule.alertText2) return rule.alertText + max + rule.alertText2;
                return rule.alertText + max;
            }
        },
        _past: function(field, rules, i, options) {
            var p=rules[i + 1];
            var pdate = (p.toLowerCase() == "now")? new Date():methods._parseDate(p);
            var vdate = methods._parseDate(field.val());

            if (vdate < pdate ) {
                var rule = options.allrules.past;
                if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                return rule.alertText + methods._dateToString(pdate);
            }
        },
        _future: function(field, rules, i, options) {
            var p=rules[i + 1];
            var pdate = (p.toLowerCase() == "now")? new Date():methods._parseDate(p);
            var vdate = methods._parseDate(field.val());

            if (vdate > pdate ) {
                var rule = options.allrules.future;
                if (rule.alertText2) return rule.alertText + methods._dateToString(pdate) + rule.alertText2;
                return rule.alertText + methods._dateToString(pdate);
            }
        },
        _isDate: function (value) {
            var dateRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            if (dateRegEx.test(value)) {
                return true;
            }
            return false;
        },
        _isDateTime: function (value){
            var dateTimeRegEx = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            if (dateTimeRegEx.test(value)) {
                return true;
            }
            return false;
        },
        _dateCompare: function (start, end) {
            return (new Date(start.toString()) < new Date(end.toString()));
        },
        _dateRange: function (field, rules, i, options) {
            var name = field.attr("name");
            if ($("input[name='" + name + "']").length == 2) {
                var inDate1 = $("input[name='" + name + "']")[0].value;
                var inDate2 = $("input[name='" + name + "']")[1].value;
                if (methods._isDate(inDate1) && methods._isDate(inDate2)) {
                    if (!methods._dateCompare(inDate1, inDate2)) {
                        return "鏃犳晥鐨勬棩鏈熻寖鍥�";
                    }
                } else {
                    return "鏃犳晥鐨勬棩鏈熻寖鍥�";
                }
            } else {
                return "鏃犳晥鐨勬棩鏈熻寖鍥�";
            }
        },
        _dateTimeRange: function (field, rules, i, options) {
            var name = field.attr("name");
            if ($("input[name='" + name + "']").length == 2) {
                var inDate1 = $("input[name='" + name + "']")[0].value;
                var inDate2 = $("input[name='" + name + "']")[1].value;
                if (methods._isDateTime(inDate1) && methods._isDateTime(inDate2)) {
                    if (!methods._dateCompare(inDate1, inDate2)) {
                        return "鏃犳晥鐨勬棩鏈熸椂闂磋寖鍥�";
                    }
                } else {
                    return "鏃犳晥鐨勬棩鏈熸椂闂磋寖鍥�";
                }
            } else {
                return "鏃犳晥鐨勬棩鏈熸椂闂磋寖鍥�";
            }
        },
        _maxCheckbox: function(field, rules, i, options) {

            var nbCheck = rules[i + 1];
            var groupname = field.attr("name");
            var groupSize = $("input[name='" + groupname + "']:checked").size();
            if (groupSize > nbCheck) {
                options.showArrow = false;
                if (options.allrules.maxCheckbox.alertText2) return options.allrules.maxCheckbox.alertText + " " + nbCheck + " " + options.allrules.maxCheckbox.alertText2;
                return options.allrules.maxCheckbox.alertText;
            }
        },
        _minCheckbox: function(field, rules, i, options) {

            var nbCheck = rules[i + 1];
            var groupname = field.attr("name");
            var groupSize = $("input[name='" + groupname + "']:checked").size();
            if (groupSize < nbCheck) {
                options.showArrow = false;
                return options.allrules.minCheckbox.alertText + " " + nbCheck + " " +
                options.allrules.minCheckbox.alertText2;
            }
        },
        _ajax: function(field, rules, i, options) {
            var errorSelector = rules[i + 1];
            var rule = options.allrules[errorSelector];
            var extraData = rule.extraData;
            var extraDataDynamic = rule.extraDataDynamic;

            if (!extraData)
                extraData = "";

            if (extraDataDynamic) {
              var tmpData = [];
              var domIds = String(extraDataDynamic).split(",");
              for (var i = 0; i < domIds.length; i++) {
                var id = domIds[i];
                if ($(id).length) {
                  var inputValue = field.closest("form").find(id).val();
                  var keyValue = id.replace('#', '') + '=' + escape(inputValue);
                  tmpData.push(keyValue);
                }
              }
              extraDataDynamic = tmpData.join("&");
            } else {
              extraDataDynamic = "";              
            }
            if (!options.isError) {
                $.ajax({
                    type: "GET",
                    url: rule.url,
                    cache: false,
                    dataType: "json",
                    data: "fieldId=" + field.attr("id") + "&fieldValue=" + field.val() + "&extraData=" + extraData + "&" + extraDataDynamic,
                    field: field,
                    rule: rule,
                    methods: methods,
                    options: options,
                    beforeSend: function() {
                        var loadingText = rule.alertTextLoad;
                        if (loadingText)
                            methods._showPrompt(field, loadingText, "load", true, options);
                    },
                    error: function(data, transport) {
                        methods._ajaxError(data, transport);
                    },
                    success: function(json) {
                        var errorFieldId = json[0];
                        var errorField = $($("#" + errorFieldId)[0]);
                        if (errorField.length == 1) {
                            var status = json[1];
                            var msg = json[2];
                            if (!status) {
                                options.ajaxValidCache[errorFieldId] = false;
                                options.isError = true;
                                if(msg) {
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertText;
                                        if (txt)
                                            msg = txt;
                                    }
                                }
                                else
                                    msg = rule.alertText;
                                methods._showPrompt(errorField, msg, "", true, options);
                            } else {
                                if (options.ajaxValidCache[errorFieldId] !== undefined)
                                    options.ajaxValidCache[errorFieldId] = true;
                                if(msg) {
                                    if (options.allrules[msg]) {
                                        var txt = options.allrules[msg].alertTextOk;
                                        if (txt)
                                            msg = txt;
                                    }
                                }
                                else
                                    msg = rule.alertTextOk;                                
                                if (msg)
                                    methods._showPrompt(errorField, msg, "pass", true, options);
                                else
                                    methods._closePrompt(errorField);
                            }
                        }
                    }
                });
            }
        },
        _ajaxError: function(data, transport) {
            if(data.status == 0 && transport == null)
                alert("The page is not served from a server! ajax call failed");
            else if(typeof console != "undefined")
                console.log("Ajax error: " + data.status + " " + transport);
        },
        _dateToString: function(date) {
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        },
        _parseDate: function(d) {
            var dateParts = d.split("-");
            if(dateParts==d)
                dateParts = d.split("/");
            return new Date(dateParts[0], (dateParts[1] - 1) ,dateParts[2]);
        },
        _showPrompt: function(field, promptText, type, ajaxed, options, ajaxform) {
            var prompt = methods._getPrompt(field);
            if(ajaxform) prompt = false;
            if (prompt)
                methods._updatePrompt(field, prompt, promptText, type, ajaxed, options);
            else
                methods._buildPrompt(field, promptText, type, ajaxed, options);
        },
        _buildPrompt: function(field, promptText, type, ajaxed, options) {
            var prompt = $('<div>');
            prompt.addClass(methods._getClassName(field.attr("id")) + "formError");
            if(field.is(":input")) prompt.addClass("parentForm"+methods._getClassName(field.parents('form').attr("id")));
            prompt.addClass("formError");
            switch (type) {
                case "pass":
                    prompt.addClass("greenPopup");
                    break;
                case "load":
                    prompt.addClass("blackPopup");
            }
            if (ajaxed)
                prompt.addClass("ajaxed");
            var promptContent = $('<div>').addClass("formErrorContent").html(promptText).appendTo(prompt);
            if (options.showArrow) {
                var arrow = $('<div>').addClass("formErrorArrow");
                switch (options.promptPosition) {
                    case "bottomLeft":
                    case "bottomRight":
                        prompt.find(".formErrorContent").before(arrow);
                        arrow.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;
                    case "topLeft":
                    case "topRight":
                        arrow.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        prompt.append(arrow);
                        break;
                }
            }
            if (options.isOverflown){
                field.after(prompt);
                }
            else{
               field.after(prompt)
            }
            var pos = methods._calculatePosition(field, prompt, options);
            prompt.css({
                "top": pos.callerTopPosition,
                "left": pos.callerleftPosition,
                "marginTop": pos.marginTopSize,
                "opacity": 0
            });
            return prompt.animate({
                "opacity": 0.87
            });
        },
        _updatePrompt: function(field, prompt, promptText, type, ajaxed, options) {
            
            if (prompt) {
                if (type == "pass"){
                    prompt.addClass("greenPopup");
                    }
                else{
                    prompt.removeClass("greenPopup");
                    }

                if (type == "load"){
                    prompt.addClass("blackPopup");
                    }
                else{
                    prompt.removeClass("blackPopup");
                    }

                if (ajaxed){
                    prompt.addClass("ajaxed");
                    }
                else{
                    prompt.removeClass("ajaxed");
                    }
                prompt.find(".formErrorContent").html(promptText);

                var pos = methods._calculatePosition(field, prompt, options);
                prompt.animate({
                    "top": pos.callerTopPosition,
                    "left": pos.callerleftPosition,
                    "marginTop": pos.marginTopSize
                });
            }
        },
        _closePrompt: function(field) {

            var prompt = methods._getPrompt(field);
            if (prompt){
                prompt.fadeTo("fast", 0, function() {
                    prompt.remove();
                });
                }
        },
        closePrompt: function(field) {
            return methods._closePrompt(field);
        },
          _getPrompt: function(field) {
            var className = field.attr("id").replace(":","_") + "formError";
            var match = $("." + methods._escapeExpression(className))[0];
            if (match)
              return $(match);
          },
          _escapeExpression: function (selector) {
            return selector.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
          },
        _calculatePosition: function(field, promptElmt, options) {
            var promptTopPosition, promptleftPosition, marginTopSize;
            var fieldWidth = field.width();
            var promptHeight = promptElmt.height();
            var overflow = options.isOverflown;
            if (overflow) {
                promptTopPosition = promptleftPosition = 0;
                marginTopSize = -promptHeight;
            } else {
                var offset = field.offset();
                marginTopSize = 0;
                promptTopPosition = offset.top;
                promptleftPosition = offset.left;
               
            }

            switch (options.promptPosition) {

                default:
                case "topRight":
                    if (overflow)
                        promptleftPosition += fieldWidth - 30;
                    else {
                        promptleftPosition += fieldWidth - 30;
                        promptTopPosition += -promptHeight -2;
                    }
                    break;
                case "topLeft":
                    promptTopPosition += -promptHeight - 10;
                    break;
                case "centerRight":
                    if (field.parents("form").attr("id")=="memberAddressUpdateForm"){
                    var tdoffset=field.parents("form").offset();
                    promptTopPosition+=-tdoffset.top;
                    promptleftPosition+=-tdoffset.left+fieldWidth + 13
                    }else{ 
                    promptleftPosition += fieldWidth + 13;
                    }
                    break;
                case "bottomLeft":
                    promptTopPosition = promptTopPosition + field.height() + 15;
                    break;
                case "bottomRight":
                    promptleftPosition += fieldWidth - 30;
                    promptTopPosition += field.height() + 5;
            }

            return {
                "callerTopPosition": promptTopPosition + "px",
                "callerleftPosition": promptleftPosition + "px",
                "marginTopSize": marginTopSize + "px"
            };
        },
        _saveOptions: function(form, options) {
            if ($.validationEngineLanguage)
                var allRules = $.validationEngineLanguage.allRules;
            else
                $.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page");
            $.validationEngine.defaults.allrules = allRules;
            var userOptions = $.extend({},$.validationEngine.defaults, options);
            form.data('jqv', userOptions);
            return userOptions;
        },
        _getClassName: function(className) {
            return className.replace(":","_").replace(".","_");
        }
    };
    $.fn.validationEngine = function(method) {
        var form = $(this);
          if(!form[0]) return false;  // stop here if the form does not exist
          
        if (typeof(method) == 'string' && method.charAt(0) != '_' && methods[method]) {
            if(method != "showPrompt" && method != "hidePrompt" && method != "hide" && method != "hideAll") 
                methods.init.apply(form);
            return methods[method].apply(form, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method == 'object' || !method) {
            methods.init.apply(form, arguments);
            return methods.attach.apply(form);
        } else {
            $.error('Method ' + method + ' does not exist in jQuery.validationEngine');
        }
    };
    $.validationEngine= {defaults:{
        validationEventTrigger: "blur",
        scroll: false,
        promptPosition: "centerRight",
        bindMethod:"bind",
        inlineAjax: false,
        ajaxFormValidation: false,
        ajaxFormValidationURL: false,
        onAjaxFormComplete: $.noop,
        onBeforeAjaxFormValidation: $.noop,
        onValidationComplete: false,
        isOverflown: false,
        overflownDIV: "",
        binded: false,
        showArrow: true,
        isError: false,
        ajaxValidCache: {}

    }}
})(jQuery);
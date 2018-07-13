define(['jquery'], function($) {

    /*
    	var obj = {
    		title: '左上角标题',
    		content: '弹框内容',
    		link: '点击确定跳转链接',
    		type: '弹框类型，不传为alert，传confirm带有取消按钮',
    		callback: 'function类型， 点击确认回调函数'
    	}
    */

    var callback = null;

    var dialog = function(obj) {

        if (typeof obj != 'object' || $('#jsPrompt').length) return;

        var settIng = {
            title: obj.title || '提示',
            content: obj.content || '',
            link: obj.link || 'javascript:void(0);',
            dn: obj.type != 'confirm' ? 'dn' : ''
        }

        var str = '<div id="jsPrompt">' +
            '<div class="prompt">' +
            '<div class="top">' + settIng.title + '</div>' +
            '<div class="content">' +
            '<div class="txt">' + settIng.content + '</div>' +
            '</div>' +
            '<div class="pormp_set_box"><a href="javascript:void(0);" class="' + settIng.dn + ' close cancelClose">取消</a>' +
            '<a href="' + settIng.link + '" class="close subClose">确定</a></div>' +
            '</div>' +
            '</div>';

        $('body').append(str);

        callback = obj.callback;

    }

    $('body').on('click', '.subClose', function(even) {
        $('#jsPrompt').remove();
        typeof callback == 'function' && callback();
    });

    $('body').on('click', '.cancelClose', function() {
        $('#jsPrompt').remove();
        return false;
    });

    return dialog;

});

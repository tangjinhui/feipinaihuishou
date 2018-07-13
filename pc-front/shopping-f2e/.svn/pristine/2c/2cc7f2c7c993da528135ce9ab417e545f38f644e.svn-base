require(['jquery', 'handlebars', 'getUrlParam', 'dialog', 'header'], function($, Handlebars, getUrlParam, dialog) {
    var articleId = getUrlParam('articleId');
    if (!articleId) return false;
    $.ajax({
        url: '/front/articleInfo',
        type: 'get',
        dataType: 'json',
        data: { articleId: articleId },
        success: function(res) {
            if (res.code == '00') {
                var articleContentTemplate = Handlebars.compile($('#article-content-template').html());
                $('.gongcont').html(articleContentTemplate(res.data));
            } else {
                dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
            }
        },
        error: function() {
            dialog({ title: '系统提示', content: '网络繁忙，请您稍后重试' });
        }
    });
});

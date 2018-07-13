require(['jquery', 'dialog', 'modules/goodsPrice', 'header'], function($, dialog, loadGoodsPrice) {

    $('#js_show .show_box').hover(function() {
        $(this).find('.black').stop().fadeToggle('500');
    });
    //获取实时价格
    loadGoodsPrice();
});

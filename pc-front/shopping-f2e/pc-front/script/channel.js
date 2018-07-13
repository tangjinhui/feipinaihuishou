require(['jquery', 'handlebars', 'swiper', 'modules/goodsPrice', 'lazyLoad', 'header'], function($, Handlebars, Swiper, loadGoodsPrice) {

    if (typeof page_data !== 'object') return;

    Handlebars.registerHelper("imgConf", function(imgUrl, id) {
        return img_domain_data[id % img_domain_data.length] + '/' + imgUrl;
    });

    Handlebars.registerHelper("formatPrice", function(price) {
        if (!price) {
            return '';
        }
        return parseFloat(price).toFixed(2);
    });

    //焦点图
    if (page_data.focusAds.length) {
        var focusTemp = Handlebars.compile($("#focus-template").html());
        $('#banner').html(focusTemp(page_data));
        $('.channel_focus').removeClass('dn');
    } else {
        $('.channel_focus').addClass('dn');
    }

    if (page_data.focusAds.length > 1) {
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: false,
            paginationMouseoverControl: true,
            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction: false,
            speed: 600
        });
    }

    var itemTemp = Handlebars.compile($("#item-template").html());

    //精选商品
    if (page_data.goodsList.length) {
        $('#goodsItem').html(itemTemp(page_data));
        $('.noGoodsItem').addClass('dn');
        //获取实时价格
        loadGoodsPrice();
    } else {
        $('.noGoodsItem').removeClass('dn');
    }

    $('.product li').on('mouseenter', function() {
        $(this).addClass('active');
    }).on('mouseleave', function() {
        $(this).removeClass('active');
    });

    $("[data-original]").lazyload({
        effect: "fadeIn",
        load: function() {
            $(this).removeClass('img_loading');
        },
        threshold: 200
    });

    //'返回顶部'
    $(window).on('scroll', function(){
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollT >= 200){
            $('.fr_menuv').removeClass('dn');
        }else{
            $('.fr_menuv').addClass('dn');
        }
    });
    $(".fr_menuv a").click(function(){
        $("html,body").animate({scrollTop:0}); 
    });

});

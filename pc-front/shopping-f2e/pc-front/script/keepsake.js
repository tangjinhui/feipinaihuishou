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
        $('.jnb_focus').removeClass('dn');
    } else {
        $('.jnb_focus').addClass('dn');
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

    var featuredItemsTemp = Handlebars.compile($("#featuredItems-template").html());

    //精选项目
    if (page_data.featuredItems.length) {
        //$('#featured').show();
        $('#featuredItems').html(featuredItemsTemp(page_data));
    } else {
        //$('#featured').hide();
    }

    var hotsGoodsTemp = Handlebars.compile($("#hotsGoods-template").html());

    //热销商品
    if (page_data.goodsList.length) {
        $('#hotsGoods').html(hotsGoodsTemp(page_data));
        //获取实时价格
        loadGoodsPrice();
    } else {
        $('#hotsGoods').html('暂无纪念币商品');
    }

    var rightAdsTemp = Handlebars.compile($("#rightAds-template").html());
    $('#rightAds').html(rightAdsTemp(page_data));

    $('#change_content').on('click', function() {
        $('#content').is(':visible') ? $(this).html('展开') : $(this).html('收起');
        $(this).toggleClass("toggle_on");
        $('#content').slideToggle();
    });

    $(".leftsidebar_box dt").on('click', function() {
        var parent = $(this).parent();
        parent.find('dd.sec_dd').slideToggle();
        parent.find('dd.first_dd').slideToggle();
        if ($(this).find('span').hasClass('on')) {
            $(this).find('span').removeClass('on');
        } else {
            $(this).find('span').addClass('on');
        }
    });

    $("[data-original]").lazyload({
        effect: "fadeIn",
        load: function() {

            $(this).removeClass('img_loading');

        },
        threshold: 200
    });

    //获取文档滚动距离
    $(window).on('scroll', function() {
        var scrollT = $(document).scrollTop();
        var jxTop = $('#featured').offset().top - 30;
        var rxTop = $('.jnb_cp').offset().top - 60;
        if (scrollT <= jxTop) {
            $('.fr_menuv').addClass('dn');
        } else if (scrollT >= jxTop && scrollT < rxTop) {
            $('.fr_menuv').removeClass('dn');
            $('#jxa').addClass('select').siblings().removeClass('select');
        } else if (scrollT >= rxTop) {
            $('.fr_menuv').removeClass('dn');
            $('#rxa').addClass('select').siblings().removeClass('select');
        }
    });

});

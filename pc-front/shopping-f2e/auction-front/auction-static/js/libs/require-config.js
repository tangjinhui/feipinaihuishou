
require.config({

    baseUrl: '/script',

    paths: {
        'jquery': 'http://static.ecgci.com/js/libs/jquery-1.11.1',
        'handlebars': 'http://static.ecgci.com/js/libs/handlebars-v4.0.11',
        'form-valid': 'http://static.ecgci.com/js/libs/form-valid',
        'base64': 'http://static.ecgci.com/js/libs/jquery.base64',
        'swiper': 'http://static.ecgci.com/js/libs/swiper',
        'lazyLoad': 'http://static.ecgci.com/js/libs/jquery.lazyload',
        'timer': 'http://static.ecgci.com/js/libs/jquery.timer2',
        'limitPage': 'http://static.ecgci.com/js/libs/jquery.simplePagination',
        'distpicker-data': 'http://static.ecgci.com/js/libs/distpicker.data',
        'distpicker': 'http://static.ecgci.com/js/libs/distpicker',
        'plupload': 'http://static.ecgci.com/js/libs/plupload.full.min',
        'idcard-valid': 'http://static.ecgci.com/js/libs/idcard-valid',
        'dialog': 'http://static.ecgci.com/js/libs/dialog',
        'getCookie': 'http://static.ecgci.com/js/libs/getCookie',
        'getUrlParam': 'http://static.ecgci.com/js/libs/getUrlParam',
        'header': 'http://static.ecgci.com/js/libs/header',
        'postMessage': 'http://static.ecgci.com/js/libs/jquery.postmessage',
        'mini_login': 'http://static.ecgci.com/js/libs/mini_login',
        'autocomplete': 'http://static.ecgci.com/js/libs/autocomplete-v1.1',
        'jquery-migrate': 'http://static.ecgci.com/js/libs/jquery-migrate-1.2.1.min',
        'setCookie': 'http://static.ecgci.com/js/libs/setCookie',
        'jqzoom': 'http://static.ecgci.com/js/libs/jquery.jqzoom',
        'jdMarquee': 'http://static.ecgci.com/js/libs/jdMarquee',
        'avalon': 'http://static.ecgci.com/js/libs/avalon',
        'json2': 'http://static.ecgci.com/js/libs/json2'
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'avalon': {
            exports: 'avalon'
        },
        'form-valid': {
            deps: ['jquery'],
            exports: '$.form'
        },
        'base64': {
            deps: ['jquery'],
            exports: '$.base64'
        },
        'lazyLoad': {
            deps: ['jquery']
        },
        'limitPage': ['jquery'],
        'distpicker': {
            deps: ['jquery','distpicker-data']
        },
        'plupload':{
            exports: 'plupload'
        },
        'idcard-valid':{
            exports: 'Idvalid'
        },
        'postMessage': {
            deps: ['jquery'],
            exports: '$.postMessage'
        },
        'sina_share': {
            deps: ['jquery']
        },
        'autocomplete': {
            deps: ['jquery','jquery-migrate'],
            exports: 'autocomplete'
        },'jqzoom': {
            deps: ['jquery']
        },
        'jdMarquee': {
            deps: ['jquery']
        },
        'jquery-migrate':{
            deps: ['jquery']
        },'timer': {
            deps: ['jquery']
        }
    }
});
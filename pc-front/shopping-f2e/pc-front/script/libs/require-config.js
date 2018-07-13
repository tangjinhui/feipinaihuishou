require.config({

    baseUrl: '/script',

    paths: {
        'modules': './modules',
        'member': './member',
        'jquery': 'http://static.ecgci.com/js/libs/jquery-1.11.1',
        'handlebars': 'http://static.ecgci.com/js/libs/handlebars-v4.0.11',
        'form-valid': 'http://static.ecgci.com/js/libs/form-valid',
        'base64': 'http://static.ecgci.com/js/libs/jquery.base64',
        'swiper': 'http://static.ecgci.com/js/libs/swiper',
        'lazyLoad': 'http://static.ecgci.com/js/libs/jquery.lazyload',
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
        'sina_share': 'http://static.ecgci.com/js/libs/sina_share',
        'jqzoom': 'http://static.ecgci.com/js/libs/jquery.jqzoom',
        'jdMarquee': 'http://static.ecgci.com/js/libs/jdMarquee',
        'json2': 'http://static.ecgci.com/js/libs/json2',
		'code128': 'http://static.ecgci.com/js/libs/code128',
		'qrcode': 'http://static.ecgci.com/js/libs/qrcode'
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
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
            deps: ['jquery', 'distpicker-data']
        },
        'plupload': {
            exports: 'plupload'
        },
        'idcard-valid': {
            exports: 'Idvalid'
        },
        'postMessage': {
            deps: ['jquery'],
            exports: '$.postMessage'
        },
        'autocomplete': {
            deps: ['jquery', 'jquery-migrate'],
            exports: 'autocomplete'
        },
        'jquery-migrate': {
            deps: ['jquery']
        },
        'code128': {
            deps: ['qrcode']
        },
        'qrcode': {
            deps: ['jquery']
        }
    }
});

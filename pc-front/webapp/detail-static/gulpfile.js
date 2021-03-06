
"use strict";

var gulp = require('gulp');
var minifyCss = require('gulp-clean-css');    
var uglify = require('gulp-uglify');               
var rev = require('gulp-rev');                               
var revCollector = require('gulp-rev-collector'); 
var runSequence = require('run-sequence');  
var replace = require('gulp-replace');         
var requirejsOptimize = require('gulp-requirejs-optimize');  
var cssimport = require("gulp-cssimport");

var conf =  process.argv[3].replace('--', '') || 'dev';

var html ={
    test:{
        PcFrom: 'http://pfdev.ecgci.com',
        PcTo: 'http://pftest.ecgci.com',
        LoginFrom: 'https://passportdev.ecgci.com',
        LoginTo: 'https://passporttest.ecgci.com',
        OrderFrom: 'http://orderdev.ecgci.com',
        OrderTo: 'http://ordertest.ecgci.com',
        ItemFrom: 'http://itemdev.ecgci.com',
        ItemTo: 'http://itemtest.ecgci.com',
        ReserveFrom: 'http://ydingdev.ecgci.com',
        ReserveTo: 'http://ydingtest.ecgci.com',
        AuctionFrom: 'http://auctiondev.ecgci.com',
        AuctionTo: 'http://auctiontest.ecgci.com',
    },
    prod:{
        PcFrom: 'http://pfdev.ecgci.com',
        PcTo: 'http://www.chinagoldcoin.net',
        LoginFrom: 'https://passportdev.ecgci.com',
        LoginTo: 'https:passport.chinagoldcoin.net',
        OrderFrom: 'http://orderdev.ecgci.com',
        OrderTo: 'http://order.chinagoldcoin.net',
        ItemFrom: 'http://itemdev.ecgci.com',
        ItemTo: 'http://item.chinagoldcoin.net',
        ReserveFrom: 'http://ydingdev.ecgci.com',
        ReserveTo: 'http://yding.chinagoldcoin.net',
        AuctionFrom: 'http://auctiondev.ecgci.com',
        AuctionTo: 'http://auction.chinagoldcoin.net',
    }
}

gulp.task('build-css', function () {
    var options = {
        matchPattern: '*.css' 
    };
    if(conf == 'dev'){
        return gulp.src('./css/*.css')
            .pipe(cssimport(options))
            .pipe(minifyCss({compatibility:'ie7'}))
            .pipe(rev())
            .pipe(gulp.dest('dist/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev/css'));
    }else{
        return gulp.src('./css/*.css')
            .pipe(cssimport(options))
            .pipe(replace(html[conf].PcFrom, html[conf].PcTo))
            .pipe(replace(html[conf].LoginFrom, html[conf].LoginTo))
            .pipe(replace(html[conf].OrderFrom, html[conf].OrderTo))
            .pipe(replace(html[conf].ItemFrom, html[conf].ItemTo))
            .pipe(replace(html[conf].ReserveFrom, html[conf].ReserveTo))
            .pipe(replace(html[conf].AuctionFrom, html[conf].AuctionTo))
            .pipe(minifyCss({compatibility:'ie7'}))
            .pipe(rev())
            .pipe(gulp.dest('dist/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev/css'));
    }
});

gulp.task('build-amd', function () {
    if(conf == 'dev'){
        return gulp.src(['./js/*.js'])
            .pipe(requirejsOptimize({
                baseUrl: './js',
                optimize: 'none',
                mainConfigFile: './js/libs/require-config.js'
            }))
            .pipe(uglify({ie8:true}))
            .pipe(rev())
            .pipe(gulp.dest('./dist/js'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/js'));
    }else{
        return gulp.src(['./js/*.js'])
            .pipe(requirejsOptimize({
                baseUrl: './js',
                optimize: 'none',
                mainConfigFile: './js/libs/require-config.js'
            }))
            .pipe(replace(html[conf].PcFrom, html[conf].PcTo))
            .pipe(replace(html[conf].LoginFrom, html[conf].LoginTo))
            .pipe(replace(html[conf].OrderFrom, html[conf].OrderTo))
            .pipe(replace(html[conf].ItemFrom, html[conf].ItemTo))
            .pipe(replace(html[conf].ReserveFrom, html[conf].ReserveTo))
            .pipe(replace(html[conf].AuctionFrom, html[conf].AuctionTo))
            .pipe(uglify({ie8:true}))
            .pipe(rev())
            .pipe(gulp.dest('./dist/js'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('./rev/js'));
    }
});

gulp.task('build-libs', function(){
    return gulp.src(['./js/libs/require.js', './js/libs/require-config.js'])
        .pipe(uglify({ie8:true}))
        .pipe(rev())
        .pipe(gulp.dest('./dist/js/libs/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/libs'));
});

gulp.task('build-images', function(){
    return gulp.src('./images/*')
        .pipe(gulp.dest('./dist/images/'))
});

gulp.task('build-rev', function () {
    var options = {
        replaceReved: true
    };
    if(conf == 'dev'){
        return gulp.src(['./rev/**/*.json', './**/*.html', '!./node_modules/**/*.html']) 
            .pipe(revCollector(options))
            .pipe(gulp.dest('dist'));
    }else{
        return gulp.src(['./rev/**/*.json', './**/*.html', '!./node_modules/**/*.html'])
            .pipe(replace(html[conf].PcFrom, html[conf].PcTo))
            .pipe(replace(html[conf].LoginFrom, html[conf].LoginTo))
            .pipe(replace(html[conf].OrderFrom, html[conf].OrderTo))
            .pipe(replace(html[conf].ItemFrom, html[conf].ItemTo))
            .pipe(replace(html[conf].ReserveFrom, html[conf].ReserveTo))
            .pipe(replace(html[conf].AuctionFrom, html[conf].AuctionTo))
            .pipe(revCollector(options))
            .pipe(gulp.dest('dist'));
    }
});

gulp.task('build-all', function(){
    runSequence(['build-css', 'build-amd', 'build-images', 'build-libs'], 'build-rev');
});




















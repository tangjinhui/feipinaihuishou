(function ($) {
    $.fn.timer = function (opts) {
        var defaultOpt = $.extend({
            timerSelector: {d: ".j-time-d", h: ".j-time-h", m: ".j-time-m", s: ".j-time-s"},
            format: "dd:hh:mm:ss",
            hasMilli: !1,
            timestamp:true,
            timeData: {"start": "", "end": "", "server": "", "pid": 0},
            timeStart: function (e) {
            },
            timeEnd: function (e) {
            }
        }, opts || {});

        return  this.each(function (k,value) {
            var
                theObj = this,
                pid = k,
                $theObj = $(theObj)
                ;
            $theObj.data('timerdata') && (defaultOpt.timeData = $theObj.data('timerdata'));

            //创建日期对象：
            function timeSet(a) {
                var timestamp = 0,
                    b = $.trim(a).split(" "),
                    c = [],
                    d = [],
                    newData = null;
                defaultOpt.timestamp ?
                    newData = new Date(a*1) : (
                    b = $.trim(a).split(" "),
                        c = b[0].split("-"),
                        d = b[1].split(":"),
                        newData =  new Date(c[0], c[1] - 1, c[2], d[0], d[1], d[2])
                ) ;

                return newData;
            }
            //设置单双字符
            function setTwoDigits(a) {
                return String(a).length < 2 && (a = "0" + a), a
            }
            function parseTwo(a){
                return setTwoDigits(parseInt(a));
            }
            var result = {};
            var tmp = [];
            function formatTimerShow(secondcount,flag) {
                var second = 60,
                    hourSecond = 60 * 60,
                    daySecond = 60 * 60 * 24,
                    millisecond = secondcount,
                    secondcount = parseInt(secondcount/1000),

                    flag = flag || 'end',
                    text = {
                        "start" : '开始',
                        "end" : '结束'
                    } ;
                flag == "start" ? leaveStart = millisecond : leaveEnd= millisecond;
                result.secondcount = secondcount;
                result.day = parseTwo(secondcount / (daySecond));
                result.hour = parseTwo((secondcount % (daySecond)) / (hourSecond));
                result.minute = parseTwo((secondcount % (hourSecond)) / (second));
                result.second = parseTwo((secondcount % second) / (1));
                result.millisecond = parseTwo((millisecond%1000)/10);

                var htmlTpl = defaultOpt.tpl?  defaultOpt.tpl(result.day, result.hour, result.minute, result.second, result.millisecond, parseTwo): '<span class="j-time-text">距'+ text[flag] +'还剩：</span><span class="j-time-d">'+ result.day +'</span>天<span class="j-time-h">'+ result.hour +'</span>时<span class="j-time-m">'+ result.minute +'</span>分<span class="j-time-s">'+ result.second +'</span>秒<span class="j-time-ss">'+result.millisecond+'</span>';
                $theObj.html(htmlTpl);

            }
            var leaveStart,leaveEnd;

            function play(opts) {
                if (opts != {} && opts && opts.start && opts.end) {
                    var q, g, h, i,
                        start = opts.start || timeSet(opts.start), //开始时间秒数
                        server = opts.server || timeSet(opts.server),
                        end = opts.end || timeSet(opts.end);
                    leaveStart = leaveStart || start-timeId || (start - server) / 1e3;//剩余秒数,用内部计数器矫正；
                    leaveStart = parseInt(leaveStart,10);
                    leaveEnd = leaveEnd || end-timeId || (end - server) / 1e3;
                    leaveEnd = parseInt(leaveEnd,10)
                    ; //剩余秒数


                    if(leaveStart == 0){
                        leaveStart = -1;
                    }
                    
                    //时间校准：
                    var now = +new Date();
                    var interval = 1000;
                    tmp[pid] = setTimeout(function run() {
                        now += interval;
                        var fix = now - (+Date.now());
                        timeId++;
                        tmp[pid] = setTimeout(run,interval + fix);
                        leaveStart-=interval;
                        leaveEnd-=interval;
                        return 0 <= leaveStart ? (formatTimerShow(leaveStart,'start'),defaultOpt.timeStart.call(theObj,theObj,$theObj,leaveStart), leaveStart) : (0 <= leaveEnd ? (formatTimerShow(leaveEnd,'end'), defaultOpt.timeEnd.call(theObj,theObj,$theObj,leaveEnd), leaveEnd) : ( clearTimeout(tmp[pid]))
                            , void 0)
                    }, interval)
                }

            };

            /*
             *
             * 销毁/重置定时器：
             *
             * secondcount : 剩余秒数
             * flag ： 标识是开始或者是结束："start" || "end"
             *
             *
             * */

            $.fn.destroyTimer = function(secondcount,flag){
                if(secondcount){
                    flag == "start" ? leaveStart = secondcount : leaveEnd = secondcount;
                }else{
                    clearTimeout(tmp[pid]);
                }
            };

            var timeId = 0; //全局计时器；
            play(defaultOpt.timeData);
        });
    }
})(window.jQuery || window.Zepto);
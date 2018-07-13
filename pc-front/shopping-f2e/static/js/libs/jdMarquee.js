(function(e) {
    e.fn.jdMarquee = function(t, n) {
        typeof t == "function" && (n = t, t = {});
        var r = e.extend({
            "deriction": "up",
            "speed": 10,
            "auto": !1,
            "width": null,
            "height": null,
            "step": 1,
            "control": !1,
            "_front": null,
            "_back": null,
            "_stop": null,
            "_continue": null,
            "wrapstyle": "",
            "stay": 5e3,
            "delay": 20,
            "dom": "div>ul>li".split(">"),
            "mainTimer": null,
            "subTimer": null,
            "tag": !1,
            "convert": !1,
            "btn": null,
            "disabled": "disabled",
            "pos": {
                "ojbect": null,
                "clone": null
            }
        }, t || {}), i = this.find(r.dom[1]), s = this.find(r.dom[2]), o;
        if (r.deriction == "up" || r.deriction == "down") {
            var u = i.eq(0).outerHeight(), a = r.step * s.eq(0).outerHeight();
            i.css({
                "width": r.width + "px",
                "overflow": "hidden"
            });
        }
        if (r.deriction == "left" || r.deriction == "right") {
            var f = s.length * s.eq(0).outerWidth();
            i.css({
                "width": f + "px",
                "overflow": "hidden"
            });
            var a = r.step * s.eq(0).outerWidth();
        }
        var l = function() {
            var e = "<div style='position:relative;overflow:hidden;z-index:1;width:" + r.width + "px;height:" + r.height + "px;" + r.wrapstyle + "'></div>";
            i.css({
                "position": "absolute",
                "left": 0,
                "top": 0
            }).wrap(e), r.pos.object = 0, o = i.clone(), i.after(o);
            switch (r.deriction) {
              default:
              case "up":
                i.css({
                    "marginLeft": 0,
                    "marginTop": 0
                }), o.css({
                    "marginLeft": 0,
                    "marginTop": u + "px"
                }), r.pos.clone = u;
                break;
              case "down":
                i.css({
                    "marginLeft": 0,
                    "marginTop": 0
                }), o.css({
                    "marginLeft": 0,
                    "marginTop": -u + "px"
                }), r.pos.clone = -u;
                break;
              case "left":
                i.css({
                    "marginTop": 0,
                    "marginLeft": 0
                }), o.css({
                    "marginTop": 0,
                    "marginLeft": f + "px"
                }), r.pos.clone = f;
                break;
              case "right":
                i.css({
                    "marginTop": 0,
                    "marginLeft": 0
                }), o.css({
                    "marginTop": 0,
                    "marginLeft": -f + "px"
                }), r.pos.clone = -f;
            }
            r.auto && (c(), i.hover(function() {
                p(r.mainTimer);
            }, function() {
                c();
            }), o.hover(function() {
                p(r.mainTimer);
            }, function() {
                c();
            })), n && n(), r.control && v();
        }, c = function(e) {
            p(r.mainTimer), r.stay = e ? e : r.stay, r.mainTimer = setInterval(function() {
                h();
            }, r.stay);
        }, h = function() {
            p(r.subTimer), r.subTimer = setInterval(function() {
                y();
            }, r.delay);
        }, p = function(e) {
            e != null && clearInterval(e);
        }, d = function(t) {
            t ? (e(r._front).unbind("click"), e(r._back).unbind("click"), e(r._stop).unbind("click"), e(r._continue).unbind("click")) : v();
        }, v = function() {
            r._front != null && e(r._front).click(function() {
                e(r._front).addClass(r.disabled), d(!0), p(r.mainTimer), r.convert = !0, r.btn = "front", r.auto || (r.tag = !0), m();
            }), r._back != null && e(r._back).click(function() {
                e(r._back).addClass(r.disabled), d(!0), p(r.mainTimer), r.convert = !0, r.btn = "back", r.auto || (r.tag = !0), m();
            }), r._stop != null && e(r._stop).click(function() {
                p(r.mainTimer);
            }), r._continue != null && e(r._continue).click(function() {
                c();
            });
        }, m = function() {
            r.tag && r.convert && (r.convert = !1, r.btn == "front" && (r.deriction == "down" && (r.deriction = "up"), r.deriction == "right" && (r.deriction = "left")), r.btn == "back" && (r.deriction == "up" && (r.deriction = "down"), r.deriction == "left" && (r.deriction = "right")), r.auto ? c() : c(4 * r.delay));
        }, g = function(e, t, n) {
            n ? (p(r.subTimer), r.pos.object = e, r.pos.clone = t, r.tag = !0) : r.tag = !1, r.tag && (r.convert ? m() : r.auto || p(r.mainTimer));
            if (r.deriction == "up" || r.deriction == "down") i.css({
                "marginTop": e + "px"
            }), o.css({
                "marginTop": t + "px"
            });
            if (r.deriction == "left" || r.deriction == "right") i.css({
                "marginLeft": e + "px"
            }), o.css({
                "marginLeft": t + "px"
            });
        }, y = function() {
            var t = r.deriction == "up" || r.deriction == "down" ? parseInt(i.get(0).style.marginTop) : parseInt(i.get(0).style.marginLeft), n = r.deriction == "up" || r.deriction == "down" ? parseInt(o.get(0).style.marginTop) : parseInt(o.get(0).style.marginLeft), s = Math.max(Math.abs(t - r.pos.object), Math.abs(n - r.pos.clone)), l = Math.ceil((a - s) / r.speed);
            switch (r.deriction) {
              case "up":
                s == a ? (g(t, n, !0), e(r._front).removeClass(r.disabled), d(!1)) : (t <= -u && (t = n + u, r.pos.object = t), n <= -u && (n = t + u, r.pos.clone = n), g(t - l, n - l));
                break;
              case "down":
                s == a ? (g(t, n, !0), e(r._back).removeClass(r.disabled), d(!1)) : (t >= u && (t = n - u, r.pos.object = t), n >= u && (n = t - u, r.pos.clone = n), g(t + l, n + l));
                break;
              case "left":
                s == a ? (g(t, n, !0), e(r._front).removeClass(r.disabled), d(!1)) : (t <= -f && (t = n + f, r.pos.object = t), n <= -f && (n = t + f, r.pos.clone = n), g(t - l, n - l));
                break;
              case "right":
                s == a ? (g(t, n, !0), e(r._back).removeClass(r.disabled), d(!1)) : (t >= f && (t = n - f, r.pos.object = t), n >= f && (n = t - f, r.pos.clone = n), g(t + l, n + l));
            }
        };
        (r.deriction == "up" || r.deriction == "down") && u >= r.height && u >= r.step && l(), (r.deriction == "left" || r.deriction == "right") && f >= r.width && f >= r.step && l();
    };
})(jQuery), function(e) {
    e.fn.jqueryzoom = function(t) {
        var n = {
            "xzoom": 200,
            "yzoom": 200,
            "offset": 10,
            "position": "right",
            "lens": 1,
            "preload": 1
        };
        t && e.extend(n, t);
        var r = "";
        e(this).hover(function() {
            var t = e(this).offset().left, i = e(this).offset().top, s = e(this).children("img").get(0).offsetWidth, o = e(this).children("img").get(0).offsetHeight;
            r = e(this).children("img").attr("alt");
            var u = e(this).children("img").attr("jqimg");
            e(this).children("img").attr("alt", ""), e("div.zoomdiv").get().length == 0 && (e(this).after("<div class='zoomdiv'><img class='bigimg' src='" + u + "'/></div>"), e(this).append("<div class='jqZoomPup'>&nbsp;</div>")), n.position == "right" ? t + s + n.offset + n.xzoom > screen.width ? leftpos = t - n.offset - n.xzoom : leftpos = t + s + n.offset : (leftpos = t - n.xzoom - n.offset, leftpos < 0 && (leftpos = t + s + n.offset)), e("div.zoomdiv").css({
                "top": 3,
                "left": 410
            }), e("div.zoomdiv").width(n.xzoom), e("div.zoomdiv").height(n.yzoom), e("div.zoomdiv").show(), n.lens || e(this).css("cursor", "crosshair"), e(document.body).mousemove(function(r) {
                mouse = new MouseEvent(r);
                var u = e(".bigimg").get(0).offsetWidth, a = e(".bigimg").get(0).offsetHeight, f = "x", l = "y";
                if (isNaN(l) | isNaN(f)) {
                    var l = u / s, f = a / o;
                    e("div.jqZoomPup").width(n.xzoom / (l * 1)), e("div.jqZoomPup").height(n.yzoom / (f * 1)), n.lens && e("div.jqZoomPup").css("visibility", "visible");
                }
                xpos = mouse.x - e("div.jqZoomPup").width() / 2 - t, ypos = mouse.y - e("div.jqZoomPup").height() / 2 - i, n.lens && (xpos = mouse.x - e("div.jqZoomPup").width() / 2 < t ? 0 : mouse.x + e("div.jqZoomPup").width() / 2 > s + t ? s - e("div.jqZoomPup").width() - 2 : xpos, ypos = mouse.y - e("div.jqZoomPup").height() / 2 < i ? 0 : mouse.y + e("div.jqZoomPup").height() / 2 > o + i ? o - e("div.jqZoomPup").height() - 2 : ypos), n.lens && e("div.jqZoomPup").css({
                    "top": ypos,
                    "left": xpos
                }), scrolly = ypos, e("div.zoomdiv").get(0).scrollTop = scrolly * f, scrollx = xpos, e("div.zoomdiv").get(0).scrollLeft = scrollx * l;
            	
            });
        }, function() {
            e(this).children("img").attr("alt", r), e(document.body).unbind("mousemove"), n.lens && e("div.jqZoomPup").remove(), e("div.zoomdiv").remove();
        }), count = 0, n.preload && (e("body").append("<div style='display:none;' class='jqPreload" + count + "'></div>"), e(this).each(function() {
            var t = e(this).children("img").attr("jqimg"), n = jQuery("div.jqPreload" + count + "").html();
            jQuery("div.jqPreload" + count + "").html(n + '<img src="' + t + '">');
        }));
    };
}(jQuery);
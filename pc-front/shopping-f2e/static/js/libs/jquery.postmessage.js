!function(e){"$:nomunge";var n,t,a,r,o=1,i=this,s=!1,c="postMessage",u="addEventListener",v=i[c];e[c]=function(n,t,a){t&&(n="string"==typeof n?n:e.param(n),a=a||parent,v?a[c](n,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(a.location=t.replace(/#.*$/,"")+"#"+ +new Date+o++ +"&"+n))},e.receiveMessage=r=function(o,c,l){v?(o&&(a&&r(),a=function(n){return"string"==typeof c&&n.origin!==c||e.isFunction(c)&&c(n.origin)===s?s:void o(n)}),i[u]?i[o?u:"removeEventListener"]("message",a,s):i[o?"attachEvent":"detachEvent"]("onmessage",a)):(n&&clearInterval(n),n=null,o&&(l="number"==typeof c?c:"number"==typeof l?l:100,n=setInterval(function(){var e=document.location.hash,n=/^#?\d+&/;e!==t&&n.test(e)&&(t=e,o({data:e.replace(n,"")}))},l)))}}(jQuery);
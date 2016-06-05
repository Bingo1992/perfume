//******************控制不同设备字体大小**************//
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//******************控制不同设备字体大小******结束**************//


$(function(){
    //tab选项卡
    $('.tabs').find('li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $('.tabs li').index($(this));
        $('.tabs-list').eq(index).addClass('show').siblings('.tabs-list').removeClass('show');
    });
    
 });

 //购物车数量加减
function minus_plus(){
    var count = 1;
    $('.minus').click(function(){
        var $parent = $(this).parent('.amount');
        var $count = $parent.find('.count');
        count = $count.val(); //每次点击前先获取input的值
        if(count<=1){return;}
        $count.val(--count);
    });

    $('.plus').click(function(){  
        var $parent = $(this).parent('.amount');
        var $count = $parent.find('.count');
        count = $count.val(); //每次点击前先获取input的值
        $count.val(++count);
    });
}   
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

// 显示隐藏遮罩
function show_hide_dialog(){
	$('.ui-dialog').addClass('show');
    $('.cancel').click(function(){
        $('.ui-dialog').removeClass('show');
    });
}

function allCheck(){
	//全选
	$('.all-check').click(function(){ 
		var check = $(".all-check :checkbox").prop("checked");
		if(check == false){
			$(".cart-list :checkbox").prop("checked", false);  
		}else{
			$(".cart-list :checkbox").prop("checked", true); 
		}            
	});

	//单选某个商品时，若列表中有未勾选的商品，则取消全选按钮的选中状态
	$(".cart-list :checkbox").click(function(){
		var flag = 0;
		//遍历每个商品
		$(".cart-list :checkbox").each(function(i){
			var check = $(".cart-list :checkbox").eq(i).prop("checked");
			if(check == false){
				flag++;
			}
		});

		if(flag>=1){
			$(".all-check :checkbox").prop("checked", false); 
		}else {		
			$(".all-check :checkbox").prop("checked", true); 
		}
	});
}
   
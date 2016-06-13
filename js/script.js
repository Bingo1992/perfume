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
        active($(this));
        var index = $('.tabs li').index($(this));
        $('.tabs-list').eq(index).addClass('show').siblings('.tabs-list').removeClass('show');
    });

    //显示隐藏内容
    $('.js-select').click(function(){
	    $(this).siblings('.show-container').toggleClass('hide');
	    var $i = $(this).find('i')
	    if($i.hasClass('icon-up')){
	        $i.attr('class','icon-right');
	    }else {
	        $i.attr('class','icon-up');
	    }
	 });

      //激活元素(选瓶子容量)
        $('.bottle-sort').find('li').click(function() {
            active($(this));
        });

        //颜色选择
        $('.bottle-color').find('label').click(function(){
            var span_color = $(this).find('span').css('background-color');
            $('.bg-color').css('background-color',span_color);
        });
    
    	//购物车提示语
    	$('.btn-cart').click(function(){
            show_hide_TipDialog();//显示提示语(函数在script.js)
        });

         minus_plus();//购物车加减

         allCheck();//购物车全选


         $('.slide2').find('label').click(function(){
         	var $input = $(this).find('input');
         	var check = $input.prop('checked');
         	if(check == false){
				$input.prop("checked", true);  
			}else{
				$input.prop("checked", false); 
			}  

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

// 1.5秒后隐藏提示语
function show_hide_TipDialog(){
    $('.tip-dialog').addClass('show');
    setTimeout(function(){
        $('.tip-dialog').removeClass('show');
    },1500);
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

//激活元素
function active(className){
    $(className).addClass('active').siblings().removeClass('active');
}
  



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

         // ----single_perfume.html comment.html customization.html---
          
        //产品筛选，推荐配方
        $('.js-sort').click(function() {
            $('.pro-sort-dialog').addClass('show');
            $('body').addClass('fixed-body'); //固定遮罩下层内容
           
        });
          //选择类型
        $('.sort-list').find('li').click(function() {
            active($(this));
        });

        //点击重置按钮
        $('.btn-reset').click(function() {
           hideSortDialog();
        });

        //点击遮罩
        $('.ps-dialog').click(function(){
            hideSortDialog();
        });

        function hideSortDialog(){
            $('.pro-sort-dialog').removeClass('show');
            $('body').removeClass('fixed-body'); //取消固定
        }

        // -----package_setting.html  select_suit.html--------
        //选择礼盒，包装样式，背景样式
        $('.js-wp-open').click(function(){
            var index = $('.js-wp-open').index($(this));
            $('.package-list').find('ul').eq(index).addClass('more-wp-open');
            $('.shade-dialog').addClass('show');
            $('body').addClass('fixed-body');
        });    

         //包装设置隐藏弹出层
        $('.return-back').click(function(){
            hide_package();
        });
        $('.shade-dialog').click(function(){
            hide_package();
        });
        $('.package-list').find('li').click(function(){
            hide_package();
        });


        //点击收藏按钮
        $('.love').click(function(){
            if($(this).hasClass('focus')){
                $(this).removeClass('focus');
            }else {
                $(this).addClass('focus');
            }
        
        });

        //点击分享按钮
        $('.share').click(function(){
            $('.share-dialog').addClass('show');
            $('.share-dialog').click(function(){
                $(this).removeClass('show');
            });
        });

 });

 //购物车数量加减
function minus_plus(){
    var count = 1;
    $('.minus').on('touchstart',function(){
        var $parent = $(this).parent('.amount');
        var $count = $parent.find('.count');
        count = $count.val(); //每次点击前先获取input的值
        if(count<=1){return;}
        $count.val(--count);
    });

    $('.plus').on('touchstart',function(){  
        var $parent = $(this).parent('.amount');
        var $count = $parent.find('.count');
        count = $count.val(); //每次点击前先获取input的值
        $count.val(++count);
    });

    $('.count').change(function (){
        if($(this).val()==0){
            alert('数量不能为0');
            $(this).val(1);
        }
    });
}   

// 显示隐藏遮罩
function show_hide_dialog(){
	$('.ui-dialog').addClass('show');
    $('.cancel').click(function(){
        $('.ui-dialog').removeClass('show');
    });
    $('.confirm').click(function(){
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

//隐藏遮罩内容(包装设置)
function hide_package(){
    $('.package-list').find('ul').removeClass('more-wp-open');
    $('.shade-dialog').removeClass('show');
    $('body').removeClass('fixed-body');
}

function allCheck(){
	//全选
	$('.all-check').click(function(){ 
		var check = $(".all-check :checkbox").prop("checked");
		if(check == false){
			$(".check-list :checkbox").prop("checked", false);  
		}else{
			$(".check-list :checkbox").prop("checked", true); 
		}            
	});

	//单选某个商品时，若列表中有未勾选的商品，则取消全选按钮的选中状态
	$(".check-list :checkbox").click(function(){
		var flag = 0;
		//遍历每个商品
		$(".check-list :checkbox").each(function(i){
			var check = $(".check-list :checkbox").eq(i).prop("checked");
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
  
// ------错误，警告，正确提示框通用函数------------
function wrong_p(text){
    $('.tip-dialog').find('i').attr('class','icon-tip icon-cancel')
        .siblings('p').html(text);
    show_hide_TipDialog();
}
function empty_p(text) {
    $('.tip-dialog').find('i').attr('class','icon-tip icon-gantan')
        .siblings('p').html(text);
    show_hide_TipDialog();
}
function yes_p(text) {
    $('.tip-dialog').find('i').attr('class','icon-tip icon-hook')
        .siblings('p').html(text);
    show_hide_TipDialog();
}
// *********用于检查手机格式是否正确***********
function isMobile(mobileNumber) {
    return /^(13[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(mobileNumber); //Regular Expressions
}
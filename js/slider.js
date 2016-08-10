$(function() {	
    var total = $('.total-ml').html(); //总容量
    var calculate = $('.caculate-ml').html(); //统计容量
    var m_total = 100; //每条试管总数
    var step = 5;

    //升
    $('.perfume-slider').delegate('.plus', 'touchstart', function() {
       
       var $v_parent = $(this).parent(); //纵向
        var $tube = $v_parent.find('.min-tube');
        var $p = $(this).siblings('.sort-p'); //判断主辅次

        var $m_caculate = $v_parent.find('.m-caculate');
        var m_caculate = parseInt($m_caculate.html());//当前试管的值
        // 当前试管值小于100%
        if (m_caculate < m_total) {
            m_caculate += step; //加
            $m_caculate.html(m_caculate);
            
            //取消符合条件的试管对减号的禁用
            $('.sort-p').each(function(){
                var mc = $(this).parents('.slider').find('.m-caculate').html();
                if($(this).hasClass('main-p') && (mc > 25) ){
                    $(this).siblings('.minus').removeClass('btn-disable');
                }
                if($(this).hasClass('assist-p') && (mc > 5) ) {
                    $(this).siblings('.minus').removeClass('btn-disable');
                }
            })
            
            // 判断是主辅次（次香一直处于禁用状态)
            if($p.hasClass('main-p') || $p.hasClass('assist-p')){
                if(m_caculate >= 50){
                    // overflow_dialog('主辅香不可超过50%');
                    $(this).addClass('btn-disable');  
                }
            }
        }

        var per = (m_caculate / m_total) * 100 + "%";
        $tube.css('height', per);
        v_caculate();  //统计总容量
    });


    //降
    $('.perfume-slider').delegate('.minus', 'touchstart', function() {
        var $v_parent = $(this).parent(); //纵向
        var $tube = $v_parent.find('.min-tube');
        var $p = $(this).siblings('.sort-p'); //判断主辅次

        var $m_caculate = $v_parent.find('.m-caculate');
        var m_caculate = parseInt($m_caculate.html());//当前试管值

        if (m_caculate > 0) {
            m_caculate -= step; //减
            $m_caculate.html(m_caculate);

            //取消符合条件的试管对加号的禁用
            $('.sort-p').each(function(){
                var mc = parseInt($(this).parents('.slider').find('.m-caculate').html());
                if($(this).hasClass('main-p') && (mc < 50)){
                    $(this).siblings('.plus').removeClass('btn-disable');
                }
                if($(this).hasClass('assist-p') && (mc < 50)) {
                    $(this).siblings('.plus').removeClass('btn-disable');
                }
            })

            // 判断是主辅次
            if($p.hasClass('main-p')){
                if(m_caculate <= 25){
                    // overflow_dialog('主香不可低于25%');
                    $(this).addClass('btn-disable');  
                }
            }else if($p.hasClass('assist-p')){
                if(m_caculate <= 5){
                    // overflow_dialog('辅香不可低于5%');
                    $(this).addClass('btn-disable');
                }
            }
        }
        var per = (m_caculate / m_total) * 100 + "%";
        $tube.css('height', per); //纵向
        
        v_caculate();//统计总容量

    });

    //编辑试管(删除)
    $('.per-edit').click(function () {
        if($(this).html()=="编辑"){
            $(this).html("完成");
            $('.perfume-slider .slider').each(function(){
                var _this = $(this);
                var $i = $(this).find('i.icon-cancel');
                $i.addClass('show'); //显示x号

                $i.click(function(){
                    _this.remove();
                   bottle_change();//瓶子修改 
                   v_caculate();//统计总容量
                });
             });

        }else {
            $(this).html("编辑");
            $('.slider').find('i.icon-cancel').removeClass('show');//隐藏删除按钮
        }
                 
    });

    //主香遮罩
    $('.btn-perfume').delegate('.btn-main', 'click', function() {
        pro_dialog();
        perNum(0);
    });

    //辅香遮罩
    $('.btn-perfume').delegate('.btn-assist', 'click', function() {
        pro_dialog();
        perNum(1);

    });

    //次香遮罩
    $('.btn-perfume').delegate('.btn-minor', 'click', function() {
        pro_dialog();
        perNum(2);
 	});

 
    //主香，辅香，次香的选择
    function perNum(i) {
        var check_num = [1, 5, 3]; //主香只可选择一种
        var per_name = ["主香", "辅香", "次香"];
       

        // --------选择主辅次香的数量---------
        $('.pro-cnt').delegate(':checkbox', 'click', function() {
            var _this = $(this);
            var flag = 0;
            //统计checked数目
            $(".pro-cnt :checkbox").each(function(j) {
                var check = $(".pro-cnt :checkbox").eq(j).prop("checked");
                if (check == true) {
                    flag++;
                    if (flag > check_num[i]) {
                        _this.prop("checked", false);
                        flag--;
                        
                        //超出限制提示框
                        var html = '您最多可以选择' + check_num[i] + '种' + per_name[i];
                        overflow_dialog(html);
                    }
                }
            });
            if (flag == 0) {
                var html2 = '您至少要选择1种' + per_name[i];
                overflow_dialog(html2);
            }
        });

        //----------点击确定添加纵向试管------------
        $('.confirm').click(function() {
            var flag2 = 0;
            $(".pro-cnt :checkbox").each(function(j) {
                var check = $(".pro-cnt :checkbox").eq(j).prop("checked");
                if (check == true) {
                    flag2++;//点击确定时判断checked的个数
                }
            });
            for(var k = 0; k < flag2; k++){
               add_v_tube(i);//多少个checkbox=checked则加几支试管
            }
            v_caculate();
        });
    }//主香，辅香，次香的选择结束


    // 统计纵向试管ml总数
    function v_caculate() {
        var s_total = 0; //所有试管ml总数
        $('.slider').each(function() {
            var value = parseInt($(this).find('.m-caculate').html());
            s_total += value;
            if (s_total >= total) {
                $('.plus').addClass('btn-disable');
            }
        });
        $('.caculate-ml').html(s_total);
    }

}); //(function())

	

//显示选择香基遮罩
function pro_dialog() {
    if ($('.per-edit').html() == "完成") {
        overflow_dialog("编辑状态下不可选择");
    } else if($('.caculate-ml').html() == 100){
    	overflow_dialog("总量已达100%，不可再添加");
    } else {
        $('.pro-dialog').removeClass('hide');
        $('body').addClass('fixed-body');
    }
    // 返回按钮
    $('.return').click(function() {
        $('.pro-dialog').addClass('hide');
        $('body').removeClass('fixed-body');
        // history.go(0); //刷新页面
    });
    // 确定按钮
    $('.confirm').click(function() {
        $('.pro-dialog').addClass('hide');
        $('body').removeClass('fixed-body');
        // history.go(0); //刷新页面
    });
}

//显示超出限制遮罩
function overflow_dialog(html) {
    $('.overflow-dialog').addClass('show').find('p').html(html);
    $('.o-confirm').click(function() {
        $('.overflow-dialog').removeClass('show');
    });
}

//添加纵向试管
function add_v_tube(i) {
    var perName = ['<p class="main-p sort-p" data-num="1">主香</p>', '<p class="assist-p sort-p" data-num="2">辅香</p>', '<p class="minor-p sort-p" data-num="3">次香</p>'];  

    var perPlus = ['<p class="plus icon-plus"></p>','<p class="plus icon-plus"></p>','<p class="plus icon-plus btn-disable"></p>'];
    var perNum = ['25','5','5'];//每种香基默认最低值

    var addHTML = '<div class="slider sort-slider">\
						<i class="icon-cancel"></i>' +
                    perName[i] + perPlus[i] +
		                '<div class="tube"><div class="min-tube">\
		                </div></div>\
		                <p class="minus icon-minus btn-disable"></p>\
		                <div class="slider-info border-top">\
		                    <p class="gray-font"><span class="m-caculate">' +
                            perNum[i] +
                            '</span>%</p>\
		                    <p class="gray-font border-top">玫瑰</p>\
		                </div></div>';

    $('.add-recipe').before(addHTML);

    bottle_change(); //瓶子修改 
    sortByInput(asc); //主，辅，次排序
}


//随着试管多少瓶子的变化
function bottle_change() {
    var len = $('.slider').length;
    var $i = $('.add-recipe').find('i');
    var $p1 = $i.siblings('.sort-p');
    var $p2 = $i.siblings('.stage-p');

    if( len == 0){
        $p2.removeClass('hide');
    }else if (len < 7 && len >= 1) {
        $p2.addClass('hide');
        $p1.removeClass('hide');
        $i.css('font-size', '50px');

    }else if (len >= 7) {
        $p1.addClass('hide')
        $i.css('font-size', '30px');
    } else if (len >= 9) {
        $('.add-recipe').addClass('hide'); //当试管大于9个时，删除右边瓶子及说明
    }
}

//主香、辅香、次香竖直试管排序
var asc = function(a, b) {
        return $(a).find('.sort-p').data('num') > $(b).find('.sort-p').data('num') ? 1 : -1;
    }
//主香、辅香、次香竖直试管排序
var sortByInput = function(sortBy) {
    var sortEle = $('.perfume-slider .sort-slider').sort(sortBy);
    $('.perfume-slider').empty().append(sortEle);
}

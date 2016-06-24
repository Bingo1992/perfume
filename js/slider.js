	

$(function() {
	var total = $('.total-ml').html(); //总数
	var calculate = $('.caculate-ml').html(); //统计
	var m_total = 100; //每条试管总数
	var step = 10;
    //升
    $('body').delegate('.plus', 'touchstart', function() {

        var $v_parent = $(this).parent(); //纵向
        var $tube = $v_parent.find('.min-tube');

        var $h_parent = $(this).parents('.list-box'); //横向
        var $h_tube = $h_parent.find('.h-min-tube');


        var $m_caculate = $v_parent.find('.m-caculate') || $h_parent.find('.m-caculate');
        var m_caculate = parseInt($m_caculate.html());
        if (m_caculate < m_total) {
            m_caculate += step; //加
        }
        var per = (m_caculate / m_total) * 100 + "%";
        $tube.css('height', per);
        $h_tube.css('width', per); //横向
        $m_caculate.html(m_caculate);

        // 统计总数
        v_caculate();
    });


    //降
    $('body').delegate('.minus', 'touchstart', function() {
        var $v_parent = $(this).parent(); //纵向
        var $tube = $v_parent.find('.min-tube');

        var $h_parent = $(this).parents('.list-box'); //横向
        var $h_tube = $h_parent.find('.h-min-tube');

        var $m_caculate = $v_parent.find('.m-caculate') || $h_parent.find('.m-caculate');
        var m_caculate = parseInt($m_caculate.html());
        if (m_caculate > 0) {
            m_caculate -= step; //减
        }
        var per = (m_caculate / m_total) * 100 + "%";
        $tube.css('height', per); //纵向
        $h_tube.css('width', per); //横向
        $m_caculate.html(m_caculate);
        v_caculate();

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

    // 统计纵向试管ml总数
	function v_caculate() {
	    var s_total = 0; //所有试管ml总数
	    $('.slider').each(function() {
	        var value = parseInt($(this).find('.m-caculate').html());
	        s_total += value;
	        if (s_total >= total) {
	            $('.plus').addClass('btn-disable');
	        } else {
	            $('.plus').removeClass('btn-disable');
	        }
	    });
	    $('.caculate-ml').html(s_total);
	}


   
    //主香，辅香，次香的选择
    function perNum(i) {
        var check_num = [1, 5, 3]; //主香只可选择一种
        var per_name = ["主香", "辅香", "次香"];
        $('.pro-cnt').delegate(':checkbox', 'click', function() {
            var flag = 0;
            var _this = $(this);
            //统计checked数目
            $(".pro-cnt :checkbox").each(function(j) {
                var check = $(".pro-cnt :checkbox").eq(j).prop("checked");
                if (check == true) {
                    flag++;
                    if (flag > check_num[i]) {
                        flag--;
                        _this.prop("checked", false);
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
            if (_this.prop("checked") == true) {
                add_h_tube(); //添加试管
            } else {
                remove_h_tube(flag); //减少试管
            }
        });

        //点击确定添加纵向试管
        $('.confirm').click(function() {
            $('.slider-container li').each(function() {
                add_v_tube(i);
            })
        });
    }

});

	

//显示选择遮罩
function pro_dialog() {
    if ($('.per-edit').html() == "完成") {
        overflow_dialog("编辑状态下不可选择");
    } else if($('.plus').hasClass('btn-disable')){
    	overflow_dialog("总量已达150ml，不可再添加");
    } else {
        $('.pro-dialog').removeClass('hide');
        $('body').addClass('fixed-body');
    }

    $('.return').click(function() {
        $('.pro-dialog').addClass('hide');
        $('body').removeClass('fixed-body');
        history.go(0); //刷新页面
    });
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

//添加横向试管
function add_h_tube() {
    var addHTML = '<li class="list-box">\
                    <div class="list-info">\
                        <span>香精名称</span>\
                        <div class="horizational-tube"><div class="h-min-tube"></div></div></div>\
                    <div class="amount-2">\
                        <span class="minus icon-minus"></span>\
                        <span class="m-caculate count">10</span>\
                        <span class="plus icon-plus"></span>\
                    </div></li>';
    $('.slider-container').append(addHTML);
}

//减去横向试管
function remove_h_tube(i) {
    $('.slider-container').find('li').eq(i).remove(); //此处只是减去最后一个
}

//添加纵向试管
function add_v_tube(i) {
    var perName = ['<p class="main-p sort-p" data-num="1">主香</p>', '<p class="assist-p sort-p" data-num="2">辅香</p>', '<p class="minor-p sort-p" data-num="3">次香</p>'];

    var addHTML = '<div class="slider sort-slider">\
						<i class="icon-cancel"></i>' +
        perName[i] +
        '<p class="plus icon-plus"></p>\
		                <div class="tube"><div class="min-tube">\
		                </div></div>\
		                <p class="minus icon-minus"></p>\
		                <div class="slider-info border-top">\
		                    <p class="gray-font"><span class="m-caculate">20</span>ml</p>\
		                    <p class="gray-font border-top">玫瑰</p>\
		                </div></div>';

    $('.add-recipe').before(addHTML);

    bottle_change(); //瓶子修改 
    sortByInput(asc); //主，辅，次排序
}

//减去纵向试管
function remove_v_tube(i) {
    $('.perfume-slider').find('.slider').eq(i).remove(); //此处只是减去最后一个
}

//随着试管多少瓶子的变化
function bottle_change() {
    var len = $('.slider').length;
    if (len < 7) {
        $('.add-recipe').removeClass('hide')
            .find('p').removeClass('hide')
            .siblings('i').css('font-size', '50px');

    }
    if (len >= 7) {
        $('.add-recipe').find('p').addClass('hide').siblings('i').css('font-size', '30px');
    } else if (len >= 9) {
        $('.add-recipe').addClass('hide'); //当试管大于9个时，删除右边瓶子
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

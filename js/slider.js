$(function(){
	var total = $('.total-ml').html();//总数
	var calculate = $('.caculate-ml').html();//统计
	var m_total = 100;//每条试管总数
	var step = 10;
	

	//升
	$('.slider').find('.plus').click(function(){
		var $parent = $(this).parent();
		var $tube = $parent.find('.min-tube');
		var $m_caculate = $parent.find('.m-caculate');
		var m_caculate = parseInt($m_caculate.html());
		if(m_caculate < m_total){
		 m_caculate += step; //加
		}
		var per = (m_caculate / m_total) * 100 + "%";
		$tube.css('height',per);
		$m_caculate.html(m_caculate);

		// 统计总数
		caculate();
	});


	//降
	$('.slider').find('.minus').click(function(){
		var $parent = $(this).parent();
		var $tube = $parent.find('.min-tube');
		var $m_caculate = $parent.find('.m-caculate');
		var m_caculate = parseInt($m_caculate.html());
		if(m_caculate > 0){
		 m_caculate -= step; //加
		}
		var per = (m_caculate / m_total) * 100 + "%";
		$tube.css('height',per);
		$m_caculate.html(m_caculate);
		caculate();
		
	});

	function caculate(){
		var s_total = 0;//所有试管ml总数
		$('.slider').each(function(){
			var value = parseInt($(this).find('.m-caculate').html());
			s_total += value;
			if(s_total >= total){
				$('.slider').find('.plus').css('pointer-events','none');
			}else {
				$('.slider').find('.plus').css('pointer-events','auto');
			}
		});
		$('.caculate-ml').html(s_total);
	}

	$('.btn-perfume').find('.btn-main').click(function(){
		$('.pro-dialog').removeClass('hide');
	})

})

	
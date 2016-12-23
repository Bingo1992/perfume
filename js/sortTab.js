;(function($,win,doc,undefined){
	$.fn.extend({
        //tabs
        switchTabs: function(option1,option2){
            return this.each(function() {
                var index = $(option1).index($(this));
                $(this).addClass('active').siblings().removeClass('active');
                $(option2).eq(index).addClass('active').siblings(option2).removeClass('active');   
            });
        }
    });
	
    function SortTabs(option){
    	var self = this;
        var opt = {
            scrollParent : $('#carousel'),//可滑动导航的父元素
            listItem : $('.bb-list'), //商品列表
            sortDialog : $('.pro-sort-dialog'),//筛选遮罩
            btnSort: $('.xtab-btn-slide')//筛选按钮
        };
        opt = $.extend(opt, option||{});
		var $scroll = opt.scrollParent.find('ul');
		var $scrollElm = $scroll.find('li');
		var ElmNum = opt.scrollParent.find('li').length; 
		var ElmWidth = $scrollElm.width();

		var $dialogElm = opt.sortDialog.find('li');

		var winHeight = $(document.body).height();//视窗gao度

        self.opt = opt;
        self.scrollParent = self.opt.scrollParent;
        self.listItem = self.opt.listItem;
        self.sortDialog = self.opt.sortDialog;
        self.btnSort = self.opt.btnSort;
        self.scroll = $scroll;//可滑动导航
        self.scrollElm = $scrollElm;//导航内容
        self.ElmNum = ElmNum;//筛选个数
        self.ElmWidth = ElmWidth;//每个导航内容的宽度
        self.dialogElm = $dialogElm;//遮罩内容
        self.winHeight = winHeight;//视窗高度

        self.scroll.width(self.ElmWidth*self.ElmNum+20+"px");
  		self.init();
    }

    SortTabs.prototype = {
    	init: function(){
    		var self = this;

    		//点击筛选按钮
    		self.btnSort.click(function(){
    			self.showHideDialog();
    		});
    		//点击筛选遮罩的内容
    		self.dialogElm.click(function(){
    			// $(this).switchTabs(self.dialogElm,self.scrollElm);
    			self.showHideDialog();
    		});
    		//点击导航列表内容
    		// self.scrollElm.click(function(){
    			// $(this).switchTabs(self.scrollElm,self.dialogElm);
    			// var index = self.scrollElm.index($(this));
    			// self.slideTabs(index);
    		// });
    		//滚动页面判断到达的列表分类
    		$(window).scroll(function() {
			    self.windowScroll();	
			});
    		
    	},
    	//显示隐藏遮罩
    	showHideDialog: function(){
    		var self = this;
    		self.btnSort.find('i').toggleClass('rotate');
   			self.sortDialog.toggleClass('show');
    	},
    	//滚动页面判断到达的列表分类
    	windowScroll: function(){
    		var self = this;

    		self.listItem.find('li').each(function(){
    			var height = $(this).offset().top-$(document).scrollTop();
				
				if(height < 100 && height > 40) {
					var $parent = $(this).closest(self.listItem);
					var id = $parent.attr('id');

					self.scrollElm.each(function(i){
                        var aHref = $(this).find('a').attr('href');
                        if(('#'+id) == aHref){
                            self.dialogElm.eq(i).add($(this)).addClass('active').siblings('li').removeClass('active');
                            var index = self.scrollElm.index($(this));
                            self.slideTabs(index);
                         }
                	});
                }else if(($(document).scrollTop()+$(window).height()+60) >= self.winHeight){
                	self.dialogElm.eq(self.ElmNum-1).add(self.scrollElm.eq(self.ElmNum-1)).addClass('active').siblings('li').removeClass('active');
                    self.slideTabs(self.ElmNum-1);
                }
			});
    	},
    	//滑动导航
    	slideTabs:function(index){
    		var self = this;
    		if(self.ElmNum>4){
    			if(index > 1 & index < self.ElmNum-2){
	                // self.scroll.css({
	                // 	'left': '-'+(self.ElmWidth*(index-1)-20)+'px'
	                // });
	                self.scroll.stop(false, false).animate({
				         left: '-'+(self.ElmWidth*(index-1)-20)+'px'
				     }, 350);
	            }else if(index >= self.ElmNum-2){
	                // self.scroll.css({
	                // 	'left': '-'+(self.ElmWidth*(self.ElmNum-4)-20)+'px'
	                // });
	                self.scroll.stop(false, false).animate({
				         left: '-'+(self.ElmWidth*(self.ElmNum-4)-20)+'px'
				     }, 350);
	            }else {
	                // self.scroll.css({
	                // 	'left': '0'
	                // });
	                self.scroll.stop(false, false).animate({
				         left: 0
				     }, 350);
	            }
    		}
	    		
    	}
    }
    window["SortTabs"] = SortTabs;
})(jQuery,window,document);





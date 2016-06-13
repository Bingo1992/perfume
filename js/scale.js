(function(f,g){var h=f.document,support={transform3d:("WebKitCSSMatrix"in f&&"m11"in new WebKitCSSMatrix()),touch:("ontouchstart"in f)};function getTranslate(x,y){var a=x,distY=y;return support.transform3d?"translate3d("+a+"px, "+distY+"px, 0)":"translate("+a+"px, "+distY+"px)"}function getPage(a,b){return support.touch?a.changedTouches[0][b]:a[b]}var j=function(){};j.prototype={init:function(a){var b=this,params=a||{};var c=h.querySelectorAll(params.elem+" img"),zoomMask=h.querySelector(".imgzoom_pack"),zoomImg=h.querySelector(".imgzoom_pack .imgzoom_img img"),zoomClose=h.querySelector(".imgzoom_pack .imgzoom_x"),imgSrc="";b.buffMove=3;b.buffScale=2;b.finger=false;b._destroy();zoomClose.addEventListener("click",function(){zoomMask.style.cssText="display:none";zoomImg.src="";zoomImg.style.cssText="";b._destroy();h.removeEventListener("touchmove",b.eventStop,false)},false);for(var d=c.length,i=0;i<d;i++){c[i].addEventListener("click",function(){imgSrc=this.getAttribute("src");zoomMask.style.cssText="display:block";zoomImg.src=imgSrc;zoomImg.onload=function(){zoomImg.style.cssText="margin-top:-"+(zoomImg.offsetHeight/2)+"px";h.addEventListener("touchmove",b.eventStop,false);b.imgBaseWidth=zoomImg.offsetWidth;b.imgBaseHeight=zoomImg.offsetHeight;b.addEventStart({wrapX:zoomMask.offsetWidth,wrapY:zoomMask.offsetHeight,mapX:zoomImg.width,mapY:zoomImg.height})}},false)}},addEventStart:function(a){var b=this,params=a||{};b.element=h.querySelector(".imgzoom_pack img");b.wrapX=params.wrapX||0;b.wrapY=params.wrapY||0;b.mapX=params.mapX||0;b.mapY=params.mapY||0;b.outDistY=(b.mapY-b.wrapY)/2;b.width=b.mapX-b.wrapX;b.height=b.mapY-b.wrapY;b.element.addEventListener("touchstart",function(e){b._touchstart(e)},false);b.element.addEventListener("touchmove",function(e){b._touchmove(e)},false);b.element.addEventListener("touchend",function(e){b._touchend(e)},false)},_destroy:function(){this.distX=0;this.distY=0;this.newX=0;this.newY=0},_changeData:function(){this.mapX=this.element.offsetWidth;this.mapY=this.element.offsetHeight;this.width=this.mapX-this.wrapX;this.height=this.mapY-this.wrapY},_touchstart:function(e){var a=this;e.preventDefault();var b=e.targetTouches.length;a._changeData();if(b==1){a.basePageX=getPage(e,"pageX");a.basePageY=getPage(e,"pageY");a.finger=false}else{a.finger=true;a.startFingerDist=a.getTouchDist(e).dist;a.startFingerX=a.getTouchDist(e).x;a.startFingerY=a.getTouchDist(e).y}},_touchmove:function(e){var a=this;e.preventDefault();e.stopPropagation();var b=e.targetTouches.length;if(b==1&&!a.finger){a._move(e)}if(b>=2){a._zoom(e)}},_touchend:function(e){var a=this;a._changeData();if(a.finger){a.distX=-a.imgNewX;a.distY=-a.imgNewY}if(a.distX>0){a.newX=0}else if(a.distX<=0&&a.distX>=-a.width){a.newX=a.distX;a.newY=a.distY}else if(a.distX<-a.width){a.newX=-a.width}a.reset()},_move:function(e){var a=this,pageX=getPage(e,"pageX"),pageY=getPage(e,"pageY");a.distX=(pageX-a.basePageX)+a.newX;a.distY=(pageY-a.basePageY)+a.newY;if(a.distX>0){a.moveX=Math.round(a.distX/a.buffMove)}else if(a.distX<=0&&a.distX>=-a.width){a.moveX=a.distX}else if(a.distX<-a.width){a.moveX=-a.width+Math.round((a.distX+a.width)/a.buffMove)}a.movePos();a.finger=false},_zoom:function(e){var a=this;var b=a.getTouchDist(e).dist,ratio=b/a.startFingerDist,imgWidth=Math.round(a.mapX*ratio),imgHeight=Math.round(a.mapY*ratio);a.imgNewX=Math.round(a.startFingerX*ratio-a.startFingerX-a.newX*ratio);a.imgNewY=Math.round((a.startFingerY*ratio-a.startFingerY)/2-a.newY*ratio);if(imgWidth>=a.imgBaseWidth){a.element.style.width=imgWidth+"px";a.refresh(-a.imgNewX,-a.imgNewY,"0s","ease");a.finger=true}else{if(imgWidth<a.imgBaseWidth){a.element.style.width=a.imgBaseWidth+"px"}}a.finger=true},movePos:function(){var c=this;if(c.height<0){if(c.element.offsetWidth==c.imgBaseWidth){c.moveY=Math.round(c.distY/c.buffMove)}else{var d=Math.round((c.element.offsetHeight-c.imgBaseHeight)/2);c.moveY=-d+Math.round((c.distY+d)/c.buffMove)}}else{var a=Math.round((c.wrapY-c.imgBaseHeight)/2),b=c.element.offsetHeight-c.wrapY+Math.round(c.wrapY-c.imgBaseHeight)/2;if(c.distY>=-a){c.moveY=Math.round((c.distY+a)/c.buffMove)-a}else if(c.distY<=-b){c.moveY=Math.round((c.distY+b)/c.buffMove)-b}else{c.moveY=c.distY}}c.refresh(c.moveX,c.moveY,"0s","ease")},reset:function(){var c=this,hideTime=".2s";if(c.height<0){c.newY=-Math.round(c.element.offsetHeight-c.imgBaseHeight)/2}else{var a=Math.round((c.wrapY-c.imgBaseHeight)/2),b=c.element.offsetHeight-c.wrapY+Math.round(c.wrapY-c.imgBaseHeight)/2;if(c.distY>=-a){c.newY=-a}else if(c.distY<=-b){c.newY=-b}else{c.newY=c.distY}}c.refresh(c.newX,c.newY,hideTime,"ease-in-out")},refresh:function(x,y,a,b){this.element.style.webkitTransitionProperty="-webkit-transform";this.element.style.webkitTransitionDuration=a;this.element.style.webkitTransitionTimingFunction=b;this.element.style.webkitTransform=getTranslate(x,y)},getTouchDist:function(e){var a=0,y1=0,x2=0,y2=0,x3=0,y3=0,result={};a=e.touches[0].pageX;x2=e.touches[1].pageX;y1=e.touches[0].pageY-h.body.scrollTop;y2=e.touches[1].pageY-h.body.scrollTop;if(!a||!x2)return;if(a<=x2){x3=(x2-a)/2+a}else{x3=(a-x2)/2+x2}if(y1<=y2){y3=(y2-y1)/2+y1}else{y3=(y1-y2)/2+y2}result={dist:Math.round(Math.sqrt(Math.pow(a-x2,2)+Math.pow(y1-y2,2))),x:Math.round(x3),y:Math.round(y3)};return result},eventStop:function(e){e.preventDefault();e.stopPropagation()}};f.ImagesZoom=new j()})(this);
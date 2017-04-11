//启动严格模式
"use strict"
//倒计时
var clock={
	sec:3,//倒计时的总时间
	radius:10,//圆的半径
	marginTop:null,//距离顶部的距离
	marginLeft:null,//距离左侧的距离
	canvas:null,//获得canvas
	ctx:null,//获得画笔
	star:function(){//开始执行函数
		var me=this;
		//设置截止时间
		me.endTime=new Date(2017,6,11,18,44,11);
		me.canvas=document.getElementById("canvas");//获得canvas元素
		me.ctx=me.canvas.getContext("2d")//设置画笔
		//获得canvas的宽度
		me.canvas.width=window.innerWidth
		//获得canvas的高度
		me.canvas.height=window.innerHeight
		//设置距离顶部的距离
		me.marginTop=window.innerHeight/2-(me.radius+1)*10
		//设置距离左侧的距离
		me.marginLeft=window.innerWidth/2-(me.radius+1)*15*2.5
		//接收返回的时差
		var timeShow=setInterval(function(){
			this.render(this.ctx);
			if(this.sec<0){
				clearInterval(timeShow);
				timeShow=null;
			}
		}.bind(this),1000)
	},

	render:function(ctx){//绘画出所有的图形
		var me=this;
		me.ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

		//获得倒计时的具体数字
		//第一个参数是距离左侧的距离，第二个参数是距离上部的距离，第三个参数是要绘制的数字,第四个参数是canvas的画笔
		//每个元的半径第radius，左右各一个像素的距离，所有包含圆的盒子宽跟高都是2*(radius+1)
		//绘制出的每个数组，宽度是7*(2*(randius+1));
		me.renDigit(me.marginLeft,me.marginTop,0,ctx);//0
		me.renDigit(me.marginLeft+15*(me.radius+1),me.marginTop,0,ctx);//0
		me.renDigit(me.marginLeft+30*(me.radius+1),me.marginTop,10,ctx);//:
		me.renDigit(me.marginLeft+45*(me.radius+1),me.marginTop,0,ctx);//0
		me.renDigit(me.marginLeft+60*(me.radius+1),me.marginTop,me.sec,ctx);//3
		me.sec--;
	},
	renDigit:function(x,y,num,ctx){
		var me=this;
		//设置要绘制图形吃填充颜色
		me.ctx.fillStyle="rgb(0,102,153)";
		//遍历数三维组
		for(var i=0;i<digit[num].length;i++){
			//遍历二位数组
			for(var j=0;j<digit[num][i].length;j++){
				//如果第三维数组中的值位1
				if(digit[num][i][j]==1){
					//就绘制图形
					me.ctx.beginPath();
					//绘制一个圆形
					me.ctx.arc(x+j*2*(me.radius+1)+(me.radius+1),y+i*2*(me.radius+1)+(me.radius+1),me.radius,0,2*Math.PI);
					//关闭绘制路径
					me.ctx.closePath()
					//填充绘制的内容区域
					me.ctx.fill();
				}
			}
		}
		}

	}
//调用函数开始执行动画
clock.star();
//4.5秒后，关闭动画
$("#countDown").delay(4500).toggle(100)


//获得每页的高度
$("#container>.section").css({height:window.innerHeight});
$("#container>.my-history").css({height:window.innerHeight*3});
//浏览器窗口改变时
$(window).resize(function(){
	//重新设置个页面的高度
	$("#container>.section").css({height:window.innerHeight});
	$("#container>.my-history").css({height:window.innerHeight*3});
})
//设置左侧菜单栏开关功能
$(".switch").click(function(){//给class为switch添加点击事件
	//如果点击的内容为X的时候
	if($(this).html()=="X"){
		//让当前的div距离左变为10px
		$(this).animate({left:10},300).html("=")
		//侧边栏导航的宽度为0
		$("#nav").animate({width:0},300);
	}else{//否则
		//让当前的div距离左边为210px
		$(this).animate({left:210},300).html("X")
		//侧边栏导航的宽度为200
		$("#nav").animate({width:200},300);
	}
})
//给侧边栏添加点击事件
$("#nav .list li ").click(function(e){
	//阻止冒泡
	e.stopPropagation();
	//获得当前元素中的a元素中的href属性值
	var $scroll=$(this).children("a").attr("href");
	//获得当前元素中的a元素中的href属性值对应的页面元素距离顶部的高度
	var offsetTop=$($scroll).offset().top
	//设置滚动条的位置为
	$(document.body).stop(true).animate({scrollTop:offsetTop},1000)
})
//图片轮播
var slider={
	liwidth:100,//每个li的宽度
	wait:4000,//等待的时间
	$lol:null,//保存class为lol的元素
	$num:null,//保存class为num的元素
	$btnR:null,//点击向右的按钮
	$btnL:null,//点击向左 的按钮
	duration:500,//动画过渡时间
	$size:null,//获得图片的个数
	$time:null,//定时器
	moved:0,//移动的步数
	inte:function(){
		var me=this;
		//获得class为lol的元素
		me.$lol=$("#seamless>.lol");
		//获得class为num的元素
		me.$num=$("#seamless>.num");
		//在class为lol的元素于最后克隆一个与第一个子元素一样的元素
		me.$lol.append(me.$lol.children(":first").clone()) 
		//获得图片的个数
		me.$size=me.$lol.children().size()
		//生成网页内容
		me.initView()
		//获得点击向右的按钮
		me.$btnR=$(".btnR");
		//获得点击向左的按钮
		me.$btnL=$(".btnL");
		//点击左侧按钮出发事件
	    me.$btnL.click(function(){
	    	me.moveRight();//调用函数
	    })
	    
	    me.$btnR.click(function(){
	    	me.moveLeft();
	    })
	    
	   //定时器里面的this指向的是window，所有要加bind
		me.$time=setInterval(me.moveLeft.bind(this),me.wait);
		 //鼠标移入事件
	    me.move();
	  
	},
	
	move:function(){//鼠标移入出触发事件
		var me=this;
		me.$num.children().hover(function(){//给每个li添加鼠标移入事件
			var index=$(this).index();//获得当前的下标值
			me.moved=index;//鼠标移入的时候，将moved的值设置跟下标值一样
			//执行动画效果
			me.$lol.stop(true).animate({"marginLeft":(me.liwidth*-index)+"%"},me.duration)
			//给当前的下标值添加on
	    	$(".num>li").eq(index).addClass("on").siblings().removeClass("on")
	    	clearInterval(me.$time)
		},function(){
			me.$time=setInterval(me.moveLeft.bind(this),me.wait);
		}.bind(this))
	},
	moveLeft:function(){//向左移动
		var me=this;
		me.moved++;
	    if(me.moved==me.$size){
	    	me.$lol.css({"marginLeft":0})
	    	me.moved=0;
	    }
	    me.$lol.stop(true).animate({"marginLeft":(me.liwidth*-me.moved)+"%"},me.duration);
	    if(me.moved==me.$size-1){
	    	$(".num>li").eq(0).addClass("on").siblings().removeClass("on")
	    }else{
	    	$(".num>li").eq(me.moved).addClass("on").siblings().removeClass("on")
	    }
	    
	},
	
	moveRight:function(){//向右移动
		var me=this
		me.moved--;
	    if(me.moved==-1){
	    	me.$lol.css({"marginLeft":(-me.liwidth*(me.$size-1)+'%')})
	    	me.moved=me.$size-2
	    }
	    me.$lol.stop(true).animate({"marginLeft":(me.liwidth*-me.moved)+"%"},me.duration)
	    $(".num>li").eq(me.moved).addClass("on").siblings().removeClass("on")
	},
	
	initView:function(){//生成网页内容
		var me=this;
		for(var j=0;j<me.$size-1;j++){
			me.$num.append("<li></li>")
		};
		me.$num.children(":first").addClass("on")
	}
};
slider.inte();
/********************华丽分割线******************************/

/********************华丽分割线******************************/
//创一个匿名函数的自掉
;(function($){//接收jQuery参数
	//创建一个LightBox的构造函数
	var LightBox=function(){
		var me=this;
		//创建一个弹出的遮罩层
		this.popupMask=$('<div id="G-lightbox-mask">');
		//创建弹出框
		this.popupWin=$('<div id="G-lightbox-popup">');
		//保存父元素中
		this.parentNode=$("#parent-container"); 
		//渲染剩余的dom节点，插入到父元素中
		this.renderDOM();
		//获得图片预览区域
		this.picViewArea=this.popupWin.find("div.lightbox-pic-view");
		//获得图片
		this.poupPic=this.popupWin.find("img.lightbox-image");
			//获得图片描述的区域(标题)
			this.picCaptionArea=this.popupWin.find("div.lightbox-pic-caption");
		//获得左右切换按钮
		this.nextBtn=this.popupWin.find("span.lightbox-next-btn");
		this.prevBtn=this.popupWin.find("span.lightbox-prev-btn");
			//获得图片描述的标题
			this.captionText=this.popupWin.find("p.lightbox-pic-desc");
			//获得图片当前的索引值
			this.currentIndex=this.popupWin.find("span.lightbox-of-index")
			//关闭按钮
			this.closeBtn=this.popupWin.find("span.lightbox-close-btn")
		
		
		
		//初始化分组名
		this.groupName=null;
		//创建一个空数组，用来保存每个元素
		this.groupData=[];
		//准备事件委托，获得数据													函数中的this，表示.前的对象
		this.parentNode.delegate(".js-lightbox,*[data-role=lightbox]","click",function(e){
			//传入的e表示当前触发的元素
			//事件委托的时候，要阻止冒泡，不然会影响其他元素
			e.stopPropagation();
			//将当前的属性为data-gropu的值，保存在currentGroupName中
			var currentGroupName=$(this).attr("data-group")
			//如果获得的属性值不等于gropuName
			if(currentGroupName!=me.groupName){
				//就想属性值赋给gropuName
				me.groupName=currentGroupName;
				me.getGroup();//将方法创建在构造函数的原型对象只能怪
			}
			//点击当前对象的时候，会弹窗
			me.initPopup($(this))//把当前点击的元素传进去
		})
		//关闭按钮
		this.popupMask.click(function(){
			$(this).fadeOut();
			me.popupWin.fadeOut();
			me.clear=false;
		})
		this.closeBtn.click(function(){
			me.popupMask.fadeOut();
			me.popupWin.fadeOut();
			me.clear=false;
		});
		//用来防止用户一直点击而出现的错误
		this.flag=true;
		//添加左右切换按钮
		this.nextBtn.hover(function(){
			//如果当前按钮没有被禁用，且groupData的长度大于1，就添加显示的class属性
			if(!$(this).hasClass("disabled")&&me.groupData.length>1){
				$(this).addClass("lightbox-next-btn-show");
			}
		},function(){
			//如果当前按钮没有被禁用，且groupData的长度大于1，就移除class属性
			if(!$(this).hasClass("disabled")&&me.groupData.length>1){
				$(this).removeClass("lightbox-next-btn-show");
			}//按钮点击事件
		}).click(function(e){
			if (!$(this).hasClass("disabled")&&me.flag) {
				me.flag=false;
				this.clear=true;
				//禁用事件的冒泡
				e.stopPropagation()
				//调用goto方法
				me.goto("next")
			}
		});
		this.prevBtn.hover(function(){
			//如果当前按钮没有被禁用，且groupData的长度大于1，就添加显示的class属性
			if(!$(this).hasClass("disabled")&&me.groupData.length>1){
				$(this).addClass("lightbox-prev-btn-show");
			}
		},function(){
			//如果当前按钮没有被禁用，且groupData的长度大于1，就移除class属性
			if(!$(this).hasClass("disabled")&&me.groupData.length>1){
				$(this).removeClass("lightbox-prev-btn-show");
			}
		}).click(function(e){
			if (!$(this).hasClass("disabled")&&me.flag) {
				me.flag=false;
				this.clear=true;
				//禁用事件冒泡
				e.stopPropagation()
				//调用goto方法
				me.goto("prev")
			}
		});
		//调整浏览器窗口的时候执行函数
		var timer=null;
		this.clear=false;
		//调整窗口事执行
		$(window).resize(function(){
			if(me.clear){
				timer=window.setTimeout(function(){
					me.loadPicSize(me.groupData[me.index].src)
				},500)
			}
		}).keyup(function(e){//按钮键盘触发的事件
			if(e.which==37){
				me.prevBtn.click();
			}else if(e.which==39){
				me.prevBtn.click();
			}
		})
	};
	//原型对象；
	LightBox.prototype={
		//实现左右切换的按钮功能
		goto:function(dir){
			if(dir=="next"){
				this.index++;
				//如果让前的索引值大于元素的长度-1的话
				if(this.index>=this.groupData.length-1){
					//就禁用当前按钮，并且移除class属性
					this.nextBtn.addClass("disabled").removeClass("lightbox-next-btn-show")
				};
				//如果当前的索引值不等于0的话，就释放向上的按钮
				if(this.index!=0){
					this.prevBtn.removeClass("disabled")
				}
				//获得当前的src地址；
				var src=this.groupData[this.index].src;
				//调用loadPicSize、
				this.loadPicSize(src)
			}else if(dir=="prev"){
				this.index--;
				//如果当前索引值小于等于0的时候
				if(this.index<=0){
					//禁用自己，并且移除显示属性	
					this.prevBtn.addClass("disabled").removeClass("lightbox-prev-btn-show")
				}
				//如果当前索引值不等于元素的长度-1的时候，
				if(this.index!=this.groupData.length-1){
					//就移除向下切换的按钮禁用属性
					this.nextBtn.removeClass("disabled");
				}
				//获得当前索引值的数组的src地址，保存在src中
				var src=this.groupData[this.index].src
				//调用loadPicSize方法，传入sec
				this.loadPicSize(src);
			}
		},
		//具体的图片地址
		loadPicSize:function(sourceSrc){
			var me=this;
			//初始化宽高
			me.poupPic.css({"width":"auto","height":"auto"})
			this.preLoadImg(sourceSrc,function(){
				//给图片添加src属性，属性值位sourceSrc
				me.poupPic.attr("src",sourceSrc);
				//获得图片的实际宽度
				var picWidth=me.poupPic.width();
				//获得图片的实际高度
				var picHeight=me.poupPic.height();
				me.changePic(picWidth,picHeight);
			})
		},
		//改变图片的宽高
		changePic:function(width,height){
			var me=this;
			//获得当前窗口的宽度
			var winWidth=$(window).width();
			//获得当前窗口的高度
			var winHeight=$(window).height();
			//如果图片的宽高大于浏览器的视口宽高比例，就按照比例设置宽高
			var scale=Math.min(winWidth/(width+15),winHeight/(height+15),1);
			width=width*scale;
			height=height*scale;
			//实现图片的宽高
			this.picViewArea.animate({"width":width,"height":height});
			//实现当前弹出框的宽高
			this.popupWin.animate({
				"width":width-10,
				"height":height-10,
				"marginLeft":-(width/2),
				"top":(winHeight-height)/2+winHeight*2
				},function(){
					//将图片显示出来
					me.poupPic.css({"width":width,"height":height}).fadeIn();
					//将标题显示出来
					me.picCaptionArea.fadeIn();
					me.flag=true;
					me.clear=true;
				});
				//获得当前的文字标题跟索引
				this.captionText.text(this.groupData[this.index].caption);
				this.currentIndex.text("当前图片的位置: "+(this.index+1)+" of "+this.groupData.length)
				
		},
		//判断图片是否加载完成
		preLoadImg:function(src,callback){
			//创建一个img标签
			var img=new Image();
			//window.ActiveXObject||false
			//判断浏览器是否支持ActiveX控件，如果浏览器支持ActiveX控件可以利用 
			if(!!window.ActiveXObject){
				//当图片加载完成后
				img.onreadystatechange=function(){
					if(this.readyState==4){
						callback();
						}
					}
			}else{
					img.onload=function(){
					callback();
				}
			}
			img.src=src;
		},
		//弹框跟遮罩层的实现
		showMaskAndPopup:function(sourceSrc,currenId){
			var me=this;
			//将图片进行隐藏
			this.poupPic.hide();
			//将标题进行隐藏；
			this.picCaptionArea.hide();
			//遮罩层进行淡入淡出
			this.popupMask.fadeIn();
			//获得window的款跟高
			var winWidth=$(window).width(),winHeight=$(window).height();
			//设置弹出框区域的宽跟高，为window的一半
			this.picViewArea.css({"width":winWidth/2,"height":winHeight/2});
			//将弹出框fadeIn
			this.popupWin.fadeIn();
			//获得浏览器窗口一半的高度
			var viewHeight=winHeight/2+10;
			//获得弹出框的宽度跟高度，还有位置
			this.popupWin.css({
				"width":winWidth/2+10,//这个10是两边的边框之和
				"height":winHeight/2+10,
				"marginLeft":-(winWidth/2+10)/2,
				"top":-(viewHeight+winHeight),
			}).animate({
				top:winHeight+viewHeight/2,//进行动画，再实现它的top值
					},function(){
						me.loadPicSize(sourceSrc);
					});
			//获得当前图片的下标
			this.index=this.getIndexOf(currenId);
			//获得组图中的个数
			var gropuDataLength=this.groupData.length;
			//给按钮添加class为disabled属性
			if(gropuDataLength>1){
				//如果点击的图像是第一个的时候
				if(this.index===0){
					//就为左边的按钮添加disabled
					this.prevBtn.addClass("disabled");
					//右边的按钮去除disabled
					this.nextBtn.removeClass("disabled");
				}else if(this.index===gropuDataLength-1){
					//就为左边的按钮移除disabled
					this.prevBtn.removeClass("disabled");
					//右边的按钮添加disabled
					this.nextBtn.addClass("disabled");
				}else{
					this.prevBtn.removeClass("disabled");
					this.nextBtn.removeClass("disabled");
					
				}
			}
		},
		//获得当前图片的下标
		getIndexOf:function(currenId){
			var index=0;
			//用$封装数组，就可以调用each方法
			$(this.groupData).each(function(i){
				index=i;
				//如果数组中的对象里面的当前元素的id属性值值等于currenId
				if(this.id===currenId){
					return false;
				}
			});
			return index;
		},
		//弹框
		initPopup:function(curentObj){
			//				获得当前属行为data-source的值			获得当前属行为data-id的值
			var me=this, sourceSrc=curentObj.attr("data-source")
			var currenId=curentObj.attr("data-id");
			this.showMaskAndPopup(sourceSrc,currenId)
		},
		
		
		//创建一个getGroup方法，用老获得当前分组
		getGroup:function(){
			var me=this;
			//获得属性为data-group值为groupName的元素，保存在groupList中
			var groupList=this.parentNode.find("*[data-group="+this.groupName+"]");
			//清空数组
			me.groupData.length=0;
			//遍历groupList中的每个元素
			groupList.each(function(){
				//当每个元素里面的内容(自己所需要属性值)添加到数组中
				me.groupData.push({
					//将属性为data-source的值保存在src中
					src:$(this).attr("data-source"),//保存在是路径
					//将属性为data-id的值保存在id中
					id:$(this).attr("data-id"),//保存的是id
					//将属性为data-caption的值保存在caption中
					caption:$(this).attr("data-caption"),//保存的是标题
				});
				//每次点击的时候，都会将后一次点击的数组中的对象保存在前一个对象里面(合并)，所有再每次点击之前， 要清除以前的数组对象
				
			});
		},
		renderDOM:function(){
			//拼接弹出窗里面的内容
			var strDom='<div class="lightbox-pic-view">'+
						'<span class="lightbox-btn lightbox-prev-btn"></span>'+
						'<span class="lightbox-btn lightbox-next-btn"></span>'+
						'<img class="lightbox-image" src="img/images/2-2.jpg"/>'+
						'</div>'+
						'<div class="lightbox-pic-caption">'+
						'<div class="lightbox-caption-area">'+
						'<p class="lightbox-pic-desc"></p>'+
						'<span class="lightbox-of-index">当前索引值:0 of 0</span>'+
						'</div>'+
						'<span class="lightbox-close-btn"></span>'+
						'</div>';
			//保存早popupWid中
			this.popupWin.html(strDom);
			//将遮罩层跟弹出框添加到parentNode的后面；
			this.parentNode.append(this.popupMask,this.popupWin)
		},
	};
	//将构造函数保存在全局中的变量上
	window.LightBox=LightBox
})(jQuery)
/*
	class="js-linghtbox"   表示这个元素要启动linghtbox
	data-role="lightbox"    表示这个元素要启动lightbox
	date-source="img/images/1-1.jpg"    原图的地址
	data-gropu="gropu-1"   标识当前是否属于一个组别
	data-id="aaaaa"      图片的唯一标识
	data-caption="文字的标题"    当前图片的描述文字
*/
//创建一个全局变量，来接收LightBox中的对象
var LightBox=new LightBox();

/******************************华丽分割线**************************/
$(window).scroll(function(){
	//获得滚动条的高度
	var top=$(document).scrollTop();
	//获得控制按钮
	var menu=$("#education");
	var College=$("#College").offset().top-400;
	var middleSchool=$("#middleSchool").offset().top+200;
	//返回顶部
	if (top>500) {
			$(".funhui").stop().fadeIn();
		}else{
			$(".funhui").stop().fadeOut()
		}
	if(top<middleSchool-200&&top>College){
		menu.css({"display":"block"})
	}else{
		menu.css({"display":"none"})
	}
	//获得所有的楼层
	var items=$(".container-main").find(".content")
	var currentId=""//用来接收当前楼层的id
	//遍历每个楼层
	items.each(function(){
		//因为当前元素是DOM对象，所以要用$封装
		var me=$(this);
		//获得楼层到顶部的距离
		var itemTop=me.offset().top-400;
		//如果滚动条滚动的距离，大于楼层到顶部的距离
		if(top>itemTop){
			//将当前楼层的id赋值给currentId
			currentId="#"+me.attr("id")
			
		}else{
			return false;
		};
	});
	//给相应的楼层 a设置sameSchool  取消其他链接的sameSchool
	var currentLink=menu.find(".sameSchool")
	//来到了当前楼层
	if(currentId&&currentLink.attr("href")!=currentId){
		currentLink.removeClass("sameSchool");
		menu.find("[href="+currentId+"]").addClass("sameSchool");
	}
	
})
//给固定楼层添加添加事件
$("#education").on("click","a",function(e){
	//阻止冒泡
	e.stopPropagation();
	//获得当前元素中的a元素中的href属性值
	var $scroll=$(this).attr("href");
	//获得当前元素中的a元素中的href属性值对应的页面元素距离顶部的高度
	var offsetTop=$($scroll).offset().top
	//设置滚动条的位置为
	$(document.body).stop(true).animate({scrollTop:offsetTop},1000)
}) 
//返回顶部按钮
$(".funhui").click(function(){
	$("body,html").animate({scrollTop:0},300);
});
//留言区域
$("#suBtn").click(function(){
	if(useid.validity.valueMissing){
		useid.setCustomValidity("请输入你的名字");
	}else if(useid.validity.patternMismatch){
		useid.setCustomValidity("用户名必须是3到6位数字或字母");
	}else{
		useid.setCustomValidity("");
	};
	if(email.validity.valueMissing){
		email.setCustomValidity("邮箱不能为空");
	}else{
		email.setCustomValidity("");
	};
	if(substance.validity.valueMissing){
		substance.setCustomValidity("留言区域不能为空");
	}else if(substance.validity.tooShort){
		substance.setCustomValidity("内容最少为10位数");
	}else{
		substance.setCustomValidity("");
	};
})


//设置fu-tableCell的高度
$(".fu-tableCell").css({"height":window.innerHeight-50});
$(window).resize(function () {
	$(".fu-tableCell").css({"height":window.innerHeight-50});
})
$("#fullpage").fullpage({
	//每一页的颜色
	//sectionsColor:["red","blue","green","yellow","blue"],
	//左右切换按钮
	controlArrows:true,
	//每页的内容是否垂直居中，默认为true
	verticalCentered:false,
	//锚链接
	anchors:["page1","page2","page3","page4","page5"],
	//是否使用css3动画，如果为false，则使用jq动画
	//css3:true,
	//页面是否循环滚动
	continuousVertical:true,
	//左右滑块是否循环滑动
	loopHorizontal:false,
	//是够显示导航条
	//navigation:true,
	//navigationPosition:'right',
	//滚动到某一页，会触发函数，anchorLink是对应的页面，index是下标，从1开始
	afterLoad:function(anchorLink,index){
		switch (index){
			//滚动到第一页面的时候，让三个角度的图片复位
			case 1:comePage1()
				break;
			case 2:comePage2()
				break;
			case 3:comePage3()
				break;
			case 5:comePage4()
				break;
		}
	},
	//鼠标离开页面的的时候马上触发   下标，下一个下标，滚动的方向
	onLeave:function(index,nextIndex,direction){
		switch (index){
			//滚动到第一页面的时候，让三个角度的图片复位
			case 1:leavePage1()
				break;
			case 2:/*leavePage2()*/
				break;
			case 3:leaverPage3()
				break;
			case 5:leavePage4()
				break;
		}
	},
	afterRender:function(){//页面加载完成执行的动画效果
		aRender()
	}
})
//页面加载执行函数
function aRender(){
	//四边的图像复位
	move(".corner1").rotate(0).duration("1s").end()
	move(".corner2").rotate(0).duration("1s").end()
	move(".corner3").rotate(0).duration("1s").end()
	move(".corner4").rotate(0).duration("1s").end()
	//h1标题变大1倍，延迟两秒
	move(".cp h1").duration("1s").scale(1).duration("2s").end()
	//爱创新    marigin-left由9999px变为0
	move(".box ").set("margin-left",0).end(function(){
	//再将字体设置为30px
	move(".box ").set("font-size","30px").end()
	})
}
//离开第一页执行函数
function leavePage1(){
	//四个角度，全部都旋转-50度
	move(".corner1").rotate(-50).duration("1s").end()
	move(".corner2").rotate(-50).duration("1s").end()
	move(".corner3").rotate(-50).duration("1s").end()
	move(".corner4").rotate(-50).duration("1s").end()
	//h1标题变为0
	move(".cp h1").scale(0).end()
	move(".cp .box").set("margin-left","9999px").end()//爱技术的margin
	move(".box ").set("font-size","15px").end()//字体大小设置为15px

}
//离开第二页执行的函数
//function leavePage2(){
//	$(".tel").removeClass("telShow");
//	move(".page2-title").set("margin-top","-50%").end();
//	move(".item2 .page2-title").rotate(-360).end()
//	$(".glass").removeClass("glassShow");
//	$(".hat").removeClass("hatShow");
//	$(".book").removeClass("bookShow");
//}
//离开第三页执行的函数
function leaverPage3(){
	clearCan("HTMLCSS");
	clearCan("js");
	clearCan("jq");

}
//来到第一页面的时候执行的函数
function comePage1(){
	//所有的角度全部都回复原状
	move(".corner1").rotate(0).duration("1s").end()
	move(".corner2").rotate(0).duration("1s").end()
	move(".corner3").rotate(0).duration("1s").end()
	move(".corner4").rotate(0).duration("1s").end()
	move(".cp h1").duration("1s").scale(1).duration("2s").end()//h1标题再1s延迟后变大1倍
	move(".cp .box").set("margin-left",0).end()//爱技术的margin变为0
	move(".box ").set("font-size","30px").end()//字体大小变为30px
}
//来到第二页的时候执行的喊出
function comePage2(){
	//文字距离顶部的位置为-15%
	move(".item2 .page2-title").set("margin-top","0px").end(function () {
		move(".item2 .page2-title").rotate(360).end(function(){//旋转360度
				$(".glass").addClass("glassShow");//添加class(scale)
				$(".hat").addClass("hatShow");//添加class(scale)
				$(".book").addClass("bookShow");//添加class(scale)
				$(".tel").addClass("telShow");//添加class(scale)
		})
	})
}
//来到第三页执行的函数
function comePage3(){
	beginCan("HTMLCSS",100)
	beginCan("js",90)
	beginCan("jq",80)
	beginCan("ng",60)
	beginCan("php",60)
	beginCan("react",70)

}
//绘制画布的函数
function beginCan(id,end){
	//创建画布
	var can=document.getElementById(id).getContext("2d");
	var starAngle=-90//设置起始角度
	var endAngle=-90//设置结束角度
	var txt=0//设置文字
	var starCanvs=setInterval(function(){//启动定时器
		can.clearRect(0,0,250,250);
		can.beginPath();//开始huizhi
		can.arc(250/2,250/2,100,0,2*Math.PI);//绘制原型
		can.lineWidth=25;//设置边框
		can.strokeStyle="#ddd";//边框的颜色
		can.stroke();
		can.beginPath();
		//绘制一个新的圆形
		can.arc(250/2,250/2,100,starAngle*Math.PI/180,endAngle*Math.PI/180);
		can.strokeStyle="#aaa";
		can.stroke()
		endAngle+=3.6;//角度每次正增加3.6
		can.font = '60px SimHei';//文字的大小
		var txtWidth = can.measureText(txt).width;//获得文字的宽度
		can.textBaseline = 'top';//基线向上对其
		can.fillText(txt+"%",250/2-txtWidth/2-6, 250/2-60/2);//设置文字的位置
		if(txt>=end){
			clearInterval(starCanvs)
		}
		txt+=1
	},30)
}
function clearCan(id){//清除画布
	var ctx=document.getElementById(id);
	var can=ctx.getContext("2d");
	can.clearRect(0,0,250,250)
}

//最后一页  自我介绍页面
function comePage4(){
	move(".changeTop").set("height","33%").duration("1s").end()
	move(".changeBottom").set("height","33%").duration("1s").end()
	console.log("进来了")
}
//离开第四页
function leavePage4(){
	move(".changeTop").set("height","50%").end()
	move(".changeBottom").set("height","50%").end()
	console.log("离开了")
}




























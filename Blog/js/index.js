//个人中心的下拉菜单
$(".member").hover(function(){
	//移入的时候，改变右侧的图片
	$(this).css("background","url(img/up.jpg) no-repeat 70px center")
	//菜单显示
	$(".member_ul").fadeIn(1000);
},function(){
	$(this).css("background","url(img/down.jpg) no-repeat 70px center")
	$(".member_ul").fadeOut(1000);
})
/*******************************华丽分割线***********************************************/
function scrollHidden(){//禁用滚动条
	$("body").css({overflow:"hidden"})
	$("html").css({overflow:"hidden"})
}
function scrollShow(){//启动滚动条
	$("body").css({overflow:""})
	$("html").css({overflow:""})
}
var scrollTop=$(window).scrollTop();
var scrollLeft=$(window).scrollLeft();
//弹出登录框    
var login=$("#login");//登录按钮
var reg=$("#reg");//注册按钮
var phone_big=$(".phone_big")//图片展示
function center(){//
	var windowHeight=window.innerHeight||document.documentElement.clientHeight   //各浏览器都兼容
	var windowWidth=window.innerWidth||document.documentElement.clientWidth
	return {"windowHeight":windowHeight,"windowWidth":windowWidth}
}
var windowCenterWidth=center().windowWidth
var windowCenterHeight=center().windowHeight
//设置弹出框在页面居中显示
login.css({top:(windowCenterHeight-login.height())/2,left:(windowCenterWidth-login.width())/2})//登录
reg.css({top:(windowCenterHeight-reg.height())/2,left:(windowCenterWidth-reg.width())/2})//注册
$(".blog").css({top:(windowCenterHeight-$(".blog").height())/2,left:(windowCenterWidth-$(".blog").width())/2})//博文
$(".skin").css({top:(windowCenterHeight-$(".skin").height())/2,left:(windowCenterWidth-$(".skin").width())/2})//皮肤
phone_big.css({top:(windowCenterHeight-phone_big.height())/2+scrollTop,left:(windowCenterWidth-phone_big.width())/2+scrollLeft})
//获得遮罩层的宽跟高
$("#screen").css({width:windowCenterWidth+scrollLeft,height:windowCenterHeight+scrollTop})
$(window).resize(function(){        //浏览器窗口发生改变死
	var CenterWidth=center().windowWidth
	var CenterHeight=center().windowHeight
	 	scrollTop=$(window).scrollTop();
		scrollLeft=$(window).scrollLeft();
	login.css({top:(CenterHeight-login.height())/2,left:(CenterWidth-login.width())/2})//登录框居中显示
	reg.css({top:(CenterHeight-reg.height())/2,left:(CenterWidth-reg.width())/2})  //注册框居中显示
	$(".blog").css({top:(CenterHeight-$(".blog").height())/2,left:(CenterWidth-$(".blog").width())/2})  //注册框居中显示
	$(".skin").css({top:(CenterHeight-$(".skin").height())/2,left:(CenterWidth-$(".skin").width())/2})  //注册框居中显示
	phone_big.css({top:(CenterHeight-phone_big.height())/2+scrollTop,left:(CenterWidth-phone_big.width())/2+scrollLeft})
	$("#screen").css({width:CenterWidth+scrollLeft,height:CenterHeight+scrollTop})   //遮罩层的宽高跟浏览器的可视区域的宽高一样大s
})
/*******************************华丽分割线***********************************************/
//弹出登录框   
$(".login").click(function(){
	login.css("display","block");//弹出登入框
	$("#screen").fadeIn()//弹出遮罩层  
	scrollHidden()
})
//关闭登录框    
$(".close").click(function(){
	login.css("display","none");//关闭登录框
	reg.css("display","none");//关闭注册框
	$(".blog").css("display","none");//关闭发表博文
	$(".skin").css("display","none");//关闭皮肤
	phone_big.css("display","none");
	$("#screen").fadeOut()//关闭遮罩层  
	scrollShow()//显示滚动条            21行
	$(".phone_big .big img").attr("src","img/loading.gif").css({width:32,height:32,top:190})
})
$(".reg").click(function(){
	reg.css("display","block");//弹出注册框
	$("#screen").fadeIn()//弹出遮罩层  
	scrollHidden()
})
$(".showText").click(function(){//发表博文
	$(".blog").css("display","block");//弹出注册框
	$("#screen").fadeIn()//弹出遮罩层  
	scrollHidden()
})
$(".replace").click(function(){
	$(".skin").css("display","block");//弹出注册框
	$("#screen").fadeIn()//弹出遮罩层  
	scrollHidden()
})
/*******************************华丽分割线***********************************************/
//鼠标按下事件        控制拖动的登录框                
function move(ele){//传入要移动的元素
	ele.mousedown(function(e){
	var drag=true
	var e=e||window.event;//兼容ie
	var me=this;
	var offleft=e.clientX-me.offsetLeft;//获得鼠标距离文档左侧的距离
	var offtop=e.clientY-me.offsetTop;//获得鼠标距离文档上部的距离
	if(e.target.nodeName=="H2"){//如果点击的目标元素是H2,就让它能移动
		$(document).mousemove(function(e){
			if(drag){
			console.log(drag)
			var e=e||window.event;
			var width=center().windowWidth	//获得浏览器的宽
			var height=center().windowHeight  //获得浏览器可是区域的高度
			var left=e.clientX-offleft		//获得元素距离左侧的距离
			var top=e.clientY-offtop		//获得元素距离顶部的距离
			if(left<0){//当元素距离左侧的距离小于0的似乎
				left=0//变成0
			}else if(left>width-me.offsetWidth+scrollLeft){//如果元素下溢出
				left=width-me.offsetWidth+scrollLeft//就让它不能再向下移动
			}
			if(top<0){
				top=0
			}else if(top<=scrollTop){
				top=scrollTop
			}else if(top>height-me.offsetHeight+scrollTop){
				console.log("越界了")
				top=height-me.offsetHeight+scrollTop
			}
			me.style.left=left+"px";
			me.style.top=top+"px";
			}
		})
	}	
	
	//鼠标放开事件
	$(document).mouseup(function(){
			drag=false
	})
})
}
move(login);               //登录移动
move(reg);					//注册移动
move(phone_big)				//图片
move($(".blog"))			//发表博文
move($(".skin"))			//更改皮肤
/*******************************华丽分割线***********************************************/
//菜单栏鼠标移入的滑块滑动
$(".about li").hover(function(){
	var index=$(this).index()
	var ulTarget=$(".navBar ul").offset().left
	var target=$(this).offset().left;
	$(".navBar .black li").eq(index).css({color:"#B8B6B6"})
	$(".navBar .nav_bg").stop(true).animate({left:target-ulTarget+20},300)
	$(".navBar .white").stop(true).animate({left:-85*index})
},function(){
	var index=$(this).index()
	$(".navBar .nav_bg").stop(true).animate({left:20},300)
	$(".navBar .white").stop(true).animate({left:0})
	$(".navBar .black li").eq(index).css({color:"#fff"})
})
/*******************************华丽分割线***********************************************/
//主页面中的左侧区域
//左侧菜单栏的打开跟关闭
$(".slidebar h2").click(function(){
	$(this).next().stop(true).slideToggle(1000)
})
/*******************************华丽分割线***********************************************/
$.ajax({//获得博文
	type:"post",
	url:"data/get_login.php",
	success:function(data){
		var html=""
		$(data).each(function(index){
			html+="<div><h2>"+data[index].title+"<s>"+data[index].date+"</s></h2><p>"+data[index].content+"</p></div>";
		})
		$("body .index").html(html)
		$(".index div").addClass("container")
	}
});
$.ajax({//获得皮肤
	type:"post",
	url:"data/get_skin.php",
	data:"type=main",
	success:function(data){
		var data=data[0]
		$("body").css({background:data.bg_color+''+" url(img/"+data.big_bg+") no-repeat center 50px"})
	}
});
$.ajax({//获得皮肤
	type:"post",
	url:"data/get_skin.php",
	data:"type=all",
	success:function(data){
		var html=""
		$(data).each(function(index){
			html+="<dl><dt><img src='img/"+data[index].small_bg+"' big_bg="+data[index].big_bg+" bg_color="+data[index].bg_color+" /></dt><dd>"+data[index].bg_text+"</dd></dl>"
			$("body .skin_bg").html(html)
			
		})
	}
});

$(document.body).on("click",".skin dl dt img",function(){
	var bg=$(this).attr("big_bg")
	$("body").css({background:$(this).attr("bg_color")+''+" url(img/"+bg+") no-repeat center 50px"})
	$.ajax({
		type:"post",
		url:"data/undate_skin.php",
		data:"type=set&big_bg="+bg,
		success:function(data){
			console.log(data)
		}
	});
})

//发表文章
$(".publications .submit").click(function(){
	var title=$(".title").val();
	var content=$(".content").val();
	if($.trim(content).length<=0||$.trim(title).length<=0){
		$(".textInfo").html("标题或者内容不能为空!")
		console.log(1)
	}else{
		$.ajax({
			type:"post",
			url:"data/insert_blog.php",
			data:"title="+title+"&content="+content,
			success:function(data){
				alert("发表成功.")
				$(".blog .test").val("");
				$(".blog").css({display:"none"})
				$("#screen").fadeOut()//关闭遮罩层  
	            scrollShow()//显示滚动条  
	            $.ajax({
				type:"post",
				url:"data/get_login.php",
				success:function(data){
					var html=""
					$(data).each(function(index){
						html+="<div><h2>"+data[index].title+"<s>"+data[index].date+"</s></h2><p>"+data[index].content+"</p></div>";
					})
						$("body .index").html(html)
						$(".index div").addClass("container")
					}
				});
			},
			error:function(){
				alert("数据有误，请稍后再试!")
			}
		});
	}
})
/*******************************华丽分割线***********************************************/
//退出
$(".exit").click(function(){
	$(".welcome").css({display:"none"}).html("");
	$(".reg").css({display:"block"})
	$(".login").css({display:"block"})
})
/*******************************华丽分割线***********************************************/
//注册验证
$("#reg form input").focus(function(){//获得焦点的时候
	$(this).addClass("inputHover")//添加边框
})
$("#reg form input").blur(function(){//失去焦点的时候
	$(this).removeClass("inputHover")
})
$(".uname").focus(function(){//用户名获得焦点的时候
	$(".yz").css({display:"block"})//提示信息
	$(".formright").html("昵称由4~12位字符组成");
	$(".icon").css({backgroundPosition:"-315px -33px"})
})
var surepwd=null;//用来接收密码
var receiveData={uname:"",upwd:"",surepwd:"",php:""}//用来接收注册的账号跟密码
var dataList={uname:"",upwd:"",surepwd:""}//提交时用来判断用户跟密码是否正确
$(".uname").blur(function(){//用户名失去焦点的时候
	var val=$(this).val()//获得内容
	var re=/^[\u4e00-\u9fa5a-zA-Z0-9]{4,12}$/ig;//正则
	var result=re.test(val)
	var formright=$(".formright")//文字
	var icon=$(".icon")//图标
	if(val){//如果输入的内容不为空
		if(result){//而且匹配正则
			$.ajax({
				type:"post",
				url:"data/is_user.php",
				data:"uname="+val,
				success:function(data){
					console.log(data)
					if(data=='1'){
						formright.html("昵称已存在")//就是提示内容为错误
						icon.css({backgroundPosition:"-215px -33px"})//图片为错误的图片
						receiveData.php=true;
						console.log(receiveData.php)
					}else{
						formright.html("昵称正确")//就设置提示的文字
						icon.css({backgroundPosition:"-265px -33px"})//就图片修改为正确的按钮
						receiveData.uname=val;//并且将值赋给receiveData
						dataList.uname=false
					}
				}
			});
		}else{//否则
			formright.html("昵称输入有误")//就是提示内容为错误
			icon.css({backgroundPosition:"-215px -33px"})//图片为错误的图片
			dataList.uname=true;
		}
	}else{//如果内容内容
		$(".yz").css({display:"none"})//将提示的元素隐藏起来
	}
})
$(".upwd").focus(function(){//密码获得焦点的时候
	$(".yz").css({display:"block"})//提示信息
	$(".formright").html("密码长由8~16字符之间");//显示文字提示内容
	$(".icon").css({backgroundPosition:"-315px -33px"})//修改图片
})
$(".upwd").blur(function(){//当密码框失去焦点的时候
	var re=/^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}$/;
	var val=$(this).val();//用val变量来接收当前的值
	receiveData.upwd=val;
	var result=re.test(val)
	var formright=$(".formright")//文字
	var icon=$(".icon")//图标
	if(val){//如果当前的值不为空
		if(result){//如果匹配正则
			formright.html("密码格式正确")
			icon.css({backgroundPosition:"-265px -33px"})
			surepwd=$(this).val()
			dataList.upwd=false
		}
		else{//否则
			icon.css({backgroundPosition:"-215px -33px"})
			formright.html("请输入正确格式的密码");
			dataList.upwd=true;
		}
	}else{//如果当前没有值，
		$(".yz").css({display:"none"})
	}
})
$(".surepwd").focus(function(){//当确认密码获得焦点的时候
	$(".yz").css({display:"block"})//提示信息
	$(".formright").html("请输入确认密码");
	$(".icon").css({backgroundPosition:"-315px -33px"})
})
$(".surepwd").blur(function(){//确认密码失去焦点的时候
	var val=$(this).val()
	var formright=$(".formright")//文字
	var icon=$(".icon")//图标
	if(val){
		if(val===surepwd){//如果确认密码等于当前密码
			formright.html("密码正确")
			icon.css({backgroundPosition:"-265px -33px"})
			dataList.surepwd=false;
		}else{
			icon.css({backgroundPosition:"-215px -33px"})
			formright.html("密码不一致，请重新输入");
			dataList.surepwd=true;
		}
	}else{
		$(".yz").css({display:"none"})
	}
	receiveData.surepwd=val;
})
function whetherNull(text){//如果内容不为空的函数
	$(".yz").css({display:"block"})
	$(".formright").html(text)//就是提示内容为错误
	$(".icon").css({backgroundPosition:"-215px -33px"})//图片为错误的图片	
}
function whetherIsNull(conet){//如果内容为空的函数
	$(".yz").css({display:"block"})
	$(".formright").html(conet)//就是提示内容为错误
	$(".icon").css({backgroundPosition:"-215px -33px"})//图片为错误的图片
}
$(".onsub").click(function(){
	console.log(receiveData)
	var unameVal=$(".uname").val()//获得用户名
	var upwdVal=$(".upwd").val()//获得密码
	if(unameVal){//如果用户名名不为空
		if(dataList.uname){//而且用户名不正确
			whetherNull("昵称输入有误")
			return;
		}
	}else {//否则
		whetherIsNull("昵称不能为空")
		return
	}
	if(!receiveData.php){
		$(".formright").html("昵称已存在")
		$(".icon").css({backgroundPosition:"-215px -33px"})
		return;
	}
	if(receiveData.upwd){//如果用密码不为空
		if(dataList.upwd){//如果密码不正确
			whetherNull("请输入正确格式的密码")
			return;
		}
	}else {//否则
		whetherIsNull("密码不能为空")
		return;
	}
	if(receiveData.surepwd){//如果用密码不为空
		if(dataList.surepwd){//如果密码不正确
			whetherNull("密码不一致，请重新输入")
			return;
		}
	}else {//否则
		whetherIsNull("确认密码不能为空")
		return;
	}
	if(receiveData.uname&&receiveData.upwd&&receiveData.surepwd){//如果账号，密码，确认密码，都不为空的时候就让用户提交
		$.ajax({
			type:"post",
			url:"data/insert.php",
			data:"uname="+receiveData.uname+"&upwd="+receiveData.upwd,
			success:function(data){
				if(data=="succ"){
					alert("注册成功,请登录!")
					$("form input").val("");
					reg.css("display","none");//关闭登录框
					$("#screen").fadeOut()//关闭遮罩层  
					scrollShow()//显示滚动条  
				}
				
			},
			error:function(){
				alert("数据读取失败!")
			}
		});
	}
})
//登录验证
$(".sub").click(function(e){
	var uname=$(".unameval").val();//获得用户名
	var upwd=$(".upwdval").val();//获得密码
	var namere=/^[\u4e00-\u9fa5a-zA-Z0-9]{4,12}$/ig;//正则
	var pwdre=/^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,16}$/;
	if(namere.test(uname)&&pwdre.test(upwd)){
		$.ajax({
			type:"post",
			url:"data/is_login.php",
			data:"uname="+uname+"&upwd="+upwd,
			success:function(data){
				if(data=='1'){
					sessionStorage["uname"]=uname;
					alert("登录成功");
					$("form input").val("");
					login.css("display","none");//关闭登录框
					$("#screen").fadeOut()//关闭遮罩层  
					scrollShow()//显示滚动条  
					$(".reg").css({display:"none"})
					$(".login").css({display:"none"})
					$(".welcome").css({display:"block"}).html("欢迎回来"+sessionStorage['uname'])
				}else{
					$("#login .info").html("用户名或密码有误!")
				}
			},
			error:function(){
				alert("登录失败，请稍后再试!")
			}
		});
	}else{
		$("#login .info").html("用户名或密码有误!")
	}
})
/*******************************华丽分割线***********************************************/
//轮播                 初始化轮播
//兼容ie的透明度
jQuery.prototype.opacity=function(num){
	$(this).css({opacity:num/100})
	$(this).css({filter:"alpha(opacity="+num+")"})
}
$(".banner img").opacity(0)//让所以的图片透明度为0 
$(".banner img").eq(0).opacity(100)
$(".banner ul li").eq(0).css({color:"#333"})
$(".banner strong").html($(".banner img").eq(0).attr("alt"))
var banner_index=1;//初始化
//自动轮播
function bannner_carrousel(obj,prev){
//	$(".banner img").css({display:"none"})//让所有的图片隐藏起来
	$(".banner img").eq(obj.index()).css({display:"block"})//让对应当前下标的图片显示出来
	$(".banner ul li").css({color:"#999"});
	obj.css({color:"#333"});//设置当前li的颜色
	$(".banner strong").html($(".banner img").eq(obj.index()).attr("alt"));//对应的描述
	$(".banner img").eq(prev).stop(true).animate({opacity:0.2},1000).css({zIndex:1});
	$(".banner img").eq(obj.index()).stop(true).animate({opacity:1},1000).css({zIndex:2});
}
function banner_carrousel_fn(){
	if(banner_index>=$(".banner img").length){
		banner_index=0;
	}
	//将当前对应的下标传递进去                                                             另外一个参数，如果当前的值等于0 ，就让他变成总长度-1  否则，对应下标
	bannner_carrousel($(".banner ul li").eq(banner_index),banner_index==0?$(".banner img").length-1:banner_index-1);
	banner_index++
}
var banner_timer=setInterval(banner_carrousel_fn,2000)
//手动轮播
$(".banner ul li").hover(function(){//鼠标移入的时候
	clearInterval(banner_timer)
	bannner_carrousel($(this),banner_index==0?$(".banner img").length-1:banner_index-1)//显示当前的对应的图片
},function(){//移出的时候
	banner_index=$(this).index()+1//从下一张开始播放
	banner_timer=setInterval(banner_carrousel_fn,2000)//启动定时器
})
/*******************************华丽分割线***********************************************/
//图片的延迟加载
function windowLoad(){
	setTimeout(function(){
		$(".img_load").each(function(){
			//当滑动窗口的高度加上可视区域的高度时候大于获得等于当前图片对于顶部高度的时候，让图片显示出来
			if($(window).scrollTop()+$(window).height()>=$(this).offset().top){
				$(this).attr("src",$(this).attr("xsrc"))
			}
		})
	},100)
}
windowLoad()
$(window).scroll(function(){
	windowLoad();
	center()
	scrollTop=$(window).scrollTop()
	scrollLeft=$(window).scrollLeft()
	$("#screen").css({width:windowCenterWidth+scrollLeft,height:windowCenterHeight+scrollTop})
	login.css({top:(windowCenterHeight-login.height())/2,left:(windowCenterWidth-login.width())/2})
	reg.css({top:(windowCenterHeight-reg.height())/2,left:(windowCenterWidth-reg.width())/2})
	phone_big.css({top:(windowCenterHeight-phone_big.height())/2+scrollTop,left:(windowCenterWidth-phone_big.width())/2+scrollLeft})
})
$(".phone img").click(function(){//图片被点击的时候
	$(".phone_big").css("display","block");//弹出登入框
	$("#screen").fadeIn()//弹出遮罩层  
	scrollHidden()//关闭滚动条  
	//加载对应的大图
	var tem_img=new Image();
	tem_img.src=$(this).attr("bigsrc");//设置新建图片的src
	$(tem_img).load(function(){//当图片加载完成的时候
		//替换big中的img的src属性值
		setTimeout(function(){
			$(".phone_big .big img").attr("src",tem_img.src).css({top:0,width:600,height:450,opacity:0}).stop(true).animate({opacity:1},1000)
		},100)
	})
	var children=$(this).parent().parent();//获得当前图片对应的父节点的节点
	get_prev_img(children) //402
}) 
//获得某一节点上一个节点的索引
function prevIndex(current,parent){
	var length=parent.children().length//获得所有子节点的长度
	if(current==0){return length-1}
	return parseInt(current)-1
}
//获得某一节点下一个节点的索引
function nextIndex(current,parent){
	var length=parent.children().length//获得所有子节点的长度
	if(current==length-1){return 0}
	return parseInt(current)+1;
}
/*******************************华丽分割线***********************************************/
//鼠标移入的时候，现在左右切换按钮
$(".phone_big .big .left").hover(function(){
	$(".phone_big .big .sl").stop(true).animate({opacity:1},500)
},function(){
	$(".phone_big .big .sl").stop(true).animate({opacity:0},200)
})
$(".phone_big .big .right").hover(function(){
	$(".phone_big .big .sr").stop(true).animate({opacity:1},500)
},function(){
	$(".phone_big .big .sr").stop(true).animate({opacity:0},200)
})
//点击左右切换按钮
$(".phone_big .big .left").click(function(){
	//点击左侧按钮的时候，将当前src属性对应的值付给img
	$(".phone_big .big img").attr("src",$(this).attr("src"));
	//获得当前图片的上一张图片的父节点的父节点   (dl)
	var children=$(".phone dl dt img").eq(prevIndex($(".phone_big .big img").attr("index"),$(".phone"))).parent().parent()
	get_prev_img(children) //402
})
$(".phone_big .big .right").click(function(){
	//点击左侧按钮的时候，将当前src属性对应的值付给img
	$(".phone_big .big img").attr("src",$(this).attr("src"));
	//获得当前图片的上一张图片的父节点的父节点   (dl)
	var children=$(".phone dl dt img").eq(nextIndex($(".phone_big .big img").attr("index"),$(".phone"))).parent().parent()
	get_prev_img(children) //402
	
})
//获得上/下一张图片
function get_prev_img(children){
	var prev=prevIndex($(children).index(),$(children).parent())//获得当前节点的上一个节点
	var next=nextIndex($(children).index(),$(children).parent())//获得当前节点的下一个节点
	var prev_img=new Image();
	var next_img=new Image();
	//加载上一张图片
	prev_img.src=$(".phone dl dt img").eq(prev).attr("bigsrc");
	//加载下一张图片 
	next_img.src=$(".phone dl dt img").eq(next).attr("bigsrc");
	//给左侧点击按钮添加自定义属性  值为当前图片的上一张索引值
	$(".phone_big .big .left").attr("src",prev_img.src)
	//给右侧点击按钮添加自定义属性  值为当前图片的下一张索引值
	$(".phone_big .big .right").attr("src",next_img.src)
	//给大图添加自定义属性        值为当前图片的索引
	$('.phone_big .big img').attr("index",$(children).index())   //对应395行
	$('.phone_big .big s').html(parseInt($(children).index())+1+"/"+$(".phone dl dt img").length)
}














































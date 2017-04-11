<?php
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	require("init.php");
	$sql="select * from blog_user where uname='$uname' and upwd='$upwd'";
	$resule=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($resule);
	if($row==NULL){
		echo "0";
	}else{
		echo "1";
	}
?>
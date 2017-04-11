<?php
	$uname=$_REQUEST['uname'];
	$upwd=$_REQUEST['upwd'];
	require("init.php");
	$sql="insert into blog_user values(null,'$uname','$upwd')";
	$result=mysqli_query($conn,$sql);
	if($result){
		echo "succ";
	}else{
		echo "err";
	}
?>
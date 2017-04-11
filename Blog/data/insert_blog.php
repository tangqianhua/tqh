<?php
	$title=$_REQUEST['title'];
	$content=$_REQUEST['content'];
	require("init.php");
	$sql="insert into blog_blog values(null,'$title','$content',now())";
	$result=mysqli_query($conn,$sql);
	if($result){
		echo "succ";
	}else{
		echo "err";
	}
?>
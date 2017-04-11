<?php
	header("content-type:application/json;charset=utf-8");
	require("init.php");
	$sql="select title,content,date from blog_blog order by date desc limit 3";
	$resule=mysqli_query($conn,$sql);
	$json=[];
	while(true){
		$row=mysqli_fetch_assoc($resule);
		if($row===NULL){
			break;
		}
		$json[]=$row;
	} 
	echo json_encode($json);
	
?>
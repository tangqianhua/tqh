<?php
	header("content-type:application/json;charset=utf-8");
	require("init.php");
	if($_REQUEST['type']=='all'){
		$sql="select small_bg,big_bg,bg_color,bg_text from blog_skin  limit 0,6";
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
	}else if($_REQUEST['type']=='main'){
		$sql="select big_bg,bg_color from blog_skin where bg_flag=1";
		$resule=mysqli_query($conn,$sql);
		$json=[];
		$row=mysqli_fetch_assoc($resule);
		$json[]=$row;
		echo json_encode($json);
	}
	
?>
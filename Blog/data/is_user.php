<?php
	$uname=$_REQUEST['uname'];
	require("init.php");
	$sql="select uname from blog_user where uname='$uname'";
	$resule=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($resule);
	if($row==NULL){
		echo "0";
	}else{
		echo "1";
	}
?>
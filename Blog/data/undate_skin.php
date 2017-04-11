<?php
	require("init.php");
	if($_REQUEST['type']=='set'){
		$big_bg=$_REQUEST['big_bg'];
		mysqli_query($conn,"UPDATE blog_skin SET bg_flag=0 WHERE bg_flag=1");
		mysqli_query($conn,"UPDATE blog_skin SET bg_flag=1 WHERE big_bg='$big_bg'");
	}
	
?>
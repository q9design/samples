<?php

$params = array_merge($_GET,$_POST);

if(isset($params['cmd']))
	{
	$cmd = trim(strtolower($params['cmd']));

	if($cmd == 'fail')
		{
		$s = $_SERVER["SERVER_PROTOCOL"]." 404 Not Found";
		header($s);
		echo "Not 'found'";
		exit;
		}
	}//if

sleep(1);
echo json_encode("hello!");

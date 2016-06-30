<?php

// 2016.06.28

// upg: need verify system .. like pin or something... but for now manual (but assume others will get messages)

// upg: use cloudflare location headers info? .. and include in log
$ip = $_SERVER['REMOTE_ADDR'];

$params = array_merge($_GET,$_POST);
$params['ip'] = $ip;


$r = file_put_contents('endpoints/log.txt',json_encode($params)."\n",FILE_APPEND);
if($r !== false)
	$r = true;

echo json_encode($r);

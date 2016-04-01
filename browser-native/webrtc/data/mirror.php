<?php

//
// 2014.08.01 -- simple message mirror (stream)
//

include('tools.php');
$mirror_file = dirname(__FILE__).'/private/data/mirror.jlog';

$params = $_REQUEST;

//$params['add'] = '"hi!"';

if(isset($params['add'])){ //upg: add and multi-add (append)
	$_a = str_replace("\n","\\n",$params['add']);
	$l = shLock($mirror_file);
	$r = file_put_contents($mirror_file,"$_a\n",FILE_APPEND);
	fUnlock($l);
	echo json_encode($r);
	}
else{ // wait
	$since = filesize($mirror_file);

	if(isset($params['since']))
		$since = (int)$params['since'];


	$m = false;
	while($m === false){
		$mm = shReadLogSinceSize($mirror_file,$since,"\n",true); // upg: allow to work with strings too (not require json)
		if(count($mm['result']) > 0)
			$m = $mm;
		if($m === false) sleep(1);
		}//while

	echo json_encode($m);
	}

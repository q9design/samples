<?php

$datapath = dirname(__FILE__)."/data/writable";

$fnLog = "$datapath/log.txt";

$ip = $_SERVER['REMOTE_ADDR'];

// browser_id ////////////////////////////////////////
$cid = 'geo';
if(!isset($_COOKIE[$cid]))
	{//make one
	$b = openssl_random_pseudo_bytes(16,$isstrong)."jhu&t56de4sddghshk,akla,";
	$i = sha1($b);
	setcookie ( $cid, $i, 2147483647, "/"); //  [, string $domain [, bool $secure = false [, bool $httponly = false ]]]]]] (would be nice to have an https only cookie) 
	$_COOKIE[$cid] = $i; // is this allowable always??
	}
$bid = $_COOKIE[$cid];

$params = array_merge($_GET,$_POST);

$params['geo'] = json_decode($params['geo'],true);
$params['bid-cookie'] = $bid;
$params['ip'] = $ip;
$params['udate'] = microtime(true);

exAppend($fnLog,json_encode($params)."\n");

$r = array("data" => $params['geo'],"message"=>"<h3>bid: $bid</h3>".print_r($params['geo'],true));

echo json_encode($r);
exit;


//////////////////////////////
function dlog($m,$delim="\n")
{
file_put_contents('log.txt',"$m$delim",FILE_APPEND);
}

function var_dump_str($var)
	{
	ob_start();
	var_dump($var);
	$result = ob_get_contents();
	ob_end_clean();
	return $result;
	}

function exAppend($fn,$data)
	{
	$l = exLock($fn);
	$result = file_put_contents($fn,$data,FILE_APPEND);
	fUnlock($l);

	return $result;
	}

function shReadLogTail($fn,$bytes,$delim = "\n")
	{//read log entries bytes from END of log (in entries chunks)
	$result = false;

	if(file_exists($fn) && ($lock = shLock($fn)) !== false)
			{
			$result = array();

			clearstatcache(true,$fn);
			$size = filesize($fn); 

			if(($bytes > 0) && (($h = fopen($fn,'r')) !== false))
				{
				fseek($h,($size-$bytes));
				$d = fread($h,$bytes);
				fclose($h);

				$d = explode($delim,$d);
				foreach($d as $v)
					{
					$vv = json_decode($v,true);
					if(!is_null($vv))
						$result[] = $vv;
					}
				}//if

			fUnlock($lock);
			}//if

	return $result;
	}

function shLock($fn) //multiple reads alowed but will block any writers.
	{
	$l = _fLock($fn,LOCK_SH);
	return $l;
	}

function exLock($fn) //exclusive -  waits till ready
	{
	$l = _fLock($fn,LOCK_EX);
	return $l;
	}

function _fLock($fn,$type = LOCK_EX)
	{
	$result = false;

	$i = pathinfo($fn);
	$lfn = $i['dirname']."/.".$i['basename'].".lock"; //upg.. split to path and include . to hide lock filenames
	$n = nice4fn($lfn);
	$lfn = "/tmp/".md5($lfn).".$n"; // "/tmp/938134bc323ee2ab0c688d79c693939b.data.invites.json.lock"
	// dir/.original.lock

	$l = fopen($lfn,'a+');
//	echo "[lock type: $type ($lfn)][".LOCK_SH."][".LOCK_EX."]";var_dump($l);
	if(flock($l,$type))  // use php lambda callback system?
		{
		$result = $l;
		}

	return $result;
	}


function fUnlock($h)
	{
//	echo "[unlock]";var_dump($h);
	flock($h,LOCK_UN);
	}



function nice4fn($s)
{// stay in this folder
 $s = str_replace(array("\\","/",".."), "_", $s);
 return $s;
}
 

function nomc($i)
{// works on single value or 1D array. (like $_GET)
$result = $i;

if (get_magic_quotes_gpc()) 
   {
   if(is_array($i))
     {
     foreach($i as $t => $v)
       $result[$t] = stripslashes($v);
     }//if
   else
     $result = stripslashes($i);
   }//if
return $result;
}//func



//http://www.php.net/manual/en/function.fgetcsv.php
function loadCSV($fn,$delim = ',')
{ // 2014.03.21
  //
  // $a = loadCSV('example.csv');
  //
	$result = false;

	$header = array();
	if (($handle = fopen($fn, "r")) !== FALSE) {

		$header = fgetcsv($handle, 0, $delim);
		$result = array();

		    while (($data = fgetcsv($handle, 0, $delim)) !== FALSE) {
			$num = count($data);
			$a = array();
			//upg: skip if not same number of columns as header.
			for ($c=0; $c < $num; $c++) {
				$t = $header[$c];
				$v = $data[$c];
				$a[$t] = $v;
			}
			$result[] = $a;
		    }
		    fclose($handle);
	}//fopen

	return $result;
}//loadCSV


// http://www.php.net/manual/en/function.fputcsv.php
function saveCSV($fn,$a)
{//
 // 2014.03.21 - 0845
 //
 // saveCSV('temp.csv',$a);
 //

$result = false;

if(is_array($a)) //??: return true if nothing to write?
	{

	if(count($a) > 0)
		{
		$header = array_keys($a[0]);
		array_unshift($a,$header);
		}

	if(($fp = fopen($fn,'w')) !== false)
		{
		$result = true;
		foreach($a as $f)
			{
			if(fputcsv($fp,$f) === false)
				$result = false;
			}//foreach
	
		}//if
	}//if

return $result;
}//saveCSV

/*

*/

<?php

//
// 2014.03.09 -- tools.php
//

//upg: cache all shares and unshare on exit hook.
//upg: delete lock file if old (3 minute lock?)
// $h = exLock("filename.txt");
// exUnlock($h);


/*
if($x = exLock('data/test.text'))
	{
	echo "locked.";
//	sleep(15);
	exUnlock($x);
	}
else
	{
	echo "couldn't gain exclusive";
	}
*/

// http://php.net/manual/en/function.flock.php#78318

function dlog($m,$delim="\n")
{ //upg: option to turn on/off
//this should be at localdata/log.txt
@file_put_contents('log.txt',"$m$delim",FILE_APPEND);
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

//upg: jlog($fn,$data) ... test and start using...
function exjLog($fn,$data)
{
 exAppend($fn,json_encode($data)."\n"); // do we need the ex? .. are file_put_contents cross process atomic? .. but also wait for done with reads?
}


function shSize($fn)
	{
	$result = false;


	if(file_exists($fn) && ($lock = shLock($fn)) !== false) //shLock prevents ex (write) lock.
			{
			clearstatcache(true,$fn);
			$result = filesize($fn);

			fUnlock($lock);
			}
	

	return $result;
	}


function shReadLogSinceSize($fn,$since_size,$delim = "\n",$return_details = false)
	{//read log entries bytes since size of log (in entries chunks)
	//upg: -since_size == bytes from end of file?
	$result = false;

	if(file_exists($fn) && ($lock = shLock($fn)) !== false)
			{
			$result = array();

			clearstatcache(true,$fn);
			$size = filesize($fn); 

			$bytes = $size-$since_size;

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

			if($return_details)
				$result = array('result'=>$result,'size'=>$size); //upg: bytes=$bytes.

			fUnlock($lock);
			}//if

	return $result;
	}



function shReadLogTail($fn,$bytes,$delim = "\n",$return_details = false)
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

			if($return_details)
				$result = array('result'=>$result,'size'=>$size); //upg: bytes=$bytes.

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


//upg: add exLoadCSV()

function nice4whitespace($s)
{//http://stackoverflow.com/questions/10810211/replace-multiple-spaces-and-newlines-with-only-one-space-in-php
return preg_replace( "/\s+/", " ", $s );
}

function nice4fn($s)
{// stay in this folder // http://stackoverflow.com/questions/2304221/what-character-sequence-should-i-not-allow-in-a-filename
 $s = str_replace(array("\\","/",".."), "_", $s); // should \\ be allowed in some cases? (we can allow "..") .. anyothers?
 return $s;
}

 
function nice4html($s)
{//"deactivate" special html code chars (like <>"'&)
return htmlspecialchars($s); // or htmlentities (which would replace every possible char)
}


function nice4url($s)
{ // http://stackoverflow.com/questions/996139/urlencode-vs-rawurlencode
  // "deactivate" url special meaning chars (leaving mainly alphanumeric-_. unchanged.)
return urlencode($s); //or rawurlencode. .. upg: ,$true to encode + 
}


function nice4mail($s)
{//stay on the same line
return str_replace(array("\n","\r"), "", $s);
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


function parseEmailAddr($s)
{ // 2014.04.22
  //
  // parseEmailAddr("User Name <user.name@gmail.com>");
  //
$x = explode("<",$s);

if(count($x) > 1)
 {
 $display = $x[0]; 
 $address = $x[1];
 }
else
 {
 $display = "";
 $address = $x[0];
 }

$display = trim($display);
$address = trim(trim($address),">");

$result = array('display'=>$display,'address'=>$address);

return $result;
}


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

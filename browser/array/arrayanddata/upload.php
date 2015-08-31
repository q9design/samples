<?php

// sudo tcpdump host domain.com -nnvvXSs 1514

$params = array_merge($_GET,$_POST);
$headers = getallheaders();
//$body = file_get_contents('php://input');            // not sure why this blank
$body = file_get_contents($_FILES['buf']['tmp_name']); // form post
$len = strlen($body);

echo $_SERVER['REQUEST_METHOD']." ".$_SERVER['REQUEST_URI']." ".$_SERVER['QUERY_STRING']."\n";
print_r($headers);
print_r($params);
print_r($_FILES); // automatically available if post is setup with "multipart/form-data" mime structure.
echo "BODY LENGTH: $len\n";

//echo bin2hex($body);
hex_dump($body);





























/////////////////////////////
// helper lib
/////////////////


// http://stackoverflow.com/questions/1057572/how-can-i-get-a-hex-dump-of-a-string-in-php
function hex_dump($data, $newline="\n")
{
  static $from = '';
  static $to = '';

  static $width = 16; # number of bytes per line

  static $pad = '.'; # padding for non-visible characters

  if ($from==='')
  {
    for ($i=0; $i<=0xFF; $i++)
    {
      $from .= chr($i);
      $to .= ($i >= 0x20 && $i <= 0x7E) ? chr($i) : $pad;
    }
  }

  $hex = str_split(bin2hex($data), $width*2);
  $chars = str_split(strtr($data, $from, $to), $width);

  $offset = 0;
  foreach ($hex as $i => $line)
  {
    echo sprintf('%6X',$offset).' : '.implode(' ', str_split($line,2)) . ' [' . $chars[$i] . ']' . $newline;
    $offset += $width;
  }
}

 





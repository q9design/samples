<?php

//
// 2014.03.07 - comet.php
//

// next: upg: session data for each channel/registration.
//   cc->val($chan,'cat')
//   cc->val($chan,'cat',5)

if(isset($_SERVER['HTTP_REFERER']))
	ob_start();



$params = array_merge($_GET,$_POST);

$data = json_decode($params['data'],true);

print_r($data);

/*
$data = array(
	'a'=>5,
	'b'=>3
	);
*/

class cometCoop
{
	private $objlist = array();
	private $messages = array();
	private $data = array();
	private $session = array();
	private $sessionid = "";

	function __construct($data)
		{
		$this->data = $data;

		$bid = bid();
		$instanceid = $this->data['instanceid'];
		$this->sessionid = "$bid.$instanceid"; // session data

		$this->session = loadSession($this->sessionid);

		echo "SESSION [$this->sessionid]....";
		print_r($this->session);

		//remove recv acks
		foreach($this->data['recvack'] as $v)
			{
			echo "Remove:";
			$this->session['sent'][$v]['ack'] = microtime(true);
			}

		//reload non-acks (upg: add a retry timeout)
		foreach($this->session['sent'] as $id => $im)
			{
			$chan = $im['chan'];
			$msg = $im['msg'];
			if(!isset($im['ack'])) //requeue
				{
				echo "RESENDING...$id\n (no ack)";
				$this->messages[$chan][] = array('id'=>$id,'msg'=>$msg);
				}
			}//foreach
		}//construct

	public function val($chan,$tag,$val=null,$dval=null)
		{

		if(!is_null($val))
		  {
		  $this->session['val'][$chan][$tag] = $val;
		  }
		else
  		if(!isset($this->session['val'][$chan][$tag]))
		  $this->session['val'][$chan][$tag] = $dval;
			
		return $this->session['val'][$chan][$tag];
		}

	public function sessionid()
		{
		return $this->sessionid;
		}

	public function register($chan,$ccobj,$updatePeriod = 1.0) //upg: call each on update period. (or to start out on min (shortest) update period?)
		{
		echo("Register... [$chan] ");
		//print_r($ccobj);
		$this->objlist[$chan] = $ccobj;

		//check recv messages
		echo "CHECK IN BOX FOR... $chan";
		print_r($this->data);

		if(isset($this->data['sending'][$chan]))
			{
			foreach($this->data['sending'][$chan] as $v) // send each message
				$ccobj->recv($v);
			}
		}//register

	public function run()
		{
		echo("Running...\n");
		$run = true;

		do
			{
			foreach($this->objlist as $v)
				{
				$v->run($this);
				}

			$run = (
				(count($this->messages) == 0) && 
				 (count($this->data['sending']) == 0)
			      );


			if($run)
				sleep(1);
			else
				{
				echo "COMPLETE BECAUSE...\n";
				echo "messages";
				var_dump(!count($this->messages) == 0);
				var_dump($this->messages);
		
				echo "sending";
				var_dump(!count($this->data['sending']) == 0);
				var_dump($this->data['sending']);

				}


			}//do
		while($run);


		//end result...
		if(isset($_SERVER['HTTP_REFERER']))
			{
			$dd = ob_get_contents(); //upg: save to log. can watch that file.
			ob_end_clean();
			echo json_encode(
				array('messages'=>$this->messages,
				      'sendack'=>true,
				      'log'=>$dd)
				);

			//if(count($data['sending']) > 0)
			saveSession($this->sessionid,$this->session);
			}
		else //console mode
			echo json_encode($this->messages);


		}//run

	public function send($chan,$msg)
		{
		$mid = ++$this->session['nextmessageid'];
		$this->messages[$chan][] = array('id'=>$mid,'msg'=>$msg);
		$this->session['sent'][$mid] = array('chan'=>$chan,'msg'=>$msg,'udate'=>microtime(true));
		}
}//class



/////////////////////////
// subscribers -- typicllay these would be in their own .php files
class ccsubA
{

	private $chan;
	private $cc;
	function __construct($chan,$cc)
		{
		$this->chan = $chan;
		$this->cc = $cc;
		}


	private $c = 0;

/*	public function state($s)
		{
		echo "STATE A:";
		var_dump($s);
		}
*/

	public function recv($m)
		{
		echo "A RECV >> $m <<\n";
		var_dump($m);
		}

	
	public function run($ccCtrl)
		{
		$this->c++;
		echo "...ccsubA(run) #$this->c\n";
		//create message
		if($this->c >= 50)
			$ccCtrl->send($this->chan,'hello!');
		}
}//class


class ccsubB
{
	private $c = 0;
	private $goal;
	private $cc;

	private $chan;
	function __construct($chan,$cc)
		{
		$this->chan = $chan;
		$this->cc = $cc;

		$this->goal = $cc->val($chan,'goal',null,20);
		}

/*	public function state($s)
		{
		$this->goal = $s;
		}
*/	
	public function run($ccCtrl)
		{
		$this->c++;
		echo "...ccsubB(run) #$this->c,$this->goal\n";
		//create message
		if($this->c >= $this->goal)
			$ccCtrl->send($this->chan,'hi!');
		}

	public function recv($m)
		{
		echo "B RECV >> $m <<\n";
		var_dump($m);
		echo "Setting timeout to [$m]";
		$goal = $m;
		}

}//class




$cc = new cometCoop($data);

$a = new ccsubA('a',$cc);
$b = new ccsubB('b',$cc);

$cc->register('a',$a);
$cc->register('b',$b);


$cc->run();


/////////////////////
// tools

function nice4fn($fn)
{
return str_replace(array("..","/","\\"),"_",$fn);
}

function bid()
{
// browser_id ////////////////////////////////////////
$cid = 'lab';
if(!isset($_COOKIE[$cid]))
	{//make one
	$b = openssl_random_pseudo_bytes(16,$isstrong).$jbmini['random'];
	$i = sha1($b);
	setcookie ( $cid, $i, 2147483647, "/"); //  [, string $domain [, bool $secure = false [, bool $httponly = false ]]]]]] (would be nice to have an https only cookie) 
	$_COOKIE[$cid] = $i; // is this allowable always??
	}
return $_COOKIE[$cid];
}

function loadSession($n)
{ //upg blocking
$_n = nice4fn($n);
$fn = "cache/data/$_n.json"; //upg: /tmp/md5($here).$_n.json

@$d = json_decode(file_get_contents($fn),true);

if(is_null($d))
	$d = array('nextmessageid'=>1,'sent'=>array(),'val'=>array());

return $d;
}

function saveSession($n,$session)
{ //upg blocking
$_n = nice4fn($n);
$fn = "cache/data/$_n.json";

@$r = file_put_contents($fn,json_encode($session));

return $r;
}

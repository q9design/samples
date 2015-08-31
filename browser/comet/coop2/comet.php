<?php

// next: backend files for session data.
//       session helper (val)
//       work out chanel setting
//       acks
//       integrate objects

$params = array_merge($_GET,$_POST);

$result = null;

//$params = array_merge($params,json_decode($params['data'],true));

@$data = json_decode($params['data'],true);
/*print_r($data);
    [sessionid] => 12345
    [packets] => Array
        (
            [0] => Array
                (
                    [type] => msg
                    [id] => 1
                    [chan] => a
                    [msg] => hi
                )

        )
*/

if(!is_null($data))
	{
	$outqueue = array();
	$msgid = 0;

	$sessionid = $data['sessionid'];
	$packets = $data['packets'];

//	$msgid++;$outqueue[] = array('type'=>'msg','sessionid'=>$sessionid,'id'=>$msgid,'msg'=>"hello.",'chan'=>'a');
	
	//process packets
	foreach($packets as $v)
		{
		$type = $v['type'];
		if($type == 'msg')
			{
			$outqueue[] = array('type'=>'ack','id'=>$v['id'],'urecv'=>microtime(true));
			}
		else
		if($type == 'ack')
			{
			//remove from our outack list
			}
		}//foreach


	//return messages if there are any in the queue.. else listen for messages
	$c = 1;
	while ((count($outqueue) == 0) && ($c < 5)) // 5 second norm?
		{
		
		//run clients

		if(count($outqueue) == 0)
			sleep(1);
		$c++;
		}//while

	$result = $outqueue;

	}//!is_null

//ajax result
//sleep(1);//safety sleep
echo json_encode($result);


//////////////////////////////////////



class comcomClass
{
	private $subs = array();
	private $outqueue = array();
	public function send($chan,$msg)
		{
		echo "SEND: [$chan] ";
		var_dump($msg);
		$this->outqueue[] = array('chan'=>$chan,'msg'=>$msg);
		}

	public function outqueue()
		{
		return $this->outqueue;
		}

	public function add($chan,$c)
		{
		$c->cc($this);
		$this->subs[$chan][] = $c;
		$c->context('cobj'); // session vars
		print_r($this->subs);
		}

	public function run()
		{
		foreach($this->subs as $chan => $subs)
			{
			var_dump($chan);
			foreach($subs as $sub)
				{
				$sub->run();
				}
			}//foreach
		}//run

	
}//comcom

$comcom = new comcomclass();

// -------------------------------
class ccsub
{ // ccsub class

	private $chan;
	private $cc;
	private $context;
	function __construct()
		{
		}

	public function send($message)
		{
		$this->cc()->send($this->chan,$message);
		}

	public function cc($cc = false)
		{
		if($cc !== false)
			$this->cc = $cc;

		return $this->cc;
		}

	public function context($c)
		{
		if($c !== false)
			$this->context = $c;

		return $this->context;
		}

	public function val($tag,$val=null,$dval=null)
		{ // vals are per cookie.session.chan could have also sess(tag,value) (a '' chan) .. and browser(tag,val)
		$chan = $this->chan();
		$cc = $this->cc(); // pull from cc.
		if(!is_null($val))
		  {
		  $this->session['val'][$chan][$tag] = $val;
		  }
		else
  		if(!isset($this->session['val'][$chan][$tag]))
		  $this->session['val'][$chan][$tag] = $dval;
			
		return $this->session['val'][$chan][$tag];
		}

	public function chan($chan = false)
		{
		if($chan !== false)
			$this->chan = $chan;

		return $this->chan;
		}

	public function run()
		{
		}

/*	public function state($s)  //??
		{
		echo "STATE A:";
		var_dump($s);
		}
*/


}//ccsub


//////////////////
//////////////////

class ccsubA extends ccsub
	{
	public function recv($m)
		{
		echo "A RECV >> $m <<\n";
		var_dump($m);
		$a = $this->val('a');
		}

	public function run()
		{
		if(rand() > 0.5)
			{
			$this->val('b',rand());
			$this->send('hi');
			}
		}
	
	}//ccsubA

$a = new ccsubA();

$comcom->add('a',$a);

// ------------------

$comcom->run();
var_dump($comcom->outqueue());






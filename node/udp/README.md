some loss, errors or duplication

https://nodejs.org/api/dgram.html
http://www.graemeboy.com/node-udp
http://stackoverflow.com/questions/6177423/send-broadcast-datagram

http://www.tack.ch/multicast/broadcast.shtml

see: https://github.com/wankdanker/node-discover

https://en.wikipedia.org/wiki/User_Datagram_Protocol

next: look into ideal packet sizes

min 68 bytes MTU (up to min 576?)

1500 MTU ethernet?

use DF (dont' fragment flag) and ICMP? to figure max size for path?

ip addr show  .. see MTU

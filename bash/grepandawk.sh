#!/usr/bin/bash 
echo "You have `free -mt | grep Mem | awk '{print $2}'`MB ram in total"
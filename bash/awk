#!/usr/bin/bash 
echo "You have `free -mt | grep Mem | awk '{print $2}'`MB ram in total"
# `free -mt` shows you all info about your ram
# Grep searches the output of `free -mt` and only shows the one line that matches the line "Mem"
# `awk '{print $2}'` only shows the second word from the output of grep
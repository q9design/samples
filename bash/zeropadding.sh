#!/usr/bin/bash 
read -p "Enter a number please: " saidnumber
echo "The zero padded version of that number is: `printf %04g $saidnumber`"
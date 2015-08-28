#!/usr/bin/bash 
read -p "Enter a number please: " saidnumber
echo "The zero padded version of that number is: `printf %04g $saidnumber`" # The `printf %04g $saidnumber` is what allows the number to be zero padded, to the 4th degree.
# You can use backticks `` to have the output of a command be printed out
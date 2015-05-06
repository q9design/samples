#!/usr/bin/bash 
echo "This is how you properly write things and retreive things from a file"
read -p "Enter anything you want: " texthere
echo $texthere >> ./tempfile
cat ./tempfile
rm ./tempfile
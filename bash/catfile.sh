#!/usr/bin/bash 
echo "This is how you properly write things and retreive things from a file"
read -p "Enter anything you want: " texthere 
echo $texthere >> ./tempfile # The >> makes a new file called tempfile and puts all output into that file 
cat ./tempfile	# Cat outputs the data in a file
rm ./tempfile # Remove tempfile
#!/usr/bin/env python3.5
NonPigString=input("Enter a word to be turned into Pig Latin")
NonPigArray=NonPigString.split()
for i in range(len(NonPigArray)): 
    print(NonPigArray[i][1:]+NonPigArray[i][0]+"ay", end=" ")
    # Python slices work as the following: variable[start:end]
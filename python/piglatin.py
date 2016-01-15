#!/usr/bin/env python3.5
NonPigWord=input("Enter a word to be turned into Pig Latin")
print(NonPigWord[1:]+NonPigWord[0]+"ay")
# Python slices work as the following: variable[start:end]
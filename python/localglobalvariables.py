#!/usr/bin/env python3.5

dogYears = 7

def func1():
	dogYears = 10
	print("Func1: ", dogYears)
	return

def func2():
	global dogYears
	print("Func2: ", dogYears)
	dogYears = dogYears + 1
	return

def func3():
	global dogYears
	print(dogYears)
	dogYears = 9
	return

def func4():
	print(dogYears)
	return
	
func1()
func2()
func3()
func4()
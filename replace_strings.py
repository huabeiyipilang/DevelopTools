# -*- coding:utf-8 -*-
import os,sys
import array
import re

def findStringFiles(rootdir):
	files = []
	for parent,dirnames,filenames in os.walk(rootdir):
		for dirname in  dirnames:
			pass

		for filename in filenames:
			if u'.xml' in filename:
				files.append(os.path.join(parent,filename))
				pass
	return files


origin = '60'   #原始文本
replace = '20'  #替换文本
keyword = '<string name="deep_saver_tips_content_a">'  #替换行的关键字

count = 0
currentDir = os.getcwd()
stringfiles = findStringFiles(currentDir)
for stringfile in stringfiles:
	if os.path.isfile(stringfile):
		fileread = open(stringfile,'r')
		lines = fileread.readlines()
		fileread.close()

		output  = open(stringfile,'w')

		for line in lines:
			if keyword in line:
				line = re.sub(origin, replace, line)
				count += 1
			output.write(line)

		output.close()
print count

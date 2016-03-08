# -*- coding:utf-8 -*-
#从目标工程下拷贝指定文案到目标工程
import os,sys
import array
import re

#原始目录
dir_copy_from = '/Users/baidu/developenv/workspace/DX-PowerManager'
#目标目录（当前目录）
dir_copy_to = os.getcwd()
#需要拷贝的字符串
string_names = ['smart_settings_switchmode_by_battery_on_des',
                'smart_settings_switchmode_time_on_des']

#文件原始路径转化为目标路径
def get_file_dst_dir(filename):
    return re.sub(dir_copy_from, dir_copy_to, filename)

#找到目录下所有xml文件
def find_xml_files(rootdir):
    files = []
    for parent,dirnames,filenames in os.walk(rootdir):
        for dirname in  dirnames:
            pass
            
        for filename in filenames:
            if u'.xml' in filename:
                files.append(os.path.join(parent,filename))
                pass
    return files

#将字符串写入目标文件
def write_strings_to_file(filename, strings):
    if len(strings) == 0:
        return False
    if os.path.isfile(filename):
        fileread = open(filename,'r')
        lines = fileread.readlines()
        fileread.close()

        output  = open(filename,'w')

        for line in lines:
            if '</resources>' in line:
                for string in strings:
                    output.write(string)
            output.write(line)
        output.close()
        print 'write ', len(strings), ' lines', filename
        return True
    else:
        print 'write error', filename
        return False

count = 0
#找到目标路径下所有xml文件
stringfiles = find_xml_files(dir_copy_from+'/res')
for stringfile in stringfiles:
    if os.path.isfile(stringfile):
        fileread = open(stringfile,'r')
        lines = fileread.readlines()
        fileread.close()

        found_strings = []
        for line in lines:
            for keyword in string_names:
                if keyword in line:
                    #找到目标资源
                    found_strings.append(line)

        #写入目标文件
        res = write_strings_to_file(get_file_dst_dir(stringfile), found_strings)
        if res:
            count += 1
print count, 'files copied'

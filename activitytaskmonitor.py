#coding=utf-8
#打印应用activity task堆栈

import sys,os,time

#刷新时间间隔
duration = 1


if len(sys.argv) != 2:
	print '检查参数正确性：'
	print 'python',sys.argv[0],'包名'
	exit()

pkg = sys.argv[1]
frame = 0

def log(log):
	# print log
	pass

#执行命令
def run(cmd):
	return os.popen(cmd).read().strip('\n')
	pass

#Task类
class ActivityTask:
	def __init__(self, task_id):
		self.task_id = task_id
		self.activities = []

#判断是否有唯一可用设备
def is_env_avialble():
	result = run('adb devices')
	lines = result.split('\n')
	if len(lines) == 0 or lines[0] != 'List of devices attached':
		return 1 # Command adb error!
	elif len(lines) == 1:
		return 2 # No device!
	elif len(lines) > 2:
		return 3 # More than 1 device!
	elif 'offline' in lines[1]:
		return 4 # Device offline!
	else:
		return 0 # Success

def substring_index(text, sub_string):
	try:
		return text.index(sub_string)
	except Exception, e:
		return -1

#解析数据
def parse_lines(lines, pkg):
	tasks = []
	for line in lines:
		if 'Task id #' in line:
			task_id = line[line.index('#'):]
		elif '* TaskRecord{' in line:
			is_pkg = pkg in line
			if is_pkg:
				print '\n',task_id
		elif '* Hist #' in line and is_pkg:
			activity = line[line.rindex('.')+1:line.rindex('t')-1]
			print activity
	return tasks

def print_title():
	os.system('clear')
	print 'Frame:',frame,'   ','Duration:',duration,'s','   ','Package Name:',pkg,'\n'


while 1:
	frame += 1
	env_available = is_env_avialble();
	if env_available == 1:
		print 'Command adb error!'
		exit()
	elif env_available == 2:
		print 'No device!'
		exit()
	elif env_available == 3:
		print 'More than 1 device!'
		exit()
	elif env_available == 4:
		print 'Device offline!'
		exit()

	cmd = 'adb shell dumpsys activity activities'

	cmd_output = run(cmd)
	start_index = substring_index(cmd_output, 'Running activities (most recent first):')

	#处理应用没有打开activity的情况
	if start_index < 0:
		print_title()
		print 'App has no activity tasks!'
		time.sleep(duration)
		continue

	lines = cmd_output.split('\n')
	print_title()
	tasks = parse_lines(lines, pkg)
	time.sleep(duration)

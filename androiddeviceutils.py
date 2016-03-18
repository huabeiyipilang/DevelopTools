#coding=utf-8
import sys,os
import re

class DeviceInfo:
	def __init__(self, name, width, height, density, navigation_bar):
		self.name = name
		self.width = width
		self.height = height
		self.density = density
		self.navigation_bar = navigation_bar

#预置手机
devices = [
	DeviceInfo('HTC Desire S', 480, 800, 240, 0),
	DeviceInfo('HTC Wildfire', 240, 320, 120, 0),
	DeviceInfo('Sony Xperia Z3', 1080, 1776, 480, 1),
	DeviceInfo('Galaxy S6', 1440, 1776, 480, 0),
	DeviceInfo('Galaxy Note Edge', 1600, 2560, 640, 0)
	]

def log(log):
	# print log
	pass

#执行命令
def run(cmd):
	return os.popen(cmd).read().strip('\n')
	pass

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

#打印手机信息
def print_device_info():
	print run('adb shell wm size')
	print run('adb shell wm density')

#获取手机屏幕原始尺寸
def get_screen_size():
	output = run('adb shell wm size')
	pattern = re.compile("Physical size: (\d*)x(\d*)")
	res = pattern.search(output)
	if res == None:
		return None
	res = res.groups()
	return res

#获取手机屏幕原始密度
def get_screen_density():
	output = run('adb shell wm density')
	pattern = re.compile("Physical density: (\d*)")
	res = pattern.search(output)
	if res == None:
		log('None')
		return None
	res = res.groups()
	log(int(res[0]))
	return int(res[0])

#设置手机屏幕尺寸
def set_size(width, height):
	run('adb shell wm size '+str(width)+'x'+str(height))
	print 'Change size: '+str(width)+'x'+str(height)

#设置手机屏幕密度
def set_density(density):
	run('adb shell wm density '+str(density))
	print 'Change density: '+str(density)

#重启手机
def reboot():
	run('adb reboot')
	print 'reboot'

#应用机型配置
def setup_device(device, height_extras = 0):
	navigator_height = 0
	if device.navigation_bar != 0:
		navigator_height = device.navigation_bar == 1 ? 48 : device.navigation_bar;
	navigator_height = float(device.density)/float(240)*navigator_height
	set_size(device.width, int(device.height)+int(height_extras)-navigator_height)
	set_density(device.density)
	reboot()


############命令开始############

#判断环境有效性
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


#处理命令
cmd = sys.argv[1]
if cmd == 'info':
	print_device_info()
	exit()
elif cmd == 'reset':
	run('adb shell wm size reset')
	run('adb shell wm density reset')
	run('adb shell reboot')
	exit()
elif cmd == 'size':
	cmd_parts = sys.argv[2].split('x')
	if len(cmd_parts) == 2:
		if cmd_parts[0].isdigit() and cmd_parts[1].isdigit():
			#改变尺寸的命令
			screen_size = get_screen_size()
			screen_density = get_screen_density()

			origin_w = float(screen_size[0])
			origin_h = float(screen_size[1])
			to_w = float(cmd_parts[0])
			to_h = float(cmd_parts[1])

			scale_w = to_w / origin_w
			log(scale_w)
			scale_h = to_h / origin_h
			log(scale_h)
			scale = scale_w if scale_w < scale_h else scale_h
			log(scale)
			to_d = int(screen_density * scale)
			log(screen_density)
			log(to_d)

			set_size(cmd_parts[0], cmd_parts[1])
			set_density(to_d)
			reboot()
			exit()
	else:
		print "error command"
elif cmd == 'density':
	density = sys.argv[2]
	if density == 'ldpi':
		density = '120'
	elif density == 'mdpi':
		density = '160'
	elif density == 'hdpi':
		density = '240'
	elif density == 'xhdpi':
		density = '320'
	elif not density.isdigit():
		print 'density error'
		exit();

	screen_density = get_screen_density()
	screen_size = get_screen_size()
	scale = float(density) / float(screen_density)
	width = int(scale * float(screen_size[0]))
	height = int(scale * float(screen_size[1]))
	set_size(width, height)
	set_density(density)
	reboot()
elif cmd == 'devices':
	if len(sys.argv) > 2:
		#设备编号
		index = sys.argv[2]
		if index.isdigit():
			device = devices[int(index)]
			navigator_height = 0
			if len(sys.argv) > 3 and sys.argv[3].isdigit():
				navigator_height = int(sys.argv[3])
				if navigator_height == 1:
					navigator_height = 48
				navigator_height = float(device.density)/float(240)*navigator_height
			setup_device(device, navigator_height)
	else:
		#输出设备信息
		print 'Index\tDevice\t\t\tSize\t\tDensity\t\tNavigationBar'
		for x in xrange(0, len(devices)):
			device = devices[x]
			print x,'\t', devices[x].name, '\t\t',str(device.width)+'x'+str(device.height), '\t',str(device.density), '\t\t',str(device.navigation_bar)
elif cmd == 'help':
	print '''
	1. info                             打印本机信息.
	2. devices                          打印预置机型列表
	3. devices [index] [navigator]      应用手机配置，[index]表示机型序号， [navigator]表示本机是否是虚拟按键， 0或空表示
	                                    没有，1表示有且使用默认高度48dp， >1为自定义高度
	'''
	pass
elif cmd == 'test':
	pass
else:
	print 'Command error!'

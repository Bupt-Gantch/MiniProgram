var chinese = require("/Chinese.js")
var english = require("/English.js")
var app = getApp();
var content = app.getLanuage(app.globalData.language)

class Config {
  constructor() {}
}

Config.restUrl = 'https://smart.gantch.cn/api/v1/';
Config.regeoUrl = 'https://restapi.amap.com/v3/geocode/regeo';
Config.wsUrl = 'wss://smart.gantch.cn/api/v1/deviceaccess/websocket';

Config.switchOnUrl = ['../../imgs/test/switch@on.png', '../../imgs/test/socket@on.png']; //开关和插座亮时的图片
Config.curtainOnUrl = ['../../imgs/test/curtain-open.png', '../../imgs/test/curtain-closed.png']; //开关和插座亮时的图片
Config.dimmableLightOnUrl = ['../../imgs/test/bump2.png', '../../imgs/test/bump2@on.png'], //开关和插座亮时的图片
  Config.curtainOnUrl = ['../../imgs/test/curtain-open.png', '../../imgs/test/curtain-closed.png'], //开关和插座亮时的图片
  Config.gatewayUrl = ['../../imgs/test/default.png', '../../imgs/test/gateway.png', '../../imgs/test/nowgateway.png', '../../imgs/test/nowgateway1.png'],
  Config.iASZoneUrl = ['../../imgs/test/infrared.png', '../../imgs/test/smoke.png', '../../imgs/test/flooding.png', '../../imgs/test/dos.png', '../../imgs/test/sos.png'],
  Config.categoryImgUrl = '../../imgs/category/',
  Config.findAllPosts = 'findAllPosts',
  Config.findAllPostsByOpenId = 'findAllPostsByOpenId',
  Config.search = 'search',
  Config.addPost = 'addPost',
  Config.deletePost = 'deletePost',
  Config.updatePost = 'updatePost',
  Config.favorite = 'favorite',
  Config.findComment = 'findComment',
  Config.addComment = 'addComment',
  Config.deleteComment = 'deleteComment',
  Config.categoryName = [content.alldevice, content.bulb, content.swi, content.curtain, content.socket, content.monitor, content.lock, content.infrared,content.sensor,  content.othertypes];
Config.categoryType = {
  '灯泡': ['dimmableLight'],
  '开关': ['switch'],
  '窗帘': ['curtain'],
  '插座': ['outlet'],
  '监控': ['monitor'],
  '门锁': ['lock'],
  '红外宝': ['infrared'],
  '传感器': ['temperature', 'PM2.5', 'IASZone', 'lightSensor'],
  '场景开关': ['dimmableLight', 'curtain', 'switch'],
};
Config.homeCategoryType = {
  '灯泡': ['dimmableLight'],
  '插座': ['outlet'],
  '窗帘': ['curtain'],
  '传感器': ['temperature', 'PM2.5', 'IASZone', 'lightSensor'],
  '开关': ['switch'],
  '监控': ['monitor'],
  '门锁': ['lock'],
  '红外宝': ['infrared'],
};
Config.secneType = [content.scenetypes]

Config.categoryTypeArray = ['dimmableLight', 'outlet', 'curtain', 'temperature', 'PM2.5', 'IASZone', 'lightSensor', 'switch', 'monitor', 'lock','infrared'];

Config.deviceImgUrl = {
  'dimmableLight': '../../imgs/test/bump2.png',
  'outlet': '../../imgs/test/socket@off.png',
  'curtain': '../../imgs/test/curtain.png',
  'temperature': '../../imgs/test/sensor.png',
  'PM2.5': '../../imgs/test/pm2.5.png',
  'IASZone': '../../imgs/test/IASZone.png',
  'lightSensor': '../../imgs/test/lightSensor.png',
  'switch': '../../imgs/test/switch@off.png',
  'sceneSelector': '../../imgs/test/sceneSelector.png',
  'default': '../../imgs/test/default.png',
  'monitor': '../../imgs/test/monitor.png',
  'lock': '../../imgs/test/smartLock.png',
  'infrared': '../../imgs/test/infraredO.png'
  //...以此类推
};

Config.otherImg = {
  'group': '../../imgs/test/group.png',
  'scene': '../../imgs/test/scene.png'
};

Config.serviceName = {
  controlSwitch: 'control switch',
  controlDimmableLight: 'control dimmableLight',
  controlCurtain: 'control curtain',
  controlLock:'control lock',
};

Config.keyName = {
  'illumination': '光照度',
  'temperature': '温度',
  'humidity': '湿度',
  'electric(%)': '电池电量',
  'lockState': '锁状态',
  'operate': '操作',
  'unlock method': '解锁方式',
  'PM2.5': 'PM2.5',
  'alarm':'状态值',
};

Config.valueName = {
  '1.0*': '异常',
  '0.0*': '正常',
  '1*': '异常',
  '0*': '正常',
  '1**': '关门',
  '2**': '开门',
  '3**': '非法操作报警',
  '5**': '非法卡',
  'Duress alarm': '胁迫报警',
  'Double verification mode': '双人验证模式',
  'Verify the administrator to enter the menu': '验证管理员进入菜单',
  'Disable the door lock to open normally': '取消门锁常开',
  'Enable the door lock to open normally': '启用门锁常开',
  'password': '密码开锁',
  'fingerprint': '指纹开锁',
  'card': '刷卡开锁',
  'remote': '远程开锁',
};





export {
  Config
};
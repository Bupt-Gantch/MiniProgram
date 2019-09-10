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
  Config.iASZoneUrl = ['../../imgs/test/infrared.png', '../../imgs/test/smoke.png', '../../imgs/test/flooding.png', '../../imgs/test/dos.png', '../../imgs/test/sos.png','../../imgs/test/gas.png'],
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
  // Config.categoryName = [content.alldevice, content.bulb, content.swi, content.curtain, content.socket, content.monitor, content.lock, content.infrared,content.sensor,  content.othertypes];
  Config.categoryType = {
    '灯泡': ['dimmableLight'],
    '开关': ['switch'],
    '窗帘': ['curtain'],
    '插座': ['outlet'],
    // '监控': ['monitor'],
    '门锁': ['lock'],
    '红外宝': ['infrared', 'newInfrared'],
    '传感器': ['temperature', 'PM2.5', 'IASZone', 'lightSensor'],
    '场景开关': ['dimmableLight', 'curtain', 'switch'],
  };
Config.homeCategoryType = {
  '灯泡': ['dimmableLight'],
  '插座': ['outlet'],
  '窗帘': ['curtain'],
  '传感器': ['temperature', 'PM2.5', 'IASZone', 'lightSensor'],
  '开关': ['switch'],
  // '监控': ['monitor'],
  '门锁': ['lock'],
  '红外宝': ['infrared', 'newInfrared'],
};

// Config.categoryTypeArray = ['dimmableLight', 'outlet', 'curtain', 'temperature', 'PM2.5', 'IASZone', 'lightSensor', 'switch', 'monitor', 'lock', 'infrared', 'newInfrared'];
Config.categoryTypeArray = ['dimmableLight', 'outlet', 'curtain', 'temperature', 'PM2.5', 'IASZone', 'lightSensor', 'switch', 'lock', 'infrared', 'newInfrared'];

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
  'infrared': '../../imgs/test/infraredO.png',
  'newInfrared': '../../imgs/test/infraredO.png',
  'SoundLightAlarm':'../../imgs/test/SoundLightAlarm.png',
  //...以此类推
};

Config.otherImg = {
  'group': '../../imgs/test/group.png',
  'scene': '../../imgs/test/scene.png'
};
Config.ownInfrared = '../../imgs/test/own.png';
Config.buttonInfrared = '../../imgs/test/ownLearn.png';

Config.infraredImg = [{
    'img': '../../imgs/test/conditioner.png',
    'id': '1',
    'name': '空调',
  },
  {
    'img': '../../imgs/test/tv.png',
    'id': '2',
    'name': '电视',
  },
  {
    'img': '../../imgs/test/slingbox.png',
    'id': '3',
    'name': '机顶盒',
  },
  {
    'img': '../../imgs/test/DVD.png',
    'id': '4',
    'name': 'DVD'
  },
  {
    'img': '../../imgs/test/learn.png',
    'id': '5',
    'name': '自定义学习'
  }
];


Config.tvImg = [
  {
    'img': '../../imgs/icon/power.png',
    'id': '1',
    'name': '电源',
  },
  {
    'img': '../../imgs/icon/source.png',
    'id': '2',
    'name': '信号源'
  },
  {
    'img': '../../imgs/icon/arrowUp.png',
    'id': '3',
    'name': '上'
  },
  {
    'img': '../../imgs/icon/arrowDown.png',
    'id': '4',
    'name': '下'
  },
  {
    'img': '../../imgs/icon/arrowLeft.png',
    'id': '5',
    'name': '左'
  },
  {
    'img': '../../imgs/icon/arrowRight.png',
    'id': '6',
    'name': '右'
  },
  {
    'img': '../../imgs/icon/v+.png',
    'key': '7',
    'name': '音量加',
  },
  {
    'img': '../../imgs/icon/v-.png',
    'key': '8',
    'name': '音量减',
  },
  {
    'img': '../../imgs/icon/v0.png',
    'id': '9',
    'name': '静音',
  },
  {
    'img': '../../imgs/icon/mate.png',
    'id': '10',
    'name': '匹配',
  }
];

Config.conditionerImg = [
  {
    'img': '../../imgs/icon/power.png',
    'id': '1',
    'name': '电源',
  },
  {
    'img': '../../imgs/icon/hot.png',
    'id': '2',
    'name': '制热'
  },
  {
    'img': '../../imgs/icon/cold.png',
    'id': '3',
    'name': '制冷'
  },
  {
    'img': '../../imgs/icon/model.png',
    'id': '4',
    'name': '模式'
  },
  {
    'img': '../../imgs/icon/tem+.png',
    'id': '5',
    'name': '温度加'
  },
  {
    'img': '../../imgs/icon/tem-.png',
    'key': '6',
    'name': '温度减',
  },
  {
    'img': '../../imgs/icon/wind.png',
    'key': '7',
    'name': '风力',
  },
  {
    'img': '../../imgs/icon/mate.png',
    'id': '8',
    'name': '学习'
  },
];

Config.serviceName = {
  controlSwitch: 'control switch',
  controlDimmableLight: 'control dimmableLight',
  controlCurtain: 'control curtain',
  controlLock: 'control lock',
  controlIR: 'control IR',
  controlSoundLightAlarm:'control SoundLightAlarm',
};

Config.methodName = {
  match: 'match',
  learn: 'learn',
  penetrate: 'penetrate',
  currentKey: 'currentKey',
  deleteKey: 'deleteKey',
  deleteAllKey: 'deleteAllKey',
  exit: 'exit',
  getVersion:'getVersion'
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
  'alarm': 'alarm',
  'surpervision':'surpervision',
  'battery':'电量状态',
};

Config.valueName = {
  '1.0*': '报警',
  '0.0*': '正常',
  '1*': '报警',
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
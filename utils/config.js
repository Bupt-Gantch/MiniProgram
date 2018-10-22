var chinese = require("/Chinese.js")
var english = require("/English.js")
var app = getApp();
var content = app.getLanuage(app.globalData.language)

class Config{
  constructor(){
  }
}

Config.restUrl = 'https://smart.gantch.cn/api/v1/';
Config.regeoUrl = 'https://restapi.amap.com/v3/geocode/regeo';
//Config.openid = 'https://api.weixin.qq.com/sns/jscode2session';
Config.wsUrl = 'wss://smart.gantch.cn/api/v1/deviceaccess/websocket';

Config.switchOnUrl = ['../../imgs/test/switch@on.png','../../imgs/test/socket@on.png'];  //开关和插座亮时的图片
Config.categoryImgUrl = '../../imgs/category/';

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
Config.categoryName = [content.alldevice, content.bulb, content.socket, content.curtain, content.sensor, content.swi,content.othertypes];
Config.categoryType = {
  '灯泡': ['dimmableLight'],
  '插座': ['outlet'],
  '窗帘': ['curtain'],
  '传感器': ['temperature', 'PM2.5', 'IASZone'],
  '开关': ['switch'],
  '场景开关':['dimmableLight','curtain','switch'],
};
Config.homeCategoryType = {
  '灯泡': ['dimmableLight'],
  '插座': ['outlet'],
  '窗帘': ['curtain'],
  '传感器': ['temperature', 'PM2.5', 'IASZone'],
  '开关': ['switch'],
};
Config.secneType = [content.scenetypes]

Config.categoryTypeArray = ['dimmableLight', 'outlet', 'curtain', 'temperature', 'PM2.5','IASZone','switch'];

Config.deviceImgUrl = {
  'dimmableLight': '../../imgs/test/bump2.png',
  'outlet': '../../imgs/test/socket@off.png',
  'curtain': '../../imgs/test/curtain.png',
  'temperature': '../../imgs/test/sensor.png',
  'PM2.5': '../../imgs/test/pm2.5.png',
  'IASZone': '../../imgs/test/IASZone.png',
  'switch': '../../imgs/test/switch@off.png',
  'sceneSelector': '../../imgs/test/sceneSelector.png',
  'default': '../../imgs/test/default.png'
  //...以此类推
};

Config.otherImg = {
  'group': '../../imgs/test/group.png',
  'scene':'../../imgs/test/scene.png'
};

Config.serviceName = {
  controlSwitch: 'control switch',
  controlDimmableLight: 'control dimmableLight',
  controlCurtain: 'control curtain'
};

export {Config};
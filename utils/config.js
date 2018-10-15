var chinese = require("/Chinese.js")
var english = require("/English.js")
var app = getApp();
var content = app.getLanuage(app.globalData.language)

class Config{
  constructor(){
  }
}

// Config.restUrl = 'http://x.cn/api/v1/';
// Config.imagesUrl = 'http://x.cn/images';
Config.restUrl = 'http://10.108.217.108:8080/api/v1/wechatPost/';
// Config.restUrl = 'http://de7d4dc8.ngrok.io/api/v1/wechatPost/'
Config.account = 'http://47.105.120.203:30080/api/v1/account/';
Config.openid = 'https://api.weixin.qq.com/sns/jscode2session';
Config.wsUrl = 'ws://10.108.218.64:30080/api/v1/deviceaccess/websocket';
//Config.wsUrl = 'ws://39.104.189.84:8800/api/warning/webSocket';
Config.switchOnUrl = ['../../imgs/test/switch@on.png','../../imgs/test/socket@on.png'];  //开关和插座亮时的图片
Config.bannerImageUrl = '../../imgs/banner/';
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
Config.categoryName = [content.alldevice, content.bulb, content.socket, content.curtain, content.sensor, content.swi, content.othertypes];
Config.categoryType = {
  '灯泡': ['dimmableLight'],
  '插座': ['outlet'],
  '窗帘': ['curtain'],
  '传感器': ['temperature', 'PM2.5', 'IASZone'],
  '开关': ['switch'],
};

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


//debug
Config.debug = true;

Config.test = '2';

export {Config};
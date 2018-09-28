

class Config{
  constructor(){

  }
}

// Config.restUrl = 'http://x.cn/api/v1/';
// Config.imagesUrl = 'http://x.cn/images';
Config.restUrl = 'http://10.108.218.64:30080/api/v1/';
Config.wsUrl = 'ws://10.108.218.64:30080/api/v1/deviceaccess/websocket';
Config.imagesUrl = ['../../imgs/test/switch@on.png','../../imgs/test/socket@on.png'];  //开关和插座亮时的图片
Config.bannerImageUrl = '../../imgs/banner/';
Config.categoryImgUrl = '../../imgs/category/';
Config.categoryName = ['所有设备', '灯泡', '插座', '窗帘', '传感器', '开关','其他类型'];
Config.categoryType = {
  '灯泡': ['dimmableLight'],
  '插座': ['outlet'],
  '窗帘': ['curtain'],
  '传感器': ['temperature', 'PM2.5', 'IASZone'],
  '开关': ['switch'],
};

Config.categoryTypeArray = ['dimmableLight', 'outlet', 'curtain', 'temperature', 'PM2.5','IASZone','switch'];

Config.deviceImgUrl = {
  'dimmableLight': '../../imgs/test/switch@on.png',
  'outlet': '../../imgs/test/socket@on.png',
  //...以此类推
};


//debug
Config.debug = false;

Config.test = '2';

export {Config};


class Config{
  constructor(){

  }
}

// Config.restUrl = 'http://x.cn/api/v1/';
// Config.imagesUrl = 'http://x.cn/images';
Config.restUrl = 'https://beiyouxianyu.cn/api/v1/';
Config.imagesUrl = ['../../imgs/test/switch@on.png','../../imgs/test/socket@on.png'];  //开关和插座亮时的图片
Config.bannerImageUrl = '../../imgs/banner/';
Config.categoryImgUrl = '../../imgs/category/';
Config.categoryName = ['所有设备', '灯泡', '插座', '窗帘', '传感器', '开关','其他类型'];
Config.campus = ['校本部','沙河校区','宏福校区'];


//debug
Config.debug = true;

Config.test = '2';

export {Config};
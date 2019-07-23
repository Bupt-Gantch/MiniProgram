import { Base } from '../../../utils/base.js';
import { Config } from '../../../utils/config.js';

class CamerasShow extends Base {
  constructor() {
    super();
  }

  //获取当前用户全部摄像头列表信息
  getCamerasByUid(param, callback) {
    var params = {
      url: param.url,
      data:param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //启动摄像头的推流
  openCameraRtmp(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //启动某一摄像头的直播
  startCameraRtmp(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //关闭某一摄像头的直播
  closeCameraRtmp(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //添加摄像头
  addCamera(param, callback) {
    var params = {
      url: param.url,
      data: param,
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //删除摄像头
  deleteCamera(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //更新摄像头信息
  updateCameraInfo(param, callback) {
    var params = {
      url: param.url,
      data: param,
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //更新萤石云信息
  updateUser(param, callback) {
    var params = {
      url: param.url,
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
}

export { CamerasShow };
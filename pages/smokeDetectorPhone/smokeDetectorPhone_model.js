import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js';

class SmokeBindInfo extends Base {
  constructor() {
    super();
  }

  //获取烟感绑定的手机列表
  getSmokeBindInfo(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //删除烟感绑定的手机号
  delSmokeBindInfo(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //添加烟感绑定的手机号
  addSmokeBindInfo(param, callback) {
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

export { SmokeBindInfo };
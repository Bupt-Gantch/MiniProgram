import { Base } from '../../../utils/base.js';
import { Config } from '../../../utils/config.js';

class YingShiRegister extends Base {
  constructor() {
    super();
  }
  //判断用户提交的appKey是否有效
  checkYingShiInfo(param, callback) {
    var params = {
      url: param.url,
      data: param,
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }
  //判断用户是否提交过appKey且有效
  getAccessToken(param, callback) {
    var params = {
      url: param.url,
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }
}

export { YingShiRegister };
import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js';
class Loading extends Base {
  constructor() {
    super()
  }
//获取用户的openid
  getOpenid(param, callback) {
    var params = {
      url: Config.openid,
      data: param.data,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }
//查询用户表，是否存在openid
  findOpenid(openid, callback) {
    var param = {
      url: 'account/userLogin',
      data:{
        openid:openid
      },
      method:'POST',
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {
  Loading
}
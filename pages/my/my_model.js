import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class My extends Base {
  constructor() {
    super()
  }
  getMyUp(openid,callback){
    var param = {
      url: Config+'?openid='+openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(param)
  }

  getMyComment(openid, callback) {
    var param = {
      url: '?openid=' + openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }
}

export {My}
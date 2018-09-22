import { Base } from '../../utils/base.js'
class My extends Base {
  constructor() {
    super()
  }
  


  getMyUp(openid,callback){
    var param = {
      url: '?openid=' + openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
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
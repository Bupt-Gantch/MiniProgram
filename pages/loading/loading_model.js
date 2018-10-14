import {
  Base
} from '../../utils/base.js'
class Loading extends Base {
  constructor() {
    super()
  }
//获取用户的openid
  getOpenid(data, callback) {
    var param = {
      data: data.data,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  findOpenid(openid, callback) {
    var param = {
      url: 'userLogin',
      data:{
        openid:openid
      },
      method:'POST',
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.req_account(param);
  }
}

export {
  Loading
}
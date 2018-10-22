import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js'

class Release extends Base {
  constructor() {
    super();
  }

  addPlace(param, callback) {
    var params = {
      url: Config.regeoUrl+'?key=' + param.data.key + '&location=' + param.data.location + '&extensions=' + param.data.extensions + '&radius=' + param.data.radius,
      data: param.data,
      method: 'POST',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request_test(params);
  }

  addContent(param,callback){
    var params = {
      url: 'wechatPost/addPost',
      data:param,
      method:'POST',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(params);
  }
}

export {Release}
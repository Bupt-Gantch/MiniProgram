import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js'

class Release extends Base {
  constructor() {
    super();
  }

  addPlace(param, callback) {
    var params = {
      url: 'https://restapi.amap.com/v3/geocode/regeo?key=' + param.data.key + '&location=' + param.data.location + '&extensions=' + param.data.extensions + '&radius=' + param.data.radius,
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
      url: Config.restUrl+'addPost',
      data:param,
      method:'POST',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request_test(params);
  }
}

export {Release}
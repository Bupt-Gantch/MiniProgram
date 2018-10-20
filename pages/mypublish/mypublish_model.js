import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class myPublish extends Base {
  constructor() {
    super()
  }

  getMyPublish(param, callback) {
    var params = {
      url: Config.postUrl+'findAllPosts',
      method:'POST',
      data:param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }

  deleteInformation(param,callback){
    var params = {
      url: Config.postUrl+'deletePost',
      method:'POST',
      data:param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params);
  }
}

export {myPublish}
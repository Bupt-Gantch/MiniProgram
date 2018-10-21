import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class myNews extends Base {
  constructor() {
    super()
  }

  getNews(param, callback) {
    var params = {
      url: 'wechatPost/findAllPosts',
      method: 'POST',
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }

  deleteInformation(param, callback) {
    var params = {
      url: 'wechatPost/deletePost',
      method: 'POST',
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
}

export { myNews }
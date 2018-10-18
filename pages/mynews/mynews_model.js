import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class myNews extends Base {
  constructor() {
    super()
  }

  getNews(param, callback) {
    var params = {
      url: Config.restUrl + 'findAllPosts',
      method: 'POST',
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }

  deleteInformation(param, callback) {
    var params = {
      url: Config.restUrl + 'deletePost',
      method: 'POST',
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params);
  }
}

export { myNews }
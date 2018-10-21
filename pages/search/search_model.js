import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class Search extends Base {
  constructor() {
    super()
  }

  getSearch(param, callback) {
    var params = {
      url: 'wechatPost/search',
      method: 'POST',
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
}

export { Search }
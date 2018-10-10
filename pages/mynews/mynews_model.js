import { Base } from '../../utils/base.js'
class myNews extends Base {
  constructor() {
    super()
  }

  getMyNews(openid, callback) {
    var param = {
      url: '?openid=' + openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }
}

export { myNews }
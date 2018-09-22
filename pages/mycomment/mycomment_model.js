import { Base } from '../../utils/base.js'
class myComment extends Base {
  constructor() {
    super()
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

export { myComment }
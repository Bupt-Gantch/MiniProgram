import { Base } from '../../utils/base.js'
class myUp extends Base {
  constructor() {
    super()
  }

  getMyUp(openid, callback) {
    var param = {
      url: '?openid=' + openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }
}

export { myUp }
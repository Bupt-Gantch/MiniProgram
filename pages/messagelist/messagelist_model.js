import {
  Base
} from '../../utils/base.js'
import {
  Config
} from '../../utils/config.js'
class Message extends Base {
  constructor() {
    super()
  }

  /**获取所有信息 */
  getAllTips(openid, callback) {
    var param = {
      url: `wechatPost/getAllTips/${openid}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  /**获取所有未读信息 */
  getUnreadTips(openid, callback) {
    var param = {
      url: `wechatPost/getUnreadTips/${openid}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  /**已读所有信息 */
  readTips(openid, callback) {
    var param = {
      url: `wechatPost/readTips`,
      // method:'POST',
      data:openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }
}

export {
  Message
}
import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js';

class Register extends Base {
  constructor() {
    super();
  }

  register(data, callback) {
    var param = {
      url:Config.account+data.url,
      data: data.data,
      method: 'POST',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    console.log(param)
    this.req_account(param);
  }
}

export { Register }
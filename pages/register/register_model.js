import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js';

class Register extends Base {
  constructor() {
    super();
  }

  register(param, callback) {
    var params = {
      url: 'account/createUser',
      data: param.data,
      method: 'POST',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.request(params);
  }
}

export { Register }
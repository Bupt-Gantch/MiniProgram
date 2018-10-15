import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js';

class Register extends Base {
  constructor() {
    super();
  }

  register(data, callback) {
    var param = {
      url:'createUser',
      data: data.data,
      method: 'POST',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.req_account(param);
  }
}

export { Register }
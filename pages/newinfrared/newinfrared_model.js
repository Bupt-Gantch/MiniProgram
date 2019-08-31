import {
  Base
} from '../../utils/base.js';
import {
  Config
} from '../../utils/config.js';

class NewInfrared extends Base {
  constructor() {
    super();
  }

  getDeviceInfo(id, callback) {
    var param = {
      url: `deviceaccess/device/${id}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

};

export {
  NewInfrared
};
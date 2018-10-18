import { Base } from '../../utils/base.js';

class Scene extends Base {
  constructor() {
    super();
  }

  getAllDevices(callback) {
    var param = {
      url: 'deviceaccess/tenant/devices/2?limit=1000',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}

export { Scene };
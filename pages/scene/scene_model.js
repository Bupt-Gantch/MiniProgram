import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js'

class Scene extends Base {
  constructor() {
    super();
  }

  getAllDevices(callback) {
    var param = {
      url: `deviceaccess/customerdevices/2/${customerId}?limit=1000`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getSceneDevices(sceneid,callback) {
    var param = {
      url: 'scene/getScene/'+sceneid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getDeviceById(deviceid, callback) {
    var param = {
      url: 'deviceaccess/device/'+deviceid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export { Scene };
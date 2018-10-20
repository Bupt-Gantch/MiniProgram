import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js'

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

  getSceneDevices(sceneid,callback) {
    var param = {
      url: Config.sceneUrl+'getScene/'+sceneid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(param);
  }
}

export { Scene };
import { Base } from '../../utils/base.js';

class Scene extends Base {
  constructor() {
    super();
  }

  getAllDevices(customerid, callback) {
    var param = {
      url: 'deviceaccess/alldevices/' + customerid + '?limit=1000',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getSceneDevices(sceneid,callback) {
    var param = {
      url: 'deviceaccess/tenant/devices/2?'+sceneid+'limit=1000',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export { Scene };
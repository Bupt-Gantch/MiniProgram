import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js'

class Scene extends Base {
  constructor() {
    super();
  }

  getAllDevices(customerId, callback) {
    var param = {
      //url: 'deviceaccess/tenant/devices/2?limit=1000',
      url: `deviceaccess/customerdevices/2/${customerId}?limit=1000`,
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

  addscene(param,callback){
    console.log(param)
    var params = {
      url:'scene/add',
      data:param,
      method:'POST',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(params);
  }
}

export { Scene };
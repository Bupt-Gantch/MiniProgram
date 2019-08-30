import {
  Base
} from '../../utils/base.js'
import {
  Config
} from '../../utils/config.js'
class Family extends Base {
  constructor() {
    super()
  }

  //获取所有设备
  getAllDevices(customerId, callback) {
    var param = {
      url: `deviceaccess/customerdevices/2/${customerId}?limit=1000`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }


  /**
 * 根据设备id获取设备详情信息
 */
  getDeviceById(deviceid, callback) {
    var param = {
      url: 'deviceaccess/device/' + deviceid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /**
* 获取分享的网关
*/
  getShareGateway(param, callback) {
    var params = {
      url: `account/getGates`,
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  } 

  /**
 * 主人取消分享
 */
  onOwnerUnShare(param, callback) {
    var params = {
      url: 'account/unBindedGate',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }

 
}

export {
  Family
}
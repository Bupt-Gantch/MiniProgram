
import {Base} from '../../utils/base.js';
class Home extends Base{
  constructor(){
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

  
  /**获取设备实时数据 */
  getRealtimeData(deviceId, sConCb, fConCb, onDataCb) {
    var param = {
      url: "",
      deviceId: deviceId,
      sConnectCb: function (res) {
        sConCb && sConCb(res);
      },
      fConnectCb: function (err) {
        fConCb && fConCb(err);
      },
      onMsgCb: function (data) {
        onDataCb: onDataCb(data);
      }
    };

    return this.realTimeDevice(param);
  }
}

export {Home};
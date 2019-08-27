
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

  
  //获取设备最新数据
  getlatestData(deviceId, callback) {
    var param = {
      url: `deviceaccess/data/alllatestdata/${deviceId}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  //获取设备历史数据
  getHistoryData(param, callback){
    var params = {
      url: `deviceaccess/data/alldata/${param.deviceId}`,
      data:param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
}

export {Home};
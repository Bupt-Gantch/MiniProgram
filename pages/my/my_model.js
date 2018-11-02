import {
  Base
} from '../../utils/base.js'
import {
  Config
} from '../../utils/config.js'
class My extends Base {
  constructor() {
    super()
  }

  //添加设备
  addDevice(param, callback) {
    var params = {
      url: Config.restUrl + 'deviceaccess/assignAll/' + param.customerId + '?gateway_user=' + param.gateway_user,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }

//获取所有设备
  getAllDevices(customerId, callback) {
    var param = {
      url: `deviceaccess/customerdevices/2/${customerId}?limit=1000`,
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  deleteGateway(param,callback){
    console.log(param)
    var params = {
      url:`deviceaccess/unassign/${param.customerId}?gateway_name=${param.gatewayName}`,
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(params);
  }
}

export {
  My
}
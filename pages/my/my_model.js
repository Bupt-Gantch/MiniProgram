import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class My extends Base {
  constructor() {
    super()
  }
  
  //添加设备
  addDevice(param,callback){
    var params = {
      url: 'deviceaccess/assignAll/' + param.customerId+'?gateway_user="'+param.gateway_user+'"',
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(params)
  }
}

export {My}
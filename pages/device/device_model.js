import {Base} from '../../utils/base.js';

class Device extends Base{
  constructor(){
    super();
  }
  getDeviceInfo(id,callback){
    var param = {
      url : 'product/' + id,
      sCallback : function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export {Device};

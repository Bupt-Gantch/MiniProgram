import {Base} from '../../utils/base.js';

class Device extends Base{
  constructor(){
    super();
  }
  getDeviceInfo(id,callback){
    var param = {
      url: `deviceaccess/device/${id}`,
      sCallback : function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /**获取设备实时数据 */
  getRealtimeData(deviceId, sConCb, fConCb,onDataCb){
    var param = {
      url : "",
      deviceId : deviceId,
      sConnectCb : function(res){
        sConCb && sConCb(res);
      },
      fConnectCb : function(err){
        fConCb && fConCb (err);
      },
      onMsgCb : function(data){
        onDataCb: onDataCb(data);
      }
    };

    return this.realTimeDevice(param);
  }
};

export {Device};

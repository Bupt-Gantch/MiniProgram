
import {Base} from '../../utils/base.js';
class Home extends Base{
  constructor(){
    super();
  }
  // getBannerData(id,callback){
  //   var params = {
  //     url: 'banner/' + id,
  //     sCallback:function(res){
  //       callback && callback(res.items);
  //     }
  //   }
  //   this.request(params);
  // }

  /**
   * mock data
   */

  loadTestData(callback) {
    var param = {
      url: '',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /**mock end */

  
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
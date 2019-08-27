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
    console.log(params);
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

/**删除设备 */
  deleteGateway(param,callback){
    var params = {
      //removeGateway
      url:`deviceaccess/unassign/${param.customerid}?gateway_name=${param.gatewayName}`,
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(params);
  }

//深度解绑网关
  deepDeleteGateway(param, callback) {
    var params = {
      url: "account/deepUnBindedALLGate",
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  /**设备入网 */
  refresh(gateway_name,callback){
    var param = {
      url:`device/addNewDevice/${gateway_name}`,
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(param)
  }

  /**
   * 设备分享
   */
  shareGateway(param, callback){
    var param = {
      url: `account/bindGate`,
      data:param,
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
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
   * 获取被分享的网关
   */

  getSharedGateway(param,callback){
    var params = {
      url: `account/getBinderGates`,
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }

/**
 * 客人取消分享
 */
  onOwnerUnShare(param,callback){
    var params = {
      url:'account/unBindedGate',
      data:param,
      method:'POST',
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(params)
  }
 
  /**
   * 主人取消分享
   */
  onUnShareAll(param, callback) {
    var params = {
      url: 'account/unBindedALLGate',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  /*
  * 客人取消分享
   */
onGuestUnShare(param, callback) {
  var params = {
    url: 'account/unBinderGates',
    data: param,
    method: 'POST',
    sCallback: function (data) {
      callback && callback(data);
    }
  };
  this.request(params)
}

  onUnShareAllThings(param,callback){
    var params = {
      url: 'controller/unassign',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params)
  }
  //删除某条规则
  deleteRule(ruleId, callback) {
    var param = {
      url: `smartruler/remove/${ruleId}`,
      method: 'DELETE',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //通过网关ID获得规则接口
  getRulesByGatewayId(gatewayId, callback) {
    var param = {
      url: `smartruler/ruleByGateway/${gatewayId}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}

export {
  My
}
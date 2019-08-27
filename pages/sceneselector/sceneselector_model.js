import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js';

class SceneSelector extends Base {
  constructor() {
    super();
  }

  getDeviceInfo(id, callback) {
    var param = {
      url: `deviceaccess/device/${id}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  saveDevice(param, callback) {
    var params = {
      url: 'deviceaccess/device',
      method: 'POST',
      data: param,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  //获取所有子设备
  getAllSonDevices(parentdeviceId, callback) {
    var param = {
      url: `deviceaccess/parentdevices/${parentdeviceId}?limit=1000`,
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
 * 加载所有场景
 */
  loadAllScene(gatewayName, callback) {
    var param = {
      url: 'scene/getSceneByGateway/' + gatewayName,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

/**
 * 获取场景开关绑定设备详情
 */
  getSceneSelectorBind(deviceid,callback){
    var param = {
      url:`device/getSceneSelectorBind/${deviceid}`,
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }

  /**
   * 获取场景开关绑定场景详情
   */
  /**
 * 获取场景详情
 */
  getSceneDevices(sceneid, callback) {
    var param = {
      url: 'scene/getScene/' + sceneid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
/**
 * 接触绑定设备
 */
  deleteSceneSelectorBind(param,callback){
    var params = {
      url:'device/deleteSceneSelectorBind',
      data:param,
      method:'DELETE',
      sCallback:function(data){
        callback && callback(data);
      }
    };
    this.request(params);
  }
/**
 * 绑定设备
 */
  bindDevice(param,callback){
    var params = {
      url: 'device/sceneSelectorBindDevice',
      data:param,
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }

  /**
     * 场景绑定场景开关
     */
  bindSceneSelector(param, callback) {
    console.log(param)
    var params = {
      url: 'scene/bindSelector',
      data: param,
      method: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }


  /**=================END======================= */

};

export { SceneSelector };

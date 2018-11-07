import { Base } from '../../utils/base.js';
import { Config } from '../../utils/config.js';

class Category extends Base{
  constructor(){
    super();
  }

  getAllDevices(customerId,callback){
    var param = {
      //url: 'deviceaccess/tenant/devices/2?limit=1000',
      url: `deviceaccess/customerdevices/2/${customerId}?limit=1000`,
      sCallback: function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }

//获取所有子设备
  getAllSonDevices(parentdeviceId,callback){
    var param = {
      // url: `http://47.105.120.203:30080/api/v1/deviceaccess/parentdevices/${parentdeviceId}?limit=1000`,
      url: `deviceaccess/parentdevices/${parentdeviceId}?limit=1000`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  assignDeviceToGroup(groupId, deviceId, sCallback, fCallback) {
    var param = {
      url: `deviceaccess/assign/group/${groupId}/${deviceId}`,
      sCallback: function (res) {
        sCallback && sCallback(res);
      },
      fCallback: function (err) {
        fCallback && fCallback(err);
      }
    };

    this.request(param);
  }

  /**==================控制分类页的开关设备============= */
  /**
   * 获取设备（开关）服务--获取控制面板
   */

  getService(triad){
    var that = this;
    var p = new Promise(function(resolve,reject){
      var manufacture = triad.manufacture;
      var deviceType = triad.deviceType;
      var model = triad.model;
      var param = {
        url: `servicemanagement/ability/${manufacture}/${deviceType}/${model}`,
        sCallback: function (res) {
          resolve && resolve(res);
        },
        fCallback: function(err){
          reject && reject(err);
        }
      }

      that.request(param);
    })

    return p;
    
  }

  /**
   * 获取设备属性，得到endpoint和shortaddress
   */
  getDeviceAttr(deviceId){
    var that = this;
    var p = new Promise(function(resolve,reject){
      var param = {
        url: `deviceaccess/allattributes/${deviceId}`,
        sCallback: function(res){
          resolve && resolve(res);
        },
        fCallback: function(err){
          reject && reject(err);
        }
      }

      that.request(param);
    })

    return p;
  }
  


  /**
   * 调用控制接口，控制开关
   * sendControl
   */
  sendControl(deviceId,requestId,body){
    
    //body可以是对象
    var that = this;
    var p = new Promise(function(resolve,reject){
      var param = {
        url: 'deviceaccess/rpc/' + deviceId + '/' + requestId,
        method: 'POST',
        data: body,
        sCallback: function (res) {
          resolve && resolve(res);
        },
        fCallback: function (err) {
          reject && reject(err);
        }
      };

      that.request(param);
    })

    return p;
  }

  /**对外只暴露这一个控制方法，在内部链式调用其他需要的方法 */
  turnSwitch(data, sCallback, fCallback){
    var that = this;
    var _data = {};

    this.getDeviceAttr(data.deviceId)
    //获取设备属性
    .then(function(res){
      if(res){
        _data.attr = res;
        return that.getService(data.triad);
      }else{
        wx.showToast({
          title: '应用失败',
          image: '../../imgs/icon/pay@error.png',
          duration: 1000,
          // mask: true
        });
      }

    })
    //获取设备服务
    .then(function(res){
      if(res){
        var abilityDes = JSON.parse(res[0].abilityDes);
        _data.service = abilityDes;
        var serviceBody = abilityDes.serviceBody;
        var params = serviceBody.params;
        
        //根据键值查设备属性值
        var getAttrVal = function(key,list){
          for(let i = 0;i < list.length;i++){
            if(list[i].key == key)
              return list[i].value;
          }
          return undefined;
        }
        var body = {
          serviceName: abilityDes.serviceName,
          methodName: serviceBody.methodName
        }

        params.forEach(function (e) {
          body[e.key] = getAttrVal(e.key,_data.attr);
        })
        body.status = data.status;

        return that.sendControl(data.deviceId,data.requestId,body);
      }else{
        wx.showToast({
          title: '应用失败',
          image: '../../imgs/icon/pay@error.png',
          duration: 1000,
          // mask: true
        });
      }
      
    })
    .then( (res) => {
      sCallback && sCallback(res);
    })
    .catch( (err) => {
      fCallback && fCallback(err);
    });

  }

  /**=================END======================= */

  /**
   * =================group=====================
   */
/**
 * 加载所有的场景
 */
  loadAllGroup(param,callback){
    var params = {
      url: 'deviceaccess/groups/customer/' + param.customerId + '?limit=1000',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(params);
  }
/**
 * 创建分组
 */
  createGroup(customerId,groupName,callback) {
    var param = {
      url : 'deviceaccess/group',
      method:'POST',
      data:{
        name: groupName,
        tenantId: 2,
        customerId: customerId
      },
      sCallback: function (data) {
        callback && callback(data);
      }
    }

    this.request(param);
  }
/**
 * 删除分组
 */
  deleteGroup(groupId,callback) {
    var param = {
      url: `deviceaccess/group/${groupId}`,
      method: 'DELETE',
      sCallback: function (data) {
        callback && callback(data);
      }
    }

    this.request(param);
  }

  /**=================END======================= */

  /**
   * =================scene=====================
   */

  // loadAllScene(customerId, callback) {
  //   var param = {
  //     url: 'scene/getAllScene/'+customerId,
  //     sCallback: function (data) {
  //       callback && callback(data);
  //     }
  //   };
  //   this.request(param);
  // }
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
 * 删除场景
 */
  deleteScene(sceneid, callback) {
    var param = {
      url: 'scene/deleteScene/' + sceneid,
      method: 'DELETE',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }
/**
 * 修改场景
 */
  alterScene(param, callback) {
    var params = {
      url: 'deviceaccess/group',
      data: param,
      type: 'DELETE',
      sCallback: function (data) {
        callback && callback(data);
      }
    }
    this.request(params);
  }
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
   * 场景绑定场景开关
   */
  bindSceneSelector(param,callback){
    console.log(param)
    var params = {
      url:'scene/bindSelector',
      data:param,
      method:'POST',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(params);
  }

  /**
   * 应用场景
   */
  useScene(scene_id,callback){
    var param = {
      url:`scene/useScene/${scene_id}`,
      data:scene_id,
      method:'POST',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }
/**
 * 删除设备
 */
  deleteDevice(deviceid,callback){
    var param = {
      url: `device/deleteDevice/${deviceid}`,
      method:'DELETE',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }
}

export {Category};
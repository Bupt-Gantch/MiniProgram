// pages/device/device.js
import {
  Device
} from 'device_model.js';
import {
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
var device = new Device();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceImgUrl: Config.deviceImgUrl,
    iASZoneImg: Config.iASZoneUrl,
    bulb: {
      dimmableMinVal: 1,
      dimmableMaxVal: 255,
      dimmableStep: 2
    },
    keyName: Config.keyName,
    valueName: Config.valueName,
    serviceName: Config.serviceName,
    requestId: 1000000, //请求id100w 递减
    showEdit: false,
    showLinkage: false,
    showDevice: false,
    deployment: true,
    showPassword: false,
    content: {
      title: "修改设备名",
      placeholder: "请输入设备名"
    },
    newName: '',
    linkageName: '',
    alarmMessage: '',
    password: '',
    content1: {
      title: "添加联动",
      placeholder: "请输入联动名称",
    },
    content2: {
      title: "远程开锁",
      placeholder: "请输入锁密码",
    },
    content3: {
      title: '远程关锁',
      placeholder: '请输入锁密码',
    },
    array: ['大于', '等于', '小于'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var deviceid = options.deviceid;
    var deviceType = options.deviceType;
    var deviceName = options.deviceName;
    var customerId = options.customerId;
    var model = options.model;
    console.log(model);
    this.setData({
      deviceType: deviceType,
      deviceId: deviceid,
      deviceName: deviceName,
      bindedId: customerId,
      model: model
    });
    this._loadData(deviceid);
    if (deviceType === 'temperature' || deviceType === 'PM2.5' ||
      deviceType === 'IASZone' || deviceType === 'dimmableLight' || deviceType === 'lightSensor' || deviceType === 'lock') {
      this._loadRealtimeData(deviceid, deviceType);
    }
    if (deviceType === 'Gateway') {
      this._loadLinkage(deviceid);
      this._loadAlarmStatus(deviceid);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;
    var deviceType = this.data.deviceType;
    var deviceId = this.data.deviceId;
    if (this.data.socketTask) {
      this.data.socketTask.close();
    };
    this._loadData(deviceId);
    this._loadLinkage(deviceId);
    if (deviceType === 'temperature' || deviceType === 'PM2.5' ||
      deviceType === 'IASZone' || deviceType === 'dimmableLight' || deviceType === 'lightSensor' || deviceType === 'lock') {
      setTimeout(function() {
        _this._loadRealtimeData(deviceId, deviceType);
      }, 1000);
    }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("de_sensor hide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("de_sensor unload");
    /**卸载页面时断开socket连接 */
    if (this.data.socketTask) {
      this.data.socketTask.close();
    }
  },

  _loadData: function(deviceid) {
    device.getDeviceInfo(deviceid, (data) => {
      this.setData({
        deviceInfo: data
      });
    });
  },

  _loadRealtimeData: function(deviceid, deviceType) {
    var _this = this;
    var sConCb = function(res) {
      wx.showToast({
        title: '连接成功！',
        duration: 1000,
        icon: 'success'
      })
    };
    var fConCb = function(err) {
      wx.showToast({
        title: '连接失败！',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
      })
      console.log(err);
    };
    //以上为callback
    var socketTask = device.getRealtimeData(deviceid, sConCb, fConCb, (data) => {
      //收到服务器端发回数据，更新view层数据
      var sensorData = JSON.parse(data).data;
      var valueName = this.data.valueName;
      var keyName = this.data.keyName;
      sensorData.forEach(function(e) {
        if (e.key === 'status') {
          if (e.value === 'true' || e.value === true) {
            _this.setData({
              dimmableLight: true
            })
          } else {
            _this.setData({
              dimmableLight: false
            })
          }
        };
        if (keyName[e.key] != undefined) {
          e.ts = util.formatTime(new Date(e.ts));
          e.key = keyName[e.key];
          var test = ''
          if(_this.data.deviceType == 'IASZone'){
            test = e.value+'*';
          }else{
            test = e.value;
          }
          var question = test.toString();
          var value = question.split("|");
          var answer = '';
          value.forEach(function(element, index) {
            if (valueName[element] != undefined) {
              if (index != 1 && index != 0) {
                answer += ',';
              }
              answer += valueName[element];
            } else if (element != '') {
              answer = element;
            }
          })
          e.value = answer;
        } else {
          e.ts = '';
          e.key = '',
          e.value = ''
        }
      })
      _this.setData({
        lastRtData: sensorData,
      });
    });
    this.setData({
      socketTask: socketTask
    });
  },

  /**
   * =================dimmableLight=======================
   * =====================================================
   */
  onSliderChange: function(event) {
    let value = event.detail.value.toString();
    let serviceName = this.data.serviceName.controlDimmableLight;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },
  onSwitchChange: function(event) {
    this.setData({
      dimmableLight: !this.data.dimmableLight
    })
    let value = event.detail.value.toString();
    let serviceName = this.data.serviceName.controlSwitch;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },

  /**
   * ====================curtain==========================
   * =====================================================
   */

  onCurtainTap: function(event) {
    let value = device.getDataSet(event, 'value');
    let serviceName = this.data.serviceName.controlCurtain;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },

  /**
   * ====================sendControl==========================
   * =====================================================
   */
  _sendControl: function(serviceName, value, deviceInfo) {
    var deviceId = deviceInfo.id;
    var requestId = this.data.requestId;
    console.log(value);
    var triad = {
      deviceType: deviceInfo.deviceType,
      manufacture: deviceInfo.manufacture,
      model: deviceInfo.model
    }

    var data = '';
    /**控制需要的请求数据 */
    if (deviceInfo.deviceType == 'lock') {
      data = {
        serviceName: serviceName,
        deviceId: deviceInfo.id,
        requestId: requestId,
        triad: triad,
        value: value.statusValue,
        npassword: value.npassword,
      };
    } else {
      data = {
        serviceName: serviceName,
        deviceId: deviceInfo.id,
        requestId: requestId,
        triad: triad,
        value: value
      };
    }
    console.log(data);
    device.applyControl(data, (res) => {
      if (res.indexOf("device") === -1) { //状态码为200则应用成功
        wx.showToast({
          title: '应用成功',
          icon: 'success',
          duration: 1000,
          // mask: true
        });
        this.hideModal();
      } else { //状态码不是200  应用失败
        wx.showToast({
          title: '应用失败',
          image: '../../imgs/icon/pay@error.png',
          duration: 1000,
          // mask: true
        });
      }

    }, (err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
      console.log(err);
    });

    this.data.requestId--;

  },

  /**修改别名*/
  onChangeName: function() {
    this.setData({
      showEdit: true,
      newName: ''
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showEdit: false,
      showDevice: false,
      showPassword: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 场景对话框确认按钮点击事件
   */
  onEditConfirm: function() {
    var submitnewName = this.data.newName.trim();
    if (submitnewName === "") {
      wx.showToast({
        title: '设备别名不能为空',
        icon: 'none'
      })
    } else {
      this.hideModal();
      this.data.deviceInfo.nickname = submitnewName;
      var newdeviceInfo = this.data.deviceInfo
      device.saveDevice(newdeviceInfo, (res) => {
        if (res.nickname == submitnewName) {
          wx.showToast({
            title: '修改成功',
            duration: 1000,
          })
          this.setData({
            deviceName: submitnewName
          })
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
      // this._createScene(submitGroupName);
    }
  },
  inputChange: function(event) {
    var inputValue = event.detail.value;
    this.data.newName = inputValue;
  },

  inputNameChange: function(event) {
    var inputValue = event.detail.value;
    this.data.linkageName = inputValue;
  },

  inputAlarmChange: function(event) {
    var inputValue = event.detail.value;
    this.data.alarmMessage = inputValue;
  },

  inputPasswordChange: function(event) {
    var inputValue = event.detail.value;
    this.data.password = inputValue;
  },

  showAlert: function() {
    wx.showToast({
      title: '长按设备名可对设备名进行更改',
      icon: 'none',
      duration: 2000
    })
  },

  //==========联动==========//

  // 添加联动
  addLinkage: function() {
    var _this = this;
    var newAllDevices = Array();
    var parentdeviceId = app.globalData.gatewayId;
    device.getAllSonDevices(parentdeviceId, (res) => {
      var allDevices = new Array();
      res.forEach(function(element) {
        if (element.deviceType === "switch" || element.deviceType === "curtain" || element.deviceType === "dimmableLight") {
          allDevices.push(element);
        };
      });
      _this.setData({
        devices: allDevices
      });
      console.log(allDevices);
      if (allDevices.length == 0) {
        wx.showToast({
          title: '没有可用于创建规则的设备',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          showDevice: true
        })
      }
    })
  },

  onAddLinkage: function(e) {
    var _this = this;
    var controlDevices = [];
    var param = {};
    var filters = [];
    var transforms = [];
    var controlDeviceArr = [];
    var deviceType = this.data.deviceType;
    var deviceId = this.data.deviceId;
    var customerId = this.data.bindedId;
    var gatewayId = app.globalData.gatewayId;
    var deviceName = this.data.deviceName;
    var name = this.data.linkageName;
    var alarmMessage = this.data.alarmMessage;
    if (alarmMessage == '') {
      alarmMessage = '家居状态反常，请及时进行处理'
    };
    var answer = e.detail.value;
    console.log(answer);
    var rule_type = [];
    var deviceArr = [];
    var linkageDevices = this.data.devices;
    var length = linkageDevices.length;
    if (answer.alarm == true) {
      rule_type = 'alarm'
    } else {
      rule_type = 'common'
    };
    var condition1 = device.changeOperator(answer.condition1);
    var condition2 = device.changeOperator(answer.condition2);
    var condition3 = device.changeOperator(answer.condition3);
    var threshold1 = answer.threshold1;
    var threshold2 = answer.threshold2;
    var threshold3 = answer.threshold3;
    var devices = answer.linkage;
    for (var key in answer) {
      if (key[0] === '*')
        deviceArr.push(answer[key]);
    };
    devices.forEach(function(element) {
      var obj = {};
      var e = element.split(",");
      obj.id = e[0];
      obj.status = deviceArr[Number(e[1])];
      controlDevices.push(obj);
    });
    param.rule = {
      "tenantId": "2",
      "additional_info": "",
      "name": `${name}`,
      "state": "ACTIVE",
      "gatewayId": `${gatewayId}`,
      "rule_type": `${rule_type}`
    };
    if (deviceType === 'temperature') {
      if (name == null || (devices.length == 0 && rule_type == 'common') || (condition1 == "" && condition2 == "")) {
        wx.showToast({
          title: '请完善规则内容',
          icon: 'none',
          duration: 1000
        })
      } else {
        if (condition1 != "") {
          var filter = {
            "type": "",
            "name": `${name}`,
            "jsCode": `function filter(deviceId, name, manufacture, deviceType, model, ts, key, value){if(deviceId==\'${deviceId}\'&&key=='temperature'&& value${condition1}${threshold1}){return true;}  else{return false;}}`
          };
          filters.push(filter);
        }
        if (condition2 != "") {
          var filter = {
            "type": "",
            "name": `${name}`,
            "jsCode": `function filter(deviceId, name, manufacture, deviceType, model, ts, key, value){if(deviceId==\'${deviceId}\'&&key=='humidity'&& value${condition2}${threshold2}){return true;}  else{return false;}}`
          };
          filters.push(filter);
        }
      }
    } else {
      if (deviceType == 'IASZone'){
        condition3 = '===';
      }
      if (name == null || (devices.length == 0 && rule_type == 'common') || condition3 == "") {
        wx.showToast({
          title: '请完善规则内容',
          icon: 'none',
          duration: 1000
        })
      } else {
        var key = '';
        if (deviceType == "lightSensor") {
          key = "illumination";
        } else if (deviceType == 'PM2.5') {
          key = 'PM2.5';
        } else if (deviceType == 'IASZone'){
          key = 'alarm';
          condition3 = '===';
          threshold3 = '1';
          }else {
          key = '';
        }
        var filter = {
          "type": "",
          "name": `${name}`,
          "jsCode": `function filter(deviceId, name, manufacture, deviceType, model, ts, key, value){if(deviceId==\'${deviceId}\'&&key=='${key}'&& value${condition3}${threshold3}){return true;}  else{return false;}}`
        };
        filters.push(filter);
      }
    }
    console.log(filters);
    if (rule_type == "alarm") {
      var transform = {
        "name": "WechatPlugin",
        "url": "http://wechatplugin:8900/api/v1/wechatplugin/sendTemplateMsg",
        "method": "POST",
        "requestBody": {
          "deviceName": `${deviceName}`,
          "deviceType": `${deviceType}`,
          "alarmDetail": `${alarmMessage}`,
          "customerId": `${customerId}`,
          "gatewayId": `${gatewayId}`,
        }
      };
      param.transforms = transform;
    }
    param.filters = filters;
    console.log(param);
    controlDevices.forEach(function(element, index) {
      device.getDeviceInfo(element.id, (res) => {
        element.manufacture = res.manufacture;
        element.model = res.model;
        element.deviceType = res.deviceType;
        controlDeviceArr.push(element);
        wx.showLoading({
          title: '创建中',
        })
        setTimeout(function() {
          if (index == controlDevices.length - 1) {
            param.deviceArr = controlDeviceArr;
            device.addRule(param, (res) => {
              wx.hideLoading();
              console.log(res);
              // if (res == 'OK') {
                wx.showToast({
                  title: '添加成功',
                  duration: 1000,
                  // mask: true
                });
                _this.setData({
                  showDevice: false
                })
              // }
            });
          }
        }, 1000);
      })
    })
  },

  //查看联动详情
  gotoLinkageDetail: function(e) {
    var ruleId = Number(device.getDataSet(e, 'id'));
    wx.navigateTo({
      url: '../ruleDetail/ruleDetail?ruleId=' + ruleId
    });
  },

  // 根据gatewayId获取所有用户规则
  _loadLinkage: function(gatewayId) {
    device.getRulesByGatewayId(gatewayId, (res) => {
      if (res.length == 0) {
        this.setData({
          showLinkage: false,
          showButton:false
        })
      }
      if (res.length != 0) {
        this.setData({
          linkageDetail: res,
          showLinkage: true,
          showButton:true
        })
      }
    })
  },


  //查询网关下的规则是否处于报警状态
  _loadAlarmStatus: function(gatewayId) {
    device.getAlarmActiveRule(gatewayId, (res) => {
      console.log(res);
      if (!res) {
        this.setData({
          deployment: true
        })
      } else {
        this.setData({
          deployment: false
        })
      }
    })
  },
  //布防
  deployment: function() {
    var _this = this;
    var gatewayId = this.data.deviceId;
    console.log(gatewayId);
    var param = {
      unionid: app.globalData.unionid,
      openid: app.globalData.openid
    };
    device.judgeFollow(param, (res) => {
      if (res == '1') {
        device.activateAlarmRule(gatewayId, (res) => {
          console.log(res);
          if (res == 'ActivateAllRule'){
            wx.showToast({
              title: '布防成功',
              duration: 2000
            });
            _this.setData({
              deployment: false
            });
          }
        })
      } else {
        wx.showToast({
          title: '布防失败，请您先关注"冠川智能"微信公众号来接收报警信息',
          icon:'none',
          duration: 2000
        })
      }
    })
  },

  //撤防
  disarming: function() {
    var gatewayId = this.data.deviceId;
    device.suspendAlarmRule(gatewayId, (res) => {
      if(res == 'SuspendAllRule'){
        this.setData({
          deployment: true
        })
      }
    })
  },

  remoteUnlock: function() {
    var _this = this;
    wx.showModal({
      title: '提醒',
      content: '请确认您要控制的智能门锁是否已进入远程控制状态？',
      success(res) {
        if (res.confirm) {
          _this.setData({
            showPassword: true,
            password: '',
            statusValue: '1',
          })
        }
      }
    })
  },

  remoteLock: function() {
    var _this = this;
    wx.showModal({
      title: '提醒',
      content: '请确认您要控制的智能门锁是否已进入远程控制状态？',
      success(res) {
        if (res.confirm) {
          _this.setData({
            showPassword: true,
            password: '',
            statusValue: '0',
          })
        }
      }
    })
  },

  onPasswordConfirm: function() {
    var password = this.data.password.toString();
    var statusValue = this.data.statusValue;
    var key = [0x46, 0x45, 0x49, 0x42, 0x49, 0x47];
    var npassword = '';
    for (var i = 0; i < 6; i++) {
      npassword += password[i] ^ key[i];
    };
    console.log(npassword);
    var value = {
      npassword: npassword,
      statusValue: statusValue
    }
    var serviceName = this.data.serviceName.controlLock;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  }
})
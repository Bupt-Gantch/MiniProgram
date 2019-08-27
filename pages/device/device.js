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
    infraredImg: Config.infraredImg,
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
    deploymentStatus: false,
    showPassword: false,
    addRule: false,
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
    array: ['大于', '等于', '小于'],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this;
    // var deviceid = options.deviceid;
    // var deviceType = options.deviceType;
    // var deviceName = options.deviceName;
    // console.log("customerId:" + app.globalData.gatewayCustomerId);
    // var model = options.model;

    //=========测试===============
    var deviceid = "5e88cc40-9806-11e9-9dcf-b55ae51a103e";
    var deviceName = "newInfrared_2971";
    var customerId = 108;
    var model = "FNB56-ZIR04FB1.2";
    var deviceType = "newInfrared";
    //==============================

    this._loadData(deviceid);
    if (deviceType === 'Gateway') {
      this._loadLinkage(deviceid);
      this._loadAlarmStatus(deviceid);
    }
    this.setData({
      deviceType: deviceType,
      deviceId: deviceid,
      deviceName: deviceName,
      model: model
    });
  },

  onShow: function() {
    var _this = this;
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var deviceid = this.data.deviceId;
    var deviceType = this.data.deviceType;
    if (deviceType === 'Gateway') {
      this._loadLinkage(deviceid);
      this._loadAlarmStatus(deviceid);
    } else if (deviceType === 'temperature' || deviceType === 'PM2.5' ||
      deviceType === 'IASZone' || deviceType === 'dimmableLight' || deviceType === 'lightSensor' || deviceType === 'lock') {
      _this._loadLatestData(deviceid);
      var cleanId = setInterval(
        function() {
          _this._loadLatestData(deviceid);
        }, 5000)
      _this.setData({
        cleanId: cleanId
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var cleanId = this.data.cleanId;
    clearInterval(cleanId);
  },

  _loadData: function(deviceid) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    device.getDeviceInfo(deviceid, (data) => {
      this.setData({
        deviceInfo: data
      });
    });
  },


  _loadLatestData: function(deviceId) {
    var _this = this;
    device.getlatestData(deviceId, (res) => {
      console.log(res);
      var sensorData = res;
      var valueName = this.data.valueName;
      var keyName = this.data.keyName;
      var alarmFlag1 = false;
      var surpervisionFlag1 = false;
      var alarmFlag2 = false;
      var surpervisionFlag2 = false;
      var ts = 0;
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
        } 
        if (keyName[e.key] != undefined && e.value != undefined) {
          var nowts = e.ts;
          e.ts = util.formatTime(new Date(e.ts));
          e.key = keyName[e.key];
          var test = ''
          if (_this.data.deviceType == 'IASZone') {
            test = e.value + '*';
          } else if (_this.data.deviceType == 'lock' && e.key == '操作') {
            test = e.value + '**';
          } else {
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
          if (e.key == 'alarm') {
            alarmFlag1 = true;
            if (nowts > ts) {
              ts = nowts;
            }
            if (answer == '报警') {
              alarmFlag2 = true;
            }
          }
          if (e.key == 'surpervision') {
            surpervisionFlag1 = true;
            if (nowts > ts) {
              ts = nowts;
            }
            if (answer == '正常') {
              surpervisionFlag2 = true;
            }
          }
          e.value = answer;
        } else {
          e.ts = '';
          e.key = '',
            e.value = ''
        }
      })
      if (alarmFlag1) {
        if (alarmFlag2) {
          var test = new Object();
          test.ts = util.formatTime(new Date(ts));
          test.key = '状态值';
          test.value = "报警";
          sensorData.push(test);
        } else {
          var test = new Object();
          test.ts = util.formatTime(new Date(ts));
          test.key = '状态值';
          test.value = "正常";
          sensorData.push(test);
        };
      } else if (this.data.deviceType == "IASZone") {
        var test = new Object();
        test.ts = util.formatTime(new Date(ts));
        test.key = '状态值';
        test.value = "正常";
        sensorData.push(test);
      }
      sensorData.forEach(function(e, index) {
        if (e.key == 'alarm' || e.key == 'surpervision') {
          sensorData.splice(index, 1);
        }
      })
      _this.setData({
        lastRtData: sensorData,
      });
    })
  },
  /**
   * =================dimmableLight=======================
   * =====================================================
   */
  onSliderChange: function(event) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    let value = event.detail.value.toString();
    let serviceName = this.data.serviceName.controlDimmableLight;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },
  onSwitchChange: function(event) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    let value = device.getDataSet(event, 'value');
    let serviceName = this.data.serviceName.controlCurtain;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },



  /**
   * ====================SoundLightAlarm==========================
   * =====================================================
   */

  onSoundLightAlarm: function(event) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    let value = device.getDataSet(event, 'value');
    let serviceName = this.data.serviceName.controlSoundLightAlarm;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },

  /**
   * ====================sendControl==========================
   * =====================================================
   */
  _sendControl: function(serviceName, value, deviceInfo) {
    var deviceId = deviceInfo.id;
    var requestId = this.data.requestId;
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
    device.applyControl(data, (res) => {
      if (deviceInfo.deviceType == 'infrared' || deviceInfo.deviceType == 'newInfrared') {
        // console.log(res);
      } else {
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
      }
    }, (err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
      // console.log(err);
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this;
    var newAllDevices = Array();
    var parentdeviceId = app.globalData.gatewayId;
    device.getAllSonDevices(parentdeviceId, (res) => {
      var allDevices = new Array();
      res.forEach(function(element) {
        if (element.deviceType === "switch" || element.deviceType === "curtain" || element.deviceType === "dimmableLight" || element.deviceType === "SoundLightAlarm") {
          allDevices.push(element);
        };
      });
      _this.setData({
        devices: allDevices
      });
      this.setData({
        showDevice: true
      })
      // }
    })
  },

  onAddLinkage: function(e) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this;
    var controlDevices = [];
    var param = {};
    var filters = [];
    var transforms = [];
    var controlDeviceArr = [];
    var deviceType = this.data.deviceType;
    var deviceId = this.data.deviceId;
    var gatewayId = app.globalData.gatewayId;
    var deviceName = this.data.deviceName;
    var name = this.data.linkageName;
    var alarmMessage = this.data.alarmMessage;
    if (alarmMessage == '') {
      alarmMessage = '家居状态反常，请及时进行处理'
    };
    var answer = e.detail.value;
    // console.log(answer);
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
    var condition3 = answer.condition3;
    if (deviceType != 'lock') {
      condition3 = device.changeOperator(answer.condition3);
    }
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
      obj.manufacture = e[2];
      obj.model = e[3];
      obj.deviceType = e[4];
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
      if (name == null || ((devices.length == 0 || devices.length == undefined) && rule_type == 'common') || (condition1 == "" && condition2 == "")) {
        wx.showToast({
          title: '请完善规则内容',
          icon: 'none',
          duration: 1000
        })
      } else {
        this.data.addRule = true;
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
      if (deviceType == 'IASZone') {
        condition3 = '===';
      }
      if (name == null || ((devices.length == 0 || devices.length == undefined) && rule_type == 'common') || condition3 == "") {
        wx.showToast({
          title: '请完善规则内容',
          icon: 'none',
          duration: 1000
        })
      } else {
        this.data.addRule = true;
        var key = '';
        if (deviceType == "lightSensor") {
          key = "illumination";
        } else if (deviceType == 'PM2.5') {
          key = 'PM2.5';
        } else if (deviceType == 'IASZone') {
          // var filter = {
          //   "type": "",
          //   "name": `${name}`,
          //   "jsCode": `function filter(deviceId, name, manufacture, deviceType, model, ts, key, value){if(deviceId==\'${deviceId}\'&&key=='surpervision'&& value===0){return true;}  else{return false;}}`
          // };
          // filters.push(filter);
          key = 'alarm';
          condition3 = '===';
          condition2 = answer.condition2;
          if (condition2 == 0) {
            threshold3 = '0';
          } else {
            threshold3 = '1';
          }
        } else if (deviceType == 'lock') {
          key = 'operate';
          threshold3 = condition3;
          condition3 = '===';
        } else {
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
    if (rule_type == "alarm") {
      var transform = {
        "name": "WechatPlugin",
        "url": "http://wechatplugin:8900/api/v1/wechatplugin/sendTemplateMsg",
        "method": "POST",
        "requestBody": {
          "deviceName": `${deviceName}`,
          "deviceType": `${deviceType}`,
          "alarmDetail": `${alarmMessage}`,
          "customerId": `${app.globalData.gatewayCustomerId}`,
          "gatewayId": `${gatewayId}`,
        }
      };
      param.transforms = transform;
    }
    param.filters = filters;
    if (!this.data.addRule) {
      wx.showToast({
        title: '请完善规则内容',
        icon: 'none',
        duration: 1000
      })
    } else {
      if (controlDevices.length != 0) {
        param.deviceArr = controlDevices;
        device.addRule(param, (res) => {
          console.log(res);
          if (res == 'OK') {
            if (rule_type == "alarm") {
              wx.showModal({
                title: '提示',
                content: '规则创建成功，您需要关注‘天慧云谷’公众号并重新登录小程序来接收报警信息',
                success(res) {
                  if (res.confirm) {} else if (res.cancel) {}
                }
              })
            } else {
              wx.showToast({
                title: "规则创建成功",
                duration: 2000,
                icon: 'none',
                // mask: true
              });
            }
            _this.setData({
              showDevice: false
            })
          } else if (res != "gantch") {
            wx.showToast({
              title: "规则创建失败",
              duration: 2000,
              icon: 'none',
              // mask: true
            });
          }
        });
      } else {
        wx.showLoading({
          title: '创建中',
        })
        transforms.push(transform);
        param.transforms = transforms;
        device.createRule1(param, (res) => {
          wx.hideLoading();
          console.log(res);
          if(res == 'OK') {
            if (rule_type == "alarm") {
              wx.showModal({
                title: '提示',
                content: '规则创建成功，您需要关注‘天慧云谷’公众号并重新登录小程序来接收报警信息',
                success(res) {
                  if (res.confirm) { } else if (res.cancel) { }
                }
              })
            } else {
              wx.showToast({
                title: "规则创建成功",
                duration: 2000,
                icon: 'none',
                // mask: true
              });
            }
          } else {
            wx.showToast({
              title: "规则创建失败",
              duration: 2000,
              icon: 'none',
              // mask: true
            });
          }
          _this.setData({
            showDevice: false
          })
          // }
        });
      }
    }
  },

  //查看联动详情
  gotoLinkageDetail: function(e) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var ruleId = Number(device.getDataSet(e, 'id'));
    wx.navigateTo({
      url: '../ruleDetail/ruleDetail?ruleId=' + ruleId
    });
  },

  // 根据gatewayId获取所有用户规则
  _loadLinkage: function(gatewayId) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    device.getRulesByGatewayId(gatewayId, (res) => {
      if (res.length == 0) {
        this.setData({
          showLinkage: false,
          showButton: false
        })
      }
      if (res.length != 0) {
        this.setData({
          linkageDetail: res,
          showLinkage: true,
          showButton: true
        })
      }
    })
  },


  //查询网关下的规则是否处于报警状态
  _loadAlarmStatus: function(gatewayId) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    device.getAlarmActiveRule(gatewayId, (res) => {
      // console.log(res);
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
    this.setData({
      netStatus: app.globalData.netStatus,
      deploymentStatus: true
    });
    var _this = this;
    var gatewayId = this.data.deviceId;
    var param = {
      unionid: app.globalData.unionid,
      openid: app.globalData.openid
    };
    device.judgeFollow(param, (res) => {
      if (res == '1') {
        device.activateAlarmRule(gatewayId, (res) => {
          if (res == 'ActivateAllRule') {
            wx.showToast({
              title: '布防成功',
              duration: 2000
            });
            _this.setData({
              deployment: true
            });
          }
        })
      } else {
        wx.showToast({
          title: '布防失败，请您先关注"天慧云谷"微信公众号并重新登录小程序',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  //撤防
  disarming: function() {
    this.setData({
      netStatus: app.globalData.netStatus,
      deploymentStatus: true
    });
    var gatewayId = this.data.deviceId;
    device.suspendAlarmRule(gatewayId, (res) => {
      if (res == 'SuspendAllRule') {
        wx.showToast({
          title: '撤防成功',
          duration: 2000
        });
        this.setData({
          deployment: false
        });
      }
    })
  },

  remoteUnlock: function() {
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var password = this.data.password.toString();
    var statusValue = this.data.statusValue;
    var key = [0x46, 0x45, 0x49, 0x42, 0x49, 0x47];
    var npassword = '';
    for (var i = 0; i < 6; i++) {
      npassword += password[i] ^ key[i];
    };
    var value = {
      npassword: npassword,
      statusValue: statusValue
    }
    var serviceName = this.data.serviceName.controlLock;
    this._sendControl(serviceName, value, this.data.deviceInfo);
  },


  /**红外宝*/
  goToInfrared: function(e) {
    var id = device.getDataSet(e, 'id');
    var deviceInfo = JSON.stringify(this.data.deviceInfo);
    wx.navigateTo({
      url: '../infrared/infrared?deviceInfo=' + deviceInfo + '&id=' + id
    });
  },
})
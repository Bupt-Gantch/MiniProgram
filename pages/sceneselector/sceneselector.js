// pages/sceneselector/sceneselector.js
import {
  SceneSelector
} from 'sceneselector_model.js';
import {
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
var sceneselector = new SceneSelector();
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deviceImgUrl: Config.deviceImgUrl,
    showEdit: false,
    content1: {
      title: "修改设备名",
      placeholder: "请输入设备名"
    },
    newName: '',
    showDevice: false,
    content2: {
      title: "绑定设备",
      name: "bindDevices",
    },
    showScene: false,
    content3: {
      title: "绑定场景"
    },
    showSceneDetailOne: true,
    showSceneDetailTwo: false,
    showDetailviewOne: true,
    showDetailviewTwo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var deviceid = options.deviceid;
    var deviceName = options.deviceName;
    var deviceType = options.deviceType;
    this.setData({
      customerId:app.globalData.customerId,
      deviceId: deviceid,
      deviceName: deviceName,
      deviceType: deviceType,
    });
    this._loadData(deviceid);
    this._loadDeviceDetail(deviceid);
    // this._loadSceneDetail(deviceid);
  },

  _loadData: function(deviceid) {
    sceneselector.getDeviceInfo(deviceid, (data) => {
      this.setData({
        deviceInfo: data
      });
    });
  },

  _loadDeviceDetail: function(deviceid) {
    var sceneSelector = Array();
    var newSceneList = Array();
    var _this = this;
    sceneselector.getSceneSelectorBind(deviceid, (res) => {
      if (res.bindType == "scene") {
        var deviceId = res.scene_id;
        sceneselector.getSceneDevices(deviceId, (res) => {
          _this.setData({
            sceneLists: res,
          });
          _this.data.sceneLists.forEach(function(element) {
            sceneselector.getDeviceById(element.deviceId, (data) => {
              element.deviceType = data.deviceType,
                element.name = data.name,
                element.nickname = data.nickname,
                newSceneList.push(element);
              _this.setData({
                sceneDetail: newSceneList
              });
            })
          });
          _this.setData({
            showSceneDetailOne: true,
            showDetailviewOne: true,
            showSceneDetailTwo: true,
            showDetailviewTwo: false,
          })
        });
      } else if (res.bindType == "device") {
        var deviceIds = res.deviceIds;
        deviceIds.forEach(function(element) {
          sceneselector.getDeviceById(element, (res) => {
            sceneSelector.push(res);
            console.log(res)
          });
          setTimeout(function() {
            _this.setData({
              showSceneDetailOne: true,
              showDetailviewOne: true,
              showSceneDetailTwo: false,
              showDetailviewTwo: true,
              deviceDetail: sceneSelector,
            })
          }, 1000)
        });
      }
    })
  },

//提示可修改设备名称
  showAlert: function () {
    wx.showToast({
      title: '长按设备名可对设备名进行更改',
      icon: 'none',
      duration: 2000
    })
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
      showScene: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  cancel: function() {
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
      sceneselector.saveDevice(newdeviceInfo, (res) => {
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
    }
  },
  inputChange: function(event) {
    var inputValue = event.detail.value;
    this.data.newName = inputValue;
  },

  //场景开关绑定设备
  bindDevice: function() {
    var _this = this;
    var newAllDevices = Array();
    var deviceDetail = this.data.deviceDetail;
    var parentdeviceId = app.globalData.gatewayId;
    sceneselector.getAllSonDevices(parentdeviceId, (res) => {
      var allDevices = new Array();
      res.forEach(function(element) {
        if (element.deviceType === "switch" || element.deviceType === "curtain" || element.deviceType === "dimmableLight") {
          allDevices.push(element);
        };
      });
      if(deviceDetail!=undefined){
      for (var i = 0; i < allDevices.length; i++) {
        for (var j = 0; j < deviceDetail.length; j++) {
          if (allDevices[i].id == deviceDetail[j].id)
            break;
        }
        if (j == deviceDetail.length) {
          newAllDevices.push(allDevices[i]);
        }
      }
      }else{
        newAllDevices = allDevices;
      };
      _this.setData({
        devices: newAllDevices
      });
      console.log(newAllDevices);
      if (newAllDevices.length == 0) {
        wx.showToast({
          title: '没有可绑定的设备',
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

  //场景开关绑定场景
  bindScene: function() {
    var _this = this;
    var gatewayName = app.globalData.gatewayName;
    sceneselector.loadAllScene(gatewayName, (res) => {
      console.log(res);
      this.setData({
        allScene: res
      });
      if (res.length == 0) {
        wx.showToast({
          title: '您还没有任何场景',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          showScene: true
        })
      }
    })
  },

  /**
   * 绑定设备
   */
  bindDevices: function(e) {
    var _this = this;
    var deviceIdArr = e.detail.value.gateway;
    var deviceList = [];
    var sceneSelector = Array();
    deviceIdArr.forEach(function(element) {
      deviceList.push(element);
    });
    console.log(deviceList);
    if (deviceList.length == 0) {
      wx.showToast({
        title: '请选择要绑定的设备',
        icon: 'none',
      })
    } else {
      var param = {
        deviceId: deviceList,
        sceneSelectorId: _this.data.deviceId
      };
      console.log(param);
      sceneselector.bindDevice(param, (res) => {
        console.log(res);
        if (res == "success") {
          var deviceId = this.data.deviceId;
          this.hideModal();
          this._loadDeviceDetail(deviceId);
      eDetail: sceneSelector,
          wx.showToast({
            title: '绑定成功',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '绑定失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },

  onBindDelete: function(event) {
    var deviceId = [];
    var newDeviceDetail = Array();
    var deleteDeviceId = event.detail.value.radiogroup;
    deviceId.push(event.detail.value.radiogroup);
    var param = {
      sceneSelectorId: this.data.deviceId,
      deviceId: deviceId,
    };
    console.log(param);
    sceneselector.deleteSceneSelectorBind(param, (res) => {
      if(res === 'success'){
        var deviceDetail = this.data.deviceDetail;
        deviceDetail.forEach(function(element){
          if (element.id != deleteDeviceId){
            newDeviceDetail.push(element);
          }
        });
        this.setData({
          deviceDetail: newDeviceDetail
        });
        if (newDeviceDetail.length == 0){
          this.setData({
            showSceneDetailOne: true,
            showDetailviewOne: true,
            showSceneDetailTwo: false,
            showDetailviewTwo: false,
          })
        }
      }else{
        wx.showToast({
          title: '解绑失败',
          icon:'none'
        })
      }
    })
  },
  /**
   * 绑定场景
   */
  onBindConfirm: function(event) {
    console.log(event.detail.value.sceneid);
    var _this = this;
    var sceneid = event.detail.value.sceneid;
    var newSceneList = Array();
    var param = {
      scene_id: sceneid,
      sceneSelectorId: this.data.deviceId
    }
    sceneselector.bindSceneSelector(param, (res) => {
      if (res == "success") {
        var deviceId = this.data.deviceId;
        console.log(deviceId);
          _this.hideModal();
          _this.setData({
            showSceneDetailOne: true,
            showDetailviewOne: true,
            showSceneDetailTwo: true,
            showDetailviewTwo: false,
          });
        wx.showToast({
          title: '操作成功',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})
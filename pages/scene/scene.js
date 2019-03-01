// pages/scene/scene.js
import {
  Config
} from '../../utils/config.js';
import {
  Scene
} from 'scene_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var scene = new Scene();
var app = getApp();
var sceneDevicesArray = []

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.deviceImgUrl,
    statusTable: {},
    switchOnImg: Config.switchOnUrl,
    requestId: 1000000, //请求id100w 递减
    // categoryName: Config.categoryName,
    // categoryType: Config.categoryType,
    categoryTypeArray: Config.categoryTypeArray,
    // sceneType: Config.secneType,

    showBulb1: false,
    showBulb2: false,
    showBulb3: false,
    showLock: false,
    showCurtain: false,
    showSwitch: false,

    newTypeDevices: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var content = app.getLanuage(app.globalData.language);
    var sceneName = options.sceneName;
    var parentdeviceId = app.globalData.gatewayId;
    this.setData({
      bannerTitle: sceneName,
      parentdeviceId: parentdeviceId,
      categoryName: content.categoryName,
      categoryType: content.categoryType,
      sceneType: content.scenetypes
    })
    console.log(parentdeviceId);
    this._loadCateDevices(parentdeviceId)
  },

  //load所有场景设备
  _loadCateDevices: function(parentdeviceId) {
    var _this = this
    scene.getAllSonDevices(parentdeviceId, (data) => {
      console.log(data);
      this.setData({
        categoryAllDevices: data
      });
      /*========获取场景开关设备=============*/
      var currentType = this.data.sceneType;
      var _arrayType = this.data.categoryType[currentType];
      var typeDevices = new Array();

      this.data.categoryAllDevices.forEach(function(element) {
        if (scene.inArray(element.deviceType, _arrayType)) {
          typeDevices.push(element);
        }
      });
      this.setData({
        sceneDevices: typeDevices
      })
    });
  },

  // onDeviceLongPress: function(event) {
  //   var deviceId = scene.getDataSet(event, 'deviceid');
  //   var deviceType = scene.getDataSet(event, 'type');
  //   this.setData({
  //     deviceId: deviceId
  //   })
  //   if (deviceType == 'dimmableLight') {
  //     this.setData({
  //       showBulb1: true
  //     })
  //   } else if (deviceType == '色温灯') {
  //     this.setData({
  //       showBulb2: true
  //     })
  //   } else if (deviceType == '调光灯') {
  //     this.setData({
  //       showBulb3: true
  //     })
  //   } else if (deviceType == '门锁') {
  //     this.setData({
  //       showLock: true
  //     })
  //   } else if (deviceType == 'switch') {
  //     this.setData({
  //       showSwitch: true
  //     })
  //   } else if (deviceType == 'curtain') {
  //     this.setData({
  //       showCurtain: true
  //     })
  //   }
  // },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showBulb1: false,
      showBulb2: false,
      showBulb3: false,
      showLock: false,
      showCurtain: false,
      showSwitch: false
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
  onSceneConfirm: function() {},
  inputSceneChange: function(event) {
    var inputValue = event.detail.value;
    this.data.sceneName = inputValue;
  },

  formSubmit: function(event) {
    var data1 = scene.getDataSet1(event, 'data1');
    var data2 = scene.getDataSet1(event, 'data2');
    var data3 = scene.getDataSet1(event, 'data3');
    var data4 = scene.getDataSet1(event, 'data4');
    if (data1 == true) {
      data1 = 1;
    } else if (data1 == false) {
      data1 = 0;
    }
    if (data2 == "" || data2 == undefined) {
      data2 = 0;
    }
    if (data3 == "" || data3 == "0" || data3 == undefined) {
      data3 = 0;
    } else if (data3 == "1") {
      data3 = 1;
    }
    if (data4 == "" || data4 == undefined) {
      data4 = 0;
    }
    var sceneDevice = {
      "deviceId": this.data.deviceId,
      "data1": data1,
      "data2": data2,
      "data3": data3,
      "data4": data4,
    }
    sceneDevicesArray.push(sceneDevice)
    this.hideModal()
  },
  //保存场景
  saveScene: function(e) {
    console.log(e);
    var question = e.detail.value;
    var deviceArr = [];
    var switchArr = [];
    // var lightArr = [];
    for (var key in question) {
      if (key[0] === 'd')
        deviceArr.push(question[key]);
      if (key[0] === 's')
        switchArr.push(question[key])
    };
    deviceArr.forEach(function(element, index) {
      if (element.length != 0) {
        var data1;
        if (switchArr[index]) {
          data1 = 1
        } else {
          data1 = 0
        }
        var sceneDevice = {
          "deviceId": element[0],
          "data1": data1,
          "data2": 200,
          "data3": 0,
          "data4": 0,
        }
        sceneDevicesArray.push(sceneDevice);
      }
    })
    console.log(sceneDevicesArray);
    var _this = this
    if (sceneDevicesArray.length == 0) {
      wx.showToast({
        title: '请添加设备来创建场景',
        icon: 'none',
        duration: 2000
      })
    } else {
      var sceneType = {
        "sceneName": this.data.bannerTitle,
        "customerId": app.globalData.customerId,
        "sceneInfo": sceneDevicesArray,
      }
      sceneDevicesArray = [];
      scene.addscene(sceneType, (res) => {
        if (res === "success") {
          wx.showToast({
            title: '创建成功',
            duration: 2000,
          })
          setTimeout(function() {
            wx.navigateBack({
              url: '../category/category',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '创建失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
})
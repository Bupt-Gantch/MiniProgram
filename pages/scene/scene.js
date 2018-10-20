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
var app = getApp()

var scenlist = {}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.deviceImgUrl,
    statusTable: {},
    switchOnImg: Config.switchOnUrl,
    requestId: 1000000, //请求id100w 递减
    categoryName: Config.categoryName,
    categoryType: Config.categoryType,
    categoryTypeArray: Config.categoryTypeArray,
    sceneType: Config.secneType,

    showBulb1: false,
    showBulb2: false,
    showBulb3: false,
    showLock: false,
    showCurtain:false,
    showSwitch:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sceneid = options.sceneid;
    var sceneName = options.sceneName;
    if (sceneid != undefined) {
      this.setData({
        sceneid: sceneid,
        bannerTitle: sceneName
      })
      this._loadSceneDevices(sceneid);
    } else {
      this.setData({
        bannerTitle: sceneName
      })
      // this._loadCateDevices(app.globalData.customerid)
      this._loadCateDevices()
    }
  },

  //load所有场景设备
  _loadCateDevices: function() {
    scene.getAllDevices((data) => {
      this.setData({
        categoryAllDevices: data.data
      });
      /*========对所有设备按类型分类=============*/
      var currentType = this.data.sceneType[0];
      var _arrayType = this.data.categoryType[currentType];
      var typeDevices = new Array();
      this.data.categoryAllDevices.forEach(function(element) {
        if (scene.inArray(element.deviceType, _arrayType)) {
          typeDevices.push(element);
        }
      });

      this.setData({
        sceneDevices: typeDevices
      });
    });
  },

  _loadSceneDevices: function(sceneid) {
    scene.getSceneDevices(sceneid, (data) => {
      this.setData({
        sceneDevices: data.data
      });
    });
  },

  // onDevicesItemTap: function(event) {
  //   var deviceid = scene.getDataSet(event, 'deviceid');
  //   var deviceType = scene.getDataSet(event, 'type');

  //   if (deviceType === "switch" || deviceType === "outlet") {
  //     //nothing
  //   } else if (deviceType === 'sceneSelector') {
  //     wx.navigateTo({
  //       url: '../sceneSelector/sceneSelector?deviceid=' + deviceid
  //     });
  //   } else {
  //     wx.navigateTo({
  //       url: '../device/device?deviceid=' + deviceid + '&deviceType=' + deviceType
  //     });
  //   }
  // },

  onDeviceLongPress: function(event) {
    var deviceId = scene.getDataSet(event, 'deviceid');
    var deviceType = scene.getDataSet(event, 'type');
    console.log(deviceType)
    // if(deviceType=='调色灯'){
    if (deviceType == 'dimmableLight') {
      this.setData({
        showBulb1: true
      })
    } else if (deviceType == '色温灯'){
      this.setData({
        showBulb2: true
      })
    } else if (deviceType == '调光灯') {
      this.setData({
        showBulb3: true
      })
    } else if (deviceType == '门锁') {
      this.setData({
        showLock: true
      })
    }else if(deviceType == 'switch'){
      this.setData({
        showSwitch: true
      })
    }else if(deviceType == 'curtain'){
      this.setData({
        showCurtain: true
      })
    }
    // var _this = this;
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
      showBulb1: false,
      showBulb2: false,
      showBulb3: false,
      showLock: false,
      showCurtain:false,
      showSwitch:false
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

  formSubmit:function(event){
    console.log(123)
  },
//保存场景
  saveScene:function(){

  }
})
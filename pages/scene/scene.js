// pages/scene/scene.js
import { Config } from '../../utils/config.js';
import { Scene } from 'scene_model.js';
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
    requestId: 1000000,   //请求id100w 递减

    showBulb1: false,
    showBulb2: false,
    showBulb3: false,
    showLock: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sceneid = options.sceneid;
    var sceneName = options.sceneName;
    if(sceneid!=undefined){
      this.setData({
        sceneid: sceneid,
        bannerTitle: sceneName
      })
      this._loadSceneDevices(sceneid);
    }
    else{
      this.setData({
        bannerTitle: sceneName
      })
      this._loadCateDevices(app.globalData.customerid)
    }
  },

  //load所有场景设备
  _loadCateDevices: function (param) {
    scene.getAllDevices(param,(data) => {
        this.setData({
          sceneDevices: data.data
        });
      });
  },

  _loadSceneDevices: function (sceneid){
    scene.getSceneDevices(sceneid, (data) => {
      this.setData({
        sceneDevices: data.data
      });
    });
  },

  onDevicesItemTap: function (event) {
    var deviceInfo = scene.getDataSet(event, 'deviceinfo');
    var deviceid = scene.getDataSet(event, 'deviceid');
    var deviceType = deviceInfo.deviceType;
    var deviceName = deviceInfo.name;

    if (deviceType === "switch" || deviceType === "outlet") {
      //nothing
    } else if (deviceType === 'sceneSelector') {
      wx.navigateTo({
        url: '../sceneSelector/sceneSelector?deviceid=' + deviceid
      });
    }
    else {
      wx.navigateTo({
        url: '../device/device?deviceid=' + deviceid + '&deviceType=' + deviceType + '&deviceName=' + deviceName
      });
    }
  },

  onDeviceLongPress: function (event) {
    var deviceId = scene.getDataSet(event, 'deviceid');
    var deviceType = scene.getDataSet(event, 'type');
    // if(deviceType=='调色灯'){
      if(1){
      this.setData({
        showBulb1: true
      })
    }else if(deviceType=='色温灯'){
      this.setData({
        showBulb2: true
      })
    }else if(deviceType=='调光灯'){
      this.setData({
        showBulb3: true
      })
    } else if(deviceType=='门锁'){
      this.setData({
        showLock: true
      })
    }
    // var _this = this;
  },

  /**
 * 弹出框蒙层截断touchmove事件
 */
  preventTouchMove: function () {
  },
  /**
  * 隐藏模态对话框
  */
  hideModal: function () {
    this.setData({
      showBulb1: false,
      showBulb2: false,
      showBulb3: false,
      showLock: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 场景对话框确认按钮点击事件
   */
  onSceneConfirm: function () {
  },
  inputSceneChange: function (event) {
    var inputValue = event.detail.value;
    this.data.sceneName = inputValue;
  },

  /**
   * 控制开关类设备
   */
  switchChange: function (event) {
    var status = event.detail.value;
    var deviceInfo = scene.getDataSet(event, 'deviceinfo');
    var deviceId = deviceInfo.id;
    var requestId = this.data.requestId;

    /**开关变换改变图片 */
    this.data.statusTable[deviceId] = status;
    var newStatusTable = this.data.statusTable;
    this.setData({
      statusTable: newStatusTable
    });

    var triad = {
      deviceType: deviceInfo.deviceType,
      manufacture: deviceInfo.manufacture,
      model: deviceInfo.model
    }

    /**控制需要的请求数据 */
    var data = {
      deviceId: deviceInfo.id,
      requestId: requestId,
      triad: triad,
      status: status
    };

    scene.turnSwitch(data, (res) => {
      var statusCode = res.statusCode.toString();
      if (statusCode.charAt(0) == '2' && res.data.indexOf("device") === -1) {   //状态码为200则应用成功
        wx.showToast({
          title: '应用成功',
          icon: 'success',
          duration: 1000,
          // mask: true
        });

      } else {              //状态码不是200  应用失败
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
})
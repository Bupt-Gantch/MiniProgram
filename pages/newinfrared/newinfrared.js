// pages/newinfrared/newinfrared.js
import {
  NewInfrared
} from 'newinfrared_model.js';
import {
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
var newinfrared = new NewInfrared();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonInfrared: Config.buttonInfrared,
    infraredImg: Config.infraredImg,
    addNewLearn: false,
    newButtonName: '',
    serviceName: Config.serviceName,
    methodName: Config.methodName,
    requestId: 1000000, //请求id100w 递减
    content: {
      title: "自定义学习",
      placeholder: "请输入按键名称",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    var id = options.id;
    var deviceInfo = JSON.parse(options.deviceInfo);
    var learnName = options.learnName;
    var panelId = options.panelId;
    this.setData({
      deviceInfo: deviceInfo,
      deviceId: deviceInfo.id,
      id: id,
      learnName:learnName,
      panelId:panelId,
      // deviceInfo: "deviceInfo",
      // deviceId: "deviceInfo.id",
      // learnName: "learnName",
      // panelId: "panelId",
    });
    // this._loadPanelInfo();
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

  },

  _loadPanelInfo: function() {
    var param = {
      panelId: this.data.panelId
    }
    newinfrared.getPanelInfo(id, (res) => {

    });
  },

  //删除按键
  onDeleteButton: function(e) {
    var buttonid = newinfrared.getDataSet(e, 'buttonid');
    var name = newinfrared.getDataSet(e, 'name');
  },


  //下发学习指令
  onNewLearnConfirm: function() {
    var newButtonName = this.data.newButtonName;
    console.log(newButtonName);
    if (newButtonName.length == 0) {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000
      });
    } else {
      var value = {
        "matchType": 5,
        "name": newButtonName,
        "id": id,
      };

      let serviceName = this.data.serviceName.controlIR;
      let methodName = this.data.methodName.learn;
      this._sendControl(serviceName, methodName, value);

      this.hideModal();
    }
  },


  //控制
  onPenetrateTap: function(e) {

    var buttonid = newinfrared.getDataSet(e, 'buttonid');
    var name = newinfrared.getDataSet(e, 'name');

    var value = {
      "matchType": buttonid,
      "name": name
    };
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.penetrate;
    this._sendControl(serviceName, methodName, value);

  },



  /**
   * ====================sendControl==========================
   * =====================================================
   */
  _sendControl: function(serviceName, methodName, value) {

    var deviceId = this.data.deviceInfo.id;
    var requestId = this.data.requestId;
    var _this = this;
    var triad = {
      deviceType: _this.data.deviceInfo.deviceType,
      manufacture: _this.data.deviceInfo.manufacture,
      model: _this.data.deviceInfo.model
    }

    var data = '';
    /**控制需要的请求数据 */
    data = {
      serviceName: serviceName,
      methodName: methodName,
      deviceId: _this.data.deviceInfo.id,
      requestId: requestId,
      triad: triad,
      value: value
    };
    newinfrared.applyControl(data, (res) => {
      console.log(res);
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

  //学习
  onLearnTap: function(value) {
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.learn;
    this._sendControl(serviceName, methodName, value);
  },

  //点击学习按钮
  onOwnLearn: function () {
    this.setData({
      addNewLearn: true
    })
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      addNewLearn: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },

  inputNewLearnNameChange: function (event) {
    var inputValue = event.detail.value;
    this.data.newButtonName = inputValue;
  },

  showAlert: function () {
    wx.showModal({
      title: '提示',
      content: '点击左侧按钮进行按键学习，点击下方功能按键进行控制，长按下方功能按键删除按键',
      showCancel:false,
      confirmText:'我知道了',

    })
  },


})
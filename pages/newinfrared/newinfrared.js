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
    console.log(options);
    var _this = this;
    var id = options.id;
    var deviceInfo = JSON.parse(options.deviceInfo);
    console.log(deviceInfo);
    var learnName = options.learnName;
    var panelId = options.panelId;
    this.setData({
      deviceInfo: deviceInfo,
      deviceId: deviceInfo.id,
      id: id,
      learnName:learnName,
      panelId:panelId,
    });

    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.getVersion;
    var value = {

    };
    this._sendControl(serviceName, methodName, value);
    this._loadPanelInfo();
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
    var panelId = this.data.panelId;
    var deviceId = this.data.deviceId;
    newinfrared.getPanelName(deviceId,panelId,(res) => {
      console.log(res);

      var info = JSON.parse(res.data.data);
      console.log(info);
      this.setData({
        panelId:info.id,
        learnName:info.name
      })
    });
    newinfrared.getPanelInfo(panelId, (res) => {
      var keyInfo = JSON.parse(res.data.data);
      console.log(res);
      console.log(keyInfo);
      if(res.data.msg != "success") {
        wx.showToast({
          title: '还没有学习任何按键',
          icon: 'none',
          duration: 2000
        });
      }else {
        this.setData({
          allButton:keyInfo
        })
      }
    });
  },

  //删除按键
  onDeleteButton: function(e) {
    var _this = this;
    var key = newinfrared.getDataSet(e, 'key');
    var panelId = this.data.panelId;

    console.log(panelId);
    wx.showModal({
      title: '删除按键',
      content: '点击确定将删除该按键！',
      success: function (res) {
        if (res.confirm) {
          newinfrared.deleteButton(panelId, key, (res) => {
            _this._loadPanelInfo();
          });
        }

      }
    })

  },


  //下发学习指令
  onNewLearnConfirm: function() {
    var newButtonName = this.data.newButtonName;
    var _this = this;
    console.log(newButtonName);
    if (newButtonName.length == 0) {
      wx.showToast({
        title: '名称不能为空',
        icon: 'none',
        duration: 2000
      });
    } else {
      var value = {
        "type": 5,
        "keyName": newButtonName,
        "panelId": this.data.panelId,
        "number":10,
      };

      let serviceName = this.data.serviceName.controlIR;
      let methodName = this.data.methodName.learn;
      this._sendControl(serviceName, methodName, value);
      this.hideModal();
      wx.showLoading({
        title: '请按下对应的按钮',
        mask:true,
      })

      setTimeout(function () {
        wx.hideLoading();
        _this._loadPanelInfo();
      },5000)
    }
  },


  //控制
  onPenetrateTap: function(e) {

    var key = newinfrared.getDataSet(e, 'key');
    var value = {
      "key": key,
      "type":5,
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
    console.log(_this.data.deviceInfo.deviceType)
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
    console.log(data);
    newinfrared.applyControl(data, (res) => {
      console.log(res);
      if (res.indexOf("device") === -1) { //状态码为200则应用成功
        // wx.showToast({
        //   title: '应用成功',
        //   icon: 'success',
        //   duration: 1000,
        //   // mask: true
        // });
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
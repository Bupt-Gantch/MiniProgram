// pages/infrared/infrared.js
import {
  Infrared
} from 'infrared_model.js';
import { 
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
var infrared = new Infrared();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tvImg:Config.tvImg,
    conditionerImg:Config.conditionerImg,
    serviceName: Config.serviceName,
    methodName: Config.methodName,
    requestId: 1000000, //请求id100w 递减
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this;
    var id = options.id;
    var deviceInfo = JSON.parse(options.deviceInfo);
    this.setData({
      deviceId: deviceInfo.id,
      id: id
    });
    console.log(deviceInfo.id);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * ====================sendControl==========================
   * =====================================================
   */
  _sendControl: function(serviceName, methodName, value) {
    var deviceId = deviceInfo.id;
    var requestId = this.data.requestId;
    var _this = this;
    var triad = {
      deviceType: _this.deviceInfo.deviceType,
      manufacture: _this.deviceInfo.manufacture,
      model: _this.deviceInfo.model
    }

    var data = '';
    /**控制需要的请求数据 */
    data = {
      serviceName: serviceName,
      methodName: methodName,
      deviceId: deviceInfo.id,
      requestId: requestId,
      triad: triad,
      value: value
    };
    infrared.applyControl(data, (res) => {
      if (deviceInfo.deviceType == 'infrared' || deviceInfo.deviceType == 'newInfrared') {
        console.log(res);
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
      console.log(err);
    });

    this.data.requestId--;

  },

  /**红外宝*/

  //学习
  onLearnTap: function(e) {
    var deviceId = this.data.deviceId;

    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.learn;

    this._sendControl(serviceName, methodName, value);
  },

  //匹配
  onMatchTap: function(e) {
    let value = this.data.id;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.match;
    this._sendControl(serviceName, methodName, value);
  },

  //控制
  onPenetrateTap: function(e) {
    let value = this.data.id;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.penetrate;
    this._sendControl(serviceName, methodName, value);
  },

  //当前设备参数接口
  onCurrentKeyTap: function(e) {
    let value = this.data.id;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.currentKey;
    this._sendControl(serviceName, methodName, value);
  },

  //删除按键
  onDeleteKeyTap: function(e) {
    let value = this.data.id;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.deleteKey;
    this._sendControl(serviceName, methodName, value);
  },

  //删除全部按键
  onDeleteAllKeyTap: function(e) {
    let value = this.data.id;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.deleteAllKey;
    this._sendControl(serviceName, methodName, value);
  },

  //退出
  onExitTap: function(e) {
    let value = this.data.id;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.exit;
    this._sendControl(serviceName, methodName, value);
  }
})
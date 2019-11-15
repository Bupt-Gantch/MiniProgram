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
    tvImg: Config.tvImg,
    conditionerImg: Config.conditionerImg,
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
    var type = options.type;
    var deviceInfo = JSON.parse(options.deviceInfo);
    this.setData({
      deviceInfo: deviceInfo,
      deviceId: deviceInfo.id,
      type: type,
      powStatus:app.globalData.airPower,
      tvPower: app.globalData.tvPower
    });
    console.log(deviceInfo);
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

  _loadPanelInfo: function() {

    var deviceId = this.data.deviceId;
    infrared.getlatestData(deviceId,(res) => {
      console.log(res);
    })
    var panelId = this.data.panelId;
    var deviceId = this.data.deviceId;
    infrared.getPanelName(deviceId, panelId, (res) => {
      console.log(res);
      var info = JSON.parse(res.data);
      console.log(info);
      this.setData({
        panelId: info.id,
        learnName: info.name,
        type: info.type
      })
    });
    infrared.getPanelInfo(panelId, (res) => {
      console.log(res);
      if (res.msg != "success" || res.data.length == 0) {
        this.setData({
          allButton: null
        })
        wx.showToast({
          title: '还没有学习任何按键',
          icon: 'none',
          duration: 2000
        });
      } else {
        var keyInfo = JSON.parse(res.data);
        console.log(res);
        console.log(keyInfo);
        this.setData({
          allButton: keyInfo
        })
      }
    });
  },

  /**
   * ====================sendControl==========================
   * =====================================================
   */
  _sendControl: function(serviceName, methodName, value) {

    var deviceId = this.data.deviceInfo.id;
    var requestId = this.data.requestId;
    var deviceInfo = this.data.deviceInfo;
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
    console.log(data);
    infrared.applyControl(data, (res) => {
      console.log(res);
      if (res.indexOf("device") === -1) { //状态码为200则应用成功
        // wx.showToast({
        //   title: '应用成功',
        //   icon: 'success',
        //   duration: 1000,
        //   // mask: true
        // });
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

  /**红外宝*/

  //匹配
  onMatchTap: function(e) {
    var type = this.data.type;
    var value = {
      "type": type,
    };

    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.match;

    this._sendControl(serviceName, methodName, value);

    wx.showLoading({
      title: '请按下开关',
      mask: true,
    })

    setTimeout(function() {
      wx.hideLoading();
      this._loadPanelInfo();
    }, 10000)
  },

  //控制
  onPenetrateTap: function(e) {
    console.log("onPenetrateTap");

    var type = this.data.type;
    var operation = infrared.getDataSet(e, 'operation');

    var airTem = app.globalData.airTem;
    var airModel = app.globalData.airModel;
    var airWindDir = app.globalData.airWindDir;
    var airWindLev = app.globalData.airWindLev;
    var airPower = app.globalData.airPower;

    var param = {
      "power": airPower,
      "mode": airModel,
      "windLevel": airWindLev,
      "windDirection": airWindDir,
      "tem": airTem
    }

    var value = {
      "key": 1,
      "type": type
    };
    if(operation == "power") {
      if (airPower == "开机") {
        value.key = 1;
        app.globalData.airPower = "关机";
        this.setData({
          powStatus:"关机"
        })
        let serviceName = this.data.serviceName.controlIR;
        let methodName = this.data.methodName.penetrate;
        this._sendControl(serviceName, methodName, value);

      } else {
        value.key = 2;
        app.globalData.airPower = "开机";
        this.setData({
          powStatus: "开机"
        })

        let serviceName = this.data.serviceName.controlIR;
        let methodName = this.data.methodName.penetrate;
        this._sendControl(serviceName, methodName, value);
      }
    } else {
      if (operation == 'model') {
        if(airModel == "制热") {
          app.globalData.airModel = "制冷";
          param.mode = "制冷";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.power = "制热";
        } else if (airModel == "制冷") {
          app.globalData.airModel = "抽湿";
          param.mode = "抽湿";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.power = "制冷";
        } else if (airModel == "抽湿") {
          app.globalData.airModel = "送风";
          param.mode = "送风";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.power = "抽湿";
        } else if (airModel == "送风") {
          app.globalData.airModel = "自动";
          param.mode = "自动";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.power = "送风";
        } else {
          app.globalData.airModel = "制热";
          param.mode = "制热";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.power = "自动";
        }
      } else if (operation == 'windUp') {
        if (airWindLev == "低") {
          app.globalData.airWindLev = "中";
          param.windLevel = "中";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.windLevel = "低";
        } else if (airWindLev == "中"){
          app.globalData.airWindLev = "高";
          param.windLevel = "高";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.windLevel = "中";
        } else {
          app.globalData.airWindLev = "低";
          param.windLevel = "低";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.windLevel = "高";
        }
      } else if (operation == 'windDown') {
        if (airWindLev == "高") {
          app.globalData.airWindLev = "中";
          param.windLevel = "中";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.windLevel = "高";
        } else if (airWindLev == "中") {
          app.globalData.airWindLev = "低";
          param.windLevel = "低";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.windLevel = "中";
        } else {
          app.globalData.airWindLev = "高";
          param.windLevel = "高";
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.windLevel = "低";
        }
      } else if (operation == 'temUp') {
        if(airTem == 30) {
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
        } else {
          param.tem = airTem + 1;
          app.globalData.airTem = airTem + 1;
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.tem = airTem;
        }
      } else if (operation == 'temDown') {
        if (airTem == 16) {
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;

            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
        } else {
          param.tem = airTem - 1;
          app.globalData.airTem = airTem - 1;
          console.log(param);
          infrared.getKey(param, (res) => {
            console.log(res);
            value.key = res;
            let serviceName = this.data.serviceName.controlIR;
            let methodName = this.data.methodName.penetrate;
            this._sendControl(serviceName, methodName, value);
          })
          param.tem = airTem;
        }
      }
    }
  },

  tvPenetrateTap:function(e) {
    var key = infrared.getDataSet(e,'key');
    var type = this.data.type;

    var value = {
      "key": key,
      "type": type
    };

    if(this.data.tvPower == "开机") {
      this.setData({
        tvPower:"关机"
      })
    } else {
      this.setData({
        tvPower: "开机"
      })
    }

    console.log(key);
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.penetrate;
    this._sendControl(serviceName, methodName, value);
  },

  //删除按键
  onDeleteKeyTap: function(e) {
    let value = this.data.type;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.deleteKey;
    this._sendControl(serviceName, methodName, value);
  },

  //删除全部按键
  onDeleteAllKeyTap: function(e) {
    let value = this.data.type;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.deleteAllKey;
    this._sendControl(serviceName, methodName, value);
  },

  //退出
  onExitTap: function(e) {
    let value = this.data.type;
    let serviceName = this.data.serviceName.controlIR;
    let methodName = this.data.methodName.exit;
    this._sendControl(serviceName, methodName, value);
  }
})
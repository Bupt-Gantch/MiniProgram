// pages/device/device.js
import {Device} from 'device_model.js';
import {Config} from '../../utils/config.js';
var util = require('../../utils/util.js');
var device = new Device();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceStatus:{
      status:"false",
      fangchai:"true",
      battery:"70%"
    },
    deviceImgUrl: Config.deviceImgUrl,
    bulb: {
      dimmableMinVal:1,
      dimmableMaxVal:255,
      dimmableStep: 2
    },
    serviceName: Config.serviceName,
    requestId: 1000000   //请求id100w 递减
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var deviceid = options.deviceid;
      var deviceType = options.deviceType;
      var deviceName = options.deviceName;
      this.setData({
        deviceType: deviceType,
        deviceId: deviceid,
        deviceName: deviceName
      })
      
    this._loadData(deviceid);
      if (deviceType === 'temperature' || deviceType==='PM2.5' ||
        deviceType === 'IASZone'){
        this._loadRealtimeData(deviceid);
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("de_sensor hide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("de_sensor unload");
    /**卸载页面时断开socket连接 */
    if( this.data.socketTask ){
      this.data.socketTask.close();
    }
  },

  _loadData: function (deviceid){
    device.getDeviceInfo(deviceid,(data)=>{
      this.setData({
        deviceInfo: data
      });
    });
  },

  _loadRealtimeData: function(deviceid){
    var sConCb = function(res){
      wx.showToast({
        title: '连接成功！',
        duration:1000,
        icon: 'success'
      })
    };
    var fConCb = function(err){
      wx.showToast({
        title: '连接失败！',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
      })
      console.log(err);
    };
    //以上为callback
    var socketTask = device.getRealtimeData(deviceid, sConCb, fConCb,(data)=>{
       //收到服务器端发回数据，更新view层数据
      var sensorData = JSON.parse(data).data;
      sensorData.forEach(function(e){
        e.ts = util.formatTime(new Date(e.ts));
      })
      this.setData({
        lastRtData: sensorData
      });
    });
    this.setData({
      socketTask : socketTask
    });

  },

  // bindPickerChange:function(event){
  //   var index = event.detail.value;
  //   var selectedCount = this.data.countsArray[index];
  //   this.setData({
  //     productCount : selectedCount
  //   });
  // },

  // onTabItemTap: function(event){
  //   var index = device.getDataSet(event,'index');
  //   this.setData({
  //     currentTabsIndex: index
  //   });
  // }

  /**
   * =================dimmableLight=======================
   * =====================================================
   */
  onSliderChange: function (event){
    let value = event.detail.value;
    console.log(value);
  },
  onSwitchChange: function (event){
    let value = event.detail.value;
    let serviceName = this.data.serviceName.controlSwitch;
    this._sendControl(serviceName,value,this.data.deviceInfo)
  },
  
  _sendControl: function (serviceName,value,deviceInfo) {
    var deviceId = deviceInfo.id;
    var requestId = this.data.requestId;

    var triad = {
      deviceType: deviceInfo.deviceType,
      manufacture: deviceInfo.manufacture,
      model: deviceInfo.model
    }

    /**控制需要的请求数据 */
    var data = {
      serviceName: serviceName,
      deviceId: deviceInfo.id,
      requestId: requestId,
      triad: triad,
      status: value
    };

    device.applyControl(data, (res) => {
      if (res.indexOf("device") === -1) {   //状态码为200则应用成功
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
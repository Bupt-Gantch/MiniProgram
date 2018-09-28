// pages/device/device.js
import {Device} from 'device_model.js';
import {Config} from '../../utils/config.js';
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
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var deviceid = options.deviceid;
      var deviceType = options.deviceType;
      this.setData({
        deviceType: deviceType,
        deviceId: deviceid
      })
      
      this._loadData();
      this._loadRealtimeData(deviceid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("de_sensor ready");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("de_sensor show");
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

  _loadData: function(){
    device.getDeviceInfo(this.data.deviceid,(data)=>{
      this.setData({
        deviceDetail: data
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

  
})
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var deviceid = options.deviceid;
      this.data.deviceid = deviceid;
      this._loadData();
  },

  _loadData: function(){
    device.getDeviceInfo(this.data.deviceid,(data)=>{
      this.setData({
        deviceDetail: data
      });
    });
  },

  bindPickerChange:function(event){
    var index = event.detail.value;
    var selectedCount = this.data.countsArray[index];
    this.setData({
      productCount : selectedCount
    });
  },

  onTabItemTap: function(event){
    var index = device.getDataSet(event,'index');
    this.setData({
      currentTabsIndex: index
    });

  }

  
})
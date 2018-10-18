// pages/group/group.js

import { Config } from '../../utils/config.js';
import { Group } from 'group_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var group = new Group();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.deviceImgUrl,
    statusTable: {},
    switchOnImg: Config.switchOnUrl,
    

    requestId: 1000000   //请求id100w 递减
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var groupid = options.groupid;
    var groupName = options.groupName;
    this.setData({
      groupid: groupid,
      bannerTitle: groupName
    })
    this._loadGroupDevices(groupid);
  },

  _loadGroupDevices: function(groupid) {
    group.loadGroupDevices(groupid,(data)=>{
      this.setData({
        groupDevices: data.data
      });
    })
  },

  onDevicesItemTap: function (event) {
    var deviceid = group.getDataSet(event, 'deviceid');
    var deviceType = group.getDataSet(event, 'type');

    if (deviceType === "switch" || deviceType === "outlet") {
      //nothing
    } else if (deviceType === 'sceneSelector') {
      wx.navigateTo({
        url: '../sceneSelector/sceneSelector?deviceid=' + deviceid
      });
    }
    else {
      wx.navigateTo({
        url: '../device/device?deviceid=' + deviceid + '&deviceType=' + deviceType
      });
    }
  },

  onDeviceLongPress: function(event){
    var deviceId = group.getDataSet(event,'deviceid');
    var _this = this;
    wx.showModal({
      title: '取消分配设备',
      content: '您确定要从分组中删除该设备吗？',
      success: function (res) {
        if (res.confirm) {
          _this._unassignDeviceFromGroup(deviceId);
        }
      }
    });
  },

  _unassignDeviceFromGroup: function(deviceId) {
    var groupId = this.data.groupid;
    group.unassignDevice(groupId,deviceId,(res) => {
        wx.showToast({
          title: '取消分配成功',
        });
        this._loadGroupDevices(groupId);
    },(err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
    } );
  },

  /**
   * 控制开关类设备
   */
  switchChange: function (event) {
    var status = event.detail.value;
    var deviceInfo = group.getDataSet(event, 'deviceinfo');
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

    group.turnSwitch(data, (res) => {
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
// pages/group/group.js

import {
  Config
} from '../../utils/config.js';
import {
  Group
} from 'group_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var group = new Group();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: Config.deviceImgUrl,
    statusTable: {},
    switchOnImg: Config.switchOnUrl,
    iASZoneImg: Config.iASZoneUrl,
    requestId: 1000000 //请求id100w 递减
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var groupid = options.groupid;
    var groupName = options.groupName;
    this.setData({
      groupid: groupid,
      bannerTitle: groupName,
      netStatus: app.globalData.netStatus
    })
    this._loadGroupDevices(groupid);
  },

  _loadGroupDevices: function(groupid) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var allDevices = new Array();
    group.loadGroupDevices(groupid, (data) => {
      data.data.forEach(function(element) {
        if (element.deviceType == "IASZone") {
          var model = element.model;
          var start = model.indexOf("-");
          element.model = model.substr(start + 1, 3);
          allDevices.push(element);
        } else {
          allDevices.push(element);
        }
      });
      this.setData({
        groupDevices: allDevices
      })
    });
  },

  onDevicesItemTap: function(event) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var deviceInfo = group.getDataSet(event, 'deviceinfo');
    var deviceid = group.getDataSet(event, 'deviceid');
    var deviceType = deviceInfo.deviceType;
    var deviceName = deviceInfo.name;

    if (deviceType === "switch" || deviceType === "outlet") {
      //nothing
    } else if (deviceType === 'sceneSelector') {
      wx.navigateTo({
        url: '../sceneSelector/sceneSelector?deviceid=' + deviceid
      });
    } else {
      wx.navigateTo({
        url: '../device/device?deviceid=' + deviceid + '&deviceType=' + deviceType + '&deviceName=' + deviceName
      });
    }
  },

  onDeviceLongPress: function(event) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var deviceId = group.getDataSet2(event, 'deviceid');
    var _this = this;
    wx.showModal({
      title: '取消分配设备',
      content: '您确定要从分组中删除该设备吗？',
      success: function(res) {
        if (res.confirm) {
          _this._unassignDeviceFromGroup(deviceId);
        }
      }
    });
  },

  _unassignDeviceFromGroup: function(deviceId) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var groupId = this.data.groupid;
    group.unassignDevice(groupId, deviceId, (res) => {
      wx.showToast({
        title: '取消分配成功',
      });
      this._loadGroupDevices(groupId);
    }, (err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
    });
  },

  /**
   * 控制开关类设备
   */
  switchChange: function(event) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
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

      if (res.indexOf("device") === -1) { //状态码为200则应用成功
        wx.showToast({
          title: '应用成功',
          icon: 'success',
          duration: 1000,
          // mask: true
        });

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
})
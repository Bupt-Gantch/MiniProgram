// pages/my/family.js
//获取应用实例
import {
  Config
} from '../../utils/config.js';
import {
  Family
} from 'family_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var family = new Family();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gatewayImg: Config.gatewayUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._loadGateway();
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

  _loadGateway: function() {
    var customerId = app.globalData.customerId;
    var gatewayList = new Array();
    var _this = this;
    family.getAllDevices(customerId, (res) => {
      res.data.forEach(function(element) {
        if (element.deviceType === "Gateway") {
          gatewayList.push(element);
        }
      });
      _this.setData({
        gatewayArray: gatewayList
      });
    })
  },

  showGatewayInfo: function(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.id);
    var gatewayId = e.currentTarget.dataset.id;
    this.setData({
      nowGateway:gatewayId
    })
    this.isShared(gatewayId);
  },

  isShared: function(gatewayId) {
    var _this = this;
    var param = {
      customerid: app.globalData.customerId
    };
    var showInfo = Array();
    var sharedList = new Array();
    family.getShareGateway(param, (res) => {
      var shareList = res.data;
      console.log(res);
      if (shareList == null || shareList.length == 0) {
        _this.setData({
          showInfo: null
        });
        wx.showToast({
          title: '该网关还没有被分享过',
          icon: 'none'
        })
      } else {
        shareList.forEach(function(element) {
          var gatewayFirst = element.gates;
          var gatewayData = gatewayFirst.split(",")
          if (gatewayData.length != 0) {
            gatewayData.forEach(function(e) {
              if (e != "" && e === gatewayId) {
                element.gates = gatewayId;
                sharedList.push(element);
                return false;
              }
            })
          };
        });

        if (sharedList.length == 0) {
          _this.setData({
            showInfo: null
          });
          wx.showToast({
            title: '该网关还没有被分享过',
            icon: 'none'
          })
        } else {
          _this.setData({
            showInfo: sharedList
          });
          console.log(sharedList);
        }
      }
    })
  },

  deleteShare:function(e) {
    var _this = this;
    console.log(e);
    var deleteGateids = e.currentTarget.dataset.id;
    var deletePhone= e.currentTarget.dataset.phone;
    var param = {
      customerid: app.globalData.customerId,
      gateids: deleteGateids,
      phone: deletePhone,
    };

    wx.showModal({
      title: '取消分享',
      content: '确定要取消分享吗？',
      success: function (res) {
        if (res.confirm) {
          family.onOwnerUnShare(param, (res) => {
            console.log(res);
            if (res.status == "success") {
              _this.isShared(_this.data.nowGateway);
            } else {
              wx.showToast({
                title: '取消失败',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      }
    })
  }


})
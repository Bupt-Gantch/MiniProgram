// pages/loading/loading.js
import {
  Config
} from '../../utils/config.js';
import {
  Loading
} from 'loading_model.js';
var loading = new Loading();
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '/imgs/swiper/swiper-01.jpg',
      '/imgs/swiper/swiper-02.jpg',
      // '/imgs/swiper/swiper-03.jpg'
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language),
    })
    // 在没有 open-type=getUserInfo 版本的兼容处理
    // if (!this.data.canIUse) {
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //     }
    //   })
    // }
  },


  onShareAppMessage: function(res) {
    return {
      title: '冠川智能',
      path: '/pages/loading/loading',
      success: function() {},
      fail: function() {}
    }
  },

  onShow: function() {
    this.setData({
      content: app.getLanuage(app.globalData.language),
      netStatus: app.globalData.netStatus
    })
  },

  goToIndex: function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },



  changeLanuage: function() {
    var version = app.globalData.language;
    if (version == "中文") {
      app.globalData.language = "English"
    } else {
      app.globalData.language = "中文"
    }
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },
})
//my.js
//获取应用实例
import { Config } from '../../utils/config.js';
import { My } from 'my_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var my = new My();
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  //首次加载
  onLoad: function () {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow:function(){
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },
  //获取用户信息
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  myPublish:function(e){
        wx.navigateTo({
          url: '/pages/mypublish/mypublish',
        })
  },

  myNews:function(e){
      wx.navigateTo({
        url: '/pages/mynews/mynews',
      })
  },

  onContactTap:function(event){
    wx.navigateTo({
      url: '../contact/contact',
    });
  },
  
  changeLanuage: function () {
    var version = app.globalData.language;
    if (version == "中文") {
      app.globalData.language = "English"
    } else {
      app.globalData.language = "中文"
    }
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  }

})

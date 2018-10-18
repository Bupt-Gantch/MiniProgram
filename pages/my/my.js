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

  scan:function(){
    wx.scanCode({
      success:function(res){
        console.log(res)
        if(res.result!=null){
          param:{
            customerid:''
          }
          // my.addDevice(param,(res)=>{
            // if (res.data === 1) {
            if (1) {
              wx.showToast({
                title: '添加成功',
                duration: 3000,
              })
            } else {
              wx.showModal({
                title: '添加失败',
                content: '该设备已被其他用户添加，请联系管理员。Phone:138XXXXXXX',
              })
            }
          // })
        }else{
          wx.showToast({
            title: '无效的二维码',
            icon:'none',
            duration: 2000,
          })
        }
      }
    })
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

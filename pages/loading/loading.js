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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '/imgs/swiper/swiper-01.jpg',
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-03.jpg'
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    if(!app.globalData.openid){
    wx.login({
      success: res => {
        this.setData({
          code: res.code
        })
        var param = {
          data: {
            appid: app.globalData.appid,
            secret: app.globalData.secret,
            js_code: res.code,
            grant_type: 'authorization_code'
          }
        }
        loading.getOpenid(param, (res) => {
          app.globalData.openid = res.openid
            this.setData({
              openid: res.openid,
            })
          if (res.errcode!=40029){
            app.globalData.openid = res.openid
            this.setData({
              openid: res.openid,
            })
          }else{
            wx.showToast({
              title: '请检查网络设置',
              ico:'none',
              duration: 2000,
            })
          }
        })
      }
    })
    }else{
      this.setData({
        openid:app.globalData.openid
      })
    }
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
    // 在没有 open-type=getUserInfo 版本的兼容处理
    if (!this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  onShow: function() {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },
  /**
  * 获取用户信息接口后的处理逻辑
  */
  getUserInfo: function (e) {
    // 将获取的用户信息赋值给全局 userInfo 变量
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.showLoading({
        title: this.data.content.loading,
      })
      setTimeout(function(){
        wx.hideLoading()
        if (app.globalData.openid == null) {
          wx.showToast({
            title: '请检查网络设置',
            icon: 'none',
            duration: 2000,
          })
        }else{
        loading.findOpenid(app.globalData.openid, (res) => {
          if (res.status === "success") {
            wx.showToast({
              title:'登录成功',
              duration: 2000,
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../home/home',
              })
            }, 1000)
          } else {
            wx.showModal({
              title: '登陆失败',
              content: '未查询到相关用户信息,请先注册',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../register/register',
                  })
                }
              }
            })
          }
        })
        }
      }, 1000)
    }
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
  // register: function() {
  //   wx.navigateTo({
  //     url: '../register/register',
  //   })
  // }
})
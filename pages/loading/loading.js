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
    // openid:'oS-qe4t1XMcdf0xJswIvBfIJUeTw',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '/imgs/swiper/swiper-01.jpg',
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-03.jpg'
    ],
  },

  /**
   * 获取用户信息接口后的处理逻辑
   */
  // getUserInfo: function(e) {
  //   // 将获取的用户信息赋值给全局 userInfo 变量
  //   console.log(e)
  //   if (e.detail.userInfo) {
  //     app.globalData.userInfo = e.detail.userInfo
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  onShow: function () {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },

  login: function() {
   if(app.globalData.openid===null){
      wx.login({
        success: res => {
          this.setData({
            code: res.code
          })
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + app.globalData.appid + '&secret=' + app.globalData.secret + '&js_code=' + res.code + '&grant_type=authorization_code',
            success: res => {
              this.setData({
                openid: res.data.openid
              })
              app.globalData.openid = res.data.openid
              console.log(res.data.openid)
              this.setData({
                openid:res.data.openid
              })
            }
          })
        }
      })
    }
    else{
      this.setData({
        openid:app.globalData.openid
      })
    }
    wx.showLoading({
      title: '登陆中',
    })
    setTimeout(function () {
      wx.hideLoading()
      loading.findOpenid(app.globalData.openid, (res) => {
        console.log(app.globalData.openid)
        if (res.status === "success") {
          wx.showToast({
            title: '登陆成功',
            duration: 3000,
          })
          setTimeout(function () {
            wx.reLaunch({
              url: '../home/home',
            })
          }, 1000)
        } else {
          wx.showModal({
            title: this.data.content.failed,
            content: this.data.content.failedmess,
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
    }, 1000)
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
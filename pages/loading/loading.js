// pages/loading/loading.js
import { Config } from '../../utils/config.js';
import { Loading } from 'loading_model.js';
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
    this.setData({
      content: app.getLanuage(app.globalData.language),
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
    var _this = this
    // 将获取的用户信息赋值给全局 userInfo 变量
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo;
      wx.login({
        success: function (res) {
          //发送请求获取openid
          wx.request({
            url: 'https://smart.gantch.cn/api/v1/wechatPost/getOpenId', //接口地址
            data: { 
              JSCODE: res.code,
              },
            method:'POST',
            header: {
              'content-type': 'application/json' //默认值
            },
            success: function (res) {
          if (res.data == undefined || res.data == "" || res.data == null) {
          wx.showToast({
            title: '请求错误',
            icon: 'none',
            duration: 2000,
          })
        } else {
          app.globalData.openid = res.data,
            wx.showLoading({
              title: _this.data.content.loading,
            })
          setTimeout(function () {
            wx.hideLoading()
            loading.findOpenid(res.data, (res) => {
              if (res.status === "success") {
                app.globalData.customerId = res.data.id
                wx.showToast({
                  title: '登录成功',
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
          }, 1000)
        }
      },
            fail:function(err){
              wx.showToast({
                title: '请求错误',
                icon: 'none',
                duration: 2000,
              })
            }
          })
        }
      })
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
})
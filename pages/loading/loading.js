// pages/loading/loading.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 获取用户信息接口后的处理逻辑
   */
  getUserInfo: function (e) {
    // 将获取的用户信息赋值给全局 userInfo 变量，再跳回之前页
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.navigateBack()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    if (!this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
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
          }
        })
      }
    })

  }
})
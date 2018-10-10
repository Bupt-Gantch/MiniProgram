// pages/contact/contact.js
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },
})
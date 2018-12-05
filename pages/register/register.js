// pages/register/register.js
import { Config } from '../../utils/config.js';
var chinese = require("../../utils/Chinese.js");
var english = require("../../utils/English.js");
import { Register } from 'register_model.js';
var register = new Register();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 省市区三级联动初始化
    region: ["北京市", "北京市", "东城区"],
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

  onShareAppMessage: function (options) {
    var shar = {
      success: function (res) {
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
    }
    return shar;
  },

  getEmail:function(e){
    let that = this
    let email = e.detail.value // 获取输入框的数据
    that.setData({
      email
    })
  },

  getPhone:function(e){
    let that = this
    let phone = e.detail.value // 获取输入框的数据
    that.setData({
      phone
    })
  },

  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },

  register:function(e){
    this.setData({
      email:e.detail.value.email,
      phone:e.detail.value.phone,
      address: this.data.region[0] + this.data.region[1] + this.data.region[2]
    })
    var params = {
        data:{
        openid:app.globalData.openid,
        email:this.data.email,
        phone:this.data.phone,
        address:this.data.address
        }
    }
    console.log(params);
    register.register(params, (res) => {
      wx.showLoading({
        title:'请稍后',
      })
      setTimeout(function () {
        wx.hideLoading()
          if (res.status === "success") {
            app.globalData.customerId = res.data.id
            wx.showToast({
              title:'注册成功',
              duration: 3000,
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../index/index',
              })
            }, 1000)
          } else {
            wx.showModal({
              title: '注册失败',
              content: '请重新注册',
            })
          }
      }, 1000)
    })
  }
})
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
    wx.login({
      success: function (res) {
        //发送请求
        wx.request({
          url: '47.108.8.164:30000/api/v1/wechatPost/getOpenId',
          data: {
            JSCODE: res.code
          }
        })
      }
    })
    this.setData({
      netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language)
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
        netStatus: app.globalData.netStatus,
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
    console.log(e)
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
      netStatus: app.globalData.netStatus,
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
      console.log(res.data);
      wx.showLoading({
        title:'请稍后',
      })
      setTimeout(function () {
        wx.hideLoading()
          if (res.status === "success") {
            app.globalData.customerId = res.data.id
            app.globalData.phoneNumber = res.data.phone,
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
            if (res.resultMsg==="phone number already exist!"){
              wx.showModal({
                title: '注册失败',
                content: '手机号码已被注册',
              })
            } else if (res.resultMsg === "email already exist!") {
              wx.showModal({
                title: '注册失败',
                content: '邮箱已被注册',
              })
            } else if (res.resultMsg === "user has already existed!") {
              wx.showModal({
                title: '注册失败',
                content: '用户已存在',
              })
            }else{
              wx.showModal({
                title: '注册失败',
                content: '请重新注册',
              })
            }
          }
      }, 1000)
    })
  }
})
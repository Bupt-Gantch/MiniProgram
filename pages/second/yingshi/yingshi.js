// pages/second/yingshi/yingshi.js
const app = getApp()
import {
  YingShiRegister
} from 'yingshi_model.js';
var yingShiRegister = new YingShiRegister();
Page({
  data: {
    appKey: '',
    secret: ''
  },
  onLoad: function (options) {
    //判断用户是否已经提交appkey且有效
    //满足则跳转否则进行提交
    var param = {
      //"accountID": app.globalData.openid
      "customerId": app.globalData.customerId,
      "url": "camera/getToken"
    };
    yingShiRegister.getAccessToken(param, (res) =>{
      console.log(res);
      let resCode = res.status;
      let msgToken = res.msg;
      if (resCode == "200" && msgToken!=''){
        wx.redirectTo({
          url: '../cameralist/cameralist',
        })
      }
    })
  },
  // 获取输入账号 
  phoneInput: function (e) {
    this.setData({
      appKey: e.detail.value
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      secret: e.detail.value
    })
  },
  // 登录 
  login: function () {
    if (this.data.appKey.length == 0 || this.data.secret.length == 0) {
      wx.showToast({
        title: 'appKey和secret不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
        //判断有效性
        var param = {
          //"accountID": app.globalData.openid
          "customerId": app.globalData.customerId,
          "appKey": this.data.appKey, 
          "appSecret": this.data.secret,
          "url": "camera/register"
        };
        yingShiRegister.checkYingShiInfo(param, (res) => {
          console.log(res)
          let resCode = res.status;
          let msg = res.msg;
          if (resCode=="200"){
            wx.redirectTo({
              url: '../cameralist/cameralist',
            })
          }
          else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
    }
  }
})
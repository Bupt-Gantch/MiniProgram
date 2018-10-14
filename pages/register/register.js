// pages/register/register.js
import { Config } from '../../utils/config.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
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
    Config.debug = false;
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

  // 选择省市区函数
  changeRegin(e) {
    this.setData({ region: e.detail.value });
  },

  register:function(e){
    // console.log(e)
    // console.log(this.data.region[0]+this.data.region[1]+this.data.region[2])
    this.setData({
      email:e.detail.value.email,
      phone:e.detail.value.phone,
      address: this.data.region[0] + this.data.region[1] + this.data.region[2]
    })
    var params = {
        // openid:app.globalData.openid,
        url:'createUser',
        data:{
        openid:'oS-qe4t1XMcdf0xJswIvBfIJUeTw',
        email:this.data.email,
        phone:this.data.phone,
        address:this.data.address
        }
    }
    // console.log(params)
    register.register(params, (res) => {
      if(res.status==success){
        wx.showToast({
          title: '注册成功',
        })
      }
      console.log(res)
    })
  }
})
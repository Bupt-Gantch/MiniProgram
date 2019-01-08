// pages/second/hotel/hotel.js
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
      netStatus: app.globalData.netStatus
    });
  },

  //获取入住号
  getHomeNumber:function(e){
    let that = this
    let homeNumber = e.detail.value // 获取输入框的数据
    that.setData({
      homeNumber:homeNumber
    });
  },

  //获取手机号
  getPhone: function (e) {
    let that = this
    let phone = e.detail.value // 获取输入框的数据
    that.setData({
      phone: phone
    });
  },

  loginHotel:function(){
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var phone = this.data.phone;
    var homeNumber = this.data.homeNumber;
    if(phone == undefined){
      wx.showToast({
        title: '请输入您的入住号',
        icon:'none',
        duration:2500,
      })
    }else{
      wx.showToast({
        title: '请核实您的手机号和入住号',
        icon: 'none',
        duration: 2500,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
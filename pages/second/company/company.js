// pages/second/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: 0,
      latitude: 40.1275430000,
      longitude: 116.5661440000,
      iconPath: '/imgs/icon/marker.png',
      width: 22,
      height: 32
    }],
    latitude: 40.1275430000,
    longitude: 116.5661440000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // gotoGantch:function(){
    
  // }

  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
})
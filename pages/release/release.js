// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    place: '添加地点'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //*addnews.getNewMessage(openid,(res) => {
    // do something
    //})*/
  },

  /**
   * 添加图片
   */
  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  /**
   * 预览图片
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  /**
   * 添加地理位置信息
   */
  addPlace: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs94',
      success: function (res) {
        var locationString = res.longitude + "," + res.latitude;
        wx.request({
          url: 'https://restapi.amap.com/v3/geocode/regeo',
          data: {
            key: 'b2e307a6b1ddd403ff2da28dbde3578d',
            location: locationString,
            extensions: 'base',
            radius: '200',
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
            var newplace = res.data.regeocode.addressComponent.province+(res.data.regeocode.addressComponent.district)
            that.setData({
              place: newplace
            })
          }
        })
      },
      fail: function () {
        place: "定位失败"
      }
    })
  },
  /**
   * 发布内容
   */
  formSubmit: function (e) {
    var that = this
    wx.request({
      url: '',
      data: {
        content: e.detail.value,
        imageList: that.data.imageList,
        place: that.data.place
      },
      success: function (res) {
        wx.redirectTo({
          url: '/pages/publish/publish',
        })
      }
    })
  }
})
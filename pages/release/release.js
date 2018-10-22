// pages/release/release.js

import {
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
import {
  Release
} from 'release_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var release = new Release();
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
    this.setData({
      place: this.data.content.place,
      lastplace:""  
    })
  },

  onShow: function() {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },
  /**
   * 添加图片
   */
  chooseImg: function() {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  /**
   * 预览图片
   */
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  /**
   * 添加地理位置信息
   */
  addPlace: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var locationString = res.longitude + "," + res.latitude;
        var newplace = {
          data: {
            key: 'e4cce9c2f43a3988c945a6f0a948a2f7',
            location: locationString,
            extensions: 'base',
            radius: '200',
          }
        }
        release.addPlace(newplace, (res) => {
          if (res.status == 1) {
            var newplace = res.data.regeocode.addressComponent.province + res.data.regeocode.addressComponent.district
            that.setData({
              place: newplace,
              lastplace: newplace
            })
          } else {
            that.setData({
              place: that.data.content.wrong,
              lastplace: ""
            })
          }
        })
      },
      fail:function(res){
        console.log(res)
        that.setData({
          place: that.data.content.wrong,
          lastplace:""
        })
      }
    })
  },
  /**
   * 发布内容
   */

  formSubmit: function(e) {
    var imagePath = this.data.imageList[0]
    console.log(imagePath)
    if (imagePath==undefined){
      imagePath = ""
    }
    wx.uploadFile({
      url: Config.restUrl+'wechatPost/addPost',
      filePath: imagePath,
      name: 'image',
      formData: {
        openId: app.globalData.openid,
        nickName: app.globalData.userInfo.nickName,
        avatar: app.globalData.userInfo.avatarUrl,
        content: e.detail.value.textarea,
        location: this.data.lastplace,
      },
      success(res) {
          if (res.data == 1) {
            console.log(123)
            wx.showToast({
              title: '发布成功',
              duration: 3000,
            })
            setTimeout(function () {
              wx.reLaunch({
                url: '../publish/publish',
              })
            }, 1000)
          } else {
            wx.showToast({
              title: '发布失败',
              icon: 'none',
              duration:2000
            })
          }
      }
    })
  }
})
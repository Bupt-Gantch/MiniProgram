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
      place: this.data.content.place
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
        console.log(that.data.imageList)
        // var imagelist;
        // for (var i = 0; that.data.imageList.length;i++){
        //   imagelist+=that.data.imageList[i]
        //   imagelist+=','
        // }
        // console.log(imagelist)
        // that.setData({
        //   imageString:imagelist
        // })
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
      type: 'wgs94',
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
            var newplace = res.regeocode.addressComponent.province + res.regeocode.addressComponent.district
            that.setData({
              place: newplace,
              lastplace: newplace
            })
          } else {
            that.setData({
              place: that.data.wrong,
              lastplace:null
            })
          }
        })
      },
    })
  },
  /**
   * 发布内容
   */

  formSubmit: function(e) {
    console.log(app.globalData.userInfo)
    var formcontent = {
      openId: app.globalData.openid,
      nickName: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl,
      content: e.detail.value.textarea,
      image: this.data.imageList[0],
      location: this.data.lastplace,
    }
    release.addContent(formcontent, (res) => {
      if (res===1){
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
          icon:'none'
        })
      }
    })
  }
})
// pages/release/release.js

import { Config } from '../../utils/config.js';
var util = require('../../utils/util.js');
import { Release } from 'release_model.js';
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
    Config.debug = false;
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
    this.setData({
      place: this.data.content.place
    })
    //*addnews.getNewMessage(openid,(res) => {
    // do something
    //})*/
  },

  onShow: function () {
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
        if(res.status==1){
          var newplace = res.regeocode.addressComponent.province + res.regeocode.addressComponent.district
          that.setData({
            place: newplace
          })
        }else{
          that.setData({
            place: that.data.wrong
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
    var formcontent = {
        // openId:app.globalData.openid,
      openId:'oS-qe4t1XMcdf0xJswIvBfIJUeTw',
        nickName: app.globalData.userInfo.nickName,
        pAvator: app.globalData.userInfo.avatarUrl,
        pContent: e.detail.value.textarea,
        image: this.data.imageList[0],
        location: this.data.place,
    }
    console.log(formcontent)
    release.addContent(formcontent,(res)=>{
      console.log(res)
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
    })
  }
})
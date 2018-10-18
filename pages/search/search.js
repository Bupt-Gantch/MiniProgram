// pages/search/search.js
var API = require('../../utils/api.js')
import {
  Config
} from '../../utils/config.js';
import {
  Search
} from 'search_model.js';
var search = new Search();
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var app = getApp();
var page = 0;
var info = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infolist: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    info = [];
    var that = this
    var searchText = app.search
    var data = {
      searchText: searchText,
      page: 0
    }
    console.log(data)
    this._loadInfoList(data)
    this.setData({
      content: app.getLanuage(app.globalData.language),
      end: false
    })
  },

  onShow: function () {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList: function (data) {
    search.getSearch(data, (res) => {
      this.setData({
        infoList: res.data
      });
      if (this.data.infoList.length % 9 != 0 || this.data.infoList === 0) {
        page = page - 1
        for (var i = 0; i < this.data.infoList.length; i++)
          info.push(this.data.infoList[i])
        this.setData({
          infolist: info,
          end: true
        })
      }
    })
  },

  onPullDownRefresh: function () {
    info = [];
    if (!this.data.end) {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      var data = {
        page: 0,
        openId: app.globalData.openId,
      }
      this._loadInfoList(data);
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.end) {
      var param = {
        page: page + 1,
        openId: app.globalData.openId,
      }
      // 显示加载图标
      wx.showLoading({
        title: '加载中',
      })
      this._loadInfoList(param);
      // 隐藏加载框
      wx.hideLoading();
    }
  },

})
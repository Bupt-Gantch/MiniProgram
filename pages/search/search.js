// pages/search/search.js
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
    this.setData({
      searchText: searchText
    })
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

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList: function (data) {
    var _this = this
    var newinfoList = new Array();
    search.getSearch(data, (res) => {
      console.log(res.data);
      _this.setData({
        infoList: res.data
      });
      if (_this.data.infoList.length != undefined) {
        _this.data.infoList.forEach(function (element) {
          if (element.image != null) {
            if (element.image[0] == "[") {
              var newimage = element.image.substr(1, element.image.length - 2);
            } else {
              var newimage = element.image;
            }
            var arr = newimage.split(",");
            element.image = arr;
            element.nickName = search.matchPhoneNum(element.nickName);
            newinfoList.push(element)
          } else {
            element.nickName = search.matchPhoneNum(element.nickName);
            newinfoList.push(element)
          }
        });
      }
      _this.setData({
        infoList: newinfoList
      })
      if (_this.data.infoList.length % 9 != 0 || _this.data.infoList.length === 0) {
        page = page - 1
        this.setData({
          end: true
        })
      }
      for (var i = 0; i < _this.data.infoList.length; i++)
        info.push(_this.data.infoList[i])
      this.setData({
        infolist: info,
      })
    })
  },

  /**
* 点击图片查看
*/
  imageClick: function (e) {
    var src = e.currentTarget.dataset.src;
    var pictures = [];
    pictures.push(src)
    // var pictures = e.currentTarget.dataset.pictures.pictures;
    wx.previewImage({
      current: src,
      urls: src,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.end) {
      var param = {
        page: page + 1,
        searchText: this.data.searchText,
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
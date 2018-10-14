// pages/mypublish/mypublish.js
var API = require('../../utils/api.js')
import {
  Config
} from '../../utils/config.js';
import {
  myPublish
} from 'mypublish_model.js';
var mypublish = new myPublish();
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
  onLoad: function(options) {
    // Config.test = '1';
    Config.debug = false;
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
    // Config.debug = false;
    // oppenid = app.globalData.oppenid;
    // this._loadInfoList(oppenid);
    var data = {
      openId: 'test1',
      page: 0,
    }
    this._loadInfoList(data)
  },

  onShow: function () {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  },

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList: function(data) {
    mypublish.getMyPublish(data, (res) => {
      this.setData({
        infoList: res.data
      });
      // console.log(this.data.infoList)
      for (var i = 0; i < this.data.infoList.length; i++)
        info.push(this.data.infoList[i])
      this.setData({
        infolist: info
      })
    })
  },
  //删除信息
  delete: function(e) {
    // var id = e.currentTarget.dataset.userid;
    var that = this
    var params = {
      pId: e.currentTarget.dataset.userid,
      openId: 'test1',
    }
    wx.showModal({
      title: this.data.content.del,
      content:this.data.content.delmes,
      success: function(res) {
        if (res.confirm) {
          var index = e.currentTarget.dataset.index;
          var infolist = that.data.infolist;
          //移除列表中下标为index的项
          infolist.splice(index, 1);
          //更新列表的状态
          that.setData({
            infolist: infolist
          });
          mypublish.deleteInformation(params, (res) => {
            if (res.data === 1) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },

  onPullDownRefresh: function() {
    info = [];
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var data = {
      page: 0,
      openId: app.globalData.openId,
    }
    this._loadInfoList(data);
    // this.setData({
    //   infolist: this.data.infoList
    // })

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var data = {
      page: page + 1,
      openId: app.globalData.openId,
    }
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    this._loadInfoList(page);
    // for(var i=0;i<this.data.infoList.length;i++)
    // info[0].push(this.data.infoList[i])
    // this.setData({
    //   infolist: info[0]
    // })
    // 隐藏加载框
    wx.hideLoading();
  },

})
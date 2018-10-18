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
    info = []
    var data = {
      openId: app.globalData.oppenid,
      page: 0,
    }
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
  _loadInfoList: function(data) {
    mypublish.getMyPublish(data, (res) => {
      this.setData({
        infoList: res.data
      });
      console.log(this.data.infoList)
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
  //删除信息
  delete: function(e) {
    var that = this
    var params = {
      pId: e.currentTarget.dataset.infoid,
    }
    console.log(params)
    wx.showModal({
      title: this.data.content.del,
      content:this.data.content.delmes,
      success: function(res) {
        if (res.confirm) {
          mypublish.deleteInformation(params, (res) => {
            if (res==1) {
              var index = e.currentTarget.dataset.index;
              var newinfolist = that.data.infolist;
              //移除列表中下标为index的项
              newinfolist.splice(index, 1);
              //更新列表的状态
              that.setData({
                infolist: newinfolist
              });
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '操作失败',
                icon: 'none',
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
  onReachBottom: function() {
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
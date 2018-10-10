// pages/mynews/mynews.js
var API = require('../../utils/api.js')
import { Config } from '../../utils/config.js';
import { myNews } from 'mynews_model.js';
var mynews = new myNews();
var app = getApp();
var oppenid = '';
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
    Config.test = '1';
    oppenid = app.globalData.oppenid;
    this._loadInfoList(oppenid);
  },

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList: function (openid) {
    mynews.getMyNews(openid, (res) => {
      this.setData({
        infolist: res.data
      });
    })
  },
})
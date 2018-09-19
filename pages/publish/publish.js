// pages/publish/publish.js
var app = getApp();
var API = require('../../utils/api.js')
import { Config } from '../../utils/config.js';
import { Publish } from 'publish_model.js';
var publish = new Publish();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageup: '/imgs/icon/up.png',
    imgUrls: [
      '/imgs/swiper/swiper-01.jpg',
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-03.jpg'
    ],
    statusTable: {},
    commentTable: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    /**
     * 通过后台服务器获取数据
     */
    // var page = 1;
    // this._loadInfoList(page);
    // 使用 Mock
    var that = this
    API.ajax('', function (res) {
      //这里既可以获取模拟的res
      that.setData({
        infolist: res.data
      })
    })
  },

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList:function(page){
    publish.getInfoList(page,(data)=>{
      this.setData({
        infolist: data.data
      });
    })
  },

  /**
   * 跳转到发布信息页
   */
  addNews: function (e) {
    wx.navigateTo({
      url: '/pages/release/release'
    })
  },

  /**
   * 点击图片查看
   */
  imageClick: function (e) {
    var src = e.currentTarget.dataset.src;
    var userid = e.currentTarget.dataset.userid;
    console.log(userid);
    wx.previewImage({
      current: src,
      urls: [src],
    })
  },
  /**
   * 评论
   */
  clickComment: function (e) {
    var userid = e.currentTarget.dataset.userid;
    if (this.data.commentTable[userid] === undefined || this.data.commentTable[userid] === false) {
      this.data.commentTable[userid] = true;
    } else {
      this.data.commentTable[userid] = false;
    }
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
  },
  /**
   * 点赞
   */
  clickUp: function (e) {
    var userid = e.currentTarget.dataset.userid;
    if (this.data.statusTable[userid] === undefined || this.data.statusTable[userid] === false) {
      this.data.statusTable[userid] = true;
    } else {
      this.data.statusTable[userid] = false;
    }
    var newStatusTable = this.data.statusTable;
    this.setData({
      statusTable: newStatusTable
    })
  },
  /**
   * 发表评论
   */
  add: function (e) {
    var userid = e.currentTarget.dataset.userid;
    this.data.commentTable[userid] = false;
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
  },
  // onPullDownRefresh:function(){

  // }, 
  // 下拉刷新
  onReachTop: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://xxx',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://xxx/?page=' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

})
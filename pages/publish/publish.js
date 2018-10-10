// pages/publish/publish.js
import { Config } from '../../utils/config.js';
import { Publish } from 'publish_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var publish = new Publish();
var app = getApp();
var page = 0; 
var info  =[]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/imgs/swiper/swiper-01.jpg',
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-03.jpg'
    ],
    statusTable: {},
    commentTable: {},
    // infolist:[{
    //   pictures:[
    //     'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
    //     'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
    //     'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png'
    //   ]
    // }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    Config.test = '1';
    info = []
    /**
     * 通过后台服务器获取数据
     */
    page  = 0;
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
    this._loadInfoList(page);
    info.push(this.data.infoList)
    this.setData({
      infolist:info[0]
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
  _loadInfoList: function(page) {
    publish.getInfoList(page, (res) => {
      this.setData({
        infoList: res.data
      });
    })
  },

  /**
   * 跳转到发布信息页
   */
  addNews: function(e) {
    wx.navigateTo({
      url: '/pages/release/release'
    })
  },
  //搜索获取数据
  searchNews:function(e){
    this._loadInfoList(e.detail.value)
  },

  /**
   * 点击图片查看
   */
  imageClick: function(e) {
    var src = e.currentTarget.dataset.src;
    var pictures = e.currentTarget.dataset.pictures.pictures;
    var that = this
    console.log(pictures)
    wx.previewImage({
      current: src,
      urls: pictures,
    })
  },
  /**
   * 评论
   */
  clickComment: function(e) {
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
  clickUp: function(e) {
    var userid = e.currentTarget.dataset.userid;
    if (this.data.statusTable[userid] === undefined || this.data.statusTable[userid] === false) {
      this.data.statusTable[userid] = true;
      var addUp = {
        avatarUrl: app.globalData.userInfo.avatarUrl,
        id:userid,
        oppenid:'',
      };
      publish.addUp(addUp,(res)=>{

      })
    } else {
      this.data.statusTable[userid] = false;
      var deleteUp = {
        id:userid,
        oppenid:'',
      }
      publish.deleteUp(deleteUp,(res)=>{

      })
    }
    var newStatusTable = this.data.statusTable;
    this.setData({
      statusTable: newStatusTable
    })
  },
  /**
   * 发表评论
   */
  add: function(e) {
    var userid = e.currentTarget.dataset.userid;
    this.data.commentTable[userid] = false;
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
    var comment = {
      nickname:app.globalData.userInfo.nickName,
      detail:e.detail.value,
      id:userid,
      oppenid:'',
    }
    publish.addComment(comment,(res)=>{
      
    })
  },
  // 下拉刷新
  // onReachTop: function() {
  //   page = 1;
  //   // 显示顶部刷新图标
  //   wx.showNavigationBarLoading();
  //   // this._loadInfoList(page);
  //   // 使用 Mock获取假数据
  //   var that = this
  //   API.ajax('', function (res) {
  //     that.setData({
  //       infolist: res.data
  //     })
  //   })
  //   //隐藏导航栏加载框
  //   wx.hideNavigationBarLoading();
  //   // 停止下拉动作
  //   wx.stopPullDownRefresh();
  // },
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

    page = 1;
    this._loadInfoList(page);
    this.setData({
      infolist: this.data.infoList
    })

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    page = page + 1;
    // 显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    this._loadInfoList(page);
    for(var i=0;i<this.data.infoList.length;i++)
    info[0].push(this.data.infoList[i])
    this.setData({
      infolist: info[0]
    })
    // 隐藏加载框
    wx.hideLoading();
  },
})
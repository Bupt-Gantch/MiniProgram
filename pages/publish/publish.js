// pages/publish/publish.js
import {
  Config
} from '../../utils/config.js';
import {
  Publish
} from 'publish_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var publish = new Publish();
var app = getApp();
var page = 0;
var info = [];

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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    info = [];
    /**
     * 通过后台服务器获取数据
     */
    page = 0;
    this.setData({
      content: app.getLanuage(app.globalData.language),
      end: false
    })
    this._loadInfoList(page)
  },

  onShow: function() {
      this.setData({
        content: app.getLanuage(app.globalData.language),
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
      if (this.data.infoList.length%9!=0||this.data.infoList===0){
        page=page-1
        for (var i = 0; i < this.data.infoList.length;i++)
          info.push(this.data.infoList[i])
        this.setData({
          infolist: info,
          end:true
        })
      }
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
  searchNews: function(e) {
    app.search = e.detail.value
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 点击图片查看
   */
  imageClick: function(e) {
    var src = e.currentTarget.dataset.src;
    // var pictures = e.currentTarget.dataset.pictures.pictures;
    // wx.previewImage({
    //   current: src,
    //   urls: src,
    // })
  },
  /**
   * 评论
   */
  clickComment: function(e) {
    var infoid = e.currentTarget.dataset.infoid;
    var index = e.currentTarget.dataset.index;
    this.setData({
      infoid:infoid,
      index:index
    })
    if (this.data.commentTable[infoid] === undefined || this.data.commentTable[infoid] === false) {
      this.data.commentTable[infoid] = true;
    } else {
      this.data.commentTable[infoid] = false;
    }
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
  },
  /**
   * 点赞
   */
  clickUp: function(e){
    var infoid = e.currentTarget.dataset.infoid;
    if (this.data.statusTable[infoid] === undefined || this.data.statusTable[infoid] === false) {
      this.data.statusTable[infoid] = true;
      var addUp = {
        pId: infoid,
        num:1
      };
      publish.addUp(addUp, (res) => {
        if(res===1){
        var index = e.currentTarget.dataset.index;
        this.data.infolist[index].favoritenum++;
        var newinfolist = this.data.infolist
        this.setData({
          infolist: newinfolist
        })
        }else{
          wx.showToast({
            title: '操作失败',
            icon:'none',
            duration: 1500,
          })
        }
      })
    } else {
      this.data.statusTable[infoid] = false;
      var deleteUp = {
        pId: infoid,
        num:-1,
      }
      publish.addUp(deleteUp, (res) => {
        if (res===1) {
          var index = e.currentTarget.dataset.index;
          this.data.infolist[index].favoritenum--;
          var newinfolist = this.data.infolist
          this.setData({
            infolist: newinfolist
          })
        } else {
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 1500,
          })
        }
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
    var infoid = this.data.infoid;
    this.data.commentTable[infoid] = false;
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
    var comment = {
      nickName: app.globalData.userInfo.nickName,
      cContent: e.detail.value,
      pId: infoid,
    }
    publish.addComment(comment, (res) => {
      var index = this.data.index
      var ans = {
        nickName: comment.nickName,
        cContent:comment.cContent,
      }
      if(res===1){
        this.data.infolist[index].comments.push(ans)
        var newinfolist = this.data.infolist
        this.setData({
          infolist: newinfolist
        })
      }else{
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          duration: 1500,
        })
      }
    })
  },

  onPullDownRefresh: function() {
    info = [];
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

    page = 0;
    this._loadInfoList(page);

    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if(!this.data.end){
      page = page + 1;
      // 显示加载图标
      wx.showLoading({
        title: '加载中',
      })
      this._loadInfoList(page);
      // 隐藏加载框
      wx.hideLoading();
    }
  },
})
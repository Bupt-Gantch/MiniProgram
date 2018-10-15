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
var info = []

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
    // Config.test = '1';
    Config.debug = false;
    info = [];
    /**
     * 通过后台服务器获取数据
     */
    page = 0;
    this._loadInfoList(page)
    this.setData({
      content: app.getLanuage(app.globalData.language),
      end:false
    })
  },

  onShow: function() {
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
        infoList: res.data.data
      });
      if (this.data.infoList===0){
        page = page-1
        this.setData({
          end:true
        })
      }else{
        for (var i = 0; i < this.data.infoList.length; i++)
          info.push(this.data.infoList[i])
        this.setData({
          infolist: info
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
    this._loadInfoList(e.detail.value)
  },

  /**
   * 点击图片查看
   */
  imageClick: function(e) {
    var src = e.currentTarget.dataset.src;
    var pictures = e.currentTarget.dataset.pictures.pictures;
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
    var infoid = e.currentTarget.dataset.infoid;
    this.setData({
      infoid:infoid
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
      console.log(addUp)
      publish.addUp(addUp, (res) => {
        console.log(res)
        if(res.data==1){
        var index = e.currentTarget.dataset.index;
        this.data.infolist[index].favoritenum++;
        this.onShow;
          console.log(this.data.infolist[index])
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
      console.log(deleteUp)
      publish.addUp(deleteUp, (res) => {
        console.log(res)
        if (res.data == 1) {
          var index = e.currentTarget.dataset.index;
          this.data.infolist[index].favoritenum--;
          this.onShow;
          console.log(this.data.infolist[index])
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
    console.log(infoid)
    this.data.commentTable[infoid] = false;
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
    var comment = {
      // nickName: app.globalData.userInfo.nickName,
      nickName:'123',
      cContent: e.detail.value,
      pId: infoid,
    }
    console.log(comment)
    publish.addComment(comment, (res) => {
      if(res.data===1){

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
    if (!this.data.end) {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();

    page = 0;
    this._loadInfoList(page);
    // this.setData({
    //   infolist: this.data.infoList
    // })

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
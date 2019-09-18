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
      // '/imgs/swiper/swiper-03.jpg'
    ],
    statusTable: {},
    commentTable: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {},

  onShow: function() {
    info = [];
    /**
     * 通过后台服务器获取数据
     */
    page = 0;
    this.setData({
      netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language),
      end: false
    })
    this._loadInfoList(page)
  },

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList: function(page) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this
    var newinfoList = new Array();
    publish.getInfoList(page, (res) => {
      console.log(res.data);
      _this.setData({
        infoList: res.data
      });
      if (_this.data.infoList.length != undefined) {
        _this.data.infoList.forEach(function(element) {
          if (element.image != null) {
            if (element.image[0] == "[") {
              var newimage = element.image.substr(1, element.image.length - 2);
            } else {
              var newimage = element.image;
            }
            var arr = newimage.split(",");
            element.image = arr;
            element.nickName = publish.matchPhoneNum(element.nickName);
            newinfoList.push(element)
          } else {
            element.nickName = publish.matchPhoneNum(element.nickName);
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
   * 跳转到发布信息页
   */
  getUserInfo: function(e) {
    console.log(e.detail);
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.navigateTo({
        url: '/pages/release/release'
      })
    }
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var src = e.currentTarget.dataset.src;
    var pictures = e.currentTarget.dataset.pictures.image;
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var infoid = e.currentTarget.dataset.infoid;
    var index = e.currentTarget.dataset.index;
    this.setData({
      infoid: infoid,
      index: index
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
  clickUp: function(e) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var infoid = e.currentTarget.dataset.infoid;
    if (this.data.statusTable[infoid] === undefined || this.data.statusTable[infoid] === false) {
      this.data.statusTable[infoid] = true;
      var addUp = {
        pId: infoid,
        num: 1,
        nickName: app.globalData.userInfo.nickName,
        avator: app.globalData.userInfo.avatarUrl,
      };
      publish.addUp(addUp, (res) => {
        if (res === 1) {
          var index = e.currentTarget.dataset.index;
          this.data.infolist[index].favoritenum++;
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
    } else {
      this.data.statusTable[infoid] = false;
      var deleteUp = {
        pId: infoid,
        num: -1,
        nickName: app.globalData.userInfo.nickName,
        avator: app.globalData.userInfo.avatarUrl,
      }
      console.log(deleteUp);
      publish.addUp(deleteUp, (res) => {
        if (res === 1) {
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var infoid = this.data.infoid;
    this.data.commentTable[infoid] = false;
    var newcommentTable = this.data.commentTable;
    this.setData({
      commentTable: newcommentTable
    })
    var comment = {
      nickName: app.globalData.userInfo.nickName,
      avator: app.globalData.userInfo.avatarUrl,
      openid: app.globalData.openid,
      cContent: e.detail.value,
      pId: infoid,
    }
    console.log(comment);
    publish.addComment(comment, (res) => {
      console.log(res);
      var index = this.data.index
      var ans = {
        nickName: comment.nickName,
        cContent: comment.cContent,
      }
      if (res === 1) {
        this.data.infolist[index].comments.push(ans)
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
  },

  onPullDownRefresh: function() {
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    if (!this.data.end) {
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
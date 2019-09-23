// pages/mypublish/mypublish.js
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
      openId: app.globalData.openid,
      page: 0,
    }
    console.log(data);
    this._loadInfoList(data)
    this.setData({
        netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language),
      end: false
    })
  },

  onShow: function () {
    this.setData({
      content: app.getLanuage(app.globalData.language)
    });
  },

  /**
   * 获取信息列表/按页显示
   */
  _loadInfoList: function(data) {
    if (app.globalData.openid == null) {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 2000
      })
    } else {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this;
    var newinfoList = new Array();
    mypublish.getMyPublish(data, (res) => {
      console.log(res);
      this.setData({
        infoList: res.data
      });
      if (_this.data.infoList.length != undefined) {
        _this.data.infoList.forEach(function (element) {
          if (element.image != null) {
            if (element.image[0] == "[") {
              var newimage1 = element.image.substr(1, element.image.length - 2);
              var newimage = newimage1.replace(/\s*/g, "");
            } else {
              var newimage = element.image;
            }
            var arr = newimage.split(",");
            element.image = arr;
            newinfoList.push(element)
          } else {
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
    }
  },
  //删除信息
  delete: function(e) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var that = this
    var params = {
      pId: e.currentTarget.dataset.infoid,
    }
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

  /**
  * 点击图片查看
  */
  imageClick: function (e) {
    var src = e.currentTarget.dataset.src;
    var pictures = e.currentTarget.dataset.pictures.image;
    wx.previewImage({
      current: src,
      urls: pictures,
    })
  },
//下拉刷新
  onPullDownRefresh: function() {
    info = [];
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var data = {
      page: 0,
      openId: app.globalData.openid,
    }
    this._loadInfoList(data);
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.end) {
    var param = {
      page: page + 1,
      openId: app.globalData.openid,
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

  /**
 * 获取用户信息接口后的处理逻辑
 */
  getUserInfo: function (e) {
    var _this = this;
    _this.setData({
      netStatus: app.globalData.netStatus
    });
    // 将获取的用户信息赋值给全局 userInfo 变量
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.login({
        success: function (res) {
          wx.showLoading({
            title: '登录中',
          }),
            //发送请求获取openid
            wx.request({
              url: 'https://smart.gantch.cn/api/v1/wechatPost/getOpenId',
              data: {
                JSCODE: res.code,
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' //默认值
              },
              success: function (res) {
                // console.log("res:" + JSON.stringify(res))
                wx.hideLoading();
                var answer = res.data;
                if (answer == undefined || answer == "" || answer == null) {
                  wx.showToast({
                    title: '请求错误',
                    icon: 'none',
                    duration: 2000,
                  })
                } else {
                  app.globalData.openid = answer.openid,
                    app.globalData.unionid = answer.unionid,
                    my.findOpenid(answer.openid, (res) => {
                      if (res.status === "success") {
                        app.globalData.customerId = res.data.id;
                        app.globalData.phoneNumber = res.data.phone;
                        wx.reLaunch({
                          url: '../index/index',
                        })
                      } else {
                        wx.showModal({
                          title: '登录失败',
                          content: '未查询到相关用户信息,请先注册',
                          success: function (res) {
                            if (res.confirm) {
                              wx.navigateTo({
                                url: '../register/register',
                              })
                            }
                          }
                        })
                      }
                    })
                }
              },
              fail: function (err) {
                wx.hideLoading();
                wx.showToast({
                  title: '请求错误',
                  icon: 'none',
                  duration: 2000,
                })
              }
            })
        }
      })
    }
  },


})
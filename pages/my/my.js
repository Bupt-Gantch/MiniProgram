//my.js
//获取应用实例
import {
  Config
} from '../../utils/config.js';
import {
  My
} from 'my_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var my = new My();
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showEdit: false,
    showDevice: false,
    showGateway: false,
    showSharedDetail: false,
    content1: {
      title: "绑定设备",
      name: 'shareGateway'
    },
    content2: {
      title: '用户信息',
      placeholder: '被分享者手机号'
    },
    phoneNumber: '',
    content3: {
      title: "解绑网关",
      name: 'unBindGateway',
      value: 'share'
    },
    content4: {
      title: "取消分享",
      name: 'unGatewaySelector',
    },
  },
  //首次加载
  onLoad: function() {
    this.setData({
      content: app.getLanuage(app.globalData.language),
      gatewayName: app.globalData.gatewayName,
      customerId: app.globalData.customerId
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function() {
    this.setData({
      content: app.getLanuage(app.globalData.language),
      gatewayName: app.globalData.gatewayName
    })
  },
  //获取用户信息
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  myPublish: function(e) {
    wx.navigateTo({
      url: '/pages/mypublish/mypublish',
    })
  },

  myNews: function(e) {
    wx.navigateTo({
      url: '/pages/mynews/mynews',
    })
  },

  onContactTap: function(event) {
    wx.navigateTo({
      url: '../contact/contact',
    });
  },

  //扫码添加网关
  onScan: function() {
    wx.scanCode({
      success: function(res) {
        if (res.result != null) {
          var gateway = res.result;
          if (gateway.length == 26 || gateway.length == 27) {
            var gateway_user = "Gateway_";
            var i = 13;
            while (gateway[i] != 'p') {
              gateway_user += gateway[i],
                i++
            }
            var param = {
              customerId: app.globalData.customerId,
              gateway_user: gateway_user
            };
            my.addDevice(param, (res) => {
              if (res.data == 1) {
                wx.showToast({
                  title: '添加成功',
                  duration: 3000,
                })
              } else {
                wx.showModal({
                  title: '添加失败',
                  content: '该设备已被其他用户添加，请联系管理员。',
                  success: function(res) {
                    if (res.confirm) {
                      wx.makePhoneCall({
                        phoneNumber: '13837468256'
                      })
                    }
                  }
                })
              }
            })
          } else {
            wx.showToast({
              title: '无效的二维码',
              icon: 'none',
              duration: 2000,
            })
          }
        } else {
          wx.showToast({
            title: '无效的二维码',
            icon: 'none',
            duration: 2000,
          })
        }
      }
    })
  },
  /**
   * 设备入网
   */
  refreshGateway: function() {
    var gatewayName = app.globalData.gatewayName;
    var param = {
      customerId: app.globalData.customerId,
      gateway_user: gatewayName
    };
    my.refresh(gatewayName, (res) => {
      if (res == 'success') {
        wx.showLoading({
          title: '请您耐心等待',
          mask: true
        })
        setTimeout(function() {
          my.addDevice(param, (res) => {
            wx.hideLoading();
            if (res.data == 1) {
              wx.showToast({
                title: '设备入网成功',
                duration: 2000,
              })
            } else {
              wx.showToast({
                title: '设备入网失败，请稍后重试',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }, 60000)
      } else if (res == 'fail') {
        wx.showToast({
          title: '设备入网失败，请稍后重试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 删除网关
   *  */
  deleteGateway: function() {
    var _this = this
    var gatewayList = new Array();
    var customerId = app.globalData.customerId;
    var param = {
      customerid: customerId
    };
    my.getSharedGateway(param, (res) => {
      if (res.status === "success") {
        var gatewayFirst = res.data;
        gatewayFirst.forEach(function(e, index) {
          var gatewayData = e.split(",")
          if (gatewayData.length != 0) {
            gatewayData.forEach(function(element) {
              if (element != "") {
                my.getDeviceById(element, (res) => {
                  if (res.id != undefined) {
                    gatewayList.push(res);
                  };
                  _this.setData({
                    gatewayArray: gatewayList
                  });
                })
              }
            })
          };
          if (gatewayFirst.length - 1 == index) {
            my.getAllDevices(customerId, (res) => {
              res.data.forEach(function (element) {
                if (element.deviceType === "Gateway") {
                  gatewayList.push(element)
                }
              });
              _this.setData({
                gatewayArray: gatewayList
              });
              if (gatewayList.length == 0) {
                _this.setData({
                  showGateway: false,
                });
                wx.showToast({
                  title: '您还没有绑定任何网关',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                _this.setData({
                  showGateway: true,
                });
              }
            })
          }
        })
      }else{
        my.getAllDevices(customerId, (res) => {
          res.data.forEach(function (element) {
            if (element.deviceType === "Gateway") {
              gatewayList.push(element)
            }
          });
          _this.setData({
            gatewayArray: gatewayList
          });
          if (gatewayList.length == 0) {
            _this.setData({
              showGateway: false,
            });
            wx.showToast({
              title: '您还没有绑定任何网关',
              icon: 'none',
              duration: 2000
            })
          } else {
            _this.setData({
              showGateway: true,
            });
          }
        })
      }
    })
  },

  /**
   * 主动解绑网关
   */
  unBindGateway: function(e) {
    var _this = this;
    var unbindGateway = e.detail.value.gateway;
    if (unbindGateway.length == 0) {
      wx.showToast({
        title: '您还没有选择网关',
        icon: 'none'
      })
    } else {
      var gatewayArr = unbindGateway.split(",");
      var gatewayid = gatewayArr[0];
      var customerId = Number(gatewayArr[1]);
      var gatewayname = gatewayArr[2];
      if (customerId === app.globalData.customerId) {
        var param = {
          customerId: app.globalData.customerId,
          gatewayName: gatewayname
        }
        my.deleteGateway(param, (res) => {
          console.log(res);
          if (res == 1) {
            var params = {
              customerid: app.globalData.customerId,
              gateid: gatewayid,
            };
            my.onUnShareAll(params, (res) => {
              console.log(res);
              if (res.status == "success") {
                wx.showToast({
                  title: '解绑成功',
                });
                var customerId = app.globalData.customerId;
                _this.deleteGateway(customerId);
              }
            });
          } else {
            wx.showToast({
              title: '解绑失败',
              icon: 'none',
              duration: 1000
            });
          }
        })
      } else {
        var param = {
          customerid: app.globalData.customerId,
          gateids: gatewayid
        };
        console.log(param);
        my.onGuestUnShare(param, (res) => {
          if (res.status == "success") {
            var customerId = app.globalData.customerId;
            _this.deleteGateway(customerId);
          } else {
            wx.showToast({
              title: '解绑失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    }
  },

  /**
   * 分享网关
   */
  onShare: function() {
    var _this = this
    var gatewayList = new Array();
    var customerId = app.globalData.customerId
    my.getAllDevices(customerId, (res) => {
      res.data.forEach(function(element) {
        if (element.deviceType === "Gateway") {
          gatewayList.push(element);
        }
      });
      if (gatewayList.length == 0) {
        wx.showToast({
          title: '您还没有绑定任何网关',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          gatewayList: gatewayList,
          showEdit: true
        })
      }
    })
  },

  /**
   * 分享网关
   */
  shareGateway: function(e) {
    this.hideModal();
    var gatewayArrs = e.detail.value.gateway;
    console.log(e.detail);
    console.log(gatewayArrs);
    if (gatewayArrs.length == 0) {
      wx.showToast({
        title: '请选择网关',
        icon: 'none',
        duration: 1000
      })
    } else {
      var gatewayArr = gatewayArrs.join(",");
      var param = {
        phone: this.data.phoneNumber,
        customerid: app.globalData.customerId,
        gateids: gatewayArr
      }
      console.log(param);
      my.shareGateway(param, (res) => {
        if (res.status == 'success') {
          wx.showToast({
            title: '分享成功',
          })
        } else {
          wx.showToast({
            title: '分享失败',
            icon: 'none',
            duration: 1000
          })
        }
      });
    }
  },

  onUnShare: function() {
    var _this = this;
    var param = {
      customerid: app.globalData.customerId
    };
    var gates = Array();
    my.getShareGateway(param, (res) => {
      var shareList = res.data;
      if (shareList.length == 0) {
        this.hideModal();
        wx.showToast({
          title: '您还没有分享过网关',
          icon: 'none'
        })
      } else {
        shareList.forEach(function(element) {
          var gatewayFirst = element.gates;
          var gatewayData = gatewayFirst.split(",")
          if (gatewayData.length != 0) {
            gatewayData.forEach(function(e) {
              if (e != "") {
                my.getDeviceById(e, (res) => {
                  if (res.id != undefined) {
                    res.phone = element.phone;
                    gates.push(res);
                    _this.setData({
                      sharedDetail: gates
                    });
                  }
                })
              }
            })
          };
        });
        console.log(gates);
        this.setData({
          showSharedDetail: true,
        });
      }
    })
  },

  unGatewaySelector: function(event) {
    var deleteGateway = event.detail.value.gateway;
    var gatewayDetail = deleteGateway.split(",");
    var param = {
      customerid: app.globalData.customerId,
      gateids: gatewayDetail[0],
      phone: gatewayDetail[1],
    };
    console.log(param);
    my.onOwnerUnShare(param, (res) => {
      console.log(res);
      if (res.status == "success") {
        this.onUnShare();
      } else {
        wx.showToast({
          title: '解绑失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showEdit: false,
      showDevice: false,
      showGateway: false,
      showSharedDetail: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   *输入手机号对话框确认按钮点击事件
   */
  onEditConfirm: function() {
    var phoneNumber = this.data.phoneNumber.trim();
    if (phoneNumber === "") {
      wx.showToast({
        title: '电话号码不能为空',
        icon: 'none'
      })
    } else if (!my.validatePhone(phoneNumber)) {
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: 'none'
      })
    } else {
      this.hideModal();
      this.setData({
        showDevice: true
      })
    }
  },
  cancel: function() {
    this.hideModal();
  },

  inputChange: function(event) {
    var inputValue = event.detail.value;
    this.data.phoneNumber = inputValue;
  },

  changeLanuage: function() {
    var version = app.globalData.language;
    if (version == "中文") {
      app.globalData.language = "English"
    } else {
      app.globalData.language = "中文"
    }
    this.setData({
      content: app.getLanuage(app.globalData.language)
    })
  }
})
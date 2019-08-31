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
    showAddGateway: false,
    showDevice: false,
    showGateway: false,
    showSharedDetail: false,
    content1: {
      title: "绑定设备",
      name: 'shareGateway'
    },
    content2: {
      title: '用户信息',
      placeholder1: '用户手机号',
      placeholder2: '用户备注信息'
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
    content5: {
      title: '网关信息',
      placeholder1: '网关号',
      placeholder2: '云平台密码'
    },
    gatewayAddName: '',
    gatewayPassword: '',
  },
  //首次加载
  onLoad: function() {
    var password = app.globalData.phoneNumber.substring(3, 7);
    this.setData({
      netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language),
      gatewayName: app.globalData.gatewayName,
      customerId: app.globalData.customerId,
      userphoneNumber: app.globalData.phoneNumber,
      userPassword: password + app.globalData.customerId
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
      netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language),
      gatewayName: app.globalData.gatewayName
    })
  },
  //获取用户信息
  getUserInfo: function(e) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
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

  onMyFamily:function() {
    var customerId = app.globalData.customerId;
    var gatewayList = new Array();
    my.getAllDevices(customerId, (res) => {
      res.data.forEach(function (element) {
        if (element.deviceType === "Gateway") {
          gatewayList.push(element)
        }
      });
      if (gatewayList.length == 0) {
        wx.showToast({
          title: '您还没有绑定任何网关',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.navigateTo({
          url: '../family/family',
        })
      }
    })
  },

  onScan: function() {
    var _this = this;
    wx.showActionSheet({
      // itemList: ['扫一扫', '手动绑定'],
      itemList: this.data.content.bindGateway,
      success(res) {
        console.log(res.tapIndex);
        var number = res.tapIndex;
        if (number == 0) {
          _this.onScanTest();
        } else if (number == 1) {
          _this.setData({
            showAddGateway: true,
          });
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  //扫码添加网关
  onScanTest: function() {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    wx.scanCode({
      success: function(res) {
        if (res.result != null) {
          var gateway = res.result;
          var first = gateway.indexOf("GT");
          var second = gateway.indexOf("pass");
          console.log(first);
          console.log(second);
          var answer = gateway.substring(first + 2, second);
          // answer += " ";
          console.log(answer);
          if (first != -1 && second != -1) {
            var gateway_user = "Gateway_";
            gateway_user += answer;
            var param = {
              customerId: app.globalData.customerId,
              gateway_user: gateway_user
            };
            console.log(param);
            my.addDevice(param, (res) => {
              console.log(res);
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
                        phoneNumber: '18610873103'
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var gatewayName = app.globalData.gatewayName;
    var param = {
      customerId: app.globalData.gatewayCustomerId,
      gateway_user: gatewayName
    };
    //待完善
    my.refresh(gatewayName, (res) => {
      if (res == 'success') {
        wx.showToast({
          title: '设备入网中',
          icon: 'none',
          duration: 2000,
        })
        setTimeout(function() {
          my.addDevice(param, (res) => {
            console.log(res);
            if (res.data == 1) {
              wx.showToast({
                title: '设备入网成功',
                duration: 2000,
              })
            } else {
              wx.showToast({
                title: '设备入网成功',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }, 60000)
      } else {
        wx.showToast({
          title: '设备入网失败，请检查网关网络状况',
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this
    var gatewayList = new Array();
    var customerId = app.globalData.customerId;
    var param = {
      customerid: customerId
    };
    my.getSharedGateway(param, (res) => {
      if (res.status === "success") {
        var gatewayFirst = res.data;
        console.log(gatewayFirst);
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
              res.data.forEach(function(element) {
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
      } else {
        my.getAllDevices(customerId, (res) => {
          res.data.forEach(function(element) {
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

  onDeleteRule: function() {
    var ruleId = this.data.ruleId;
    rule.deleteRule(ruleId, (res) => {
      console.log(res);
      if (res === "OK") {
        wx.showToast({
          title: '删除成功',
          duration: 1000
        });
        wx.navigateBack({

        })
      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
        })
      }
    })
  },

  /**
   * 主动解绑网关
   */
  unBindGateway: function(e) {
    console.log(12312131);
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
          customerid: app.globalData.customerId,
          gateids: gatewayid,
          gatewayName: gatewayname
        }
        wx.showActionSheet({
          itemList: _this.data.content.unBindGateway,
          success(res) {
            console.log(res.tapIndex);
            var number = res.tapIndex;
            if (number == 0) {
              my.deleteGateway(param, (res) => {
                console.log(res);
                if (res == 1) {
                  app.globalData.gatewayCustomerId = null;
                  app.globalData.getewayId = null;
                  app.globalData.gatewayName = null;
                  app.globalData.status = null;
                  var params = {
                    customerid: app.globalData.customerId,
                    gateid: gatewayid,
                  };
                  my.onUnShareAll(params, (res) => {
                    wx.showToast({
                      title: '解绑成功',
                    }); 
                    var customerId = app.globalData.customerId;
                    _this.deleteGateway(customerId);
                  });
                } else {
                  wx.showToast({
                    title: '解绑失败',
                    icon: 'none',
                    duration: 1000
                  });
                }
              })
            } else if (number == 1) {
              my.deleteGateway(param, (res) => {
                console.log(res);
                if (res == 1) {
                  app.globalData.gatewayCustomerId = null;
                  app.globalData.getewayId = null;
                  app.globalData.gatewayName = null;
                  app.globalData.status = null;
                  var params = {
                    customerid: app.globalData.customerId,
                    gateid: gatewayid,
                  };
                  my.deepDeleteGateway(params, (res) => {
                    wx.showToast({
                      title: '解绑成功',
                    });
                    var customerId = app.globalData.customerId;
                    _this.deleteGateway(customerId);
                  });
                } else {
                  wx.showToast({
                    title: '解绑失败',
                    icon: 'none',
                    duration: 1000
                  });
                }
              })
            }
          },
          fail(res) {
            console.log(res.errMsg)
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

            app.globalData.gatewayCustomerId = null;
            app.globalData.getewayId = null;
            app.globalData.gatewayName = null;
            app.globalData.status = null;
            wx.showToast({
              title: '解绑成功',
            });
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
          showDevice: true
        })
      }
    })
  },

  /**
   * 分享网关
   */
  shareGateway: function(e) {
    this.setData({
      netStatus: app.globalData.netStatus
    });
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
      this.hideModal();
      var gatewayArr = gatewayArrs.join(",");
      this.setData({
        gateids: gatewayArr,
        showEdit: true
      })
    }
  },

  onUnShare: function() {
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var _this = this;
    var param = {
      customerid: app.globalData.customerId
    };
    var gates = Array();
    my.getShareGateway(param, (res) => {
      var shareList = res.data;
      console.log(shareList);
      if (shareList == null || shareList.length == 0) {
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
                    res.remark = element.remark;
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
    this.setData({
      netStatus: app.globalData.netStatus
    });
    var deleteGateway = event.detail.value.gateway;
    var gatewayDetail = deleteGateway.split(",");
    var param = {
      customerid: app.globalData.customerId,
      gateids: gatewayDetail[0],
      phone: gatewayDetail[1],
    };
    console.log(param);//13511080938
    console.log(123);
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
      showAddGateway: false,
      showDevice: false,
      showGateway: false,
      showSharedDetail: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   *输入手机号、备注信息对话框确认按钮点击事件
   */
  onEditConfirm: function() {
    var _this = this;
    _this.setData({
      netStatus: app.globalData.netStatus
    });
    if (_this.data.showEdit) {
      _this.onShareGateway();
    } else if (_this.data.showAddGateway) {
      _this.onAddGateway();
    }

  },

  onAddGateway: function() {
    var gatewayAddName = this.data.gatewayAddName;
    var gatewayPassword = this.data.gatewayPassword;
    if (gatewayAddName === "" || gatewayPassword === "") {
      wx.showToast({
        title: '网关号和云平台密码不能为空',
        icon: 'none'
      })
    } else {
      var param = {
        customerId: app.globalData.customerId,
        gateway_user: "Gateway_" + gatewayAddName
      };
      console.log(param);
      my.addDevice(param, (res) => {
        if (res.data == 1) {
          this.hideModal();
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
                  phoneNumber: '18610873103'
                })
              }
            }
          })
        }
      })
    }
  },

  onShareGateway: function() {
    var phoneNumber = this.data.phoneNumber.trim();
    var information = this.data.information;
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
      var param = {
        phone: this.data.phoneNumber,
        remark: information,
        customerid: app.globalData.customerId,
        gateids: this.data.gateids
      }
      console.log(param);
      my.shareGateway(param, (res) => {
        console.log(res);
        if (res.status == 'success') {
          this.hideModal();
          wx.showToast({
            title: '分享成功',
          })
        } else {
          wx.showToast({
            title: res.resultMsg,
            icon: 'none',
            duration: 1000
          })
        }
      });
    }
  },

  cancel: function() {
    this.hideModal();
  },

  inputChange: function(event) {
    var inputValue = event.detail.value;
    if (this.data.showAddGateway) {
      this.data.gatewayAddName = inputValue;
    } else if (this.data.showEdit) {
      this.data.phoneNumber = inputValue;
    }
  },
  informationChange: function(event) {
    var inputValue = event.detail.value;
    if (this.data.showAddGateway) {
      this.data.gatewayPassword = inputValue;
    } else if (this.data.showEdit) {
      this.data.information = inputValue;
    }
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
//app.js
var chinese = require("/utils/Chinese.js")
var english = require("/utils/English.js")
App({
  onLaunch: function () {
    var _this = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    // 监测网络状态
    var cleanId = setInterval(
      function(){
        wx.getNetworkType({
          success: function(res) {
            var netWorkType = res.networkType;
            if(netWorkType === 'none'){
              _this.globalData.netStatus = false;
            }else{
              _this.globalData.netStatus = true;
            }
          },
        })
      },1000)
    // clearInterval
  },
  // onHide:function(){
  //   clearInterval(cleanId);
  // },
  //改变语言
  getLanuage: function (lastLanuage) {
    if (lastLanuage == "中文") {
      return chinese.Content
    } else {
      return english.Content
    }
  },
//下载图片
  dowloadimage:function (url) {
      wx.downloadFile({
        url:url,
        success:function(res){
          console.log(res.tempFilePath)
          return res.tempFilePath
        }
      })
  },

  onShareAppMessage: function (res) {
    return {
      title: '冠川智能',
      path: '/pages/loading/loading',
      success: function () { },
      fail: function () { }
    }
  },

  globalData: {
    language:"中文",
    userInfo: null,
    customerId:null,
    gatewayCustomerId:null,
    openid: null,
    unionid:null,
    code:null,
    getwayId:null,
    gatewayName:null,
    gatewayId:null,
    netStatus:true,
    phoneNumber:null,
  },
})
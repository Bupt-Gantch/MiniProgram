//app.js全局入口 app.json全局配置 app.wxss全局样式
//Chinese.js English.js 用到的常量
//base.js http封装
//config.js
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

  compare: function () {
    return function (a, b) {
      if (a["nickname"] != null && b["nickname"] != null)
        return a["nickname"].localeCompare(b["nickname"]);
      else {
        return a["name"].localeCompare(b["name"]);
      }
    }
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
    openid: null,
    unionid: null,
    code: null,
    gatewayCustomerId:null,
    gatewayStatus:null,
    gatewayName: null,
    gatewayId: null,
    netStatus:true,
    phoneNumber:null,
    
    airPower:"关机",
    airModel:"制冷",
    airWindDir:"自动",
    airWindLev:"自动",
    airTem:26,


    tvPower:"关机"
  },
})
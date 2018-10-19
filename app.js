//app.js
var chinese = require("/utils/Chinese.js")
var english = require("/utils/English.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
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

  globalData: {
    language:"中文",
    userInfo: null,
    customerId: 1,
    openid:null,
    code:null,
    appid:'wx5ef2de2111a9a82a',
    secret:'e3658cc08939eb93cf45238c536ec1e6',
    customerid:null
  },
})
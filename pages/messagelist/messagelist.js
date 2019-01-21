// pages/messagelist/messagelist.js
import {
  Config
} from '../../utils/config.js';
import {
  Message
} from 'messagelist_model.js';
var message = new Message();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var openid = app.globalData.openid;
    this.setData({
      openid: openid
    });
    this._loadAllTips(openid);
    // this._loadUnreadTips(openid);
    // this.readTips(openid);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //获取用户信息
  _loadAllTips:function(openid){
    message.getAllTips(openid,(res)=>{
      res.forEach(function (e) {
        if (e.image != null) {
          var question = e.image.substring(1, e.image.length - 1);
          var answer = question.split(",");
          e.image = answer[0]
        }
      })
      console.log(res);
      this.setData({
        tips: res
      })
    })
  },

  _loadUnreadTips:function(openid){
    message.getUnreadTips(openid,(res)=>{
      res.forEach(function(e){
        if(e.image!=null){
          var question = e.image.substring(1,e.image.length-1);
            var answer = question.split(",");
            e.image = answer[0]
        }
      })
      console.log(res);
      this.setData({
        tips: res
      })
    })
  },

  readTips:function(openid){
    var param = {
      openid:openid
    };
    message.readTips(openid,(res)=>{
      console.log(res);
    })
  },

//获取详细信息
  getDetail(e){
    console.log(e);
    var pId = message.getDataSet(e,'pid');
    console.log(pId);
  },

//下拉刷新
  onPullDownRefresh:function(){
    var openid = app.globalData.openid;
    this._loadAllTips(openid);
    wx.stopPullDownRefresh();
  }
  
})
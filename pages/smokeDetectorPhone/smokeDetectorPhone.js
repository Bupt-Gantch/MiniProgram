// pages/smokeDetectorPhone/smokeDetectorPhone.js
const app = getApp()
import {
  Config
} from '../../utils/config.js';
import {
  SmokeBindInfo
} from 'smokeDetectorPhone_model.js';
var smokeBindInfo = new SmokeBindInfo();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    deviceId:'',
    netStatus: app.globalData.netStatus,
    infolist:[],
    hiddenAddBindPhone: true,
    bindPhone:'这里输入手机号',
    getAddBindPhoneFocus:false,
    active: false,
  },
  //删除手机号
  del(e) {
    wx.showModal({
      title: '提示',
      content: '确认要删除此手机号么？',
      success: (res) => {
        if (res.confirm) {
          console.log(this.data.infolist[e.currentTarget.dataset.index])
          var param = {
            "url": "nbiotDeviceaccess/deleteDeviceMessagePhoneNumber/" + this.data.deviceId + "/" + this.data.infolist[e.currentTarget.dataset.index]
          };
          smokeBindInfo.delSmokeBindInfo(param, (res) => {
            console.log(res);
            if(res=='success'){
              this.data.infolist.splice(e.currentTarget.dataset.index, 1)
              this.setData({
                infolist: this.data.infolist
              })
              wx.showToast({
                title: '已删除',
                icon: 'none',
                duration: 2000
              })
            }
            else{
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {
          console.log('已取消')
        }
      }
    })
  },
  //添加手机号
  add(e) {
    this.setData({
      hiddenAddBindPhone: false,
      getAddBindPhoneFocus:true
    })
  },
  cancelAddBindPhone:function(e){
    this.setData({
      hiddenAddBindPhone: true,
      getAddBindPhoneFocus: false
    })
  },
  confirmAddBindPhone:function(e){
    if (this.data.bindPhone.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      var param = {
        "deviceId": this.data.deviceId,
        "phoneNumber": this.data.bindPhone,
        "url": "nbiotDeviceaccess/addDeviceMessagePhoneNumber"
      };
      smokeBindInfo.addSmokeBindInfo(param, (res) => {
        console.log(res);
        if(res=='success'){
          this.data.infolist.push(this.data.bindPhone)
          this.setData({
            hiddenAddBindPhone: true,
            getAddBindPhoneFocus: false,
            infolist: this.data.infolist,
            bindPhone: '这里输入手机号'
          })
        }
        else{
          wx.showToast({
            title: '添加失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  setPhone:function(e){
    this.setData({
      bindPhone: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      deviceId:options.deviceId
    })
    //获取列表
    var param = {
      "url": 'nbiotDeviceaccess/getAllDeviceMessagePhoneNumbers/' + options.deviceId
    };
    smokeBindInfo.getSmokeBindInfo(param, (res) => {
      console.log(res);
      this.setData({
        infolist:res
      })
    })
  },
})
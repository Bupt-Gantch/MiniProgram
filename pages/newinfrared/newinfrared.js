// pages/newinfrared/newinfrared.js
import {
  NewInfrared
} from 'newinfrared_model.js';
import {
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
var newinfrared = new NewInfrared();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonInfrared: Config.buttonInfrared,
    infraredImg: Config.infraredImg,
    addNewLearn: false,
    newButtonName: '',
    content: {
      title: "自定义学习",
      placeholder: "请输入按键名称",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var _this = this;
    // var id = options.id;
    // var deviceInfo = JSON.parse(options.deviceInfo);
    // var learnName = options.learnName;
    // var panelId = options.panelId;
    this.setData({
      // deviceInfo: deviceInfo,
      // deviceId: deviceInfo.id,
      // id: id,
      // learnName:learnName,
      // panelId:panelId,
      deviceInfo: "deviceInfo",
      deviceId: "deviceInfo.id",
      id: "id",
      learnName: "learnName",
      panelId: "panelId",
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onOwnLearn:function() {
    // this.hideModal();
    this.setData({
      addNewLearn:true
    })
    var panelId = this.data.panelId;
    var param = {
      name: this.data.newButtonName,
      panelId: panelId
    }
  },

    /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      addNewLearn: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },

  inputNewLearnNameChange: function (event) {
    var inputValue = event.detail.value;
    this.data.newButtonName = inputValue;
  },

  onNewLearnConfirm:function() {
    this.hideModal();
    console.log(this.data.newButtonName);
  }

})
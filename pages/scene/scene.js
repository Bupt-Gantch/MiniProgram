// pages/scene/scene.js

import { Config } from '../../utils/config.js';
import { Scene } from 'scene_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var scene = new Scene();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sceneGroup:['分组','场景'],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this._loadAllDevice();
    var name = this.data.sceneGroup[0]; 
    this._loadBaannerTitle(name);
  },

  onTabAddGroup: function (event){

  },

  /*加载本地banner和title */
  _loadBaannerTitle: function (name) {

    this.setData({
      bannerTitle: name
    });
  },

  onTabCategory: function (event) {
    var index = Number(scene.getDataSet(event, 'index'));  //number化
    var id = Number(index);    //此ID为临时ID，要根据真实DB改
    var name = scene.getDataSet(event, 'name');
    this.setData({
      currentTabsIndex: index
    });
    this._loadBaannerTitle(name);   //加载本地banner和标题
    //this._loadCateDevices(id, index);  //点击时获取数据

  },


  
})
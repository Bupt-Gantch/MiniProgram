// pages/category/category.js

import { Config } from '../../utils/config.js';
import {Category} from 'category_model.js';
var category = new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5','tanslate6'],
    baseImageUrl: Config.imagesUrl,
    categoryName: Config.categoryName,
    bannerImageUrl: Config.bannerImageUrl,
    categoryBannerUrl: '../../imgs/banner/cateBanner.png',
    statusTable: {}
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = -1;   //从tab栏跳转过来
    var id = Number(options.index)+Number(2);    
    var name = this.data.categoryName[0]; //从tab栏跳转过来
    
    this.setData({
      currentTabsIndex:index,

    });
    this._loadBaannerTitle(name);
    this._loadCateDevices(id,index);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

/*加载本地banner和title */
  _loadBaannerTitle:function(name){
    
      this.setData({
          bannerTitle:name
      });
  },

  onTabCategory: function(event){
    var index = Number(category.getDataSet(event,'index'));  //number化
    var id = Number(index);    //此ID为临时ID，要根据真实DB改
    var name = category.getDataSet(event, 'name');
    var url = this.data.categoryBannerUrl;
    this.setData({
      currentTabsIndex: index 
    });
    this._loadBaannerTitle(name);   //加载本地banner和标题
    this._loadCateDevices(id,index);  //点击时获取数据



  },

  _loadCateDevices: function(id,index){
    index = Number(index);
    if(index === -1){   //刚进入tab栏刷新设备，在分类页点击所有设备不刷新
      category.getProductsByCategory(id,(data) => {
        
        this.setData({
          categoryAllDevices : data.data
        });
      });
    }else if(index === this.data.categoryName.length - 1){
      /* 对未知设备类型进行归类  */
      var _array = this.data.categoryName;
      var otherDevices = new Array();
      this.data.categoryAllDevices.forEach(function (element){
        if (!category.inArray(element.deviceType, _array)) {
          otherDevices.push(element);
        }
      });
      this.setData({
        categoryDevices: otherDevices
      });
    }else if(index !== 0){
      /*========对所有设备按类型分类=============*/
      var currentType = this.data.categoryName[index];
      var typeDevices = new Array();
      this.data.categoryAllDevices.forEach(function(element){
        if(element.deviceType == currentType){
          typeDevices.push(element);
        }
      });
            
      this.setData({
        categoryDevices: typeDevices
      });
      /* ===========end================= */
    }
   },


  onDevicesItemTap: function (event) {
    var deviceid = category.getDataSet(event, 'deviceid');
    var deviceType = category.getDataSet(event, 'type');
    
    if(deviceType === "开关" || deviceType === "插座"){
      //nothing
    }else{
      wx.navigateTo({
        url: '../device/device?deviceid=' + deviceid
      });
    }
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()();
  },

  switchChange: function(event){
    var status = event.detail.value;
    var currentId = Number(event.currentTarget.id);
    var deviceId = category.getDataSet(event, 'deviceid');
    this.data.statusTable[deviceId] = status;
    var newStatusTable = this.data.statusTable;
    this.setData({
      currentId : currentId,
      statusTable: newStatusTable
    });
    var data = {
      status:status
    };

    category.turnSwitch(currentId,data,(res) =>{
      wx.showToast({
        title: '应用成功',
        icon: 'success',
        duration: 1000,
        // mask: true
      });
    },(err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
    });

  }


})
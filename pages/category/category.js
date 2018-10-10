// pages/category/category.js

import { Config } from '../../utils/config.js';
import {Category} from 'category_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var category = new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5','tanslate6'],
    switchOnImg: Config.switchOnUrl,
    categoryName: Config.categoryName,
    categoryType: Config.categoryType,
    categoryTypeArray: Config.categoryTypeArray,
    bannerImageUrl: Config.bannerImageUrl,
    imgUrl: Config.deviceImgUrl,
    statusTable: {},

    requestId: 1000000   //请求id100w 递减
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Config.test = '2';
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


  //load所有设备并分类
  _loadCateDevices: function(id,index){
    index = Number(index);
    if(index === -1){   //刚进入tab栏刷新设备，在分类页点击所有设备不刷新
      category.getAllDevices((data) => {
        
        this.setData({
          categoryAllDevices : data.data
        });
      });
    }else if(index === this.data.categoryName.length - 1){
      /* 对未知设备类型进行归类  */
      var _array = this.data.categoryTypeArray;
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
      var _arrayType = this.data.categoryType[currentType];
      var typeDevices = new Array();
      this.data.categoryAllDevices.forEach(function(element){
        if (category.inArray(element.deviceType, _arrayType)){
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
    
    if(deviceType === "switch" || deviceType === "outlet"){
      //nothing
    } else if (deviceType === 'sceneSelector'){
      wx.navigateTo({
        url: '../sceneSelector/sceneSelector?deviceid=' + deviceid
      });
    } 
    else{
      wx.navigateTo({
        url: '../device/device?deviceid='+deviceid+'&deviceType='+deviceType
      });
    }
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()();
  },

  /**
   * 控制开关类设备
   */
  switchChange: function(event){
    var status = event.detail.value;
    var deviceInfo = category.getDataSet(event, 'deviceinfo');
    var deviceId = deviceInfo.id;
    var requestId = this.data.requestId;

    /**开关变换改变图片 */
    this.data.statusTable[deviceId] = status;
    var newStatusTable = this.data.statusTable;
    this.setData({
      statusTable: newStatusTable
    });

    var triad = {
      deviceType: deviceInfo.deviceType,
      manufacture: deviceInfo.manufacture,
      model: deviceInfo.model
    }

    /**控制需要的请求数据 */
    var data = {
      deviceId:deviceInfo.id,
      requestId: requestId,
      triad: triad,
      status: status
    };

    category.turnSwitch(data,(res) =>{
      var statusCode = res.statusCode;
      if(statusCode === 200 && res.data.indexOf("device") ===-1){   //状态码为200则应用成功
        wx.showToast({
          title: '应用成功',
          icon: 'success',
          duration: 1000,
          // mask: true
        });
        
      }else{              //状态码不是200  应用失败
        wx.showToast({
          title: '应用失败',
          image: '../../imgs/icon/pay@error.png',
          duration: 1000,
          // mask: true
        });
      }
      
    },(err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
      console.log(err);
    });

    this.data.requestId--;

  }

})
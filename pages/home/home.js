// pages/home/home.js
import {Home} from 'home_model.js';
import {Config} from '../../utils/config.js';
var home = new Home();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImageUrl: Config.imagesUrl,
    bannerImageUrl: Config.bannerImageUrl,
    categoryImgUrl: Config.categoryImgUrl,
    categoryName: Config.categoryName,
    userInfo:{}
   
  },
  onLoad:function(){
    this._loadData();
    
  },
  _loadData:function(){
    var id = 1;
    home.getProductsData((res) => {
      this.setData({
        'productsArr': res
      });
    });
  },

  onReady:function(){
    var userInfo = app.globalData.userInfo;
    this.setData({
      userInfo: userInfo
    });
    
  },

  onProductsItemTap:function(event){
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id
    });
  },

  onCategoryTap:function(event){
    var index = home.getDataSet(event,'index');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../category/category?index=' + index +'&name=' + name
    });
  },

  onPullDownRefresh:function(){
    // console.log(this.data.userInfo);
    wx.stopPullDownRefresh();
  },

  onGoodsTap:function(event){
    var id = home.getDataSet(event,'id');
    // console.log(id);
  
    wx.navigateTo({
      url: '../product/product?id='+id.id,
    });
  },
 
})
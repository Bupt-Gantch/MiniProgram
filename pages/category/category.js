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
    categoryBannerUrl: '../../imgs/banner/cateBanner.png'
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index;
    var id = Number(options.index)+Number(2);    
    var name = options.name;
    var url = this.data.categoryBannerUrl;
    this.setData({
      currentTabsIndex:index,

    });
    this._loadBaannerTitle(name,url);
    this._loadCateProducts(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

/*加载本地banner和title */
  _loadBaannerTitle:function(name,url){
    var topInfo = {
      name: name,
      url: url
    }
      this.setData({
          bannerTitle:topInfo
      });
  },

  onTabCategory: function(event){
    var index = category.getDataSet(event,'index');
    var id = Number(index) + Number(2);    //此ID为临时ID，要根据真实DB改
    var name = category.getDataSet(event, 'name');
    var url = this.data.categoryBannerUrl;
    this.setData({
      currentTabsIndex: index 
    });
    this._loadBaannerTitle(name,url);   //加载本地banner和标题
    this._loadCateProducts(id);  //点击时获取数据


  },

  _loadCateProducts: function(id){
    category.getProductsByCategory(id,(data) => {
      var dataObj = {
        products: data,
        //topImgUrl: url,
        //title: name
      };
      this.setData({
         categoryProducts : dataObj
      });
    });
  },
  onProductsItemTap: function (event) {
    var id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    });
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()();
  },

  onGoodsTap: function (event) {
    var id = category.getDataSet(event, 'id');
    console.log(id);

    wx.navigateTo({
      url: '../product/product?id=' + id,
    });
  },


})
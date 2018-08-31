// pages/products/product.js
import {Product} from 'product_model.js';
import {Config} from '../../utils/config.js';
var product = new Product();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImageUrl: Config.imagesUrl,
    countsArray: [1,2,3,4,5,6,7,8,9,10],
    productCount : 1,
    currentTabsIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var id = options.id;
      this.data.id = id;
      this._loadData();
  },

  _loadData: function(){
    product.getDetailInfo(this.data.id,(data)=>{
      this.setData({
        product: data
      });
    });
  },

  bindPickerChange:function(event){
    var index = event.detail.value;
    var selectedCount = this.data.countsArray[index];
    this.setData({
      productCount : selectedCount
    });
  },

  onTabItemTap: function(event){
    var index = product.getDataSet(event,'index');
    this.setData({
      currentTabsIndex: index
    });

  }

  
})
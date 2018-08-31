// pages/pulish/publish.js
import { Config } from '../../utils/config.js';
import {Publish} from 'publish_model.js';
var publish = new Publish();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allCampus: Config.campus,
    pickedCampus: '校本部',
    categoryName: Config.categoryName,
    pickedCategory: '其他',
    choosedPhotosList:[],
    photoCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  bindCampusChange:function(event){
    var index = event.detail.value;
    this.setData({
      pickedCampus: this.data.allCampus[index]
    })
  },

  bindCategoryChange: function (event) {
    var index = event.detail.value;
    this.setData({
      pickedCategory: this.data.categoryName[index]
    })
  },

  addPhotoTap:function(){
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        this.setData({
          choosedPhotosList: tempFilePaths,
          photoCount:tempFilePaths.length
        });
      }
    })
  },
  onPreviewTap:function(event){
    var index = publish.getDataSet(event, 'index');  //传入key
    wx.previewImage({
      current: this.data.choosedPhotosList[index],
      urls: this.data.choosedPhotosList,
    })
  },
  

  formSubmit: function(event){   /* 提交的表单内容处理*/
    var formTextInfo = {
      goodsTitle : event.detail.value.titleInput,
      goodsDescription : event.detail.value.textarea,
      goodsPrice: event.detail.value.priceInput,
      goodsCampus: this.data.pickedCampus,
      goodsCategory: this.data.pickedCategory,
      photoCount: this.data.photoCount
    };

    if(!formTextInfo.goodsTitle){
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
      });
    } else if (!formTextInfo.goodsDescription){
      wx.showToast({
        title: '请输入宝贝描述',
        icon: 'none',
      });
    } else if(!formTextInfo.goodsPrice){
      wx.showToast({
        title: '请输入预期价格',
        icon: 'none',
      });
    }else{
      var data = formTextInfo;
        publish.publishGoods(data,(res)=>{
            /* 回调,信息上传后在回调里上传图片 */
        });
        wx.saveFile({
          tempFilePath: this.data.choosedPhotosList[0],
          success:function(res){
            console.log(res);
          }
        });
        wx.showToast({
          icon: 'success',
          title: '发布成功！',
          success:function(){
            setTimeout(function(){
              wx.reLaunch({
                url: '../home/home',
              });
            },1000);
          }
        });
      }
    },


})
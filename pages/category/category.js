// pages/category/category.js

import { Config } from '../../utils/config.js';
import {Category} from 'category_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var category = new Category();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5', 'tanslate6'],
    switchOnImg: Config.switchOnUrl,
    categoryName: Config.categoryName,
    categoryType: Config.categoryType,
    categoryTypeArray: Config.categoryTypeArray,
    bannerImageUrl: Config.bannerImageUrl,
    imgUrl: Config.deviceImgUrl,
    groupSceneImg: Config.otherImg,
    statusTable: {},

    sceneGroup: ['分组','场景'],
    showModal: false,
    content: {
      title: "创建设备组",
      placeholder: "请输入设备组名"
    },
    groupName: '',

    showModalScene: false,
    contentScene: {
      title: "创建场景",
      placeholder: "请输入场景名"
    },
    sceneName: '',

    hiddenPicker: true,
    pickerValueArr:[0],
    pickeredGroup: {},
    requestId: 1000000,   //请求id100w 递减
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Config.test = '2';
    var index = 0;   //从tab栏跳转过来 
    var name = this.data.categoryName[0]; //从tab栏跳转过来
    
    this.setData({
      currentTabsIndex:index,
      currentBottomIndex: -1

    });
    this._loadBaannerTitle(name);
    this._loadCateDevices(index);
    this._loadAllGroup();
    this._loadAllScene();
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
    var name = category.getDataSet(event, 'name');
    this.setData({
      currentTabsIndex: index,
      currentBottomIndex: -1 
    });
    this._loadBaannerTitle(name);   //加载本地banner和标题
    this._loadCateDevices(index);  //点击时获取数据

  },

  //load所有设备并分类
  _loadCateDevices: function(index){
    index = Number(index);
    if(index === 0){   //刚进入tab栏刷新设备，在分类页点击所有设备不刷新
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

  /**
   * 长按设备item
   * 添加设备到分组
   * ==========================================================
   */
  onDeviceLongPress: function(event) {
    var deviceid = category.getDataSet(event, 'deviceid');
    if (this.data.allGroupArr.length === 0){
      wx.showToast({
        title: '您还没有创建任何分组',
        icon:'none'
      });
    }else{
      this.setData({
        hiddenPicker: false,
        pickeredGroup: this.data.allGroupArr[0],
        currentDeviceId: deviceid
      })
    }
  },

  onPickerChange: function(event) {
    var index = event.detail.value[0];
    this.setData({
      pickeredGroup: this.data.allGroupArr[index]
    });
  },

  onPickerConfirm: function() {
    var currentDeviceId = this.data.currentDeviceId;
    this._assignDeviceToGroup(currentDeviceId);

    this.data.pickeredGroup = {};
    this._hideGroupPicker();
  },

  onPickerCancel: function() {
    this.data.pickeredGroup = {};
    this._hideGroupPicker();
  },

  _hideGroupPicker: function(){
    this.setData({
      hiddenPicker: true
    });
  },

  _assignDeviceToGroup: function (deviceId) {
    var groupId = this.data.pickeredGroup.id;
    category.assignDeviceToGroup(groupId, deviceId, (res) => {
      wx.showToast({
        title: '应用成功',
      });
    }, (err) => {
      wx.showToast({
        title: '应用失败',
        image: '../../imgs/icon/pay@error.png',
        duration: 1000,
        // mask: true
      });
    });
  },

  /**
   * 控制开关类设备
   * ===========================================================
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
      var statusCode = res.statusCode.toString();
      if(statusCode.charAt(0) == '2' && res.data.indexOf("device") ===-1){   //状态码为200则应用成功
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

  },
  /**
   * scene & group
   * ======================================================
   */

  onBottomTab: function (event) {
    var index = Number(category.getDataSet(event, 'index'));
    var name = category.getDataSet(event, 'name');
    this.setData({
      currentBottomIndex: index,
      currentTabsIndex: -2 // 保留字-2
    });
    this._loadBaannerTitle(name);   //加载本地banner和标题
    // if(index === 0){
    //   this._loadAllGroup();  //点击时获取数据
    // }
  },

  /**
   * =================group=====================
   */

  _loadAllGroup: function(){
    var customerId = app.globalData.customerId;
    category.loadAllGroup(customerId,(data)=>{
      this.setData({
        allGroupArr:data.data
      })
    })
  },

  _createGroup: function(groupName){
    category.createGroup(groupName,(res) => {
        wx.showToast({
          title: '设备组创建成功',
        });
        this._loadAllGroup();
    })
  },

  _deleteGroup: function(groupId) {
    category.deleteGroup(groupId,(res) => {
        wx.showToast({
          title: '设备组删除成功',
        });
        this._loadAllGroup();
      
    })
  },

  onGroupsItemTap: function(event) {
    var groupid = category.getDataSet(event, 'groupid');
    var groupName = category.getDataSet(event, 'groupname');
    wx.navigateTo({
      url: '../group/group?groupid='+groupid+'&groupName='+groupName 
    });
  },

  onGroupsLongPress: function (event) {
    var _this = this;
    var groupid = category.getDataSet(event, 'groupid');
    wx.showModal({
      title: '删除设备分组',
      content: '您确定要删除该设备分组吗？',
      success: function (res) {
        if (res.confirm) {
          _this._deleteGroup(groupid);
        }
      }
    });
  },

  /**
   * 弹窗添加分组方法
   * ========================================================
   */
  onAddGroupTap: function (event) {
    this.setData({
      showModal: true,
      groupName: ''
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var submitGroupName = this.data.groupName.trim();
    if (submitGroupName === "") {
      wx.showToast({
        title: '设备组名不能为空',
        icon: 'none'
      })
    } else {
      this.hideModal();
      this._createGroup(submitGroupName);
    }
  },
  inputChange: function (event) {
    var inputValue = event.detail.value;
    this.data.groupName = inputValue;
  },

   /**
   * =================scene=====================
   */

  _loadAllScene: function () {
    var customerId = app.globalData.customerId;
    category.loadAllScene(customerId, (data) => {
      this.setData({
        allSceneArr: data.data
      })
    })
  },

  _createScene: function (params) {
    // category.createScene(params, (res) => {
    //   wx.showToast({
    //     title: '场景创建成功',
    //   });
      // this._loadAllScene();
      wx.navigateTo({
        url: '../scene/scene?&sceneName=' + params
      });
    // })
  },

  _alterScene:function(params){
    category.createScene(params, (res) => {
      wx.showToast({
        title: '场景修改成功',
      });
      this._loadAllScene();
    })
  },

  _deleteScene: function (sceneId) {
    category.deleteScene(sceneId, (res) => {
      wx.showToast({
        title: '场景删除成功',
      });
      this._loadAllScene();
    })
  },

  onSceneItemTap: function (event) {
    var sceneid = category.getDataSet(event, 'scene');
    var sceneName = category.getDataSet(event, 'scenename');
    wx.navigateTo({
      url: '../scene/scene?sceneid=' + sceneid + '&sceneName=' + sceneName
    });
  },

  onSceneLongPress: function (event) {
    var _this = this;
    var sceneid = category.getDataSet(event, 'sceneid');
    wx.showModal({
      title: '删除场景',
      content: '您确定要删除该场景吗？',
      success: function (res) {
        if (res.confirm) {
          _this._deleteScene(sceneid);
        }
      }
    });
  },

  /**
   * 弹窗添加场景方法
   */
  onAddScene: function(event){
    this.setData({
      showModalScene: true,
      sceneName: ''
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
      showModalScene:false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 场景对话框确认按钮点击事件
   */
  onSceneConfirm: function () {
    var submitGroupName = this.data.sceneName.trim();
    if (submitGroupName === ""){
      wx.showToast({
        title: '场景名不能为空',
        icon: 'none'
      })
    }else{
      this.hideModal();
      this._createScene(submitGroupName);
    }
  },
  inputSceneChange: function(event){
    var inputValue = event.detail.value;
<<<<<<< HEAD
    this.data.sceneName = inputValue;
  },
=======
    this.data.groupName = inputValue;
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  

>>>>>>> ff3f9dfb7ced034bfbd23ad693b197c52c668a31
})
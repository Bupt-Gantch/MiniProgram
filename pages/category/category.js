// pages/category/category.js

import {
  Config
} from '../../utils/config.js';
import {
  Category
} from 'category_model.js';
var chinese = require("../../utils/Chinese.js")
var english = require("../../utils/English.js")
var category = new Category();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5', 'tanslate6', 'tanslate7', 'tanslate8'],
    switchOnImg: Config.switchOnUrl,
    categoryName: Config.categoryName,
    categoryType: Config.categoryType,
    categoryTypeArray: Config.categoryTypeArray,
    bannerImageUrl: Config.bannerImageUrl,
    imgUrl: Config.deviceImgUrl,
    groupSceneImg: Config.otherImg,
    statusTable: {},

    sceneGroup: ['分组', '场景'],
    gatewayGroup: ['所有网关'],
    showModal: false,
    content: {
      title: "创建设备组",
      placeholder: "请输入设备组名"
    },
    groupName: '',

    showModalScene: false,
    contentScene: {
      title: "创建场景",
      placeholder: "只能输入数字和字母"
    },
    sceneName: '',

    showDelete:true,
    showDetail: false,
    hiddenPicker: true,
    pickerValueArr: [0],
    pickeredGroup: {},
    requestId: 1000000, //请求id100w 递减
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var index = 0; //从tab栏跳转过来 
    var name = this.data.gatewayGroup[0]; //从tab栏跳转过来
    var customerId = app.globalData.customerId;

    this.setData({
      currentTabsIndex: -2,
      currentBottomIndex: -2,
      customerId: customerId
    });
    this._loadBaannerTitle(name);
    this._loadGateway();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //加载所有网关
  _loadGateway: function() {
    var _this = this;
    var gatewayList = new Array();
    var customerId = app.globalData.customerId;
    category.getAllDevices(customerId, (res) => {
      res.data.forEach(function(element) {
        if (element.deviceType === "Gateway") {
          gatewayList.push(element)
        }
      });
      this.setData({
        gatewayDevice: gatewayList
      })
      if (gatewayList.length == 1) {
        this._loadCateDevices(0, customerId);
        this._loadAllGroup();
        this._loadAllScene(gatewayList[0].name);
        this.setData({
          gatewayName:gatewayList[0].name
        })
      }else if(gatewayList.length == 0){
        this.setData({
          categoryAllDevices:null
        })
      }
    });
  },

  //长按网关选定该网关
  onGatewayLongPress: function(event) {
    var _this = this;
    var parentdeviceId = event.target.dataset.deviceid
    var gatewayName = event.target.dataset.deviceinfo.name
    var param = {
      customerId:app.globalData.customerId,
      gatewayName: gatewayName
    }
    this.setData({
      parentdeviceId: parentdeviceId,
      gatewayName: gatewayName
    })
    category.getAllSonDevices(parentdeviceId, (res) => {
      var allDevices = new Array();
      res.forEach(function (element) {
        if (element.deviceType !="Gateway") {
          allDevices.push(element);
        }
      });
      _this.setData({
        categoryAllDevices: allDevices
      });
      _this._loadAllGroup();
      _this._loadAllScene(gatewayName);
      wx.showToast({
        title: '为您展现该网关下设备',
        icon:'none',
        duration: 3000
      })
    })
  },

  /*加载本地banner和title */
  _loadBaannerTitle: function(name) {
    this.setData({
      bannerTitle: name
    });
  },

  onTabCategory: function(event) {
    var index = Number(category.getDataSet(event, 'index')); //number化
    var name = category.getDataSet(event, 'name');
    this.setData({
      currentTabsIndex: index,
      currentBottomIndex: -1
    });
    this._loadBaannerTitle(name); //加载本地banner和标题
    this._loadCateDevices(index, this.data.customerId); //点击时获取数据
  },

  //load所有设备并分类
  _loadCateDevices: function(index, customerId) {
    var _this = this;
    index = Number(index);
    var gatewayList = _this.data.gatewayDevice;
    if (index == 0 && gatewayList.length == 1){
      category.getAllDevices(customerId,(res)=>{
        var allDevices = new Array();
        res.data.forEach(function (element) {
          if (element.deviceType != "Gateway") {
            allDevices.push(element);
          }
        });
        _this.setData({
          categoryAllDevices:allDevices
        })
      })
    }
      if (index === _this.data.categoryName.length - 1) {
        /* 对未知设备类型进行归类  */
        var _array = _this.data.categoryTypeArray;
        var otherDevices = new Array();
        this.data.categoryAllDevices.forEach(function(element) {
          if (!category.inArray(element.deviceType, _array)) {
            otherDevices.push(element);
          }
        });
        _this.setData({
          categoryDevices: otherDevices,
        });
      } else if (index !== 0) {
        /*========对所有设备按类型分类=============*/
        var currentType = _this.data.categoryName[index];
        var _arrayType = _this.data.categoryType[currentType];
        var typeDevices = new Array();
        this.data.categoryAllDevices.forEach(function(element) {
          if (category.inArray(element.deviceType, _arrayType)) {
            typeDevices.push(element);
          }
        });

        _this.setData({
          categoryDevices: typeDevices
        });

        /* ===========end================= */
      }
  },


  onDevicesItemTap: function(event) {
    var deviceInfo = category.getDataSet(event, 'deviceinfo');
    var deviceid = category.getDataSet(event, 'deviceid');
    var deviceType = deviceInfo.deviceType;
    if (deviceInfo.nickname != null) {
      var deviceName = deviceInfo.nickname;
    } else {
      var deviceName = deviceInfo.name;
    }

    // if(deviceType === "switch" || deviceType === "outlet"){
    //   //nothing
    // } else if (deviceType === 'sceneSelector'){
    //   wx.navigateTo({
    //     url: '../sceneSelector/sceneSelector?deviceid=' + deviceid
    //   });
    // } 
    // else{
    wx.navigateTo({
      url: '../device/device?deviceid=' + deviceid + '&deviceType=' + deviceType + '&deviceName=' + deviceName
    });
    // }
  },

  /**
   * 长按设备item
   * 添加设备到分组
   * ==========================================================
   */
  onDeviceLongPress: function(event) {
    var deviceid = category.getDataSet(event, 'deviceid');
    if (this.data.allGroupArr.length === 0) {
      wx.showToast({
        title: '您还没有创建任何分组',
        icon: 'none'
      });
    } else {
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

  _hideGroupPicker: function() {
    this.setData({
      hiddenPicker: true
    });
  },

  _assignDeviceToGroup: function(deviceId) {
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
  switchChange: function(event) {
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
      deviceId: deviceInfo.id,
      requestId: requestId,
      triad: triad,
      status: status
    };

    category.turnSwitch(data, (res) => {

      if (res.indexOf("device") === -1) { //状态码为200则应用成功
        wx.showToast({
          title: '应用成功',
          icon: 'success',
          duration: 1000,
          // mask: true
        });
      } else { //状态码不是200  应用失败
        wx.showToast({
          title: '应用失败',
          image: '../../imgs/icon/pay@error.png',
          duration: 1000,
          // mask: true
        });
      }

    }, (err) => {
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

  onBottomTab: function(event) {
    var index = Number(category.getDataSet(event, 'index'));
    var name = category.getDataSet(event, 'name');
    this.setData({
      currentBottomIndex: index,
      currentTabsIndex: -2
    });
    this._loadBaannerTitle(name); //加载本地banner和标题
    // if(index === 0){
    //   this._loadAllGroup();  //点击时获取数据
    // }
  },

  onGatewayTab: function(event) {
    var index = Number(category.getDataSet(event, 'index'));
    var name = category.getDataSet(event, 'name');
    this.setData({
      currentBottomIndex: -2,
      currentTabsIndex: index
    });
    this._loadBaannerTitle(name);
    this._loadGateway();
  },

  /**
   * =================group=====================
   */

  _loadAllGroup: function (parentdeviceId) {
    var param = {
      customerId:app.globalData.customerId,
      parentdeviceId: parentdeviceId
    }
    category.loadAllGroup(param, (data) => {
      this.setData({
        allGroupArr: data.data
      })
    })
  },

  _createGroup: function(customerId, groupName) {
    category.createGroup(customerId, groupName, (res) => {
      wx.showToast({
        title: '设备组创建成功',
      });
      this._loadAllGroup();
    })
  },

  _deleteGroup: function(groupId) {
    category.deleteGroup(groupId, (res) => {
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
      url: '../group/group?groupid=' + groupid + '&groupName=' + groupName
    });
  },

  onGroupsLongPress: function(event) {
    var _this = this;
    var groupid = category.getDataSet(event, 'groupid');
    wx.showModal({
      title: '删除设备分组',
      content: '您确定要删除该设备分组吗？',
      success: function(res) {
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
  onAddGroupTap: function(event) {
    this.setData({
      showModal: true,
      groupName: ''
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    let theCustomerId = this.data.customerId;
    var submitGroupName = this.data.groupName.trim();
    if (submitGroupName === "") {
      wx.showToast({
        title: '设备组名不能为空',
        icon: 'none'
      })
    } else {
      this.hideModal();
      this._createGroup(theCustomerId, submitGroupName);
    }
  },
  inputChange: function(event) {
    var inputValue = event.detail.value;
    this.data.groupName = inputValue;
  },

  /**
   * =================scene=====================
   */

  /**
   * 加载所有场景
   */
  _loadAllScene: function (gatewayName) {
    category.loadAllScene(gatewayName, (data) => {
      this.setData({
        allSceneArr: data
      })
    })
  },

  _createScene: function(params) {
    var gatewayName = this.data.gatewayName
    wx.navigateTo({
      url: '../scene/scene?&sceneName=' + params + '&gatewayName=' + gatewayName
    });
  },

  _alterScene: function(params) {
    var gatewayName = this.data.gatewayName;
    category.createScene(params, (res) => {
      wx.showToast({
        title: '场景修改成功',
      });
      this._loadAllScene(gatewayName);
    })
  },

  /**
   * 删除场景
   */
  _deleteScene: function(sceneid) {
    var gatewayName = this.data.gatewayName
    category.deleteScene(sceneid, (res) => {
      if (res == "success") {
        wx.showToast({
          title: '场景删除成功',
          duration: 2000
        });
        this._loadAllScene(gatewayName);
      } else {
        wx.showToast({
          title: '场景删除失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 点击场景
   */
  onSceneItemTap: function(event) {
    var sceneid = category.getDataSet(event, 'sceneid');
    var sceneName = category.getDataSet(event, 'scenename');
    this.setData({
      sceneid: sceneid,
      newSceneName: sceneName
    });
    this._loadSceneDevices(sceneid);
    // wx.showToast({
    //   title: '功能完善中，敬请期待',
    //   icon:'none',
    //   duration:2000
    // })
  },

  /***
   * 显示场景详情
   */
  _loadSceneDevices: function(sceneid) {
    var _this = this
    var newSceneList = []
    category.getSceneDevices(sceneid, (data) => {
      _this.setData({
        sceneLists: data,
      });
      _this.data.sceneLists.forEach(function(element) {
        category.getDeviceById(element.deviceId, (data) => {
          element.deviceType = data.deviceType,
            element.name = data.name,
            element.nickname = data.nickname,
            newSceneList.push(element);
          _this.setData({
            sceneList: newSceneList
          });
        })
      });
      this.setData({
        showDetail: true
      })
    });
  },

  /**
   * 长按删除场景
   */
  onSceneLongPress: function(event) {
    var _this = this;
    var sceneid = category.getDataSet(event, 'sceneid');
    wx.showModal({
      title: '删除场景',
      content: '您确定要删除该场景吗？',
      success: function(res) {
        if (res.confirm) {
          _this._deleteScene(sceneid);
        }
      }
    });
  },

  /**
   * 绑定场景开关
   */
  onBindConfirm: function(event) {
    var sceneid = this.data.sceneid;
    var _this = this;
    var nameList = [];
    var idList = [];
    var sceneSelector = new Array();
    this.data.categoryAllDevices.forEach(function(element) {
      if (element.deviceType === "sceneSelector") {
        sceneSelector.push(element)
      }
    });
    this.setData({
      sceneSelectorList: sceneSelector
    })
    this.data.sceneSelectorList.forEach(function(element) {
      if (element.nickname != null && element.nickname != undefined) {
        nameList.push(element.nickname)
        idList.push(element.id)
      } else {
        nameList.push(element.name)
        idList.push(element.id)
      }
    });
    wx.showActionSheet({
      itemList: nameList,
      success(res) {
        var param = {
          scene_id: sceneid,
          sceneSelectorId: idList[res.tapIndex]
        }
        category.bindSceneSelector(param, (res) => {
          if (res == "success") {
            wx.showToast({
              title: '操作成功',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '操作失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
    })
  },

  /***
   * 应用场景
   */
  onUseScene: function() {
    var sceneid = this.data.sceneid;
    category.useScene(sceneid, (res) => {
      if (res == "success") {
        wx.showToast({
          title: '应用成功',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '应用失败',
          inco: 'none',
          duration: 2000
        })
      }
    })
  },

  /**
   * 弹窗添加场景方法
   */
  onAddScene: function(event) {
    this.setData({
      showModalScene: true,
      sceneName: ''
    })
    // wx.showToast({
    //   title: '功能完善中，敬请期待',
    //   icon:'none',
    //   duration:2000
    // })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false,
      showModalScene: false,
      showDetail: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 场景对话框确认按钮点击事件
   */
  onSceneConfirm: function() {
    var submitGroupName = this.data.sceneName.trim();
    if (submitGroupName === "") {
      wx.showToast({
        title: '场景名不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (!category.validateName(submitGroupName)) {
      wx.showToast({
        title: '场景名只能为字母和数字',
        icon: 'none',
        duration: 2000
      })
    } else {
      this.hideModal();
      this._createScene(submitGroupName);
    }
  },
  inputSceneChange: function(event) {
    var inputValue = event.detail.value;
    this.data.sceneName = inputValue;
  },

  onDeleteDevice:function(){
    if (this.data.categoryAllDevices.length==0){
      wx.showToast({
        title: '您还没有设备',
        icon:'none',
        duration:2000
      })
    }else{
      this.setData({
        showDelete: false,
      })
    }
  },
  onCancelDelete:function(){
    this.setData({
      showDelete:true,
    })
  },
  deleteCertain:function(event){
    var deviceid = category.getDataSet(event, 'deviceid');
    var index = category.getDataSet(event, 'index');
    var newAllDevices = this.data.categoryAllDevices;
    wx.showModal({
      title: '注意',
      content: '删除设备后网关将与设备断开连接，请您慎重选择！',
      success(res){
        if(res.confirm){
          category.deleteDevice(deviceid, (res) => {
            if (res == "success") {
              newAllDevices.splice(index, 1);
              this.setData({
                categoryAllDevices: newAllDevices
              })
            } else {
              wx.showToast({
                title: '删除失败',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      }
    })
  },
  onPullDownRefresh() {
    wx.showLoading({
      title: '正在刷新设备...',
    })
    var customerId = app.globalData.customerId;
    var currentTabIndex = this.data.currentTabsIndex;
    category.getAllDevices(customerId, (data) => {
      this.setData({
        categoryAllDevices: data.data
      });
      if (currentTabIndex > 0 && currentTabIndex !== 0){
        this._loadCateDevices(currentTabIndex, customerId);
      }
      setTimeout(function(){
        wx.hideLoading({
          success: function () {
            wx.stopPullDownRefresh()
          }
        });
      },500)
    });
  },
})
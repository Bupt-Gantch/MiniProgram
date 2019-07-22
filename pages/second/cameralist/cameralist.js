// pages/second/test/tes.js
const app = getApp()
import {
  CamerasShow
} from 'cameralist_model.js';
var camerasShow = new CamerasShow();

Page({
  data: {
    // 获取设备高度
    appHeight: '',
    //摄像头列表
    cameraList: [],
    msgList: [
      { key: 1, name: '摄像头' },
      { key: 2, name: '添加' },
      { key: 3, name: '删除' },
      { key: 4, name: '其他' },
    ],
    cameraState:["掉线","在线"],
    cameraPlayState:[" ","-直播中"],
    // 判断导航栏列表是否显示
    meunShow: [
      { isShows: true },
      { isShows: true },
      { isShows: true },
      { isShows: true }
    ],
    hiddenmodalput:true,
    hiddenMoreInfo:true,
    getInputFocus:false,
    hiddenShareModalput:true,
    getShareInputFocus:false,
    hiddenUpdateUser:true,
    getUpdateUserFocus:false,
    inputName:'',
    inputShareName: '',
    inputAppKey: '',
    inputSecret: '',
    noChoose:true,
    elseOptions:["账户更改"],
    // 播放框状态
    isPlay: true,
    // 音量状态
    openVoice: true,
    // 视频状态日志
    videoLog: '',
    // 全屏状态
    fullScreen: false,
    streamUrl: '',
    streamSerial:'',
    streamName:'默认',
    streamType:'分享自：',
    muted: false,
    orientation: 'vertical',
    videohidden:false,
    wxssNum:1
  },

  onLoad: function (options) {
    //获取全部摄像头列表
    var param = {
      "customerId": app.globalData.customerId,
      "url": "camera/getDevices"
    };
    camerasShow.getCamerasByUid(param, (res) => {
      var _this = this;
      let resCode = res.status
         if (resCode=="200"){
           let resData = res.msg
           console.log(resData)
           for (var i = 0; resData !=undefined && i < resData.length;i++){
             let cameraItem = resData[i]
             _this.data.cameraList.push({ 
               "cameraName": cameraItem.channelName, 
               "cameraSerial": cameraItem.deviceSerial,
               "cameraStatus": cameraItem.status, 
               "isPlaying":0
             })
             _this.setData({
               cameraList:_this.data.cameraList
             })
           }
           console.log(_this.data.cameraList)
         }
         else{
           wx.showToast({
             title: res.msg,
             icon:'none',
             duration: 2000
           })
        }
    });
    //获取设备高度
    var res = wx.getSystemInfoSync();
    this.setData({
       appHeight: res.windowHeight
    });
    console.log(this.data.appHeight)
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },
  //更新设备别名
  updateName:function(e){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      getInputFocus: !this.data.getInputFocus,
    })
  },
  cancelInput:function(e){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      getInputFocus: !this.data.getInputFocus
    })
  },
  confirmInput:function(e){
    //请求更新摄像头别名
    if (this.data.inputName.length == 0) {
      wx.showToast({
        title: '别名不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      var param = {
        "customerId": app.globalData.customerId,
        "serial": this.data.streamSerial,
        "name": this.data.inputName,
        "url": "camera/updateDeviceInfo"
      };
      camerasShow.updateCameraInfo(param, (res) => {
        console.log(res)
        let resCode = res.status
        if (resCode == "200") {
          console.log(res)
          let resData = this.data.cameraList
          for (var i = 0; resData!=undefined && i < resData.length; i++) {
            if (this.data.streamSerial == resData[i].cameraSerial) {
              resData[i].cameraName = this.data.inputName
              this.setData({
                cameraList: resData
              })
              break
            }
          }
          this.setData({
            streamName: this.data.inputName
          })
        } else {
          wx.showToast({
            title: "更新失败",
            icon:'none',
            duration: 2000
          })
        }
      })
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
        getInputFocus: !this.data.getInputFocus,
      })
    }
  },
  setName:function(e){
    this.setData({
      inputName: e.detail.value
    })
  },
  //
  shareCamera:function(e){
    this.setData({
      hiddenShareModalput: !this.data.hiddenShareModalput,
      getShareInputFocus: !this.data.getShareInputFocus,
    })
  },
  cancelShareInput:function(e){
    this.setData({
      hiddenShareModalput: !this.data.hiddenShareModalput,
      getShareInputFocus: !this.data.getShareInputFocus
    })
  },
  confirmShareInput:function(e){
    //请求分享摄像头
    this.setData({
      hiddenShareModalput: !this.data.hiddenShareModalput,
      getShareInputFocus: !this.data.getShareInputFocus
    })
    console.log(this.data.inputShareName)
  },
  setShareID:function(e){
    this.setData({
      inputShareName: e.detail.value
    })
  },
  //获取更多摄像头信息
  moreInfoClick:function(e){
    this.setData({
      hiddenMoreInfo:!this.data.hiddenMoreInfo
    })
  },
  closeMoreInfo:function(e){
    this.setData({
      hiddenMoreInfo: !this.data.hiddenMoreInfo
    })
  },
  // 筛选导航栏事件
  menuClick: function (e) {
    var _this = this;
    // 获取通过wxml  data-hi="{{ idx }}" 传过来的索引
    var menuNum = e.currentTarget.dataset.hi;

    // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
    var menuSrc = "meunShow[" + menuNum + "].isShows";

    // 循环data中设置的meunShow
    for (var n = 0; n < _this.data.meunShow.length; n++) {
      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrcs = "meunShow[" + n + "].isShows";
      // 解决重复点击不能隐藏的问题
      if (n != menuNum) {
        // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
        _this.setData({
          [menuSrcs]: true
        });
      };
    };

    // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
    if (_this.data.meunShow[e.currentTarget.dataset.hi].isShows==true){
      _this.setData({
        [menuSrc]: !_this.data.meunShow[e.currentTarget.dataset.hi].isShows,
        videohidden: true
      });
    }
    else{
      _this.setData({
        [menuSrc]: !_this.data.meunShow[e.currentTarget.dataset.hi].isShows,
        videohidden: false
      });
    }
    if (menuNum === 0) {
     
    }
    else if (menuNum === 1){
      wx.scanCode({
        success(res) {
          let result = res.result
          let list = result.trim().split(/\s+/)
          //console.log(list)
          //console.log(app.globalData.openid)
          var paramAdd = {
            "customerId": app.globalData.customerId,
            "serial": list[1],
            "validateCode": list[2],
            "name": list[3],
            "discription": list[3],
            "url": "camera/addDevice"
          };
          camerasShow.addCamera(paramAdd, (res) => {
            console.log(res)
            let resCode = res.status;
            if (resCode == "200") {
              _this.data.cameraList.push({
                "cameraName": res.msg.deviceName,
                "cameraSerial": res.msg.deviceSerial,
                "cameraStatus": res.msg.status,
                "isPlaying": 0
              })
              _this.setData({
                cameraList: _this.data.cameraList,
              })
              wx.showToast({
                title: '添加成功',
                icon:'success',
                duration: 2000
              })
            }
            else{
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      })
      _this.setData({
        videohidden: !_this.data.videohidden,
      })
    }
    else if (menuNum === 2) {
      
    } 
    else if (menuNum === 3){
      
    }
  },
  //区域列表事件选择其他功能
  rowClickForElse: function (e) {
    if (e.currentTarget.dataset.hi >= 0) {
      // 获取wxml  data-hi="{{ index }}" 传过来的索引
      var rowNum = e.currentTarget.dataset.hi;
      console.log(rowNum);
      this.setData({
        ["meunShow[3].isShows"]: !this.data.meunShow[3].isShows,
        videohidden: !this.data.videohidden,
        hiddenUpdateUser: false,
        getUpdateUserFocus: !this.data.getUpdateUserFocus
      });
    };
  },
  setAppKey:function(e){
    this.setData({
      inputAppKey: e.detail.value
    })
  },
  setSecret:function(e){
    this.setData({
      inputSecret: e.detail.value
    })
  },
  cancelUpdateUser:function(e){
    this.setData({
      hiddenUpdateUser: !this.data.hiddenUpdateUser,
      getUpdateUserFocus: !this.data.getUpdateUserFocus
    })
  },
  confirmUpdateUser:function(e){
    if(this.data.inputAppKey.length==0||this.data.inputSecret.length==0){
      wx.showToast({
        title: '账号不能为空',
        icon:'none',
        duration: 2000
      })
    }
    else{
      var param = {
        "customerId": app.globalData.customerId,
        "appKey": this.data.inputAppKey,
        "appSecret": this.data.inputSecret,
        "url": "camera/user/update"
      };
      camerasShow.updateUser(param, (res) => {
        let resCode = res.status;
        if (resCode == 200) {
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          })
          this.onLoad();
        }
        else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      this.setData({
        hiddenUpdateUser: !this.data.hiddenUpdateUser,
        getUpdateUserFocus: !this.data.getUpdateUserFocus
      })
    }
  },
  //区域列表事件选择删除
  rowClickForDel:function(e){
    var _this = this;
    if (e.currentTarget.dataset.hi >= 0) {
      // 获取wxml  data-hi="{{ index }}" 传过来的索引
      var rowNum = e.currentTarget.dataset.hi;
      console.log(rowNum);
      console.log(_this.data.cameraList[rowNum]);
      // 同上
      var paramclose = {
        "customerId": app.globalData.customerId,
        "url": "camera/closeLive",
        "serial": _this.data.streamSerial
      };
      camerasShow.closeCameraRtmp(paramclose, (res) => {
          var param = {
            "customerId": app.globalData.customerId,
            "serial": _this.data.cameraList[rowNum].cameraSerial,
            "url": "camera/delDevice"
          };
          camerasShow.deleteCamera(param, (res) => {
            console.log(res)
            let resCode = res.status;
            if (resCode == "200") {
              var list = _this.data.cameraList
              list.splice(rowNum, 1)
              console.log(_this.data.cameraList)
              _this.setData({
                cameraList:list,
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            }
            else {
              wx.showToast({
                title: res.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        _this.setData({
          ["meunShow[2].isShows"]: !_this.data.meunShow[2].isShows,
          videohidden: false
        });
      })
    };
  },
  // 区域列表事件选择播放
  rowClick: function (e) {
    if (e.currentTarget.dataset.hi >= 0) {
      // 获取wxml  data-hi="{{ index }}" 传过来的索引
      var rowNum = e.currentTarget.dataset.hi;
      console.log(rowNum);
      console.log(this.data.cameraList[rowNum]);
      // 同上
      if (this.data.cameraList[rowNum].cameraStatus==0){
        wx.showToast({
          title: '掉线摄像头不能正常播放',
          icon:'none',
          duration: 2000
        })
        this.setData({
          ["meunShow[0].isShows"]: !this.data.meunShow[0].isShows,
          videohidden: false,
        });
      }
      else{
        //启动摄像头前先关闭正在播放的
        if(this.data.streamSerial!=''){
          var paramclose = {
            "customerId": app.globalData.customerId,
            "url": "camera/closeLive",
            "serial": this.data.streamSerial
          };
          camerasShow.closeCameraRtmp(paramclose, (res) =>{
            this.setData({
              ["cameraList[" + rowNum + "].isPlaying"]: 0
            })
          })
        }
        //开启视频直播流
        var paramopen = {
          "customerId": app.globalData.customerId,
          "url": "camera/openLive",
          "serial": this.data.cameraList[rowNum].cameraSerial
        };
        camerasShow.openCameraRtmp(paramopen, (res) =>{})
        //启动摄像头直播
        var param = {
          "customerId": app.globalData.customerId,
          "url": "camera/getLiveAddressbySerial",
          "serial": this.data.cameraList[rowNum].cameraSerial
        };
        camerasShow.startCameraRtmp(param, (res) =>{
          console.log(res)
          if (res.status=="200"){
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 2000//持续的时间
            })
            this.setData({
              ["meunShow[0].isShows"]: !this.data.meunShow[0].isShows,
              videohidden: false,
              streamUrl: res.msg[0].rtmp,
              streamSerial: res.msg[0].deviceSerial,
              streamName: res.msg[0].deviceName,
              ["cameraList["+rowNum +"].isPlaying"]:1,
              noChoose:false
            });
          }
          else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000//持续的时间
            })
          }
        })
      }
    };
  },
  //播放状态变化事件
  statechange(e) {
    console.log('live-player code:', e.detail.code)
    console.log('live-player code===>:', e.detail)
    if ([2001, 2002, 2007].indexOf(e.detail.code) > -1) {
      this.setData({ videoLog: e.detail.message });
    }
    if (e.detail.code == 2004) {
      this.setData({ isPlay: true });
      this.setData({ videoLog: '' });
    }
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  // 播放&暂停
  bindPlay() {
    if (!this.data.isPlay) {
      this.ctx.play({
        success: res => {
          this.setData({ isPlay: true })
          console.log('play success')
        },
        fail: res => {
          console.log('play fail')
          this.setData({ isPlay: false })
        }
      })
    }
    else {
      this.ctx.pause({
        success: res => {
          this.setData({ isPlay: false })
          console.log('pause success')
        },
        fail: res => {
          this.setData({ isPlay: true })
          console.log('pause fail')
        }
      })
    }
  },
  //点击视频播放&暂停
  bindvideobtnPlay() {
    if (!this.data.isPlay) {
      this.ctx.play({
        success: res => {
          this.setData({ isPlay: true })
          console.log('play success')
        },
        fail: res => {
          console.log('play fail')
          this.setData({ isPlay: false })
        }
      })
    }
    else {
      this.ctx.pause({
        success: res => {
          this.setData({ isPlay: false })
          console.log('pause success')
        },
        fail: res => {
          this.setData({ isPlay: true })
          console.log('pause fail')
        }
      })
    }
  },
  //停止
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
        this.setData({ isPlay: false });
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  // 音量开&关
  bindMute() {
    if (this.data.openVoice) {
      this.ctx.mute({
        success: res => {
          console.log('mute success')
          this.setData({ openVoice: false });
        },
        fail: res => {
          console.log('mute fail')
        }
      })
    }
    else {
      this.ctx.resume({
        success: res => {
          console.log('resume success')
          this.setData({ openVoice: true });
        },
        fail: res => {
          console.log('resume fail')
        }
      })
    }
  },
  // 设置全屏&非全屏
  bindScreen(event) {
    if (!this.data.fullScreen) {
      this.ctx.requestFullScreen({
        direction: 0,
      })
      this.setData({
        wxssNum:2
      })
    } else {
      this.ctx.exitFullScreen({
      })
      this.setData({
        wxssNum: 1
      })
    }
  },
  //长按视频全屏&非全屏
  bindvideoFullScreen() {
    if (!this.data.fullScreen) {
      this.ctx.requestFullScreen({
        direction: 0,
      })
    } else {
      this.ctx.exitFullScreen({
      })
    }
  },
  // 监听全屏&非全屏
  onFullScreenChange: function (e) {
    if (!e.detail.fullScreen) {
      this.setData({
        orientation: "vertical"
      })
      //this.data.orientation = "vertical";
    }
    else {
      this.setData({
        orientation: "horizontal",
      })
      //this.data.orientation = "horizontal";
    }
    this.setData({
      fullScreen: e.detail.fullScreen
    })
    console.log(e);
    //wx.showToast({
    //  title: this.data.fullScreen ? '全屏' : '退出全屏',
    //})
  },
});
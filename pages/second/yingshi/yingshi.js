// pages/second/yingshi/yingshi.js
Page({
  data: {
    // 播放状态
    isPlay: true,
    // 音量状态
    openVoice: true,
    // 视频状态日志
    videoLog: '',
    // 全屏状态
    fullScreen: false,
    streamUrl: 'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov',
    muted:true,
    orientation:'vertical'
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
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
    if (!this.data.isPlay){
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
    else{
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
  bindvideobtnPlay(){
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
    if (this.data.openVoice){
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
    else{
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
    } else {
      this.ctx.exitFullScreen({
      })
    }
  },
  //长按视频全屏&非全屏
  bindvideoFullScreen(){
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
        orientation: "horizontal"
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
})
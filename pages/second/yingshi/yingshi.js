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
    streamUrl:'rtmp://10.112.217.199/live360p/test1',
    muted:true,
    orientation:'vertical'
  },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },
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
  // 播放
  bindPlay() {
    if (!this.data.isPlay){
      this.ctx.play({
        success: res => {
          this.setData({ isPlay: true })
          console.log('play success')
          wx.showToast({
            title: 'play success',
          })
        },
        fail: res => {
          console.log('play fail')
          this.setData({ isPlay: false })
          wx.showToast({
            title: 'play fail',
          })
        }
      })
    }
    else{
      this.ctx.pause({
        success: res => {
          this.setData({ isPlay: false })
          console.log('pause success')
          wx.showToast({
            title: 'pause success',
          })
        },
        fail: res => {
          this.setData({ isPlay: true })
          console.log('pause fail')
          wx.showToast({
            title: 'pause fail',
          })
        }
      })
    }
  },
  bindStop() {
    this.ctx.stop({
      success: res => {
        console.log('stop success')
        wx.showToast({
          title: 'stop success',
        })
        this.setData({ isPlay: false });
      },
      fail: res => {
        console.log('stop fail')
        wx.showToast({
          title: 'stop fail',
        })
      }
    })
  },
  // 音量
  bindMute() {
    if (this.data.openVoice){
      this.ctx.mute({
        success: res => {
          console.log('mute success')
          wx.showToast({
            title: 'mute success',
          })
          this.setData({ openVoice: false });
        },
        fail: res => {
          console.log('mute fail')
          wx.showToast({
            title: 'mute fail',
          })
        }
      })
    }
    else{
      this.ctx.resume({
        success: res => {
          console.log('resume success')
          wx.showToast({
            title: 'resume success',
          })
          this.setData({ openVoice: true });
        },
        fail: res => {
          console.log('resume fail')
          wx.showToast({
            title: 'resume fail',
          })
        }
      })
    }
    
  },
  // 全屏
  bindScreen(event) {
    if (!this.data.fullScreen) {
      this.ctx.requestFullScreen({
        direction: 0,
      })
      this.data.orientation = "horizontal";
    } else {
      this.ctx.exitFullScreen({

      })
      this.data.orientation = "vertical";
    }
    this.setData({
      orientation: this.data.orientation
    })
  },
  // 全屏
  onFullScreenChange: function (e) {
    this.setData({
      fullScreen: e.detail.fullScreen
    })
    console.log(e);
    wx.showToast({
      title: this.data.fullScreen ? '全屏' : '退出全屏',
    })
  },
})
// pages/second/ai/ai.js
Page({
  data: {
    category: [
      { name: '语音助手', id: 'vioce-Assistant' },
      { name: '聊天室', id: 'chatRoom' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "vioce-Assistant",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "语音助手",
        "detail": []
      },
      {
        "id": "chatRoom",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "聊天室",
        "detail": []
      },
      {
        "id": "others",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "其他",
        "detail": [{
        }]
      },
    ],
    curIndex: 0,
    isScroll: false,
    toView: 'vioce-Assistant'
  },
  onReady() {
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index
      })
    }, 0)
    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  }

})
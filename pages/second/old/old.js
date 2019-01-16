// pages/second/old/old.js
Page({
  data: {
    category: [
      { name: '被看护人信息', id: 'info' },
      { name: '被看护人位置', id: 'location' },
      { name: '被看护人安全', id: 'health-info' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "info",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "被看护人信息",
        "detail": []
      },
      {
        "id": "location",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "被看护人位置",
        "detail": []
      },
      {
        "id": "health-info",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "被看护人安全",
        "detail": [{
          "thumb": "70/min",
          "name": "心率"
        },
        {
          "thumb": "120/70 mmHg",
          "name": "血压"
        }]
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
    toView: 'office'
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

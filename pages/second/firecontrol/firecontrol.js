// pages/second/firecontrol/firecontrol.js
Page({
  data: {
    category: [
      { name: '私家车消防', id: 'carFireAlarm' },
      { name: '家居消防', id: 'homeFireAlarm' },
      { name: '企业消防', id: 'corporateFireAlarm' },
      { name: '校园消防', id: 'campusFireAlarm' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "carFireAlarm",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "私家车消防",
        "detail": [{
          "thumb": "/imgs/static/car.jpg",
          "name": "1号"
        }]
      },
      {
        "id": "homeFireAlarm",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "家居消防",
        "detail": [{
          "thumb": "/imgs/index/smartCommunity.png",
          "name": "A座"
        }]
      },
      {
        "id": "corporateFireAlarm",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "企业消防",
        "detail": [{
          "thumb": "/imgs/index/smartCommunity.png",
          "name": "冠川智能"
        }]
      },
      {
        "id": "campusFireAlarm",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "校园消防",
        "detail": [{
          "thumb": "/imgs/index/smartSchool.png",
          "name": "北邮"
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
    toView: 'carFireAlarm'
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

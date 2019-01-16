// pages/second/alert/alert.js
Page({
  data: {
    category: [
      { name: '私家车安防', id: 'carGuard' },
      { name: '家居安防', id: 'homeGuard' },
      { name: '企业安防', id: 'corporateGuard' },
      { name: '校园安防', id: 'campusGuard' },
      { name: '其他', id: 'others' }
    ],
    detail: [
            {
              "id": "carGuard",
              "banner": "/imgs/swiper/swiper-03.jpg",
              "cate": "私家车安防",
              "detail":[{
                "thumb": "/imgs/static/car.jpg",
                "name":"1号"
              }]
            },
            {
              "id": "homeGuard",
              "banner": "/imgs/swiper/swiper-03.jpg",
              "cate": "家居安防",
              "detail": [{
                "thumb": "/imgs/index/smartCommunity.png",
                "name": "A座"
              }]
            },
            {
              "id": "corporateGuard",
              "banner": "/imgs/swiper/swiper-03.jpg",
              "cate": "企业安防",
              "detail": [{
                "thumb": "/imgs/index/smartCommunity.png",
                "name": "冠川智能"
              }]
            },
            {
              "id": "campusGuard",
              "banner": "/imgs/swiper/swiper-03.jpg",
              "cate": "校园安防",
              "detail": [{
                "thumb": "/imgs/index/smartSchool.png",
                "name": "红星高中"
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
    toView: 'carGuard'
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

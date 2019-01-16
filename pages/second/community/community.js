// pages/second/community/community.js
Page({
  data: {
    category: [
      { name: '停车', id: 'carParking' },
      { name: '便利店', id: 'store' },
      { name: '商场', id: 'mall' },
      { name: '医院', id: 'hospital' },
      { name: '学校', id: 'school' },
      { name: '安保', id: 'safeGuard' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "carParking",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "停车",
        "detail": [{
        }]
      },
      {
        "id": "store",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "便利店",
        "detail": [{
          "thumb": "/imgs/index/smartCommunity.png",
          "name": "XXXX便利店"
        }]
      },
      {
        "id": "mall",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "商场",
        "detail": [{
          "thumb": "/imgs/index/smartCommunity.png",
          "name": "XXX商场"
        }]
      },
      {
        "id": "hospital",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "医院",
        "detail": [{
          "thumb": "/imgs/static/hos.jpg",
          "name": "XXX医院"
        }]
      },
      {
        "id": "school",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "学校",
        "detail": [{
          "thumb": "/imgs/index/smartSchool.png",
          "name": "XXX小学"
        },
          {
            "thumb": "/imgs/index/smartSchool.png",
            "name": "XXX中学"
          },
          {
            "thumb": "/imgs/index/smartSchool.png",
            "name": "XXX中学"
          }]
      },
      {
        "id": "safeGuard",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "安保",
        "detail": [{
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
    toView: 'carParking'
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

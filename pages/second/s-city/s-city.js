// pages/second/s-city/s-city.js
Page({
  data: {
    category: [
      { name: '住宅', id: 'home' },
      { name: '车辆', id: 'vehicle' },
      { name: '交通状况', id: 'traffic' },
      { name: '其他', id: 'others' },
    ],
    detail: [
      {
        "id": "home",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "住宅",
        "detail": [{
          "thumb": "/imgs/static/power.jpg",
          "name": "电力"
        },
        {
          "thumb": "/imgs/index/cloudFireControl.png",
          "name": "消防"
        },
          {
            "thumb": "/imgs/static/moniter.jpg",
            "name": "监控"
          }]
      },
      {
        "id": "vehicle",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "车辆",
        "detail": [{
          "thumb": "/imgs/static/autobike.jpg",
          "name": "电动车A"
        },
          {
            "thumb": "/imgs/static/car.jpg",
            "name": "汽车B"
          }]
      },
      {
        "id": "traffic",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "交通状况",
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
    toView: 'service'
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

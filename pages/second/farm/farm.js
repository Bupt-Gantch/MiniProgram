// pages/second/farm/farm.js
Page({
  data: {
    category: [
      { name: '温度', id: 'temperature' },
      { name: '湿度', id: 'wet' },
      { name: '虫害', id: 'warm' },
      { name: '光照', id: 'light' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "temperature",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "温度",
        "detail": [{
          "thumb": "/imgs/static/tem.jpg",
          "name": "东二区"
        },
          {
            "thumb": "/imgs/static/tem.jpg",
            "name": "南一区"
          },
          {
            "thumb": "/imgs/static/tem.jpg",
            "name": "北一区"
          }]
      },
      {
        "id": "wet",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "湿度",
        "detail": [{
          "thumb": "/imgs/static/wet.jpg",
          "name": "西二区"
        },
          {
            "thumb": "/imgs/static/wet.jpg",
            "name": "东一区"
          }]
      },
      {
        "id": "warm",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "虫害",
        "detail": [{
          "thumb": "/imgs/static/bug.jpg",
          "name": "室内一区"
        },
          {
            "thumb": "/imgs/static/bug.jpg",
            "name": "室内二区"
          },
          {
            "thumb": "/imgs/static/bug.jpg",
            "name": "室外一区"
          }]
      },
      {
        "id": "light",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "光照",
        "detail": [{
          "thumb": "/imgs/test/lightSensor.png",
          "name": "室内一区"
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

// pages/second/hotel/hotel.js
const app = getApp()
Page({
  data: {
    category: [
      { name: '酒店业务', id: 'service' },
      { name: '门禁', id: 'door-lock' },
      { name: '照明灯', id: 'lamp' },
      { name: '中央空调', id: 'cac' },
      { name: '窗帘', id: 'curtain' },
      { name: '插座', id: 'soc' },
      { name: 'Wifi', id: 'wifi' },
      { name: '其他', id: 'others' },
    ],
    detail: [
      {
        "id": "service",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "酒店业务",
        "detail": [{
          "thumb": "/imgs/static/phone.jpg",
          "name": "前台咨询"
        },
          {
            "thumb": "/imgs/static/dining.jpg",
            "name": "叫餐"
          }]
      },
      {
        "id": "door-lock",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "门禁",
        "detail": [{
          "thumb": "/imgs/test/smartLock.png",
          "name": "一键开门"
        }]
      },
      {
        "id": "lamp",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "照明灯",
        "detail": [{
          "thumb": "/imgs/test/switch@off.png",
          "name": "主灯"
        },
          {
            "thumb": "/imgs/test/switch@off.png",
            "name": "台灯"
          },
          {
            "thumb": "/imgs/test/switch@off.png",
            "name": "卫生间灯"
          }]
      },
      {
        "id": "cac",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "中央空调",
        "detail": [{
          "thumb": "/imgs/static/tem.jpg",
          "name": "温度"
        },
          {
            "thumb": "/imgs/static/wet.jpg",
            "name": "湿度"
          },
          {
            "thumb": "/imgs/static/wind.jpg",
            "name": "风速"
          },
          ]
      },
      {
        "id": "curtain",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "窗帘",
        "detail": [{
          "thumb": "/imgs/test/curtain.png",
          "name": "主窗帘"
        }]
      },
      {
        "id": "soc",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "插座",
        "detail": [{
          "thumb": "/imgs/test/socket@off.png",
          "name": "插座A"
        }]
      },
      {
        "id": "wifi",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "Wifi",
        "detail": [{
          "thumb": "/imgs/static/wifi.jpg",
          "name": "一键接入"
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

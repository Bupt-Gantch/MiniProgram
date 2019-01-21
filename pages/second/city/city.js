// pages/second/city/city.js
Page({
  data: {
    category: [
      { name: '政务', id: 'gov-affairs' },
      { name: '交通', id: 'traffic' },
      { name: '医疗', id: 'hospital' },
      { name: '教育', id: 'education' },
      { name: '食居', id: 'food-hotel' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "gov-affairs",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "政务",
        "detail": []
      },
      {
        "id": "traffic",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "交通",
        "detail": []
      },
      {
        "id": "hospital",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "医疗",
        "detail": []
      },
      {
        "id": "education",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "教育",
        "detail": []
      },
      {
        "id": "food-hotel",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "食居",
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
    toView: 'gov-affairs'
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

// pages/second/support/support.js
Page({
  data: {
    category: [
      { name: '真伪查询', id: 'check' },
      { name: '维修查询', id: 'fix-info' },
      { name: '查询支付', id: 'payment-info' },
      { name: '寄送快修', id: 'packing-fix' },
      { name: '上门快修', id: 'repair-at-home' },
      { name: '预约维修', id: 'book-repair' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "check",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "真伪查询",
        "detail": []
      },
      {
        "id": "fix-info",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "维修查询",
        "detail": []
      },
      {
        "id": "payment-info",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "查询支付",
        "detail": []
      },
      {
        "id": "packing-fix",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "寄送快修",
        "detail": []
      },
      {
        "id": "repair-at-home",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "上门快修",
        "detail": []
      },
      {
        "id": "book-repair",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "预约维修",
        "detail": []
      },
      {
        "id": "others",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "其他",
        "detail": []
      },
    ],
    curIndex: 0,
    isScroll: false,
    toView: 'check'
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

// pages/second/office/office.js
Page({
  data: {
    category: [
      { name: '管理人员', id: 'exc' },
      { name: '人事部', id: 'hr' },
      { name: '销售部', id: 'sale-club' },
      { name: '研发部', id: 'study-club' },
      { name: '新员工', id: 'newWorker' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "exc",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "管理人员",
        "detail": []
      },
      {
        "id": "hr",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "人事部",
        "detail": []
      },
      {
        "id": "sale-club",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "销售部",
        "detail": []
      },
      {
        "id": "study-club",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "研发部",
        "detail": []
      },
      {
        "id": "newWorker",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "新员工",
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
    toView: 'exc'
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

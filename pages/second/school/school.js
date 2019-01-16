// pages/second/school/school.js
Page({
  data: {
    category: [
      { name: '办公室', id: 'office' },
      { name: '教室', id: 'classroom' },
      { name: '餐厅', id: 'dining-hall' },
      { name: '宿舍', id: 'dormitory' },
      { name: '学生活动中心', id: 'sac' },
      { name: '其他', id: 'others' }
    ],
    detail: [
      {
        "id": "office",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "办公室",
        "detail": [{
          "thumb": "/imgs/index/smartOffice.png",
          "name": "教二"
        },
        {
          "thumb": "/imgs/index/smartOffice.png",
          "name": "教三"
        },
        {
          "thumb": "/imgs/index/smartOffice.png",
          "name": "教四"
        }]
      },
      {
        "id": "classroom",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "教室",
        "detail": [{
          "thumb": "/imgs/index/smartCommunity.png",
          "name": "教一"
        },
        {
          "thumb": "/imgs/index/smartCommunity.png",
          "name": "教二"
        }]
      },
      {
        "id": "dining-hall",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "餐厅",
        "detail": [{
          "thumb": "/imgs/static/dining.jpg",
          "name": "一餐厅"
        },
        {
          "thumb": "/imgs/static/dining.jpg",
          "name": "二餐厅"
        },
        {
          "thumb": "/imgs/static/dining.jpg",
          "name": "三餐厅"
        }]
      },
      {
        "id": "dormitory",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "宿舍",
        "detail": [{
          "thumb": "/imgs/static/dom.jpg",
          "name": "学生2公寓"
        },
          {
            "thumb": "/imgs/static/dom.jpg",
            "name": "学生6公寓"
          }]
      },
      {
        "id": "sac",
        "banner": "/imgs/swiper/swiper-03.jpg",
        "cate": "学生活动中心",
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

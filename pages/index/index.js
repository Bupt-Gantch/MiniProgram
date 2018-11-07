// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-03.jpg',
      '/imgs/swiper/swiper-06.jpg'
    ], 
    themeArr:[
      {
        url:'/imgs/index/corevalue3.jpg',
        content:'尊重员工 培养员工 保护员工 成就员工个体社会价值实现与公司社会价值实现的融合个人梦想和公司愿景的统一'
      },
            {
        url: '/imgs/index/corevalue2.jpg',
        content:'交付拥有世界级品质的产品、解决方案和服务是冠川矢志不渝的追求。'
      },
      {
        url: '/imgs/index/corevalue1.jpg',
        content:'冠川创新有很多的维度，可以是服务的创新、商业模式的创新，技术方案的创新……每一种创新都可以成就社会价值。冠川智能在安防报警和智能家居领域耕耘十余年，价值通过技术创新，让安防系统更易用，更智能，更可靠。让智能家居体现更智慧，更便利，更安全，更舒适！这是我们存在于安防行业的核心价值所在…'
      }
    ],
    cores: [
      [{
          id: 'bigdata',
          name: '大数据',
          disabled:true,
          image:'/imgs/index/bigData.png',
          url:'../home/home'
        },
        {
          id: 'smartHome',
          name: '智慧家居',
          disabled: false,
          image: '/imgs/index/smartHome.png',
          url:'../category/category'
        },
        {
          id: 'city',
          name: '平安城市',
          disabled: false,
          image: '/imgs/index/city.png'
        },
        {
          id: 'farm',
          name: '智慧农场',
          disabled: false,
          image: '/imgs/index/farm.png'
        },
        {
          id: 'finance',
          name: '金融珠宝',
          disabled: false,
          image: '/imgs/index/finance.png'
        },
        {
          id: 'prison',
          name: '司法监狱',
          disabled: false,
          image: '/imgs/index/prison.png'
        },
        {
          id: 'study',
          name: '科教文卫',
          disabled: false,
          image: '/imgs/index/study.png'
        },
        {
          id: 'creative',
          name: '创新技术',
          disabled: false,
          image: '/imgs/index/creative.png'
        },
        {
          id: 'team',
          name: '服务支持',
          disabled: false,
          image: '/imgs/index/team.png'
        },
        {
          id: 'company',
          name: '公司介绍',
          disabled: false,
          image: '/imgs/index/company.png'
        }
      ],
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      index1:"show",
      index2:"show",
      index0:"show",

      index01: "hide",
      index02: "hide",
      index00: "hide",
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  show:function(event){
    var newindex = event.currentTarget.dataset.index
    if(newindex==0){
      this.setData({
        index0:"hide",
        index00:"show"
      })
    }else if(newindex==1){
      this.setData({
        index1: "hide",
        index01: "show"
      })
    }else if(newindex==2){
      this.setData({
        index2: "hide",
        index02: "show"
      })
    }
  },

  hide: function (event) {
    var newindex = event.currentTarget.dataset.index
    if (newindex == 0) {
      this.setData({
        index0: "show",
        index00: "hide"
      })
    } else if (newindex == 1) {
      this.setData({
        index1: "show",
        index01: "hide"
      })
    } else if (newindex == 2) {
      this.setData({
        index2: "show",
        index02: "hide"
      })
    }
  },

})
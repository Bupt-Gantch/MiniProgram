// pages/index/index.js
import {
  Index
} from 'index_model.js';
 
var index = new Index();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    weatherData: '',
    imgUrls: [
      '/imgs/swiper/swiper-03.jpg',
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-01.jpg'
    ],
    themeArr: [{
        url: '/imgs/index/corevalue3.jpg',
      },
      {
        url: '/imgs/index/corevalue4.jpg',
      },
      {
        url: '/imgs/index/corevalue1.jpg',
      }
    ],
    cores: [
      [{
          id: 'smartHome',
          name: '智能家居',
          disabled: true,
          image: '/imgs/index/smartHome.jpg',
          // url: '../second/smarthome/smarthome'
          url: '../category/category'
        },
        {
          id: 'cloudAlert',
          name: '云报警',
          disabled: true,
          image: '/imgs/index/cloudAlert.jpg',
          // url: '../second/alert/alert'
          url: '../category/category'
        },
        {
          id: 'cloudFireControl',
          name: '云消防',
          disabled: true,
          image: '/imgs/index/cloudFireControl.jpg',
          // url: '../second/firecontrol/firecontrol'
          url: '../category/category'
        },
        {
          id: 'farm',
          name: '智慧农场',
          disabled: true,
          image: '/imgs/index/farm.png',
          // url: '../second/farm/farm'
          url: '../category/category'
        },
        {
          id: 'smartHotel',
          name: '智慧酒店',
          disabled: true,
          image: '/imgs/index/smartHotel.png',
          // url: '../second/hotel/hotel'
          url: '../category/category'
        },
        {
          id: 'safeCity',
          name: '平安城市',
          disabled: true,
          image: '/imgs/index/safeCity.png',
          // url: '../second/s-city/s-city'
          url: '../category/category'
        },
        {
          id: 'smartCommunity',
          name: '智慧社区',
          disabled: true,
          image: '/imgs/index/smartCommunity.jpg',
          // url: '../second/community/community'
          url: '../category/category'
        },
        {
          id: 'smartSchool',
          name: '智慧校园',
          disabled: true,
          image: '/imgs/index/smartSchool.png',
          // url: '../second/school/school'
          url: '../category/category'
        },
        {
          id: 'smartOld',
          name: '智慧养老',
          disabled: true,
          image: '/imgs/index/smartOld.png',
          // url: '../second/old/old'
          url: '../category/category'
        },
        {
          id: 'smartOffice',
          name: '智慧办公',
          disabled: true,
          image: '/imgs/index/smartOffice.png',
          // url: '../second/office/office'
          url: '../category/category'
        },
        {
          id: 'smartCity',
          name: '智慧城市',
          disabled: true,
          image: '/imgs/index/smartCity.png',
          // url: '../second/city/city'
          url: '../category/category'
        },
        {
          id: 'bigData',
          name: '大数据',
          disabled: true,
          image: '/imgs/index/bigData.jpg',
          url: '../home/home'
        },
        {
          id: 'artificialIntelligence',
          name: '人工智能',
          disabled: true,
          image: '/imgs/index/artificialIntelligence.jpg',
          // url: '../second/ai/ai'
          url: '../category/category'
        },
        {
          id: 'serviceSupport',
          name: '服务支持',
          disabled: true,
          image: '/imgs/index/team.png',
          url: '../second/support/support'
        },
        {
          id: 'companyIntroduction',
          name: '关于冠川',
          disabled: true,
          image: '/imgs/index/company.png',
          url: '../second/company/company'
        },
      ],
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
        index1: "show",
        index2: "show",
        index0: "show",
        index01: "hide",
        index02: "hide",
        index00: "hide",
      }),
      this.getWeather();
  },

  getWeather: function() {
    var _this = this;
    var weatherArray = [];
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var locationString = res.longitude + "," + res.latitude;
        // console.log(locationString);
        var param = {
          location: locationString,
          coord_type: 'wgs84',
          output: 'json',
          ak: 'H8ZPS35wSxtZ3tCur8S4X2KDrvAdy8jA'
        }
        index.getWeather(param, (res) => {
          // console.log(res);
          var weatherData = res.data.results[0];
          var currentcity = weatherData.currentCity;
          _this.setData({
            currentcity: currentcity
          })
          weatherData.weather_data.forEach(function(element) {
            if (element.date.length == 2) {
              var weather = element.date + '。' + element.weather + '。' + element.temperature + '。' + element.wind + '。';
              var params = new Object();
              params.title = weather;
              weatherArray.push(params);
            } else {
              var weather = element.date + '。' + element.weather + '。';
              var params = new Object();
              params.title = weather;
              weatherArray.push(params);
            }
          })
          _this.setData({
            weatherData: weatherArray,
          });
        })
      },
      fail: function(res) {
        _this.setData({
          currentcity: '重新加载'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.getWeather()
  },

  weather: function() {
    var _this = this;
    if (_this.data.currentcity === '重新加载') {
      _this.openConfirm();
    }
    // else{
    //   wx.navigateTo({
    //     url: '/pages/weather/weather',
    //   })
    // }
  },

  openConfirm: function() {
    var _this = this;
    wx.showModal({
      content: '检测到您没打开定位权限，是否去设置打开来获取您所在地的天气信息？',
      confirmText: "确认",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              if (res.authSetting["scope.userLocation"]) {
                _this.getWeather()
              }
            }
          })
        } else {}
      }
    });
  },

  onShareAppMessage: function(res) {
    return {
      title: '冠川智能',
      path: '/pages/loading/loading',
      success: function() {},
      fail: function() {}
    }
  },

  changePage: function(e) {
    var location = Number(index.getDataSet(e, 'index'));
    var cores = this.data.cores[0];
    var url = cores[location].url;
    if (location == 11 || location == 13 || location == 14) {
      wx.navigateTo({
        url: url,
      })
    } else {
      wx.switchTab({
        url: url,
      })
    }

  }


  // show: function(event) {
  //   var newindex = event.currentTarget.dataset.index
  //   if (newindex == 0) {
  //     this.setData({
  //       index0: "hide",
  //       index00: "show"
  //     })
  //   } else if (newindex == 1) {
  //     this.setData({
  //       index1: "hide",
  //       index01: "show"
  //     })
  //   } else if (newindex == 2) {
  //     this.setData({
  //       index2: "hide",
  //       index02: "show"
  //     })
  //   }
  // },

  // hide: function(event) {
  //   var newindex = event.currentTarget.dataset.index
  //   if (newindex == 0) {
  //     this.setData({
  //       index0: "show",
  //       index00: "hide"
  //     })
  //   } else if (newindex == 1) {
  //     this.setData({
  //       index1: "show",
  //       index01: "hide"
  //     })
  //   } else if (newindex == 2) {
  //     this.setData({
  //       index2: "show",
  //       index02: "hide"
  //     })
  //   }
  // },

})
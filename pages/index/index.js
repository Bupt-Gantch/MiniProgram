// pages/index/index.js
import {
  Index
} from 'index_model.js';

var index = new Index();
const app = getApp();
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
    // goodDetail: [
    //   { title: '正品霍尼韦尔复合智能移动探测器'},
    //   {title:'霍尼韦尔光电式烟感探测器'},
    //   {title:'ZigBee智能家居网关'}
    // ],
    themeArr: [{
        url: '/imgs/index/corevalue3.png',
      },
      {
        url: '/imgs/index/corevalue4.png',
      },
      {
        url: '/imgs/index/corevalue1.png',
      }
    ],
    // cores: [
    //   [{
    //       id: 'smartHome',
    //       name: '智能家居',
    //       disabled: true,
    //       image: '/imgs/index/smartHome.png',
    //       // url: '../second/smarthome/smarthome'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'bigData',
    //       name: '大数据',
    //       disabled: true,
    //       image: '/imgs/index/bigData.png',
    //       url: '../home/home'
    //     },
    //     {
    //       id: 'smartHotel',
    //       name: '智慧酒店',
    //       disabled: true,
    //       image: '/imgs/index/smartHotel.png',
    //       url: '../second/hotel/hotel'
    //       // url: '../category/category'
    //     },
    //     {
    //       id: 'cloudAlert',
    //       name: '云报警',
    //       disabled: true,
    //       image: '/imgs/index/cloudAlert.png',
    //       // url: '../second/alert/alert'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'cloudFireControl',
    //       name: '云消防',
    //       disabled: true,
    //       image: '/imgs/index/cloudFireControl.png',
    //       // url: '../second/firecontrol/firecontrol'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'farm',
    //       name: '智慧农场',
    //       disabled: true,
    //       image: '/imgs/index/farm.png',
    //       // url: '../second/farm/farm'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'safeCity',
    //       name: '平安城市',
    //       disabled: true,
    //       image: '/imgs/index/safeCity.png',
    //       // url: '../second/s-city/s-city'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'smartCommunity',
    //       name: '智慧社区',
    //       disabled: true,
    //       image: '/imgs/index/smartCommunity.png',
    //       // url: '../second/community/community'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'smartSchool',
    //       name: '智慧校园',
    //       disabled: true,
    //       image: '/imgs/index/smartSchool.png',
    //       // url: '../second/school/school'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'smartOld',
    //       name: '智慧养老',
    //       disabled: true,
    //       image: '/imgs/index/smartOld.png',
    //       // url: '../second/old/old'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'smartOffice',
    //       name: '智慧办公',
    //       disabled: true,
    //       image: '/imgs/index/smartOffice.png',
    //       // url: '../second/office/office'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'smartCity',
    //       name: '智慧城市',
    //       disabled: true,
    //       image: '/imgs/index/smartCity.png',
    //       // url: '../second/city/city'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'artificialIntelligence',
    //       name: '人工智能',
    //       disabled: true,
    //       image: '/imgs/index/artificialIntelligence.png',
    //       // url: '../second/ai/ai'
    //       url: '../category/category'
    //     },
    //     {
    //       id: 'serviceSupport',
    //       name: '服务支持',
    //       disabled: true,
    //       image: '/imgs/index/team.png',
    //       url: '../second/support/support'
    //     },
    //     {
    //       id: 'companyIntroduction',
    //       name: '关于冠川',
    //       disabled: true,
    //       image: '/imgs/index/company.png',
    //       url: '../second/company/company'
    //     },
    //   ],
    // ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWeather();
    var content = app.getLanuage(app.globalData.language);
    this.setData({
      cores: content.cores,
      netStatus: app.globalData.netStatus
    })
  },

  onShow: function() {
    var content = app.getLanuage(app.globalData.language);
    this.setData({
      cores: content.cores,
      netStatus: app.globalData.netStatus
    })
  },

  getWeather: function() {
    var _this = this;
    var weatherArray = [];
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var locationString = res.longitude + "," + res.latitude;
        var param = {
          location: locationString,
          coord_type: 'wgs84',
          output: 'json',
          ak: 'H8ZPS35wSxtZ3tCur8S4X2KDrvAdy8jA'
        };
        _this.setData({
          netStatus: app.globalData.netStatus
        });
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

  weather: function() {
    var _this = this;
    if (_this.data.currentcity === '重新加载') {
      _this.openConfirm();
    }
  },

  goToWeather: function() {
    var currentcity = this.data.currentcity;
    wx.navigateTo({
      url: '/pages/weather/weather?currentcity=' + currentcity,
    })
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
    wx.navigateTo({
      url: url,
    })
  }
})
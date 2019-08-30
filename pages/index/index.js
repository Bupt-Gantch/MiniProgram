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
      // '/imgs/swiper/swiper-03.jpg',
      '/imgs/swiper/swiper-02.jpg',
      '/imgs/swiper/swiper-01.jpg'
    ],
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
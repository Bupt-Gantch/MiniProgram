// pages/weather/weather.js
import {
  Weather
} from 'weather_model.js';

var weather = new Weather();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 省市区三级联动初始化
    region: ["北京市", "北京市", "东城区"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { //options获取url的参数（？之后）
    var content = app.getLanuage(app.globalData.language);
    this.setData({
      netStatus: app.globalData.netStatus,
      content: app.getLanuage(app.globalData.language),
      chooseCity: content.chooseCity,
      searchWea: content.searchWea,
    });
    var currentcity = options.currentcity;
    if (currentcity == '重新加载' || currentcity == undefined||currentcity == 'Reload') {
    } else {
      var param = {
        location: currentcity,
        output: 'json',
        ak: 'H8ZPS35wSxtZ3tCur8S4X2KDrvAdy8jA'
      };
      this._loadWeather(param);
    }
    var hour = new Date().getHours();
    if(hour>=7&&hour<=17){
      this.setData({
        isDay:true
      })
    }else{
      this.setData({
        isDay:false
      })
    }
  },

  // 选择省市区函数
  changeRegin(e) {
    console.log(e);
    this.setData({
      region: e.detail.value
    });
  },

  search: function() {
    var currentCity = this.data.region[2];
    var param = {
      location: currentCity,
      output: 'json',
      ak: 'H8ZPS35wSxtZ3tCur8S4X2KDrvAdy8jA'
    }
    this._loadWeather(param);
  },

  _loadWeather:function(param){
    this.setData({
      netStatus: app.globalData.netStatus
    });
    weather.getWeather(param, (res) => {
      console.log(res);
      if (res.data.status == 'No result available'){
        var currentTem = this.data.content.currentTem;
        this.setData({
          showWeather: true,
          currentTem: currentTem,
          today: '',
          weatherData: [],
        })
      }else{
        var weatherData = res.data.results[0];
        var first = weatherData.weather_data[0].date.indexOf('(实时：');
        var second = weatherData.weather_data[0].date.lastIndexOf(')');
        var currentTem = weatherData.weather_data[0].date.substring(first + 4, second);
        var today = weatherData.weather_data[0].date.substring(0, 2);
        today += '(今天)';
        weatherData.weather_data[0].date = today;
        this.setData({
          showWeather: true,
          today: today,
          weatherData: weatherData,
          currentTem: currentTem
        })
      }
    })
  }



})
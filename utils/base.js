import {
  Config
} from '../utils/config.js';
const Mock = require('mock-min.js');


class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
    this.debug = Config.debug; //debug开关
  }

  request(params) {
    this.debug = Config.debug;
    if (!this.debug) {
      var url = this.baseRequestUrl + params.url;

      if (!params.type) {
        params.type = 'GET';
      }

      wx.request({
        // url: url,
        url: params.url,
        data: params.data,
        method: params.type,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success: function(res) {
          params.sCallback && params.sCallback(res.data);
        },
        fail: function(err) {
          console.log(err);
        }

      })
    } else {
      //后面是模拟数据
      var Random = Mock.Random;
      Random.extend({
        deviceTypes: Config.categoryName,
        deviceType: function(date) {
          return this.pick(this.deviceTypes)
        }
      })


      var res = Mock.mock({
        'error_code': '',
        'error_msg': '',
        'data|30': [{
          'id|+1': 1,
          'title': '@ctitle(3,8)',
          'deviceType|1': ['灯泡', '插座', '窗帘', '传感器', '开关', 'x','红外宝','摄像头'],   //test
          'marketing_start': '@datetime()',
          'marketing_stop': '@now()',
          // 'status':true,
          'online|1':true,
          'deviceId':function(){
            return  Random.string(6)
          } ,
          'imgUrl':function (){
            let type = this.deviceType;
            switch (type) {
              case "灯泡":
                return '../../imgs/test/bump2.png'
                break;
              case "插座":
                return '../../imgs/test/socket@off.png'
                break;
              case "窗帘":
                return '../../imgs/test/curtain.png'
                break;
              case "传感器":
                return '../../imgs/test/sensor.png'
                break;
              case "开关":
                return '../../imgs/test/switch@off.png'
                break;
              default:
                return '../../imgs/test/default.png'
            }
          },
          
        }]
      })


      if (Config.test === '1') {
        //消息列表模拟数据
        var res = Mock.mock({
          'error_code': '',
          'error_msg': '',
          'data|5-10': [{
            'id|+1': 1,
            'like_num|1-50': 0,
            'pic': "@image('200x100', '#4A7BF7','#fff','pic')",
            'name': '@cname()',
            'time': '@datetime()',
            'detail': '@cparagraph(2)',
            'place': '@county(true)',
            'pictures': '',
            'up': '',
            'comments': '',
          }]
        })

      } else if (Config.test === '2') {
        var res = Mock.mock({
          'error_code': '',
          'error_msg': '',

          'data|30': [{
            'id|+1': 1,
            'title': '@ctitle(3,8)',
            'deviceType|1': ['灯泡', '插座', '窗帘', '传感器', '开关', 'x', '红外宝', '摄像头'], //test
            'marketing_start': '@datetime()',
            'marketing_stop': '@now()',
            // 'status':true,
            'online|1': true,
            'deviceId': function() {
              return Random.string(6)
            },
            'imgUrl': function() {
              let type = this.deviceType;
              switch (type) {
                case "灯泡":
                  return '../../imgs/test/bump2.png'
                  break;
                case "插座":
                  return '../../imgs/test/socket@off.png'
                  break;
                case "窗帘":
                  return '../../imgs/test/curtain.png'
                  break;
                case "传感器":
                  return '../../imgs/test/sensor.png'
                  break;
                case "开关":
                  return '../../imgs/test/switch@off.png'
                  break;
                default:
                  return '../../imgs/test/default.png'
              }
            },

          }]
        })
      }



      // 输出结果
      //console.log(res);

      params.sCallback && params.sCallback(res);
    }
  }

  request_post(params) {
    var url = this.baseRequestUrl + params.url;
    if (!this.debug) {
      wx.request({
        url: url,
        data: params.data,
        method: params.type,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success: function(res) {
          // if(params.sCallBack){
          //   params.sCallBack(res);
          // }
          params.sCallback && params.sCallback(res.data);
        },
        fail: function(err) {
          params.fCallback && params.fCallback();
          console.log(err);
        }

      })
    } else {
      //后面是模拟数据
      var Random = Mock.Random;
      Random.extend({
        deviceTypes: Config.categoryName,
        deviceType: function(date) {
          return this.pick(this.deviceTypes)
        }
      })

      var res = Mock.mock({
        'error_code': '',
        'error_msg': '',
        'data|1': [{
          'id|+1': 1,
          'title': '@ctitle(3,8)',
          'deviceType|1': ['灯泡', '插座', '窗帘', '传感器', '开关', 'x', '红外宝', '摄像头'], //test
          'online|1': true,
        }]
      })
      
      // 成功调用成功回调，失败调用失败回调
      params.sCallback && params.sCallback(res);
      //params.fCallback && params.fCallback();
    }
  }

  /*获得元素绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  inArray(key, arr) {
    if (!(arr instanceof Array) || arr.length === 0)
      return false;
    for (var i = 0; i < arr.length; i++) {
      if (key === arr[i]) {
        return true;
      }
    }
    return false;

  }


}

export {
  Base
};
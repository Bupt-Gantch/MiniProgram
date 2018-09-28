import {
  Config
} from '../utils/config.js';
const Mock = require('mock-min.js');


class Base {
  constructor() {
    this.baseRequestUrl = Config.restUrl;
    this.webSocketUrl = Config.wsUrl;
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
        url: url,
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
          params.fCallback && params.fCallback(err);
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
          params.sCallback && params.sCallback(res);
        },
        fail: function(err) {
          params.fCallback && params.fCallback(err);
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


  /** =========== websocket========= */

  realTimeDevice(params){
    var url = this.webSocketUrl+params.url;
    var deviceId = params.deviceId;

    var socketTask = wx.connectSocket({
      url: url,
      success:function(res){
        params.sConnectCb && params.sConnectCb(res);
      },
      fail:function(err){
        params.fConnectCb && params.fConnectCb(err);
      }
    });

    wx.onSocketOpen(function(res){
      console.log('Connected！');
      sendSocketMessage('{"deviceId":"' + deviceId + '"}');
    });

    wx.onSocketClose(function(res){
      console.log("Disconnected: ");
    });

    wx.onSocketError(function(err){
      console.log("WebSocket连接打开失败，请检查！"+err.message);
    });

    wx.onSocketMessage(function(data){
      console.log("Msg received:");
      params.onMsgCb && params.onMsgCb(data.data);
    });

    /** 发送消息 */
    function sendSocketMessage(msg) {
        wx.sendSocketMessage({
          data: msg
        })
        console.log("Message sent");
    }

    return socketTask;
  }
  

  /**===============END============= */

  /*时间格式化*/
    formatDate(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

/*  补零函数  */

  PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }

  /*  UTC时间  */
  getUTC(now) {
    var year = now.getFullYear();
    var month = PrefixInteger((now.getMonth() + 1), 2);
    var date = PrefixInteger(now.getDate(), 2);
    var hour = PrefixInteger(now.getHours(), 2);
    var minute = PrefixInteger(now.getMinutes(), 2);
    return year + "-" + month + "-" + date + "T" + hour + ":" + minute;
  }
  


  /*获得元素绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

  /**判断数组中有没有key */
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
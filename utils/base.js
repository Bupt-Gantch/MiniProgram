import {
  Config
} from '../utils/config.js';

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
      if (!params.method) {
        params.method = 'GET';
      }
      wx.request({
        url: url,
        data: params.data,
        method: params.method,
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          // console.log(res.data)
          var code = res.statusCode.toString();
          var startChar = code.charAt(0);
          if (startChar == '2') {
            params.sCallback && params.sCallback(res.data);
          } else {
            params.fCallback && params.fCallback(res);
          }
        },
        fail: function (err) {
          console.log(err);
          params.fCallback && params.fCallback(err);
        }
      })
    }
  }

  request_test(params) {
    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        params.sCallback && params.sCallback(res);
      },
      fail: function (err) {
        console.log(err);
        params.fCallback && params.fCallback(err);
      }
    })
  }

  // request_te(params) {
  //   console.log(params.url)
  //   if (!params.method) {
  //     params.method = 'GET';
  //   }
  //   wx.request({
  //     url: params.url,
  //     data: params.data,
  //     method: params.method,
  //     header: {
  //       'Content-Type': 'multipart/form-data',
  //       'token': wx.getStorageSync('token')
  //     },
  //     success: function (res) {
  //       params.sCallback && params.sCallback(res);
  //     },
  //     fail: function (err) {
  //       console.log(err);
  //       params.fCallback && params.fCallback(err);
  //     }
  //   })
  // }

  /** =========== websocket========= */

  realTimeDevice(params) {
    var url = this.webSocketUrl + params.url;
    var deviceId = params.deviceId;

    var socketTask = wx.connectSocket({
      url: url,
      success: function (res) {
        //params.sConnectCb && params.sConnectCb(res);
        console.log('connect success?');
      },
      fail: function (err) {
        params.fConnectCb && params.fConnectCb(err);
      }
    });

    wx.onSocketOpen(function (res) {
      console.log('Connected！');
      params.sConnectCb && params.sConnectCb(res);
      sendSocketMessage('{"deviceId":"' + deviceId + '"}');
    });

    wx.onSocketClose(function (res) {
      console.log("Disconnected: ");
    });

    wx.onSocketError(function (err) {
      console.log("WebSocket连接打开失败，请检查！" + err.message);
      params.fConnectCb && params.fConnectCb(err);
    });

    wx.onSocketMessage(function (data) {
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

  getDataSet1(event, key) {
    return event.detail.value[key];
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

  validateName(name) {
    return /^[\da-z]+$/i.test(name)
}


}

export {
  Base
};
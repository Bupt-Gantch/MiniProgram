import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js';
class Loading extends Base {
  constructor() {
    super()
  }
// //获取用户的openid
//   getOpenid:function(){
//     wx.login({
//       success:function(res){
//         var params = {
//           url: 'https://47.104.8.164:80/api/v1/wechatPost/getOpenId',
//           data: {
//             JSCODE: code
//           },
//           method: 'POST',
//         };
//         return this.request_test(params)
//       }
//     })
//   }

  getOpenid(callback) {
    var _this = this
    wx.login({
      success: function(res){
        console.log(res.code)
        //发送请求
        var params = {
          url: 'wechatPost/getOpenId',
          data: {
            JSCODE: res.code
          },
          method: 'POST',
          sCallback: function (data) {
            callback && callback(data);
          }
        };
        _this.request(params);
      }
    })
  }
//查询用户表，是否存在openid
  findOpenid(openid, callback) {
    var param = {
      url: 'account/userLogin',
      data:{
        openid:openid
      },
      method:'POST',
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {
  Loading
}
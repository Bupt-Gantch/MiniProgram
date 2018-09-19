let API_HOST = "http://xxx.com/xxx";
let DEBUG = true;//切换数据入口
var Mock = require('mock-min.js')
function ajax(data = '', fn, method = "get", header = {}) {
  if (!DEBUG) {
    wx.request({
      url: config.API_HOST + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  } else {

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
    fn(res);
  }
}
module.exports = {
  ajax: ajax
}
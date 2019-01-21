
import { Base } from '../../utils/base.js';
class Index extends Base {
  constructor() {
    super();
  }

  //获取天气
  getWeather(param, callback) {
    var params = {
      url: 'https://api.map.baidu.com/telematics/v3/weather',
      data: param,
      method: 'GET',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(params)
  }
}

export { Index };
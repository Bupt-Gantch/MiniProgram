import {Base} from '../../utils/base.js'
class Publish extends Base{
  constructor(){
    super()
  }
  getInfoList(page, callback) {
    var param = {
      url: 'infolist/by_page?page=' + page,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {Publish}

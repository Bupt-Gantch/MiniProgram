import { Base } from '../../utils/base.js'
class myPublish extends Base {
  constructor() {
    super()
  }

  getMyPublish(openid, callback) {
    var param = {
      url: '?openid=' + openid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  deleteInformation(id,callback){
    var param = {
      url: 'infolist/by_page?page='+id,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {myPublish}
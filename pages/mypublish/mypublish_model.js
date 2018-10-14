import { Base } from '../../utils/base.js'
class myPublish extends Base {
  constructor() {
    super()
  }

  getMyPublish(data, callback) {
    var param = {
      url: 'findAllPosts',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  deleteInformation(params,callback){
    var param = {
      url: 'deletePost',
      data:params,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {myPublish}
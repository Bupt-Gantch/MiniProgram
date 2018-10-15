import { Base } from '../../utils/base.js'
class myPublish extends Base {
  constructor() {
    super()
  }

  getMyPublish(data, callback) {
    var param = {
      url: 'findAllPosts',
      method:'POST',
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
      method:'POST',
      data:params,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export {myPublish}
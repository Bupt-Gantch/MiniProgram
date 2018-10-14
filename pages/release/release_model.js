import { Base } from '../../utils/base.js';

class Release extends Base {
  constructor() {
    super();
  }

  addPlace(data, callback) {
    var param = {
      url: data.url,
      data: data.data,
      method: 'POST',
      sCallback: function (res) {
        callback && callback(res);
      }
    };
    this.req_location(param);
  }

  addContent(data,callback){
    var param = {
      url: 'addPost',
      data:data,
      // method:'POST',
      sCallback:function(res){
        callback && callback(res);
      }
    }
    this.request(param);
  }
}

export {Release}
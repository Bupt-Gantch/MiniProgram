import { Base } from '../../utils/base.js';

class Publish extends Base{
  constructor(){
    super();
  }

  publishGoods(data,callback) {
    var params = {
      url: '',   //上传接口  
      data:data,
      type:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_post(params);
  }

};

export {Publish};
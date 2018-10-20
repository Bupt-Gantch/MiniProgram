import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class Publish extends Base{
  constructor(){
    super()
  }
  getInfoList(page, callback) {
    var param = {
      url: Config.postUrl+'findAllPosts',
      data:{
        page:page,
      },
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(param);
  }

  addComment(data,callback){
    var param = {
      url: Config.postUrl+'addComment',
      data:data,
      method:'POST',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request_test(param);
  }

  addUp(data,callback){
    var param = {
      url: Config.postUrl+'favorite',
      data:data,
      method:"POST",
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request_test(param)
  }
}

export {Publish}

import { Base } from '../../utils/base.js'
import { Config } from '../../utils/config.js'
class Publish extends Base{
  constructor(){
    super()
  }
  getInfoList(page, callback) {
    var param = {
      url: 'wechatPost/findAllPosts',
      data:{
        page:page,
      },
      method:"POST",
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  addComment(data,callback){
    var param = {
      url: 'wechatPost/addComment',
      data:data,
      method:'POST',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }

  addUp(data,callback){
    var param = {
      url: 'wechatPost/favorite',
      data:data,
      method:"POST",
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }
}

export {Publish}

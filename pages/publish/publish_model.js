import {Base} from '../../utils/base.js'
class Publish extends Base{
  constructor(){
    super()
  }
  getInfoList(page, callback) {
    var param = {
      url: 'findAllPosts?page=' + page,
      method:'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  addComment(data,callback){
    var param = {
      url: 'addComment',
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
      url:'favorite',
      data:data,
      method:"POST",
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    console.log(param)
    this.request(param)
  }
}

export {Publish}

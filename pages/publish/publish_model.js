import {Base} from '../../utils/base.js'
class Publish extends Base{
  constructor(){
    super()
  }
  getInfoList(page, callback) {
    var param = {
      url: 'findAllPosts?page=' + page,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  addComment(data,callback){
    var param = {
      url:'',
      data:data.data,
      method:'POST',
      sCallback:function(data){
        callback&&callback(data);
      }
    };
    this.request(param);
  }

  addUp(data,callback){
    var param = {
      url:'',
      data:data.data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param)
  }

  deleteUp(data, callback) {
    var param = {
      url: '',
      data: data.data,
      sCallback: function (data) {
        callback && callback(data);
      }
    }
  }
}

export {Publish}

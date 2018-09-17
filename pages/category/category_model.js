import { Base } from '../../utils/base.js';

class Category extends Base{
  constructor(){
    super();
  }

  getCategoryType(callback){
    var param = {
      url: 'category/all',
      sCallback: function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getProductsByCategory(id,callback){
    var param = {
      url: 'product/by_category?id=' + id,
      sCallback: function(data){
        callback && callback(data);
      }
    };
    this.request(param);
  }

  turnSwitch(deviceId,data,sCallback,fCallback){
    var param = {
      url:'.../' + deviceId,
      type:'POST',
      data:data,
      sCallback: function(res){
        sCallback && sCallback(res);
      },
      fCallback: function(err){
        fCallback && fCallback(err);
      } 
    };

    this.request_post(param);
  }

}

export {Category};
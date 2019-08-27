import {
  Base
} from '../../utils/base.js';
import {
  Config
} from '../../utils/config.js';

class Rule extends Base {
  constructor() {
    super();
  }

  //根据设别Id获取设备信息
  getDeviceById(deviceid, callback) {
    var param = {
      url: 'deviceaccess/device/' + deviceid,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //删除某条规则
  deleteRule(ruleId, callback) {
    var param = {
      url: `smartruler/remove/${ruleId}`,
      method: 'DELETE',
      sCallback: function(data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //激活某条规则
  activateRuleById(ruleId, callback) {
    var param = {
      url: `smartruler/${ruleId}/activate`,
      method:'POST',
      body:'',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }


  //暂停某条规则
  suspendRuleById(ruleId, callback) {
    var param = {
      url: `smartruler/${ruleId}/suspend`,
      method:'POST',
      data:'',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //根据rulerId获取规则详情
  getRuleById(ruleId, callback) {
    var param = {
      url: `smartruler/rule/${ruleId}`,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
};

export {
  Rule
};
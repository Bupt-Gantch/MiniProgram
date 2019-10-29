// pages/ruleDetail/ruleDetail.js
import {
  Rule
} from 'rule_model.js';
import {
  Config
} from '../../utils/config.js';
var util = require('../../utils/util.js');
var rule = new Rule();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ruleStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ruleId = options.ruleId;
    // console.log(ruleId);
    this.setData({
      ruleId: ruleId
    });
    this._loadRuleDetail(ruleId);
  },

  //获取规则详情
  _loadRuleDetail: function(ruleId) {
    var _this = this;
    var conditions = [];
    var operations = [];
    rule.getRuleById(ruleId, (res) => {
      console.log(res);
      var rule_type = res.rule.rule_type;
      var rulename = res.rule.name
      var filters = res.filters;
      var transforms = res.transforms;
      filters.forEach(function(e) {
        var condition = {};
        var jsCode = e.jsCode;
        var first = jsCode.lastIndexOf("=='") + 3;
        var second = jsCode.lastIndexOf("'&&");
        var third = jsCode.indexOf(")", second);
        var fourth = jsCode.indexOf("deviceId=='");
        var fifth = jsCode.indexOf("'&&key");
        var key = jsCode.substring(first, second);
        var value = jsCode.substring(second + 9, third);
        var alarmId = jsCode.substring(fourth + 11, fifth);
        if(key=='operate'){
          if(value == '===1'){
            value = '关门';
          }else if(value == '===2'){
            value = '开门';
          }else if(value == '===3'){
            value = '非法操作';
          }else if(value == '===5'){
            value = '非法卡';
          }
        };
        if (key == 'alarm') {
          if (value == '===0') {
            value = '正常';
          } else if (value == '===1') {
            value = '报警';
          }
        };
        rule.getDeviceById(alarmId, (res) => {
          if (res.deviceType == "IASZone") {
            var model = res.model;
            var start = model.indexOf("-");
            var newModel = model.substr(start + 1, 3);
            _this.setData({
              model: newModel
            })
          }
        });
        // console.log(alarmId);
        console.log(key);
        condition.key = key;
        condition.value = value;
        if(key!='surpervision'){
          conditions.push(condition);
        }
        // console.log(conditions);
        _this.setData({
          conditions: conditions,
          name: rulename,
          rule_type: rule_type
        });
      });
      transforms.forEach(function(e, index) {
        var operation = {};
        if (e.name == 'RestfulPlugin') {
          let requestBody = JSON.parse(e.requestBody);
          var status = requestBody.body.status;
          var url = requestBody.url;
          var first = url.indexOf("rpc/");
          var second = url.lastIndexOf("/");
          var deviceId = url.substring(first + 4, second);
          rule.getDeviceById(deviceId, (res) => {
            var name = '';
            if (res.nickname != null) {
              name = res.nickname
            } else {
              name = res.name
            }
            if (res.deviceType == 'dimmableLight') {
              operation.status = requestBody.body.bright;
            } else {
              operation.status = status;
            }
            
            operation.name = name;
            operation.deviceType = res.deviceType;
            operations.push(operation);
            _this.setData({
              operations: operations
            });
            if (index == transforms.length - 1) {
              _this.setData({
                operations: operations,
              });
            }
          })
        }
      });
      if (res.rule.state == 'ACTIVE') {
        _this.setData({
          ruleStatus: true
        })
      }
    })
  },

  onSuspendRule: function() {
    var ruleId = this.data.ruleId;
    rule.suspendRuleById(ruleId, (res) => {
      console.log(res);
      if (res == 'Suspend') {
        this.setData({
          ruleStatus: false
        })
      }
    })
  },

  onActiveRule: function() {
    var ruleId = this.data.ruleId;
    rule.activateRuleById(ruleId, (res) => {
      if (res == "Activate")
        this.setData({
          ruleStatus: true
        })
    })
  },

  onDeleteRule: function() {
    var ruleId = this.data.ruleId;
    rule.deleteRule(ruleId, (res) => {
      console.log(res);
      if (res === "OK") {
        wx.showToast({
          title: '删除成功',
          duration: 1000
        });
        wx.navigateBack({

        })
      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
        })
      }
    })
  }

})
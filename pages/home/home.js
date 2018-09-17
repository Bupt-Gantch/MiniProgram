import * as echarts from '../../utils/ec-canvas/echarts';

const app = getApp();

/** 初始化温度计 */
function initChart_temp(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: '温度',
      type: 'gauge',
      radius: '100%',
      detail: {
        formatter: '{value}℃',
        fontSize: 20,
        offsetCenter: [0, '60%']
      },
      min:-20,
      max:40,
      axisLine: {
        show: true,
        lineStyle: {
          width: 5,
          shadowBlur: 0,
          color: [
            [0.4, '#37a2da'], 
            [0.7, '#67e0e3'],
            [0.77, '#008717'],
            [1, '#fd666d']
          ]
        }
      },
      splitLine: { //分割线长
        length: 10
      },
      axisTick: {  //刻度线长
        length: 5,

      },
      axisLabel: { //刻度标签
        show: true,
        distance: 1,
        fontSize:10
      },
      pointer: {
        length: '50%',
        width: 3
      },
      data: [{
        value: 26,
        name: '温度'
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}

/**初始化湿度计 */
function initChart_hum(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: '湿度',
      type: 'gauge',
      radius:'100%',
      detail: {
        formatter: '{value}%',
        fontSize:20,
        offsetCenter: [0,'60%']
      },
      min:20, 
      axisLine: {
        show: true,
        lineStyle: {
          width: 5,
          shadowBlur: 0,
          color: [
            [0.4, '#fd666d'],
            [0.6, '#008717'],
            [1, '#67e0e3']
          ]
        }
      },
      splitLine: { //分割线长
        length:10
      },
      axisTick:{  //刻度线长
        length:5,
       
      },
      axisLabel:{ //刻度标签
        show:true,
        distance:1,
        fontSize: 10
      },
      pointer:{
        length:'50%',
        width:3
      },
      data: [{
        value: 60,
        name:'湿度'
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}

/**初始化pm2.5 */
function initChart_pm25(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: 'pm2.5',
      type: 'gauge',
      radius: '100%',
      detail: {
        formatter: '{value}',
        fontSize: 20,
        offsetCenter: [0, '60%']
      },
      max:300,
      axisLine: {
        show: true,
        lineStyle: {
          width: 5,
          shadowBlur: 0,
          color: [
            [0.167, '#6bcd07'],
            [0.333, '#fbd029'],
            [0.5, '#fe8800'],
            [0.667, '#fe0000'],
            [1, '#970454']
          ]
        }
      },
      splitLine: { //分割线长
        length: 15
      },
      axisTick: {  //刻度线长
        show: false,
        length: 5,

      },
      splitLine:{
        show:false
      },
      axisLabel: { //刻度标签
        show: false,
        distance: 1,
        fontSize: 10
      },
      pointer: {
        length: '50%',
        width: 3
      },
      data: [{
        value: 40,
        name: 'pm2.5'
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}

/**初始化饼状图 */
function initChart_piecount(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '90%'],
      data: [{
        value: 55,
        name: '灯泡'
      }, {
        value: 20,
        name: '插座'
      }, {
        value: 10,
        name: '窗帘'
      }, {
        value: 20,
        name: '传感器'
      }, {
        value: 38,
        name: '开关'
      },
      {
        value: 38,
        name: '其他类型'
      },
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

/** 初始化折线图 */

function initChart_line(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      // text: '测试下面legend的红色区域不应被裁剪',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['温度', '湿度', 'pm2.5'],
      top: 10,
      left: 'center',
      backgroundColor: '#fff',/**'rgba(165,202,124,0.5)' */
      z: 100
    },
    grid: {
      containLabel: true,
      width: "90%",
      height:"75%",
      left:"center",
      top:40
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: '温度',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: '湿度',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'pm2.5',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };

  chart.setOption(option);
  return chart;
}


Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec_temp: {
      onInit: initChart_temp
    },
    ec_hum:{
      onInit: initChart_hum
    },
    ec_pm25: {
      onInit: initChart_pm25
    },
    ec_piecount: {
      onInit: initChart_piecount
    },
    ec_history: {
      onInit: initChart_line
    }
  },

  onReady() {
  },
  
});

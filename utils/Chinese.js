var Chinese = {
  button: "English",
  mypublish:"我发布的",
  mynews:"消息列表",
  feedback:"意见反馈",
  scan:"绑定网关",
  deleteGateway:"解绑网关",
  refreshGateway:"设备入网",
  share:'分享网关',
  unshare: '取消分享',
  myfeedback:"如果您有任何建议或想法，请联系我：）",
  search:"请输入搜索内容",
  content:"您要发布的内容...",
  comment: "评论",
  submit:"发布",
  place:"所在位置",
  categoryName: ['所有设备', '灯泡', '窗帘', '插座', '监控', '门锁', '红外宝', '传感器', '其他类型'],
  gatewayGroup: ['所有网关'],
  sceneGroup: ['分组', '场景'],
  categoryType: {
    '灯泡': ['dimmableLight','switch'],
    // '开关': ['switch'],
    '窗帘': ['curtain'],
    '插座': ['outlet'],
    '监控': ['monitor'],
    '门锁': ['lock'],
    '红外宝': ['infrared'],
    '传感器': ['temperature', 'PM2.5', 'IASZone', 'lightSensor'],
    '场景开关': ['dimmableLight', 'curtain', 'switch'],
  },
  cores: [ 
    [{
      id: 'smartHome',
      name: '智能家居',
      disabled: true,
      image: '/imgs/index/smartHome.png',
      // url: '../second/smarthome/smarthome'
      url: '../category/category'
    },
    {
      id: 'bigData',
      name: '大数据',
      disabled: true,
      image: '/imgs/index/bigData.png',
      url: '../home/home'
    },
    {
      id: 'smartHotel',
      name: '智慧酒店',
      disabled: true,
      image: '/imgs/index/smartHotel.png',
      url: '../second/hotel/hotel'
      // url: '../category/category'
    },
    {
      id: 'cloudAlert',
      name: '云报警',
      disabled: true,
      image: '/imgs/index/cloudAlert.png',
      // url: '../second/alert/alert'
      url: '../category/category'
    },
    {
      id: 'cloudFireControl',
      name: '云消防',
      disabled: true,
      image: '/imgs/index/cloudFireControl.png',
      // url: '../second/firecontrol/firecontrol'
      url: '../category/category'
    },
    {
      id: 'farm',
      name: '智慧农场',
      disabled: true,
      image: '/imgs/index/farm.png',
      // url: '../second/farm/farm'
      url: '../category/category'
    },
    {
      id: 'safeCity',
      name: '平安城市',
      disabled: true,
      image: '/imgs/index/safeCity.png',
      // url: '../second/s-city/s-city'
      url: '../category/category'
    },
    {
      id: 'smartCommunity',
      name: '智慧社区',
      disabled: true,
      image: '/imgs/index/smartCommunity.png',
      // url: '../second/community/community'
      url: '../category/category'
    },
    {
      id: 'smartSchool',
      name: '智慧校园',
      disabled: true,
      image: '/imgs/index/smartSchool.png',
      // url: '../second/school/school'
      url: '../category/category'
    },
    {
      id: 'smartOld',
      name: '智慧养老',
      disabled: true,
      image: '/imgs/index/smartOld.png',
      // url: '../second/old/old'
      url: '../category/category'
    },
    {
      id: 'smartOffice',
      name: '智慧办公',
      disabled: true,
      image: '/imgs/index/smartOffice.png',
      // url: '../second/office/office'
      url: '../category/category'
    },
    {
      id: 'smartCity',
      name: '智慧城市',
      disabled: true,
      image: '/imgs/index/smartCity.png',
      // url: '../second/city/city'
      url: '../category/category'
    },
    {
      id: 'artificialIntelligence',
      name: '人工智能',
      disabled: true,
      image: '/imgs/index/artificialIntelligence.png',
      // url: '../second/ai/ai'
      url: '../category/category'
    },
    {
      id: 'serviceSupport',
      name: '服务支持',
      disabled: true,
      image: '/imgs/index/team.png',
      url: '../second/support/support'
    },
    {
      id: 'companyIntroduction',
      name: '关于冠川',
      disabled: true,
      image: '/imgs/index/company.png',
      url: '../second/company/company'
    },
    ],
  ],
  alldevice:"所有设备",
  bulb:"灯泡",
  socket:"插座",
  curtain:"窗帘",
  sensor:"传感器",
  swi:"开关",
  monitor:"监控",
  lock:"门锁",
  othertypes:"其他类型",
  scenetypes:"场景开关",
  temperature:"温度",
  humidity:"湿度",
  infrared:"红外宝",
  name:"名称",
  success:"应用成功",
  failure:"应用失败",
  welcome:"启动未来",
  register: '注册',
  email:'请输入邮箱',
  phone:'请输入电话',
  userreg:'用户注册',
  failed:'登录失败',
  failedmess:"未查询到相关信息，请您先注册",
  del:'删除',
  delmes: '确定要删除该条信息吗？',
  loading:'登录中',
  wrong:'获取失败'

}

module.exports = {
  Content: Chinese
}
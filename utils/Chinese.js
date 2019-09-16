var Chinese = { 
  register: "注册",
  login: "登陆",
  button: "English",
  mypublish: "我发布的",
  myfamily:"我的家人",
  mynews: "消息列表",
  feedback: "意见反馈",
  scan: "绑定网关",
  bindGateway: ['扫一扫', '手动添加'],
  unBindGateway:['简单解绑','深度解绑'],
  deleteGateway: "解绑网关",
  refreshGateway: "设备入网",
  share: '分享网关',
  unshare: '取消分享',
  myfeedback: "如果您有任何建议或想法，请联系我：）",
  search: "请输入搜索内容",
  content: "您要发布的内容...",
  comment: "评论",
  submit: "发布",
  place: "所在位置",
  del: '删除消息',
  delmes: '您确定要删除此条消息吗？',
  noGateway: '您还没有网关',
  // categoryName: ['所有设备', '灯泡', '窗帘', '插座', '监控', '门锁', '红外宝', '传感器', '其他类型'],
  categoryName: ['所有设备', '灯泡', '窗帘', '插座', '门锁', '红外宝', '传感器', '其他类型'],
  gatewayGroup: ['所有网关'],
  sceneGroup: ['分组', '场景'],
  categoryType: {
    '灯泡': ['dimmableLight', 'switch'],
    // '开关': ['switch'],
    '窗帘': ['curtain'],
    '插座': ['outlet'],
    // '监控': ['monitor'],
    '门锁': ['lock'],
    '红外宝': ['infrared', 'newInfrared'],
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
        name: '关于天慧',
        disabled: true,
        image: '/imgs/index/company.png',
        url: '../second/company/company'
      },
      {
        id: 'videoInterface',
        name: '视频接入',
        disabled: true,
        image: '/imgs/index/video.png',
        url: '../second/cameralist/cameralist'
      },
    ],
  ],
  scenetypes: "场景开关",
  currentTem: '查无结果',
  chooseCity: '请选择城市',
  searchWea: '搜索',
  gatewayMessage: '长按网关，显示该网关下设备',
  gatewayMessage1: '为您展现该网关下设备',
  gatewayMessage2: '您还没有创建任何分组',
  applySuccess: '应用成功',
  applyFailure: '应用失败',
  createSuccess: '创建成功',
  deleteSuccess: '删除成功',
  deleteFailure: '删除失败',
  deleteGroup: '删除分组',
  deleteGroupCertain: '您确定要删除该设备分组吗？',
  groupNameAlert: '设备组名不能为空',
  groupChanged: '场景修改成功',
  deleteScene: '删除场景',
  deleteSceneCertain: '您确定要删除该场景吗？',
  sceneNameAlert: '场景名不能为空',
  deviceNullAlert: '您还没有设备',
  attention: '注意',
  deviceAlert: '删除设备后网关将与设备断开连接，请您慎重选择!',
  devicerefresh: '正在刷新设备...',
}

module.exports = {
  Content: Chinese
}
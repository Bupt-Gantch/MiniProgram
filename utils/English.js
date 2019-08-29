var English = {
  register: "Register",
  button: "中文",
  mypublish: "Album",
  myfamily:"My Family",
  mynews: "Friends' Comments",
  feedback: "Feedback",
  scan: "Add Gateway",
  bindGateway: ['Scan', 'Input'],
  unBindGateway:['Simple','Deep'],
  deleteGateway: "Delete Gateway",
  refreshGateway: "Equipment connected to network",
  share: 'Sharing Gateway',
  unshare: 'Unshare Gateway',
  myfeedback: "If you have any suggessions,please contact me",
  search: "Search...",
  content: "What do you want to say...",
  comment: "Comment",
  submit: "Post",
  place: "Location",
  alldevice: "All equipment",
  del: 'Delete',
  delmes: 'Are you sure？',
  noGateway: 'No gateway',
  // categoryName: ['All', 'Bulb', 'Curtain', 'Socket', 'Monitor', 'Lock', 'Infrared', 'Sensor', 'Others'],
  categoryName: ['All', 'Bulb', 'Curtain', 'Socket', 'Lock', 'Infrared', 'Sensor', 'Others'],
  gatewayGroup: ['Gateways'],
  sceneGroup: ['Groups', 'Scenes'],
  categoryType: {
    'Bulb': ['dimmableLight', 'switch'],
    'Curtain': ['curtain'],
    'Socket': ['outlet'],
    // 'Monitor': ['monitor'],
    'Lock': ['lock'],
    'Infrared': ['infrared', 'newInfrared'],
    'Sensor': ['temperature', 'PM2.5', 'IASZone', 'lightSensor'],
    'Others': ['dimmableLight', 'curtain', 'switch'],
  },
  cores: [
    [{
        id: 'smartHome',
        name: 'Home',
        disabled: true,
        image: '/imgs/index/smartHome.png',
        // url: '../second/smarthome/smarthome'
        url: '../category/category'
      },
      {
        id: 'bigData',
        name: 'Big Data',
        disabled: true,
        image: '/imgs/index/bigData.png',
        url: '../home/home'
      },
      {
        id: 'smartHotel',
        name: 'Smart Hotel',
        disabled: true,
        image: '/imgs/index/smartHotel.png',
        url: '../second/hotel/hotel'
        // url: '../category/category'
      },
      {
        id: 'cloudAlert',
        name: 'Cloud Alert',
        disabled: true,
        image: '/imgs/index/cloudAlert.png',
        // url: '../second/alert/alert'
        url: '../category/category'
      },
      {
        id: 'cloudFireControl',
        name: 'Fire Control',
        disabled: true,
        image: '/imgs/index/cloudFireControl.png',
        // url: '../second/firecontrol/firecontrol'
        url: '../category/category'
      },
      {
        id: 'farm',
        name: 'Farm',
        disabled: true,
        image: '/imgs/index/farm.png',
        // url: '../second/farm/farm'
        url: '../category/category'
      },
      {
        id: 'safeCity',
        name: 'Safe City',
        disabled: true,
        image: '/imgs/index/safeCity.png',
        // url: '../second/s-city/s-city'
        url: '../category/category'
      },
      {
        id: 'smartCommunity',
        name: 'Community',
        disabled: true,
        image: '/imgs/index/smartCommunity.png',
        // url: '../second/community/community'
        url: '../category/category'
      },
      {
        id: 'smartSchool',
        name: 'School',
        disabled: true,
        image: '/imgs/index/smartSchool.png',
        // url: '../second/school/school'
        url: '../category/category'
      },
      {
        id: 'smartOld',
        name: 'Old',
        disabled: true,
        image: '/imgs/index/smartOld.png',
        // url: '../second/old/old'
        url: '../category/category'
      },
      {
        id: 'smartOffice',
        name: 'Office',
        disabled: true,
        image: '/imgs/index/smartOffice.png',
        // url: '../second/office/office'
        url: '../category/category'
      },
      {
        id: 'smartCity',
        name: 'Smart City',
        disabled: true,
        image: '/imgs/index/smartCity.png',
        // url: '../second/city/city'
        url: '../category/category'
      },
      {
        id: 'artificialIntelligence',
        name: 'AI',
        disabled: true,
        image: '/imgs/index/artificialIntelligence.png',
        // url: '../second/ai/ai'
        url: '../category/category'
      },
      {
        id: 'serviceSupport',
        name: 'Service',
        disabled: true,
        image: '/imgs/index/team.png',
        url: '../second/support/support'
      },
      {
        id: 'companyIntroduction',
        name: 'Sky Smart',
        disabled: true,
        image: '/imgs/index/company.png',
        url: '../second/company/company'
      },
      {
        id: 'videoInterface',
        name: 'Video',
        disabled: true,
        image: '/imgs/index/video.png',
        url: '../second/yingshi/yingshi'
      }
    ],
  ],
  scenetypes: "Others",
  currentTem: 'No answer',
  chooseCity: 'Select City',
  searchWea: 'Search',
  gatewayMessage: 'Long press gateway,display device',
  gatewayMessage1: 'Show devices under the gateway',
  gatewayMessage2: "You don't have any groups yet",
  applySuccess: 'Success',
  applyFailure: 'Failure',
  createSuccess: 'Create success',
  deleteSuccess: 'Delete success',
  deleteFailure: 'Delete Failure',
  deleteGroup: 'Delete group',
  deleteGroupCertain: 'Are you sure you want to delete the group?',
  groupNameAlert: "Device group name can't be null",
  groupChanged: 'Successfully changed',
  deleteScene: 'Delete Scene',
  deleteSceneCertain: 'Are you sure you want to delete the scene?',
  sceneNameAlert: "The scene name can't be null",
  deviceNullAlert: "You don't have equipment yet",
  attention: 'Attention',
  deviceAlert: 'Please choose carefully',
  devicerefresh: 'Refreshing...',

}

module.exports = {
  Content: English
}
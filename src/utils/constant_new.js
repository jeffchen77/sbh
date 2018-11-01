export let fmap = {
  // fmapId: 'xiaoi-office-001',
  fmapId: 'mainhuichang',
  appName: 'expo_main',
  key: '20559375c5d0ba663d19c10524e8a006'
};

export let device = {
  posi: {x:11870978.5468671, y: 3079506.71605951, groupID: 1}
};


export let wsServer = 'ws://192.168.150.115:11013';

export let currentGeo = {
  latitude: 106.648171,
  longitude:26.648907
}

export let QRUrl = 'http://qr.liantu.com/api.php?text=';
export let gaodeurl = 'http://uri.amap.com/navigation';
export let serverFmapUrl = 'http://222.85.147.140:10003/interface/map/navigate'; // 后台室内导航地图地址
export let baiduUrl = 'http://api.map.baidu.com/direction'; // 百度地图地址

export let currentBmap = {
  name:'国际会议生态中心',
  latitude: 106.64917,
  longitude:26.649168
}


export let hotPoint =[{name:'贵阳国际生态会议中心',lat:106.64917,lng:26.649168,address:'金阳新区中天路一号'},
  {name:'贵阳国际会议展览中心',lat:106.651852,lng:26.649457,address:'贵州省贵阳市观山湖区长岭北路1号'},
  {name:'贵阳龙洞堡机场',lat:106.807162,lng:26.549112,address:'贵阳市南明区机场路1号'},
  {name:'贵阳北站',lat:106.682134,lng:26.62631,address:'贵州省贵阳市观山湖区西二环高速公路附近'},
  {name:'中天凯悦酒店',lat:106.648985,lng:26.646769,address:'贵州省贵阳市观山湖区中天路7号 '},
  {name:'贵阳万丽酒店',lat:106.631992,lng:26.649843,address:'贵州省贵阳市观山湖区林城东路8号'},
  {name:'贵阳新世界酒店',lat:106.621455,lng:26.660147,address:'贵州省贵阳市观山湖区金朱西路1号'},
  {name:'世纪金源大饭店',lat:106.627882,lng:26.606687,address:'北京西路6号'},
  {name:'天怡豪生酒店',lat:106.703363,lng:26.592601,address:'贵州省贵阳市云岩区枣山路95号(临近黔灵公园北京路)'},
  {name:'凯宾斯基酒店',lat:106.724816,lng:26.581343,address:'贵州省贵阳市南明区护国路68号'}]

export let config = {
  // device0会场设备参数
  device0:{
    wsServer: 'ws://192.168.150.115:11013',
    fmapId: 'mainhuichang',
    appName: 'expo_main',
    key: '20559375c5d0ba663d19c10524e8a006',
    posi: {x: 11870978.5468671, y:3079506.71605951, groupID: 1},
    currentGeoL:{// 当前设备所在位置经纬度
      latitude: 106.648171,
      longitude:26.648907
    },
    hallGeo:{ // 会场经纬度
      latitude: 106.648171,
      longitude:26.648907
    },
    exihibitionGeo:{ // 展馆经纬度
      latitude: 106.642444,
      longitude:26.643857
    }
  },
  //device1 到 device6是展馆参数
  device1:{
    wsServer: 'ws://192.168.150.115:11013',
    fmapId: 'sbh-zg',
    appName: 'expo',
    key: 'af78e0ded625b8ec217cdbd41d6ee9e3',
    posi: {x: 11871465.530000001, y: 3079315.825, groupID: 1},
    currentGeoL:{// 当前设备所在位置经纬度
      latitude: 106.642444,
      longitude:26.643857
    },
    hallGeo:{ // 会场经纬度
      latitude: 106.648171,
      longitude:26.648907
    },
    exihibitionGeo:{ // 展馆经纬度
      latitude: 106.642444,
      longitude:26.643857
    }
  },
  device2:{
    wsServer: 'ws://192.168.150.115:11013',
    fmapId: 'sbh-zg',
    appName: 'expo',
    key: 'af78e0ded625b8ec217cdbd41d6ee9e3',
    posi: {x: 11871276.285, y: 3079320.275, groupID: 1},
    currentGeoL:{// 当前设备所在位置经纬度
      latitude: 106.642444,
      longitude:26.643857
    },
    hallGeo:{ // 会场经纬度
      latitude: 106.648171,
      longitude:26.648907
    },
    exihibitionGeo:{ // 展馆经纬度
      latitude: 106.642444,
      longitude:26.643857
    }
},
  device3:{
    wsServer: 'ws://192.168.150.115:11013',
    fmapId: 'sbh-zg',
    appName: 'expo',
    key: 'af78e0ded625b8ec217cdbd41d6ee9e3',
    posi: {x: 11871467.379999999, y: 3079368.795, groupID: 1},
    currentGeoL:{// 当前设备所在位置经纬度
      latitude: 106.642444,
      longitude:26.643857
    },
    hallGeo:{ // 会场经纬度
      latitude: 106.648171,
      longitude:26.648907
    },
    exihibitionGeo:{ // 展馆经纬度
      latitude: 106.642444,
      longitude:26.643857
    }
},
device4:{
  wsServer: 'ws://192.168.150.115:11013',
  fmapId: 'sbh-zg',
  appName: 'expo',
  key: 'af78e0ded625b8ec217cdbd41d6ee9e3',
  posi: {x: 11871465.530000001, y: 3079315.825, groupID: 1},
  currentGeoL:{// 当前设备所在位置经纬度
    latitude: 106.642444,
      longitude:26.643857
  },
  hallGeo:{ // 会场经纬度
    latitude: 106.648171,
      longitude:26.648907
  },
  exihibitionGeo:{ // 展馆经纬度
    latitude: 106.642444,
      longitude:26.643857
  }
},
device5:{
  wsServer: 'ws://192.168.150.115:11013',
  fmapId: 'sbh-zg',
  appName: 'expo',
  key: 'af78e0ded625b8ec217cdbd41d6ee9e3',
    posi: {x: 11871429.975000001, y: 3079329.075, groupID: 1},
  currentGeoL:{// 当前设备所在位置经纬度
    latitude: 106.642444,
      longitude:26.643857
  },
  hallGeo:{ // 会场经纬度
    latitude: 106.648171,
      longitude:26.648907
  },
  exihibitionGeo:{ // 展馆经纬度
    latitude: 106.642444,
      longitude:26.643857
  }
},
device6:{
  wsServer: 'ws://192.168.150.115:11013',
  fmapId: 'sbh-zg',
  appName: 'expo',
  key: 'af78e0ded625b8ec217cdbd41d6ee9e3',
    posi: {x: 11871343.245000001, y: 3079317.935, groupID: 1},
  currentGeoL:{// 当前设备所在位置经纬度
    latitude: 106.642444,
      longitude:26.643857
  },
  hallGeo:{ // 会场经纬度
    latitude: 106.648171,
      longitude:26.648907
  },
  exihibitionGeo:{ // 展馆经纬度
    latitude: 106.642444,
      longitude:26.643857
  }
}
}

export let deviceConfig = {
  getConfig: function (device) {
    return config[device]
  }
}

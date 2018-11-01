// export const wsServer = 'ws://192.168.160.40:11013';
export const wsServer = 'ws://192.168.150.199:11013';

//设备位置信息
export const device = {
  posiType: 'pavilion',//会场meeting，展馆pavilion，其他other，其他的显示室外地图
};

export const pavilions = {
  1: {
    start: {x: 11871297.63, y: 3079486.28, z: 6},
    desc: '1号馆国际综合馆'
  },
  2: {
    start: {x: 11871486.52, y: 3079479.86, z: 6},
    desc: '2号馆数字应用馆'
  },
  3: {
    start: {x: 11871293.49, y: 3079391.13, z: 6},
    desc: '3号馆前沿技术馆'
  },
  4: {
    start: {x: 11871487.69, y: 3079384.55, z: 6},
    desc: '4号馆数字硬件馆'
  },
  5: {
    start: {x: 11871289.56, y: 3079292.98, z: 6},
    desc: '号5馆国际双创馆'
  },
  6: {
    start: {x: 11871481.01, y: 3079287.04, z: 6},
    desc: '6号馆数字体验馆'
  }
};


export const fMap = {
  meeting: {
    type: 'meeting',
    mapId: 'mainhuichang',
    mapServerURL: 'static/fmap/mainhuichang',
    // defaultThemeName: 'mainhuichang',
    defaultThemeName: '650805',
    appName: 'expo_meeting',
    key: '58a4dee81d7a452839579c999af8536d',
    defaultVisibleGroups: [1, 2, 3],
    start: {x: 11870978.545, y: 3079506.715, z: 0, groupID: 1}
  },
  pavilion: {
    type: 'pavilion',
    mapId: 'sbh-zg',
    mapServerURL: 'static/fmap/sbh-zg',
    defaultThemeName: '938322',
    appName: 'expo_pavilion',
    key: '7a9aca30755016ba68e44c8b4b9173d1',
    defaultVisibleGroups: [1],
    start: {x: 11871383.7, y: 3079436.1849999996, z: 0, groupID: 1}
  }
};


export let meetingPlaces=[
  '宴会厅',
  '黄果树',
  '北门'
];
export let pavilionPlaces=[
  '小i机器人',
  'Facebook',
  '联想'


];

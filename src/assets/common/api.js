import axios from 'axios'

function _ajax(settings) {
  let config = {
    url: settings.url,
    method: settings.method || 'get', // default
    baseURL: 'http://ysfzser.ibdbots.com/api',
    error: settings.error,
    success: settings.success,
    transformResponse: [function (data) {
      return JSON.parse(data);
    }],
    params: settings.params || {},
    data: settings.data || {},
    timeout: 60000
  };
  axios(config)
    .then(res => {
      config.success(res.data)
    })
    .catch(err => {
      if (config.error) {
        config.error(err)
      } else {
        console.log(err)
      }
    })
}

//Ask接口，二开接口，智能问答接口
export function AskMap(question, layer, success) {
  let p = {
    question: question,
    userId: 'rean.ren',
    platform:'map'
  };
  if (layer !== 1) {
    p.location = 'f' + layer;
  }
  console.log(layer)
  console.log(p)
  axios.get('http://222.85.147.140:10003/sbh_robot/ask.do', {
    params: p
  }).then(res => {
    success(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//可以根据参会地址和会议名称查找会议信息
export function getMeeting(place, success) {
  axios.get('http://222.85.147.140:10003/interface/meeting/findByHallAlias', {
    params: {
      alias: place
    }
  }).then(res => {
    success(res.data)
  }).catch(err => {
    console.log(err)
  })
}


//可以根据企业名称查找活动信息
// http://localhost:8081/interface/activity/listByEntName?entName=%E5%B0%8Fi%E6%9C%BA%E5%99%A8%E4%BA%BA
export function getActivity(name, success) {
  axios.get('http://222.85.147.140:10003/interface/activity/listByEntName', {
    params: {
      entName: name
    }
  }).then(res => {
    success(res.data)
  }).catch(err => {
    console.log(err)
  })
}

//根据活动名称查找企业
// http://localhost:8081/interface/activity/listActivityByName?actName=%E5%93%81%E7%89%8C%E7%94%B5%E5%95%86%E5%88%86%E8%AE%BA%E5%9D%9B
export function getActivityVendor(name, success) {
  axios.get('http://222.85.147.140:10003/interface/activity/listActivityByName', {
    params: {
      actName: name
    }
  }).then(res => {
    success(res.data)
  }).catch(err => {
    console.log(err)
  })
}

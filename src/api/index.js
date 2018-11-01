var root = 'http://222.85.147.140:10003/interface'
var axios = require('axios')

function apiAxios (method, url, success, failure) {
  axios({
    method: method,
    url: url,
    baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      // if (res.data.code === 200) {
      success(res.data)
      // } else {
      // failure(res.data)
      // }
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        console.log('api error, HTTP CODE: ' + err.status)
      }
    })
}

export default {
  get: function (url, success, failure) {
    return apiAxios('GET', url, success, failure)
  },
  ask: function (question, success) {
    axios.get('http://222.85.147.140:10003/sbh_robot/ask.do', {
      params: {
        question: question,
        userId: 'sbh',
        platform: 'sbh'
      }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  askContent: function (question, content,success) {
    axios.get('http://222.85.147.140:10003/sbh_robot/ask.do', {
      params: {
        question: question,
        userId: '',
        platform: 'newdetail',
        content : content
      }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  detailAsk: function (question, success) {
    axios.get('http://222.85.147.140:10003/sbh_robot/ask.do', {
      params: {
        question: question,
        userId: 'sbh',
        platform: 'detail'
      }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  foodDetailAsk: function (question, success) {
    axios.get('http://222.85.147.140:10003/sbh_robot/ask.do', {
      params: {
        question: question,
        userId: 'sbh',
        platform: 'newdetail'
      }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  mapAsk: function (question, success) {
    axios.get('http://222.85.147.140:10003/sbh_robot/ask.do', {
      params: {
        question: question,
        userId: 'sbh',
        platform: 'map'
      }
    }).then(res => {
      success(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  callBaiduApi: function (accesstoken, imgdata, success, failure) {
    var params = new URLSearchParams();
    params.append('image', imgdata);
    axios({
      method: 'POST',
      url: 'general?access_token='+accesstoken,
      baseURL: 'https://aip.baidubce.com/rest/2.0/ocr/v1',
      withCredentials: false,
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(res => {
      success(res.data)
    }).catch(err => {
      failure(err)
    })
  }
}

import {AskMap} from "../common/api";

export function showStatus(status) {

  //todo dosomething
}

let lastVoiceStr = ''

let self={}
function init(obj){
  self=obj
}

export function showVoiceResult(text) {
  if (text != "") {
    if (lastVoiceStr != text) {
      lastVoiceStr = text;
      chat(text, self)
    }
  }
}


//旋转地图
function rotate() {
  if (self.map) {
    let rate = -180;
    let timer = setInterval(() => {
      self.map.rotateAngle = rate;
      rate += 3;
      if (rate === 180) {
        clearTimeout(timer);
        self.map.moveTo(self.start);
        addMark(self.start)
      }
    }, 16)//1000毫秒转180度
  }
}

function addMark(posi) {
  let groupLayer = self.map.getFMGroup(posi.groupID);
  groupLayer.addLayer(self.layer);

  let im = new fengmap.FMImageMarker({
    ...posi,
    url: '/static/images/fmap/star.svg',
    size: 32
  });

  self.layer.addMarker(im);

  groupLayer = null;
  im = null;
}

function chat(txt) {
  AskMap(txt, (res) => {
    console.log(res)
    if (res.type === -1) {
      return
    }
    if (res.type === 'map3d') {
      self.map3D = res.mode === '3D';
      self.map3DChange(self.map3D);
      self.pushMsg(`已为您切换地图`, 'left');
      return;
    }
    if (res.type === 'layer') {
      self.mapMultiLayer = res.mode === 'multi';
      self.multiLayerChange(self.mapMultiLayer);
      self.pushMsg(`已为您切换地图`, 'left');
      return;
    }
    if (res.type === 'group') {
      self.map.focusGroupID = res.mode;
      self.pushMsg(`已为您切换地图`, 'left');
      return;
    }

    if (res.question) {
      self.pushMsg(res.question, 'right');
      setTimeout(() => {
        self.pushMsg(res.content, 'left')
      }, 1000);
    }


  }, txt)
}


function search(keyword, isMark = true) {
  if (!self.loadComplete) return;

  if (self.navi) {
    self.navi.clearAll();
  }
  self.layer.removeAll();


  let searchAnalyser = self.map.searchAnalyser;
  let searchReq = new fengmap.FMSearchRequest();
  searchReq.name(keyword);

  let p = null, im = null, groupLayer = null;
  let r = [];
  searchAnalyser.query(searchReq, function (request, result) {
    let e = null;

    for (let i = 0; i < result.length; i++) {
      e = result[i];
      if (e.nodeType === 5) {

        p = {x: e.mapCoord.x, y: e.mapCoord.y, groupID: e.groupID};
        console.log(p)

        r.push(p);
        if (isMark) {
          im = new fengmap.FMImageMarker({
            ...p,
            url: '/static/images/fmap/mark.png',
            size: 64
          });

          groupLayer = self.map.getFMGroup(e.groupID);
          if (!groupLayer) return;
          groupLayer.addLayer(self.layer);
          self.layer.addMarker(im);
        }
      }
    }
    e = null;
  });

  im = null;
  groupLayer = null;

  return r;
}

function navigate(end, isDraw = true) {

  if (!self.navi) {
    self.navi = new fengmap.FMNavigation({
      map: self.map,
      locationMarkerUrl: '/static/images/fmap/pointer.png',
      tiltAngle: 80,
      scaleLevel: 0,
      followPosition: true,
      followAngle: true,

      lineStyle: {
        type: fengmap.FMLineType.FMARROW,   // 导航线样式
        lineWidth: 10,
        // godColor: '#FF0000',
        // godEdgeColor: '#4a82d2',
      }
    });
  }
  self.navi.clearAll();
  self.layer.removeAll();

  self.navi.setStartPoint({
    ...self.start,
    url: '/static/images/fmap/start.png',
    size: 64
  });

  self.navi.setEndPoint({
    ...end,
    url: '/static/images/fmap/end.png',
    size: 64
  });

  //如果有回调函数就不绘制导航线
  if (isDraw) {
    self.navi.drawNaviLine();
  }
  // self.navi.simulate();
  console.log(self.navi.naviDescriptions)
  return self.navi.naviDescriptions
}

export let meetingService = {
  rotate, chat, search, showStatus, showVoiceResult,addMark,init
  , navigate
};

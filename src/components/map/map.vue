<template>
  <div>
    <div id="map" class="map"></div>

    <div class="rwnv">
      <ul class=" animated fadeIn" v-if="showLayer">
        <li @click="changeMultiLayer"><span style="padding:10px 0 0"><img src="/static/map/layer.svg" height="60"
                                                                          width="60"></span></li>
      </ul>

      <ul class=" animated fadeIn" v-if="showLayer">
        <li v-for="f in floors" :class="{cur:f.cur}" @click="changeLayer(f)"> {{f.name}}</li>
      </ul>
      <ul>
        <li @click="exitMap"><span style="padding:10px 0 0"><img src="/static/map/jbtai.png"></span></li>
      </ul>
    </div>

    <div class="mpnav">
      <span class="var">当前地图：<span id="mapName">{{curPosi}}</span>
        <i class="juit" :class="{up:showMenu}" @click="showMenu=true"></i>
      </span>
      <div class="mpsel animated fadeInUp" v-if="showMenu">
        <ul>
          <li v-for="m of maps" @click="changeMap(m.type,m.no)">{{m.name}} <span v-if="m.cur">（当前位置）</span></li>
        </ul>
      </div>
    </div>

    <div class="voice_circle active">
      <img src="/static/index/images/ic_voice.png">
      <div class="voicerun voicerun1"></div>
      <div class="voicerun voicerun2"></div>
      <div class="voicerun voicerun3"></div>
      <div class="normalline">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="activeline">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {deviceConfig, QRUrl, serverFmapUrl} from '../../utils/constant'
  import Vue from 'vue'
  import service from './modal/service'
  import activity from './modal/activity'
  import meeting from './modal/meeting'
  import meetingNone from './modal/meeting-none'
  import {getActivity, getMeeting} from "../../assets/common/api";
  import {device, fMap, pavilions} from "../../assets/common/constant";

  export default {
    name: 'map-core',
    computed: {},
    data() {
      return {
        map: null,
        loadComplete: false,
        layer: new fengmap.FMImageMarkerLayer(),
        navi: null,
        popWindowArry: [],
        node: null,
        animation: false,
        currentDevice: deviceConfig.getConfig(this.$root.device),
        naviTime: 10,
        showMenu: false,
        showLayer: false,
        mapParam: '',
        floors: [
          {cur: false, name: 'F3', index: 3},
          {cur: false, name: 'F2', index: 2},
          {cur: true, name: 'F1', index: 1}],
        changeCallback: null,
        maps: [
          {type: 'pavilion', no: 1, cur: false, name: '1号馆国际综合馆'},
          {type: 'pavilion', no: 2, cur: false, name: '2号馆数字应用馆'},
          {type: 'pavilion', no: 3, cur: false, name: '3号馆前沿技术馆'},
          {type: 'pavilion', no: 4, cur: false, name: '4号馆数字硬件馆'},
          {type: 'pavilion', no: 5, cur: false, name: '5号馆国际双创馆'},
          {type: 'pavilion', no: 6, cur: false, name: '6号馆数字体验馆'},
          {type: 'meeting', no: 1, cur: true, name: '国际生态会议中心'},
        ],
        curPosi: '国际生态会议中心'
      }
    },
    methods: {
      navigateToName(name) {
        let self = this;
        if (!self.loadComplete) return;
        let searchAnalyser = self.map.searchAnalyser;
        let searchReq = new fengmap.FMSearchRequest();
        searchReq.name(name);
        searchAnalyser.query(searchReq, function (request, result) {
          let e = null;
          for (let i = 0; i < result.length; i++) {
            e = result[i];
            if (e.nodeType === 5) {
              self.navigateTo({...e.mapCoord, groupID: e.groupID});
            }
          }
        });
      },
      navigateTo(end) {
        if (!this.loadComplete) return;
        let self = this;
        self.navi.clearAll();

        let start = {...self.mapParam.start, groupID: 1};

        self.navi.setStartPoint({
          x: start.x, y: start.y, groupID: start.groupID,
          url: '/static/images/fmap/start.png',
          size: 32
        });
        self.navi.setEndPoint({
          x: end.x, y: end.y, groupID: end.groupID,
          url: '/static/images/fmap/end.png',
          size: 32
        });
        self.navi.drawNaviLine();
      },
      getNaviDist(end) {
        if (!this.loadComplete) return;
        let self = this;
        self.navi.clearAll();

        let start = {...self.mapParam.start, groupID: 1};
        self.navi.setStartPoint({
          x: start.x, y: start.y, groupID: start.groupID,
        });
        self.navi.setEndPoint({
          x: end.x, y: end.y, groupID: end.groupID,
        });
        return self.navi.naviDistance;
      },
      afterCycle: function (cycle) {
        var self = this;
        if (cycle) {
          clearInterval(cycle);
        }
        self.map.moveTo(self.mapParam.start);
        if (typeof self.changeCallback === 'function') {
          self.changeCallback();
          self.changeCallback = null;
        }
      },
      rotateMap: function () {
        let self = this;
        // if (self.map) {
        //   let rate = -180;
        //   let cycle = window.setInterval(function () {
        //     self.map.rotateAngle = rate;
        //     rate = rate + 3;
        //     if (rate >= 180) {
        //       self.afterCycle(cycle);
        //     }
        //   }, 16);
        // }
        self.afterCycle();
      },
      init(location) {
        let self = this
        if (self.map) {
          if (self.navi) {
            self.navi.clearAll();
          }
          self.layer.removeAll();
          self.animate = true
          console.log('device location:', location)
          self.addMyMarker(location)
        }
      },
      addComMarker(coord) {
        if (!this.loadComplete) return;
        let self = this, groupLayer = null;
        groupLayer = self.map.getFMGroup(1);
        if (!groupLayer) return;
        self.layer = groupLayer.getOrCreateLayer('imageMarker');
        groupLayer.addLayer(self.layer);
        console.log('addmarker', coord)
        var im = new fengmap.FMImageMarker({
          name: '',
          x: coord.x,
          y: coord.y,
          url: '/static/images/fmap/mark.png',
          //设置图片路径
          size: 32,
          //设置图片显示尺寸
          callback: function () {
            im.alwaysShow();
          }
        });
        self.layer.addMarker(im);
      },
      addMyMarker(coord) {
        if (!this.loadComplete) return;
        let self = this, groupLayer = null;
        groupLayer = self.map.getFMGroup(1);
        if (!groupLayer) return;
        self.layer = groupLayer.getOrCreateLayer('imageMarker');
        groupLayer.addLayer(self.layer);
        console.log('addmarker', coord)
        var im = new fengmap.FMImageMarker({
          name: '我的位置',
          x: coord.x,
          y: coord.y,
          url: '/static/images/mapdw.png',
          //设置图片路径
          size: 64,
          //设置图片显示尺寸
          callback: function () {
            im.alwaysShow();
            if (self.animation) {
              var jump = im.jump({
                times: 3,
                duration: 1,
                delay: 0.5,
                height: 5
              });
            }
          }
        });
        self.layer.addMarker(im);
        self.animation = false;
      },
      handleName(name, opearation) {
        let self = this;
        if (!self.loadComplete) return;
        let searchAnalyser = self.map.searchAnalyser;
        let searchReq = new fengmap.FMSearchRequest();
        searchReq.name(name);
        let place = '';
        searchAnalyser.query(searchReq, function (request, result) {
          let e = null;
          for (let i = 0; i < result.length; i++) {
            e = result[i];
            if (e.nodeType === 5 || e.nodeType === 12) {
              console.log(e);
              switch (opearation) {
                case 'navi': {
                  self.navigateTo({...e.mapCoord, groupID: e.groupID});
                  return;
                }
                case 'showWindow': {
                  self.showWindow({
                    name: e.name,
                    coord: {
                      ...e.mapCoord,
                      groupID: e.groupID
                    }
                  });
                  return;
                }
                case 'mark': {
                  // self.showWindow({
                  //   name: e.name,
                  //   coord:{
                  //     ...e.mapCoord,
                  //     groupID: e.groupID
                  //   }
                  // });
                  if (e.groupID === self.map.focusGroupID) {
                    self.addComMarker(e.mapCoord);
                  }
                  break;
                }
                case 'get': {
                  place = {
                    name: e.name,
                    coord: {
                      ...e.mapCoord,
                      groupID: e.groupID
                    }
                  };
                  break;
                }
              }
            }
          }
        });

        return place;
      },
      showMeeting(info) {
        let self = this;
        self.closePopWindow();

        if (!info.coord) {
          let place = self.handleName(info.alias, 'get');
          info.coord = place.coord;
        }

        self.popWindow(info.coord.x, info.coord.y, info.coord.groupID, 540, 600, `<div><div id="pop"></div></div>`);
        self.map.moveTo(info.coord);
        let M = Vue.extend(meeting);
        let m = new M();
        m.meetingInfo = info;
        m.place = info.alias;
        m.$mount('#pop');
        new Audio('/static/map/tip.mp3').play();
        self.bindNaviComplete(m, info);
      },
      showActivity(info){
        let self = this;
        self.closePopWindow();

        if (!info.coord) {
          let place = self.handleName(info.name, 'get');
          info.coord = place.coord;
        }

        self.popWindow(info.coord.x, info.coord.y, info.coord.groupID, 540, 600, `<div><div id="pop"></div></div>`);
        self.map.moveTo(info.coord);
        let M = Vue.extend(meeting);
        let m = new M();
        m.meetingInfo = info;
        m.place = info.alias;
        m.$mount('#pop');
        new Audio('/static/map/tip.mp3').play();
        self.bindNaviComplete(m, info);
      },
      bindNaviComplete(component, info) {

        let self = this;
        let qrurl = serverFmapUrl
          + '?fmapId='
          + self.mapParam.mapId
          + '%26startX='
          + self.mapParam.start.x
          + '%26startY='
          + self.mapParam.start.y
          + '%26startFloor='
          + self.mapParam.start.groupID +
          '%26endX='
          + info.coord.x
          + '%26endY='
          + info.coord.y
          + '%26endFloor='
          + info.coord.groupID;

        component.QrSrc = QRUrl + qrurl;
        self.chatComponent.nextTask = component.go = () => {
          if(device.posiType===self.mapParam.type){
            self.navigateTo({...info.coord});
            self.navi.simulate();
            self.naviComplete = function () {
              component.showQrcode = true;
            };
          }else{
            if(device.posiType==='meeting'){
              self.chatComponent.exitMap('navi','国际会议展览中心')
            }else{
              self.chatComponent.exitMap('navi','国际生态会议中心')
            }
          }
        };
      },
      showWindow(node) {
        this.closePopWindow();
        let self = this;
        if (['洗手间', '男洗手间', '女洗手间', '厕所', '服务台', '电梯', '楼梯', '直升电梯', '步行梯'].indexOf(node.name) >= 0) {
          let dist = this.getNaviDist(node.coord);
          self.closePopWindow();
          self.popWindow(node.coord.x, node.coord.y, node.coord.groupID, 700, 388, `<div><div id="pop"></div></div>`);
          self.map.moveTo(node.coord);

          let M = Vue.extend(service);
          let m = new M();
          m.$mount('#pop');
          m.dist = self.getNaviDist(node.coord);
          m.place = node.name;
          new Audio('/static/map/tip.mp3').play();
          self.bindNaviComplete(m, node);

        } else if (self.mapParam.type === 'meeting') {
          getMeeting(node.name, (res) => {
            let height = 388;
            let m = null;

            if (res.theme) {
              height = 572;
              let M = Vue.extend(meeting);
              m = new M();
              m.meetingInfo = res;
            } else {
              let M = Vue.extend(meetingNone);
              m = new M();
            }
            self.popWindow(node.coord.x, node.coord.y, node.coord.groupID, 540, height, `<div><div id="pop"></div></div>`);
            self.map.moveTo(node.coord);
            m.place = node.name;
            m.$mount('#pop');

            new Audio('/static/map/tip.mp3').play();
            self.bindNaviComplete(m, node);
          })

        } else if (self.mapParam.type === 'pavilion') {
          getActivity(node.name, (res) => {
            let m = null;

            if (res.list.length > 0) {
              let M = Vue.extend(activity);
              m = new M();
              m.meetingInfo = {
                theme: res.list[0].name,
                time: res.list[0].time
              };
            } else {
              let M = Vue.extend(meetingNone);
              m = new M();
            }

            self.popWindow(node.coord.x, node.coord.y, node.coord.groupID, 540, 388, `<div><div id="pop"></div></div>`);
            self.map.moveTo(node.coord);
            m.place = node.name;
            m.$mount('#pop');
            new Audio('/static/map/tip.mp3').play();
            self.bindNaviComplete(m, node);
          });
        }
      },

      popWindow(x, y, groupID, w, h, content) {
        if (!this.loadComplete) return;
        let self = this
        //信息框控件大小配置
        var ctlOpt = new fengmap.controlOptions({
          mapCoord: {
            //设置弹框的x轴
            x: x,
            //设置弹框的y轴
            y: y,
            //设置弹框位于的楼层
            groupID: groupID
          },
          //设置弹框的宽度
          width: w,
          //设置弹框的高度
          height: h,
          //设置弹框的内容
          content: content,
          // marginTop: -50,
          padding: 1,
          zindex: 4
        });
        var popMarker = new fengmap.FMPopInfoWindow(self.map, ctlOpt);
        self.popWindowArry.push(popMarker)
      },
      closePopWindow() {
        let self = this;
        self.showNaviInfo = false;
        if (self.popWindowArry.length == 0) {
          return;
        }
        try {
          self.popWindowArry.forEach((e, index) => {
            e.close();
          });
        }
        catch (e) {

        }
        self.popWindowArry = []
      },
      changeMap(type, number) {
        this.showMenu = false;
        let self = this;

        self.changeCallback = () => {
          if (self.mapParam.type === 'meeting') {
            self.floors.forEach(e => {
              e.cur = e.index == number;
            });
            self.curPosi = '国际生态会议中心';
          } else {
            self.map.moveTo(pavilions[number].start);
            self.curPosi = '国际会议展览中心';
            // self.curPosi=pavilions[number].desc;
          }
        };

        if (self.mapParam.type !== type) {
          this.mapParam = fMap[type];
          this.initMap();
        } else {
          if (typeof  self.changeCallback === 'function') {
            self.changeCallback();
            self.changeCallback = null
          }
        }
      },
      //加载地图
      initMap() {
        if (!this.mapParam) {
          return
        }
        $('#map').html('');
        let self = this;
        self.showLayer = false;
        if (self.map) {
          self.map.dispose();
        }

        let obj = {
          ...this.mapParam,
          mapThemeURL: 'static/fmap/theme',
          container: document.getElementById('map'),
          defaultViewMode: fengmap.FMViewMode.MODE_3D,
          moveToAnimateMode: true,
          naviLineAnimation: true,
          // focusAlphaMode: true,
          defaultMapScaleLevel: 20,
          defaultFocusGroup: 1,

          focusAlpha: 0.3,
          defaultControlsPose: fengmap.FMDirection.EAST,
          // 开启2维，3维切换的动画显示
          viewModeAnimateMode: true,
          // 设置倾斜角，默认倾斜角为60度
          defaultTiltAngle: 30,
          // lazyCreateMode: true
        };
        let map = new fengmap.FMMap(obj);

        self.map = map;
        map.openMapById(obj.mapId, err => {
          console.log(err)
        });

        map.on('mapClickNode', function (event) {
          self.closePopWindow();
          console.log(event);
          console.log(event.name, '-', event.nodeType);

          if (event.name && event.target) {
            if (event.nodeType === fengmap.FMNodeType.MODEL) {
              if (event.name) {
                self.showWindow({
                  name: event.name,
                  coord: {
                    ...event.mapCoord,
                    groupID: event.groupID
                  }
                })
              }
            }
          }
        });

        map.on('loadComplete', function (event) {
          self.loadComplete = true;
          self.rotateMap();
          if (obj.mapId === 'mainhuichang') {
            self.showLayer = true;
          }

          self.navi = new fengmap.FMNavigation({
            map: self.map,
            locationMarkerUrl: '/static/fmap/imgs/pointer.png',
            //设置Marker尺寸
            locationMarkerSize: 20,
            speed: 15,
            changeTiltAngle: false,
            //设置地图是否选择，默认false
            followAngle: true,
            //导航跟随倾斜角度
            tiltAngle: 80,
            //导航跟随显示级别
            scaleLevel: 1,

            lineStyle: {
              type: fengmap.FMLineType.FMARROW,   // 导航线样式
              lineWidth: 6,
              // godColor: '#FF0000',
              // godEdgeColor: '#4a82d2',
            }
          });

          // 设置导航事件
          self.navi.on('walking', function (data) {
            self.chatComponent.showNaviInfo = true;

            let distance = data.remain;
            let prompt = self.navi.naviDescriptions[data.index];

            if (distance < 1) {
              distance = 0;
              prompt = '到达终点';
            }
            //普通人每分钟走80米。
            let time = distance / 80;
            let m = parseInt(time);
            let s = Math.floor((time % 1) * 60);

            self.$parent.$refs.chat.naviInfo = {
              dist: distance.toFixed(1),
              time: m + '  分钟   ' + s + '   秒',
              currentRoute: prompt
            };
          });

          //导航路径结束事件
          self.navi.on('complete', function () {
            if (typeof self.naviComplete === 'function') {
              self.naviComplete();
            }
            self.$parent.$refs.chat.pushMsg(self.navi.naviDescriptions.join(','), 'left', false)
          });

        })
      },
      exitMap() {
        this.$router.push({name: 'index'})
      },
      changeLayer(f) {
        this.closePopWindow();
        this.floors.forEach(e => {
          e.cur = false
        });
        f.cur = true;
        if (this.map) {
          this.map.focusGroupID = f.index;
        }
      },
      changeMultiLayer() {
        if (this.map) {
          if (this.map.visibleGroupIDs.length === 1) {
            this.map.visibleGroupIDs = [1, 2, 3]
          } else {
            this.map.visibleGroupIDs = [this.map.focusGroupID]
          }
        }
      }
    },
    mounted() {
      this.mapParam = fMap[device.posiType];
      this.initMap();
      this.chatComponent = this.$parent.$refs.chat;
    }
  }
</script>

<style>
  .map {
    width: 1080px;
    height: 1420px;
  }

  .voice_circle {
    bottom: -105px;
    right: 15px;
  }

  .fm-control-popmarker {
    background-color: transparent !important;
    border: 0px !important;
  }

  .fm-control-popmarker > input[type="button"] {
    display: none;
  }

  .fm-control-popmarker > div {
    overflow: hidden !important;
  }

  .fm-control-popmarker-top {
    display: none;
  }

  .fm-control-popmarker-bot {
    display: none;
  }

</style>

<template>
  <div id="mapav-container" class="map clearfix" style="width: 1037px; height: 1578px;"></div>
</template>

<script>
  /* eslint-disable */

  import {deviceConfig} from '../../utils/constant'

export default {
  name: '',
  data () {
    return {
      map: null,
      loadComplete: false,
      layer: new fengmap.FMImageMarkerLayer(),
      navi: null,
      popWindowArry: [],
      animation: false,
      currentDevice: deviceConfig.getConfig(this.$root.device)
    }
  },
  methods: {
    changePav (point) {
      let self = this
      if (!self.loadComplete) return;
      if (self.layer) self.layer.removeAll();
      var pnt = {
        x:point.x,
        y:point.y,
        grougID:1,
        callback:function(){
          //跳转中心点完成
          console.log(point)
        }
      };
      console.log('move to center:',pnt)
    //跳转
    //   self.map.moveTo(pnt);
      // self.map.mapScaleLevel = 20;
    },
    coormpToScreen(x, y){
      let self = this, scree

      scree = self.map.coordMapToScreen(x,y,0)
      console.log('screen ',scree)
      return scree
    },
    searchById(id) {
      let self = this;
      let searchAnalyser = self.map.searchAnalyser;
      let searchReq = new fengmap.FMSearchRequest();
      searchReq.ID(id);
      let p = null
      searchAnalyser.query(searchReq, function (request, result) {
        let e = null;
        if(result.size>0) {
          e = result[0];
          p = {x: e.mapCoord.x, y: e.mapCoord.y};
        }
      })
      return p
    },
    search(keyword) {
      let self = this;
      if (!self.loadComplete) return;
      let searchAnalyser = self.map.searchAnalyser;
      let searchReq = new fengmap.FMSearchRequest();
      searchReq.keyword(keyword);
      searchAnalyser.query(searchReq, function (request, result) {
        let e = null;
        for (let i = 0; i < result.length; i++) {
          e = result[i];
          console.log(e)
          if (e.nodeType === 5) {
            self.addComMarker(e.mapCoord)
          }
        }
      });
    },
    navigateTo(start,end) {
      if (!this.loadComplete) return;

      let self = this;

      if (!self.navi) {
        self.navi = new fengmap.FMNavigation({
          map: self.map,
          locationMarkerUrl: '/static/fmap/imgs/pointer.png',
          //设置Marker尺寸
          locationMarkerSize: 20,
          speed:3,
          changeTiltAngle:false,
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
      }
      self.navi.clearAll();

      self.navi.setStartPoint({
        x:start.x,y:start.y,groupID:start.groupID,
        url: '/static/images/fmap/start.png',
        size: 32
      });

      self.navi.setEndPoint({
          x:end.x,y:end.y,groupID:end.groupID,
        url: '/static/images/fmap/end.png',
        size: 32
      });
      self.navi.drawNaviLine();
    },
    naviSimulate() {
      let self = this
      self.navi.simulate();
    },
    afterCycle: function(cycle){
      var self = this;
      if(cycle){
        clearInterval(cycle);
      }
      self.map.moveTo(self.currentDevice.posi)
    },
    rotateMap : function () {
      let self = this
      if (self.map) {
      var rate = -180;
      var cycle = window.setInterval(function(){
        self.map.rotateAngle = rate;
        rate = rate + 5;
        if(rate == 180){
          self.afterCycle(cycle);
        }
      },100);
      }
    },
    init(location) {
      let self = this
      if (self.map) {
        if (self.navi) {
          self.navi.clearAll();
        }
        self.layer.removeAll();
        self.animate = true
        console.log('device location:',location)
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
        callback: function() {
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
      callback: function() {
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
    popWindow(x, y, w, h,content){
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
          groupID: 1
        },
        //设置弹框的宽度
        width: w,
        //设置弹框的高度
        height: h,
        //设置弹框的内容
        content: content,
        marginTop:-50,
        padding:1,
        zindex:4
      });
      var popMarker = new fengmap.FMPopInfoWindow(self.map, ctlOpt);
      self.popWindowArry.push(popMarker)
    },
    closePopWindow(){
      let self = this
      if(self.popWindowArry.length==0) {
        return;
      }
      self.popWindowArry.forEach((e,index) => {
        e.close();
      });
      self.popWindowArry = []
    },
    closeOtherPopWindow(x,y) {
      let self = this
      if (self.popWindowArry.length == 0) {
        return;
      }
      var curPop = null
      self.popWindowArry.forEach((e, index) => {
        console.log(x,y)
        if(x==e.mapCoord_.x&&y==e.mapCoord_.y){
          console.log("select pop window")
          curPop = e
        }else{
          e.close();
        }
      });
      self.popWindowArry = []
      self.popWindowArry.push(curPop)
    }
  },
  activated() {
    let self = this
    if(self.loadComplete) {
      self.rotateMap()
    }
  },
  mounted () {
    let self = this
    let map = new fengmap.FMMap({
      mapServerURL: 'static/fmap/' + self.currentDevice.fmapId,
      mapThemeURL: 'static/fmap/theme',
      defaultThemeName: '650805',

      container: document.getElementById('mapav-container'),
      appName: self.currentDevice.appName,
      key: self.currentDevice.key,
      defaultViewMode: fengmap.FMViewMode.MODE_3D,
      moveToAnimateMode: true,
      naviLineAnimation: true,
      // focusAlphaMode: true,
      defaultMapScaleLevel: 20,
      defaultFocusGroup: 1,
      defaultVisibleGroups: [1],
      focusAlpha: 0.5,
      defaultControlsPose: fengmap.FMDirection.EAST,
      // 开启2维，3维切换的动画显示
      viewModeAnimateMode: true,
      // 设置倾斜角，默认倾斜角为60度
      defaultTiltAngle: 30,
      lazyCreateMode:true
    })

    self.map = map
    map.openMapById(self.currentDevice.fmapId, err => {
      console.log(err)
    })

    map.on('mapClickNode', function (event) {
      console.log(event)
      if(event.target == null || event.name == undefined ||event.name == null || event.name == ''){
        self.$emit('show-enterprise', 'unshowall')
        return;
      }

      self.$emit('show-enterprise', 'close')
      console.log(event.name,'-',event.nodeType)
      if (event.nodeType === fengmap.FMNodeType.MODEL) {
        if (event.name) {
          self.$emit('show-enterprise', {
            name: event.name,
            loc: {
              x: event.mapCoord.x,
              y: event.mapCoord.y,
              groupID: event.groupID
            },
            fid: event.FID,
            id: event.ID
          })
        }
      }
    })

    map.on('loadComplete', function (event) {
      self.loadComplete = true
      self.$emit('show-enterprise', 'loadComplete')
      console.log('loadComplete',event)
      self.rotateMap()

    })
  }
}
</script>

<style >

</style>

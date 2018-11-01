<template>
  <div class="map-box-outer">
    <div class="map-box" style="width: 1080px;height: 1578px;z-index: 7;margin-left: -522px;">
      <div class="map-close" v-on:click="close"><img src="static/images/edg2.png"></div>
      <div id="map-container" style="width: 1080px; height: 1578px;"></div>
      <div class="maptot"><em></em>当前地图：国际会议中心分会场</div>
      <div class="mst">
        <div class="msti"></div>
        <div class="msbi"></div>
        <div class="msci">
          <ul>
            <li v-bind:class="{cur: normalTab}"  v-on:click="changeType(1, false)">
              <i class="mic1"></i>普通视图
            </li>
            <li  v-bind:class="{cur: topicTab} "v-on:click="changeType(2, true)">
              <i class="mic2"></i>论坛视图
            </li>
            <li v-bind:class="{cur: serviceTab}" v-on:click="changeType(3, true)">
              <i class="mic3" ></i>服务视图
            </li>
          </ul>
        </div>
      </div>
      <div class="mrb">
        <p><img v-on:click="openChat" src="static/images/mapyuying.png"></p>
        <div class="muir">
          <div class="mrti"></div>
          <div class="mrbi"></div>
          <div class="mrci" style="height:160px">
            <ul>
              <li class="zg1" v-on:click="selectMapBox()">展馆</li>
              <li class="zg2 cur">会场</li>
            </ul>
          </div>
        </div>
        <p class="mt20"><img src="static/images/mweizi.png"></p>
      </div>
      <div class="ipimg" style="position:absolute; top:600px; left:300px; " id="hallInfo">
        <div class="ind"><img src="static/images/maplind.png"></div>
        <div class="ipbg"></div>
        <div class="iti"></div>
        <div class="ibi"></div>
        <div class="ici">
          <div class="mtx">
            <p class="tit" align="center">国际会议中心分会场</p>
            <p align="center" class="mt10">大数据、人工智能峰会</p>
          </div>
        </div>
      </div>
      <div id="infoTemplate"  style="display: none;">
        <div class="popuoter">
          <div class="popinner">
            <div class="ipimg ipimg2">
              <div class="ind"><img src="static/images/maplind.png"></div>
              <div class="ipbg"></div>
              <div class="iti"></div>
              <div class="ibi" style="z-index: -1;"></div>
              <div class="ici" style="height: 260px;">
                <div class="zt zt1" id="status">即将开始</div>
                <div class="mtx">
                  <p class="tit" align="center" id="title" style="font-size: 28px; color: #1debff; overflow: hidden; white-space: nowrap;">人工智能+电商论坛</p>
                  <p class="userimg mt15" id="guests">
                  </p>
                  <p class="mt15" align="center" id="duration" style="color: white;">时间：14:00-15:00</p>
                </div>
              </div>
            </div>
            <div class="mapfer">
              <p><img src="/static/images/merm.png" class="=qr_img" style="height: 140px; width: 140px;"></p>
              <p class="mt10">手机扫码查看路线规划</p>
            </div>
          </div>
        </div>
      </div>
      <div id="serviceTemplate" style="display: none;">
        <div class="serviceDialogouter">
          <div class="mapfer mapfer2" style="position: absolute; left: -186px; top: 0px;">
            <p><img src="/static/images/merm.png"  style="height: 140px; width: 140px;"></p>
            <p class="mt10">手机扫码查看路线规划</p>
          </div>
          <div class="ipimg ipimg2">
            <div class="ind"><img src="static/images/maplind.png"></div>
            <div class="ipbg"></div>
            <div class="iti"></div>
            <div class="ibi"></div>
            <div class="ici" style="height: 110px;">
              <div class="mtx">
                <p class="tit" align="center" id="service_title">卫生间</p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div id="normalTemplate"  style="display: none;">
        <div class="normalPopuoter">
          <div class="normalPopinner">
            <div class="mapfer mapfer1" style="position: absolute; left: -186px; top: 0px;">
              <p><img src="/static/images/merm.png"  style="height: 140px; width: 140px;"></p>
              <p class="mt10">手机扫码查看路线规划</p>
            </div>
            <div class="ipimg ipimg2">
              <div class="ind"><img src="static/images/maplind.png"></div>
              <div class="ipbg"></div>
              <div class="iti"></div>
              <div class="ibi"></div>
              <div class="ici">
                <div class="mtx">
                  <p class="tit" align="center" style="height: 115px;">会场：B会议厅</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sbt-map-chat v-if="chatBox"></sbt-map-chat>
    <sbtMeetingDetailsBox :meetingInfo="meetingInfo" v-if="showdetail" @fireClose="afterMeetingDetailClose()" style="z-index: 10"></sbtMeetingDetailsBox>
    <stb-hall-detail-box :branchHallInfo="hallDetailInfo" v-if="showHallDetail"  style="z-index: 8"  @fireClose="afterHallDetailClose()" ></stb-hall-detail-box>
  </div>
</template>

<script>
import {device, fmap, deviceConfig, QRUrl, gaodeurl, serverFmapUrl} from '../../utils/constant'
import SbtMapChat from '@/components/sbt/sbt-mapChat.vue'
import Vue from 'vue'
import sbtMeetingDetailsBox from '@/components/sbt/sbt-MeetingDetailsBox'
import stbHallDetailBox from '@/components/sbt/sbt-BranchHallDetailBox.vue'
export default {
  name: "map-core",
  props: [
    'mapdata'
  ],
  components: { SbtMapChat,sbtMeetingDetailsBox, stbHallDetailBox },
  data() {
    return {
      map: null,
      fmapId:fmap.fmapId,
      loadComplete: false,
      floor: deviceConfig.getConfig(this.$root.device).posi.groupID,
      start: deviceConfig.getConfig(this.$root.device).posi,
      layer:null,
      navi: null,
      windowInfos:new Map(),
      normalTab:true,
      topicTab:false,
      serviceTab: false,
      homeIndex: true,
      chatBox: false,
      showdetail:false,
      meetingInfo:{},
      showAllTopic: true, // 楼层切换的时候是否展示所有论坛对话
      showHallDetail: false,
      hallDetailInfo:{},
      currentDevice: deviceConfig.getConfig(this.$root.device),
    }
  },
  methods: {
    selectMapBox: function () {
      var self = this;
      self.$emit('fireClose','selectMeetingMap')
    },
    close: function () {
      var self = this;
      self .$emit("fireClose",'meetingMapBox');
    },
    dialog: function (map, data) {
      var self = this;
      if(!data.id || data.x == null || data.y == null){
        return;
      }
      if(map == null){
        map = self.map;
      }
      var self = this;
      var $template = $($("#infoTemplate").html());
      var id = data.x + "_" + data.y;
      var qrImg = "";
      if(self.currentDevice.fmapId == self.fmapId){ // 判断当前设备，如果设备是在展馆，二维码显示室外地图导航
        var qrurl = serverFmapUrl + '?fmapId=' + self.fmapId + '%26startX=' + self.start.x + '%26startY=' + self.start.y + '%26startFloor=' + self.floor + '%26endX=' +  data.x + '%26endY=' + data.y + '%26endFloor=' + data.floor;
        qrImg = QRUrl + qrurl;
      }else{
        var qrurl = gaodeurl + '?from=' + self.currentDevice.currentGeoL.latitude + ',' + self.currentDevice.currentGeoL.longitude + ',当前位置%26to=' + self.currentDevice.exihibitionGeo.latitude + ',' +self.currentDevice.exihibitionGeo.longitude + ',' +  data.hallName + '%26mode=car';
        qrImg = QRUrl + qrurl;
      }
      $template.find('.popinner').find('.mapfer').find('p').find('img').attr('src', qrImg)
      $template.find(".mtx").attr("id", id);
      $template.find("#status").text(data.isDoing);
      $template.find("#title").text(data.theme);
      $template.find("#duration").text(data.time);
      if(data.guestImgs != null && data.guestImgs != undefined && data.guestImgs.length > 0){
        for(var i=0; i< data.guestImgs.length; i++){
          var imgUrl =  data.guestImgs[i];
          if(imgUrl == ''){
            imgUrl = '/static/images/usrbg.png'
          }
          $template.find("#guests").append('<span id="guest-list"> <img src="' +imgUrl + '" width="100" height="100"> </span>')
        }

      }
      var ctlOpt = new fengmap.controlOptions({
        mapCoord: {
          //设置弹框的x轴
          x: data.x,
          //设置弹框的y轴
          y: data.y,
          //设置弹框位于的楼层
          groupID: data.floor
        },
        //设置弹框的宽度
        width: 540,
        //设置弹框的高度
        height: 390,
        //设置弹框的内容
        content:$template.html(),
        marginTop:-50,
        padding:1,
        zindex:4,
        closeCallBack: function() {
          //信息窗点击关闭操作
          // alert('信息窗关闭了！');
        }
      });
      //添加弹框到地图上
      var popMarker = new fengmap.FMPopInfoWindow(map, ctlOpt);
      var MyComponent = Vue.extend({
        template: '<p class="mt30 mbtn" v-on:click="closeOtherDialog(' + popMarker.mapCoord_.x + ',' + popMarker.mapCoord_.y + ',' + popMarker.mapCoord_.groupID + ')"> <span class="popScreen"></span><a class="btn btn1" v-on:click="goToHall(' + data.x + ',' + data.y + ',' + data.floor + ')">前往会议厅</a> <a v-on:click="hallDetail(\''+ data.id +'\',\'' + data.theme + '\')"class="btn btn2 ml10">会厅信息</a> </p>',
        methods:{
          goToHall:function(x, y, floor) {
            self.chatBox = false;
            self.navigate(self.start.x, self.start.y, self.start.groupID, x, y, floor);
            self.navi.simulate();
          },
          closeOtherDialog: function(x, y, groupId){
            self.chatBox = false;
            console.log(x);
            self.clearOtherDialog(x, y, groupId);
          },
          hallDetail: function(hallId, name){
            self.clearDialog();
            self.meetingInfo.id=hallId;
            self.meetingInfo.meetingName = name;
            self.meetingInfo.meetingDetailTabIndex = '0';
            self.showHallDetail = false;
            self.showdetail = true;
          }
        }
      });
      var myComponent = new MyComponent();
      myComponent.$mount();
      document.getElementById(id).appendChild(myComponent.$el);
      console.log(self.windowInfos);
      console.log('before');
      if(typeof(self.windowInfos) != 'undefined' && typeof(self.windowInfos.get(data.floor)) != 'undefined'){
        console.log('in');
        self.windowInfos.get(data.floor).push(popMarker);
        // self.windowInfos[data.floor].push(popMarker);
        console.log('finish');
      }else{
        var infos = [];
        infos.push(popMarker);
        self.windowInfos.set(data.floor, infos);
      }
    },
    serviceDialog: function(name, x, y, floor){ // 弹出框---服务视图
      var self = this;
      var id = x + "_" + y;
      var $template = $($("#serviceTemplate").html());

      $template.find(".mtx").attr("id", id);
      var qrImg = "";
      if(self.currentDevice.fmapId == self.fmapId){ // 判断当前设备，如果设备是在展馆，二维码显示室外地图导航
        var qrurl = serverFmapUrl + '?fmapId=' + self.fmapId + '%26startX=' + self.start.x + '%26startY=' + self.start.y + '%26startFloor=' + self.floor + '%26endX=' +  x + '%26endY=' + y + '%26endFloor=' + floor;
        qrImg = QRUrl + qrurl;
      }else{
        var qrurl = gaodeurl + '?from=' + self.currentDevice.currentGeoL.latitude + ',' + self.currentDevice.currentGeoL.longitude + ',当前位置%26to=' + self.currentDevice.exihibitionGeo.latitude + ',' +self.currentDevice.exihibitionGeo.longitude + ',展馆' + '%26mode=car';
        qrImg = QRUrl + qrurl;
      }
      $template.find('.mapfer').find('p').find('img').attr('src', qrImg)
      $template.find("#service_title").text(name);
      var ctlOpt = new fengmap.controlOptions({
        mapCoord: {
          //设置弹框的x轴
          x: x,
          //设置弹框的y轴
          y: y,
          //设置弹框位于的楼层
          groupID:floor
        },
        //设置弹框的宽度
        width: 522,
        //设置弹框的高度
        height: 242,
        //设置弹框的内容
        content:$template.html(),
        marginTop:-50,
        padding:1,
        closeCallBack: function() {
          //信息窗点击关闭操作
          // alert('信息窗关闭了！');
        }
      });
      //添加弹框到地图上
      var popMarker = new fengmap.FMPopInfoWindow(self.map, ctlOpt);
      var MyComponent = Vue.extend({
        template: '<p class="mt30 mbtn servicembtn" align="center"> <a v-on:click="toTo(' + x + ',' + y + ',' + floor + ')" class="btn btn1">前往</a> </p>',
        methods:{
          toTo:function(x, y, floor) {
            self.chatBox = false
            self.navigate(self.start.x, self.start.y, self.start.groupID, x, y, floor);
            self.navi.simulate();
          }
        }
      });
      var myComponent = new MyComponent();
      myComponent.$mount();
      document.getElementById(id).appendChild(myComponent.$el);
      if(typeof(self.windowInfos) != 'undefined' && typeof(self.windowInfos.get(floor)) != 'undefined'){
        self.windowInfos.get(floor).push(popMarker);
      }else{
        var infos = [];
        infos.push(popMarker);
        self.windowInfos.set(floor, infos);
      }
    },
    normalDialog: function(name, x, y, floor, data){ // 弹出框---服务视图
      var self = this;
      var id = x + "_" + y;
      var $template = $($("#normalTemplate").html());

      $template.find(".mtx").attr("id", id);
      var qrImg = "";
      if(self.currentDevice.fmapId == self.fmapId){ // 判断当前设备，如果设备是在展馆，二维码显示室外地图导航
        var qrurl = serverFmapUrl + '?fmapId=' + self.fmapId + '%26startX=' + self.start.x + '%26startY=' + self.start.y + '%26startFloor=' + self.floor + '%26endX=' +  x + '%26endY=' + y + '%26endFloor=' + floor;
        qrImg = QRUrl + qrurl;
      }else{
        var qrurl = gaodeurl + '?from=' + self.currentDevice.currentGeoL.latitude + ',' + self.currentDevice.currentGeoL.longitude + ',当前位置%26to=' + self.currentDevice.exihibitionGeo.latitude + ',' +self.currentDevice.exihibitionGeo.longitude + ',' +  data.hallName + '%26mode=car';
        qrImg = QRUrl + qrurl;
      }
      $template.find('.normalPopinner').find('.mapfer').find('p').find('img').attr('src', qrImg)
      $template.find(".tit").text(name);
      var ctlOpt = new fengmap.controlOptions({
        mapCoord: {
          //设置弹框的x轴
          x: x,
          //设置弹框的y轴
          y: y,
          //设置弹框位于的楼层
          groupID:floor
        },
        //设置弹框的宽度
        width: 522,
        //设置弹框的高度
        height: 242,
        //设置弹框的内容
        content:$template.html(),
        marginTop:-50,
        padding:1,
        closeCallBack: function() {
          //信息窗点击关闭操作
          // alert('信息窗关闭了！');
        }
      });
      //添加弹框到地图上
      var popMarker = new fengmap.FMPopInfoWindow(self.map, ctlOpt);
      var MyComponent = Vue.extend({
        template: '<p class="mt30 mbtn normalbtn" align="center"> <a v-on:click="toTo(' + x + ',' + y + ',' + floor + ')" class="btn btn1 normalBtn1">前往会议厅</a><a v-on:click="hallDetail(\'' + data.hallId + '\',\'' + data.hallName + '\',\'' + data.picture + '\')" class="btn btn2 ml10 normalBtn2">会厅信息</a>  </p>',
        methods:{
          toTo:function(x, y, floor) {
            self.chatBox = false;
            self.navigate(self.start.x, self.start.y, self.start.groupID, x, y, floor);
            self.navi.simulate();
          },
          hallDetail: function(hallId, name, img){
           self.clearDialog();
            self.hallDetailInfo.id=hallId;
            self.hallDetailInfo.hallName = name;
            self.hallDetailInfo.image = img;
            self.showHallDetail = true;
            self.showdetail = false;
          }
        }
      });
      var myComponent = new MyComponent();
      myComponent.$mount();
      document.getElementById(id).appendChild(myComponent.$el);
      if(typeof(self.windowInfos) != 'undefined' && typeof(self.windowInfos.get(floor)) != 'undefined'){
        self.windowInfos.get(floor).push(popMarker);
      }else{
        var infos = [];
        infos.push(popMarker);
        self.windowInfos.set(floor, infos);
      }
    },
    changeType: function (type, showAll) { // 左边切换tab事件
      var self = this;
      self.clearMarks();
      if(self.navi){
        self.navi.clearAll();
      }
      if(type == 1){
        if(self.normalTab == true){
          return;
        }else{
          self.clearDialog();
          self.normalTab = true;
          self.topicTab = false;
          self.serviceTab = false;
        }

      }else  if(type == 2){
        if(self.topicTab == true){
          return;
        }
        self.normalTab = false;
        self.topicTab = true;
        self.serviceTab = false;
        if(showAll){
          self.initData("7,8,9,10", self.floor);
        }

      }else {
        self.clearDialog();
        self.normalTab = false;
        self.topicTab = false;
        self.serviceTab = true;
        self.searchByType(1)
      }
    },
    initData:function(type, floor){ // 初始化数据
      var self = this;
      self.clearDialog();
      self.$api.get('meeting/findByType?types=' + type + '&floor=' + floor, r => {
        for(var i=0; r.length; i++){
          self.dialog(self.map, r[i]);
        }
      })
    },
    clearDialog: function(){ // 清除页面弹出框
      var self = this;
      self.windowInfos.forEach(function (key, value) {
        key.forEach(function(info){
          info.close();
        })
      })
      self.windowInfos.clear();
    },
    clearMarks: function () {
      var self = this;
      for(var i=1; i<7; i++){
        var group = self.map.getFMGroup(i);
        if(group != null && group != undefined){
          //返回当前层中第一个imageMarkerLayer,如果没有，则自动创建
          var layer1 = group.getOrCreateLayer('imageMarker');
          layer1.removeAll();
        }


      }
    },
    clearOtherDialog: function(x, y, groupID){
      var self = this;
      self.windowInfos.forEach(function (key, value) {
        key.forEach(function(info){
          if(info.mapCoord_.x == x && info.mapCoord_.y==y && info.mapCoord_.groupID == groupID){
            return;
          }
          info.close(value);
          self.windowInfos.delete()
        })
      })
      // self.windowInfos.clear();
    },
    searchByType: function(type){ // 按类型搜索
      let self = this;
      if (!self.loadComplete){
        return;
      }
      var request = {
        nodeType: fengmap.FMNodeType.FACILITY, //设置查询地图元素类型
        typeID:100001
      };

      //查询出所有楼层的地图元素的"typeID= typeId"的对象集合。
      fengmap.MapUtil.search(self.map, 'all', request, function(results) {
        //result 为查询到的结果集。
        var models = results;
        if (models != null && models.length > 0) {
          for(var i in models){
            i = parseInt(i);
            var model = models[i];
            self.addMarkers('/static/images/fmap/mark.png', model.groupID, model.mapCoord.x, model.mapCoord.y, 32);
          }
        }
      });


    },
    addMarkers: function (url, gid, X, Y, size) { // 添加标记
      var self = this;
      var group = self.map.getFMGroup(gid);

      //返回当前层中第一个imageMarkerLayer,如果没有，则自动创建
      self.layer = group.getOrCreateLayer('imageMarker');

      var im = new fengmap.FMImageMarker({
        x: X,
        y: Y,
        url: url,
        size: size,
        callback: function() {
          im.alwaysShow();
        }
      });
      self.layer.addMarker(im);
    },
    navigate(startX, startY, startFloor,  endX, endY, endFloor){
      var self = this;
      if(startX == null){
        startX = self.start.x;
      }

      if(startY == null){
        startY = self.start.y;
      }

      if(startFloor == null){
        startFloor = self.floor;
      }
      // self.clearDialog();
      self.navi.clearAll();
      self.navi.setStartPoint({
        x: startX,
        y: startY,
        height: 2,
        groupID: startFloor,
        url: '/static/images/fmap/start.png',
        size: 32
      });

      self.navi.setEndPoint({
        x: endX,
        y: endY,
        height: 2,
        groupID: endFloor,
        url: '/static/images/fmap/end.png',
        size: 32
      });
      if(startFloor != endFloor){
        self.showAllFloors();
      }
      // 画导航线
      self.navi.drawNaviLine();
      // self.navi.simulate();
      self.showAllTopic = true;
    },
    openChat: function () {
      var self = this;
      self.chatBox = !self.chatBox;
    },
    getMeetingByName: function(name, callback){
      var self = this;
      self.$api.get('meeting/findByHallName?hallName=' + encodeURI(name), r => {
        if(typeof(callback) == 'function'){
          callback(r);
        }

      })
    },
    showAllFloors: function(){
      var self = this;
      if($(".fm-btn-layer").find("img").attr('src').indexOf("layers") == -1){
        $(".fm-btn-layer").trigger("click");
      }
    },
    afterMeetingDetailClose: function(){
      var self = this;
      self.showdetail = false;
    },
    afterHallDetailClose: function(){
      var self = this;
      self.showHallDetail = false;
    },
    afterCycle: function(cycle){
      var self = this;
      if(cycle){
        clearInterval(cycle);
      }
      self.map.focusGroupID = {gid: self.floor, time: 3};

/*      var cycle1 = window.setInterval(function(){
        self.map.focusGroupID = {gid: start, time: 0};
        start = start + 1;
        if(start == 3){
         /!* self.map.focusGroupID = {gid: self.floor, time: 0.5};
          self.map.visibleGroupIDs = [self.floor];*!/
          clearInterval(cycle1)
        }
      },3000);*/
    }
  },
  mounted () {
    let self = this
    if(typeof(this.mapdata) != 'undefined' && typeof(this.mapdata.fmapId) != 'undefined'){
      this.fmapId = this.mapdata.fmapId;
      self.homeIndex = false;
    }

    var defaultFocusFloor = 1;
    if(device.posi.groupID == 1){
      defaultFocusFloor = 3;
    }

    //楼层控制控件配置参数
    var ctlOpt = new fengmap.controlOptions({
      //默认在右上角
      position: fengmap.controlPositon.RIGHT_BOTTOM,
      //默认显示楼层的个数
      showBtnCount: 3,
      //初始是否是多层显示，默认单层显示
      allLayer: true,
      needAllLayerBtn:true,
      imgURL:'/static/fmap/imgs/',
      //位置x,y的偏移量
      offset: {
        x: 70,
        y: 720
      }
    });
    let map = new fengmap.FMMap({
      mapServerURL: '/static/fmap/' + this.fmapId,
      mapThemeURL: '/static/fmap/theme',
      defaultThemeName: '650805',
      container: document.getElementById('map-container'),
      appName: fmap.appName,
      key: fmap.key,
      defaultViewMode: fengmap.FMViewMode.MODE_3D,
      moveToAnimateMode: true,
      naviLineAnimation: true,
      defaultMapScaleLevel: 20,
      focusAlphaMode: true,
      defaultFocusGroup: defaultFocusFloor,
      defaultVisibleGroups: [1,2,3],
      focusAlpha: 0.5,
      // 开启2维，3维切换的动画显示
      defaultControlsPose: fengmap.FMDirection.EAST,
      viewModeAnimateMode: true,
      defaultGroupSpace:40,
      // 设置倾斜角，默认倾斜角为60度
      defaultTiltAngle: 30,
      lazyCreateMode:true

    })

    self.map = map
    map.openMapById(fmap.fmapId, err => {
      console.log(err)
    })

    map.on('mapClickNode', function (event) {
      self.chatBox = false;
      self.navi.clearAll();
      if(event.target == null){
        self.clearDialog();
        return;
      }
      var name = event.target.name;
      if(name == 'poi' || name == null){
        self.clearDialog();
        return;
      }
      self.clearDialog();
      if (event.nodeType === fengmap.FMNodeType.MODEL) {
        if(name.indexOf("电梯") != -1 || name.indexOf("楼梯") != -1 || name.indexOf("卫生间") != -1 || name.indexOf("前台") != -1 || name.indexOf("洗手间") != -1){
          self.serviceDialog(name, event.target.x, event.target.y, event.target.groupID);
        }else if(self.topicTab){
          self.getMeetingByName(name, function(data){
            self.dialog(self.map, data);
          });
        }else if(self.normalTab){
          self.getMeetingByName(name, function(data){
            self.normalDialog(name, event.target.x, event.target.y, event.target.groupID, data)
          });

        }

      }
    })
    map.on('loadComplete', function () {
      $("#hallInfo").hide();
      self.loadComplete = true;
      debugger;
      self.addMarkers('/static/images/mapdw.png', self.floor, self.start.x, self.start.y, 64);
      var groupControl = new fengmap.scrollGroupsControl(map, ctlOpt);
      //通过楼层切换控件切换聚焦楼层时的回调函数
      //groupContro 即为楼层控件对象
      groupControl.onChange(function(groups, allLayer) {
        self.floor = groups[0];
        self.navi.clearAll();
        for(var i = 0; i < 7; i++){
          if(i != groups[0] && typeof(self.windowInfos.get(i)) != 'undefined' ){
            for(var j=0; j<self.windowInfos.get(i).length; j++){
              self.windowInfos.get(i)[j].close();
            }
          }
        }
        if(self.topicTab && self.showAllTopic){
          self.initData("7,8,9,10", self.floor);
        }else{
          self.searchByType();
        }

      });
      //初始化导航对象
      self.navi = new fengmap.FMNavigation({
        map: self.map,
        locationMarkerUrl: '/static/fmap/imgs/pointer.png',
        //设置Marker尺寸
        locationMarkerSize: 43,
        speed:3,
        changeTiltAngle:false,
        //设置地图是否选择，默认false
        followAngle: true,
        //导航跟随倾斜角度
        tiltAngle: 80,
        //导航跟随显示级别
        scaleLevel: 1,
        // 设置导航线的样式
        lineStyle: {
          //设置线为导航线样式
          lineType: fengmap.FMLineType.FMARROW,
          lineWidth: 6,
          //设置线的颜色
          // godColor: '#FF0000',
          //设置边线的颜色
          // godEdgeColor: '#920000',
        }
      });
      console.log("初始化导航控件完成， 开始初始化楼导航空间:" + new Date())
      if(!!self.mapdata && !!self.mapdata.hallName){
        if(self.mapdata.type == 1){
          self.changeType('1', false);
        }else{
          self.changeType('2', false);
        }

        self.clearDialog();
        self.getMeetingByName(self.mapdata.hallName, function(data){
          self.dialog(null, data);
          self.showAllTopic = false;
          // self.navigate(self.start.x, self.start.y, self.floor,data.x, data.y, data.floor);
        });
      }

      var rate = -180;
      var cycle = window.setInterval(function(){
        map.rotateAngle = rate;
        rate = rate + 5;
        if(rate == 180){
          self.afterCycle(cycle);
        }
      },100);
    });
  },
  activated: function () {
    var self = this;
    if(self.map){
      map.visibleGroupIDs = [1,2,3];
      var rate = -180;
      var cycle = window.setInterval(function(){
        self.map.rotateAngle = rate;
        rate = rate + 5;
        if(rate == 180){
          clearInterval(cycle)
        }
      },100);
    }
  }
}
</script>

<style>
  .fm-control-popmarker{
    z-index: 999;
  }
  .ipimg2 .ibi {
    background: url(/static/images/mapbox_23.png) no-repeat;
    height: 60px;
    width: 520px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .ipimg .ici {
    background: url(/static/images/mapbox_19.png) repeat-y;
    width: 520px;
    z-index: 2;
    padding-bottom: 20px;
  }

  .ipimg .iti {
    background: url(/static/images/mapbox_17.png) no-repeat;
    height: 50px;
    width: 520px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .fm-control-popmarker{
    background-color: transparent !important;
    border: 0px !important;
  }

  .fm-control-popmarker>input[type="button"]{
    display: none;
  }

  .fm-control-popmarker>div{
    overflow:hidden !important;
  }

  .fm-control-popmarker-top{
    display: none;
  }

  .ipbg, .ibi{
    pointer-events: none;
  }

  .mt30{
    clear: both;
    position: absolute;
    height: 340px;
    width: 520px;
    top: 0;
    left: 0;
  }

  .btn1{
    bottom: 25px;
    position: absolute;
    left: 60px;
  }
  .normalbtn>.normalBtn1{
    bottom: 25px;
    position: absolute;
    left: 60px;
  }

  .btn2, .normalBtn2{
    position: absolute;
    bottom: 25px;
    right: 60px;
  }
  .normalbtn>.normalBtn2{
    position: absolute;
    bottom: 25px;
    right: 60px;
  }
  .fm-control-popmarker-bot{
    display: none;
  }

  .servicembtn, .normalbtn{
    clear: both;
    position: absolute;
    width: 520px;
    height: 180px;
  }

  .servicembtn>.btn1{
    bottom: 25px;
    position: absolute;
    left: 175px;
  }

  .mapfer{
    position: absolute;
    top: 51px;
    left: 514px;
    float: left;
  }
</style>

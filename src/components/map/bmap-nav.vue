<template>
  <div>
    <div class="mghti" style="width: 976px; height:680px">
      <div class="title">当前位置前往{{itemInfo.title}}的路线规划</div>
      <div class="zptm">
        <div :id="'bmap-container'+idrandom" style="width:920px; height:572px"></div>
        <div class="zpmsg">
          <div class="return"  @click="returnPoi()"><img src="static/0503/images/mpfh.png"></div>
          <div class="zptit">
            <ul class="clearfix">
              <li :class="curTabClss[0]?'cur':''" @click="selectNavigator(0)" v-text="showRecom[0]?'公交(推荐)':'公交'"><em></em></li>
              <li :class="curTabClss[1]?'cur':''" @click="selectNavigator(1)" v-text="showRecom[1]?'驾车(推荐)':'驾车'"><em></em></li>
              <li :class="curTabClss[2]?'cur':''" @click="selectNavigator(2)" v-text="showRecom[2]?'步行(推荐)':'步行'"><em></em></li>
            </ul>
          </div>
          <div class="zpli zpli3"  v-if="curNavClss[0]">
            <ul>
              <li v-for="(item,index) in transitInfo" :key="index" :class="curClass[index]?'cur':''" >
                <div class="xq" @click="selectTransitLine(item.map,item.plan,index)">
                  <p class="zti" style="text-align: left">{{item.duration}}</p>
                  <p class="zci" style="text-align: left">{{item.distance}}</p>
                  <p class="zbi"  @click="showNavQrcode()">导航</p>
                </div>
                <div class="goto" v-show="curClass[index]">
                  <div :id="'swiperBannerNav'+index" class="swiper-container" style="width: 258px;height: 152px; left: -37px;">
                    <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(line,index1) in item.route" :key="index1">
                    <i :class="line.type==1?'go go1':'go go2'" style="left: 0px;"></i>
                    <div style="padding-left: 30px;padding-top: 5px;">{{line.text}}</div>
                      </div>
                    </div>
                    <div class="swiper-pagination"></div>
                  </div>
                </div>
              </li>
              <li v-if="showNoTransit">
                <div class="xq" v-if="noTransit[0]">
                  <p class="zti" style="text-align: left">未找到公交方案，您可以查看驾车方案，或者重新选择地点。</p>
                </div>
                <div class="xq"  v-if="noTransit[1]">
                  <p class="zti" style="text-align: left">起点与终点距离较近，您可以查看步行方案，或者重新选择地点</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="zpli zpli3" v-if="curNavClss[1]">
            <ul>
              <li v-for="(item,index) in drivingInfo" :key="index" :class="curClass[index]?'cur':''" @click="selectDrivingLine(item.map,item.plan,index)">
                <div class="xq">
                  <p class="zti" style="text-align: left">{{item.duration}}</p>
                  <p class="zci" style="text-align: left">{{item.distance}}</p>
                  <p class="zbi"  @click="showNavQrcode()">导航</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="zpli zpli3" v-if="curNavClss[2]">
            <ul>
              <li v-for="(item,index) in walkingInfo" :key="index" :class="curClass[index]?'cur':''" @click="selectWalkingLine(item.map,item.plan,index)">
                <div class="xq">
                  <p class="zti" style="text-align: left">{{item.duration}} {{item.distance}}</p>
                  <p class="zci" style="text-align: left">{{item.kcal}}</p>
                  <p class="zbi" @click="showNavQrcode()">导航</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="zpli zpli2" v-if="showQrcode">
            <ul>
              <li>
                <p class="zci">{{navQrcode.title}}</p>
                <div class="emtt">
                  <p><img :src="QRUrl + baiduUrl + '?origin=latlng:'+navQrcode.origin.lat+','+navQrcode.origin.lng+'|name:'+navQrcode.startName+'%26destination=latlng:'+navQrcode.dest.lat+','+navQrcode.dest.lng+'|name:'+navQrcode.endName+'%26mode='+navQrcode.navModel+'%26region=贵阳%26output=html%26src=数博会|xiaoI机器人'" width="216" height="216"></p>
                  <p class="mt10">请扫描二维码进行导航</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="helpBmap" :key="'keyStatus'+idrandom"></topic2>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  import topic2 from '@/components/new/sbt-topic2.vue';
  import {currentBmap,baiduUrl,QRUrl} from '../../utils/constant';
  import BMap from 'BMap';
export default {
  name: '',
  components: {topic2},
  props: {
    // 父组件传入
    itemInfo: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      QRUrl: QRUrl,
      baiduUrl: baiduUrl,
      currentName:currentBmap.name,
      currentLngLat:[currentBmap.latitude,currentBmap.longitude],
      itemList:[],
      curIndex:0,
      swiper0:null,
      swiper1:null,
      swiper2:null,
      transitInfo:[],
      drivingInfo:[],
      walkingInfo:[],
      curClass:[true,false,false],
      curNavClss:[false,false,false],
      startPoint:{},
      endPoint:{},
      navQrcode:{title:'',navModel:'transit',origin:{},startName:'',dest:{},endName:''},
      showRecom:[false,false,false],
      distanceNav:0,
      currClick:false,
      idrandom:'',
      showQrcode: false,
      curTabClss:[false,false,false],
      noTransit:[false,false],
      showNoTransit:false
    }
  },
  methods: {

    initBMap: function () {
      let self = this;
      var map = new BMap.Map("bmap-container"+self.idrandom);          // 创建地图实例
      var point = new BMap.Point(self.currentLngLat[0], self.currentLngLat[1]);  // 创建点坐标
      map.centerAndZoom(point, 11);     // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl());
      return map;
    },
   returnPoi: function () {
     let self = this;
     self.$parent.$parent.showBmapPoi(self.itemInfo);

   },
  showNavQrcode: function () {
    let self = this;
    self.curNavClss =[false,false,false];
    self.showQrcode = true;
    self.navQrcode.origin= self.startPoint.point;
    self.navQrcode.startName=self.startPoint.title;
    self.navQrcode.dest= self.endPoint.point;
    self.navQrcode.endName=self.endPoint.title;

  },
    selectNavigator:function (cur) {
      let self = this;
      self.currClick = true;
      self.showQrcode = false;
      self.curTabClss =[false,false,false];
      self.curTabClss[cur] = true;
      self.curNavClss =[false,false,false];
      self.curNavClss[cur] = true;
      self.curClass =[false,false,false];
      self.curClass[0] = true;
      var map=self.initBMap();
        if (cur == 0) {
          self.transitPath(map,self.startPoint.point,self.endPoint.point)
          self.navQrcode.navModel='transit';
        } else if (cur == 1) {
            self.drivingPath(map,self.startPoint.point,self.endPoint.point)
          self.navQrcode.navModel='driving';
            // var lineInfo = self.drivingInfo[0];
            // if(self.drivingInfo&&self.drivingInfo.length>0) {
            //   // self.selectDrivingLine(map, lineInfo.start, lineInfo.end, lineInfo.plan, 0);
            // }
        } else {
          self.walkingPath(map,self.startPoint.point,self.endPoint.point)
          self.navQrcode.navModel='walking';
          // var lineInfo = self.walkingInfo[0];
          // if(self.walkingInfo&&self.walkingInfo.length>0) {
          //   self.selectWalkingLine(map, lineInfo.start, lineInfo.end, lineInfo.plan, 0);
          // }
        }
    },
  lineConent: function (content) {
    var list = new Array();
    var line =content.split('步行');
    for(var i=0; i< line.length;i++){
      var bus =line[i].split('乘坐');
      if(bus.length==1){
        if(line[i]!='')
        list.push({type:1,text:'步行'+line[i]});
      }else{
        console.log('bus',bus);
        for(var j=0; j< bus.length;j++) {
          if (bus[j] != ''){
            if (j == 0) {
              list.push({type: 1, text: '步行' + bus[j]});
            } else {
              list.push({type: 2, text: '乘坐' + bus[j]});
            }
        }
        }
      }
    }
    return list;
  },
   addStart(map){
     let self = this;
     map.addOverlay(new
      BMap.Marker(self.startPoint.point, {title: self.startPoint.title,
        icon: new BMap.Icon('static/0503/images/start.png',new BMap.Size(80, 84)
        )}));
    },
    addEnd(map){
      let self = this;
      map.addOverlay(new
      BMap.Marker(self.endPoint.point, {title: self.endPoint.title,
        icon: new BMap.Icon('static/0503/images/end.png',new BMap.Size(80, 84)
        )}));
    },
    transitPath:function (map, start, end) {
      let self = this;
      var transit = new BMap.TransitRoute(map, {pageCapacity:3});
      transit.setSearchCompleteCallback(function(results){
        console.log('transit results:',results,transit.getStatus())
        if (transit.getStatus() == BMAP_STATUS_SUCCESS){
          // 输出方案信息
          self.transitInfo=[];
          for (var i = 0; i < results.getNumPlans(); i ++) {
            var plan = results.getPlan(i);
            if(i==0){
              // self.selectTransitLine(map,plan,0);
            }
            console.log('transit:', plan.getDescription(false))
            var route = self.lineConent(plan.getDescription(false))
            var line = {
              distance: plan.getDistance(true),
              duration: plan.getDuration(true),
              route: route,
              map: map,
              plan: plan
            }
            self.transitInfo.push(line);
          }
          console.log('transitInfo:',self.transitInfo);
          var pointArray = new Array();
          pointArray.push( start)
          pointArray.push( end)
          if(map) {
            map.setViewport(pointArray);
            map.setZoom(13);
          }

          if(self.transitInfo.length>0) {
            self.showNoTransit = false;
          }else{
            self.showNoTransit = true;
          }

          if (!self.currClick) {
            // self.showRecom = [true, false, false];
            if(self.transitInfo.length>0) {
              var plan1 = results.getPlan(0);
              if(plan1.getDistance(false)>=5000&& plan1.getDistance(false)<=30000) {
                self.selectTransitLine(map, plan1, 0);
              }
              self.changeBmapZoom(map,plan1);
            }
            self.walkingPath(map, self.startPoint.point, self.endPoint.point)
          }else {
            if (self.transitInfo.length > 0) {
              var plan1 = results.getPlan(0);
                self.selectTransitLine(map, plan1, 0);
              self.changeBmapZoom(map, plan1);
            }
          }
        }else if(transit.getStatus() ==3) {
          self.showNoTransit = true;
          // if (self.showRecom[0]) {
          //   self.showRecom = [false, true, false];
          // }
          if (!self.currClick) {
          self.walkingPath(map, self.startPoint.point, self.endPoint.point)
           }
        }

      });
      transit.setResultsHtmlSetCallback(function(results){
        self.$nextTick(function(){
          self.initNavSwiper()
        });
      });
      transit.search(start, end);

    },
    selectTransitLine: function(map,plan,index){
      let self = this;
      map.clearOverlays();
      self.navQrcode.title = plan.getDuration(true)+' '+plan.getDistance(true);
      console.log('distance:',plan.getDistance(false));
      self.addStart(map);

      // 绘制公交线路
      for (var j = 0; j < plan.getNumLines(); j ++){
        var line = plan.getLine(j);
        map.addOverlay(new BMap.Polyline(line.getPath()));
        console.log('line:',line.getTitle())
      }
      // 绘制步行线路
      for (var i = 0; i < plan.getNumRoutes(); i ++){
        var route = plan.getRoute(i);
        console.log('walk distance:',route.getDistance(false))
        if (route.getDistance(false) > 0){
          // 步行线路有可能为0
          map.addOverlay(new BMap.Polyline(route.getPath(), {strokeColor: "green",strokeStyle:'dashed'}));
          console.log('walk:',route)
        }
      }
      self.addEnd(map);
      self.curClass = [false,false,false];
      if(index == 0){
        self.curClass = [true,false,false];
      }else if(index==1){
        self.curClass = [false,true,false];
      }else{
        self.curClass = [false,false,true];
      }
      // self.$nextTick(function(){
      //   self.initNavSwiper()
      // });
      console.log('getOverlays():',map.getOverlays());
      console.log('zoom:',map.getZoom());
    },
    drivingPath:function (map, start, end) {
      let self = this;
      // map.clearOverlays();
      var driving = new BMap.DrivingRoute(map, {pageCapacity:3});
      driving.setSearchCompleteCallback( function(results){
        if (driving.getStatus() == BMAP_STATUS_SUCCESS){
          // 获取方案的驾车线路
          var plan1 = results.getPlan(0);
          console.log('getDistance:',plan1.getDistance(true),plan1.getDuration(true));
          if(results.taxiFare) {
            console.log('taxFee:', results.taxiFare.day.totalFare, '  -  ', results.taxiFare.night.totalFare, ' ---', results.getNumPlans())
          }
          self.drivingInfo =[];
          for (var i = 0; i < results.getNumPlans(); i ++) {
            var plan = results.getPlan(i);
            var totalFee = '未知';
            if(results.taxiFare){
              totalFee = results.taxiFare.day.totalFare
            }
            var line = {
              distance: plan.getDistance(true),
              duration: plan.getDuration(true),
              taxFare: totalFee,
              map: map,
              plan: plan
            }
            self.drivingInfo.push(line);
          }
          console.log('driving info:',self.drivingInfo);
          var pointArray = new Array();
          pointArray.push( start)
          pointArray.push( end)
          if(map) {
            map.setViewport(pointArray);
            map.setZoom(13);
          }
          if(self.drivingInfo.length>0){
            self.selectDrivingLine(map,plan1,0)
            self.changeBmapZoom(map,plan1);
          }
        }
      });
      driving.search(start, end);
    },
    selectDrivingLine: function(map,plan,index){
      let self = this;
        map.clearOverlays();
      self.addStart(map);
      // 绘制线路
      for (var i = 0; i < plan.getNumRoutes(); i ++){
        var route = plan.getRoute(i);
        if (route.getDistance(false) > 0){
          // 步行线路有可能为0
          map.addOverlay(new BMap.Polyline(route.getPath()));
          console.log('route:',route)
        }
      }
      self.addEnd(map);
      self.curClass = [false,false,false];
      if(index == 0){
        self.curClass = [true,false,false];
      }else if(index==1){
        self.curClass = [false,true,false];
      }else{
        self.curClass = [false,false,true];
      }
    },
    selectWalkingLine: function(map,plan,index){
      let self = this;
       map.clearOverlays();
      self.addStart(map);
      // 绘制线路
      for (var i = 0; i < plan.getNumRoutes(); i ++){
        var route = plan.getRoute(i);
        if (route.getDistance(false) > 0){
          // 步行线路有可能为0
          map.addOverlay(new BMap.Polyline(route.getPath(), {strokeColor: "green",strokeStyle:'dashed'}));
          console.log('route:',route)
        }
      }
      self.addEnd(map);
      self.curClass = [false,false,false];
      if(index == 0){
        self.curClass = [true,false,false];
      }else if(index==1){
        self.curClass = [false,true,false];
      }else{
        self.curClass = [false,false,true];
      }
    } ,
    walkingPath:function (map, start, end) {
      let self = this;
      var walking = new BMap.WalkingRoute(map, { pageCapacity:3});
      walking.setSearchCompleteCallback(function(results){
        if (walking.getStatus() == BMAP_STATUS_SUCCESS) {

          var plan1 = results.getPlan(0);
          console.log('getDistance:',plan1.getDistance(true),plan1.getDuration(false));
          console.log('大卡:',Math.round(plan1.getDuration(false)/60*5.2));
          self.distanceNav = plan1.getDistance(false);
          console.log('self.distanceNav1',self.distanceNav);
          self.walkingInfo=[];
          // 获取方案的线路
          for (var i = 0; i < results.getNumPlans(); i++) {
            var plan = results.getPlan(i);
            var line = {
              distance: plan.getDistance(true),
              duration: plan.getDuration(true),
              kcal: '消耗'+(Math.round(plan.getDuration(false) / 60 * 5.2)+'大卡'),
              map: map,
              plan: plan
            }
            self.walkingInfo.push(line);
            console.log('walking info:',self.walkingInfo);
            var pointArray = new Array();
            pointArray.push( start)
            pointArray.push( end)
            if(map){
            map.setViewport(pointArray);
              map.setZoom(13);
            }
          }
          if(!self.currClick) {
            if (plan1.getDistance(false) < 5000) {
              self.showRecom = [false, false, true];
              self.curNavClss = [false, false, true];
              self.curTabClss = [false, false, true];
              self.noTransit = [false, true];
              if (self.walkingInfo.length > 0) {
                self.selectWalkingLine(map, plan1, 0);
                self.changeBmapZoom(map,plan1);
              }
            } else if (plan1.getDistance(false) > 30000 || (plan1.getDistance(false) >=5000 && self.showNoTransit )) {
              self.showRecom = [false, true, false];
              self.noTransit = [true, false];
              if (!self.currClick) {
                self.curNavClss = [false, true, false];
                self.curTabClss = [false, true, false];
                self.drivingPath(map, self.startPoint.point, self.endPoint.point)
              }
            } else {
              if (!self.showNoTransit) {
                self.showRecom = [true, false, false];
                self.noTransit = [false, false];
                self.curNavClss =[true,false,false];
                self.curTabClss =[true,false,false];
              } else {

              }
            }
          }else{
            if (self.walkingInfo.length > 0) {
              self.selectWalkingLine(map, plan1, 0);
              self.changeBmapZoom(map,plan1);
            }
          }
        }
      });
      walking.search(start, end);
    },
  changeBmapZoom: function (map,plan1) {
      if(plan1) {
        if (plan1.getDistance(false) < 5000) {
          map.setZoom(15);
        }
        if (plan1.getDistance(false) > 30000 && plan1.getDistance(false) <= 50000) {
          map.setZoom(12);
        }
        if (plan1.getDistance(false) > 50000 && plan1.getDistance(false) < 80000) {
          map.setZoom(10);
        }
        if (plan1.getDistance(false) >= 80000) {
          map.setZoom(9);
        }
      }
  },
  initNavSwiper: function () {
      let self =this
   self.swiper0= new Swiper('#swiperBannerNav0', {
      direction: 'vertical',
      slidesPerView:2,
      speed:500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      watchOverflow: true
    });

    self.swiper1=new Swiper('#swiperBannerNav1', {
      direction: 'vertical',
      slidesPerView:2,
      speed:500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      watchOverflow: true
    });

    self.swiper2=new Swiper('#swiperBannerNav2', {
      direction: 'vertical',
      slidesPerView:2,
      speed:500,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      watchOverflow: true
    });
  }
  },
  mounted: function () {
    let self = this

    var spoint = new BMap.Point(self.currentLngLat[0], self.currentLngLat[1]);  // 创建点坐标
    self.startPoint = {title:self.currentName,point:spoint};
    var epoint = new BMap.Point(self.itemInfo.point[0], self.itemInfo.point[1]);  // 创建点坐标
    self.endPoint={title:self.itemInfo.title,point:epoint};
    var map = self.initBMap();

    //公交线路规划
    var results=self.transitPath(map,spoint,epoint);
  },
  computed: {
  },
  created:function () {
    this.idrandom = "" + (new Date()).getTime();
  },
  updated:function (){
    let self = this;
    self.$nextTick(function(){
    self.initNavSwiper()
  });
  }
}
</script>

<style>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';

  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL {
    display: none;
  }
  .text1 {
    /*单行*/
    float:left;
    width:240px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  .text2 {
    /*多行*/
    float:left;
    width:240px;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
    text-overflow:ellipsis;
    text-align: left;
  }

</style>

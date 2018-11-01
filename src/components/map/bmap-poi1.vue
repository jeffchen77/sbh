<template>
  <div>
    <div class="msxq" style="height: 447px;">
      <div class="mq clearfix">
      <div class="xqmap" style="width: auto;height: 387px;">
      <div id="bmap-container" class="zbt" style="width: auto;height: 240px"></div>
        <div class="xmpli" style="width:900px;">
          <ul>
          <div id="swiperBannerPoi" class="swiper-container">
            <div class="swiper-wrapper">
                <li v-for="(item,index) in itemList" :key="index" :class="index==curIndex?'swiper-slide cur':'swiper-slide'" style="width:282px;height: 86px;">
                  <em>{{item.number}}</em>
                  <p class="tit text1">{{item.title}}</p>
                  <div class="con text2">地址：{{item.address}}</div>
                </li>
              <div class="swiper-slide"></div>
              <div class="swiper-slide"></div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          </ul>
        </div>
    </div>
      </div>
    </div>
  <topic2 topicType="helpTopic" v-if="itemInfo.type==1"  key="keyStatus"></topic2>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
import {deviceConfig} from '../../utils/constant'
  import topic2 from '@/components/new/sbt-topic2.vue'
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
      currentDevice: deviceConfig.getConfig(this.$root.device),
      currentDeviceName: this.$root.device,
      currentLngLat:[],
      itemList:[],
      curIndex:0,
      itemSwiper:null
    }
  },
  methods: {
    initBMap: function () {
      let self = this;
      self.currentLngLat = [self.currentDevice.currentGeoL.latitude,self.currentDevice.currentGeoL.longitude]
      var map = new BMap.Map("bmap-container");          // 创建地图实例
      var point = new BMap.Point(self.currentLngLat[0], self.currentLngLat[1]);  // 创建点坐标
      map.centerAndZoom(point, 11);     // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl());
      return map;
    },
    localSearch: function (map,keywords) {
      let self = this;
      var local = new BMap.LocalSearch(map, {
          pageCapacity: 6
      });
      local.setSearchCompleteCallback(function(results) {
        if (local.getStatus() == BMAP_STATUS_SUCCESS){
          // 判断状态是否正确
          self.itemList = [];
          var pointArray = new Array();
          map.clearOverlays();
          for (var i = 0; i < results.getCurrentNumPois(); i ++){
            console.log('results poi:',results.getPoi(i));
            var item ={number:i+1,title:results.getPoi(i).title, address:results.getPoi(i).address, point:results.getPoi(i).point,phoneNumber:results.getPoi(i).phoneNumber,uid:results.getPoi(i).uid}
            self.itemList.push(item);
            // 添加 marker
            var myIcon = new BMap.Icon("static/0503/images/mapzb.png", new BMap.Size(80,84));
            var point = new BMap.Point(item.point.lng, item.point.lat);
            var marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
            map.addOverlay(marker);               // 将标注添加到地图中
            var label = new BMap.Label(i+1);
            label.setStyle({background:'url(static/0503/images/mapzb.png) no-repeat',width:'80px',height:'83px','border-radius':'50%',border:0,'text-align':'center','line-height':'54px',color:'#fff','font-size':'22px',position:'absolute'});
            marker.setLabel(label);

            // console.log('index:',i)
            // console.log('overlay:',map.getOverlays());
            pointArray[i] = point;
            marker.addEventListener('click',  function attribute(e){
              var p = e.target;
              console.log("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
              self.itemList.forEach(item=>{
                if(p.getPosition().lng==item.point.lng && p.getPosition().lat==item.point.lat)
                self.curIndex=item.number-1;
                if(self.itemSwiper) {
                  self.itemSwiper.slideTo(self.curIndex);
                }
              })

            });
          }
          //让所有点在视野范围内
          map.setViewport(pointArray);
          //获取覆盖物位置
          // function attribute(e){
          //   var p = e.target;
          //   alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
          // }
          console.log('overlay:',map.getOverlays());
          console.log('itemList:',self.itemList);
        }
      });
      local.search(keywords);
    },
    transitPath:function (map, start, end) {
      let self = this;
      var transit = new BMap.TransitRoute(map, {
        renderOptions: {map: map, panel: 'panel'}
      });
      transit.setSearchCompleteCallback(function(results){
        if (transit.getStatus() == BMAP_STATUS_SUCCESS){
          var firstPlan = results.getPlan(0);
          // 绘制步行线路
          for (var i = 0; i < firstPlan.getNumRoutes(); i ++){
            var walk = firstPlan.getRoute(i);
            if (walk.getDistance(false) > 0){
              // 步行线路有可能为0
              map.addOverlay(new BMap.Polyline(walk.getPath(), {lineColor: "green"}));
            }
          }
          // 绘制公交线路
          for (i = 0; i < firstPlan.getNumLines(); i ++){
            var line = firstPlan.getLine(i);
            map.addOverlay(new BMap.Polyline(line.getPath()));
          }
          // 输出方案信息
          var s = [];
          for (i = 0; i < results.getNumPlans(); i ++){
            s.push((i + 1) + ". " + results.getPlan(i).getDescription());
            console.log('transit:',results.getPlan(i).getDescription(false))
          }
          // console.log('transit:',s)
        }
      });
      transit.search(start, end);
    },
    drivingPath:function (map, start, end) {
      let self = this;
      var driving = new BMap.DrivingRoute(map, {
        renderOptions: {map: map, panel: 'panel',autoViewport: true}
      });
      driving.setSearchCompleteCallback(function(results){
        if (driving.getStatus() == BMAP_STATUS_SUCCESS){
          // 获取第一条方案
          var plan = results.getPlan(0);
          console.log('getDistance:',plan.getDistance(true),plan.getDuration(true));
          console.log('taxFee:',results.taxiFare.day.totalFare,'  -  ',results.taxiFare.night.totalFare)
          // 获取方案的驾车线路
          var route = plan.getRoute(0);
          // 获取每个关键步骤，并输出到页面
          var s = [];
          for (var i = 0; i < route.getNumSteps(); i ++){
            var step = route.getStep(i);
            s.push((i + 1) + ". " + step.getDescription(true));
            console.log('driving:',step)
          }
        }
      });
      driving.search(start, end);

    },
    walkingPath:function (map, start, end) {
      let self = this;
      var walking = new BMap.WalkingRoute(map, {
        renderOptions: {map: map, panel: 'panel',autoViewport: true}
      });
      walking.setSearchCompleteCallback(function(results){
        if (walking.getStatus() == BMAP_STATUS_SUCCESS){
          // 获取第一条方案
          var plan = results.getPlan(0);
          console.log('getDistance:',plan.getDistance(true),plan.getDuration(false));
          console.log('大卡:',Math.round(plan.getDuration(false)/60*5.2));
          // 获取方案的驾车线路
          var route = plan.getRoute(0);
          // 获取每个关键步骤，并输出到页面
          var s = [];
          for (var i = 0; i < route.getNumSteps(); i ++){
            var step = route.getStep(i);
            s.push((i + 1) + ". " + step.getDescription(true));
            // console.log('walking:',step)
          }
        }
      });
      walking.search(start, end);
    }

  },
  mounted: function () {
    let self = this
    self.itemSwiper = new Swiper('#swiperBannerPoi', {
      slidesPerView:3,
      speed:1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      watchOverflow: true,
    });
    self.currentLngLat = [self.currentDevice.currentGeoL.latitude,self.currentDevice.currentGeoL.longitude]
    var map = new BMap.Map("bmap-container");          // 创建地图实例
    var point = new BMap.Point(self.currentLngLat[0], self.currentLngLat[1]);  // 创建点坐标
    map.centerAndZoom(point, 11);     // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());

    // 关键字搜索
    if(self.itemInfo) {
      if(self.itemInfo.keywords && self.itemInfo.keywords!='') {
        self.localSearch(map, self.itemInfo.keywords);
      }
    }
    //公交线路规划
    var p1 = new BMap.Point(106.683525,26.439539);
    // self.transitPath(map,point, p1);
    //驾车线路规划
    var p2 = new BMap.Point(106.721331,26.594568);
    // self.drivingPath(map,point, p2);
    // map= self.initBMap();
    //步行线路规划
    var p3 = new BMap.Point(106.721331,26.594568);
    // self.walkingPath(map,point, p3);


  },
  computed: {
  }
}
</script>

<style>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
  .panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
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
  }
</style>

<template>
  <div class="msxq">
    <div class="mq clearfix">
    <div class="xqmap" style="width:auto;">
      <div id="bmap-container-inner" class="zbt" style="width: auto;height: 240px"></div>
        <div class="xmpli" style="width:900px">
          <ul>
          <div id="swiperBannerInner" class="swiper-container">
            <div class="swiper-wrapper">
                <li v-for="(item,index) in itemList" :key="index" :class="index==curIndex?'swiper-slide cur':'swiper-slide'">
                  <em>{{item.number}}</em>
                  <p class="tit">{{item.title}}</p>
                  <div class="con" >地址：{{item.address}}</div>
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
</template>

<script>
  /* eslint-disable no-undef */
import {deviceConfig} from '../../utils/constant'
  import BMap from 'BMap';
export default {
  name: '',
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
            var item ={number:i+1,title:results.getPoi(i).title, address:results.getPoi(i).address, point:results.getPoi(i).point,phoneNumber:results.getPoi(i).phoneNumber,uid:results.getPoi(i).uid,tags:results.getPoi(i).tags}
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
          console.log('overlay:',map.getOverlays());
          console.log('itemList:',self.itemList);
        }
      });
      local.search(keywords);
    }
  },
  mounted: function () {
    let self = this
    self.itemSwiper = new Swiper('#swiperBannerInner', {
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
    var map = new BMap.Map("bmap-container-inner");          // 创建地图实例
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
</style>

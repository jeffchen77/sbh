<template>
  <div>
  <div id="amap-container" class="map clearfix" style="height: 1578px;font-size: 24px"></div>
  <div id="panel" class="panel"></div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
import {device, fmap, deviceConfig, QRUrl, gaodeurl, serverFmapUrl} from '../../utils/constant'
  import AMap from 'AMap';
export default {
  name: '',
  data () {
    return {
      currentDevice: deviceConfig.getConfig(this.$root.device),
      currentDeviceName: this.$root.device,
      currentLngLat:[]
    }
  },
  methods: {

  },
  mounted: function () {
    let self = this
    self.currentLngLat = [self.currentDevice.currentGeoL.latitude,self.currentDevice.currentGeoL.longitude]
    var map = new AMap.Map('amap-container', {
      resizeEnable: true,
      zoom:11
    });
    // 设置缩放级别和中心点
    map.setZoomAndCenter(14, self.currentLngLat);
    map.plugin(['AMap.ToolBar'], function() {
      map.addControl(new AMap.ToolBar());
    });

    AMap.service(["AMap.PlaceSearch"], function() {
      var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
        pageSize: 5,
        type: '美食',
        pageIndex: 1,
        city: "0851", //城市
        map: map,
        panel: "panel"
      });

      var cpoint = self.currentLngLat; //中心点坐标
      placeSearch.searchNearBy('牛肉粉', cpoint, 200, function(status, result) {
        console.log(status,result);
      });
    });

    var deviceArr = deviceConfig.getConfig('deviceArry')
    deviceArr.forEach( item =>{
      // 添加 marker
      var marker = new AMap.Marker({
        map: map,
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
        position: item.lngLat,
        title:item.name
      });

      marker.on('click', function() {
        console.log(marker.getPosition())
        map.plugin(['AMap.Driving','AMap.Walking'], function() {

          var deviceArr = deviceConfig.getConfig('deviceArry')
          var isWalking = false
          deviceArr.forEach( e =>{
            if(e.type != 'o') {
              if(self.currentLngLat[0] ==e.lngLat[0] && self.currentLngLat[1] ==e.lngLat[1]&&item.type!='o'){
                isWalking = true
              }
            }
          });
          if(!isWalking) {
            //构造路线导航类
            var driving = new AMap.Driving({
              map: map,
              panel: "panel"
            });

            // 根据起终点经纬度规划驾车导航路线
            driving.search(self.currentLngLat, marker.getPosition());
          }else {
            //步行导航
            var walking = new AMap.Walking({
              map: map,
              panel: "panel"
            });
            // walking.clearLineMark();
            //根据起终点坐标规划步行路线
            walking.search(self.currentLngLat, marker.getPosition(),function(status, result){
              console.log(status,result);
            });
          }
        });
      });
    })

    // 在新中心点添加 marker
    var marker = new AMap.Marker({
      map: map,
      icon:'https://vdata.amap.com/icons/b18/1/2.png',
      position: self.currentLngLat,
      title:'我的位置'
    });
  },
  computed: {
  }
}
</script>

<style>
  .panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
</style>

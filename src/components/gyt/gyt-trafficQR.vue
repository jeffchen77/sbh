<template>
  <div class="pobox" v-show="show">
    <div class="pocos"><img src="static/images/back.png" v-on:click="closeBox()"></div>
    <div class="erm">
      <p class="tit">前往{{mapdata.name}}</p>
      <div class="pouu">
        <div class="pu">
          <ul>
            <li>
              <p class="img"><img src="static/images/goa.png" width="76" height="76"></p>
              <p>驾车：约{{mapLine.driving.duration}}钟，{{mapLine.driving.cost}}元</p>
            </li>
            <li>
              <p class="img"><img src="static/images/gob.png"></p>
              <p>步行：约{{mapLine.walking.duration}}</p>
            </li>
            <li>
              <p class="img"><img src="static/images/goc.png"></p>
              <p>公交：<span v-if="mapLine.bus.duration">约{{mapLine.bus.duration}}，</span><span  v-if="mapLine.bus.lines">可乘坐{{mapLine.bus.lines}}</span></p>
            </li>
          </ul>
        </div>
        <div class="em">
          <span><img :src="QRUrl + gaodeurl + '?from=' + currentGeo.latitude + ',' + currentGeo.longitude + ',当前位置' + ' %26to=' + this.mapdata.posi + ',' + this.mapdata.name + ' %26mode=car'" width="216" height="216"></span>
        </div>
        <p class="emtx">扫描二维码，在手机上查看路线规划信息</p>
      </div>
    </div>
  </div>
</template>

<script>
import {device, fmap, currentGeo, gaodeurl, QRUrl} from '../../utils/constant'
export default {
  name: '',
  data () {
    return {
      show: true,
      mapLine:{
        driving:{},
        bus:{},
        walking:{}
      },
      currentGeo:currentGeo,
      mapurl:'',
      gaodeurl: gaodeurl,
      QRUrl:QRUrl
    }
  },
  props: [
    'mapdata'
  ],
  methods: {
    closeBox: function () {
      this.show = false
    },
    initData: function(){
      debugger;
      console.log(this.mapdata.posi + this.mapdata.name);
      var self = this;
      self.show = true;
      var currentGeo = this.currentGeo.latitude + "," + this.currentGeo.longitude
      this.$api.get('map/direction?origin=' +currentGeo + '&destination=' + self.mapdata.posi, r => {
        self.mapLine.driving = r.driving;
        self.mapLine.bus = r.bus;
        self.mapLine.walking = r.walk;
      });
    }
  },
  mounted: function () {
    debugger;
    this.mapurl = QRUrl + gaodeurl + '?from=' + currentGeo.latitude + ',' + currentGeo.longitude + ',当前位置' + '&to=' + this.mapdata.posi + ',' + this.mapdata.name + 'mode=car';
    console.log(this.mapdata.posi + this.mapdata.name);
    this.initData();
  },
  watch:{
    mapdata: function(newValue, oldValue){
      console.log("==================");
      console.log(newValue);
      this.initData();
    }
  }
}
</script>

<style>
</style>

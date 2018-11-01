<template>
  <div class="main ybg">
    <div class="pople"><img src="static/images/people.png"></div>
    <indexHeader></indexHeader>
    <indexRight></indexRight>
    <div class="vino">
      <gyt-traffic-box></gyt-traffic-box>
      <div class="obox mt40">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p>已经为您规划好路线</p>
        </div>
      </div>
      <div class="mt40"><img src="static/images/huat.png"></div>
    </div>
    <gyt-traffic-q-r :mapdata="mapdata"></gyt-traffic-q-r>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import gytTrafficBox from '@/components/gyt/gyt-trafficBox.vue'
import gytTrafficQR from '@/components/gyt/gyt-trafficQR.vue'
export default {
  name: '',
  components: { indexHeader, indexRight, gytTrafficBox, gytTrafficQR },
  data () {
    return {
      mapdata:{
      }
    }
  },
  created () {
    this.mapdata.name = this.$route.query.name;
    this.mapdata.startlatLng = this.$route.query.start;
    this.mapdata.endlatlng = this.$route.query.end;
  }
}
</script>

<style scoped>

</style>

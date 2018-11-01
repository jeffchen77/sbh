<template>
  <div class="main ybg">
    <indexHeader></indexHeader>
    <sbt-map-box ref="map" :mapdata="mapdata"></sbt-map-box>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import sbtMapBox from '@/components/sbt/sbt-MapBox.vue'
import {device, fmap} from '../utils/constant'
export default {
  name: '',
  components: { indexHeader, indexRight, sbtMapBox },
  data () {
    return {
      mapdata:{
        fmapId:fmap.fmapId,
        groupId: device.posi.groupID,
        posi: device.posi
      },
      rightMenus: [
        {floor: 'F3', index: 5, current: false, desc: '主营美容、美发、美甲'},
        {floor: 'F2', index: 4, current: false, desc: '主营女装、流行、化妆品'},
        {floor: 'F1', index: 3, current: false, desc: '主营男装、休闲、商务'},
        {floor: 'B1', index: 2, current: false, desc: '主营运动、生活、娱乐'},
        {floor: 'B2', index: 1, current: true, desc: '主营美食'}
      ],
      storeShow: false,
      rightMenuShow: true

    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>

<template>

  <div class="main ybg">
    <div class="pople"><img src="static/images/people.png"></div>
    <indexHeader></indexHeader>
    <mapPavilionBox :deviceInfo="deviceInfo" v-if="showdetail"></mapPavilionBox>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import mapPavilionBox from '@/components/map/map-pavilion.vue'
export default {
  name: '',
  components: { indexHeader, indexRight, mapPavilionBox },
  data () {
    return {
      deviceInfo:{posiType:'p', pavIndex:1, mapView:1},
      showdetail: true
    }
  }
}
</script>

<style scoped>

</style>

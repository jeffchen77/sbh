<template>
  <div class="main ybg">
    <div class="pople"><img src="static/images/people.png"></div>
    <indexHeader></indexHeader>
    <indexRight></indexRight>
    <div class="vino">
      <div class="dtex mt40">
        <div class="dti"></div>
        <div class="dbi"></div>
        <div class="dci">
          <p>我想到处去逛逛</p>
        </div>
      </div>

      <div class="obox mt40">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p>已经给你列出了数博会场、酒 店、港口等目的地，选择一个 地点，我会为您推荐最佳路线</p>
        </div>
      </div>
      <gyt-traffic-box></gyt-traffic-box>
      <div class="mt40"><img src="static/images/huat.png"></div>
    </div>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import gytTrafficBox from '@/components/gyt/gyt-trafficBox.vue'
export default {
  name: '',
  components: { indexHeader, indexRight, gytTrafficBox }
}
</script>

<style scoped>

</style>

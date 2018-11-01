<template>

  <div class="main ybg">
    <div class="pople"><img src="static/images/people.png"></div>
    <indexHeader></indexHeader>
    <indexRight></indexRight>
    <div class="vino">
      <div class="votit"><span><i class="ic1"></i><i class="ic2"></i>您可以向我了解以下内容</span></div>
      <gyt-content-box></gyt-content-box>
      <div class="dtex mt40">
        <div class="dti"></div>
        <div class="dbi"></div>
        <div class="dci">
          <p>我想了解贵阳特色美食</p>
        </div>
      </div>
      <div class="mt40"><img src="static/images/huat.png"></div>
    </div>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import gytContentBox from '@/components/gyt/gyt-ContentBox.vue'
export default {
  name: '',
  components: { indexHeader, indexRight, gytContentBox },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>

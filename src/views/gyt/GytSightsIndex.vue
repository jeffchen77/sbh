<template>

  <div class="main ybg">
    <div class="pople"><img src="static/images/people.png"></div>
    <indexHeader></indexHeader>
    <indexRight></indexRight>
    <div class="vino">
      <div class="votit"><span><i class="ic1"></i><i class="ic2"></i>您可以向我了解以下内容</span></div>
      <div class="dtex mt40">
        <div class="dti"></div>
        <div class="dbi"></div>
        <div class="dci">
          <p>给我推荐景点</p>
        </div>
      </div>
      <div class="obox mt40 tm7">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p style="color:#d4d5d7">请看下图列举的景点信息。</p>
        </div>
      </div>
      <div class="mt40"><img src="static/images/huat.png"></div>
    </div>
    <sightsListBox></sightsListBox>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import sightsListBox from '@/components/gyt/gyt-sightsListBox.vue'
export default {
  name: '',
  components: { indexHeader, indexRight, sightsListBox },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>

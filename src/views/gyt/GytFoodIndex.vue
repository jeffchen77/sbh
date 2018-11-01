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
          <p>我想了解贵阳特色美食</p>
        </div>
      </div>
      <div class="obox mt40 tm7">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p style="color:#d4d5d7">欢迎来到林城贵阳！贵阳特色美食以辣和酸为代表，小博强烈建议您查看以下推荐。</p>
        </div>
      </div>
      <div class="mt40"><img src="static/images/huat.png"></div>
    </div>
    <gytUtilityQR :itemGo="enterprise" ></gytUtilityQR>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import gytUtilityQR from '@/components/gyt/gyt-utilityQR'
export default {
  name: '',
  components: { indexHeader, indexRight, gytUtilityQR },
  data () {
    return {
      enterprise:{
        'name':'海底捞火锅',
        'startlatLng':'106.652730,26.650786',
        'endlatlng':'106.658685,26.655163'
      }
    }
  }
}
</script>

<style scoped>

</style>

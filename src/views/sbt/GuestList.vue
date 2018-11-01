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
          <p>今年数博会大咖云集，看看下 面的信息吧。</p>
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
    <sbtGuestListBox v-if="showGuestList" @fireClose="afterGuestListClose()"></sbtGuestListBox>

  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import sbtGuestListBox from '@/components/sbt/sbt-GuestListBox.vue'
export default {
  name: '',
  data () {
    return {
      showGuestList: true
    }
  },
  components: { indexHeader, indexRight, sbtGuestListBox },
  methods: {
    afterGuestListClose: function () {
      this.showGuestList = false
    }
  }
}
</script>

<style scoped>

</style>

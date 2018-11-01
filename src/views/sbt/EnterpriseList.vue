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
          <p>本届数博会有哪些企业参展</p>
        </div>
      </div>

      <div class="obox mt40 tm7">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p>多到数不过来，看看下面的信 息吧。</p>
        </div>
      </div>
      <div class="mt40"><img src="static/images/huat.png"></div>
    </div>
    <sbtEnterpriseListBox v-if="showEnterpriseList" @fireClose="afterEnterpriseListClose()"></sbtEnterpriseListBox>

  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import sbtEnterpriseListBox from '@/components/sbt/sbt-EnterpriseListBox.vue'
export default {
  name: '',
  data () {
    return {
      showEnterpriseList: true
    }
  },
  components: { indexHeader, indexRight, sbtEnterpriseListBox },
  methods: {
    afterEnterpriseListClose: function () {
      this.showEnterpriseList = false
    }
  }
  }
</script>

<style scoped>

</style>

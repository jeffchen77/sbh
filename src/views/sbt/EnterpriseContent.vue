<template>
  <div class="main ybg">
    <div class="pople"><img src="static/images/people.png"></div>
    <indexHeader></indexHeader>
    <indexRight></indexRight>

    <sbtEnterpriseContentBox></sbtEnterpriseContentBox>

  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import indexRight from '@/components/index-right.vue'
import sbtEnterpriseContentBox from '@/components/sbt/sbt-EnterpriseContentBox.vue'
export default {
  name: '',
  components: { indexHeader, indexRight, sbtEnterpriseContentBox }
}
</script>

<style scoped>

</style>

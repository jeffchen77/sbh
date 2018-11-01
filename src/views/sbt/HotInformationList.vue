<template>
  <div class="main ybg">
    <indexHeader></indexHeader>
    <sbtHotInformationListBox v-if="showHotInformationList" @fireClose="afterHotInformationListClose()"></sbtHotInformationListBox>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import sbtHotInformationListBox from '@/components/sbt/sbt-HotInformationListBox'
export default {
  name: '',
  data () {
    return {
      showHotInformationList: true
    }
  },
  components: { indexHeader, sbtHotInformationListBox },
  methods: {
    afterHotInformationListClose: function () {
      this.showHotInformationList = false
    }
  }
}
</script>

<style scoped>

</style>

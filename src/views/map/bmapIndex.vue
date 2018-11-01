<template>
  <div class="">

    <bmapBox :itemInfo="itemInfo" ref="bmapDetail"></bmapBox>
  </div>
</template>

<script>
import bmapBox from '@/components/map/bmap-poi.vue'
export default {
  name: '',
  components: { bmapBox },
  data () {
    return {
      showdetail: true,
      itemInfo:{keywords:'美食',fromMsgType:'S0001'}//1代表弹窗，0代表详情组件
    }
  },
  mounted() {
    let self = this
    console.log('poiMsgType:',self.$refs.bmapDetail.poiMsgType)
  }
}
</script>

<style scoped>

</style>

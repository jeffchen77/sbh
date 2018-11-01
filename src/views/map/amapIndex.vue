<template>
  <div class="">

        <bmapBox :itemInfo="itemInfo"></bmapBox>
      </div>
</template>

<script>
import bmapBox from '@/components/map/bmap-poi-inner.vue'
export default {
  name: '',
  components: {bmapBox },
  data () {
    return {
      showdetail: true,
      itemInfo:{keywords:'美食',type:1}//1代表弹窗，0代表详情组件
    }
  }
}
</script>

<style scoped>

</style>

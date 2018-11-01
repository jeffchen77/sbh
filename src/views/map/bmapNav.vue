<template>
  <div class="">

    <bmapBox :itemInfo="itemInfo"></bmapBox>
  </div>
</template>

<script>
import bmapBox from '@/components/map/bmap-nav.vue'
export default {
  name: '',
  components: { bmapBox },
  data () {
    return {
      showdetail: true,
      itemInfo:{keywords:'贵阳东站',point:[106.717289,26.625847]}//106.641329,26.64611   106.717289,26.625847 106.977224,26.946632
    }
  }
}
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
</style>

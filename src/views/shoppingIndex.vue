<template>
  <div >
    <shoppingBox  :shoppingInfo="shoppingInfo"></shoppingBox>
  </div>
</template>

<script>
import shoppingBox from '@/components/new/shoppingDetailBox'
export default {
  name: '',
  components: {shoppingBox },
  data () {
    return {
      shoppingInfo:{name: '贵阳世纪金源购物中心', img: 'static/images/shopping/new/shiji.jpg'}

    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>

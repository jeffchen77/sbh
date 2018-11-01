<template>
  <div class="mt40">
    <div class="votit"><span><i class="ic1"></i><i class="ic2"></i>您可以向我了解以下内容</span></div>
    <div class="obox mt40">
      <div class="obti" style="z-index: -1"></div>
      <div class="obzi" style="z-index: -4"></div>
      <div class="obbg" style="z-index: 0"></div>
      <div class="obbi" style="z-index: -1"></div>
      <div class="obci kppo" style="z-index: 0">
        <ul class="clearfix">
          <li><img src="static/images/kd1.png" @click="gytSubOpen('FoodList')"></li>
          <li><img src="static/images/kd2.png" @click="gytSubOpen('Traffic')"></li>
          <li><img src="static/images/kd3.png" @click="gytSubOpen('SightsList')"></li>
          <li><img src="static/images/kd4.png" @click="gytSubOpen('HotelList')"></li>
          <li><img src="static/images/kd5.png" @click="gytSubOpen('ShoppingList')"></li>
          <li><img src="static/images/kd6.png" @click="gytSubOpen('CultureList')"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    gytSubOpen: function (subList) {
      if(subList == 'Traffic'){
        this.$parent.triggerSubChat('401')
      }else {
        this.$parent.openStatus(subList)
      }
    }
  }
}
</script>

<style scoped>

</style>

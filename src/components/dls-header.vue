<template>
  <div>
    <!--<div class="vix" v-on:click.stop="gotoGuestAuth"><img src="static/images/qiandao.png"></div>-->
    <div class="zxw" v-on:click.stop="redirectMainPage"><img src="static/images/zixu.png"></div>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    gotoGuestAuth:function(){
      console.log("dsHeader_gotoGuestAuth_from="+this.$root.from+"============="+this.$root.device);
      this.$router.push({path:'/StandByGuestAuth',query:{device:this.$root.device, from:this.$root.from}});
    },
    redirectMainPage:function(){
      console.log("dsHeader_redirectMainPage="+this.$root.from+"=============="+this.$root.from);
      this.$router.push({path:'/', query:{device:this.$root.device, from:this.$root.from}});
    },
  }
}
</script>

<style scoped>

</style>

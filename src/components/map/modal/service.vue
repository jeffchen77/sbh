<template>
  <div class="zytext">
    <div class="zytti"><span><i class="mtlp"></i><i class="mtrp"></i>{{place}}</span></div>
    <div class="zycon">距离您大概 {{Number.parseInt(dist)}} m</div>
    <div class="gotobtn" @click="go()"><span>前往</span></div>
    <div class="ierm" v-if="showQrcode">
      <p><img src="/static/map/erms_03.jpg"></p>
      <p>微信扫描在手机上查看路线</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "service",
    data() {
      return {
        dist: '0',
        place: '卫生间',
        showQrcode:false
      }
    },
    methods: {
      go() {
      }
    }
  }
</script>

<style scoped>
  .ierm {
    bottom: 235px;
  }
</style>

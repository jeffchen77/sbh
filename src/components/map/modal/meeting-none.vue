<template>
  <div class="zytext" style="height: 572px" >
    <div class="zytti"><span><i class="mtlp"></i><i class="mtrp"></i>{{place}}</span></div>
    <div>
      <div class="zycon">暂无安排</div>
    </div>
    <div class="gotobtn" @click="go()"><span>前往</span></div>
    <div class="ierm" v-if="showQrcode">
      <p><img :src="QrSrc"></p>
      <p>微信扫描在手机上查看路线</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "meeting-none",
    data() {
      return {
        showQrcode: false,
        place: '国际会议中心',
        QrSrc: '/static/map/erms_03.jpg'
      }
    },
    methods: {
      go() {
      }
    }
  }
</script>

<style scoped>
  .zytext {
    background: url('../../../assets/map/images/vtxbg.png') no-repeat;
  }
</style>

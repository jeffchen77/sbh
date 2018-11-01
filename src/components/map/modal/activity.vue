<template>
  <div class="zytext">
    <div class="zytti"><span><i class="mtlp"></i><i class="mtrp"></i>{{place}}</span></div>
    <div class="zycon zycon2">{{meetingInfo.theme}}<br>活动时间：{{meetingInfo.time}}</div>
    <div class="gotobtn" @click="go()"><span>前往</span></div>
    <div class="ierm" v-if="showQrcode">
      <p><img :src="QrSrc"></p>
      <p>微信扫描在手机上查看路线</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "activity",
    data() {
      return {
        showQrcode: false,
        meetingInfo: null,
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

</style>

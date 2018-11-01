<template>
  <div class="zytext" style="height: 572px">
    <div class="zytti"><span><i class="mtlp"></i><i class="mtrp"></i>{{place}}</span></div>

    <div class="zycon2">
      <p>{{meetingInfo.theme}}</p>
      <p class="mt10">会议时间：{{meetingInfo.time}}</p>
    </div>
    <div class="vcp">
      <ul class="clearfix">
        <li v-for="guest of meetingInfo.guests">
          <p class="img"><img :src="guest.photo || '/static/index/images/user.jpeg' "></p>
          <p class="name">{{guest.name}}</p>
          <p class="con">{{guest.enterprise}}</p>
        </li>
      </ul>
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
    name: "meeting",
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
  .zytext {
    background: url('../../../assets/map/images/nmbox2.png') no-repeat;
  }

  .clearfix {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

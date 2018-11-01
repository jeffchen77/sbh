<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div id="weatherInfo" class="weatherInfo">
          <img :src="weatherInfo.img"/>
          <div class="content">
            <div class="city">{{weatherInfo.city}}</div>
            <div class="weather">{{weatherInfo.weather}}</div>
            <div class="date">{{weatherInfo.date}}</div>
          </div>
          <div class="temp">{{weatherInfo.templow}}° / {{weatherInfo.temphigh}}°</div>
        </div>
      </div>
    </div>
    <topic2 topicType="weatherInfo" key="keyStatus"></topic2>
  </div>
</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  export default {
    name: 'weatherInfo',
    components: {topic2},
    data() {
      return {
        keyStatus:"",
      }
    },
    props: {
      weatherInfo: {
        type: Object,
        required: true
      }
    },
    methods: {

    },
    created:function () {
      this.weatherInfo.img = 'static/images/weather/' + this.weatherInfo.imgcode + '.png';
    },
    mounted: function () {
      var self = this;
      self.keyStatus = "" + new Date();

    },
    computed: {
    },
  }
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
  .weatherInfo{
    width: 980px !important;
    height: 390px;
    overflow-y: hidden;
    background: url(/static/0428/images/ia_03.png) repeat-x;
    border: 1px solid #00bffd;
    color: #00e2ff;
    font-size: 30px;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    top: 0px;
  }
  .weatherInfo img{
    width: 300px;
    height: 300px;
    margin-left: 40px;
    margin-top: 40px;
    margin-right: 40px;
    float: left;
  }
  .weatherInfo .content{
    float: left;
    width: 260px;
    text-align: center;
    color: white;
  }
  .weatherInfo .content .city{
    font-size: 50px;
    margin-top: 80px;
    margin-bottom: 50px;
  }
  .weatherInfo .temp{
    float: left;
    text-align: center;
    height: 380px;
    line-height: 380px;
    width: 300px;
    font-size: 50px;
    color: white;
  }
</style>

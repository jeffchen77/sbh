<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div class="weatherInfo">
          <div v-if="this.weatherList.weather.length > 0" class="date">{{weatherList.weather[0].date}}</div>
          <div v-if="this.weatherList.weather.length > 0" class="weather">{{weatherList.weather[0].weather}}</div>
          <img v-if="this.weatherList.weather.length > 0" :src="weatherList.weather[0].imgcode"/>
          <div v-if="this.weatherList.weather.length > 0" class="temp">{{weatherList.weather[0].templow}}° / {{weatherList.weather[0].temphigh}}°</div>
        </div>
        <div class="weatherInfo">
          <div v-if="this.weatherList.weather.length > 1" class="date">{{weatherList.weather[1].date}}</div>
          <div v-if="this.weatherList.weather.length > 1" class="weather">{{weatherList.weather[1].weather}}</div>
          <img v-if="this.weatherList.weather.length > 1" :src="weatherList.weather[1].imgcode"/>
          <div v-if="this.weatherList.weather.length > 1" class="temp">{{weatherList.weather[1].templow}}° / {{weatherList.weather[1].temphigh}}°</div>
        </div>
        <div class="weatherInfo">
          <div v-if="this.weatherList.weather.length > 2" class="date">{{weatherList.weather[2].date}}</div>
          <div v-if="this.weatherList.weather.length > 2" class="weather">{{weatherList.weather[2].weather}}</div>
          <img v-if="this.weatherList.weather.length > 2" :src="weatherList.weather[2].imgcode"/>
          <div v-if="this.weatherList.weather.length > 2" class="temp">{{weatherList.weather[2].templow}}° / {{weatherList.weather[2].temphigh}}°</div>
        </div>
        <div class="weatherInfo">
          <div v-if="this.weatherList.weather.length > 3" class="date">{{weatherList.weather[3].date}}</div>
          <div v-if="this.weatherList.weather.length > 3" class="weather">{{weatherList.weather[3].weather}}</div>
          <img v-if="this.weatherList.weather.length > 3" :src="weatherList.weather[3].imgcode"/>
          <div v-if="this.weatherList.weather.length > 3" class="temp">{{weatherList.weather[3].templow}}° / {{weatherList.weather[3].temphigh}}°</div>
        </div>
      </div>
    </div>
    <topic2 topicType="weatherInfo" key="keyStatus"></topic2>
  </div>
</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  export default {
    name: 'weatherList',
    components: {topic2},
    data() {
      return {
        keyStatus:"",
      }
    },
    props: {
      weatherList: {
        type: Object,
        required: true
      }
    },
    methods: {

    },
    created:function () {
      var weathers = this.weatherList.weather;
      if (weathers.length > 0){
        for(var i = 0; i < weathers.length; i++){
          weathers[i].date = weathers[i].date.substr(5);
          weathers[i].imgcode = 'static/images/weather/' + weathers[i].imgcode + '.png';
        }
      }
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
    width: 200px;
    height: 390px;
    overflow-y: hidden;
    background: url(/static/0428/images/ia_03.png) repeat-x;
    border: 1px solid #00bffd;
    color: #00e2ff;
    font-size: 30px;
    border-radius: 10px;
    float: left;
    margin: 20px;
    text-align: center;
    color: white;
  }
  .weatherInfo .date{
    margin-top: 40px;
  }
  .weatherInfo img{
    width: 120px;
    margin: 20px;
  }
</style>

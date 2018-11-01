<template>
  <div class="obox mt40 tm7">
    <div class="obti"></div>
    <div class="obzi"></div>
    <div class="obbg"></div>
    <div class="obbi"></div>
    <div class="obci">
      <div class="adsli swiper-container">
        <div class="swiper-wrapper">
          <ul class="swiper-slide" v-for="items in trafficArray">
            <li v-for="item in items" v-on:click="updateData(item.name, item.pos)">{{item.name}}<em></em></li>
          </ul>
        </div>
      </div>
      <div class="swiper-pagination" id="traffic-swiper-pagination"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      showFlag: false,
      mapdata:{},
      trafficArray:[
        [
          {name:'国际生态会议中心', pos:'106.642742,26.643441' },
          {name:'国际会议展览中心', pos:'106.646165,26.644831' },
          {name:'贵阳龙洞堡国际机场', pos:'106.801330,26.541090' },
          {name:'贵阳北火车站', pos:'106.674880,26.619320' }
        ],
        [
          {name:'贵阳东站', pos:'106.744500,26.665090' },
          {name:'金阳客车站', pos:'106.581250,26.594660' },
          {name:'黔灵山公园', pos:'106.692830,26.595690' },
          {name:'黔灵山公园', pos:'106.692830,26.595690' }
        ]
      ]
    }
  },
  mounted: function () {
    var mySwiper = new Swiper('.swiper-container', {// eslint-disable-line no-unused-vars
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      observer: true,
      observeParents: true,
      watchOverflow: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        autoplayDisableOnInteraction: true
      },
      preventClicks: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  },
  methods:{
    updateData: function (name, position) {
      console.log(position);
      debugger;
      this.$parent.triggerTrafficQr("TrafficQR", {name:name, posi:position});

    }
  }
}
</script>

<style>
  @import'../../../node_modules/swiper/dist/css/swiper.min.css';
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  #traffic-swiper-pagination{
    width: 100%;
    margin-left: -54px;
  }
  .swiper-pagination-bullet{
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: white;
    opacity: 100;
    margin-left: 10px !important;
  }
  .obbg{
    pointer-events: none;
  }
</style>

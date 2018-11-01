<template>
  <div class="mt40">
    <div class="votit"><span><i class="ic1"></i><i class="ic2"></i>您可以向我了解以下内容</span></div>
    <div class="obox mt40">
      <div class="obti" style="z-index: -1"></div>
      <div class="obzi" style="z-index: -4"></div>
      <div class="obbg" style="z-index: 0"></div>
      <div class="obbi" style="z-index: -1"></div>
      <div class="obci" style="z-index: 0;">
          <!--<p class="goed gol"><img src="static/images/goli.png" width="50" height="70"></p>-->
          <!--<p class="goed gor"><img src="static/images/gori.png" width="50" height="70"></p>-->
          <div id="swiperBannerSbh" class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide"  v-for="(subItem,index) in slidedata"  :key="index" >
                <div class="golk">
                  <ul class="clearfix">
                  <li v-for="(buttonItem,index) in subItem.data" :key="index"><img :src="buttonItem.img" @click="sbtSubOpen(buttonItem.boxName)"></li>
                  <!--<li><img src="static/images/go2.png"></li>-->
                  <!--<li><img src="static/images/go3.png"></li>-->
                  <!--<li><img src="static/images/go4.png"></li>-->
                  </ul>
                <!--<div class="dian"><a href="#" class="cur"></a><a href="#"></a><a href="#"></a></div>-->
                </div>
              </div>
            </div>
            <div class="swiper-pagination" ></div>
            <div class="swiper-button-next" style="margin-top:-50px"></div>
            <div class="swiper-button-prev" style="margin-top:-50px"></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
export default {
  name: '',
  data () {
    return {
      slidedata: [],
      sbhSub: [
        {img: 'static/images/go1.png',boxName: 'wachingPoint', status: false },
        {img: 'static/images/go2.png',boxName: 'GuestList', status: false },
        {img: 'static/images/go3.png',boxName: 'BranchHallList', status: false },
        {img: 'static/images/go4.png',boxName: 'EnterpriseList', status: false },
        {img: 'static/images/go4.png',boxName: 'GuestList', status: false }
      ]
    }
  },
  methods: {
    sbtSubOpen: function (subList) {
      this.$parent.openStatus(subList)
    },
    groupByData: function () {
      let self = this
      var alldata = []
      var index = 0
      for (var j = 0; j < self.sbhSub.length; j = j + 4) {
        var pagedata = []
        for (var i = 0; i < 4; i++) {
          if (index < self.sbhSub.length) {
            pagedata.push(self.sbhSub[index])
          }
          index++
        }
        alldata.push({data: pagedata})
      }
      return alldata
    },
    getSwiper () {
      var mySwiper = new Swiper('#swiperBannerSbh', {// eslint-disable-line no-unused-vars
        speed:1000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          autoplayDisableOnInteraction: false
        },
        preventClicks: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    }
  },
  mounted: function (){
    this.getSwiper()
    this.slidedata = this.groupByData()
  }
}
</script>

<style scoped>
@import'../../../node_modules/swiper/dist/css/swiper.min.css';
</style>

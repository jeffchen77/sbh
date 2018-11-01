<template>
  <div class="pobox pobox3">
    <div class="pocos"><img src="static/images/pocos.png" v-on:click="closeBox()"></div>
    <div class="mopr">
      <p class="tit">2018年数博会参会嘉宾</p>
      <div class="golk">
        <div class="swiper-container">
          <div class="swiper-wrapper">
           <div class="swiper-slide" v-for="n in slideCount" style="padding-bottom: 20px;">
                <ul class="clearfix">
                  <li v-for="m in guestList[n-1]">
                    <div class="usbk"><p class="img"><img v-bind:src="m.photo" width="146px" height="146px"></p></div>
                    <p class="name" style="width:250px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ m.name }}</p>
                    <p class="zw" style="width:250px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ m.position }}</p>
                  </li>
                </ul>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
          <!-- Add Arrows -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import '../../../node_modules/swiper/dist/css/swiper.min.css'
export default {
  name: '',
  data () {
    return {
      guestList: [],
      slideCount: 0
    }
  },
  methods: {
    closeBox: function () {
      this.$emit('fireClose')
    },
    initSwiper: function(){
      new Swiper('.swiper-container', {
        autoplay: {
          delay: 5000,
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
      });
    },
    initData: function(){
      let self = this;
      self.$api.get('guests/findByPage?currentPage=1&pageSize=100', r => {
        self.slideCount = Math.ceil(r.data.length / 6);
        for(var index=0; index<self.slideCount; index++){
          self.guestList.push(r.data.slice(index*6, index*6+6));
        }
      });
    },
  },
  mounted: function () {
     this.initSwiper();
     this.initData();
  },
  computed: {
  },
}
</script>
<style scoped>

</style>

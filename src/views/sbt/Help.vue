<template>
  <div class="mt40">
    <div class="votit">
      <div class="swiper-container" style="width:1000px;">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(menuItem,index) in menu" :key="index">
            <img :src="menuItem.img">
          </div>
        </div>
      </div>
      <topic topicType="helpTopic"></topic>
    </div>
  </div>
</template>

<script>
import topic from '@/components/new/sbt-topic.vue'
let loop = -1;
export default {
  name: 'help',
  components: {topic},
  data () {
    return {
      menu: [
        {img: 'static/images/go1.png',boxName: 'wachingPoint', status: false },
        {img: 'static/images/go2.png',boxName: 'GuestList', status: false },
        {img: 'static/images/go3.png',boxName: 'BranchHallList', status: false },
        {img: 'static/images/go4.png',boxName: 'EnterpriseList', status: false },
        {img: 'static/images/go4.png',boxName: 'GuestList', status: false },
        {img: 'static/images/go4.png',boxName: 'GuestList', status: false },
        {img: 'static/images/go4.png',boxName: 'GuestList', status: false },
        {img: 'static/images/go4.png',boxName: 'GuestList', status: false }
      ]
    }
  },
  methods: {
    getSwiper () {
      var mySwiper = new Swiper('.swiper-container', {
        loop:false,
        speed:1000,
        slidesPerView: 5,
        spaceBetween: 30,
        autoplay: {
          //delay: 2000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        preventClicks: false,
      })
    },
  },
  mounted: function (){
    this.getSwiper();
  }
}
</script>

<style scoped>
</style>

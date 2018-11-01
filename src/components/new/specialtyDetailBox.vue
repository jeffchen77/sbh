<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div :id="'specialtyDetailSwiper'+idrandom" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="slide1 swiper-slide">
              <div class="xqit">
                <div class="img"><img :src="content.img" width="225" height="325"></div>
                <div class="txt">
                  <p class="tit">{{content.name}}</p>
                  <div class="con" style="text-align:left;">{{content.description}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="xqmap" style="width: 777px">
                <bmap-poi-inner :itemInfo="itemInfoChild" ref="specialtyPoiInner"></bmap-poi-inner>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="specialtyDetail" key="keyStatus"></topic2>
  </div>

</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  import BmapPoiInner from '@/components/map/bmap-poi-inner.vue'
export default {
  name: 'specialtyDetailBox',
  components: {topic2, BmapPoiInner},
  data() {
    return {
      keyStatus:"",
      content: {name: '', img: '', description: ''},
      itemInfoChild:{keywords:"黔粹行"},
      idrandom:"",
      swiper:null,
    }
  },
  props: {
    specialtyInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    initSwiper: function(){
      this.swiper = new Swiper('#specialtyDetailSwiper'+this.idrandom, {
        slidesPerView:1,
        noSwiping : true,
        spaceBetween: 10,
        speed:5000,
        autoplay: {
          delay: 3000,
          stopOnLastSlide:true,
          disableOnInteraction: true
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        on:{
          transitionStart: function(){
            if($(".swiper-slide-active").hasClass("slide1")){
              this.slideTo(0, 5000, false);
            }else{
              this.setTranslate(-540)
            }
          }
        }
      });
    },
  },
  created:function () {
    this.idrandom = "" + (new Date()).getTime();
    // this.itemInfoChild.keywords = this.specialtyInfo.name;
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
    //self.content.img = self.specialtyInfo.img;
    self.$api.askContent(self.specialtyInfo.name,"",  (res) => {
      switch (res.type) {
        case '4008':
          self.content.name = res.name
          self.content.img = res.img
          self.content.description = res.profile
          break
        default: {
          break
        }
      }
    })

  },
  computed: {
  },
}
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
  .slide1{
    width: 667px !important;
  }
</style>

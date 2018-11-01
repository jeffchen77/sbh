<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div :id="'foodDetailSwiper'+idrandom" class="swiper-container">
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
                <bmap-poi-inner :itemInfo="itemInfoChild" ref="foodPoiInner"></bmap-poi-inner>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="foodDetail" key="keyStatus"></topic2>
  </div>

</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  import BmapPoiInner from '@/components/map/bmap-poi-inner.vue'
export default {
  name: 'foodDetailBox',
  components: {topic2, BmapPoiInner},
  data() {
    return {
      keyStatus:"",
      content: {name: '', img: '', description: ''},
      itemInfoChild:{keywords:"",fromMsgType:'',msgNum:''},
      idrandom:"",
      swiper:null,
    }
  },
  props: {
    foodInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    initSwiper: function(){
      this.swiper = new Swiper('#foodDetailSwiper'+this.idrandom, {
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
    this.itemInfoChild.keywords = this.foodInfo.name;
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
    //self.content.img = self.foodInfo.img;
    self.$api.ask(self.foodInfo.name, (res) => {
      switch (res.type) {
        case '300':
          self.content.name = res.name
          self.content.img = res.image
          self.content.description = res.profile
          self.itemInfoChild.fromMsgType = '300'
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

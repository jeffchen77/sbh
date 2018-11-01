<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div :id="'HCDetailSwiper'+ idrandom" class="swiper-container" style="width: 1380px;">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="xqit">
                <div class="img"><img :src="content.img" width="225" height="325"></div>
                <div class="txt">
                  <p class="tit">{{content.title}}</p>
                  <div class="con" style="text-align: left">{{content.description}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide" id="label1" v-for="(la,index) in content.label" :key="index">
              <div class="xqit">
                <div class="img"><img :src="la.img" width="225" height="325"></div>
                <div class="txt">
                  <p class="tit">{{la.name}}</p>
                  <div class="con" style="text-align: left">{{la.content}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide" id="label2">

            </div>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="humanAndCultureDetail" key="keyStatus"></topic2>
  </div>

</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  import BmapPoi from '@/components/map/bmap-poi.vue'
export default {
  name: 'humanAndCultureDetailBox',
  components: {topic2, BmapPoi},
  data() {
    return {
      keyStatus:"",
      content: {name: '', img: '', description: '', label:[], title:''},
      itemInfoChild:{keywords:"",type:0},
      idrandom:"",
    }
  },
  props: {
    humanAndCultureInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    initSwiper: function(){
      new Swiper('#HCDetailSwiper'+this.idrandom, {
        slidesPerView:2,
        speed:1000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        on: {
          slideChangeTransitionStart: function(){
            $("#secondSlid").css({"width":"1000px"});
          },
        },
      });
    },
  },
  created:function () {
    this.idrandom = "" + (new Date()).getTime();
    this.itemInfoChild.keywords = this.humanAndCultureInfo.name;
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    self.initSwiper();
    self.content.img = self.humanAndCultureInfo.img;
    self.content.title = self.humanAndCultureInfo.title;
    self.$api.ask(self.humanAndCultureInfo.name, (res) => {
      console.log('人文detail robot返回::'+ JSON.stringify(res))
      switch (res.type) {
        case 0:
        case '800':
          self.content.name = res.name
          self.content.description = res.profile
          self.content.label = res.label
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
</style>

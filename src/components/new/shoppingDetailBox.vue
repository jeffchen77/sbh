<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div :id="'shoppingDetailSwiper'+idrandom" class="swiper-container" style="width: 1380px;">
          <div class="swiper-wrapper">
            <div class="slide1 swiper-slide">
              <div class="xqit">
                <p class="tit" style="text-align: center;">{{content.name}}</p>
                <div class="img"><img :src="content.img" ></div>
                <div class="txt hotel_description">
                  <div class="con description-content" style="color: white; height: 273px; overflow: hidden;text-align: left">{{content.description}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide" id="secondSlid">
              <div class="xqmap" style="width: 777px">
                <bmap-poi-inner :itemInfo="itemInfoChild" ref="shoppingPoiInner"></bmap-poi-inner>
              </div>
            </div>
            <div class="swiper-slide"></div>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="shoppingDetail" :key="keyStatus"></topic2>
  </div>

</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  import BmapPoiInner from '@/components/map/bmap-poi-inner.vue'
export default {
  name: 'shoppingDetailBox',
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
    shoppingInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    initSwiper: function(){
      this.swiper = new Swiper('#shoppingDetailSwiper'+this.idrandom, {
        slidesPerView:2,
        noSwiping : true,
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
    this.itemInfoChild.keywords = this.shoppingInfo.name;
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
    self.$api.ask(self.shoppingInfo.name, (res) => {
      switch (res.type) {
        case '700':
          self.content.name = res.name
          self.content.img = res.image
          self.content.description = res.profile
          self.itemInfoChild.fromMsgType = '700'
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
  .msxq .xqit .img{
    left: 0;
    right: 0;
    bottom: -4px;
    top: 65px;
  }

  .img>img{
    left: 0;
    right: 0;
    bottom: -8px;
    width: 667px;
    height: 325px;
  }

  .msxq .xqit{
    width: 667px;
    padding:0;
    height: 387px;
    padding-bottom: 0;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;

  }

  .hotel-name{
    padding-top: 8px;
    color: white;
  }

  .hotel_description{
    background: rgba(18, 23, 101, 0.75);
    height: 295px;
    position: absolute;
    width: 60%;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    top: 65px;
  }

  .description-content{
    color: white;
    height: 100%;
    overflow: hidden;
  }

  .ico_price{
    background:url(/static/images/hotal/price.png) no-repeat;
    width:35px;
    height:35px;
    position:absolute;
    top:5px;
    left:20px
  }

  .ico_addr{
    background:url(/static/images/hotal/addr.png) no-repeat;
    width:35px;
    height:35px;
    position:absolute;
    top:5px;
    left:20px
  }

  .ico_phone{
    background:url(/static/images/hotal/phone.png) no-repeat;
    width:35px;
    height:35px;
    position:absolute;
    top:5px;
    left:20px
  }

  .ico_service{
    background:url(/static/images/hotal/service.png) no-repeat;
    width:35px;
    height:35px;
    position:absolute;
    top:5px;
    left:20px
  }
  .slide1{
    width: 667px !important;
  }
</style>

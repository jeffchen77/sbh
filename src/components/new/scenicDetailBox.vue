<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div :id="'scenicDetailSwiper' + idrandom" class="swiper-container" style="width: 1380px;">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="xqit">
                <div class="img"><img :src="content.img" width="225" height="325"></div>
                <div class="txt">
                  <p class="tit">{{content.name}}</p>
                  <div class="con" style="text-align:left;">{{content.description}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="xqtip">
                <div><p class="tit">景点小贴士</p></div>
                <div>
                  <ul>
                    <li><img src="../../../static/0506/images/time.png"/><span class="spantitle">开放时间：</span><span class="spancontent1">{{content.time}}</span></li>
                    <li><img src="../../../static/0506/images/ticket.png"/><span class="spantitle">门票：</span><span class="spancontent2">{{content.ticket}}</span></li>
                    <li><img src="../../../static/0506/images/duration.png"/><span class="spantitle">游玩时长：</span><span class="spancontent1">{{content.play}}</span></li>
                    <li><img src="../../../static/0506/images/sun.png"/><span class="spantitle">最佳季节：</span><span class="spancontent1">{{content.season}}</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="xqmap" style="width: 920px">
                <bmap-poi-inner :itemInfo="itemInfoChild" ref="foodPoiInner"></bmap-poi-inner>
              </div>
            </div>
            <div class="swiper-slide"></div>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="helpTopic" key="keyStatus"></topic2>
  </div>

</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  import BmapPoiInner from '@/components/map/bmap-poi-inner.vue'
export default {
  name: 'scenicDetailBox',
  components: {topic2, BmapPoiInner},
  data() {
    return {
      keyStatus:"",
      content: {name: '', img: '', description: '', play:'', ticket:'', season:'', time:'', location:''},
      idrandom:"",
      itemInfoChild:{keywords:"",fromMsgType:'',msgNum:''}
    }
  },
  props: {
    scenicInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    initSwiper: function(){
      new Swiper('#scenicDetailSwiper' + this.idrandom, {
        slidesPerView:2,
        speed:1000,
        autoplay: {
          delay: 2000,
          stopOnLastSlide:true,
          disableOnInteraction: true
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
      });
    },
  },
  created:function () {
    this.idrandom = "" + (new Date()).getTime();
    this.itemInfoChild.keywords = this.scenicInfo.name;
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
    self.content.img = self.scenicInfo.img;
    console.log("self.scenicInfo.name="+self.scenicInfo.name);
    self.$api.ask(self.scenicInfo.name, (res) => {
      console.log(res)
      switch (res.type) {
        case '500':
          console.log("500 in")
          self.content.name = res.name
          self.content.description = res.profile
          self.content.ticket = res.ticket
          self.content.time = res.time
          self.content.play = res.play
          self.content.season = res.Season
          self.itemInfoChild.fromMsgType = '500'
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

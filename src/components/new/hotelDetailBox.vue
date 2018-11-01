<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div id="hotelDetailSwiper" class="swiper-container" style="width: 1380px;">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="xqit">
                <p class="tit hotel-name" style="padding-top: 8px;color: white; font-size: 28px;">{{content.name}}</p>
                <div class="img"><img :src="hotelInfo.img" ></div>
                <div class="txt hotel_description">
                  <div class="con description-content" style="color: white; height: 273px; overflow: hidden;">{{content.description}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="xqit">
                  <div class="tit" style="padding-top: 8px;color: white; font-size: 28px;">酒店信息</div>
                  <div class="con">
                    <div class="snt tot" style="text-align: left">
                      <div style="padding-left: 30px; width: 560px; font-size: 25px; color: white;"><i class="ico ico_price"></i>价格:{{content.price}} <br/><span style="font-size:16px;;">具体价格以酒店当日价格为准</span></div>
                    </div>
                    <div class="snt" style="text-align: left">
                      <div style="padding-left: 30px; width: 560px; font-size: 25px; color: white;"><i class="ico ico_addr"></i>商家地址: {{content.addr}}</div>
                    </div>
                    <div class="snt" style="text-align: left">
                      <div style="padding-left: 30px; width: 560px; font-size: 25px; color: white;"><i class="ico ico_phone"></i>电话: {{content.phone}}</div>
                    </div>
                    <div class="snt" style="text-align: left">
                      <div style="padding-left: 30px; width: 560px; font-size: 25px; color: white;"><i class="ico ico_service"></i>提供服务: {{content.service}}</div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="swiper-slide" id="secondSlid">
              <div class="xqmap" style="width: 920px">
                <bmap-poi-inner :itemInfo="itemInfoChild" ref="hotelPoiInner"></bmap-poi-inner>
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
  name: 'hotelDetailBox',
  components: {topic2, BmapPoiInner},
  data() {
    return {
      keyStatus:"",
      content: {name: '', img: '', description: '', price:'', addr:'', phone:'', service:''},
      itemInfoChild:{keywords:""}
    }
  },
  props: {
    hotelInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    initSwiper: function(){
      new Swiper('#hotelDetailSwiper', {
        slidesPerView:2,
        speed:1000,
/*        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },*/
        observer: true,
        observeParents: true,
        watchOverflow: true,
      });
    },
  },
  created:function () {
    this.itemInfoChild.keywords = this.hotelInfo.name;
  },
  mounted: function () {
    debugger;
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
    console.log("======" + self.hotelInfo)
    //self.content.img = self.foodInfo.img;
    self.$api.askContent(self.hotelInfo.name, null, (res) => {
      switch (res.type) {
        case '600':
          self.content.name = res.name;
          self.content.img = res.image;
          self.content.description = res.profile;
          self.content.addr = res.addr;
          self.content.price = res.price;
          self.content.phone = res.phone;
          self.content.service = res.service;
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
    background: rgba(190, 194, 250,0.6);
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
</style>

<template>
  <div class="poli1">
    <div class="opita">
<!--      <div class="tit">数博会嘉宾</div>-->
      <div :id="'guestListSwiper'+keyStatus" class="swiper-container">
        <div class="swiper-wrapper">

          <div class="swiper-slide" v-if="type=='ALL' || type=='GOV'">
            <div class="cuser clearfix">
              <span class="user user3">政府嘉宾（{{govTotal}}位）</span>
            </div>
            <div :id="'govListSwiper'+keyStatus" class="swiper-container slide">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(gov,index1) in govData" :key="index1" data-swiper-autoplay="1000">
                  <div class="slide1">
                    <div class="cvip">
                    <ul class="clearfix">
                      <li v-for="(item,index2) in gov.data" :key="index2">
                        <p class="img"><img :src="item.photo" style="width: 90px; height: 90px;" :data-parent="type=='ALL'?0:0" :data-current="index1" :data-name="item.name" data-swiper="gov"></p>
                        <p class="name">{{ item.name }}</p>
                        <p class="text2">{{ item.position }}</p>
                      </li>
                    </ul>
                  </div>
                  </div>
                </div>
              </div>
              <!-- Add Arrows -->
              <div class="swiper-button-next pre"></div>
              <div class="swiper-button-prev next"></div>
            </div>
          </div>

          <div class="swiper-slide" v-if="type=='ALL' || type=='EXP'">
            <div class="cuser clearfix">
              <span class="user">专家（{{expTotal}}位）</span>
            </div>
            <div :id="'expListSwiper'+keyStatus" class="swiper-container slide">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(exp,index1) in expData" :key="index1" data-swiper-autoplay="1000">
                  <div class="slide1">
                    <div class="cvip">
                      <ul class="clearfix">
                        <li v-for="(item,index2) in exp.data" :key="index2">
                          <p class="img"><img :src="item.photo" style="width: 90px; height: 90px;" :data-parent="type=='ALL'?1:0" :data-current="index1" :data-name="item.name" data-swiper="exp"></p>
                          <p class="name">{{ item.name }}</p>
                          <p class="text2">{{ item.position }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Add Arrows -->
              <div class="swiper-button-next pre"></div>
              <div class="swiper-button-prev next"></div>
            </div>
          </div>

          <div class="swiper-slide" v-if="type=='ALL' || type=='ENT'">
            <div class="cuser clearfix">
              <span class="user user2">企业嘉宾（{{entTotal}}位）</span>
            </div>
            <div :id="'entListSwiper'+keyStatus" class="swiper-container slide">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(ent,index1) in entData" :key="index1" data-swiper-autoplay="1000">
                  <div class="slide1">
                    <div class="cvip">
                      <ul class="clearfix">
                        <li v-for="(item,index2) in ent.data" :key="index2">
                          <p class="img"><img :src="item.photo" style="width: 90px; height: 90px;" :data-parent="type=='ALL'?2:0" :data-current="index1" :data-name="item.name" data-swiper="ent"></p>
                          <p class="name">{{ item.name }}</p>
                          <p class="text2">{{ item.position }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Add Arrows -->
              <div class="swiper-button-next pre"></div>
              <div class="swiper-button-prev next"></div>
            </div>
          </div>
        </div>
      </div>
      <topic2 topicType="guestList" key="keyStatus"></topic2>
    </div>

  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'guestListBox',
  data() {
    return {
      keyStatus:"",
      govTotal:0,
      govData:[],//政府嘉宾
      entTotal:0,
      entData:[],//企业嘉宾
      expTotal:0,
      expData:[],//专家嘉宾
      govSwiper:null,
      expSwiper:null,
      entSwiper:null,
      guestSwiper:null,
      type:'ALL',
      name:null,
    }
  },
  components: {topic2},
  props: {
    guestInfo: {
      type: Object,
      required: false
    }
  },
  watch: {
    guestInfo: function (newQuestion, oldQuestion) {
      this.slideToPerson();
    }
  },
  methods: {
    slideToPerson:function(){
      let self = this;
      var tget = $("[data-name="+this.guestInfo.name+"]")
      if(tget.length > 0){
        var obj = $(tget[0]);
        var dataParent = obj.attr("data-parent")
        var dataCurrent = obj.attr("data-current")
        var dataSwiper = obj.attr("data-swiper")

        this.guestSwiper.slideTo(dataParent, 100)
        if(dataSwiper == "ent"){
          this.entSwiper.slideTo(dataCurrent, 500)
        }else if(dataSwiper == "gov"){
          this.govSwiper.slideTo(dataCurrent, 500)
        }else if(dataSwiper == "exp"){
          this.expSwiper.slideTo(dataCurrent, 500)
        }
        if(obj.hasClass("cssTwinkling")){
          obj.removeClass("cssTwinkling")
        }
        obj.addClass("cssTwinkling")
        this.guestSwiper.autoplay.stop();
        if(self.type == "ENT"){
          self.entSwiper.autoplay.stop();
        }else if(self.type == "GOV"){
          self.govSwiper.autoplay.stop();
        }else if(self.type == "EXP"){
          self.expSwiper.autoplay.stop();
        }
        setTimeout(function () {
          $("[class=cssTwinkling]").removeClass("cssTwinkling")
          self.guestSwiper.autoplay.start();
          if(self.type == "ENT"){
            self.entSwiper.autoplay.start();
          }else if(self.type == "GOV"){
            self.govSwiper.autoplay.start();
          }else if(self.type == "EXP"){
            self.expSwiper.autoplay.start();
          }
        },5000)
      }
    },

    initGuestListSwiper: function(){
      let self = this;
      this.guestSwiper = new Swiper('#guestListSwiper'+this.keyStatus, {
        slidesPerView:1,
        speed:10000,
        spaceBetween: 20,
        autoplay: {
          delay: 2000,
          stopOnLastSlide : false,
          disableOnInteraction: true
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
      });
    },

    initGovListSwiper: function(){
      this.govSwiper = new Swiper('#govListSwiper'+this.keyStatus, {
        slidesPerView:1,
        speed:5000,
        preventClicks : false,
        preventLinksPropagation : false,
        autoplay:this.type == 'ALL'?false:true,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },

    initExpListSwiper: function(){
      this.expSwiper = new Swiper('#expListSwiper'+this.keyStatus, {
        slidesPerView:1,
        spaceBetween: 0,
        preventClicks : false,
        preventLinksPropagation : false,
        autoplay:this.type == 'ALL'?false:true,
        speed:5000,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },

    initEntListSwiper: function(){
      this.entSwiper = new Swiper('#entListSwiper'+this.keyStatus, {
        slidesPerView:1,
        spaceBetween: 0,
        preventClicks : false,
        preventLinksPropagation : false,
        autoplay:this.type == 'ALL'?false:true,
        speed:5000,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    },

    groupByData: function (arrData) {
      let self = this
      var alldata = []
      var index = 0
      for (var j = 0; j < arrData.length; j = j + 8) {
        var pagedata = []
        for (var i = 0; i < 8; i++) {
          if (index < arrData.length) {
            if(!(arrData[index].photo)){
              arrData[index].photo = "../../../static/guest/images/avatar_default.png";
            }
            pagedata.push(arrData[index])
          }
          index++
        }
        alldata.push({data: pagedata})
      }
      return alldata
    },
  },
  created:function () {
    //从后台获取数据
    let self = this;
    if(self.guestInfo && self.guestInfo.type){
      self.type = self.guestInfo.type;
      if(self.guestInfo.name){
        self.name = self.guestInfo.name;
      }
    }
    self.keyStatus = "" + (new Date()).getTime();
    self.$api.get('guests/findByGroup', r => {
      if(r.G1){
        //政府嘉宾
        self.govTotal = r.G1.length;
        self.govData = self.groupByData(r.G1);
      }
      if(r.G2){
        //专家嘉宾
        self.expTotal = r.G2.length;
        self.expData = self.groupByData(r.G2);
      }
      if(r.G3){
        //企业嘉宾
        self.entTotal = r.G3.length;
        self.entData = self.groupByData(r.G3);
      }
    })
  },
  mounted: function () {
    let self = this;
    self.initGuestListSwiper();
    if(self.type == "ALL"){
      self.initGovListSwiper();
      self.initEntListSwiper();
      self.initExpListSwiper();
    }else if(self.type == "ENT"){
      self.initEntListSwiper();
    }else if(self.type == "GOV"){
      self.initGovListSwiper();
    }else if(self.type == "EXP"){
      self.initExpListSwiper();
    }

    if(self.name){
      self.slideToPerson();
    }
  },
}
</script>

<style scoped>
  @import '../../../static/guest/css/base.css';
  @import '../../../static/guest/css/style.css';
  .slide{
    border: 1px solid #00bffd;
    border-radius: 10px;
    height: 560px;
    background: url(../../../static/guest/images/ia_03_1.png) repeat-x;
  }

  .cssTwinkling{
    -webkit-animation: twinkling 1s infinite ease-in-out;
  }

  @keyframes twinkling{    /*透明度由0到1*/
    0%{
      opacity:0; /*透明度为0*/
    }
    100%{
      opacity:1; /*透明度为1*/
    }
  }

  @-webkit-keyframes twinkling /* Safari 和 Chrome */
  {
    0%{
      opacity:0; /*透明度为0*/
    }
    100%{
      opacity:1; /*透明度为1*/
    }
  }

  .pre{
     background-image: url(../../../static/guest/images/gori.png) !important;
   }
  .next{
    background-image: url(../../../static/guest/images/goli.png) !important;
  }

  .text2 {
    /*多行*/
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
  }

</style>

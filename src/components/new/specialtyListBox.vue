<template>
  <!--<div>
    <div class="pobox pobox3">
      <div class="mopr">
        <div id="foodListSwiper" class="swiper-container">
          <div class="swiper-wrapper" style="width: 780px;overflow-x: hidden;">
            <div class="swiper-slide" v-for="(item,index) in foodInfoArry" :key="index">
              <div class="cyimg"><p class="img"><img v-bind:src="item.img" width="212" height="172"></p></div>
              <p class="name">{{item.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div class="poli1">
    <div class="mswu">
      <!--<div class="title">美食列表</div>-->
      <div class="msli">
        <div class="mu" style="width: 100%;">
          <!--<ul>
            <li>-->
              <div id="specialtyListSwiper" class="swiper-container" style="width:1050px;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in specialtyInfoArry" :key="index">
                    <ul>
                      <li @click="gotoDetail(item.text, item.img)" style="margin:10px 15px;">
                        <p class="img"><img :src="item.img" width="172" height="138"></p>
                        <p class="tit">{{item.text}}</p>
                        <p class="con">{{item.desc}}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="swiper-slide"></div>
                </div>
              </div>
            <!--</li>
          </ul>-->
        </div>
      </div>
    </div>
  <!--  <div class="wen">
      <p align="center"><img src="../../../static/0503/images/adk.png"></p>
      <div class="mt20">
        <p>“推荐几家火锅店”</p>
        <p>“附近的美食”</p>
        <p>“介绍以下丝娃娃？”</p>
      </div>
    </div>-->
    <topic2 topicType="specialtyList" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'specialtyListBox',
  components: {topic2},
  data() {
    return {
      keyStatus:"",
      specialtyInfoArry: [
        {text: '茅台',desc:'国酒茅台', img: 'static/images/specialty/maotai.jpg'},
        {text: '老干妈',desc:'贵州地区传统风味食品', img: 'static/images/specialty/laoganma.jpg'},
        {text: '贵烟',desc:'中国中式高档卷烟', img: 'static/images/specialty/guiyan.jpg'},
        {text: '贵州龙',desc:'贵州风味蛋糕', img: 'static/images/specialty/guizhoulong.jpg'},
        {text: '毛尖',desc:'中国十大名茶之一', img: 'static/images/specialty/maojian.jpg'},
        {text: '黔粹行',desc:'贵州特产专卖店', img: 'static/images/specialty/qianchuihang.jpg'},
        {text: '黔五福',desc:'永做中国肉类食品第一品牌', img: 'static/images/specialty/qianwufu.jpg'},
        {text: '三宝',desc:'天麻、灵芝、杜仲三种特产', img: 'static/images/specialty/sanbao.jpg'}
      ],
    }
  },
  methods: {
    initSwiper: function(){
      new Swiper('#specialtyListSwiper', {
        slidesPerView:5,
        speed:1000,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
      });
    },
    gotoDetail:function(text, img){
      this.$emit('openDetail', text, img);
    },
    gotoDetailByNum:function(num){
      if(num>0 && num <= this.specialtyInfoArry.length){
        this.$emit('openDetail', this.specialtyInfoArry[num-1].text, this.specialtyInfoArry[num-1].img);
      }
    },
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
  },
  computed: {
  },
}
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
</style>

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
              <div id="scenicListSwiper" class="swiper-container" style="width:1050px;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in foodInfoArry" :key="index">
                    <ul>
                      <li @click="gotoDetail(item.text, item.imgDetail)" style="margin:10px 15px;">
                        <p class="img"><img :src="item.imgList" width="172" height="138"></p>
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
    <topic2 topicType="helpTopic" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'foodListBox',
  components: {topic2},
  data() {
    return {
      keyStatus:"",
      foodInfoArry: [
        {text: '青岩古镇',desc:'AAAA景区', imgList: 'static/images/sights/qinyanguzhen.jpg', imgDetail: 'static/images/sights/detail/qinyanguzhen.jpg'},
        {text: '甲秀楼',desc:'AAAA景区', imgList: 'static/images/sights/jiaxiulou.jpg', imgDetail: 'static/images/sights/detail/jiaxiulou.jpg'},
        {text: '孔学堂',desc:'AAAA景区', imgList: 'static/images/sights/kongxuetang.jpg', imgDetail: 'static/images/sights/detail/kongxuetang.jpg'},
        {text: '南江大峡谷',desc:'AAAA景区', imgList: 'static/images/sights/nanjiangdaxiagu.jpg', imgDetail: 'static/images/sights/detail/nanjiangdaxiagu.jpg'},
        {text: '金翠湖',desc:'AAAA景区', imgList: 'static/images/sights/jincuihu.jpg', imgDetail: 'static/images/sights/detail/jincuihu.jpg'},
        {text: '百花湖',desc:'AAAA景区', imgList: 'static/images/sights/baihuahu.jpg', imgDetail: 'static/images/sights/detail/baihuahu.jpg'},
        {text: '黄果树瀑布',desc:'AAAA景区', imgList: 'static/images/sights/huangguoshu.jpg', imgDetail: 'static/images/sights/detail/huangguoshu.jpg'},
        {text: '河滨公园',desc:'AAAA景区', imgList: 'static/images/sights/hebingongyuan.jpg', imgDetail: 'static/images/sights/detail/hebingongyuan.jpg'},
        {text: '贵州省博物馆',desc:'AAAA景区', imgList: 'static/images/sights/shengbowuguan.jpg', imgDetail: 'static/images/sights/detail/shengbowuguan.jpg'},
        {text: '弘福寺',desc:'AAAA景区', imgList: 'static/images/sights/hongfusi.jpg', imgDetail: 'static/images/sights/detail/hongfusi.jpg'},
        {text: '天河潭',desc:'AAAA景区', imgList: 'static/images/sights/tianhetan.jpg', imgDetail: 'static/images/sights/detail/tianhetan.jpg'},
        {text: '黔灵山公园',desc:'AAAA景区', imgList: 'static/images/sights/qianlinshan.jpg', imgDetail: 'static/images/sights/detail/qianlinshan.jpg'},
        {text: '小车河湿地公园',desc:'AAAA景区', imgList: 'static/images/sights/xiaochehe.jpg', imgDetail: 'static/images/sights/detail/xiaochehe.jpg'},
        {text: '贵阳喀斯特公园',desc:'AAAA景区', imgList: 'static/images/sights/kasitegongyuan.jpg', imgDetail: 'static/images/sights/detail/kasitegongyuan.jpg'},
        {text: '观山湖公园',desc:'AAAA景区', imgList: 'static/images/sights/guanshanhugongyuan.jpg', imgDetail: 'static/images/sights/detail/guanshanhugongyuan.jpg'},
        {text: '息烽温泉',desc:'AAAA景区', imgList: 'static/images/sights/xifengwenquan.jpg', imgDetail: 'static/images/sights/detail/xifengwenquan.jpg'},
        {text: '香纸沟',desc:'AAAA景区', imgList: 'static/images/sights/xiangzhigou.jpg', imgDetail: 'static/images/sights/detail/xiangzhigou.jpg'},
        {text: '西江千户苗寨',desc:'AAAA景区', imgList: 'static/images/sights/qianhumiaozhai.jpg', imgDetail: 'static/images/sights/detail/qianhumiaozhai.jpg'},
        {text: '十里河滩',desc:'AAAA景区', imgList: 'static/images/sights/shilihetan.jpg', imgDetail: 'static/images/sights/detail/shilihetan.jpg'},
        {text: '花果园湿地公园',desc:'AAAA景区', imgList: 'static/images/sights/huaguoyuan.jpg', imgDetail: 'static/images/sights/detail/huaguoyuan.jpg'},
        {text: '羊昌花画小镇',desc:'AAAA景区', imgList: 'static/images/sights/yangchanghua.jpg', imgDetail: 'static/images/sights/detail/yangchanghua.jpg'},
        {text: '渔洞峡',desc:'AAAA景区', imgList: 'static/images/sights/yudongxia.jpg', imgDetail: 'static/images/sights/detail/yudongxia.jpg'},
        {text: '蓬莱仙界',desc:'AAAA景区', imgList: 'static/images/sights/penglaixianjie.jpg', imgDetail: 'static/images/sights/detail/penglaixianjie.jpg'},
        {text: '红枫湖风景区',desc:'AAAA景区', imgList: 'static/images/sights/hongfenghu.jpg', imgDetail: 'static/images/sights/detail/hongfenghu.jpg'},
        {text: '情人谷',desc:'AAAA景区', imgList: 'static/images/sights/qingrengu.jpg', imgDetail: 'static/images/sights/detail/qingrengu.jpg'},
        {text: '夜郎古镇',desc:'AAAA景区', imgList: 'static/images/sights/yelangguzhen.jpg', imgDetail: 'static/images/sights/detail/yelangguzhen.jpg'},
        {text: '十里画廊',desc:'AAAA景区', imgList: 'static/images/sights/shilihualang.jpg', imgDetail: 'static/images/sights/detail/shilihualang.jpg'},
        {text: '贵阳森林公园',desc:'AAAA景区', imgList: 'static/images/sights/shenlingongyuan.jpg', imgDetail: 'static/images/sights/detail/shenlingongyuan.jpg'},
        {text: '多彩贵州城',desc:'AAAA景区', imgList: 'static/images/sights/duocaiguizhou.jpg', imgDetail: 'static/images/sights/detail/duocaiguizhou.jpg'},
        {text: '鹿冲关森林公园',desc:'AAAA景区', imgList: 'static/images/sights/lucongguan.jpg', imgDetail: 'static/images/sights/detail/lucongguan.jpg'}
      ],
    }
  },
  methods: {
    closeFoodListBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    initSwiper: function(){
      new Swiper('#scenicListSwiper', {
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
    gotoDetail:function(text, imgDetail){
      this.$emit('openDetail', text, imgDetail);
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
  @import '../../../static/0506/css/base.css';
  @import '../../../static/0506/css/style.css';
</style>

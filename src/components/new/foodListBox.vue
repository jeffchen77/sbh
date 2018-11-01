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
              <div id="foodListSwiper" class="swiper-container" style="width:1050px;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in foodInfoArry" :key="index">
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
    <topic2 topicType="foodList" key="keyStatus"></topic2>
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
        {text: '冰粉',desc:'贵州地区的夏季小吃', img: 'static/images/food/list/bingfen.jpg'},
        {text: '肠旺面',desc:'贵州传统风味面食',  img: 'static/images/food/list/changwangmian.jpg'},
/*        {text: '炒饵块粑',desc:'翻炒制成的特色小菜',  img: 'static/images/food/erkuaiba.jpg'},*/
        {text: '脆哨',desc:'贵州人民的最爱之一',  img: 'static/images/food/list/cuishao.jpg'},
/*        {text: '豆沙窝',desc:'红豆或芸豆的传统小吃',  img: 'static/images/food/doushawo.jpg'},*/
        {text: '糕粑稀饭',desc:'松泡似雪，糕馅精致',  img: 'static/images/food/list/gaobaxifan.jpg'},
        {text: '宫保鸡丁',desc:'甜中有辣的鸡肉',  img: 'static/images/food/list/gongbaojiding.jpg'},
        {text: '怪噜饭',desc:'麻辣酸咸式炒饭',  img: 'static/images/food/list/guailufan.jpg' },
        {text: '贵阳豆腐圆子',desc:'雷家四代相传风味小吃',  img: 'static/images/food/list/doufuyuanzi.jpg'},
        {text: '贵阳辣子鸡',desc:'贵州特色辣味美食',  img: 'static/images/food/list/laziji.jpg'},
        {text: '贵阳老素粉',desc:'贵阳地方爽滑香辣小吃',  img: 'static/images/food/list/laosufen.jpg'},
        {text: '花溪牛肉粉',desc:'贵州花溪特色美食',  img: 'static/images/food/list/niuroufen.jpg'},
        {text: '黄粑',desc:'糯米粳米红糖小吃',  img: 'static/images/food/list/huangba.jpg'},
        {text: '烙锅',desc:'香辣爽口，味道奇香',  img: 'static/images/food/list/luoguo.jpg'},
        {text: '恋爱豆腐果',desc:'辣香嫩烫的风味小吃',  img: 'static/images/food/list/doufuguo.jpg'},
        /*{text: '凉拌折耳根',desc:'脆嫩爽口的地方小菜',  img: 'static/images/food/list/liangbanzheergen.jpg'},*/
        {text: '米豆腐',desc:'冷热皆可的传统小吃',  img: 'static/images/food/list/midoufu.jpg'},
        {text: '糯米饭',desc:'贵阳人的传统早餐',  img: 'static/images/food/list/nuomifan.jpg'},
        /*{text: '泡椒板筋',desc:'咸鲜微辣黔菜',  img: 'static/images/food/list/paojiaobanjin.jpg'},*/
        {text: '青岩豆腐',desc:'火上炙烤的豆腐',  img: 'static/images/food/list/qingyandoufu.jpg'},
        {text: '青岩鸡辣角',desc:'青岩特色传统小吃',  img: 'static/images/food/list/lajijiao.jpg'},
        {text: '青岩玫瑰糖',desc:'青岩特色传统名点',  img: 'static/images/food/list/meiguitang.jpg'},
        {text: '青岩猪脚',desc:'个大皮嫩，卤味怡人',  img: 'static/images/food/list/qingyanzhujiao.jpg'},
        {text: '水城羊肉粉',desc:'六盘水民间小吃',  img: 'static/images/food/list/shuicehngyangroufen.jpg'},
        {text: '丝娃娃',desc:'贵阳地方传统小吃之一',  img: 'static/images/food/list/siwawa.jpg'},
        {text: '酸汤鱼',desc:'苗族特色酸辣美食',  img: 'static/images/food/list/suantangyu.jpg'},
        {text: '糖麻圆',desc:'糯绵香甜的地方小吃',  img: 'static/images/food/list/tangmayuan.jpg'},
        {text: '碗耳糕',desc:'贵阳地区传统特色糕点',  img: 'static/images/food/list/wanergao.jpg'},
        {text: '阳郎鸡',desc:'香喷喷的辣辣的滋味',  img: 'static/images/food/list/yanglangji.jpg'},
        {text: '洋芋粑粑',desc:'贵阳街头的传统小吃',  img: 'static/images/food/list/yangyubaba.jpg'},
        /*{text: '鸳鸯酥', img: 'static/images/food/yuanyangsu.jpg'},*/
        /*{text: '炸洋芋粑',desc:'贵阳地方传统小吃之一',  img: 'static/images/food/zhayangyuba.jpg'},*/
        /*{text: '折耳根炒腊肉',desc:'大众家庭的开胃菜',  img: 'static/images/food/list/zheergenchaolarou.jpg'}*/
      ],
    }
  },
  methods: {
    closeFoodListBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    initSwiper: function(){
      new Swiper('#foodListSwiper', {
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
      if(num>0 && num <= this.foodInfoArry.length){
        this.$emit('openDetail', this.foodInfoArry[num-1].text, this.foodInfoArry[num-1].img);
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

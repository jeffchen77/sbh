<template>
  <div>
    <div class="pobox pobox3" v-show="showlist">
      <div class="pocos" style="z-index: 6"><img src="static/images/pocos.png" v-on:click="closeFoodListBox()"></div>
      <div class="mopr">
        <div id="swiperBanner" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(n,y) in slideCount" :key="y">
              <div class="cying">
                <div class="tit">贵阳味道</div>
                <ul class="clearfix">
                  <li v-for="(m, x) in foodList[n-1]" :key="x">
                    <div class="cyimg"><p class="img"><img v-bind:src="m.img" width="212" height="172" @click="foodDetail(n, x)"></p></div>
                    <p class="name">{{m.text}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="swiper-pagination" ></div>
          <div class="swiper-button-next" style="margin-top:-50px"></div>
          <div class="swiper-button-prev" style="margin-top:-50px"></div>
        </div>
      </div>
    </div>

    <gytFoodDetailBox :foodInfo="foodInfo" v-if="showdetail" @fireClose="afterFoodClose()"></gytFoodDetailBox>

  </div>
</template>

<script>

import '../../../node_modules/swiper/dist/css/swiper.min.css'
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
import gytFoodDetailBox from '@/components/gyt/gyt-foodDetailBox.vue'
export default {
  name: '',
  components: { gytFoodDetailBox },
  data() {
    return {
      foodList: [],
      slideCount: 0,
      showlist: true,
      showdetail: false,
      foodInfo: {},
      foodInfoArry: [
        {text: '冰粉', img: 'static/images/food/bingfen.jpg'},
        {text: '肠旺面', img: 'static/images/food/changwangmian.jpg'},
        {text: '炒饵块粑', img: 'static/images/food/erkuaiba.jpg'},
        {text: '脆哨', img: 'static/images/food/cuishao.png'},
        {text: '豆沙窝', img: 'static/images/food/doushawo.jpg'},
        {text: '糕耙稀饭', img: 'static/images/food/gaobaxifan.jpg'},
        {text: '宫保鸡丁', img: 'static/images/food/gongbaojiding.jpg'},
        {text: '怪噜饭', img: 'static/images/food/guailufan.jpg' },
        {text: '贵阳豆腐圆子', img: 'static/images/food/doufuyuanzi.jpg'},
        {text: '贵阳辣子鸡', img: 'static/images/food/laziji.jpg'},
        {text: '贵阳老素粉', img: 'static/images/food/laosufen.jpg'},
        {text: '花溪牛肉粉', img: 'static/images/food/niuroufen.jpg'},
        {text: '黄粑', img: 'static/images/food/huangba.png'},
        {text: '烙锅', img: 'static/images/food/luoguo.jpg'},
        {text: '恋爱豆腐果', img: 'static/images/food/doufuguo.jpg'},
        {text: '凉拌折耳根', img: 'static/images/food/liangbanzheergen.jpg'},
        {text: '米豆腐', img: 'static/images/food/midoufu.png'},
        {text: '糯米饭', img: 'static/images/food/nuomifan.jpg'},
        {text: '泡椒板筋', img: 'static/images/food/paojiaobanjin.png'},
        {text: '青岩豆腐', img: 'static/images/food/qingyandoufu.jpg'},
        {text: '青岩鸡辣角', img: 'static/images/food/lajijiao.jpg'},
        {text: '青岩玫瑰糖', img: 'static/images/food/meiguitang.jpg'},
        {text: '青岩猪脚', img: 'static/images/food/qingyanzhujiao.png'},
        {text: '水城羊肉粉', img: 'static/images/food/shuicehngyangroufen.jpg'},
        {text: '丝娃娃', img: 'static/images/food/siwawa.jpg'},
        {text: '酸汤鱼', img: 'static/images/food/suantangyu.jpg'},
        {text: '糖麻圆', img: 'static/images/food/tangmayuan.jpg'},
        {text: '碗耳糕', img: 'static/images/food/wanergao.jpg'},
        {text: '阳郎鸡', img: 'static/images/food/yanglangji.png'},
        {text: '洋芋粑粑', img: 'static/images/food/yangyubaba.jpg'},
        /*{text: '鸳鸯酥', img: 'static/images/food/yuanyangsu.jpg'},*/
        {text: '炸洋芋粑', img: 'static/images/food/zhayangyuba.png'},
        {text: '折耳根炒腊肉', img: 'static/images/food/zheergenchaolarou.jpg'}

      ],
    }
  },
  methods: {
    afterFoodClose: function () {
      let self = this
      self.showdetail = false
      self.showlist = true
      self.getSwiper()
    },
    foodDetail: function (n, cur) {
      let self = this
      self.showlist = false
      self.showdetail = true
      self.foodInfo = self.foodList[n-1][cur]
    },
    closeFoodListBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    initSwiper: function(){
      new Swiper('.swiper-container', {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          autoplayDisableOnInteraction: false
        },
        preventClicks: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    },
    initData: function(){
        this.slideCount = Math.ceil(this.foodInfoArry.length / 6);
        for(var index=0; index<this.slideCount; index++){
          this.foodList.push(this.foodInfoArry.slice(index*6, index*6+6));
        }
      }
  },
  mounted: function () {
    this.initSwiper();
    this.initData();
  },
  computed: {
  },
}
</script>

<style scoped>

</style>

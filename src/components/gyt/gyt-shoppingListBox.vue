<template>
  <div>
  <div class="pobox pobox3" v-show="showlist">
    <div class="pocos" style="z-index: 6"><img src="static/images/pocos.png" v-on:click="closeListBox()"></div>
    <div class="mopr">
      <p class="tit p20" style="margin:0 0">热门商圈</p>
      <div id="swiperBanner" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[0].img" width="212" height="172" @click="shopDetail(0)"></p></div>
                <p class="name">{{shopInfoArry[0].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[1].img" width="212" height="172" @click="shopDetail(1)"></p></div>
                <p class="name">{{shopInfoArry[1].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[2].img" width="212" height="172" @click="shopDetail(2)"></p></div>
                <p class="name">{{shopInfoArry[2].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[3].img" width="212" height="172" @click="shopDetail(3)"></p></div>
                <p class="name">{{shopInfoArry[3].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[4].img" width="212" height="172" @click="shopDetail(4)"></p></div>
                <p class="name">{{shopInfoArry[4].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[5].img" width="212" height="172" @click="shopDetail(5)"></p></div>
                <p class="name">{{shopInfoArry[5].text}}</p>
              </li>
          </ul>
         </div>
        </div>
        <div class="swiper-slide">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="shopInfoArry[6].img" width="212" height="172" @click="shopDetail(6)"></p></div>
                <p class="name">{{shopInfoArry[6].text}}</p>
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
    <gytShoppingContentBox :shopInfo="shopInfo" v-if="showdetail" @fireClose="afterShopClose()"></gytShoppingContentBox>
  </div>
</template>

<script>
import gytShoppingContentBox from '@/components/gyt/gyt-shoppingContentBox.vue'
export default {
  name: '',
  components: { gytShoppingContentBox },
  data () {
    return {
      showlist: true,
      showdetail: false,
      shopInfo: {},
      shopInfoArry: [
        {text: '贵阳世纪金源购物中心', img: 'static/images/shopping/gyjinyuan2.png'},
        {text: '贵阳西南国际商贸城', img: 'static/images/shopping/gysouthshangmao1.png'},
        {text: '南国花锦购物中心店', img: 'static/images/shopping/southhuajin2.png'},
        {text: '星力百货', img: 'static/images/shopping/xinli2.png'},
        {text: '国贸商城', img: 'static/images/shopping/guomao2.png'},
        {text: '星美国际影城', img: 'static/images/shopping/xinmei1.png'},
        {text: '中大国际广场', img: 'static/images/shopping/zhongda1.png'}
        ]
    }
  },
  methods: {
    afterShopClose: function () {
      let self = this
      self.showdetail = false
      self.showlist = true
      self.getSwiper()
    },
    shopDetail: function (cur) {
      let self = this
      self.showlist = false
      self.showdetail = true
      self.shopInfo = self.shopInfoArry[cur]
    },
    closeListBox: function () {
      this.$emit('fireClose')
    },
    getSwiper () {
      var mySwiper = new Swiper('.swiper-container', {// eslint-disable-line no-unused-vars
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
      })
    }
  },
  mounted: function () {
    let self = this
    self.getSwiper()
  },
  computed: {
  }
}
</script>

<style scoped>
  @import'../../../node_modules/swiper/dist/css/swiper.min.css';

</style>

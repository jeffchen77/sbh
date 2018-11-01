<template>
  <div>
  <div class="pobox pobox3" v-show="showlist">
    <div class="pocos" style="z-index: 6"><img src="static/images/pocos.png" v-on:click="closeCultureListBox()"></div>
    <div class="mopr">
      <p class="tit p20" style="margin:0 0">特色人文</p>
      <div id="swiperBanner" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[0].img" width="212" height="172" @click="cultureDetail(0)"></p></div>
                <p class="name">{{cultureInfoArry[0].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[1].img" width="212" height="172" @click="cultureDetail(1)"></p></div>
                <p class="name">{{cultureInfoArry[1].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[2].img" width="212" height="172" @click="cultureDetail(2)"></p></div>
                <p class="name">{{cultureInfoArry[2].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[3].img" width="212" height="172" @click="cultureDetail(3)"></p></div>
                <p class="name">{{cultureInfoArry[3].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[4].img" width="212" height="172" @click="cultureDetail(4)"></p></div>
                <p class="name">{{cultureInfoArry[4].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[5].img" width="212" height="172" @click="cultureDetail(5)"></p></div>
                <p class="name">{{cultureInfoArry[5].text}}</p>
              </li>
          </ul>
         </div>
        </div>
        <div class="swiper-slide">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[6].img" width="212" height="172" @click="cultureDetail(6)"></p></div>
                <p class="name">{{cultureInfoArry[6].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[7].img" width="212" height="172" @click="cultureDetail(7)"></p></div>
                <p class="name">{{cultureInfoArry[7].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[8].img" width="212" height="172" @click="cultureDetail(8)"></p></div>
                <p class="name">{{cultureInfoArry[8].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[9].img" width="212" height="172" @click="cultureDetail(9)"></p></div>
                <p class="name">{{cultureInfoArry[9].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[10].img" width="212" height="172" @click="cultureDetail(10)"></p></div>
                <p class="name">{{cultureInfoArry[10].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[11].img" width="212" height="172" @click="cultureDetail(11)"></p></div>
                <p class="name">{{cultureInfoArry[11].text}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[12].img" width="212" height="172" @click="cultureDetail(12)"></p></div>
                <p class="name">{{cultureInfoArry[12].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[13].img" width="212" height="172" @click="cultureDetail(13)"></p></div>
                <p class="name">{{cultureInfoArry[13].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[14].img" width="212" height="172" @click="cultureDetail(14)"></p></div>
                <p class="name">{{cultureInfoArry[14].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[15].img" width="212" height="172" @click="cultureDetail(15)"></p></div>
                <p class="name">{{cultureInfoArry[15].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[16].img" width="212" height="172" @click="cultureDetail(16)"></p></div>
                <p class="name">{{cultureInfoArry[16].text}}</p>
              </li>
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[17].img" width="212" height="172" @click="cultureDetail(17)"></p></div>
                <p class="name">{{cultureInfoArry[17].text}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li>
                <div class="cyimg"><p class="img">
                  <img v-bind:src="cultureInfoArry[18].img" width="212" height="172" @click="cultureDetail(18)"></p></div>
                <p class="name">{{cultureInfoArry[18].text}}</p>
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
    <sbtCultureContentBox :cultureInfo="cultureInfo" v-if="showdetail" @fireClose="afterCultureClose()"></sbtCultureContentBox>
  </div>
</template>

<script>
import sbtCultureContentBox from '@/components/gyt/gyt-cultureContentBox.vue'
export default {
  name: '',
  components: { sbtCultureContentBox },
  data () {
    return {
      showlist: true,
      showdetail: false,
      cultureInfo: {},
      cultureInfoArry: [{text: '贵阳市', img: 'static/images/culture/guiyang.jpg'},
        {text: '刺绣', img: 'static/images/culture/cixiu.png'},
        {text: '地戏', img: 'static/images/culture/dixi.png'},
        {text: '苗族剪纸', img: 'static/images/culture/jianzi.png'},
        {text: '跳场', img: 'static/images/culture/tiaochang.png'},
        {text: '腊染', img: 'static/images/culture/ranla.png'},
        {text: '三月三', img: 'static/images/culture/sanyuesan.png'},
        {text: '四月八', img: 'static/images/culture/siyueba.png'},
        {text: '六月六', img: 'static/images/culture/liuyueliu.png'},
        {text: '丁宝桢', img: 'static/images/culture/dingbaozhen.png'},
        {text: '王阳明', img: 'static/images/culture/wangyangming.png'},
        {text: '周渔璜', img: 'static/images/culture/zhouyuhuang.png'},
        {text: '宁静', img: 'static/images/culture/ningjing.png'},
        {text: '赵以炯', img: 'static/images/culture/zhaoyijiong.png'},
        {text: '陈夔龙', img: 'static/images/culture/chenkuilong.png'},
        {text: '龚琳娜', img: 'static/images/culture/gonglinna.png'},
        {text: '何洁', img: 'static/images/culture/hejie.png'},
        {text: '陶华碧', img: 'static/images/culture/taohuabi.png'},
        {text: '姚茫父', img: 'static/images/culture/yaomangfu.png'}]
    }
  },
  methods: {
    afterCultureClose: function () {
      let self = this
      self.showdetail = false
      self.showlist = true
      self.getSwiper()
    },
    cultureDetail: function (cur) {
      let self = this
      self.showlist = false
      self.showdetail = true
      self.cultureInfo = self.cultureInfoArry[cur]
    },
    closeCultureListBox: function () {
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

</style>

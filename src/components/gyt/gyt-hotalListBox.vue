<template>
  <div>
  <div class="pobox pobox3" v-show="showlist">
    <div class="pocos" style="z-index: 6"><img src="static/images/pocos.png" v-on:click="closeHotelListBox()"></div>
    <div class="mopr">
      <div id="swiperBanner" class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="items in HotelInfoArry" class="swiper-slide">
          <div class="cying">
            <div class="tit">数博官方指定酒店</div>
            <ul class="clearfix">
              <li v-for="hotel in items" v-bind:key="hotel.name">
                <div class="cyimg"><p class="img">
                  <img v-bind:src="hotel.img" width="212" height="172" @click="hotelDetail(hotel)"></p></div>
                <p class="name">{{hotel.text}}</p>
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
    <gyt-hotel-content-box :hotelInfo="hotelInfo" v-if="showdetail" @fireClose="afterHotelClose()"></gyt-hotel-content-box>
  </div>
</template>

<script>
import gytHotelContentBox from '@/components/gyt/gyt-hotelContentBox.vue'
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
export default {
  name: '',
  components: { gytHotelContentBox },
  data () {
    return {
      showlist: true,
      showdetail: false,
      hotelInfo: {},
      HotelInfoArry: [
        [
          {text: '中天凯悦酒店', img: 'static/images/hotal/zhongtiankaiyue.png'},
          {text: '保利温泉酒店', img: 'static/images/hotal/baoliwenquan.png'},
          {text: '铂尔曼酒店', img: 'static/images/hotal/boerman.png'},
          {text: '多彩四季酒店', img: 'static/images/hotal/daocaisiji.png'},
          {text: '观山湖大酒店', img: 'static/images/hotal/guanshanhu.png'},
          {text: '观山景和酒店', img: 'static/images/hotal/guanshanjinghe.png'}
        ],
        [
          {text: '贵铝宾馆', img: 'static/images/hotal/guilv.png'},
          {text: '贵阳万丽酒店', img: 'static/images/hotal/guiyangwanli.png'},
          {text: '贵阳新世界酒店', img: 'static/images/hotal/xinshiji.png'},
          {text: '贵州饭店', img: 'static/images/hotal/guizhoufandian.png'},
          {text: '和舍酒店', img: 'static/images/hotal/hesejiudian.png'},
          {text: '湖城雅天酒店', img: 'static/images/hotal/huchengyatian.png'}
        ],
        [
          {text: '华美达酒店', img: 'static/images/hotal/huameida.png'},
          {text: '皇朝酒店', img: 'static/images/hotal/huangchao.png'},
          {text: '金博酒店', img: 'static/images/hotal/jinbo.png'},
          {text: '金芦笙小镇酒店', img: 'static/images/hotal/jinlusheng.png'},
          {text: '金阳大酒店', img: 'static/images/hotal/jinyangdajiudian.png'},
          {text: '君尚国际大酒店', img: 'static/images/hotal/junshangguoji.png'}
        ],
        [
          {text: '凯宾斯基酒店', img: 'static/images/hotal/kaibingsiji.png'},
          {text: '凯恩斯酒店', img: 'static/images/hotal/kaiwensi.png'},
          {text: '凯盛酒店', img: 'static/images/hotal/kaisheng.png'},
          {text: '丽豪酒店', img: 'static/images/hotal/lihao.png'},
          {text: '林城假日酒店', img: 'static/images/hotal/linchengjiari.png'},
          {text: '铭都酒店', img: 'static/images/hotal/mingdujiudian.png'}
        ],
        [
          {text: '南湖花园酒店', img: 'static/images/hotal/nanhuhuayuan.png'},
          {text: '诺富特酒店', img: 'static/images/hotal/ruofutejiudian.png'},
          {text: '盘江饭店', img: 'static/images/hotal/panjiangfandian.png'},
          {text: '乾银和悦酒店', img: 'static/images/hotal/quanyinheyue.png'},
          {text: '群升豪生酒店', img: 'static/images/hotal/qunshenghaosheng.png'},
          {text: '群升花园酒店', img: 'static/images/hotal/qunshenghuayuan.png'}
        ],
        [
          {text: '荣和酒店', img: 'static/images/hotal/ronghejiudian.png'},
          {text: '世纪金源大饭店', img: 'static/images/hotal/shijijinyuan.png'},
          {text: '水投上善酒店', img: 'static/images/hotal/shuitoushangshan.png'},
          {text: '索菲特酒店', img: 'static/images/hotal/suofeite.png'},
          {text: '天怡豪生酒店', img: 'static/images/hotal/tianyihaosheng.png'},
          {text: '同心喜酒店', img: 'static/images/hotal/tongxinxi.png'}
        ],
        [
          {text: '途家酒店', img: 'static/images/hotal/tujiajiudian.png'},
          {text: '维也纳酒店', img: 'static/images/hotal/weiyena.png'},
          {text: '西湖花园酒店', img: 'static/images/hotal/xihuhuayuan.png'},
          {text: '喜来登酒店', img: 'static/images/hotal/xilaideng.png'},
          {text: '星辰酒店', img: 'static/images/hotal/xingchenjiudian.png'},
          {text: '雅迪尔酒店', img: 'static/images/hotal/yadierjiudian.png'}
        ],
        [{text: '安纳塔拉度假酒店', img: 'static/images/hotal/annata.png'}]
      ]
    }
  },
  methods: {
    afterHotelClose: function () {
      let self = this
      self.showdetail = false
      self.showlist = true
      self.getSwiper()
    },
    hotelDetail: function (cur) {
      let self = this
      self.showlist = false
      self.showdetail = true
      self.hotelInfo = cur
    },
    closeHotelListBox: function () {
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

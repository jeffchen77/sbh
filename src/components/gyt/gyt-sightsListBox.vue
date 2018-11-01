<template>
  <div>
  <div class="pobox pobox3" v-show="showlist">
    <div class="pocos" style="z-index: 6"><img src="static/images/pocos.png" v-on:click="closeListBox()"></div>
    <div class="mopr">
      <p class="tit p20" style="margin:0 0">热门景点</p>
      <div id="swiperBanner" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(itemlist,index) in slidedata"  :key="index">
          <div class="cying" style="padding: 0px 40px;height:auto">
            <ul class="clearfix">
              <li v-for="(item,index1) in itemlist.data"  :key="index1">
                <div class="cyimg"><p class="img">
                  <img v-bind:src="item.img" width="212" height="172" @click="clickDetail(item.id)"></p></div>
                <p class="name">{{item.text}}</p>
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
    <itemContentBox :itemInfo="itemInfo" v-if="showdetail" @fireClose="afterItemClose()"></itemContentBox>
  </div>
</template>

<script>
import itemContentBox from '@/components/gyt/gyt-sightsContentBox.vue'
export default {
  name: '',
  components: { itemContentBox },
  data () {
    return {
      showlist: true,
      showdetail: false,
      itemInfo: {},
      slidedata: [],
      itemInfoArry: [
        {id: 0, text: '青岩古镇', img: 'static/images/sights/qinyanguzhen.jpg'},
        {id: 1, text: '甲秀楼', img: 'static/images/sights/jiaxiulou.jpg'},
        {id: 2, text: '孔学堂', img: 'static/images/sights/kongxuetang.jpg'},
        {id: 3, text: '南江大峡谷', img: 'static/images/sights/nanjiangdaxiagu.jpg'},
        {id: 4, text: '金翠湖', img: 'static/images/sights/jincuihu.jpg'},
        {id: 5, text: '百花湖', img: 'static/images/sights/baihuahu.jpg'},
        {id: 6, text: '黄果树瀑布', img: 'static/images/sights/huangguoshu.jpg'},
        {id: 7, text: '河滨公园', img: 'static/images/sights/hebingongyuan.jpg'},
        {id: 8, text: '贵州省博物馆', img: 'static/images/sights/shengbowuguan.jpg'},
        {id: 9, text: '弘福寺', img: 'static/images/sights/hongfusi.jpg'},
        {id: 10, text: '天河潭', img: 'static/images/sights/tianhetan.jpg'},
        {id: 11, text: '黔灵山公园', img: 'static/images/sights/qianlinshan.jpg'},
        {id: 12, text: '小车河湿地公园', img: 'static/images/sights/xiaochehe.jpg'},
        {id: 13, text: '贵阳喀斯特公园', img: 'static/images/sights/kasitegongyuan.png'},
        {id: 14, text: '观山湖公园', img: 'static/images/sights/guanshanhugongyuan.png'},
        {id: 15, text: '息烽温泉', img: 'static/images/sights/xifengwenquan.jpg'},
        {id: 16, text: '香纸沟', img: 'static/images/sights/xianggouzi.png'},
        {id: 17, text: '西江千户苗寨', img: 'static/images/sights/qianhumiaozhai.png'},
        {id: 18, text: '十里河滩', img: 'static/images/sights/shilihetan.jpg'},
        {id: 19, text: '花果园湿地公园', img: 'static/images/sights/huaguoyuan.jpg'},
        {id: 20, text: '羊昌花画小镇', img: 'static/images/sights/yangchanghua.jpg'},
        {id: 21, text: '渔洞峡', img: 'static/images/sights/yudongxia.jpg'},
        {id: 22, text: '蓬莱仙界', img: 'static/images/sights/penglaixianjie.jpg'},
        {id: 23, text: '红枫湖风景区', img: 'static/images/sights/hongfenghu.jpg'},
        {id: 24, text: '情人谷', img: 'static/images/sights/qingrengu.jpg'},
        {id: 25, text: '夜郎古镇', img: 'static/images/sights/yelangguzhen.jpg'},
        {id: 26, text: '十里画廊', img: 'static/images/sights/shilihualang.jpg'},
        {id: 27, text: '贵阳森林公园', img: 'static/images/sights/shenlingongyuan.jpg'},
        {id: 28, text: '多彩贵州城', img: 'static/images/sights/duocaiguizhou.jpg'},
        {id: 29, text: '鹿冲关森林公园', img: 'static/images/sights/lucongguan.jpg'}
        ]
    }
  },
  methods: {
    groupByData: function () {
      let self = this
      var alldata = []
      var index = 0
      for (var j = 0; j < self.itemInfoArry.length; j = j + 6) {
        var pagedata = []
        for (var i = 0; i < 6; i++) {
          if (index < self.itemInfoArry.length) {
            pagedata.push(self.itemInfoArry[index])
          }
          index++
        }
        alldata.push({data: pagedata})
      }
      return alldata
    },
    afterItemClose: function () {
      let self = this
      self.showdetail = false
      self.showlist = true
      self.getSwiper()
    },
    clickDetail: function (cur) {
      let self = this
      self.showlist = false
      self.showdetail = true
      self.itemInfo = self.itemInfoArry[cur]
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
    self.slidedata = self.groupByData()
  },
  computed: {
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
  <div class="pobox pobox3" v-show="showlist">
    <div class="pocos"><img src="static/images/pocos.png" v-on:click="closeEnterpriseListBox()"></div>
    <div class="mopr">
      <p class="tit p20">2018年数博会参展企业</p>
      <div id="swiperBannerEnt" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(entlist,index) in slideData"  :key="index" style="padding-bottom:20px">
          <div class="golk golk2">
            <ul class="clearfix" style="padding-left:30px;padding-right:30px;">
           <li v-for="(item,index1) in entlist.data"  :key="index1">
            <p class="nimg"><img :src="item.image" width="380" height="180" @click="enterpriseDetail(item.id)"></p>
            <p class="hcmz" style="width:400px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ item.name }}</p>
           </li>
          </ul>
         </div>
        </div>
      </div>
        <div class="swiper-pagination" ></div>
        <div class="swiper-button-next" style="margin-top:-50px;margin-left: -10px;"></div>
        <div class="swiper-button-prev" style="margin-top:-50px;margin-left: -10px;"></div>
       </div>
    </div>
  </div>
    <sbtEnterpriseContentBox :enterpriseInfo="enterpriseInfo" v-if="showdetail" @fireClose="afterEnterpriseClose()"></sbtEnterpriseContentBox>
  </div>
</template>

<script>
import sbtEnterpriseContentBox from '@/components/sbt/sbt-EnterpriseContentBox.vue'
export default {
  name: '',
  components: { sbtEnterpriseContentBox },
  data () {
    return {
      showlist: true,
      showdetail: false,
      enterpriseList: [],
      slideData: [],
      enterpriseInfo: {}
    }
  },
  methods: {
    afterEnterpriseClose: function () {
      let self = this
      self.showdetail = false
      self.showlist = true
      self.getSwiper()
    },
    enterpriseDetail: function (id) {
      let self = this
      self.showlist = false
      self.showdetail = true
      self.enterpriseInfo = {id: id}
    },
    groupByData: function () {
      let self = this
      var alldata = []
      var index = 0
      for (var j = 0; j < self.enterpriseList.length; j = j + 4) {
        var pagedata = []
        for (var i = 0; i < 4; i++) {
          if (index < self.enterpriseList.length) {
            pagedata.push(self.enterpriseList[index])
          }
          index++
        }
        alldata.push({data: pagedata})
      }
      return alldata
    },
    closeEnterpriseListBox: function () {
      this.$emit('fireClose')
    },
    getSwiper () {
      var mySwiperent = new Swiper('#swiperBannerEnt', {// eslint-disable-line no-unused-vars
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   type: 'bullets',
        //   autoplayDisableOnInteraction: false,
        //   // dynamicBullets: true,
        //   // dynamicMainBullets:5
        // },
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
    self.$api.get('enterprise/findByPage?currentPage=1&pageSize=1000', r => {
      self.enterpriseList = r.data
      self.slideData = self.groupByData()
    })
  },
  computed: {
  }
}
</script>

<style scoped>

</style>

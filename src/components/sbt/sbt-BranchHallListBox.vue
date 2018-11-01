<template>
  <div>
    <div class="pobox pobox3" v-show="showlist">
      <div class="pocos"><img src="static/images/pocos.png" v-on:click="closeBranchHallListBox()"></div>
      <div class="mopr">
        <p class="tit p20">2018年数博会分会场</p>
        <!--<div class="golk golk2">-->
          <!--<p class="goed gol"><img src="static/images/goli.png" width="50" height="70"></p>-->
          <!--<p class="goed gor"><img src="static/images/gori.png" width="50" height="70"></p>-->
          <!--<ul class="clearfix">-->
            <!--<li v-for="(item,index) in branchHallList" :key="item.id">-->
              <!--<p><img :src="item.image"></p>-->
              <!--<p class="hcmz">{{ item.name }}</p>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<div class="dian"><a href="#" class="cur"></a><a href="#"></a><a href="#"></a></div>-->
        <!--</div>-->
        <div id="swiperBanner" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(entlist,index) in slidedata"  :key="index">
              <div class="golk golk2">
                <ul class="clearfix">
                  <li v-for="(item,index1) in entlist.data"  :key="index1">
                    <p class="nimg"><img :src="item.image" width="380" height="180" @click="branchHallDetail(item.id, item.image, item.name)"></p>
                    <p class="hcmz">{{ item.name }}</p>
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
    <sbtBranchHallDetailBox :branchHallInfo="branchHallInfo" v-if="showdetail" @fireClose="afterBranchHallClose()" style="z-index: 10"></sbtBranchHallDetailBox>
  </div>
</template>

<script>
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
import sbtBranchHallDetailBox from '@/components/sbt/sbt-BranchHallDetailBox'
export default {
  name: '',
  components: { sbtBranchHallDetailBox },
  data () {
    return {
      showlist: true,
      showdetail: false,
      branchHallList: [],
      slidedata: [],
      branchHallInfo: {}
    }
  },
  methods: {
    closeBranchHallListBox: function () {
      this.$emit('fireClose')
    },
    afterBranchHallClose: function () {
      this.showdetail = false
      this.showlist = true
      // this.getSwiper()
    },
    branchHallDetail: function (id, image, name) {
      this.showlist = false
      this.showdetail = true
      this.branchHallInfo = {id: id,image: image, hallName: name,show: true}
    },
    groupByData: function () {
      let self = this
      var alldata = []
      var index = 0
      for (var j = 0; j < self.branchHallList.length; j = j + 4) {
        var pagedata = []
        for (var i = 0; i < 4; i++) {
          if (index < self.branchHallList.length) {
            pagedata.push(self.branchHallList[index])
          }
          index++
        }
        alldata.push({data: pagedata})
      }
      return alldata
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
  mounted: function (){
    this.getSwiper()
    this.$api.get('exhibition/findByPage?currentPage=1&pageSize=100', r => {
      this.branchHallList = r.data
      this.slidedata = this.groupByData()
    })
  }
}
</script>

<style scoped>
@import'../../../node_modules/swiper/dist/css/swiper.min.css';
  /*.swiper-button-next{background-image:url("/static/images/gori.png");}*/
  /*.swiper-button-prev{background-image:url("/static/images/goli.png");}*/

</style>

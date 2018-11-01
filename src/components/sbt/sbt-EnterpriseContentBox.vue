<template>
  <div>
  <div class="zmbg"  style="z-index: 7">
  <div class="zmco">
    <div class="zcobg"></div>
    <div class="dpco">
      <div class="cle"><img src="static/images/dpxq1.png" v-on:click="closeEnterpriseContentBox()"></div>
      <div class="dpmimg">
        <p class="img"><img v-bind:src="content.detail.image" width="980" height="520"></p>
        <em class="zz"></em>
      </div>
      <div class="dptit">{{content.detail.name}}</div>
      <div class="clearfix">
        <div class="dptab dptab4">
          <div class="dpti"></div>
          <div class="dpbi"></div>
          <div class="dpci">
            <ul class="clearfix">
              <li :class="tablist[0].cur?'cur':''" @click="changeTab(0)"><a>企业介绍</a></li>
              <li :class="tablist[1].cur?'cur':''" @click="changeTab(1)"><a>展出亮点</a></li>
              <li :class="tablist[2].cur?'cur':''" @click="changeTab(2)"><a>企业导航</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt40 mrcont heightauto" style="width:996px;height:558px;font-size: 24px;color: #fff" v-show="tablist[0].cur" v-html="content.detail.description">
      </div>
      <div class="mt40 mrcont" v-show="tablist[1].cur" v-for="(item,index) in content.detail.showHighlights" :key="index">
        <div v-if="!content.show">
        <div align="center">亮点{{index+1}}</div>
          <div align="center">{{item}}</div>
        </div>
        <div v-if="content.show">
          <div align="center">{{item}}</div>
        </div>
      </div>
      <div class="nbv" v-show="tablist[2].cur">
        <div class="hcmap">
          <p class="goin" @click="goinMap()"><img src="static/images/hcmp2.png"></p>
          <div class="map"><img src="static/images/hcmp3.png"></div>
        </div>
      </div>
    </div>

  </div>
  </div>

    <keep-alive>
      <sbt-meeting-map-box v-if="showMeetingMapBox" @fireClose="afterClose"></sbt-meeting-map-box>
      <map-pavilion-box :itemInfo="itemMapInfo" v-if="showMapBox" @fireClose="afterClose"></map-pavilion-box>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    // 父组件是企业列表
    enterpriseInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tablist: [{cur: true}, {cur: false}, {cur: false}],
      content: {detail: {image: '', showHighlights: [], name: '', description: ''},show: false},
      showMapBox: false,
      itemMapInfo:{enterpriseId:'',location:{x:0,y:0},mapView:0, pavIndex:0},
      showMeetingMapBox: false
    }
  },
  methods: {
    changeTab: function (tab) {
      let self = this
      self.tablist.forEach(e => {
        e.cur = false
      })
        self.tablist[tab].cur = true
    },
    closeEnterpriseContentBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    afterClose: function (boxName) {
      let self = this
      if(boxName=='selectPavMap') {
        self.showMapBox = false
        self.showMeetingMapBox = true
      }else if(boxName=='selectMeetingMap'){
        self.showMapBox = true
        self.showMeetingMapBox = false
      }else{
        self.showMapBox = false
        self.showMeetingMapBox = false
      }
    },
    goinMap: function () {
      let self = this
      self.itemMapInfo.enterpriseId = self.enterpriseInfo.id
      self.$api.mapAsk(self.content.detail.name, (res) => {
        console.log(res)
        switch (res.type) {
          case 0:
          case '1':
            self.itemMapInfo.location.x = res.location[0]
            self.itemMapInfo.location.y = res.location[1]
            self.itemMapInfo.pavIndex = res.zhanguan
            break
          default: {
            break
          }
        }
      })
      self.showMapBox = true
    }
  },
  mounted: function () {
    let self = this
    self.$api.get('enterprise/detail?id=' + self.enterpriseInfo.id, r => {
      self.content = r
      if(self.content.detail.showHighlights == null||self.content.detail.showHighlights.length == 0){
        self.content.detail.showHighlights = ['抱歉，该企业暂时没有提供相关参展亮点的信息']
        self.content.show = true
      }
    })
  },
  computed: {
  },
  beforeCreate: function () {
    this.$options.components.mapPavilionBox = require('../map/map-pavilion.vue').default
    this.$options.components.sbtMeetingMapBox = require('./sbt-MapBox.vue').default
  }
}
</script>

<style scoped>

</style>

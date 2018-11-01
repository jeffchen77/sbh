<template>
  <div class="zmbg">
    <div class="zmco">
      <div class="zcobg"></div>
      <div class="closet" style="z-index: 7"><img src="static/images/dpxq1.png" @click="closeMeetingDetailBox()"></div>
      <div class="hcrc">
        <div class="hrtit">
          <div class="hrbg1"><img src="static/images/hcrc2.png"></div>
          <div class="hrbg2"><img src="static/images/hcrc1.png"></div>
          <div class="hrtit hrtit2">
            <p class="hrt">{{ meetingInfo.meetingName }}</p>
          </div>
        </div>

        <div class="clearfix mt40">
          <div class="dptab dptab4">
            <div class="dpti"></div>
            <div class="dpbi"></div>
            <div class="dpci">
              <ul class="clearfix">
                <li :class="{cur:tabIndex == 0}" @click="tab(0)"><a href="javascript:void(0)">会议介绍</a></li>
                <li :class="{cur:tabIndex == 1}" @click="tab(1)"><a href="javascript:void(0)">会场导览</a></li>
                <li :class="{cur:tabIndex == 2}" @click="tab(2)"><a href="javascript:void(0)">出席嘉宾</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="hdn" style="width:960px" v-show="tabIndex == 0">
          <div class="heightauto" style="width:960px">
            <div class="mt40 mrcont" v-html="meetingDesc"></div>
          </div>
        </div>
        <div class="nbv" v-show="tabIndex == 1">
          <div class="hcmap">
            <p class="goin" v-on:click="openMap"><img src="static/images/hcmp2.png"></p>
            <div class="map"><img src="static/images/hcmp3.png"></div>
          </div>
        </div>
        <div class="golk golk3" v-show="tabIndex == 2">
          <!--<p class="goed gol"><img src="static/images/goli.png" width="50" height="70"></p>-->
          <!--<p class="goed gor"><img src="static/images/gori.png" width="50" height="70"></p>-->
          <div id="swiperBanner" class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(guestList,index) in slidedata"  :key="index">
                <ul class="clearfix">
                  <li v-for="(item,index) in guestList.data"  :key="index">
                    <div class="usbk"><p class="img"><img :src="item.photo" width="146" height="146"></p></div>
                    <p class="name">{{ item.name }}</p>
                    <p class="zw">{{ item.position }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="swiper-pagination" style="bottom: 1px"></div>
            <div class="swiper-button-next" style="margin-top:-50px"></div>
            <div class="swiper-button-prev" style="margin-top:-50px"></div>
          </div>
          <!--<div class="dian"><a href="#" class="cur"></a><a href="#"></a><a href="#"></a></div>-->
        </div>
      </div>
    </div>
    <keep-alive>
      <sbt-meeting-map-box :mapdata="mapdata" v-if="meetingMapBox" @fireClose="afterClose"></sbt-meeting-map-box>
      <map-pavilion-box v-if="pavMapBox" @fireClose="afterClose"></map-pavilion-box>
    </keep-alive>
  </div>
</template>

<script>
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
import {device, fmap} from '../../utils/constant'
export default {
  name: '',
  props: {
    meetingInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tabIndex: 0,
      slidedata: [],
      presentGuestList: [ { name: '', photo: '', position: ''}],
      meetingDesc: '',
      meetingMapBox:false,
      fmapId:fmap.fmapId,
      mapdata:{},
      pavMapBox: false
    }
  },
  methods: {
    tab(index) {
      this.tabIndex = index;
    },
    closeMeetingDetailBox: function () {
      this.$emit('fireClose')
    },
    groupByData: function () {
      let self = this
      var alldata = []
      var index = 0
      for (var j = 0; j < self.presentGuestList.length; j = j + 9) {
        var pagedata = []
        for (var i = 0; i < 9; i++) {
          if (index < self.presentGuestList.length) {
            pagedata.push(self.presentGuestList[index])
          }
          index++
        }
        alldata.push({data: pagedata})
      }
      return alldata
    },
    getSwiper: function () {
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
    },
    openMap: function(){
      debugger;
      var self = this;
      if(self.$parent.map != null && self.$parent.map != undefined){ // 如果会议厅议程弹框是从地图中点开的，直接跳转到地图导航
        self.$emit('fireClose');
        self.$parent.changeType('2', false);
        self.$parent.clearDialog();
        self.$parent.getMeetingByName(self.meetingInfo.meetingName, function(data){
          self.$parent.dialog(null, data);
          self.$parent.showAllTopic = false;
          self.$parent.navigate(null, null, null,data.x, data.y, data.floor);
        });
      }else{
        self.mapdata.fmapId = self.fmapId;
        self.mapdata.hallName = self.meetingInfo.meetingName;
        self.meetingMapBox = true;
      }
    },
    afterClose: function (boxName) {
      var self = this;
      if(boxName=='selectMeetingMap') {
        self.pavMapBox = true
        self.meetingMapBox = false
      }else if(boxName=='selectPavMap'){
        self.meetingMapBox = true
        self.pavMapBox = false
      }else{
        self.meetingMapBox = false
        self.pavMapBox = false
      }
    }
  },
  mounted: function (){
    debugger;
    this.tabIndex = this.meetingInfo.meetingDetailTabIndex
    this.getSwiper()
    this.$api.get('meeting/meetingDetail?currentPage=1&pageSize=100&meetingId=' + this.meetingInfo.id, r => {
      this.presentGuestList = r.guests
      this.meetingDesc = r.meetingDesc
      this.slidedata = this.groupByData()
    })
  },
  beforeCreate: function () {
    this.$options.components.sbtMeetingMapBox = require('./sbt-MapBox.vue').default
    this.$options.components.mapPavilionBox = require('../map/map-pavilion.vue').default
  }
}
</script>

<style scoped>
@import'../../../node_modules/swiper/dist/css/swiper.min.css';
</style>

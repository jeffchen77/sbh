<template>
  <div class="poli1">
      <ul class="clearfix">
        <div class="swiper-container" id="statisticsSwiper">
          <div class="swiper-wrapper">
            <li  class="swiper-slide" v-for="(meetingItem,index) in meetingStatistics" :id="index + 1" :key="index" @click="gotoMeetingList(meetingItem.type)">
              <div class="badge-iccon">{{index + 1}}</div>
              <div class="qy">
                <p class="img" style="width: 150px;"><img v-bind:src="meetingItem.img" style="border-radius: 0"></p>
                <p class="tit">{{meetingItem.type}}</p>
                <p>共有<u>{{meetingItem.count}}</u>场会议</p>
              </div>
            </li>
          </div>
        </div>
      </ul>
  </div>
</template>

<script>
  import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
  import topic2 from '@/components/new/sbt-topic2.vue'

  export default {
    name: 'meeting-statistics-type',
    components: {topic2},
    props:{
      meetingStatistics:{
        required: true
      }
    },
    data() {
      return {
        keyStatus:"keyStatus",
        animate: false,
        defaultDate: '2018-05-26',
        showdetail: false,
        meetingInfo: {}
      }
    },
    methods: {
      getSwiper() {
        var self = this;
        var swiper = new Swiper('#statisticsSwiper', {
          slidesPerView: 5,
          speed: 5000,
          loop: true,
          observer:true,
          observeParents:true,
          initialSlide:0,
          autoplayDisableOnInteraction : false,
          autoplay:true
        });
      },
      gotoMeetingList: function(type){
        var self = this;
        self.$parent.$parent.$parent.hideModal();
        debugger;
        self.$api.get('meeting/findByMeetingType?type=' + type , r => {
          // self.meetingStatistics = r.data;
          self.$parent.$parent.$parent.meetingType = r.data;
          console.log(r.data);
          self.$parent.$parent.$parent.meetingList(r.data);
        })
        // this.$parent.$parent.meetingList({"question": this.question, "type": type});
       /* this.$emit(hideModal());
        this.$parent.showModal = true;*/

      },
      junpNumber: function(num){
        $("#" + num).trigger("click");
      }
    },
    mounted: function () {
      let self = this;
      self.getSwiper()
      self.keyStatus = "" + new Date();
    }
  }
</script>

<style scoped>
  @import '../../../node_modules/swiper/dist/css/swiper.min.css';
  @import '../../../static/0428/css/base.css';
  @import '../../../static/0428/css/style.css';

  .badge-iccon{
    background: url(/static/0428/images/icon.png) repeat-x;
    height: 40px;
    width: 40px;
    position: absolute;
    left: 13px;
    top: 16px;
    font-size: 16px;
    line-height: 35px;
    color: white;
  }
  .qy .img{
    height: 100px;
  }

  .qy .tit{
    height: 90px;
    text-align: center;
    font-size: 28px;
  }


</style>

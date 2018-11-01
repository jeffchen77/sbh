<template>
  <div class="zmbg">
    <div class="zmco">
      <div class="zcobg"></div>
      <div class="dpco">
        <div class="cle"><img src="static/images/dpxq1.png" @click="closeBranchHallDetailBox()"></div>
        <div class="dpmimg">
          <p class="img"><img :src="branchHallInfo.image" width="980" height="520"></p>
          <em class="zz"></em>
        </div>
        <div class="dptit">{{ branchHallInfo.hallName }}</div>
        <div class="clearfix">
          <div class="dptab">
            <div class="dpti"></div>
            <div class="dpbi"></div>
            <div class="dpci">
              <ul class="clearfix">
                <li :class="{cur:tabIndex == 0}" @click="tab(0)"><a href="javascript:void(0)" style="width:510px">会场日程</a></li>
                <li :class="{cur:tabIndex == 1}" @click="tab(1)"><a href="javascript:void(0)" style="width:510px">会场导览</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="dpcontent mt40" v-show="tabIndex == 0" style="margin-top:1px">
          <div class="cstab">
            <div class="cli">
              <ul>
                <li :class="{cur:tabDateIndex == index}" v-for="(dateItem, index) in dateList" :key="index"><a href="javascript:void(0)" @click="tabDate(index,dateItem.date)">{{ dateItem.dateString }}<i></i></a></li>
              </ul>
              <i></i>
            </div>
            <div class="cri" v-for="(meetingItem, index) in branchHallMeetingDetail" :key="index" v-if="branchHallMeetingDetail">
              <p :class=[classSwitch(meetingItem.time)]>{{ meetingItem.time }}</p>
              <p class="mt10" style="margin-bottom: 42px">·{{ meetingItem.theme }}<span class="ing" v-show="meetingItem.isDoing = 0">进行中</span></p>
            </div>
            <div class="cri" v-if="!branchHallMeetingDetail"><p class="mt40"></p><p class="mt10" style="margin-bottom: 42px"></p></div>
          </div>
        </div>
        <div class="dpcontent mt40" v-show="tabIndex == 1">
          <div class="hcmap">
            <p class="goin" v-on:click="openMap"><img src="static/images/hcmp2.png"></p>
            <div class="map"><img src="static/images/hcmp3.png"></div>
          </div>
        </div>
      </div>

    </div>
    <sbt-meeting-map-box v-if="meetingMapBox" @fireClose="afterClose('meetingMapBox')"></sbt-meeting-map-box>
    <!--<sbt-meeting-map-box v-if="meetingMapBox" @fireClose="afterClose('meetingMapBox')"></sbt-meeting-map-box>-->
  </div>
</template>
<script>
import {device, fmap} from '../../utils/constant'
import sbtMeetingMapBox from '@/components/sbt/sbt-MapBox.vue'

  export default {
    name: '',
    components:{sbtMeetingMapBox},
    props: {
      branchHallInfo: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        tabIndex: 0,
        tabDateIndex: 0,
        defaultDate: '2018-05-26',
        checkedDate: '2018-05-26',
        fmapId:fmap.fmapId,
        dateList: [
          { dateString: '5月26日', date:'2018-05-26', id: '0'},
          { dateString: '5月27日', date:'2018-05-27', id: '1'},
          { dateString: '5月28日', date:'2018-05-28', id: '2'},
          { dateString: '5月29日', date:'2018-05-29', id: '3'}
        ],
        branchHallMeetingDetail: [],
        meetingMapBox: false,
        mapdata:{}
      }
    },
    methods: {
      tab(index) {
        this.tabIndex = index
      },
      tabDate(index,date) {
        this.tabDateIndex = index
        this.checkedDate = date
        this.$api.get('meeting/findByMeeting?date=' + date + '&hallId=' + this.branchHallInfo.id, r => {
          this.branchHallMeetingDetail = r.data
        })
      },
      tabSetTodayDefault: function () {
        for ( var i in this.dateList) {
          if (new Date().toDateString() === new Date(this.dateList[i].date).toDateString()) {
            this.tabDateIndex = i
            this.defaultDate = this.dateList[i].date
          }
        }
      },
      classSwitch: function (time) {
        var tempTime = this.checkedDate.replace(new RegExp('-','gm'), '/') + ' ' + time.slice(8,13)
        var meetingTime = new Date(Date.parse(tempTime))
        var currentTime = new Date()
        // var currentTime = new Date(Date.parse('2018/5/27 14:00'))
        return meetingTime < currentTime ? 'gray9 mt40' : 'mt40'
      },
      closeBranchHallDetailBox: function () {
        this.$emit('fireClose')
      },
      openMap: function(){
        var self = this;
        if(self.$parent.map != null && self.$parent.map != undefined){
          self.$emit('fireClose');
          self.$parent.changeType('1', false);
          self.$parent.clearDialog();
          self.$parent.getMeetingByName(self.branchHallInfo.hallName, function(data){
            self.$parent.normalDialog(data.hallName, data.x, data.y, data.floor, data);
            self.$parent.showAllTopic = false;
            self.$parent.navigate(null, null, null,data.x, data.y, data.floor);
          });
        }else {
          self.mapdata.fmapId = self.fmapId;
          self.meetingMapBox = true;
        }

      },
      afterClose: function(){
        var self = this;
        self.meetingMapBox = false;
      }
    },
    mounted: function () {
      this.tabSetTodayDefault()
      this.$api.get('meeting/findByMeeting?date=' + this.defaultDate + '&hallId=' + this.branchHallInfo.id, r => {
        this.branchHallMeetingDetail = r.data
      })
    },
    beforeCreate: function () {
      this.$options.components.sbtMeetingMapBox = require('./sbt-MapBox.vue').default
    }
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <div class="zmbg" v-show="showlist">
      <div class="zmco">
        <div class="zcobg"></div>
        <div class="closet" style="z-index: 7"><img src="static/images/dpxq1.png" v-on:click="closeMeetingAengdaBox()"></div>
        <div class="hcrc">
          <div class="hrtit">
            <div class="hrbg1"><img src="static/images/hcrc2.png"></div>
            <div class="hrbg2"><img src="static/images/hcrc1.png"></div>
            <div class="hrtit">
              <p class="hrt">会议日程</p>
              <p class="hrc">The meeting agenda</p>
            </div>
          </div>
          <div class="clearfix mt40">
            <div class="dptab dptab3">
              <div class="dpti"></div>
              <div class="dpbi"></div>
              <div class="dpci">
                <ul class="clearfix">
                  <li :class="{cur:tabIndex == index}" v-for="(dateItem, index) in dateList" :key="index"><a href="javascript:void(0)" @click="tab(index,dateItem.date)">{{ dateItem.dateString }}<span v-if="isToday(dateItem.date)">(今天)</span></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="hdn">
            <div class="heightauto" ref="scrollBtn">
              <div class="mt40 rcli">
                <ul>
                  <li v-for="(meetingTopic, index) in meetingDetail" :key="index">
                    <p class="rtimg"></p>
                    <p class="riti">{{ meetingTopic.meetingType }}</p>
                    <div class="ribox mt40" v-for="(meetingItem, index1) in meetingTopic.meetings" :key="index1">
                      <p :class=[classSwitch(meetingItem.status)]>{{ meetingItem.name }}</p>
                      <div class="rbc" style="margin: 30px auto auto">
                        <p class="rc1">地点：{{ meetingItem.address }}</p>
                        <p class="rc2">时间：{{ meetingItem.meetingTime }}</p>
                        <p class="rc3">嘉宾：{{ meetingItem.guest }}</p>
                      </div>
                      <div class="rbbtn" v-show="meetingItem.status != 2">
                        <span><a href="javascript:void(0)"><img src="static/images/hcrc9.png" width="230" height="62" @click="meetingDetailBox(meetingItem.id, meetingItem.name, '0')"></a></span>
                        <span><a href="javascript:void(0)"><img src="static/images/hcrc10.png" width="230" height="62" @click="meetingDetailBox(meetingItem.id, meetingItem.name, '1')"></a></span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <sbtMeetingDetailsBox :meetingInfo="meetingInfo" v-if="showdetail" @fireClose="afterMeetingDetailClose()" style="z-index: 10"></sbtMeetingDetailsBox>
  </div>
</template>

<script>
import sbtMeetingDetailsBox from '@/components/sbt/sbt-MeetingDetailsBox'
export default {
  name: '',
  components: { sbtMeetingDetailsBox },
  data () {
    return {
      tabIndex: 0,
      defaultDate: '2018-05-26',
      checkedDate: '2018-05-26',
      showlist: true,
      showdetail: false,
      btnDisable: true,
      dateList: [
        { dateString: '5月26日', date:'2018-05-26', id: '0'},
        { dateString: '5月27日', date:'2018-05-27', id: '1'},
        { dateString: '5月28日', date:'2018-05-28', id: '2'},
        { dateString: '5月29日', date:'2018-05-29', id: '3'}
        ],
      meetingInfo: {},
      meetingDetail: []
    }
  },
  methods: {
    tab(index,date) {
      let self = this
      self.tabIndex = index
      self.checkedDate = date
      self.$api.get('meeting/findByPage?pageSize=100&date=' + date, r => {
        self.meetingDetail = r.data
      })
      // $("div.heightauto").scrollTop(0)
      self.$refs.scrollBtn.scrollTop = 0
    },
    closeMeetingAengdaBox: function () {
      this.$emit('fireClose')
    },
    afterMeetingDetailClose: function () {
      this.showdetail = false
      this.showlist = true
      // this.getSwiper()
    },
    isToday (str) {
      return (new Date().toDateString() === new Date(str).toDateString());
    },
    getToday: function () {
      return new Date().toLocaleDateString().replace(new RegExp('/','gm'), '-')
    },
    tabSetTodayDefault: function () {
      let tmpDate = this.dateList
      for ( var i in tmpDate) {
        if (new Date().toDateString() === new Date(tmpDate[i].date).toDateString()) {
          this.tabIndex = i
          this.defaultDate = tmpDate[i].date
        }
      }
    },
    meetingDetailBox: function (id, name, tab) {
      this.showlist = false
      this.showdetail = true
      this.meetingInfo = {id: id, meetingName:name, meetingDetailTabIndex: tab }
    },
    classSwitch: function (status) {
      // let self = this
      // let tmpDate = self.defaultDate
      // var tempTime = tmpDate.replace(new RegExp('-','gm'), '/') + ' ' + time.slice(6,11)
      // var meetingTime = new Date(Date.parse(tempTime))
      // var currentTime = new Date()
      // // var currentTime = new Date(Date.parse('2018/5/27 14:00'))
      // if (meetingTime < currentTime) {
      //   self.btnDisable = false
      // }else {
      //   self.btnDisable = true
      // }
      // return meetingTime < currentTime ? 'rbt_gray' : 'rbt'

      // status 0:未开始 1:进行中 2:已结束
      // status = 2 ? this.btnDisable = false : this.btnDisable = true
      return status == 2 ? 'rbt_gray' : 'rbt'
    }
  },
  created (){
  },
  mounted: function () {
    this.tabSetTodayDefault()
    this.$api.get('meeting/findByPage?pageSize=100&date=' + this.defaultDate, r => {
      this.meetingDetail = r.data
    })
  }
}
</script>

<style scoped>
  .rbt_gray{color:#999; font-size:40px}
</style>

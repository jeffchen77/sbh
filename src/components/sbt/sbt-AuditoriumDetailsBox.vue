<template>
  <div class="zmbg" v-bind:style="{ display: show }">
    <div class="zmco">
      <div class="zcobg"></div>
      <div class="dpco">
        <div class="cle" style="z-index: 7"><img src="static/images/dpxq1.png" v-on:click="closeBox()"></div>
        <div class="dpmimg">
          <p class="img"><img :src="auditoriumInfo.image" width="980" height="520"></p>
          <em class="zz"></em>
        </div>
        <div class="dptit">{{ auditoriumInfo.name }}</div>
        <div class="clearfix">
          <div class="dptab dptab5">
            <div class="dpti"></div>
            <div class="dpbi"></div>
            <div class="dpci">
              <ul class="clearfix">
                <li class="cur"><a href="javascript:void(0)" style="width:980px">会议日程</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="dpcontent mt10">
          <div class="cstab">
            <div class="cli">
              <ul>
                <li :class="{cur:tabDateIndex == index}" v-for="(dateItem, index) in dateList" :key="index"><a href="javascript:void(0)" @click="tabDate(index,dateItem.date)">{{ dateItem.dateString }}<i></i></a></li>
              </ul>
              <i></i>
            </div>
            <div class="cri" v-for="(audiItem, index) in auditoriumDetail" :key="index" v-if="auditoriumDetail">
              <p :class=[classSwitch(audiItem.time)]>{{ audiItem.time }}<span class="ing" v-show="audiItem.isDoing = 0">进行中</span></p>
              <p class="mt10">·{{ audiItem.theme }}</p>
            </div>
            <div class="cri" v-if="!auditoriumDetail"><p class="mt40"></p><p class="mt10"></p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      auditoriumInfo: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        show: 'block',
        tabIndex: 0,
        tabDateIndex: 0,
        defaultDate: '2018-05-26',
        checkedDate: '2018-05-26',
        dateList: [
          { 'dateString': '5月26日', 'date':'2018-05-26'},
          { 'dateString': '5月27日', 'date':'2018-05-27'},
          { 'dateString': '5月28日', 'date':'2018-05-28'},
          { 'dateString': '5月29日', 'date':'2018-05-29'}
        ],
        auditoriumDetail: []
      }
    },
    methods: {
      tabDate(index,date) {
        this.tabDateIndex = index;
        this.checkedDate = date
        let self = this
        self.$api.get('meeting/hallMeetings?date=' + date + '&hallId=' + this.auditoriumInfo.id, r => {
          self.auditoriumDetail = r.data
        })
      },
      tabSetTodayDefault: function () {
        for ( var i in this.dateList) {
          if (new Date().toDateString() === new Date(this.dateList[i].date).toDateString()) {
            this.tabDateIndex = i
            this.defaultDate = this.dateList[i].date
          }else{
            this.defaultDate =this.dateList[i].date
          }
        }
      },
      classSwitch: function (time) {
        var tempTime = this.checkedDate.replace(new RegExp('-','gm'), '/') + ' ' + time.slice(8,13)
        var meetingTime = new Date(Date.parse(tempTime))
        var currentTime = new Date()
        // var currentTime = new Date(Date.parse('2018/5/28 14:00'))
        return meetingTime < currentTime ? 'gray9 mt40' : 'mt40'
      },
      closeBox: function () {
        this.show = 'none'
      },
    },
    mounted: function () {
      this.tabSetTodayDefault()
      this.$api.get('meeting/hallMeetings?date=' + this.defaultDate + '&hallId=' + this.auditoriumInfo.id, r => {
        this.auditoriumDetail = r.data
      })
    }
  }
</script>

<style scoped>

</style>

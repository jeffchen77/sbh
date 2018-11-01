<template>
  <div class="vmain" style="width:1366px; height:768px; ">
    <div class="return" onClick="javascript:history.back(-1);">会议日程</div>
    <div class="title">2018数博会会议日程</div>
    <div class="vtoa">
      <div class="vtab">
        <div class="vta"></div>
        <div class="vtb"></div>
        <div class="vtc">
          <ul class="clearfix">
            <li :class="{cur:tabIndex == id}" v-for="(dateItem, id) in dateList" :key="id"><a href="javascript:void(0)" @click="tab(id,dateItem.date)">{{ dateItem.dateString }}</a></li>
            <!--<li class="cur"><a href="#">5月26日<span>今天</span></a></li>-->
            <!--<li><a href="#">5月27日</a></li>-->
            <!--<li><a href="#">5月28日</a></li>-->
          </ul>
        </div>
      </div>
      <div class="ritime" style="border: 3px solid #0a426f">
        <div class="rtbg"></div>
        <div class="rli">
          <div class="rhi" ref="scrollBtn">
            <ul>
              <li  v-for="(meetingTopic, index) in meetingDetail" :key="index">
                <div class="lind"></div>
                <div class="rtit">{{ meetingTopic.meetingType }}</div>
                <div class="rbox" v-for="(meetingItem, index1) in meetingTopic.meetings" :key="index1">
                  <div class="rbt">{{ meetingItem.name }}</div>
                  <div class="rbz">
                    <p class="bz1">地点：{{ meetingItem.address }}</p>
                    <p class="bz2">时间：{{ meetingItem.meetingTime }}</p>
                    <p class="bz3">嘉宾：{{ meetingItem.guest }}</p>
                  </div>
                  <!--<div class="rbtn">-->
                    <!--<a href="javascript:void(0)"　 @click="meetingDetailBox(meetingItem.id, meetingItem.name, '0')">会议介绍</a>-->
                    <!--<a href="javascript:void(0)"　 @click="meetingDetailBox(meetingItem.id, meetingItem.name, '1')">会场导览</a>-->
                  <!--</div>-->
                </div>
              </li>
              <!--<li>-->
                <!--<div class="lind"></div>-->
                <!--<div class="rtit">人工智能主题对话</div>-->
                <!--<div class="rbox">-->
                  <!--<div class="rbt">人工智能趋势与发展</div>-->
                  <!--<div class="rbz">-->
                    <!--<p class="bz1">地点：国际生态会议中心分会场黄葛树厅</p>-->
                    <!--<p class="bz2">时间：09:00-10:00</p>-->
                    <!--<p class="bz3">嘉宾：马云、刘强东</p>-->
                  <!--</div>-->
                  <!--<div class="rbtn">-->
                    <!--<a href="#">会场介绍</a>-->
                    <!--<a href="#">会场导览</a>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</li>-->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: '',
  components: {  },
  data () {
    return {
      tabIndex: 0,
      defaultDate: '2018-05-26',
      showlist: true,
      showdetail: false,
      dateList: [
        { dateString: '5月26日', date:'2018-05-26', id: '0'},
        { dateString: '5月27日', date:'2018-05-27', id: '1'},
        { dateString: '5月28日', date:'2018-05-28', id: '2'},
        { dateString: '5月29日', date:'2018-05-29', id: '3'}
      ],
      meetingDetail: []
    }
  },
  methods: {
    tab(id, date) {
      let self = this
      self.tabIndex = id
      self.$api.get('meeting/findByPage?pageSize=100&date=' + date, r => {
        self.meetingDetail = r.data
      })
      // $("div.heightauto").scrollTop(0)
      self.$refs.scrollBtn.scrollTop = 0
    },
    tabSetTodayDefault: function () {
      let tmpDate = this.dateList
      for ( var i in tmpDate) {
        if (new Date().toDateString() === new Date(tmpDate[i].date).toDateString()) {
          this.tabIndex = i
          this.defaultDate = tmpDate[i].date
        }
      }
    }
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
  @import "../../static/robot/css/base.css";
  @import "../../static/robot/css/style.css";
</style>

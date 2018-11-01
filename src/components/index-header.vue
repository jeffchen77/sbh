<template>
  <div>
    <div class="vix">
      <a href="javascript:void(0)"><img src="static/images/zti1.png" @click="popupBox('meetingAgendaBox')"></a>
      <a href="javascript:void(0)" class="ml15"><img src="static/images/zti2.png" @click="popupBox('meetingMapBox')"></a>
      <a href="javascript:void(0)" class="ml15"><img src="static/images/zti3.png" @click="popupBox('hotInformationListBox')"></a>
    </div>
    <div class="qiandoa"><router-link to="/StandByGuestAuth"><img src="static/images/yqiandao.png"></router-link></div>
    <sbtMeetingAgendaBox v-if="subStatus.meetingAgendaBox" @fireClose="afterClose('meetingAgendaBox')" style="z-index: 999"></sbtMeetingAgendaBox>
    <sbtHotInformationListBox v-if="subStatus.hotInformationListBox" @fireClose="afterClose('hotInformationListBox')"></sbtHotInformationListBox>
    <sbt-meeting-map-box v-if="subStatus.meetingMapBox"@fireClose="afterClose('meetingMapBox')"></sbt-meeting-map-box>
  </div>
</template>

<script>
import sbtMeetingAgendaBox from '@/components/sbt/sbt-MeetingAgendaBox'
import sbtHotInformationListBox from '@/components/sbt/sbt-HotInformationListBox'
import sbtMeetingMapBox from '@/components/sbt/sbt-MapBox'
  export default {
  name: '',
  components: { sbtMeetingAgendaBox, sbtHotInformationListBox,sbtMeetingMapBox },
  data () {
    return {
      showlist: true,
      subStatus: {
        meetingAgendaBox: false,
        hotInformationListBox: false,
        meetingMapBox: false
      }
    }
  },
  methods: {
    popupBox: function (boxName) {
      for (let i in this.subStatus) {
        if (i == boxName) {
          this.subStatus[i] = true
        } else {
          this.subStatus[i] = false
        }
      }
    },
    afterClose: function (boxName) {
      for (let i in this.subStatus) {
        if (i == boxName) {
          this.subStatus[i] = false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

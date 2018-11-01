<template>
  <div class="main ybg">
    <indexHeader></indexHeader>
    <sbtMeetingAgendaBox v-if="showMeetingAgenda" @fireClose="afterMeetingAgendaClose()"></sbtMeetingAgendaBox>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header'
import sbtMeetingAgendaBox from '@/components/sbt/sbt-MeetingAgendaBox'
export default {
  name: '',
  data () {
    return {
      showMeetingAgenda: true
    }
  },
  components: { indexHeader, sbtMeetingAgendaBox },
  methods: {
    afterMeetingAgendaClose: function () {
      this.showMeetingAgenda = false
    }
  }
}
</script>

<style scoped>

</style>

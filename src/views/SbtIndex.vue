<template>
  <div>
    <meetingAgenda v-if="true"></meetingAgenda>
    <meeting-details v-if="false"></meeting-details>
  </div>
</template>

<script>
import indexHeader from '@/components/index-header.vue'
import meetingAgenda from '@/components/new/meetingAgenda'
import meetingDetails from '@/components/new/meetingDetails'

export default {
  name: '',
  components: { meetingAgenda, meetingDetails },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

  },
  mounted: function (){

  },
  watch: {
    hotListItem: function (val) {

    }
  },
  computed: {
    todayDate: function () {

    }
  },
  destroyed () {
    clearInterval()
  }
}
</script>

<style scoped>

</style>

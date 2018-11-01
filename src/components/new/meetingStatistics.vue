<template>
  <div class="poli1">
    <meetin-statistic-type ref="meetingTypes" :meetingStatistics="meetingStatistics" v-if="show" key="statisticsStatus"></meetin-statistic-type>
    <topic2 topicType="meetingStatistic" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
  import topic2 from '@/components/new/sbt-topic2.vue'
  import meetinStatisticType from '@/components/new/meetingStatisticsItem'

  export default {
    name: 'meeting-statistics',
    components: {topic2,meetinStatisticType},
    props:{
      question: {
        type: String
      }
    },
    data() {
      return {
        keyStatus:"keyStatus",
        animate: false,
        defaultDate: '2018-05-26',
        showdetail: false,
        meetingInfo: {},
        meetingStatistics:[],
        swiper: null,
        show: false,
        statisticsStatus:"statisticsStatus"
      }
    },
    methods: {
      gotoMeetingList: function(type){
        var self = this;
        self.$parent.$parent.hideModal();
        debugger;
        self.$api.get('meeting/findByMeetingType?type=' + type , r => {
          // self.meetingStatistics = r.data;
          self.$parent.$parent.meetingType = r.data;
          console.log(r.data);
          self.$parent.$parent.meetingList(r.data);
        })
        // this.$parent.$parent.meetingList({"question": this.question, "type": type});
       /* this.$emit(hideModal());
        this.$parent.showModal = true;*/

      },
      junpNumber: function(num){
        this.$refs.meetingTypes.junpNumber(num);
      }
    },
    mounted: function () {
      let self = this;
      self.statisticsStatus = "" + new Date();
      console.log(self.keyStatus)
      // debugger;
      self.$api.get('meeting/search?question=' + this.question , r => {
        self.meetingStatistics = r.data;
        self.show = true;
      })
    }
  }
</script>

<style scoped>


</style>

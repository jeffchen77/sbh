<template>
  <div class="poli1">
    <div class="qyli qyli4">
      <ul class="clearfix">
        <li>
          <div class="qy" @click="submit('showMeetingStatistics')">
            <p class="img"><img src="static/0428/images/op1.png"></p>
            <p class="tit">会议日程</p>
          </div>
        </li>
        <li>
          <div class="qy">
            <p class="img"><img src="static/0428/images/op2.png"></p>
            <p class="tit">展会新闻</p>
          </div>
        </li>
        <li>
          <div class="qy" @click="redirectToMap">
            <p class="img"><img src="static/0428/images/op3.png"></p>
            <p class="tit">地图导览</p>
          </div>
        </li>
        <li>
          <div class="qy">
            <p class="img"><img src="static/0428/icon/参会企业.png"></p>
            <p class="tit">参会企业</p>
          </div>
        </li>
        <li>
          <div class="qy" @click="submit('showGuestListBox')">
            <p class="img"><img src="static/0428/icon/参会嘉宾.png"></p>
            <p class="tit">参会嘉宾</p>
          </div>
        </li>
        <li>
          <div class="qy"  @click="submit('showScenicListBox')">
            <p class="img"><img src="static/0428/icon/必去景点.png"></p>
            <p class="tit">贵阳景点</p>
          </div>
        </li>
        <li>
          <div class="qy" @click="submit('showHumanAndCultureListBox')">
            <p class="img"><img src="static/0428/icon/特色人文.png"></p>
            <p class="tit">特色人文</p>
          </div>
        </li>
        <li>
          <div class="qy" @click="submit('showFoodListBox')">
            <p class="img"><img src="static/0428/icon/贵阳美食.png"></p>
            <p class="tit">贵阳美食</p>
          </div>
        </li>
      </ul>
    </div>
    <topic2 topicType="helpTopic"></topic2>
  </div>
</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'

  export default {
    name: 'help2',
    components: {topic2},
    methods: {
      submit: function (menu) {
        this.$emit('clickMenu', menu);
      },
      redirectToMap() {
        this.$router.push({name:'map'});

      }
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
  @import '../../../static/0428/css/base.css';
  @import '../../../static/0428/css/style.css';
</style>

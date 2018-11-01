<template>
  <div class="poli1">
    <div class="msxq">
      <div class="mq clearfix" style="width:100%;">
        <div id="limitNum" class="limitNum">
          <div class="imgsty">
            <div class="title">今日限行</div>
            <div class="day">{{limitNum.limit}}</div>
            <div class="footer" v-if="limitNum.time != ''">{{limitNum.time}}</div>
          </div>
          <div class="content">
            <div class="title">{{limitNum.title}}</div>
            <div class="description">{{limitNum.desc}}</div>
          </div>
        </div>
      </div>
    </div>
    <topic2 topicType="limitNum" key="keyStatus"></topic2>
  </div>
</template>
<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  export default {
    name: 'limitNum',
    components: {topic2},
    data() {
      return {
        keyStatus:""
      }
    },
    props: {
      limitNum: {
        type: Object,
        required: true
      }
    },
    methods: {

    },
    created:function () {
      // this.idrandom = "" + (new Date()).getTime();
      // this.itemInfoChild.keywords = this.foodInfo.name;
      this.limitNum.time = '07:00-20:00限行';
      switch (this.limitNum.type) {
        case 'LN001':
          var day = new Date().getDay();
          switch (day){
            case 1:
              this.limitNum.limit = '1 / 6';
              break;
            case 2:
              this.limitNum.limit = '2 / 7';
              break;
            case 3:
              this.limitNum.limit = '3 / 8';
              break;
            case 4:
              this.limitNum.limit = '4 / 9';
              break;
            case 5:
              this.limitNum.limit = '5 / 0';

              break;
            default:
              this.limitNum.limit = '不限行';
              this.limitNum.time = '';
          }
          break;
        default:
          this.limitNum.limit = '开四停四';
      }
    },
    mounted: function () {
      var self = this;
      self.keyStatus = "" + new Date();
      // //self.content.img = self.foodInfo.img;
      // self.$api.ask(self.foodInfo.name, (res) => {
      //   switch (res.type) {
      //     case '300':
      //       self.content.name = res.name
      //       self.content.img = res.image
      //       self.content.description = res.profile
      //       self.itemInfoChild.fromMsgType = '300'
      //       break
      //     default: {
      //       break
      //     }
      //   }
      // })
    },
    computed: {
    },
  }
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
  .limitNum{
    width: 980px !important;
    height: 390px;
    overflow-y: hidden;
    background: url(/static/0428/images/ia_03.png) repeat-x;
    border: 1px solid #00bffd;
    color: #00e2ff;
    font-size: 30px;
    border-radius: 10px;
    position: relative;
    margin: 0 auto;
    top: 0px;
  }
  .limitNum .imgsty{
    width: 300px;
    height: 300px;
    margin-left: 40px;
    margin-top: 40px;
    margin-right: 40px;
    float: left;
    background-color: white;
  }
  .limitNum .imgsty .title{
    background-color: red;
    color: white;
    height: 60px;
    line-height: 60px;
  }
  .limitNum .imgsty .day{
    color: red;
    font-size: 60px;
    height: 180px;
    line-height: 180px;
  }
  .limitNum .imgsty .footer{
    color: grey;
  }
  .limitNum .content{
    float: left;
    width: 568px;
    text-align: center;
    margin-top: 20px;
    margin-right: 20px;
  }
  .limitNum .content .title{
    font-size: 40px;
    margin-bottom: 10px;
  }
  .limitNum .content .description{
    text-align: left;
  }
</style>

<template>
  <div class="wen">
    <p class="title" align="center"><img src="static/0428/images/adk.png"></p>
    <div class="mt20" :id="divId">
      <p class="menuItem" v-for="(questionItem,index) in questions" :key="questionItem + uniStatus + ''">"{{questionItem}}"</p>
    </div>
  </div>
</template>

<script>
  let timerDelay;
  let timer5000;
  import {topicConfig} from '../../utils/topic'
  export default {
    name: 'sbt-topic2',
    data () {
      return {
        topic:topicConfig.getTopic(this.topicType),
        questions:[],
        loop:-1,
        divId:"divId",
        uniStatus:"uniStatus",
      }
    },
    props:{
      topicType: {
        type: String,
        required: true
      }
    },
    methods: {
      startAni(obj, delay, callBack){
        let child = $(obj);
/*        setTimeout(function () {
          child.animate({marginLeft:'0px',opacity:1.0},{duration:600,easing:"easeOutQuad",complete:function () {
              setTimeout(function () {
                child.animate({marginLeft:'-976px',opacity:0.0},{duration:600,easing:"easeInQuad",complete:callBack});
              }, 5000)
            }});
        }, delay)*/

        child.delay(delay);
        child.animate({marginLeft:'0px',opacity:1.0},{duration:600,easing:"easeOutQuad"});
        child.delay(5000);
        child.animate({marginLeft:'-976px',opacity:0.0},{duration:600,easing:"easeInQuad",complete:callBack});
      },
      startAndCompute(){
        let content = $("#"+this.divId);
        let ps = content.find(".menuItem");
        if(ps!=undefined && ps.length > 0){
          if(ps.length === 1){
            //只有一个话术的时候
            this.startAni(ps[0], 0, this.startLoopTopic);
          }else if(ps.length === 2){
            //只有两个话术的时候
            this.startAni(ps[0], 0, null);
            this.startAni(ps[1], 300, this.startLoopTopic);
          }else if(ps.length === 3){
            //只有三个话术的时候
            this.startAni(ps[0], 0, null);
            this.startAni(ps[1], 300, null);
            this.startAni(ps[2], 600, this.startLoopTopic);
          }
        }
      },
      startLoopTopic(){
        let self = this;
        self.uniStatus = "" + (new Date()).getTime();
        self.loop++;
        self.loop = self.loop % this.topic.length;
        this.questions = this.topic[self.loop];
        this.$nextTick(function(){
          self.startAndCompute();
        });
      }
    },
    mounted: function (){
      //标题的动画
      this.divId = "div" + (new Date()).getTime();
      $(".title").animate({opacity:1.0},{duration:5000});
      this.startLoopTopic();
    },
    beforeDestroy() {
/*      if(timerDelay){
        clearTimeout(timerDelay)
      }
      if(timer5000){
        clearTimeout(timer5000)
      }*/
    },
  }
</script>

<style scoped>
  .title{
    opacity:0.0
  }
  .menuItem{
    margin-left:976px;
    white-space: nowrap;
    opacity:0.0;
  }
</style>

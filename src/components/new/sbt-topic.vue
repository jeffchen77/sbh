<template>
  <div class="votit">
    <span class="title">您还可以这样问我</span>
    <div class="question">
      <span class="menuItem" v-for="(questionItem,index) in questions" :key="questionItem">"{{questionItem}}"</span>
    </div>
  </div>
</template>

<script>
let loop = -1;
import {topicConfig} from '../../utils/topic'
export default {
  name: 'sbt-topic',
  data () {
    return {
      topic:topicConfig.getTopic(this.topicType),
      questions:[],
    }
  },
  props:{
    topicType: {
      type: String,
      required: true
    }
  },
  methods: {
    startFirstAni(obj, delay, callBack){
      let child = $(obj);
      child.delay(delay);
      child.animate({left:'0px',opacity:1.0},{duration:600,easing:"easeOutQuad"});
      child.delay(5000);
      child.animate({left:'-390px',opacity:0.0},{duration:600,easing:"easeInQuad",complete:callBack});
    },
    startAndCompute(){
      let content = $(".question");
      let spans = content.find(".menuItem");
      if(spans!=undefined && spans.length > 0){
          if(spans.length === 1){
            //只有一个话术的时候
            this.startFirstAni(spans[0], 0, this.startLoopTopic);
          }else if(spans.length === 2){
            //只有两个话术的时候
            this.startFirstAni(spans[0], 0, null);
            this.startFirstAni(spans[1], 300, this.startLoopTopic);
          }else if(spans.length === 3){
            //只有三个话术的时候
            this.startFirstAni(spans[0], 0, null);
            this.startFirstAni(spans[1], 300, null);
            this.startFirstAni(spans[2], 600, this.startLoopTopic);
          }
      }
    },
    startLoopTopic(){
      let self = this;
      loop++;
      loop = loop % this.topic.length;
      this.questions = this.topic[loop];
      this.$nextTick(function(){
        self.startAndCompute();
      });
    }
  },
  mounted: function (){
    //标题的动画
    $(".title").animate({opacity:1.0},{duration:5000});
    this.startLoopTopic();
  }
}
</script>

<style scoped>
.title{
  font-size:25px;
  margin-top:30px;
  white-space: nowrap;
  overflow: hidden;
  color: white;
  opacity:0.0
}
.menuItem{
  display:block;
  margin:10px;
  font-size:20px;
  text-align: center;
  left:390px;
  opacity:0.0;
}
.question{
  width:400px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
</style>

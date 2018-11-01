<template>
  <div v-on:click="userClicked">
    <div v-if="from == 1">
      <threeDIndex v-if="display[0]"></threeDIndex>
      <StandByHotInforDalaoshuo v-if="display[1]"></StandByHotInforDalaoshuo>
      <StandByGuestAuth v-if="display[2]"></StandByGuestAuth>
    </div>
    <div v-if="from == 2">
      <StandByGuestAuth v-if="display[0]"></StandByGuestAuth>
      <StandByHotInforDalaoshuo v-if="display[1]"></StandByHotInforDalaoshuo>
      <threeDIndex v-if="display[2]"></threeDIndex>
    </div>
  </div>
</template>

<script>
let timer;
import threeDIndex from '@/components/threeDIndex'
import StandByGuestAuth from '@/views/StandByGuestAuth'
import StandByHotInforDalaoshuo from '@/views/StandByHotInforDalaoshuo'
export default {
  name: '',
  components: { threeDIndex, StandByGuestAuth, StandByHotInforDalaoshuo },
  data () {
    return {
      from:this.$root.from,
      showIndex:0,
      display:[],
      time:[60000,30000,30000],
      count:0,
      noHotmsg:true,
    }
  },
  methods: {
    userClicked: function () {
      console.log("userClicked");
      clearTimeout(timer);
      this.startTimer();
    },
    startTimer:function(){
      clearTimeout(timer);
      if(this.from == 1){
        timer=setTimeout(this.slideTo,this.time[1]);
      }else if(this.from == 2){
        timer=setTimeout(this.slideTo,this.time[this.showIndex]);
      }
    },
    slideTo:function(){
      //如果没有热点资讯，不会轮播热点资讯
      if(this.noHotmsg && this.showIndex == 0){
        this.showIndex = this.showIndex + 1;
      }
      this.showIndex = (this.showIndex + 1) % this.count;
      for(let i=0; i<this.count; i++){
        if(this.showIndex == i){
          this.$set(this.display, i, true);
        }else{
          this.$set(this.display, i, false);
        }
      }
      this.startTimer();
    }
  },
  mounted: function (){
    console.log("this.from："+this.from);
    this.$root.inSwiper = true;
    let self = this;
    this.display.push(true);
    this.display.push(false);
    this.display.push(false);
    this.count = 3;
    this.startTimer();
    //检测是否有热点资讯
    this.$api.get('hotmessage/getHotNews', r => {
      if(r.data != undefined && r.data.length > 0){
        self.noHotmsg = false;
      }else{
        self.noHotmsg = true;
      }
    });
/*    if(this.from == 1){
      //展馆和其他地点
      console.log("展馆和其他地点");
      this.display.push(true);
      this.display.push(false);
      this.display.push(false);
      this.count = 3;
      this.startTimer();
    }else if(this.from == 2){
      //港口、酒店
      console.log("港口、酒店");
      this.display.push(true);
      this.display.push(false);
      this.count = 2;
      this.startTimer();
    };*/
  },
  //当组件销毁的时候也需要清除timer和socket
  destroyed:function () {
    this.$root.inSwiper = false;
    console.log('StandBy_destoryed');
    if(timer){
      console.log('StandBy_destoryed_timerclear');
      clearTimeout(timer);
    }
  }
}
</script>

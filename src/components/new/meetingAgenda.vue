<template>
  <div class="poli1" style="display: inline-block;width: 976px;">
    <div class="swiper-container">
      <div class="swiper-wrapper" style="height: 450px;">
        <div class="swiper-slide"  v-for="(meetingItems,index) in meetingListInfo" :key="index">
          <div :class="'yuo1 meetingItem_' +  index1" :id="'meeting_' + (getId(index, index1)+1) "v-for="(meetingItem,index1) in meetingItems" :key="index1" @click="popupMeetingInfo(meetingItem.id, meetingItem.theme, meetingItem.time, meetingItem.addr)">
            <div class="badge-iccon">{{getId(index, index1) + 1}}</div>
            <div class="tit">{{ meetingItem.theme }}</div>
            <div class="con">
              <p class="yca">会议时间：{{ meetingItem.time }}</p>
              <p class="ycb">{{ meetingItem.addr }}</p>
            </div>
          </div>
        </div>
    </div>
    </div>
    <topic2 topicType="meetingAgenda" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
  import topic2 from '@/components/new/sbt-topic2.vue'

  export default {
    name: 'meeting-agenda',
    components: {topic2},
    props: {
      meetingListInfo: {
        required: true
      }
    },
    data() {
      return {
        keyStatus:"keyStatus",
        animate: false,
        defaultDate: '2018-05-26',
        showdetail: false,
        items: [
          {name: '"马云参加的会议"', color: '#07d0d7'},
          {name: '"下午两点的会议"', color: '#07d0d7'},
          {name: '"告诉我明天的会议议程"', color: '#07d0d7'}
        ],
        meetingInfo: {},
        meetingDetail:null
      }
    },
    created() {
      setInterval(this.scroll, 1000)
    },
    methods: {
      getSwiper() {
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: 1,
          speed: 5000,
          loop: true,
          observer:true,
          observeParents:true,
          autoplayDisableOnInteraction : false,
          autoplay: true
        });
        return swiper;
      },
      scroll() {
        this.animate = true// 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => { // 这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.items.push(this.items[0])// 将数组的第一个元素添加到数组的
          this.items.shift()// 删除数组的第一个元素
          this.animate = false// margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
      popupMeetingInfo(id, name, time, place) {
        this.$parent.$parent.meetingDetail({id: id, theme: name, time: time, addr: place});
      },
      getId(index, index1){
        return index * 4 + index1;
      },
      junpNumber: function(num){
        debugger;
        if(num != undefined && parseInt(num) > 0){
          var item = this.meetingListInfo[0][parseInt(num) - 1];
          console.log(item);
          this.popupMeetingInfo(item.id, item.theme, item.time, item.addr);
        }

      },
      stopAutoplay: function(swiper){
        if(swiper != null && swiper != undefined){
          for(var i=0; i<swiper.length; i++){
            swiper[i].autoplay.stop();
          }
        }
      }
    },
    mounted: function () {
      var self = this;
      self.keyStatus = "" + new Date();
      var swiper = self.getSwiper();
      debugger;
      if(self.meetingListInfo.length == 1 && self.meetingListInfo[0].length == 1){
        console.log( $(".meetingItem_0"));
        $(".meetingItem_0").css("position", 'absolute');
        $(".meetingItem_0").css("left", '260px');
      }else if(self.meetingListInfo.length == 1 && self.meetingListInfo[0].length == 2){
        $(".meetingItem_0").css("position", 'absolute');
        $(".meetingItem_0").css("left", '0');
        $(".meetingItem_0").css("top", '0');
        $(".meetingItem_1").css("position", 'absolute');
        $(".meetingItem_1").css("right", '0');
        $(".meetingItem_1").css("left", 'auto');
        $(".meetingItem_1").css("top", '0');
      }

      if(self.meetingListInfo.length == 1 && self.meetingListInfo[0].length <= 4){
        self.stopAutoplay(swiper);
      }
    },
    watch: {
      items: function () {
        let self = this
        for (let i in self.items) {
          self.items[i].color = '#07d0d7'
        }
        self.items[1].color = '#0faed7'
      }
    }
  }
</script>

<style scoped>
  @import '../../../node_modules/swiper/dist/css/swiper.min.css';
  @import '../../../static/0428/css/base.css';
  @import '../../../static/0428/css/style.css';
/*  .yuo[data-v-1ad06dab]{
    margin-top: 50px;
    margin-right: 10px;
    margin-left: 20px;
  }

  .yuo .tit[data-v-1ad06dab]{
    overflow:hidden;
    text-overflow:inherit;
    white-space:nowrap
  }

  .swiper-container{
    width: 1200px;
  }*/
  .yuo1{
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    padding-bottom: 20px;
    margin-bottom: 10px;
    margin-left: 10px;
    width: 445px;
    float: left;
    border: 1px solid #00bffd;
    color: #00e2ff;
    background:url(/static/0428/images/ia_03.png) repeat-x;
    font-size: 24px;
    border-radius: 10px;
    height: 182px;
  }

  .yuo1 .tit{
    font-size: 22px;
    color: #fff;
    text-align: center;
    padding: 20px 0;
    height: 44px;
    overflow-y: hidden;
    padding-left: 40px;
    padding-right: 25px;
  }

  .yuo1 .con{
    padding-left: 12px;
  }

  .yuo1 .yca{
    padding-left: 30px;
    text-align: left;
    font-size: 20px;
    background:url(/static/0428/images/hya2.png) no-repeat 0 5px;
  }

  .yuo1 .ycb{
    font-size: 22px;
    margin-top: 20px;
    font-size: 20px;
    padding-left: 30px;
    text-align: left;
    background:url(/static/0428/images/hyb1.png) no-repeat 0 5px;
  }
.meetingItem_0{
  position: absolute;
  left: 0;
  top: 0;
}
  .meetingItem_1{
    position: absolute;
    left: 0;
    top: 222px;
  }

  .meetingItem_2{
    position: absolute;
    right: 0;
    top: 0px;
  }

  .meetingItem_3{
    position: absolute;
    right: 0;
    top: 222px;
  }

  .badge-iccon{
    background: url(/static/0428/images/icon.png) repeat-x;
    height: 40px;
    width: 40px;
    position: absolute;
    left: 13px;
    top: 16px;
    font-size: 16px;
    line-height: 35px;
    color: white;
  }
</style>

<template>
  <div class="poli1">
    <div class="swiper-container" id="swiper1">
      <div class="swiper-wrapper">
    <div class="you you2 swiper-slide" style="width: 600px">
      <div class="tit">{{meetingInfo.theme}}</div>
      <div class="jij clearfix">
        <div class="time">{{meetingInfo.time}}</div>
        <div class="adse">{{meetingInfo.addr}}</div>
      </div>
      <div class="content" v-html="meetingDesc" ><!-- v-html="meetingDesc"-->
        数字信息化时代，企业如何正确开展数字化转型是进入2018年以来的首要课题。近日，网易云发布了年度《2017年北上广深企业数字化发展报告（以下简称：数字报告）》，引起业内广泛关注。报告指出，当前数字化转型已经成为中国所有企业应对挑战的主要战略，预计到2018年，全球1000强企业中的67%、中国1000强企业中的50%都将把数字化转型作为企业的战略核心。
      </div>
    </div>
    <div class="you you3 swiper-slide " @mousedown="clickMouseDown" @mouseup="clickMouseUp"style="width: 900px;">
      <div class="tit">参会嘉宾</div>
      <div class="cuser clearfix">
        <span class="user">{{guestItems.length}}位嘉宾出席</span>
      </div>
      <div class="cvip">
        <ul class="clearfix swiper-no-swiping" >
          <div class="swiper-container" id="swiper2">
            <div class="swiper-wrapper">
          <li v-for="(guestItem,index) in guestItems" :key="index" style="height: 250px;overflow-y: hidden;" class="swiper-slide">
            <p class="img"><img  v-bind:src="guestItem.photo? guestItem.photo: '/static/guest/images/avatar_default.png'" style="width: 90px; height: 90px; border-radius: 45px;"></p>
            <p class="name">{{guestItem.name}}</p>
            <p class="vcp">{{guestItem.position}}</p>
          </li>
            </div>
          </div>
        </ul>
      </div>
    </div>
      </div>
    </div>
      <!-- Add Pagination -->
      <!--<div class="swiper-pagination"></div>-->
    <sbt-topic topicType="meetingDetail" key="keyStatus"/>
    <!--<div class="zyw">-->
      <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; <span style="color:#FFFFFF">你还可以这样问我</span> &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--</div>-->
    <!--<div class="scroll-wrap">-->
      <!--<ul class="scroll-content" v-for="(item,index) in items" :key="index">-->
        <!--<li class="mt5 scrollLi" :style="{color: item.color}">{{item.name}}</li>-->
      <!--</ul>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
  import SbtTopic from "./sbt-topic2";

  export default {
    name: '',
    components: {SbtTopic},
    props: {
      meetingInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        animate: false,
        keyStatus: "keyStatus",
        items: [
          {name: '"马云参加的会议"', color: '#07d0d7'},
          {name: '"下午两点的会议"', color: '#07d0d7'},
          {name: '"告诉我明天的会议议程"', color: '#07d0d7'}
        ],
        guestItems: [
        ],
        meetingDesc: '',
        swiper1:null,
        swiper2:null
      }
    },
    created() {
      setInterval(this.scroll, 1000)
    },
    methods: {
      getSwiper() {
        var self = this;
        this.swiper1 = new Swiper('#swiper1', {
          slidesPerView: 'auto',
          spaceBetween: 30,
          noSwiping : true,
          slidesPerView: 1,
          observer: true,
          observeParents: true,
          watchOverflow: true,
          autoplay: true,
          speed:10000,
          slideToClickedSlide:true,
          on:{
            transitionStart: function(){
              console.log($(".swiper-slide-active").attr("class"))
              if($(".swiper-slide-active").hasClass("you2")){
                self.swiper1.slideTo(0, 1000, false);
              }else{
                self.swiper1.setTranslate(-640)

              }
            }
          }
          // offsetPxBefore:200,
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true,
          // }
        });
        this.swiper2 = new Swiper('#swiper2', {
          slidesPerView: 5,
          spaceBetween: 20,
          touchMoveStopPropagation : false,
          observer: true,
          noSwiping : false,
          observeParents: true,
          watchOverflow: true,
          autoplay: true,
          speed:1000,
          // autoplay: {
          //   delay: 5000,
          //   disableOnInteraction: false
          // },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        });
      },
      scroll() {
        this.animate = true// 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => { // 这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.items.push(this.items[0])// 将数组的第一个元素添加到数组的
          this.items.shift()// 删除数组的第一个元素
          this.animate = false// margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500)
      },
      popupMeetingContent() {

      },
      clickMouseDown:function () {
        this.swiper1.autoplay.stop()
      },
      clickMouseUp:function () {
        this.swiper1.autoplay.start()
      }
    },
    mounted: function () {
      let self = this
      self.keyStatus = "" + new Date()
      self.$api.get('meeting/meetingDetail?&meetingId=' + self.meetingInfo.id, r => {
      // self.$api.get('meeting/meetingDetail?&meetingId=' + '370828d262f677c70162f6ce4086003d', r => {
        self.guestItems = r.guests
        if(r.guests == null || r.guests.length == 0){
          $(".you3").css("display", "none");
          $(".you2").css("margin-left", "100px");
          $(".you2").css("margin-right", "auto");
        }
        self.meetingDesc = r.meetingDesc;
        self.getSwiper();
      })
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
  .you{
    height: 390px;
    overflow-y: hidden;
    margin-right: 30px;
    background: url(/static/0428/images/ia_03.png) repeat-x;
    border: 1px solid #00bffd;
    color: #00e2ff;
    font-size: 30px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  .you2{
    width: 800px !important;
  }

  .you3{
    width: 800px !important;
    display: inline-block;
    overflow: hidden;
  }
  .jij{
    padding: 20px 20px;
  }

  .left-top-title{
    position: absolute;
    font-size: 20px;
    color: white;
    border-top-left-radius: 10px;
    height: 0px;
    float: left;
    border-top: 30px solid #2fe2ff;
    border-right: 100px solid transparent;
  }
  .left-top-title1{
    position: absolute;
    font-size: 20px;
    color: white;
    height: 0px;
    float: left;
    border-top: 30px solid #2fe2ff;
    border-right: 100px solid transparent;
  }

  .left-top-title1>em{
    width: 90px;
    float: left;
    margin-top: -29px;
  }
  .left-top-title>em{
    width: 90px;
    float: left;
    margin-top: -29px;
  }

  .content{
    font-size: 22px;
    padding-right: 10px;
    padding-bottom: 10px;
    display: inline-block;
    text-align: left;
    float: left;
    padding-left: 55px;
    overflow: hidden;
    height: 172px;
  }

  .jij .time{
    float: left;
    padding-left: 0px;
    width: 325px;
  }

  .jij .adse{
    width: 405px;
    float: left;
    padding-left: 20px;

  }

  .you .tit{
    font-size: 34px;
    color: #fff;
    text-align: center;
    padding-top: 20px;
  }

  .enterprise{
    height: 40px;
    overflow: hidden;
  }

  .cvip li .name{
    font-size: 16px;
  }

  .cvip li .vcp{
    height: 60px;
    overflow: hidden;
  }
</style>

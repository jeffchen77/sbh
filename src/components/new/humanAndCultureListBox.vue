<template>

  <div class="poli1">
    <div class="swiper-container" id="swiper1">
      <div class="swiper-wrapper">
        <div class="you you2 swiper-slide" style="width: 600px">
          <div class="tit">贵州名人</div>
          <div class="cvip">
            <ul class="clearfix">
              <div class="swiper-container" id="swiper3">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(human,index) in humanInfoArry" :key="index" style="">
                    <li @click="gotoHumanAndCultureDetail(human.text, human.img, human.title)" style="width: 100%;">
                      <p class="img"><img  v-bind:src="human.img" style="width: 140px;height: 140px;border-radius: 70px;"></p>
                      <p class="name">{{human.text}}</p>
                      <p class="vcp">{{human.desc}}</p>
                    </li>
                  </div>
                </div>
              </div>
            </ul>
          </div>


        </div>
        <div class="you you3 swiper-slide">
          <div class="tit">文化风情</div>

          <div class="cvip">
            <ul class="clearfix">
              <div class="swiper-container" id="swiper2">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(culture,index) in cultureInfoArry" :key="index" style="height: 250px;overflow-y: hidden;">
                    <li @click="gotoHumanAndCultureDetail(culture.text, culture.img, culture.title)" style="width: 100%;">
                      <p class="img"><img  v-bind:src="culture.img" style="width: 140px;height: 140px;border-radius: 70px;"></p>
                      <p class="name">{{culture.text}}</p>
                      <p class="vcp">{{culture.desc}}</p>
                    </li>
                  </div>

                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <topic2 topicType="humanAndCultureList" key="keyStatus"></topic2>

  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'humanAndCultureListBox',
  components: {topic2},
  data() {
    return {
      items: [
        {name: '"马云参加的会议"', color: '#07d0d7'},
        {name: '"下午两点的会议"', color: '#07d0d7'},
        {name: '"告诉我明天的会议议程"', color: '#07d0d7'}
      ],
      keyStatus:"",
      cultureInfoArry: [
        /*{text: '贵阳市', img: 'static/images/culture/guiyang.jpg',desc:'',title:'贵阳介绍'},*/
        {text: '刺绣', img: 'static/images/culture/cixiu.png',desc:'',title:'文化介绍'},
        {text: '地戏', img: 'static/images/culture/dixi.png',desc:'',title:'文化介绍'},
        {text: '苗族剪纸', img: 'static/images/culture/jianzi.png',desc:'',title:'文化介绍'},
        {text: '跳场', img: 'static/images/culture/tiaochang.png',desc:'',title:'文化介绍'},
        {text: '腊染', img: 'static/images/culture/laran.png',desc:'',title:'文化介绍'},
        {text: '三月三', img: 'static/images/culture/sanyuesan.png',desc:'',title:'文化介绍'},
        {text: '四月八', img: 'static/images/culture/siyueba.png',desc:'',title:'文化介绍'},
        {text: '六月六', img: 'static/images/culture/liuyueliu.png',desc:'',title:'文化介绍'},
        ],
      humanInfoArry:[
        {text: '丁宝桢', img: 'static/images/culture/dingbaozhen.png',desc:'晚清洋务运动重要人物',title:'人物介绍'},
        {text: '王阳明', img: 'static/images/culture/wangyangming.png',desc:'“心学”流派创始人',title:'人物介绍'},
        {text: '周渔璜', img: 'static/images/culture/zhouyuhuang.png',desc:'清初著名学者诗人',title:'人物介绍'},
        {text: '宁静', img: 'static/images/culture/ningjing.png',desc:'内地著名影视女演员',title:'人物介绍'},
        {text: '赵以炯', img: 'static/images/culture/zhaoyijiong.png',desc:'晚清光绪年间状元',title:'人物介绍'},
        {text: '陈夔龙', img: 'static/images/culture/chenkuilong.png',desc:'晚清光绪年间外交家',title:'人物介绍'},
        {text: '龚琳娜', img: 'static/images/culture/gonglinna.png',desc:'新艺术音乐创立人',title:'人物介绍'},
        {text: '何洁', img: 'static/images/culture/hejie.png',desc:'内地流行女歌手',title:'人物介绍'},
        {text: '陶华碧', img: 'static/images/culture/taohuabi.png',desc:'老干妈麻辣酱创始人',title:'人物介绍'},
        {text: '姚茫父', img: 'static/images/culture/yaomangfu.png',desc:'铜墨盒纂刻家',title:'人物介绍'},
        {text: '邹市明', img: 'static/images/culture/zoushiming.png',desc:'世界拳击冠军',title:'人物介绍'},
        {text: '陈粒', img: 'static/images/culture/chenli.png',desc:'内地民谣女歌手',title:'人物介绍'},
        {text: '聂远', img: 'static/images/culture/nieyuan.png',desc:'中国内地男演员',title:'人物介绍'},
        {text: '张之洞', img: 'static/images/culture/zhangzhidong.png',desc:'晚清名臣，洋务派代表人物',title:'人物介绍'}
      ]
    }
  },
  methods: {
    closeFoodListBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    created() {
      setInterval(this.scroll, 1000)
    },
    getSwiper() {
      var swiper1 = new Swiper('#swiper1', {
        slidesPerView: 'auto',
        spaceBetween: 30,
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
              swiper1.slideTo(0, 1000, false);
            }else{
              swiper1.setTranslate(-640)

            }
          }
        }
        // offsetPxBefore:200,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // }
      });
      var swiper2 = new Swiper('#swiper2', {
        slidesPerView: 4,
        spaceBetween: 5,
        observer: true,
        loop:true,
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
      var swiper3 = new Swiper('#swiper3', {
        slidesPerView: 4,
        spaceBetween: 5,
        observer: true,
        loop:true,
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
    gotoHumanAndCultureDetail:function(text, img, title){
      this.$emit('openHumanAndCultureDetail', text, img, title);
    },
    /*gotoHumanDetail:function(text, img){
      this.$emit('openHumanDetail', text, img);
    },*/
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    self.getSwiper()
  },
  watch: {
    items: function () {
      let self = this
      for (let i in self.items) {
        self.items[i].color = '#07d0d7'
      }
      self.items[1].color = '#0faed7'
    }
  },
  computed: {
  },
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
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    display: inline-block;
    text-align: left;
  }

  .jij .time{
    float: left;
    padding-left: 0px;
    width: 325px;
  }

  .jij .adse{
    width: 435px;
    float: left;
    padding-left: 0px;

  }

  .you .tit{
    font-size: 48px;
    color: #fff;
    text-align: center;
    padding-top: 20px;
  }
  /*.swiper-slide{
    margin: 0px 36px;
  }*/
</style>

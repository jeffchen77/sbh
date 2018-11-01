<template>
  <!--<div>
    <div class="pobox pobox3">
      <div class="mopr">
        <div id="foodListSwiper" class="swiper-container">
          <div class="swiper-wrapper" style="width: 780px;overflow-x: hidden;">
            <div class="swiper-slide" v-for="(item,index) in foodInfoArry" :key="index">
              <div class="cyimg"><p class="img"><img v-bind:src="item.img" width="212" height="172"></p></div>
              <p class="name">{{item.text}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>-->
  <div class="poli1">
    <div class="mswu">
      <!--<div class="title">美食列表</div>-->
      <div class="msli">
        <div class="mu" style="width: 100%;">
          <!--<ul>
            <li>-->
              <div id="hotelListSwiper" class="swiper-container" style="width:1050px;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in hotelInfoArry" :key="index">
                    <ul>
                      <li @click="gotoDetail(item.text, item.img)" style="margin:10px 15px;">
                        <p class="img"><img :src="item.img" width="172" height="138"></p>
                        <p class="tit">{{item.text}}</p>
                        <p class="con">{{item.desc}}</p>
                      </li>
                    </ul>
                  </div>
                  <div class="swiper-slide"></div>
                </div>
              </div>
            <!--</li>
          </ul>-->
        </div>
      </div>
    </div>
  <!--  <div class="wen">
      <p align="center"><img src="../../../static/0503/images/adk.png"></p>
      <div class="mt20">
        <p>“推荐几家火锅店”</p>
        <p>“附近的美食”</p>
        <p>“介绍以下丝娃娃？”</p>
      </div>
    </div>-->
    <topic2 topicType="helpTopic" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'foodListBox',
  components: {topic2},
  data() {
    return {
      keyStatus:"",
      hotelInfoArry: [
        {text: '中天凯悦酒店', desc:"五星级酒店", img: 'static/images/hotal/zhongtiankaiyue.png'},
        {text: '保利温泉酒店', desc:"五星级酒店", img: 'static/images/hotal/baoliwenquan.png'},
        {text: '铂尔曼酒店',  desc:"五星级酒店", img: 'static/images/hotal/boerman.png'},
        {text: '贵阳万丽酒店', desc:"五星级酒店",img: 'static/images/hotal/guiyangwanli.png'},
        {text: '贵阳新世界酒店', desc:"五星级酒店", img: 'static/images/hotal/xinshiji.png'},
        {text: '凯宾斯基酒店', desc:"五星级酒店",img: 'static/images/hotal/kaibingsiji.png'},
        {text: '群升豪生酒店', desc:"五星级酒店", img: 'static/images/hotal/qunshenghaosheng.png'},
        {text: '世纪金源大饭店', desc:"五星级酒店", img: 'static/images/hotal/shijijinyuan.png'},
        {text: '水投上善酒店', desc:"五星级酒店",img: 'static/images/hotal/shuitoushangshan.png'},
        {text: '索菲特酒店', desc:"五星级酒店", img: 'static/images/hotal/suofeite.png'},
        {text: '天怡豪生酒店', desc:"五星级酒店",img: 'static/images/hotal/tianyihaosheng.png'},
        {text: '喜来登酒店',  desc:"五星级酒店", img: 'static/images/hotal/xilaideng.png'},
        {text: '安拉塔那度假酒店',desc:"五星级酒店", img: 'static/images/hotal/annata.png'},
        {text: '观山湖大酒店', desc:"四星级酒店",img: 'static/images/hotal/guanshanhu.png'},
        {text: '贵铝宾馆', desc:"四星级酒店",img: 'static/images/hotal/guilv.png'},
        {text: '贵州饭店',desc:"四星级酒店", img: 'static/images/hotal/guizhoufandian.png'},
        {text: '和舍酒店', desc:"四星级酒店", img: 'static/images/hotal/hesejiudian.png'},
        {text: '湖城雅天酒店',desc:"四星级酒店",  img: 'static/images/hotal/huchengyatian.png'},
        {text: '华美达酒店', desc:"四星级酒店",img: 'static/images/hotal/huameida.png'},
        {text: '皇朝酒店', desc:"四星级酒店",img: 'static/images/hotal/huangchao.png'},
        {text: '金芦笙小镇酒店', desc:"四星级酒店",img: 'static/images/hotal/jinlusheng.png'},
        {text: '金阳大酒店', desc:"四星级酒店",img: 'static/images/hotal/jinyangdajiudian.png'},
        {text: '君尚国际大酒店', desc:"四星级酒店",img: 'static/images/hotal/junshangguoji.png'},
        {text: '凯恩斯酒店',desc:"四星级酒店", img: 'static/images/hotal/kaiwensi.png'},
        {text: '丽豪酒店', desc:"四星级酒店",img: 'static/images/hotal/lihao.png'},
        {text: '铭都酒店',  desc:"四星级酒店",img: 'static/images/hotal/mingdujiudian.png'},
        {text: '诺富特酒店',  desc:"四星级酒店", img: 'static/images/hotal/ruofutejiudian.png'},
        {text: '盘江饭店', desc:"四星级酒店", img: 'static/images/hotal/panjiangfandian.png'},
        {text: '乾银和悦酒店', desc:"四星级酒店",img: 'static/images/hotal/quanyinheyue.png'},
        {text: '群升花园酒店', desc:"四星级酒店",img: 'static/images/hotal/qunshenghuayuan.png'},
        {text: '西湖花园酒店', desc:"四星级酒店", img: 'static/images/hotal/xihuhuayuan.png'},
        {text: '雅迪尔酒店', desc:"四星级酒店", img: 'static/images/hotal/yadierjiudian.png'},
        {text: '多彩四季酒店', desc:"三星级酒店",img: 'static/images/hotal/daocaisiji.png'},
        {text: '观山景和酒店', desc:"三星级酒店",img: 'static/images/hotal/guanshanjinghe.png'},
        {text: '金博酒店', desc:"三星级酒店",img: 'static/images/hotal/jinbo.png'},
        {text: '凯盛酒店', desc:"三星级酒店",img: 'static/images/hotal/kaisheng.png'},
        {text: '林城假日酒店', desc:"三星级酒店",img: 'static/images/hotal/linchengjiari.png'},
        {text: '南湖花园酒店',  desc:"三星级酒店",img: 'static/images/hotal/nanhuhuayuan.png'},
        {text: '荣和酒店', desc:"三星级酒店",img: 'static/images/hotal/ronghejiudian.png'},
        {text: '同心喜酒店', desc:"三星级酒店",img: 'static/images/hotal/tongxinxi.png'},
        {text: '途家酒店', desc:"三星级酒店",img: 'static/images/hotal/tujiajiudian.png'},
        {text: '维也纳酒店-贵阳北站店', desc:"三星级酒店", img: 'static/images/hotal/weiyena.png'},
        {text: '维也纳酒店-会展中心店', desc:"三星级酒店", img: 'static/images/hotal/weiyena.png'},
        {text: '星辰酒店', desc:"三星级酒店",img: 'static/images/hotal/xingchenjiudian.png'},
      ],
    }
  },
  methods: {
    closeHotelListBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    initSwiper: function(){
      new Swiper('#hotelListSwiper', {
        slidesPerView:5,
        speed:1000,
        observer: true,
        observeParents: true,
        watchOverflow: true,
      });
    },
    gotoDetail:function(text, img){
      this.$emit('openDetail', text, img);
    },
    gotoDetailByNum:function(num){
      if(num>0 && num <= this.hotelInfoArry.length){
        this.$emit('openDetail', this.hotelInfoArry[num-1].text, this.hotelInfoArry[num-1].img);
      }
    },
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    this.initSwiper();
  },
  computed: {
  },
}
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
  .msli .mu li .tit{
    padding: 10px 0;
    color: #fff;
    font-size: 25px;
    height: 65px;
    overflow: hidden;
  }
</style>

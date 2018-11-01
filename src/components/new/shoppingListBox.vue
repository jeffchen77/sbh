<template>
  <div class="poli1">
    <div class="mswu">
      <div class="msli">
        <div class="mu" style="width: 100%;">
          <!--<ul>
            <li>-->
              <div id="shoppingListSwiper" class="swiper-container" style="width:1050px;">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item,index) in shoppingInfoArry" :key="index">
                    <ul>
                      <li @click="gotoDetail(item.text, item.img)" style="margin:10px 15px;">
                        <p class="img"><img :src="item.img" width="172" height="138"></p>
                        <p class="tit">{{item.text}}</p>
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
    <topic2 topicType="shoppingList" :key="keyStatus"></topic2>
  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'shoppingListBox',
  components: {topic2},
  data() {
    return {
      keyStatus:"1",
      shoppingInfoArry: [
        {text: '贵阳世纪金源购物中心', img: 'static/images/shopping/new/shiji.jpg'},
        {text: '贵阳西南国际商贸城', img: 'static/images/shopping/new/xinan.jpg'},
        {text: '南国花锦购物中心店', img: 'static/images/shopping/new/nanguo.jpg'},
        {text: '星力百货', img: 'static/images/shopping/new/xinli.jpg'},
        {text: '国贸商城', img: 'static/images/shopping/new/guomao.jpg'},
        {text: '星美国际影城', img: 'static/images/shopping/new/xinmei.jpg'},
        {text: '中大国际广场', img: 'static/images/shopping/new/zhongda.jpg'}
      ],
    }
  },
  methods: {
    closeShoppingListBox: function () {
      let self = this
      self.$emit('fireClose')
    },
    initSwiper: function(){
      new Swiper('#shoppingListSwiper', {
        slidesPerView:5,
        speed:1000,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
      });
    },
    gotoDetail:function(text, img){
      this.$emit('openDetail', text, img);
    },
    gotoDetailByNum:function(num){
      if(num>0 && num <= this.shoppingInfoArry.length){
        this.$emit('openDetail', this.shoppingInfoArry[num-1].text, this.shoppingInfoArry[num-1].img);
      }
    },
  },
  mounted: function () {
    var self = this;
    self.keyStatus = "" + new Date();
    self.initSwiper();
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

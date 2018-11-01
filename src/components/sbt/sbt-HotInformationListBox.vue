<template>
  <div>
  <div class="zmbg">
    <div class="zmco">
      <div class="zcobg"></div>
      <div class="closet"><img src="static/images/dpxq1.png" v-on:click="closeHotInforListBox"></div>
      <div class="dpco">
        <div class="dpmimg">
          <!-- Swiper -->
          <div class="swiper-container" style="z-index: 0">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(imgItem,index) in hotInformationIMGs" :key="index">
                <p class="img">
                  <img :src="imgItem.img" width="980" height="520">
                </p>
                <em class="zz"></em>
                <div class="zsp"></div>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="dpcontent mt20">
        <p class="hotdi">
          <span>热点资讯</span>
          <a href="javascript:void(0)"><img src="static/images/refch.png" v-on:click="change()"></a>
          <span  class="forspan"></span>
        </p>
        <div class="tjpor mt40">
          <dl class="clearfix" v-for="(item,index) in hotInformationList" :key="index" :style="{'border-bottom': index%2 != 1 ? '1px solid #00baff' : '0px'}">
            <span class="forspan" v-show="index%2 != 1"></span>
            <dt>
              <p class="img"><img src="static/images/jqir.png" width="154" height="162"></p>
            </dt>
            <dd>
              <p class="ti" v-html="item.content" ref="content" style="height: 285px; -webkit-line-clamp: 6"></p>
              <p class="ci" v-show="item.knowledge != ''"><span @click="chat(item.knowledge)">与小博聊一下这条资讯</span><img src="static/images/bofan.png" class="ml5"></p>
            </dd>
          </dl>
        </div>
      </div>

    </div>
  </div>
  <chat-news :question="question"  :thisPageNum ="pageNum" v-if="showNews"  @fireClose="afterChatNewsClose()"></chat-news>
  </div>
</template>

<script>
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
import chatNews from '@/components/sbt/sbt-chatNews'
export default {
  name: '',
  components: { chatNews },
  data () {
    return {
      showNews : false,
      question : "",
      maxLength: 140,
      pageNum: 0,
      totalPage: 0,
      hotInformationList: [],
      hotInformationIMGs: []
    }
  },

  created () {
  },
  methods: {
    closeHotInforListBox: function () {
      this.$emit('fireClose')
    },
    getSwiper () {
      var mySwiper = new Swiper('.swiper-container', {// eslint-disable-line no-unused-vars
        // loop:true,
        centeredSlides: true,
        speed:100,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },)
    },
    getHotInforData () {
      this.$api.get('hotmessage/getHotMessages?pageSize=2&pageNum=0', r => {
        this.hotInformationList = r.data
        this.totalPage = r.totalPage
      })
    },
    getHotInforImgs () {
      this.$api.get('hotmessage/getImages?pageSize=100', y => {
        this.hotInformationIMGs = y.data
      })
    },
    change: function () {
      this.pageNum + 1 == this.totalPage ? this.pageNum = 0 : this.pageNum++
      this.$api.get('hotmessage/getHotMessages?pageSize=2&pageNum=' + this.pageNum, r => {
        this.hotInformationList = r.data
      })
    },
    maxSlice (content) {
      return content.length > this.maxLength ? content.slice(0, this.maxLength) + '...' : content
    },
    afterChatNewsClose: function () {
      let self = this
      self.show = 'block'
      self.showNews = false
      self.getSwiper()
    },
    chat : function (_question) {
      let self = this
      // debugger
      self.showNews = true
      self.question = _question
    }
  },
  mounted: function (){
    this.getHotInforData()
    this.getHotInforImgs()
    this.getSwiper()
  },
  computed: {
    // twoItem () {
    //   return [this.hotInformationList[i], this.hotInformationList[i + 1] ]
    // }
  },
  watch: {
    // hotInformationIMGs: function (val) {
    //   this.getSwiper()
    // }
  }
}
</script>

<style scoped>
  @import'../../../node_modules/swiper/dist/css/swiper.min.css';
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    /*background: #fff;*/
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .forspan {display:block; position:absolute; bottom:-25px; left:-23px; background:url(/static/images/dpvd.png) no-repeat; width:78px; height:25px}
</style>

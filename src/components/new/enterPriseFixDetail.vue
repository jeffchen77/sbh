<template>
  <div class="poli">
    <div class="yuo yuo3">
      <div class="tit">{{name.substring(0,4)}}</div>
      <div class="adstp"><span>{{code}}展台</span></div>
      <div class="ticong">
        <p class="fr"><img :src="logo" style="width: 240px; height: 174px;"></p>
        <div v-html="desc"></div>
        <!--<p v-html="html">{{desc}}</p>-->
        <!--<p>阿里巴巴集团的使命是让天下没有难做的生意。 我们旨在赋能企业改变营销、销售和经营的方式。我们为商家、品牌及其他企业提供基本的互联网基础设施以及营销平台，让其可借助互联网的力量与用户和客户互动。我们的业务包括核心电商、云计算、数字媒体和娱乐以及创新项目和其他业务。我们并通过子公司菜鸟网络及所投资的关联公司口碑，参与物流和本地服务行业，同时与蚂蚁金融服务集团有战略合作，该金融服务集团主要通过中国领先的第三方网上支付平台支付宝运营。 我们的愿景 我们旨在构建未来的商务生态系统。我们的愿景是让客户相会、工作和生活在阿里巴巴，并持续发展最少102年</p>-->
        <!--<p class="mt20">我们的业务包括核心电商、云计算、数字媒体和娱乐以及创新项目和其他业务。</p>-->
        <!--<p class="mt20">我们并通过子公司菜鸟网络及所投资的关联公司口碑，参与物流和本地服务行业。</p>-->
      </div>
    </div>
    <topic2 topicType="meetingDetail" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
  export default {
    name: 'guestListBox',
    components: {topic2},
    data() {
      return {
        code:"",
        desc:"",
        logo:"",
        id:"",
        name:"",
        keyStatus:"",
        govTotal:0,
        govData:[],//政府嘉宾
        entTotal:0,
        entData:[],//企业嘉宾
        expTotal:0,
        expData:[],//专家嘉宾
        epData:[],//所有展馆企业
      }
    },
    props: {
      epName: {
      }
    },
    methods: {
      initGuestListSwiper: function(){
        new Swiper('#guestListSwiper'+this.keyStatus, {
          slidesPerView:1,
          speed:4000,
          spaceBetween: 100,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        });
      },

      initGovListSwiper: function(){
        new Swiper('#govListSwiper'+this.keyStatus, {
          slidesPerView:1,
          speed:3000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        });
      },

      initExpListSwiper: function(){
        new Swiper('#expListSwiper'+this.keyStatus, {
          slidesPerView:1,
          speed:3000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        });
      },

      initEntListSwiper: function(){
        new Swiper('#entListSwiper'+this.keyStatus, {
          slidesPerView:1,
          speed:3000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        });
      },

      groupByData: function (arrData) {
        let self = this
        var alldata = []
        var index = 0
        for (var j = 0; j < arrData.length; j = j + 6) {

          var pagedata = []
          for (var i = 0; i < 6; i++) {
            if (index < arrData.length) {
              if(!(arrData[index].logo)){
                arrData[index].logo = "../../../static/guest/images/avatar_default.png";
              }
              pagedata.push(arrData[index])
            }
            index++
            if(index>20)
            {
              continue;
            }
          }
          alldata.push({data: pagedata})
        }
        return alldata
      },
    },
    created:function () {
      //从后台获取数据
      let self = this;
      // self.epName='阿里巴巴（中国）有限公司'
      self.keyStatus = "" + (new Date()).getTime();
      self.$api.get('enterprise/findByName?name='+self.epName, r => {
        if(r.enterprise){
          let ep = r.enterprise;
          self.code = ep.code;
          self.name = ep.name;
          self.logo = ep.logo;
          self.id = ep.id;
          self.desc = ep.desc;
        }
      })
    },
    mounted: function () {
      let self = this;
      self.initGuestListSwiper();
      self.initGovListSwiper();
      self.initEntListSwiper();
      self.initExpListSwiper();
    },
    computed: {
    },
  }
</script>

<style scoped>
  @import '../../../static/0509/css/base.css';
  @import '../../../static/0509/css/style.css';

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
</style>

<template>
  <div class="poli">
    <div class="uap">
      <!--<div class="tit"></div>-->
      <div :id="'guestListSwiper'+keyStatus" class="swiper-container">
        <div class="swiper-wrapper">

          <div class="swiper-slide" v-for="(epd,index0) in this.epData " :key="index0">
            <div class="yuo yuo3">
              <div class="tit">{{epd.name}}</div>
              <div class="cuser clearfix">
                <span>{{epd.theme}}</span>
              </div>
              <div :id="'govListSwiper'+keyStatus" class="swiper-container">
                <div class="swiper-wrapper">

                  <div class="swiper-slide" v-for="(gov,index1) in epd " :key="index1">
                    <div class="cpmm">
                      <ul class="clearfix">
                        <li v-for="(item,index2) in gov.data" :key="index2">
                          <dl class="clearfix">
                            <dt><img :src="item.logo" style="width: 90px; height: 90px;"></dt>
                            <dd>
                              <p name="epnamecs" v-if="item.name.length<12">{{item.name}}</p>
                              <p name="epnamecs" v-else="item.name.length>12">{{item.name.substring(0,11)}}...</p>
                              <p>展位：{{item.code}}</p>
                            </dd>
                          </dl>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
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
        keyStatus: "",
        govTotal: 0,
        govData: [],//政府嘉宾
        entTotal: 0,
        entData: [],//企业嘉宾
        expTotal: 0,
        expData: [],//专家嘉宾
        epData: [],//所有展馆企业
      }
    },
    methods: {
      initGuestListSwiper: function () {
        new Swiper('#guestListSwiper' + this.keyStatus, {
          slidesPerView: 1,
          speed: 4000,
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

      initGovListSwiper: function () {
        new Swiper('#govListSwiper' + this.keyStatus, {
          slidesPerView: 1,
          speed: 3000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        });
      },

      initExpListSwiper: function () {
        new Swiper('#expListSwiper' + this.keyStatus, {
          slidesPerView: 1,
          speed: 3000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          observer: true,
          observeParents: true,
          watchOverflow: true,
        });
      },

      initEntListSwiper: function () {
        new Swiper('#entListSwiper' + this.keyStatus, {
          slidesPerView: 1,
          speed: 3000,
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
              if (!(arrData[index].logo)) {
                arrData[index].logo = "../../../static/guest/images/avatar_default.png";
              }
              pagedata.push(arrData[index])
            }
            index++
            if (index > 20) {
              continue;
            }
          }
          alldata.push({data: pagedata})
        }
        return alldata
      },

    },
    created: function () {
      //从后台获取数据
      let self = this;
      self.keyStatus = "" + (new Date()).getTime();
      self.$api.get('enterprise/findByGroup', r => {
        if (r.G1.data) {
          let obj = self.groupByData(r.G1.data);
          obj.name = r.G1.name;
          obj.theme = r.G1.theme;
          self.epData.push(obj)
        }
        if (r.G2.data) {
          let obj = self.groupByData(r.G2.data);
          obj.name = r.G2.name;
          obj.theme = r.G2.theme;
          self.epData.push(obj)
        }
        if (r.G3.data) {
          let obj = self.groupByData(r.G3.data);
          obj.name = r.G3.name;
          obj.theme = r.G3.theme;
          self.epData.push(obj)
        }
        if (r.G4.data) {
          let obj = self.groupByData(r.G4.data);
          obj.name = r.G4.name;
          obj.theme = r.G4.theme;
          self.epData.push(obj)
        }
        if (r.G5.data) {
          let obj = self.groupByData(r.G5.data);
          obj.name = r.G5.name;
          obj.theme = r.G5.theme;
          self.epData.push(obj)
        }
        if (r.G6.data) {
          let obj = self.groupByData(r.G6.data);
          obj.name = r.G6.name;
          obj.theme = r.G6.theme;
          self.epData.push(obj)
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
    computed: {},
  }
</script>

<style scoped>
  @import '../../../static/0509/css/base.css';
  @import '../../../static/0509/css/style.css';

  .you {
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

  .you2 {
    width: 800px !important;
  }

  .you3 {
    width: 800px !important;
    display: inline-block;
    overflow: hidden;
  }

  .jij {
    padding: 20px 20px;
  }

  .left-top-title {
    position: absolute;
    font-size: 20px;
    color: white;
    border-top-left-radius: 10px;
    height: 0px;
    float: left;
    border-top: 30px solid #2fe2ff;
    border-right: 100px solid transparent;
  }

  .left-top-title1 {
    position: absolute;
    font-size: 20px;
    color: white;
    height: 0px;
    float: left;
    border-top: 30px solid #2fe2ff;
    border-right: 100px solid transparent;
  }

  .left-top-title1 > em {
    width: 90px;
    float: left;
    margin-top: -29px;
  }

  .left-top-title > em {
    width: 90px;
    float: left;
    margin-top: -29px;
  }

  .content {
    font-size: 22px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    display: inline-block;
    text-align: left;
  }

  .jij .time {
    float: left;
    padding-left: 0px;
    width: 325px;
  }

  .jij .adse {
    width: 435px;
    float: left;
    padding-left: 0px;

  }

  .you .tit {
    font-size: 48px;
    color: #fff;
    text-align: center;
    padding-top: 20px;
  }
</style>

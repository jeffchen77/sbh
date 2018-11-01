<template>
  <div class="main ybg">
    <dlsHeader></dlsHeader>
    <div v-if="show" class="vbox">
      <div class="vxti"></div>
      <div class="vxbi"></div>
      <div class="vxbg"></div>
      <div class="vxci">
        <div class="vxcon">
          <div class="vnti">
            <p class="cta">数博会热点 - {{ todayDate }}</p>
            <p class="ctb" v-show="hotListItem.knowledge != ''" @click="chat(hotListItem.knowledge)">与小博聊一下这条资讯</p>
          </div>
          <div class="usermsg" v-show="hotListItem.type == 1" ref="dalaoshuo">
            <p class="upk">大佬说</p>
            <div class="usbk"><p class="img"><img :src="hotListItem.gusetPhoto" width="146" height="146"></p></div>
            <p class="name">{{ hotListItem.name }}</p>
            <p class="zw">{{ hotListItem.position }}</p>
          </div>
          <div class="vtitle" style="margin-bottom: 10px;">{{ hotListItem.title }}</div>
          <!--<p align="center" class="mt40">-->
          <div :class="{toaa:0 == hotListItem.type}">
            <!-- Swiper -->
            <div class="swiper-container" v-show="hotListItem.type == 0" ref="hotinfo">
              <div class="swiper-wrapper">
                <div class="" v-for="(item, index) in hotListItem.images" :key="index">
                  <!--swiper-container TODO 暂时为了掩饰只显示一张图片-->
                  <p class="tati"><img :src="item" width="760" height="400"></p>
                  <p class="tabg"></p>
                </div>
              </div>
              <!-- Add Pagination -->
              <div class="swiper-pagination"></div>
              <!--&lt;!&ndash; Add Arrows &ndash;&gt;-->
              <!--<div class="swiper-button-next"></div>-->
              <!--<div class="swiper-button-prev"></div>-->
            </div>
          </div>
          <!--<div class="vcontent" style="z-index: 999;position: relative">
            <p class="heightauto" style="width:766px;height:440px;font-size: 30px;color: #fff;" v-html="hotListItem.content"></p>
          </div>-->
          <div id="marquee" class="vcontent" style="height:440px;overflow-y:hidden">
            <p id="content" v-html="hotListItem.content"></p>
          </div>
        </div>
      </div>
    </div>
    <chat-news :question="question" :thisPageNum="pageNum" v-if="showNews"
               @fireClose="afterChatNewsClose()"></chat-news>
  </div>
</template>

<script>
  import dlsHeader from '@/components/dls-header'
  import Swiper from '../../node_modules/swiper/dist/js/swiper.min'
  import chatNews from '@/components/sbt/sbt-chatNews'
  import QWebChannel from '../../static/js/qwebchannel'
  import {device, wsServer} from "../utils/constant_new";

  let socket;
  let timerHot;
  let loopTimer;
  export default {
    name: '',
    components: {dlsHeader, chatNews},
    data() {
      return {
        hotlist: [],
        hotListItem: [
          // {"id":"2c948885625ff9220162603ab5680000","cerateDate":"03月26日","title":"大佬说的都是真的吗","content":"大<b>佬说的都是真</b>的吗","image":"2018-03-26/d8cbcbf4-d52f-4c90-992e-afa7cb020be5.png","knowledge":"www.baidu.com","type":"1","name":"马云","rank":"0.11023317287697752","gusetPhoto":"http://222.85.147.140:10003/expoftp/2018-03-27/aaa112e3-8ad2-4ff6-ade1-98d57e56f6aa.jpg","position":"董事局主席","images":["http://222.85.147.140:10003/expoftp/2018-03-26/d8cbcbf4-d52f-4c90-992e-afa7cb020be5.png"]}
        ],
        show: true,
        hotInfoImgs: [],
        showNews: false,
        question: "",
      }
    },
    created() {
    },
    methods: {
      getData() {
        let self = this
        this.$api.get('hotmessage/getHotNews', r => {
          self.hotlist = r.data
          console.log(r.data)
          self.loopPage()
        });
      },
      loopPage() {
        const TIME_INTERVAL = 1000 * 60
        let index = 0
        let self = this
        this.hotListItem = this.hotlist[index]
        this.start()
        /*self.start()*/
        if (loopTimer) {
          clearInterval(loopTimer);
        }
        loopTimer = setInterval(() => {
          index = (index + 1) % self.hotlist.length
          self.hotListItem = self.hotlist[index]
          self.start()
          /*        var content = $("#content");
                  content.css("margin-top", "0px");
                  if(timerHot){
                    clearInterval(timerHot);
                  }*/
          /*self.$nextTick(function(){
            self.start()
          });*/
          /*self.start()*/
        }, TIME_INTERVAL)
      },
      getSwiper() {
        var mySwiper = new Swiper('.swiper-container', {// eslint-disable-line no-unused-vars
          loop: true,
          centeredSlides: true,
          speed: 100,
          updateOnImagesReady: true,
          autoplay: {
            delay: 2000,
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
        })
      },
      chat: function (_question) {
        /*     let self = this
             debugger
             self.showNews = true
             self.question = _question
             self.show = false;*/
        // this.$router.push({path:'/threeDIndex', query:{device:this.$root.device, from:this.$root.from, chatquestion:_question}});
      },
      afterChatNewsClose: function () {
        let self = this
        self.show = true;
        self.showNews = false
        self.getSwiper()
      },
      startUpScroll: function () {
        let offset = 0;
        let contentHeight = 0;
        let marqueeHeight = 0;
        var marquee = $("#marquee");
        var content = $("#content");
        contentHeight = content.height();
        marqueeHeight = marquee.height();
        let min = contentHeight - marqueeHeight;
        if (min <= 0) {
          return;
        }
        timerHot = setInterval(function () {
          if (offset === (min + 20)) {
            offset = 0;
          }
          content.css("margin-top", "-" + offset + "px");
          offset += 1;
        }, 50);
      },
      start: function () {
        let self = this;
        var content = $("#content");
        content.css("margin-top", "0px");
        if (timerHot) {
          clearInterval(timerHot);
        }
        setTimeout(function () {
          self.startUpScroll()
        }, 2000)
      }
    },
    mounted: function () {
      this.getData()
      this.getSwiper()

      //ibotex连接+迎宾相关事件
      var faceDtl;
      var faceDistance;
      var asrFlag;
      var userName;
      var userAttr;
      var userUrl;
      var userData = new Object();
      userData.userName = '';
      userData.userAttr = '';
      userData.userUrl = '';
      let self = this;
      // let baseUrl = "ws://192.168.160.240:11013"; //深圳测试机
      // let wsServer = "ws://192.168.160.40:11013";     //小i测试机
       //let baseUrl = "ws://127.0.0.1:11013";
      // let socket = new WebSocket(wsServer);
      socket = new WebSocket(wsServer);
      this.$router.afterEach(function () {
        socket.close();
        if (asrFlag) {
          clearInterval(asrFlag);
        }
        console.log("dalaoshuo close socket");
      });

      socket.onclose = function () {
        console.log("loading 关闭");
      };
      socket.onerror = function (error) {
        console.log("loading error: " + error);
      };
      socket.onopen = function () {
        new QWebChannel(socket, function (channel) {

          console.log("loading 连接成功！");
          let core = channel.objects.core;
          self.core = core;
          self.core.setAvatarVisible(false);
          self.core.stopVoiceRecognize();
          console.log(self.core);

          // setTimeout(function () {
          //   console.log("启动人脸识别");
          //   core.startFaceRecognize(1);
          // }, 1000);

          // console.log("启动人脸识别");
          // core.startFaceRecognize(1);

          //捕捉到是否有人
          function stopWatch() {
          }

          stopWatch.prototype.Start = function () {
            this.startD = new Date();
            return this;
          };
          stopWatch.prototype.Stop = function () {
            this.startD = new Date();
            return this;
          };
          stopWatch.prototype.Seconds = function () {
            return Math.abs((new Date() - this.startD) / 1000);
          };

          var sw = new stopWatch();
          sw.Start();
          let isAppear = true; //一开始置为true是为了从index调回待机页面，摄像头目前一直有人导致faceDetectEvent不发消息的修复

          //一次人脸检测
          core.faceDetectEvent.connect(showFaceDetectEvent);
          function showFaceDetectEvent(faceAppearred, faceDetails) {
            let timeString = new Date().toLocaleTimeString();
            if (faceAppearred) //出现人脸。
            {
              isAppear = true;
              console.log("load一次检查出现。" + sw.Seconds() + ' s');
              faceDtl = JSON.parse(faceDetails);
              if (faceDtl) {
                console.log("一次人像距离——————" + faceDtl.staring.distance_mm);
              }
              sw.Start();
            }
            else //人脸消失。
            {
              isAppear = false;
              console.log("load一次检测消失。" + sw.Seconds());
              sw.Start();
            }
          }

          var axios = require('axios');
          //心跳人脸检测
          core.faceDetectUpdateEvent.connect(showFaceDetectUpdateEvent);
          function showFaceDetectUpdateEvent(faceDetails) {
            // console.log('心跳时间:'+sw.Seconds()+' 秒isAppear ' +isAppear+'     facedetails'+ faceDetails);
            // debugger;
            core.startFaceRecognize(5,5);

            faceDtl = JSON.parse(faceDetails);
            if (faceDtl) {

              if (faceDtl.staring) {
                var rqdata = '{' +
                  '"location_left":' + faceDtl.staring.location_left + ',' +
                  '"location_top":' + faceDtl.staring.location_top + ',' +
                  '"location_width":' + faceDtl.staring.location_width + ',' +
                  '"location_height":' + faceDtl.staring.location_height + ',' +
                  '"yaw":' + faceDtl.staring.yaw + ',' +
                  '"pitch":' + faceDtl.staring.pitch +
                  '}';
                getDistance(rqdata);
                console.log('res距离:'+ faceDistance);
                if (faceDistance&&faceDistance < 18500) {
                  if (sw.Seconds() > 2 && isAppear) {
                    console.log("N秒达成 迎宾开始！——————" + faceDistance);
                    welcome();
                  }
                }
                //备份 ibotex返回距离判定
                // if (faceDtl.staring.distance_mm) {
                //   if (faceDtl.staring.distance_mm < 3000) {
                //     if (sw.Seconds() > 10 && isAppear) {
                //       console.log("N秒达成 迎宾开始！——————" + faceDtl.staring.distance_mm);
                //       welcome();
                //     }
                //   }
                // }
              }
            }
          }

          function getDistance(rqdata) {
            axios.post('http://222.85.147.140:10003/distance', rqdata, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(function (res) {
                // console.log('axios_yide2:' + res.data);
                faceDistance = res.data;
              })
              .catch(function (error) {
                console.log('err:' + error);
                faceDistance = '';
              });
          }

          function welcome() {
            console.log("loading ---> 招揽。" + sw.Seconds() + ' s');
            sw.Stop();
            sw.Start();
            clearInterval(asrFlag);
            // self.$router.push({path: '/index'});
            self.$router.push({name: 'index', params: {userData: userData}});
          }

          //发起人脸识别检测请求
          asrFlag = setInterval(function face_asr() {
            // core.startFaceRecognize(5);
            // console.log('发起人脸识别');
          }, 1000);

          //接收ibotex人脸识别返回消息 [识别姓名 + 图片id + 属性]
          core.faceRecognizeResultEvent.connect(showFaceRecognizeResultEvent);

          function showFaceRecognizeResultEvent(asrmsg) {
            console.log("人脸查找人名: " + asrmsg);
            if (asrmsg) {
              asrmsg = JSON.parse(asrmsg);
              if (asrmsg.records) {
                if (asrmsg.records.length > 0) {
                  userName = asrmsg.records[0].user_name;
                  userAttr = asrmsg.records[0].attribute;
                  userUrl = 'http://192.168.160.38:8085/api/attachment/Show?id=' + asrmsg.records[0].face_url;// 深圳ip http://weixin.sz.xiaoi.com:8081/api/attachment/Show?id=
                  // userUrl = 'http://weixin.sz.xiaoi.com:8085/api/attachment/Show?id=' + asrmsg.records[0].face_url;// 深圳ip http://weixin.sz.xiaoi.com:8081/api/attachment/Show?id=
                  userData.userName = userName;
                  userData.userAttr = userAttr;
                  userData.userUrl = userUrl;
                  // console.log('load_vip::::' + asrmsg.records[0].user_name);
                }
              }
            }

            // console.log('core.startFaceRecognize 请求人脸识别')
            // core.startFaceRecognize(5);
          }

          //操作指令，比如放大缩小等命令
          // core.operateEvent.connect(function (action) {
          //   console.log('指令接口')
          //   // console.log(arguments)
          //   robot.displayOperate(action)
          // });


          //冒充语音识别的结果发送文字
          // core.debuggText('你好')

          //立即打断机器人说话
          // core.cancelPendingTts()

          //开始一次语音识别
          // core.startVoiceRecognize()


          //开始语音合成
          // core.startTts()

        });
      };
    },
    beforeDestroy() {
      // this.core.stopVoiceRecognize();
      socket.close();
    },
    watch: {
      hotListItem: function (val) {
        this.getSwiper()
      }
    },
    computed: {
      todayDate: function () {
        var today = new Date()
        var month = today.getMonth() + 1 + '月';
        var date = today.getDate() + '日';
        return month + date
      }
    },
    destroyed: function () {
      if (timerHot) {
        clearInterval(timerHot);
      }
      if (loopTimer) {
        clearInterval(loopTimer);
      }
    }
  }
</script>

<style scoped>
  @import '../../node_modules/swiper/dist/css/swiper.min.css';
  @import '../../static/css/style.css';

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
</style>

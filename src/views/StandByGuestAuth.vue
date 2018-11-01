<template>
  <div v-on:click="startTimer">
    <div class="main ybg">
      <div class="zxw" v-on:click.stop="redirectMainPage"><img src="static/images/zixu.png"></div>
      <authByCard v-if="showFlag==1" v-on:toQrCodePage="toQrCodePage" v-on:authSuccess="authSuccess" v-on:authFailed="authFailed"></authByCard>
      <authByQrCode v-if="showFlag==2" v-on:toCardPage="toCardPage"></authByQrCode>
      <authResult v-if="showFlag==3" v-bind:person="result.person" v-bind:status="result.status" v-on:reAuth="reAuth"></authResult>
    </div>
  </div>
</template>

<script>
  let timer;
  let socket;
  let asrFlag;
  import authByCard from '@/components/sbt/auth/authByCard'
  import authByQrCode from '@/components/sbt/auth/authByQrCode'
  import authResult from '@/components/sbt/auth/authResult'
  export default {
    name: '',
    components: { authByCard, authByQrCode, authResult },
    data () {
      return {
        result:{person:'屈先生', status:1},
        showFlag:1,
      }
    },
    methods: {
      toQrCodePage: function () {
        this.showFlag = 2;
      },
      toCardPage: function () {
        this.showFlag = 1;
      },
      reAuth: function () {
        this.showFlag = 1;
      },
      authSuccess:function(mes){
        this.showFlag = 3;
        this.result.status = 1;
        this.result.person = mes.name;
      },
      authFailed:function(){
        this.showFlag = 3;
        this.result.status = 0;
      },
      redirectMainPage:function(){
        console.log("StandByGuestAuth_redirectMainPage="+this.$root.from+"=============="+this.$root.from);
        this.$router.push({path:'/threeDIndex', query:{device:this.$root.device, from:this.$root.from}});
      },
      startTimer:function(){
        console.log("StandByGuestAuth_startTimer");
        if(this.$root.inSwiper == false){
          let self = this;
          if(timer){
            clearTimeout(timer);
          }
          timer=setTimeout(function () {
            console.log("StandByGuestAuth_from="+self.$root.from+"============"+self.$root.device);
            //30秒无人交互路由到待机页
            self.$router.push({path:'/StandBy',query:{device:self.$root.device, from:self.$root.from}});
          },30000);
        }else if(this.$root.inSwiper == true){
          if(this.$parent.startTimer != undefined){
            this.$parent.startTimer();
          }
        }
      },
    },
    mounted: function (){
      console.log("StandByGuestAuth_mounted");
      let self = this;
      this.startTimer();
      //路由出去的时候也要清除30秒无人交互检测

      // ibotEx联调
      let baseUrl = "ws://192.168.160.23:11013";
      console.log("StandByGuestAuth beggin socket");
      socket = new WebSocket(baseUrl);

      socket.onopen = function () {
        new QWebChannel(socket, function (channel) {
          console.log("StandByGuestAuth 连接成功！");
          let core = channel.objects.core;
          self.core = core;
          asrFlag = setInterval(function face_asr() {
            core.startFaceRecognize(1);
          }, 500);

          //已经收到人脸识别的结果
          core.faceRecognizeResultEvent.connect(showFaceRecognizeResultEvent);

          function showFaceRecognizeResultEvent(message) {
            console.log("asrMsg: " + message);
          }

          //开始检测人脸
          let faceDtl;
          core.faceDetectEvent.connect(showFaceDetectEvent);
          function showFaceDetectEvent(faceAppearred, faceDetails) {
            console.log("authByCard_showFaceDetectEvent");
            if (faceAppearred) //出现人脸。
            {
              console.log("出现。 face details: " + faceDetails);
              faceDtl = JSON.parse(faceDetails);
              if (faceDtl) {
                console.log("INDEX迎宾距离——————" + faceDtl.staring.distance_mm);
                if(faceDtl.staring.distance_mm<1700)
                {
                  //有人脸出现
                  console.log("有人，不能跳转");
                  self.startTimer();
                }
              }
            }
          };
        });
      };
    },
    //当组件销毁的时候也需要清除timer和socket
    destroyed:function () {
      console.log('StandByGuestAuth_destoryed');
      if(timer){
        console.log('StandByGuestAuth_timer_close');
        clearTimeout(timer);
      };
      if(socket){
        console.log('StandByGuestAuth_socket_close');
        socket.close();
      };
      if(asrFlag){
        clearInterval(asrFlag);
        console.log('StandByGuestAuth_asrFlag_close');
      };
    }
  }
</script>

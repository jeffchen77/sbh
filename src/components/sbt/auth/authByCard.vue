<template>
  <!--<div class="kapn">
    <div class="kati">嘉宾认证</div>
    <div class="kati" style="font-size:20px;padding:0px;">{{scanMsg}}</div>
    <div class="usr">
      &lt;!&ndash;<div class="urimg"></div>&ndash;&gt;
      <div class="urimg">
        <video id="video" width="698px" height="400px" style="margin-top: 34px;" v-show="isVideo==1" autoplay></video>
        <canvas id="canvas" width="698px" height="400px" style="margin-top: 34px;" v-show="isVideo==0"></canvas>
        <div style="color:#00fcff;padding-top:216px;font-size: 26px;" v-show="isVideo==3">未检测到嘉宾证，请点击下面按钮重新验证</div>
      </div>
      <div class="urtxt">请调整位置将注册二维码或嘉宾卡规整的放置在扫描框中</div>
    </div>
    <div class="scan"><span style="margin:10px;" v-on:click="qrScan">二维码扫描</span><span style="margin:10px;" v-on:click="guestCardScan">嘉宾证扫描</span></div>
    <div class="tgvx" v-on:click="toQrCodePage">通过参会码认证</div>
  </div>-->
  <div class="kapn">
    <div class="kati">嘉宾认证</div>
    <div class="usr">
      <div class="urimg">
        <video id="video" class="videoCss" autoplay v-show="isVideo==1" ></video>
        <!--<canvas id="canvas" v-show="false" width="465px" height="310px"></canvas>-->
        <canvas id="canvas" class="videoCss" v-show="isVideo==0"></canvas>
        <span><i class="scanLine" style="top: 10px;"></i></span>
      </div>
      <div class="urtxt">请调整位置将注册二维码或嘉宾卡规整的放置在扫描框中</div>
    </div>
    <div class="tgvx" v-on:click="toQrCodePage">使用参会码认证</div>
  </div>
</template>
<script>
var qrScanTimer;
  export default {
  name: '',
  data () {
    return {
        isVideo: 1,
        scanMsg: '开始二维码扫描',
        accessToken: '24.73c5741380bd31cfa59810d33ff2b1ab.2592000.1525930296.282335-11071745',
        //baiduUrl:'https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=',
        callMediaSuccess:false,
        loopCount:0,
        scanFlag:0,//0代表二维码扫描，1代表嘉宾卡扫描
    }
  },
  methods: {
    toQrCodePage: function () {
      this.$emit('toQrCodePage');
    },
    getUserMedia: function(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints,success, error)
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    },

    success: function(stream){
      //调用媒体成功
      this.callMediaSucess = true;
      let video = document.getElementById('video');
      video.srcObject = stream;
      this.qrScan();
      console.log(`访问用户媒体设备成功`);
    },

    error: function(error){
      //调用媒体失败
      this.callMediaSucess = false;
      this.scanMsg = '访问摄像头失败';
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    },

    qrScan: function(){
      if(this.callMediaSucess){
        this.isVideo = 1;
        this.scanFlag=0;
        this.stopQrScanTimer();
        this.scanMsg = '开始二维码扫描';
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');

        qrScanTimer = setInterval(function() {
          var self = this;
          //context.drawImage(video, 85, 85, 465, 310,0,0,465,310);//剪切中间那块儿二维码
          canvas.width = 400*(video.videoWidth/video.videoHeight);
          canvas.height = 400;
          context.drawImage(video, 0, 0, 400*(video.videoWidth/video.videoHeight), 400);
          var imgData = canvas.toDataURL("image/jpg");
          qrcode.decode(imgData);
          qrcode.callback=function (imgMsg) {
            console.log(imgMsg);
            if(imgMsg.indexOf('error decoding QR Code')!=-1){
              console.log("未解析到二维码");
            }else{
              console.log("解析到二维码:"+imgMsg);
              self.isVideo = 0;
              self.stopQrScanTimer();
              //调用后台接口进行验证
              self.startQrBackendAuth(imgMsg);
            }
          };
        }.bind(this), 2000);
      }
    },

    stopQrScanTimer:function(){
      console.log("停止二维码扫描");
      clearInterval(qrScanTimer);
    },

    startQrBackendAuth:function(authCode){
      this.$api.get('guests/auth?authCode='+authCode, r => {
        if(this.scanFlag == 0){
          if(r.authed == 1){
            //认证通过
            console.log("认证通过:"+r.name);
            this.$emit('authSuccess', {name: r.name});
          }else{
            //认证未通过
            console.log("认证未通过");
            this.$emit('authFailed');
          }
        }
      });
    },

    guestCardScan:function(){
      if(this.callMediaSucess){
        this.loopCount = 0;
        this.scanMsg = '开始嘉宾证扫描';
        this.isVideo = 1;
        this.scanFlag = 1;
        this.stopQrScanTimer();
        setTimeout(this.cardScanCallBack, 3000);
      }
    },

    cardScanCallBack:function(){
      let video = document.getElementById('video');
      let canvas = document.getElementById('canvas');
      let context = canvas.getContext('2d');
      context.drawImage(video, 85, 85, 465, 310,0,0,465,310);
      var imgData = canvas.toDataURL("image/jpg");
      var base64Data = imgData.split(",")[1];
      //调用百度API去验证嘉宾卡
      this.callBaiduApi(base64Data);
    },

    callBaiduApi:function(imgData){
      this.$api.callBaiduApi(this.accessToken, imgData , r => {
        this.loopCount++;
        if(this.scanFlag == 1){
          if(this.loopCount <= 5){
            console.log(r);
            setTimeout(this.cardScanCallBack, 1000);
          }else{
            this.isVideo = 3;
          }
        }
      }, e=>{
        this.loopCount++;
        if(this.scanFlag == 1){
          if(this.loopCount <= 5){
            console.log(e);
            setTimeout(this.cardScanCallBack, 1000);
          }else{
            this.isVideo = 3;
          }
        }
      });
    },
  },
  mounted: function () {
    let self = this;
    if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      //调用用户媒体设备, 访问摄像头
      this.getUserMedia({'audio':false, 'video':{ 'facingMode': "user" }}, this.success, this.error);
    } else {
      console.log(`不支持访问用户媒体`);
    };
  },
  computed: {
  },
  destroyed: function () {
    console.log('authByCard_destoryed');
    this.stopQrScanTimer();
  }
}
</script>
<style scoped>
.videoCss{
  height: 400px;
  position: absolute;
  top: 33px;
  left: 82px;
}
.scanLine{
-webkit-animation: line 2s infinite;
animation: line 2s infinite;
}
@keyframes line {
/*  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(235px);
  }
  100% {
    transform: translateY(-10px);
  }*/
  0% {
    transform: translateY(-10px);
  }
/*  50% {
    transform: translateY(116px);
  }*/
  100% {
    transform: translateY(235px);
  }
}
@-webkit-keyframes line{
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(235px);
  }
/*  100% {
    transform: translateY(-10px);
  }*/
}
</style>

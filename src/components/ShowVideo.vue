<template>
  <div class="container">
    <em class="close" v-on:click="closeModal()"></em>
    <em class="vbtm"></em>
    <div class="aligncenter">
      <video id="video" class="video-js vjs-default-skin vjs-big-play-centered" @click="playPause('screen')"
                       preload="auto" style="width: 914px; height: 460px;background-color: #2f4b56" data-setup="{}">
      <source :src="viedourl" type="video/mp4">
    </video>
      <div class="video-button play-button video-button-display">
        <img @click="playPause('playbutton')" src="../../static/images/play.png"/>
      </div>
      <div class="video-button replay-button video-button-display">
        <img @click="playPause(s)" src="../../static/images/replay.png"/>
      </div>


      <!--<video id="video" class="videoArea" :src="vUrl"-->
      <!--style="width: 914px; height: 460px;background-color: #2f4b56">-->
      <!--your browser does not support the video tag-->
      <!--<div class="stop"></div>-->
      <!--</video>-->
      <!--<img class="vRestart" v-show="vRePlay" src="../../static/images/conbo.png" @click="rePlay"/>-->
    </div>
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player';
  import "../../static/css/custom-theme.css";

  export default {
    data() {
      return {
        //记录视频是否显示重新播放按钮
        vRePlay: false
      }
    },
    props: {

      viedourl: {
        type: String,
        required: false
      },
      remark: {
        type: String,
        required: false
      },
    },
    components: {
      videoPlayer
    },
    methods: {
      reStart() {
        let video = document.getElementById('video');
        // if(e.toElement.className==='vRestart'){
        //   this.vRePlay=false;
        //   video.currentTime=0;
        //   video.play();
        // }
      },
      closeModal() {
        let video = document.getElementById('video');
        video.pause();
        return this.$emit('fireclose');
      },
      playPause(s) {
        var myVideo = document.getElementById('video');
        if (myVideo.paused || 'playbutton' == s) {
          myVideo.play();
          $('.play-button').addClass('video-button-display');
          $('.replay-button').addClass('video-button-display')
        } else {
          myVideo.pause();
          $('.play-button').removeClass('video-button-display')
        }
      }
    },
    mounted() {
      let video = document.getElementById('video');
      let self = this;
      video.addEventListener('loadedmetadata', function () {
        // video.currentTime=video.duration-5;
        video.currentTime = 0;
        setTimeout("video.play()", 12000);
      });
      video.addEventListener('timeupdate', function () {
        let currentPos = video.currentTime;//获取当前播放的位置
        if (currentPos === video.duration) {
          self.vRePlay = true;
        }
      });
      video.addEventListener("ended", function () {
        $('.replay-button').removeClass('video-button-display')
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped type="text/css">
  @import "../../static/video5.18.4.js/css/video-js.css";

  .aligncenter .video-button {
    position: relative;
    float: left;
  }

  .video-button-display {
    display: none;
  }

  .aligncenter .video-button img {
    position: absolute;
    z-index: 99;
    top: -270px;
    left: 417px;
    width: 80px;
    height: 80px;
  }

  .aligncenter {
    /*clear: both;*/
    /*display: block;*/
    /*margin: auto;*/
    /*padding-right: 30px;*/
    padding: 11px 31px 51px 31px;

    /*width: 60%;*/
    /*height: 100%;*/
    /*width: 100%;*/
    width: 976px;
    height: 521px;

  }

  .aligncenter video {
    width: 100%;
    height: 100%;
    border-radius: 23px;
    object-fit: cover;
  }

  .aligncenter .vRestart {
    position: absolute;
    width: 108px;
    height: 108px;
    z-index: 99;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .stop {
    background: url(../../static/images/conbo.png) no-repeat;
    width: 108px;
    height: 108px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -54px 0 0 -54px;
    z-index: 10
  }
</style>

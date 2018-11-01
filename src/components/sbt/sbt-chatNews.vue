<template>
  <div class="zmbg">
    <div class="zmco">
      <div class="zcobg"></div>
      <div class="closet" v-on:click="closeChatNewContentBox()"><img src="static/images/dpxq1.png" ></div>
      <div class="dpcontent dpcontent2">
        <p class="bozxi">
          <span>小博聊资讯</span>
        </p>
        <div class="nito">
          <div class="nta"></div>
          <div class="ntb"></div>
          <div class="ntc clearfix">
            <div class="next" @click="nextQuestion()"><img src="static/images/next.png"  width="202" height="76"></div>

            <div class="seb fl" v-for="(clickQuestion,index) in detailAnswer.clickList"  :key="index">
              <div class="s1"></div>
              <div class="s3"></div>
              <div class="s2" @click="addQuestion(clickQuestion.question,clickQuestion.image)">{{ clickQuestion.question }}
                <img v-bind:src="clickQuestion.image" width="40"  height="40" v-if="clickQuestion.image !=''">

              </div>
            </div>
          </div>
        </div>
        <div id="chatMessags" style="overflow-x: hidden;
    overflow-y: scroll; height: 1250px;">




        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player';
  export default {
    name: "sbt-chatNews",
    components: {videoPlayer},
    data() {
      return {
        detailAnswer:{
        },
        firstTime : true,
        pageNum : 0
      }

    },
    props:{
      question: {
        type: String,
        required: false
      },
      thisPageNum: {
        type: Number ,
        required: false
      },

    },methods: {
      addQuestion(question,image){

        if(image){
          $('#chatMessags').prepend(`
                       <div class="clearfix mt40">
        <div class="seb fr">
          <div class="s1"></div>
          <div class="s3"></div>
          <div class="s2">${question}<img src="${image}" width="40"  height="40" ></div>
        </div>

      </div>`);
        }else{
          $('#chatMessags').prepend(`
                       <div class="clearfix mt40">
        <div class="seb fr">
          <div class="s1"></div>
          <div class="s3"></div>
          <div class="s2">${question}</div>
        </div>

      </div>`);
        }

        var p = $('#chatMessags').get(0);
        // document.getElementById('chatMessags');
        p.scrollTop = 0;
        setTimeout(function () {
            $('#chatMessags').prepend(`
                       <div class="obox mt40" name="isEntering">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p>小博正在输入</p>
        </div>
      </div>`);},100);

        let self = this
        setTimeout(function () {
          self.$api.ask(question, r => {
            self.detailAnswer = r
            //$('#chatMessags').empty();
            //$('#chatMessags').empty();
            $("div[name='isEntering'").hide();
            if(r.image) {
              $('#chatMessags').prepend(`
                       <div class="mt40"><img src="${r.image}" width="490"  height="270"></div>`)
            }
            if(r.video) {
              $('#chatMessags').prepend(`
                       <div class="mt40"><div class="aligncenter">
       <video  class="video-js" controls preload="auto" style="width: 914px; height: 460px;background-color: #2f4b56"  data-setup="{}">
                        <source src="${r.video}" >
                    </video>
    </div></div>`)
            }
            if(r.content) {
              $('#chatMessags').prepend(`
                       <div class="obox mt40">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p>${r.content}</p>
        </div>
      </div>`)
            }
            var p = $('#chatMessags').get(0);
            p.scrollTop = 0;
          })
        },500);






      },
      play() {
        let video = document.getElementById('video');
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
      },

      onPlayerPlay(player) {
        // alert("play");
      },
      onPlayerPause(player) {
        // alert("pause");
      },
      CallPause() {
        // this.$refs.videoPlayer.player.pause()
        let vChild = document.getElementById('video');
        vChild.pause();
      },
      CallReload(url) {
        // this.$refs.videoPlayer.player.src(url)
        // this.$refs.videoPlayer.player.load()
        // this.$refs.videoPlayer.player.play()
        let vChild = document.getElementById('video');
        vChild.src = url;
        vChild.load();
        vChild.play();
      },
      closeChatNewContentBox: function () {
        let self = this
        self.pageNum = 0;
        self.$emit('fireClose')
      },
      nextQuestion : function () {
        let self = this
        if(self.firstTime) {
          self.pageNum = self.pageNum + 1;
        }
        debugger
        this.$api.get('hotmessage/getMessage?pageNumber='+self.pageNum, r => {
          console.log(r);
          if(r.code==200) {
            this.$api.ask(r.data.knowledge, n => {
              this.detailAnswer = n
              $('#chatMessags').empty();
              if(n.image) {
                $('#chatMessags').prepend(`
                       <div class="mt40"><img src="${n.image}" width="490"  height="270"></div>`)
              }
              if(n.video) {
                $('#chatMessags').prepend(`
                       <div class="mt40"><div class="aligncenter">
            <video  class="video-js" controls preload="auto" style="width: 914px; height: 460px;background-color: #2f4b56"  data-setup="{}">
                        <source src="${n.video}" >
                    </video>

            </div></div>`)
              }

              if(n.content) {
                $('#chatMessags').prepend(`
          <div class="obox mt40">
          <div class="obti"></div>
          <div class="obzi"></div>
          <div class="obbg"></div>
          <div class="obbi"></div>
          <div class="obci">
          <p>${n.content}</p>
          </div>
          </div>`)
              }
              var p = $('#chatMessags').get(0);
              // document.getElementById('chatMessags');
              p.scrollTop = 0;
            })
          }else{
            debugger
            self.pageNum = -1;
            self.nextQuestion();
          }

        })

      }

    },
    mounted() {
      let self = this
      console.log("self.question"+self.question)
      self.$api.ask(self.question, r => {
        self.detailAnswer = r

        if(r.image) {
          $('#chatMessags').prepend(`
                       <div class="mt40"><img src="${r.image}" width="490"  height="270"></div>`)
        }
        if(r.video) {
          $('#chatMessags').prepend(`
                       <div class="mt40"><div class="aligncenter">
      <!--<video-player class="video-player vjs-custom-skin "-->
            <!--ref="videoPlayer"-->
            <!--:playsinline="true"-->
            <!--:options="playerOptions"-->
            <!--@play="onPlayerPlay($event)"-->
            <!--@pause="onPlayerPause($event)"-->
            <!-- 1
      果t
      况下&gt;-->
            <!--</video-player>-->
            <video  class="video-js" controls preload="auto" style="width: 914px; height: 460px;background-color: #2f4b56"  data-setup="{}">
                        <source src="${r.video}" >
                    </video>

            </div></div>`)
          }
      // <video id="video" src="${r.video}"
      //   style="width: 914px; height: 460px;background-color: #2f4b56" onclick="play()" >
      //     your browser does not support the video tag
      //   </video>
          if(r.content) {
            $('#chatMessags').prepend(`
          <div class="obox mt40">
          <div class="obti"></div>
          <div class="obzi"></div>
          <div class="obbg"></div>
          <div class="obbi"></div>
          <div class="obci">
          <p>${r.content}</p>
          </div>
          </div>`)
          }
        var p = $('#chatMessags').get(0);
        // document.getElementById('chatMessags');
        p.scrollTop = 0;
      })
    },
  }
</script>

<style scoped>
  @import "../../../static/video5.18.4.js/css/video-js.css";
  #chatMessags::-webkit-scrollbar {
    display: none;
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
  }

  .vjs-custom-skin > .video-js {
    width: 100%;
    border-radius: 23px;
  }

  .video-js .vjs-big-play-button {
    /*
     播放按钮换成圆形
    */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
  }
  .closet {
    z-index: 10;
  }
</style>

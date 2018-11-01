<template>
  <div class="mapri" id="index_chat" style="z-index: 999;" v-on:click="closeSearch">
    <div id="chat-content" style="height: 1556px; overflow-y: scroll;">
    <div class="mpht" @click="switchSpeakState"><img src="static/images/huatong.png"></div>
    <div class="yuying"  v-if="waitingSpeak == false">
      <p>{{speakContent}}</p>
      <voice></voice>
    </div>

    <div v-for="(subItem,index) in chatListData"  :key="index">
      <div class="mt40" v-if="subItem.flowType == 'left'">


        <div class="obox">
          <div class="poper"><img src="static/images/peoplemin.png"></div>
          <div class="obti"></div>
          <div class="obzi"></div>
          <div class="obbg"></div>
          <div class="obbi"></div>
          <div class="obci">
            <p class="cora mt15">{{subItem.content}}</p>
            <p class="wzbk mt20" v-for="(enterprise,index) in subItem.similarEnterpriseList" :key="index" v-on:click="showDetail($event, enterprise.fmapId, enterprise.type, enterprise.fname, enterprise.location, enterprise.floor )">{{enterprise.fname}}</p>
          </div>
        </div>
      </div>

      <div class="mt40" v-if="subItem.flowType == 'right'">
        <div class="mebox">
          <div class="meti"></div>
          <div class="mebi"></div>
          <div class="meri"></div>
          <div class="meci">{{subItem.content}}</div>
        </div>
      </div>
    </div>
    <div class="mt40" id="maptalk" style="overflow-x: hidden;overflow-y: scroll;height: 1300px;">
      <div class="obox">
        <div class="poper"><img src="static/images/peoplemin.png"></div>
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <!--<p class="ining">正在输入...</p>-->
          <p class="cora mt15">先生您好，请问需要什么 帮忙，我能为您查找展台 位置和为您提供咨询服务 ，您可以这样问我：</p>
          <p class="wzbk mt20">引导问</p>
          <p class="wzbk mt20">2号展馆怎么去？</p>
          <p class="wzbk mt20">腾讯展台在哪？</p>
          <p class="wzbk mt20">有没有百度？</p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import {wsServer, device, fmap, deviceConfig} from '../../utils/constant'
  import voice from '@/components/voice'
    export default {
      name: "sbt_map_chat",
      components: {
        voice
      },
      data () {
        return {
          waitingSpeak: true,
          chatListData : [{type:'right', content:'你好'}],
          speakContent:'正在倾听您说话...',
          core: null,
          fmapId: fmap.fmapId,
          floor: device.posi.groupID,
          start: device.posi,
          wsServer: deviceConfig.getConfig(this.$root.device).wsServer
        }
      },
      methods:{
        switchSpeakState(e) {
          var self = this;
          debugger;
          e.stopPropagation()
          this.waitingSpeak = !this.waitingSpeak
          // 控制麦克风
          if (this.core) {
            this.core.startVoiceRecognize()
          }
        },
        ask(question){
          var self = this;
          self.$api.mapAsk(question, function(data){
            if(!!data){
              data.flowType = 'left';
              self.chatListData.unshift(data);
              var floor = 1;
              if(!!data.floor){
                floor = data.floor;
              }
              var location;
              if(!!data.location){
                location = data.location.split(",");
              }
              if(data.type == '3'){ // 返回的为会议厅信息
                self.$parent.changeType('1', false);
                self.$parent.clearDialog();
                self.$parent.getMeetingByName(data.fname, function(data){
                  self.$parent.normalDialog(data.fname, location[0], location[1], floor, data);
                  self.$parent.navigate(self.start.x, self.start.y, self.floor,location[0], location[1], floor);
                });

              }else if(data.type == '4'){
                self.$parent.changeType('2', false);
                self.$parent.clearDialog();
                self.$parent.getMeetingByName(data.fname, function(data){
                  self.$parent.dialog(null, data);
                  self.$parent.showAllTopic = false;
                  self.$parent.navigate(self.start.x, self.start.y, self.floor,data.x, data.y, data.floor);
                });

              }
            }
          })
        },
        closeSearch: function(){
          var self = this;
          self.$parent.openChat();
        },
        showDetail: function(event, fmapId, type, name, location, floor){
          event.preventDefault();
          event.stopPropagation();
        }
      },
      mounted(){
        var self = this;
        debugger;
        let baseUrl = self.wsServer;
        let socket = new WebSocket(baseUrl);
        this.$router.afterEach(function () {
          socket.close();
          console.log("close socket");
        });
        socket.onopen = function () {
          new QWebChannel(socket, function (channel) {

            console.log("连接成功！");
            let core = channel.objects.core;
            self.core = core;
            console.log(self.core);

            // 机器人状态提示
            core.statusChangeEvent.connect(function (status) {
              //0:正在等待用户说话,正在录音识别用户的语音,但尚未听到用户真正发声;
              //1:正在思考,已经识别完了用户说完的整句话;
              //2:正在回答,机器人在说话;
              //3:正在倾听,已经听到用户在说话了,但还没有说完整句话。
              console.log('状态接口:' + status);
              // robot.displayStatus(status);

              //话筒收音模式停止收音动画
              if (status === 1) {
                self.waitingSpeak = true;
              }
            });

            // 收到语音识别结果
            core.voiceRecognizedEvent.connect((text, flag) => {
              console.log(text, flag);
              //self.hideModal();
              if (flag) {
                self.core.stopVoiceRecognize()
                socket.onclose = function () {
                  console.log("web channel closed");
                };
                socket.onerror = function (error) {
                  console.log("web channel error: " + error);
                };

                // debugger
                self.chatListData.unshift({"flowType":"right","content":text})
                var p = document.getElementById('index_chat')
                p.scrollTop = 0
                //参数question:text,content:'',userId:'',platform:'',sessionId:''
                self.ask(text);
                // self.core.stopVoiceRecognize();
                // core.startVoiceRecognize()
              }else{
                self.speakContent = '正在倾听您说话...';
              }

              // //目前讯飞的接口返回的flag一直是false,所以手动请求语义
              // robot.displayClient(text)
              // core.requestSemanticAnswer(text, '', '', '', '')
            });

            function stopWatch() {
            }
          });
        };
      }
    }
</script>

<style scoped>
  .mt40::-webkit-scrollbar {
    display: none;
  }

  #chat-content::-webkit-scrollbar {
    display: none;
  }
  .obox {
    margin-top: 30px;
  }
</style>

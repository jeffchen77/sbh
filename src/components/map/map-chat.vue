<template>
  <div style="width: 100%;height: 100%" class="chat-container">

    <input type="text" value="我要看2号馆地图" id="text"/>
    <button @click="submit">提交</button>


    <transition-group name="list-complete" tag="div" class="chat-area">
      <div v-for="msg in messages" class="msg list-complete-item "
           v-bind:class="{ 'msg-left':msg.type==='left','msg-right':msg.type==='right' }"
           v-bind:key="msg.index">

        <img v-bind:src="msg.url" v-if="msg.type==='left'">

        <div class="text animated fadeInUp">{{msg.text}}</div>
        <img v-bind:src="rightIcon" v-if="msg.type==='right'">
      </div>
    </transition-group>


    <div class="mrti">
      <div class="mtti"><span><i class="mtlp"></i><i class="mtrp"></i>您可以这样问我</span></div>
      <div class="mcci">
        <span>“宴会厅在哪里”</span>
        <span>“咖啡厅怎么去”</span>
        <span>“最近的卫生间在哪里”</span>
      </div>
    </div>


    <transition class="fadeIn animated">

      <div class="navi-desc" v-if="showNaviInfo">
        <div>距终点：{{naviInfo.dist}}米</div>
        <div>大约需要：{{naviInfo.time}}</div>
        <div>线路提示：{{naviInfo.currentRoute}}</div>
      </div>

    </transition>

  </div>
</template>

<script>
  import QWebChannel from '../../../static/js/qwebchannel'
  import {wsServer, device, meetingPlaces, pavilionPlaces} from "../../assets/common/constant";
  import {AskMap, getActivityVendor, getMeeting} from "../../assets/common/api";

  export default {
    name: "map-chat",
    props: {
      userIcon: {
        type: String
      }
    },
    data() {
      return {
        rightIcon: 'static/index/images/user.jpeg',
        messages: [
          {
            index: new Date().getTime(),
            type: 'left',
            url: '/static/robot/robot.png',
            text: '您当前的位置在会议厅入口一楼.'
          }],
        socket: null,
        core: null,
        lastVoiceStr: '',
        //地图导航的组件，可以在这个地方调用组件的方法
        mapComponent: null,
        naviInfo: {
          dist: 20,
          time: '20分10秒',
          currentRoute: '50米左转20面直行'
        },
        showNaviInfo: false
      }
    },
    methods: {
      pushMsg(text, type = 'left', isRead = true) {
        this.showNaviInfo = false;
        let msg = {
          index: new Date().getTime() + Math.random(),
          type: type,
          url: '/static/robot/robot.png',
          text: text
        };

        if (this.messages.length >= 2) {
          this.messages.shift();
        }
        this.messages.push(msg);
        setTimeout(() => {
          $('.chat-area').scrollTop(400);
        }, 500);

        if (isRead && type === 'left') {
          if (this.core) {
            this.core.cancelPendingTts();
            this.core.startTts(text, '')
          }
        }
      },
      showVoiceText(txt, flag) {
        $('#text').val(txt);
        if (txt !== "") {
          if (this.lastVoiceStr !== txt) {
            this.lastVoiceStr = txt;
            this.chat(txt)
          }
        }
        if (flag) {
        }
        console.log(txt, flag)
      },
      chat: function (txt) {
        let self = this;
        AskMap(txt, self.mapComponent.map.focusGroupID, (res) => {

          console.log(JSON.stringify(res));
          if (res.type === '-1') {
            return
          }

          let mapType = device.posiType, curMap = self.mapComponent.mapParam.type;

          //室外导航
          if (res.type === 'baidu') {
            if (res.name === '国际会议中心' && mapType === 'meeting') {
              self.pushMsg('您现在就在国际生态会议中心。');
            } else if (res.name === '国际会议展览中心' && mapType === 'pavilion') {
              self.pushMsg('您现在就在国际生态会议展览中心。');
            } else {
              this.$router.push({name: 'index', params: {keyword: res.name}});
            }

          } else if (res.type === 'meeting') {
            //会议和活动
            if (self.mapComponent.mapParam.type === 'meeting') {
              getMeeting(res.name, (res) => {
                self.mapComponent.showMeeting(res);
              });
            } else {
              getActivityVendor(res.name,(res)=>{
                self.mapComponent.showActivity(res);
              })
            }
          } else if (res.type === 'detail') {
            //当前位置在会议中心
            if (mapType === 'meeting') {
              //如果当前地图是会议中心
              if (curMap === 'meeting') {
                //如果地点在当前地图上面,标注信息
                if (meetingPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(res.content);
                  let node = self.mapComponent.handleName(res.name, 'get');
                  self.mapComponent.showWindow(node);
                } else if (pavilionPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(`${res.name}在国际会议展览中心${res.no}号馆，需要为你导航吗？`);

                  self.nextTask = function () {
                    self.exitMap('navi', `国际会议展览中心${res.no}号馆`)
                  }
                }
              } else if (curMap === 'pavilion') {//如果当前地图是展馆
                if (pavilionPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(`${res.name}在国际会议展览中心${res.no}号馆，需要为你导航吗？`);
                  let node = self.mapComponent.handleName(res.name, 'get');
                  self.mapComponent.showWindow(node);
                  self.nextTask = function () {
                    self.exitMap('navi', `国际会议展览中心${res.no}号馆`)
                  }
                } else if (meetingPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(`${res.name}在国际生态会议中心${res.no}楼，您当前位置就是国际生态会议中心，需要为您切换地图吗？`);
                  self.nextTask = function () {
                    self.mapComponent.changeMap('meeting',res.no)
                  }
                }
              }
            } else if (mapType === 'pavilion') {
              //如果当前地图是会议中心
              if (curMap === 'meeting') {
                //如果地点在当前地图上面,标注信息
                if (meetingPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(`${res.name}在国际生态会议中心${res.no}楼，需要为你导航吗？`);
                  let node = self.mapComponent.handleName(res.name, 'get');
                  self.mapComponent.showWindow(node);
                  self.nextTask = function () {
                    self.exitMap('navi', '国际生态会议中心')
                  }
                } else if (pavilionPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(`${res.name }在国际会议展览中心${res.no}号馆，您当前位置就是国际生态会议中心，需要为您切换地图吗？`);
                  self.nextTask = function () {
                    self.mapComponent.changeMap('pavilion',res.no)
                  }
                }
              } else if (curMap === 'pavilion') {//如果当前地图是展馆
                if (pavilionPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(res.content);
                  let node = self.mapComponent.handleName(res.name, 'get');
                  self.mapComponent.showWindow(node);
                } else if (meetingPlaces.indexOf(res.name) >= 0) {
                  self.pushMsg(`${res.name}在国际生态会议中心${res.no}楼，需要为你导航吗？`);
                  self.nextTask = function () {
                    self.exitMap('navi', '国际生态会议中心')
                  }
                }
              }
            }
          } else if (res.type === 'navi') {

            if (res.name) {
              self.pushMsg(`已为您标注出${res.name}的位置，正在为您规划路线。`);
              self.mapComponent.handleName(res.name, 'showWindow');

              let timer = setTimeout(() => {
                clearInterval(timer);
                self.mapComponent.handleName(res.name, 'navi');
                self.nextTask();
              }, 6000);
            }
          } else if (res.type === 'changgemap') {
            self.pushMsg('已为您切换地图');
            self.mapComponent.changeMap(res.param.map, res.param.no);
          } else if (res.type === 'closemap') {
            this.$router.push('/');
          } else if (res.type === 'Yes') {
            if (typeof self.nextTask === 'function') {
              self.nextTask();
              // self.nextTask = null;
            }
          } else {
            self.exitMap('question', res.question);
          }

        }, txt)
      },
      exitMap(type, name) {
        if (type === 'question') {
          this.$router.push({name: 'index', params: {question: name}});
        } else if (type === 'navi') {
          this.$router.push({name: 'index', params: {keyword: name}});
        } else {
          this.$router.push({name: 'index'});
        }
      },
      submit() {
        this.chat($('#text').val())
      }
    },
    mounted() {
      this.mapComponent = this.$parent.$refs.map;

      if (this.userIcon) {
        this.rightIcon = this.userIcon
      }

      let self = this;


      let socket = new WebSocket(wsServer);
      self.socket = socket;
      socket.onclose = function () {
        console.log("close");
      };
      socket.onerror = function (error) {
        console.log("web channel error: " + error);
      };
      socket.onopen = function () {
        new QWebChannel(socket, function (channel) {
          let core = channel.objects.core;
          self.core = core;
          console.log('socket connect success');

          core.voiceRecognizedEvent.connect(self.showVoiceText);

          core.startVoiceRecognize();

          //显示三维人像显示
          core.setAvatarVisible(false);

          core.cancelPendingTts();
          if (self.$route.params.name) {
            self.mapComponent.changeCallback = () => {
              self.chat(self.$route.params.name)
            };
          }
        });
      };
    }
    ,
    beforeDestroy() {
      if(this.core){
        this.core.stopVoiceRecognize();
      }
      this.socket.close();
    }
  }
</script>

<style scoped>
  .chat-container {
    width: 1080px;
    height: 500px;
    padding-top: 20px;
    /*background-color: black;*/
    /*opacity: 0.8;*/

    /*background-color: red;*/
  }

  .control-bar {
    /*background-color: #a6e1ec;*/
    position: absolute;
    top: 730px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
  }

  .el-switch {
    padding: 20px;
  }

  .msg {
    display: flex;
    position: relative;
    margin-top: 20px;
    color: white;
    font-size: 25px;

    /*padding: 0 20px;*/
  }

  .msg-left {
    /*justify-content: left;*/
    align-items: flex-start;
  }

  .msg-right {
    justify-content: flex-end;
    align-items: right;
  }

  .msg img {
    width: 60px;
    height: 60px;
    border-radius: 50%;

  }

  .msg-right .text {
    margin-right: 20px;
  }

  .msg-left .text {
    margin-left: 20px;
  }

  .msg .text {
    /*margin-top: 20px;*/
    padding: 20px;
    border-radius: 10px;
    border: 1px solid deepskyblue;
    box-shadow: 0 0 10px deepskyblue;
    position: relative;
    max-width: 880px;
    /*color: deepskyblue;*/
  }

  .msg.msg-right .text::after {
    position: absolute;
    right: 10px;
    /*content: " ";*/
    width: 0;
    height: 0;
    /*background-color: red;*/
    border-width: 6px 10px;
    border-style: solid;
    /*border-color: transparent #030c19 transparent transparent;*/
    /*border-color: transparent transparent transparent #030c19;*/
  }

  .msg.msg-right .text::before {
    position: absolute;
    right: -20px;
    content: " ";
    width: 0;
    height: 0;
    border-width: 6px 10px;
    border-style: solid;
    border-color: transparent transparent transparent deepskyblue;
  }

  .msg.msg-left .text::before {
    position: absolute;
    left: -20px;
    content: " ";
    width: 0;
    height: 0;
    border-width: 6px 10px;
    border-style: solid;
    border-color: transparent deepskyblue transparent transparent;
  }

  .list-complete-item {
    transition: all 1s;
    /*display: inline-block;*/
    /*margin-right: 10px;*/
  }

  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    /*transform: translateY(30px);*/
    /*transform: translateY(30px);*/
    /*top: 10px;*/
  }

  .list-complete-leave-active {
    position: absolute;
    top: 0px;
    left: 0px;
    /*position: relative;*/
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .chat-container {
    background: url('../../assets/map/images/fw_02.png') repeat-x;
  }

  .mcci span {
    margin: 0 10px;
  }

  .mrti {
    position: absolute;
    top: 280px;
    text-align: center;
    text-align: -moz-center;
    text-align: -webkit-center;
    width: 1080px;
  }

  .navi-desc {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 250px;
    background: url('../../assets/map/images/fw_02.png') repeat-x;
    color: white;
    /*background-color: black;*/
    font-size: 30px;
    height: 500px;
    width: 1080px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .navi-desc div {
    padding: 10px 0;
  }

  .msg:first-child {
    font-size: 15px;
    opacity: 0.6;
  }

  .chat-area {
    height: 300px;
    overflow-y: scroll;
  }

</style>

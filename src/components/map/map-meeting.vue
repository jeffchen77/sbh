<template>
  <div style="background-color: #0a426f">
    <transition-group name="list-complete" tag="div" class="chat-container">
      <div v-for="msg in messages" class="msg list-complete-item "
           v-bind:class="{ 'msg-left':msg.type==='left','msg-right':msg.type==='right' }"
           v-bind:key="msg.index">

        <img v-bind:src="msg.url" v-if="msg.type==='left'">

        <div class="text animated tada">{{msg.text}}</div>
        <img v-bind:src="rightIcon" v-if="msg.type==='right'">
      </div>
    </transition-group>

    <div class="tip-container">
      <div class="tip"></div>
      <div class="mic">
        <div class="voicerun ani1"></div>
        <div class="voicerun ani2"></div>
        <img src="/static/map/mic.svg" width="40" height="40">
      </div>
    </div>

    <div class="map-container">
      <meeting :fMap="fMap"></meeting>
    </div>


    <transition
      enter-active-class="animated tada"
      leave-active-class="animated zoomOut">

      <div class="control-bar" v-if="showControl">
        <el-radio-group v-model="mapLayer" @change="layerChange">
          <el-radio-button label="一楼"></el-radio-button>
          <el-radio-button label="二楼"></el-radio-button>
          <el-radio-button label="三楼"></el-radio-button>
        </el-radio-group>

        <el-switch @change="map3DChange"
                   v-model="map3D"
                   active-text="3D地图"
                   inactive-text="2D地图">
        </el-switch>

        <el-switch @change="multiLayerChange"
                   v-model="mapMultiLayer"
                   active-text="多层"
                   inactive-text="单层">
        </el-switch>
      </div>

    </transition>

  </div>
</template>

<script>
  import {fMap} from "../../assets/common/constant";
  import 'iview/dist/styles/iview.css'
  import {meetingService as ms} from "../../assets/map/meeting";
  import {wsServer} from "../../assets/common/constant";
  import QWebChannel from '../../../static/js/qwebchannel'
  import Meeting from "./meeting";

  export default {
    name: "map-meeting",
    components: {Meeting},
    props: {
      userIcon: {}
    },
    data() {
      return {
        map: null,
        rightIcon: 'static/index/images/user.jpeg',
        loadComplete: false,
        fMap: fMap.meeting,
        map3D: true,
        mapMultiLayer: true,
        mapLayer: '一楼',
        showControl: true,
        messages: [
          {
            index: new Date().getTime(),
            type: 'left',
            url: '/static/robot/robot.png',
            text: '您好，我是数博会机器人小i，很高兴为您服务，我可以帮您查询论坛和嘉宾，了解展商和活动，关于数博会的相关问题你都可以向我提问哦。'
          }],
        layer: new fengmap.FMImageMarkerLayer(),
        start: fMap.meeting.start,
        socket: null,
        core: null
      }
    },
    methods: {
      layerChange(val) {
        let kv = {
          '一楼': 1,
          '二楼': 2,
          '三楼': 3
        };
        if (this.map) {
          this.map.focusGroupID = kv[val]
        }
        console.log(val)
      },
      map3DChange(val) {
        if (this.map) {
          if (val) {
            this.map.viewMode = fengmap.FMViewMode.MODE_3D
          } else {
            this.map.viewMode = fengmap.FMViewMode.MODE_2D
          }
        }
      },
      multiLayerChange(val) {
        if (this.map) {
          console.log(this.map.focusGroupID);
          if (val) {
            this.map.visibleGroupIDs = [1, 2, 3]
          }
          else {
            this.map.visibleGroupIDs = [this.map.focusGroupID]
          }
        }
      },
      pushMsg(text, type = 'left') {
        let msg = {
          index: new Date().getTime() + Math.random(),
          type: type,
          url: '/static/robot/robot.png',
          text: text
        };

        if (this.messages.length >= 4) {
          this.messages.shift();
        }
        this.messages.push(msg);
        if (type === 'left') {
          this.core.startTts(text, '')
        }
      },
      hide() {
        //todo 回到主页，进行正常聊天

      }
    },
    mounted() {
      ms.init(this);
      if (this.userIcon) {
        this.rightIcon = this.userIcon
      }


      let self = this;
      // let map = new fengmap.FMMap({
      //   mapServerURL: 'static/fmap/' + self.fMap.mapId,
      //   mapThemeURL: 'static/fmap/theme',
      //   defaultThemeName: 'mainhuichang',
      //
      //   container: document.getElementById('map'),
      //   appName: self.fMap.appName,
      //   key: self.fMap.appKey,
      //   defaultViewMode: fengmap.FMViewMode.MODE_3D,
      //   moveToAnimateMode: true,
      //   naviLineAnimation: true,
      //   // focusAlphaMode: true,
      //   defaultMapScaleLevel: 20,
      //   defaultFocusGroup: 1,
      //   defaultVisibleGroups: self.fMap.groupIds,
      //   focusAlpha: 0.3,
      //   defaultControlsPose: fengmap.FMDirection.EAST,
      //   // 开启2维，3维切换的动画显示
      //   viewModeAnimateMode: true,
      //   // 设置倾斜角，默认倾斜角为60度
      //   defaultTiltAngle: 30,
      //   lazyCreateMode: true
      // });

      // self.map = map;
      // map.openMapById(self.fMap.mapId, err => {
      //   console.log(err)
      // });

      // map.on('mapClickNode', function (event) {
      //   console.log(event)
      //   // if (event.target == null || event.name == undefined || event.name == null || event.name == '') {
      //   //   self.$emit('show-enterprise', 'unshowall')
      //   //   return;
      //   // }
      //
      //   console.log(event.name, '-', event.nodeType)
      //   if (event.nodeType === fengmap.FMNodeType.MODEL) {
      //     if (event.name) {
      //       self.$emit('show-enterprise', {
      //         name: event.name,
      //         loc: {
      //           x: event.mapCoord.x,
      //           y: event.mapCoord.y,
      //           groupID: event.groupID
      //         },
      //         fid: event.FID,
      //         id: event.ID
      //       })
      //     }
      //   }
      // });
      //
      // map.on('loadComplete', function (event) {
      //   self.loadComplete = true;
      //   self.showControl = true;
      //   //todo 标注当前位置
      //   ms.rotate();
      //
      //   // ms.chat('一楼有什么会议', self);
      //   // let result = ms.search(self, '贵宾休息室4');
      //   // result = ms.search(self, '北门');
      //   // console.log(result)
      //
      //   // let navi = ms.navigate(self, result[0]);
      //   // self.pushMsg('已为您导航到贵宾休息室。', 'left')
      //   // self.pushMsg(navi.join('，'), 'left')
      //   // console.log(result)
      // });

      self.socket = new WebSocket(wsServer);
      self.socket.onclose = function () {
        console.log("web channel closed");
      };
      self.socket.onerror = function (error) {
        console.log("web channel error: " + error);
      };
      self.socket.onopen = function () {
        console.log("WebSocket connected, setting up QWebChannel.");

        new QWebChannel(self.socket, function (channel) {
          self.core = channel.objects.core;
          //语音识别结果
          self.core.voiceRecognizedEvent.connect((txt) => {
            console.log(txt)
            ms.showVoiceResult(txt)
          });

          //状态检测
          self.core.statusChangeEvent.connect(status => {
            ms.showStatus(status)
          });

          //显示三维人像显示
          self.core.setAvatarVisible(false);
          self.core.startVoiceRecognize();

          self.core.cancelPendingTts();
          self.pushMsg('您当前所在的位置是会议厅1楼入口');
        });
      };
    }
  }
</script>

<style scoped>
  .chat-container {
    width: 600px;
    height: 500px;
    padding-top: 20px;

    /*background-color: red;*/
  }

  .tip-container {
    width: 480px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 600px;
    /*background-color: #00baff;*/
  }
  .tip-container .mic{
    position: absolute;bottom: 0px;
    left: 0;
    height: 200px;
    width: 480px;
    background-color: #a6e1ec;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .voicerun{
    position: absolute;
    width:100px;
    height: 100px;
    /*background-color: red;*/
    /*width: 0;*/
    /*height: 0;*/
    border-radius: 50%;
  }
  .voicerun.ani1{
    animation: ani1 4s infinite linear;
  }
  .voicerun.ani2{
    animation: ani2 4s infinite linear;
  }
  @keyframes ani1 {
    0% {
      background: rgba(5, 17, 46, 0);
      transform: scale(1);
    }
    25% {
      background-color: rgba(255,255,255,0.4);
      /*background: rgba(5, 17, 46, .6);*/
      transform: scale(1.5);
    }
    50% {
      background: rgba(5, 17, 46, .4);
      transform: scale(2);
    }
    75% {
      background: rgba(5, 17, 46, 0);
      transform: scale(2);
    }
    100% {
      background: rgba(5, 17, 46, 0);
      transform: scale(2);
    }
  }
  @keyframes ani2 {
    0% {
      background: rgba(5, 17, 46, 0);
      transform: scale(1);
    }
    25% {
      background: rgba(5, 17, 46, 0);
      transform: scale(1);
    }
    50% {
      /*background: rgba(5, 17, 46, 0.6);*/
      background-color: rgba(255,255,255,0.4);

      transform: scale(1.5);
    }
    75% {
      background: rgba(5, 17, 46, 0.4);
      transform: scale(2);
    }
    100% {
      background: rgba(5, 17, 46, 0);
      transform: scale(2);
    }
  }


  .tip-container .mic img::before{

  }
  .tip-container .mic img::after{

  }

  .map-container {
    width: 1080px;
    height: 1620px;
    background-color: #a6e1ec;
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

  .msg:nth-child(1) {
    opacity: 0.2;
  }

  .msg:nth-child(2) {
    opacity: 0.5;
  }

  .msg:nth-child(3) {
    opacity: 0.8;
  }

  .msg img {
    width: 60px;
    height: 60px;
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
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid deepskyblue;
    box-shadow: 0 0 10px deepskyblue;
    position: relative;
    max-width: 880px;
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

</style>

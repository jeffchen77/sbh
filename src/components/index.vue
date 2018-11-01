<template>
  <div class="index" >
  <!--<div class="index"  >-->
    <p><input type="text" value="贵阳市介绍" id="test" >
      <button id="btn1">发送</button></p>

    <div style="margin:5px 20px;color:#fff;position:absolute;left:20px;top:20px;">

      <div id="log"
           style="width:1000px;height:500px;border:1px solid #ff0000;overflow: auto;display: none;font-size:14px;">
      </div>
    </div>
    <div class="help" @click="clickHelp"><img src="/static/0428/images/help.png"></div>
    <div style="position:absolute; top:50px; left:50px" ><img src="/static/0428/images/shubohui_logo.png"></div>
    <div class="voice_content">
      <div class="robot" style="display: none;"><img src="/static/index/images/ps_ren.png"></div>

      <div class="ring_box" style="display: none;">
        <div class="ring1"></div>
        <div class="ring2"></div>
        <div class="ring3"></div>
        <div class="ring4"></div>
      </div>
      <!-- 动画end -->
      <!-- 地球 -->
      <!-- 语音动画 -->
      <div class="voice_circle active">
        <img src="../../static/index/images/ic_voice.png">
        <div class="voicerun voicerun1"></div>
        <div class="voicerun voicerun2"></div>
        <div class="voicerun voicerun3"></div>
        <div class="normalline">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="activeline">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <!-- 语音动画end -->
      <!-- 信息框 -->
      <div class="xiaoiMsg msgAnimation" style="display: block;">
        <div class="msg">
          <div class="xiaoiLogo">
            <img src="/static/robot/robot.png" style="width: 100%;height: 100%"/>
          </div>
          <!--<div class="xiaoiLogo" style="background: url('/static/images/robot_logo.gif')"></div>-->
          <div class="desc">
            <vue-typer :repeat="0" :typeDelay='70' :pre-type-delay='500' :text='robotTxt'></vue-typer>
            <!--<div class="txt temptext"></div>-->
          </div>
          <div class="picbox">
            <img src="/static/index/images/PC_4.png">
            <div id="mapbox"></div>
            <video controls width="570" src="" height="360">
              <!-- <source src="../../static/images/123.mp4" type="video/mp4"> -->
            </video>
          </div>
          <!-- 边缘动画 -->
          <div class="line line_top"></div>
          <div class="line line_right"></div>
          <div class="line line_bot"></div>
          <div class="line line_left"></div>
        </div>
      </div>

      <!-- 信息副本 -->
      <div class="descCopy">
        <div class="logo"></div>
        <div class="txt"></div>
      </div>
      <div class="picCopy copyhide"></div>
      <!-- 信息记录 -->
      <div class="msgbox">
        <div class="outerbox">

        </div>
      </div>
      <!--<p>输入框: <input type="text" value="dfdf" id="test" >-->
        <!--<button id="btn1">发送</button></p>-->
      <!-- 图片记录 -->
      <div class="material" style="display: none;"></div>
      <!-- 语音记录 -->
      <div class="user_box">
        <div class="user_msg_record_box" style="display: none">
          <div class="user_msg_record">
            <!-- <div class="record">这是从您所处位置去“石蚌滩瀑布”的路线地图这是从您所处位</div> -->
          </div>
        </div>
        <div class="user_msg_copy" style="display: none"></div>

        <div class="user_msg">
        </div>
        <div class="user_logo" style="display:none;">
          <div class="user_list">
            <img id="small_user_ico" :src="userIcon">
            <!--<span id="small_user_name" class="user_name">嘉宾</span>-->
            <!--<img id="small_user_ico" src="/static/robot/001.jpg"><span id="small_user_name" class="user_name">嘉宾</span>-->
          </div>

          <!--<div class="user_list">-->
          <!--<img id="small_user_ico" src="../../static/images/user_logo.png"><span id="small_user_name" class="user_name">毛泽东</span>-->
          <!--</div>-->
        </div>

      </div>
      <!-- 显示大图 -->
      <div class="picShadow msgAnimation">
        <div class="sourcebox">
          <div class="picbox_big">
            <img src="/static/index/images/PC_9.png">
            <span class="btn btnL" onclick="prevPic()"></span>
            <span class="btn btnR" onclick="nextPic()"></span>
          </div>
          <div id="mapbox_big"></div>
          <video controls src="" width="1086" height="642" autoplay="true">
          </video>
        </div>
        <div class="line line_top"></div>
        <div class="line line_right"></div>
        <div class="line line_bot"></div>
        <div class="line line_left"></div>
      </div>

      <!--<router-link to="/touch"><div class="totouch"><span class="outerrow outerrow1"></span><span class="outerrow outerrow2"></span><img src="../../static/images/touch/ic_touch.png"></div></router-link>-->
      <div class="face-bg" style="display:none;"></div>
      <div class="face-box" style="display: none">

        <div class="face-photo-border">
          <!-- 识别中或者识别识别头像，识别识别把scanning设置为display: none; -->
          <div class="scaning-border" id="faceico">
            <div id="scanning" class="scanning"></div>
          </div>
          <!-- 识别成功 -->
          <div id="face_photo" style="display:none;">
            <img id="faceResultImg" class="face-photo" src=""/>
          </div>
        </div>

        <!-- 识别中 -->
        <div id="faceing">
          <div class="face-state"></div>
          <div class="face-tip"></div>
        </div>


        <!-- 识别成功 -->
        <div id="face_message" class="face-message" style="display:none;">
          <ul>
            <li><label class="label-name">姓名：</label><span id="user_name"></span><br></li>
            <li><label class="label-type">类型：</label><span id="user_attribute"></span></li>
          </ul>
        </div>

        <!-- 识别失败 -->
        <div id="face_fail" class="face-fail" style="display:none;"></div>
      </div>

      <div class="modal-area">

        <transition-group
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut">

          <!--<div style="width: 100px;height: 100px;background-color: indianred;" v-if="showModal"> 凹蛋糕和会发觉是的话爱是否健康斯柯达-->
          <!--复活甲阿斯顿发生的风景盛大开放计划是东风科技好水电费按时到几号发圣诞节啊回复按时交电费按时打卡积分回话-->
          <!--</div>-->

          <!--<meeting-agenda :meetingListInfo="meetingListInfo" v-if="showModal" key="1"/>
          <meeting-detail :meetingInfo="data" v-if="showMeetingDetail" key="2"/>
          <help v-if="showHelp" key="3"/>-->
          <!--<meeting-statistics v-if="showMeetingStatistics" :question="question" key="4" @meetingList="meetingList"></meeting-statistics>-->
          <meeting-agenda :meetingListInfo="meetingListInfo" ref="agenda" v-if="showStatus.showModal" key="1"/>
          <meeting-detail :meetingInfo="data" v-if="showStatus.showMeetingDetail" key="2"/>
          <help v-if="showStatus.showHelp" key="3" @clickMenu="gotoMenu"/>
          <meeting-statistics ref="statistics" v-if="showStatus.showMeetingStatistics" :question="question" key="4"
                              @meetingList="meetingList"></meeting-statistics>
          <food-list v-if="showStatus.showFoodListBox" key="5" @openDetail="openFoodDetail"
                     ref="foodListObj"></food-list>
          <food-detail v-if="showStatus.showFoodDetail" :foodInfo="foodDetailInfo" :key="'6'+keyStatus"
                       ref="foodDetail"></food-detail>
          <bmap-poi v-if="showStatus.showBmapPoi" :itemInfo="bmapPoiInfo" :key="'7'+keyStatus"
                    ref="bmapDetail"></bmap-poi>
          <mall-info v-if="showStatus.showMallInfo" :storeInfo="storeInfoData" key="8" ref="mallInfoObj"></mall-info>
          <bmap-nav v-if="showStatus.showBmapNav" :itemInfo="bmapNavInfo" :key="'9'+keyStatus"
                    ref="bmapNavObj"></bmap-nav>

          <ScenicListBox v-if="showStatus.showScenicListBox" @openDetail="openScenicDetail" :key="10"></ScenicListBox>
          <!--<scenic-detail v-if="showStatus.showScenicDetail" :scenicInfo="scenicDetailInfo" key="6"></scenic-detail>-->
          <scenic-detail-box v-if="showStatus.showScenicDetail" :scenicInfo="scenicDetailInfo" :key="'11' + keyStatus"
                             ref="scenicInfo"></scenic-detail-box>

          <humanAndCulture-list v-if="showStatus.showHumanAndCultureListBox" key="12"
                                @openHumanAndCultureDetail="openHumanAndCultureDetail"></humanAndCulture-list>
          <humanAndCulture-detail v-if="showStatus.showHumanAndCultureDetail"
                                  :humanAndCultureInfo="HumanAndCultureDetailInfo"
                                  :key="'13'+keyStatus"></humanAndCulture-detail>
          <hotel-list ref="hotelListObj" v-if="showStatus.showHotelListBox" key="'14' + keyStatus"
                      @openDetail="openHotelDetail"></hotel-list>
          <hotel-detail v-if="showStatus.showHotelDetail" :hotelInfo="hotelDetailInfo" :key="hotelKeyStatus"
                        ref="hotelDetailObj"></hotel-detail>
          <shopping-list v-if="showStatus.showShoppingListBox" key="15" @openDetail="openShoppingDetail"
                         ref="shoppingListObj"></shopping-list>
          <shopping-detail v-if="showStatus.showShoppingDetail" :shoppingInfo="shoppingDetailInfo" :key="'15'+keyStatus"
                           ref="shoppingDetail"></shopping-detail>
          <ShowVideo v-if="showStatus.showVideo" :viedourl="viedourl" :key="16" ref="playVideo"></ShowVideo>
          <guest-list-box v-if="showStatus.showGuestListBox" :guestInfo="guestInfo"
                          :key="'17'+keyStatus"></guest-list-box>

          <ep-fix-list v-if="showStatus.showEpFixList" :key="'18'" ></ep-fix-list>
          <ep-fix-detail v-if="showStatus.showEpFixDetail" :key="'19'" :epName="epName"></ep-fix-detail>

          <weather-info v-if="showStatus.showWeatherInfo" :key="'16'+keyStatus" :weatherInfo="weatherInfo"></weather-info>
          <weather-list v-if="showStatus.showWeatherList" :key="'17'+keyStatus" :weatherList="weatherList"></weather-list>
          <limit-num v-if="showStatus.showLimitNum" :key="'18'+keyStatus" :limitNum="limitNum"></limit-num>
          <specialty-list v-if="showStatus.showSpecialtyListBox" :key="'18'+keyStatus" @openDetail="openSpecialtyDetail"
                          ref="speclialtyListObj"></specialty-list>
          <specialty-detail v-if="showStatus.showSpecialtyDetail" :specialtyInfo="specialtyDetailInfo" :key="'19'+keyStatus"
                            ref="specialtyDetail"></specialty-detail>
        </transition-group>

      </div>

    </div>
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <vip-card :user="user" class="vip-user" v-if="showStatus.showVip"/>
    </transition>
    <transition
      enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"
    >
      <map-main :user-ico="userIcon" v-if="showStatus.showMap"/>
    </transition>

    <div class="earth"><img src="/static/index/images/wave.png"></div>

  </div>
</template>
<script>
  import '../assets/index/css/base.css'
  import '../assets/index/css/face.css'
  import QWebChannel from '../../static/js/qwebchannel'
  import {xiaoiChat, speech, userChat} from "../assets/index/js/index";
  import {VueTyper} from 'vue-typer'
  import MeetingAgenda from "./new/meetingAgenda";
  import MeetingDetail from "./new/meetingDetails";
  import MeetingStatistics from "./new/meetingStatistics";
  import GuestListBox from "./new/guestListBox";
  import Help from '../views/sbt/Help2'
  import VipCard from '../views/sbt/VipCard'
  import {device, wsServer} from "../assets/common/constant";

  import Normal from "../views/sbt/Help2";
  import FoodList from "./new/foodListBox";
  import FoodDetail from "./new/foodDetailBox";
  import MallInfo from "./new/mallInfo";
  import MapMain from "./map/index";
  import bmapPoi from "./map/bmap-poi";
  import BmapNav from "./map/bmap-nav";
  import ScenicListBox from './new/scenicListBox'
  import ScenicDetailBox from './new/scenicDetailBox'

  import HumanAndCultureList from "./new/humanAndCultureListBox";
  import HumanAndCultureDetail from "./new/humanAndCultureDetailBox";
  import hotelList from "./new/hotelListBox";
  import hotelDetail from "./new/hotelDetailBox"
  import shoppingList from "./new/shoppingListBox";
  import shoppingDetail from "./new/shoppingDetailBox";
  import ShowVideo from "./ShowVideo"
  import EpFixList from "./new/enterPriseFixList"
  import EpFixDetail from "./new/enterPriseFixDetail"
  import SpecialtyList from "./new/specialtyListBox";
  import SpecialtyDetail from "./new/specialtyDetailBox";

  // 单日天气查询
  import weatherInfo from './new/weatherInfo'
  // 多日天气查询
  import weatherList from './new/weatherList'
  // 车辆限号查询
  import limitNum from './new/limitNum'

  let core;
  let socket;
  let clearstopVoice;
  let gotoindex;
  let lastMsg;

  var userName;
  var userAttr;
  var userUrl;
  var asrFlag;
  var faceFlag;
  var faceDtl;
  let isWelcome = true;
  let actFlag; // 晃动
  export default {

    name: 'voice',
    data() {
      return {
        user: null,
        message: "",
        faceRecognizecount: 0,
        keepFaceRecognize: false,
        defaultReplycount: 0,
        curr_voice_str: "",
        core: null,
        robotTxt: '欢迎来到数博会现场，您有什么问题都可以直接问我哦',
        showStatus: {
          showModal: false,
          showMeetingDetail: false,
          showHelp: false,
          showVip: false,
          showTopic: false,
          showMeetingStatistics: false,
          showFoodListBox: false,
          showFoodDetail: false,
          showMap: false,
          showBmapPoi: false,
          showMallInfo: false,
          showBmapNav: false,
          showScenicListBox: false,
          showScenicDetail: false,
          showHumanAndCultureListBox: false,
          showHumanAndCultureDetail: false,
          showHotelListBox: false,
          showHotelDetail: false,
          showShoppingListBox: false,
          showShoppingDetail: false,
          showVideo: false,
          showGuestListBox: false,
          showEpFixList: false,
          showEpFixDetail: false,
          showWeatherInfo: false,
          showWeatherList: false,
          showLimitNum: false,
          showSpecialtyListBox: false,
          showSpecialtyDetail: false
        },
        userIcon: '/static/index/images/user.jpeg',
        data: {"id": ''},
        question: "会议议程",
        Normal: {},
        lastVoiceStr: '',
        speakTimer: null,
        meetingListInfo: null,
        foodDetailInfo: {name: '', img: ''},
        bmapPoiInfo: {keywords: '', fromMsgType: '', msgNum: ''},
        bmapNavInfo: {keywords: '', title: ''},
        storeInfoData: {"name": "", "tel": "", "addr": "", "type": ['未知']},
        scenicDetailInfo: {name: '', img: ''},
        HumanAndCultureDetailInfo: {text: '', img: '', title: ''},
        keyStatus: "keyStatus",
        hotelKeyStatus: "hotelKeyStatus",
        hotelDetailInfo: {},
        shoppingDetailInfo: {},
        viedourl: "",
        guestInfo: {},
        epName: "腾讯云计算（北京）有限责任公司",
        weatherInfo: {templow:'', temphigh:'', city:'', imgcode:'', weather:'', date:'', img:''},
        weatherList: {weather:[]},
        limitNum: {type:'', title:'', desc:'', limit:'', time:''},
        specialtyDetailInfo:{}
      }
    },
    components: {
      MapMain,
      MeetingDetail,
      MeetingAgenda,
      VueTyper,
      Normal,
      Help,
      MeetingStatistics,
      VipCard,
      FoodList,
      FoodDetail,
      bmapPoi,
      MallInfo,
      BmapNav,
      ScenicDetailBox,
      ScenicListBox,
      HumanAndCultureList,
      HumanAndCultureDetail,
      hotelList,
      hotelDetail,
      shoppingList,
      shoppingDetail,
      ShowVideo,
      GuestListBox,
      EpFixDetail,
      EpFixList,
      weatherInfo,
      weatherList,
      limitNum,
      SpecialtyList,
      SpecialtyDetail
    },
    methods: {
      showFace: function (faceAppearred, faceDetails) {

        var faceDetails = JSON.parse(faceDetails); //解析成JSON。

        //人脸检测
        if (faceAppearred) {
          clearTimeout(clearstopVoice);
          clearTimeout(gotoindex);
          _self.startVoice();

          this.addlog("人脸宽度：" + faceDetails.staring.location_width);
          this.addlog("人脸长度：" + faceDetails.staring.location_height);
          let faceArea = parseInt(faceDetails.staring.location_width) * parseInt(faceDetails.staring.location_height);
          this.addlog("人脸面积：" + faceArea);

        } else {
          //人脸消失5秒后关闭录音
          clearstopVoice = setTimeout(function () {
            _self.stopVoice();
          }, 5000);

          //人脸消失10秒后跳转到广告页
          gotoindex = setTimeout(function () {
            socket.close();
            _self.$router.push("/");
          }, 10000);

        }
      },
      chatS(text) {
        xiaoiChat(this, -1, text)
      },
      chatC(text) {
        userChat(text)
      },
      addlog: function (msg) {
        var timeString = new Date().toLocaleTimeString();
        $("#log").append("当前时间：" + timeString + "</br>");
        $("#log").append(msg + "</br>");
        $("#log").append("-----------------------------</br>");
        $("#log").scrollTop(99999);
      },
      showFaceRecognizeResult: function (message) {
      },
      showFaceStatus: function (status) {
        //状态检测
        // console.log(status);
        if (status === 3) {
          $('.voice_circle').stop().animate({'bottom': 0}, 500, function () {
            $('.voice_circle').addClass('active');
          });
        } else {
          $('.voice_circle').removeClass('active').animate({'bottom': -256}, 500, function () {
          });
        }
      },
      showSemanticResponse: function (message, yesAgain) {
        console.log(message);
        let msg;
        //语义回复结果
        try {
          msg = JSON.parse(message); //解析成JSON。
        } catch (e) {
          msg = message;
        }

        let self = this;

        if (msg.type === '-1') {
          //无效数据，不展示
          return
        }


        if (msg.type === 'Yes') {
          if (lastMsg) {
            self.showSemanticResponse(lastMsg, true);
            return;
          }
        }
        if (!msg.content && msg.checkContent && !yesAgain) {//如果纠错的话，则播报纠错内容，反问用户
          xiaoiChat(this, -1, msg.checkContent);
          self.core.cancelPendingTts();
          self.core.startTts(msg.checkContent, '');
          lastMsg = msg;
          return;
        }
        lastMsg = '';
        if (msg.type === 'Welcome') {
          console.log('welcomeDo 进入');
          if (self.user && self.user.userName) {
            console.log('引擎返回迎宾处理');
            if (msg.position) {
              this.user.userAttr = msg.position;
            }
            this.showStatus.showVip = true;
          }
          setTimeout(() => {
            self.core.startTts(msg.content + '    ,', '');
            xiaoiChat(this, -1, msg.content);

            setTimeout(() => {
              this.showStatus.showVip = false;

              self.core.startTts(msg.content2, '');
              xiaoiChat(this, -1, msg.content2);

              setTimeout(() => {
                self.core.startTts(msg.content3, '');
                xiaoiChat(this, -1, msg.content3);
                setTimeout(() => {
                  self.showStatus.showHelp = true;
                }, 1000);
              }, 2000);
            }, 4500);
          }, 1000);
          self.startVoice();
        }

        if(actFlag) {
          clearInterval(actFlag);
        }

        actFlag = setTimeout(function act_body() {
          // core.inputExpression('facial_badSmile', 1000) ;
          core.inputAction('idle')
        }, 7000);


        if (msg.type === 'goodbye') {
          clearTimeout(self.speakTimer);
          self.core.cancelPendingTts();
          setTimeout(() => {
            self.core.startTts(msg.content, '');
            xiaoiChat(this, -1, msg.content);
            setTimeout(() => {

              self.$router.push({path: '/StandByHotInforDalaoshuo'});
            }, 6000);
          }, 2000);
        }

        if (msg.type === 'map') {
          clearTimeout(self.speakTimer);
          self.openMap(msg.name);
          return;
        }

        if (msg.question) {
          if (msg.type === '8') {
            self.hideModal();
          }
          clearTimeout(self.speakTimer);
          self.core.cancelPendingTts();

          if (msg.question) {
            userChat(msg.question);
          }

          if (msg.speakList && msg.speakList.length > 1) {
            self.speakMore(msg)
          } else {
            if (msg.speak) {
              self.core.startTts(msg.speak, '');
            } else if (msg.content) {
              self.core.startTts(msg.content, '');
            }

            if (msg.content) {
              xiaoiChat(this, -1, msg.content);
            }

            self.startVoice();
            // setTimeout(() => {
            //
            // }, 10000);
          }
        }

        //驱动表情动作
        if (msg.action) {
          self.core.inputAction(msg.action)
        } else {
          self.core.inputAction('speaking_long')
        }
        if (msg.feel) {
          self.core.inputExpressionStatic(msg.feel)
        } else {
          self.core.inputExpressionStatic('speaking_smile')
        }

        if (msg.type === '2') {
          //xiaoiChat(this, -1, msg.content);
          self.hideModal();
          self.question = msg.question;
          self.showStatus.showMeetingStatistics = true;
        }

        if (msg.type == '201') {
          self.getMeetings(msg.question);

        }


        if (msg.type === '3') {
          //帮助信息
          self.hideModal();
          self.showStatus.showHelp = true;
        }
/*
        if (msg.type == '103') {
          //视频测试
          self.hideModal();
          self.viedourl = msg.url;
          self.showStatus.showVideo = true;
        }*/

        if(self.showStatus.showVideo == true && msg.type == 'V103'){
          if(msg.command == 'stop' && !document.getElementById('video').paused){
            xiaoiChat(this, -1, "好的！想要继续观看的话可以告诉我哦！");
            self.core.startTts("好的！想要继续观看的话可以告诉我哦！", '');
            self.$refs.playVideo.playPause();
          }else if(msg.command == 'start' && document.getElementById('video').paused){
            self.$refs.playVideo.playPause();
          }else if(msg.command == 'restart'){
            document.getElementById('video').currentTime=0;
            $('#video').parent().find("div:eq(0)").addClass('video-button-display');
            $('#video').parent().find("div:eq(1)").addClass('video-button-display')
            document.getElementById('video').play();
          }else if(msg.command == 'exit'){
            self.showStatus.showVideo = false;
          }
        }

        if (msg.type === '10000') {
          if (self.showStatus.showMeetingStatistics == true) {
            xiaoiChat(this, -1, "好的，以下是相关的会议列表");
            self.core.startTts("好的，以下是相关的会议列表", '');
            self.$refs.statistics.junpNumber(msg.num);
          } else if (self.showStatus.showModal == true) {
            xiaoiChat(this, -1, "好的，以下是该会议详细介绍");
            self.core.startTts("好的，以下是该会议详细介绍", '');
            self.$refs.agenda.junpNumber(msg.num);
          } else if (self.showStatus.showBmapPoi == true) {
            self.bmapPoiInfo.msgNum = msg.num;
            //附近美食弹窗
            console.log('poiMsgType:', self.$refs.bmapDetail.poiMsgType)
            if (self.$refs.bmapDetail.poiMsgType === 'SM0001') {
              self.bmapPoiInfo.fromMsgType = 'SM0001';
            }
            self.$refs.bmapDetail.$refs.poiInner.gotoNum(self.bmapPoiInfo);
          } else if (self.showStatus.showFoodDetail == true) {
            //美食详情弹窗
            self.bmapPoiInfo.fromMsgType = '300';
            self.bmapPoiInfo.msgNum = msg.num;
            self.$refs.foodDetail.$refs.foodPoiInner.gotoNum(self.bmapPoiInfo);
          } else if (self.showStatus.showFoodListBox == true) {
            //美食列表说第一个，第二个....弹窗功能
            self.$refs.foodListObj.gotoDetailByNum(msg.num);
          } else if (self.showStatus.showScenicDetail == true) {
            self.bmapPoiInfo.msgNum = msg.num;
            self.$refs.scenicInfo.$refs.foodPoiInner.gotoNum(self.bmapPoiInfo);
          } else if (self.showStatus.showShoppingListBox == true) {
            //购物列表说第一个，第二个....弹窗功能
            self.$refs.shoppingListObj.gotoDetailByNum(msg.num);
          } else if (self.showStatus.showShoppingDetail == true) {
            //购物详情
            self.bmapPoiInfo.msgNum = msg.num;
            self.$refs.shoppingDetail.$refs.shoppingPoiInner.gotoNum(self.bmapPoiInfo);
          } else if (self.showStatus.showHotelListBox == true) {
            // 酒店列表说第一个，第二个
            xiaoiChat(this, -1, "好的，以下是改酒店的详细信息");
            self.core.startTts("好的，以下是改酒店的详细信息", '');
            self.$refs.hotelListObj.gotoDetailByNum(msg.num);
          } else if (self.showStatus.showHotelDetail == true) {
            self.bmapPoiInfo.msgNum = msg.num;
            self.$refs.hotelDetailObj.$refs.hotelPoiInner.gotoNum(self.bmapPoiInfo);
          }else if(self.showStatus.showSpecialtyListBox == true){
            self.$refs.speclialtyListObj.gotoDetailByNum(msg.num);
          }else if(self.showStatus.showSpecialtyDetail == true){
            self.bmapPoiInfo.msgNum = msg.num;
            self.$refs.specialtyDetail.$refs.specialtyPoiInner.gotoNum(self.bmapPoiInfo);
          }
        }

        //带我去的弹窗功能
        if (msg.type === 'T0001' || msg.type === 'NAV001') {
          if (self.showStatus.showMallInfo == true) {
            //商家详情界面打开的情况下
            self.$refs.mallInfoObj.gotoPoiNav();
          }
          if (self.showStatus.showBmapNav == true) {//导航
            self.$refs.bmapNavObj.showNavQrcode();
          }
        }
        if (msg.type === '406') {
          //景点列表弹窗
          self.hideModal();
          self.showStatus.showScenicListBox = true;
        }
        if (msg.type === '403') {
          //人文列表弹窗
          self.hideModal();
          self.showStatus.showHumanAndCultureListBox = true;
        }
        if (msg.type === '402') {
          //美食列表弹窗
          self.hideModal();
          self.showStatus.showFoodListBox = true;
        }
        if (msg.type === '405') {
          //购物列表弹窗
          self.hideModal();
          self.showStatus.showShoppingListBox = true;
        }

        if (msg.type === '404') {
          //购物列表弹窗
          self.hideModal();
          self.showStatus.showHotelListBox = true;
        }

        if(msg.type === '408'){
          //特色列表弹窗
          self.hideModal();
          self.showStatus.showSpecialtyListBox = true;
        }
        if (msg.type === 'HC8000') {
          //贵阳介绍
          var title = '贵阳介绍';
          self.openHumanAndCultureDetail(msg.text, msg.img, title);

        }
        if (msg.type === 'HC8001') {
          //文化介绍
          var title = '文化介绍';
          self.openHumanAndCultureDetail(msg.text, msg.img, title);
        }

        if (msg.type === 'HC8002') {
          //人物介绍
          var title = '人物介绍';
          self.openHumanAndCultureDetail(msg.text, msg.img, title);
        }

        if (msg.type === 'F0001') {
          //美食详情弹窗
          self.openFoodDetail(msg.text, msg.img);
        }


        if (msg.type === '302') {
          //参会嘉宾
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.showStatus.showGuestListBox = true;
        }

        if (msg.type === 'G0001') {
          //参会嘉宾-企业嘉宾
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.guestInfo = {"type": "ENT"};
          self.showStatus.showGuestListBox = true;
        }

        if (msg.type === 'G0002') {
          //参会嘉宾-政府嘉宾
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.guestInfo = {"type": "GOV"};
          self.showStatus.showGuestListBox = true;
        }

        if (msg.type === 'G0003') {
          //参会嘉宾-专家嘉宾
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.guestInfo = {"type": "EXP"};
          self.showStatus.showGuestListBox = true;
        }

        if (msg.type === 'G0004') {
          //参会嘉宾-嘉宾名字高亮
          if (self.showStatus.showGuestListBox == true) {
            self.guestInfo = {"type": "EXP", "name": msg.name};
          }
        }

        if (msg.type === 'SP001') {
          //购物详情弹窗
          self.openShoppingDetail(msg.text, msg.img);
        }
        if (msg.type === 'F0002') {//美食需要单独设定此类型
          self.hideModal();
          //百度POI弹窗
          self.keyStatus = "" + (new Date()).getTime();
          console.log("百度POI弹窗=" + msg.text);
          if(msg.text!=null&&msg.text!=''&&msg.text.trim()!='') {
            self.bmapPoiInfo.fromMsgType = msg.type;
            self.bmapPoiInfo.keywords = msg.text;
            self.showStatus.showBmapPoi = true;
          }
        }
        if (msg.type === 'SM007') {//其他POI设定此类型
          self.hideModal();
          //百度POI弹窗
          self.keyStatus = "" + (new Date()).getTime();
          console.log("百度POI弹窗=" + msg.text);
          if(msg.text!=null&&msg.text!=''&&msg.text.trim()!='') {
            self.bmapPoiInfo.fromMsgType = msg.type;
            self.bmapPoiInfo.keywords = msg.text;
            self.showStatus.showBmapPoi = true;
          }
        }
        if (msg.type === 'SM001') {
          //港口，酒店POI首页
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          console.log("港口,酒店百度POI弹窗=" + msg.text);
          if(msg.text!=null&&msg.text!=''&&msg.text.trim()!='') {
            self.bmapPoiInfo.fromMsgType = msg.type;
            self.bmapPoiInfo.keywords = msg.text;
            self.showStatus.showBmapPoi = true;
          }
        }
        if (msg.type === 'SM002') {//公交
          if (self.showStatus.showBmapNav == true) {
            self.$refs.bmapNavObj.selectNavigator(0);
          }
        }
        if (msg.type === 'SM003') {//驾车
          if (self.showStatus.showBmapNav == true) {
            self.$refs.bmapNavObj.selectNavigator(1);
          }
        }
        if (msg.type === 'SM004') {//步行
          if (self.showStatus.showBmapNav == true) {
            self.$refs.bmapNavObj.selectNavigator(2);
          }
        }
        if (msg.type === 'SM006') {//返回
          if (self.showStatus.showBmapNav == true) {
            self.$refs.bmapNavObj.returnPoi();
          }
        }
        if (msg.type === 'S0001') {
          //景点详情弹窗
          self.openScenicDetail(msg.text, msg.imgDetail);
        }

        if (msg.type === '301') {
          //参会企业
          self.hideModal();
          // self.keyStatus = "" + (new Date()).getTime();
          self.showStatus.showEpFixList = true;
        }

        if (msg.type === 'EP0001') {
          //企业详情
          self.hideModal();
          self.epName =  msg.name;
          self.showStatus.showEpFixDetail = true;
        }
        //单日天气查询
        if (msg.type == 'WI001'){
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.weatherInfo.date = msg.date;
          self.weatherInfo.city = msg.city;
          self.weatherInfo.imgcode = msg.imgcode;
          self.weatherInfo.weather = msg.weather;
          self.weatherInfo.templow = msg.templow;
          self.weatherInfo.temphigh = msg.temphigh;
          self.showStatus.showWeatherInfo = true;
        }
        //多日天气查询
        if (msg.type == 'WI002'){
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.weatherList.weather = msg.weather;
          self.showStatus.showWeatherList = true;
        }
        //限号查询
        if (msg.type == 'LN001' || msg.type == 'LN002' || msg.type == 'LN003'){
          self.hideModal();
          self.keyStatus = "" + (new Date()).getTime();
          self.limitNum.type = msg.type;
          self.limitNum.title = msg.title;
          self.limitNum.desc = msg.desc;
          self.showStatus.showLimitNum = true;
        }
      },
      speakMore(msg) {
        let self = this;
        if (msg.speakList.length > 0) {
          let content = msg.contentList.shift();
          let speak = msg.speakList.shift();
          let time = speak.length;
          if (time === 0) {
            time = 1;
          }
          self.core.startTts(speak, '');
          //驱动表情动作
          if (msg.action) {
            self.core.inputAction(msg.action)
          } else {
            self.core.inputAction('speaking_long')
          }
          if (msg.feel) {
            self.core.inputExpressionStatic(msg.feel)
          } else {
            self.core.inputExpressionStatic('speaking_smile')
          }
          xiaoiChat(self, -1, content);

          self.speakTimer = setTimeout(() => {
            self.speakMore(msg)
          }, time * 0.25 * 1000)

        }
      },
      sleep(timeout) {
        window.showModalDialog("javascript:document.writeln('<script>window.setTimeout(function () { window.close(); }, " + timeout + ");<\/script>');");
      },
      hideModal() {
        for (var key in this.showStatus) {
          this.showStatus[key] = false
        }
      },
      voiceRecognizedResult: function (text, isFinalResult) {
        //语音识别结果
        // console.log(text, isFinalResult);
        if (text != "") {
          if (this.lastVoiceStr != text) {
            this.lastVoiceStr = text;
            // this.requestAnswer(text);


            var self = this;
            // self.$api.ask(text, function (data) {
            //   if (!!data) {
            //     self.showSemanticResponse(data)
            //   }
            // })


            this.core.requestSemanticAnswer(text, "", '', "newdetail", '', false);

          }
        }
        if (isFinalResult) {
          this.lastVoiceStr = '';
        }
      },
      debugVoice: function (text) {
        //模拟发送语音
        core.debugText(text);
      },
      startVoice: function () {
        //开始录音
        core.startVoiceRecognize();
        this.addlog("开始录音");
      },
      stopVoice: function () {
        //停止录音
        core.stopVoiceRecognize();
        this.addlog("停止录音");
      },
      faceUp: function () {
        //人脸检测上升
        $('.face-box').animate({'top': 110}, 1000);
      },
      faceDown: function () {
        //人脸检测下降
        $('.face-box').animate({'top': 2520}, 1000, function () {
          $("#scanning").css("display", "block");
          $("#face_fail").hide();
          $("#faceico").show();
          $("#faceing").show();
          $("#face_photo").hide();
          $("#face_message").hide();
        });
      },

      chat(text) {
        robot.displayClient(text);
        this.chatToServer(text);
      },
      chatToServer(text, content) {
        this.hideModal();
        if (content) {
          var self = this;

          // this.$api.askContent(text, content, function (data) {
          //   if (!!data) {
          //     self.showSemanticResponse(data)
          //   }
          // })
          this.core.requestSemanticAnswer(text, content, "", "newdetail", "", false);
        }
        else {
          var self = this;
          // this.$api.ask(text, function (data) {
          //   if (!!data) {
          //     self.showSemanticResponse(data)
          //   }
          // })


          this.core.requestSemanticAnswer(text, "", "", "newdetail", "", false);
        }
        //参数question:text,content:'',userId:'',platform:'',sessionId:''
      },
      fromFmapAndPopPoi: function (keywords) {
        var self = this;
        self.hideModal();
        //美食百度POI弹窗
        self.keyStatus = "" + (new Date()).getTime();
        console.log("百度POI弹窗=" + keywords);
        self.bmapPoiInfo.fromMsgType = "FMap001";
        self.bmapPoiInfo.keywords = keywords;
        self.showStatus.showBmapPoi = true;
      },
      meetingList: function (data) {
        var self = this;
        self.meetingListInfo = data;
        self.showStatus.showModal = true;
      },
      meetingDetail: function (data) {
        var self = this;
        self.hideModal();
        self.data = data;
        self.showStatus.showMeetingDetail = true;
      },
      clickHelp() {
        let self = this;
        self.hideModal();

        self.showStatus.showHelp = true;
        self.clickMenuDetail("好的，您可以查看以下的菜单");
      },
      gotoMenu(showWhat) {
        let self = this;
        self.hideModal();
        for (var key in this.showStatus) {
          if (showWhat == key) {
            this.showStatus[key] = true
          }
        }
        let ttsContennt = '';
        switch (showWhat) {
          case 'showFoodListBox': {
            ttsContennt = '贵州可是美食之都呀，好吃的实在是太多了，不信你看'
            break;
          }
          case 'showMeetingStatistics': {
            ttsContennt = '今年数博会安排了人工智能、数据安全、万物完全等几大类专题会议，您可以选择感兴趣的内容进行查看或者直接告诉我'
            break;
          }
          case 'showScenicListBox': {
            ttsContennt = '这些都是我大贵阳的著名风景区，让我们一起畅游贵阳山水'
            break;
          }

        }
        self.clickMenuDetail(ttsContennt);

      },
      openFoodDetail(text, img) {
        let self = this;
        self.hideModal();
        self.keyStatus = "" + new Date();
        console.log("1111text=" + text + "  img=" + img);
        self.foodDetailInfo.name = text;
        self.foodDetailInfo.img = img;
        self.showStatus.showFoodDetail = true;
      },

      openSpecialtyDetail(text, img) {
        let self = this;
        self.hideModal();
        self.keyStatus = "" + new Date();
        console.log("1111text=" + text + "  img=" + img);
        self.specialtyDetailInfo.name = text;
        self.specialtyDetailInfo.img = img;
        self.showStatus.showSpecialtyDetail = true;
      },

      openShoppingDetail(text, img) {
        let self = this;
        self.hideModal();
        self.keyStatus = "" + new Date();
        console.log("Shopping text=" + text + "  img=" + img);
        self.shoppingDetailInfo.name = text;
        self.shoppingDetailInfo.img = img;
        self.showStatus.showShoppingDetail = true;
      },
      //贵阳名人
      openHumanAndCultureDetail(text, img, title) {
        let self = this;
        self.hideModal();
        self.keyStatus = "" + new Date();
        console.log("人文::text=" + text + "  img=" + img + "  title=" + title);
        self.HumanAndCultureDetailInfo.name = text;
        self.HumanAndCultureDetailInfo.img = img;
        self.HumanAndCultureDetailInfo.title = title;
        self.showStatus.showHumanAndCultureDetail = true;
        setTimeout(function () {
          //视频测试
          self.hideModal();
          self.$api.askContent('GuiYangCityIntroduceVideo', "",  r => {
            if(r.type == '103'){
              self.viedourl = r.url;
              self.showStatus.showVideo = true;
            }
          })
        }, 7000);
      },

      openScenicDetail(text, imgDetail) {
        let self = this;
        self.keyStatus = "" + new Date();
        self.hideModal();
        console.log("1111text=" + text + "  img=" + imgDetail);
        self.scenicDetailInfo.name = text;
        self.scenicDetailInfo.img = imgDetail;
        self.showStatus.showScenicDetail = true;
      },
      fromPoiShowWindow: function (poiInfo, item) {
        let self = this;
        console.log('from bmap poi: ', poiInfo, item);
        self.bmapNavInfo.fromMsgType = poiInfo.fromMsgType;
        if (poiInfo.fromMsgType == 'F0002' || poiInfo.fromMsgType == '300') {//美食或者附近的美食
          if (item) {
            self.storeInfoData.name = item.title;
            self.storeInfoData.tel = item.phoneNumber;
            self.storeInfoData.addr = item.address;
            self.storeInfoData.type = item.tags;
            self.storeInfoData.point = [item.point.lng, item.point.lat];
            self.storeInfoData.keywords = poiInfo.keywords;
            self.hideModal();
            self.showStatus.showMallInfo = true;
          }
          // }else if(poiInfo.fromMsgType=='500') {
          //   var itemNav = {keywords:poiInfo.keywords,name:item.title,point:[item.point.lng,item.point.lat]};
          //   self.showBmapNav(itemNav);
          // }else if(poiInfo.fromMsgType=='FMap001'){
          //   var itemNav = {keywords:poiInfo.keywords,name:item.title,point:[item.point.lng,item.point.lat]};
          //   self.showBmapNav(itemNav);
        } else {
          //其他模块
          var itemNav = {keywords: poiInfo.keywords, name: item.title, point: [item.point.lng, item.point.lat]};
          self.showBmapNav(itemNav);
        }
      },
      showBmapPoi: function (info) {
        let self = this;
        self.keyStatus = "" + new Date();
        self.bmapPoiInfo.keywords = info.keywords;
        self.showStatus.showBmapPoi = true;
        self.showStatus.showBmapNav = false;
      },
      showBmapNav: function (item) {
        let self = this;
        self.keyStatus = "" + new Date();
        console.log('from mall: ', item);
        if (item) {
          self.hideModal();
          self.bmapNavInfo.keywords = item.keywords;
          self.bmapNavInfo.title = item.name;
          self.bmapNavInfo.point = item.point;
          self.showStatus.showBmapNav = true;
        }
      },
      getMeetings: function (question) {
        var self = this;
        self.hideModal();
        self.$api.get('meeting/searchList?question=' + question, r => {
          console.log(r.data)
          if (r.data == null || r.data[0] == undefined || r.data[0].length == 0) {
            //  self.core.startTts('很抱歉没有找到相关的信息，你可以这样问我：关于人工智能的会议有哪些', '');
            xiaoiChat(self, -1, '很抱歉没有找到相关的信息，你可以这样问我：关于人工智能的会议有哪些');
          } else if (r.data.length == 1 && r.data[0].length == 1) {
            // self.core.startTts('已为您找到' + question + "的信息", '');
            xiaoiChat(self, -1, '已为您找到' + question + "的信息");

            self.data = r.data[0][0];
            self.showStatus.showMeetingDetail = true;

          } else {
            self.meetingListInfo = r.data;
            //  self.core.startTts("已为您找到相关的会议信息， 请查看", '');
            xiaoiChat(self, -1, "已为您找到相关的会议信息， 请查看");
            self.showStatus.showModal = true;
          }
        })
      },
      getVedio: function(){
        debugger;
        var self = this;
        //视频测试
        self.hideModal();
        self.$api.askContent('GuiYangCityIntroduceVideo', "",  r => {
          if(r.type == '103'){
            self.viedourl = r.url;
            self.showStatus.showVideo = true;
          }
        })

      },
      openHotelDetail: function (text, img) {
        let self = this;
        self.hideModal();
        self.hotelKeyStatus = "" + new Date();
        console.log("22221text=" + text + "  img=" + img);
        self.hotelDetailInfo.name = text;
        self.hotelDetailInfo.img = img;
        self.showStatus.showHotelDetail = true;
      },
      clickMenuDetail: function (text) {
        let self = this;
        clearTimeout(self.speakTimer);
        self.core.cancelPendingTts();
        self.core.startTts(text, '');
        userChat(text);
      },
      openMap(name) {
        this.core.cancelPendingTts();
        if (device.posiType !== 'other') {
          this.$router.push({name: 'map', params: {name: name}});
        } else {
          this.fromFmapAndPopPoi(name);
        }
      }
    },
    beforeDestroy() {
      this.stopVoice();
      socket.close();
      document.querySelector('body').setAttribute('style', 'background:url("../../static/images/touch/bg.png") repeat')
    },
    beforeCreate() {
      document.querySelector('body').setAttribute('style', '')
    },

    mounted() {
      let self = this;
      // self.getMeetings("大数据与公共服务");
      let faceDistance;

      if (this.$route.params.userData) {
        self.user = this.$route.params.userData;
        if (self.user.userUrl) {
          self.userIcon = self.user.userUrl;

        } else {
          self.userIcon = '/static/index/images/user.jpeg'
        }
      }

      socket = new WebSocket(wsServer);
      // socket = new WebSocket('ws://192.168.160.40:11013');
      // socket = new WebSocket('ws://192.168.160.212:11013');
      this.$router.afterEach(function () {
        socket.close();
        if (actFlag) {
          clearInterval(actFlag);
        }
        // if (asrFlag) {
        //   clearInterval(asrFlag);
        // }
        console.log("close socket");
      });
      socket.onclose = function () {
        console.log("web channel closed");
      };
      socket.onerror = function (error) {
        console.log("web channel error: " + error);
      };
      socket.onopen = function () {
        console.log("WebSocket connected, setting up QWebChannel.");
        new QWebChannel(socket, function (channel) {
          // make core object accessible globally
          core = channel.objects.core;
          self.core = core;
          // console.log(self.core)
          $("#btn1").click(function(){
            //alert("Text: " + $("#test").val());
            core.debugText($("#test").val());
          });

          if (self.$route.params.keyword) {
            // 显示地图导航弹窗
            self.fromFmapAndPopPoi(self.$route.params.keyword);
          } else if (self.$route.params.question) {
            self.core.debugText(self.$route.params.question);
          } else {
            welcome();
          }

          // 知识：王浩先生，您好。欢迎您参加数博会。
          // 知识：我是机器人小i
          // 知识：关于今年数博会或贵阳的的信息，您都可以向我咨询。

          //语音识别结果
          core.voiceRecognizedEvent.connect(self.voiceRecognizedResult);

          //语义回复结果
          core.semanticResponseEvent.connect(self.showSemanticResponse);


          //人脸检测
          // core.faceDetectEvent.connect(self.showFace);

          //人脸识别
          // core.faceRecognizeResultEvent.connect(self.showFaceRecognizeResult);


          //状态检测
          core.statusChangeEvent.connect(self.showStatus);

          //显示三维人像显示
          core.setAvatarVisible(true);
          document.querySelector('body').setAttribute('style', 'background:url("../../static/images/touch/bg.png") repeat')

          //初始化人脸识别和开启语音
          //_self.loadinit();

          // self.chatS('');
          self.startVoice();

          //-----------人脸识别模块start------------------------------------------------------------------------------------
          // asrFlag = setInterval(function face_asr() {
          //   core.startFaceRecognize(5);
          // }, 100);
          //
          // core.faceRecognizeResultEvent.connect(showFaceRecognizeResultEvent);
          //
          // function showFaceRecognizeResultEvent(asrmsg) {
          //   console.log("人脸查找人名: " + asrmsg);
          //   if (asrmsg) {
          //     asrmsg = JSON.parse(asrmsg);
          //     if (asrmsg.records) {
          //       if (asrmsg.records.length > 0) {
          //         // debugger;
          //         userName = asrmsg.records[0].user_name;
          //         // console.log('vip::::' + asrmsg.records[0].user_name);
          //       }
          //     }
          //   }
          // }

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
          let isAppear = false;
          core.faceDetectEvent.connect(showFaceDetectEvent);

          function showFaceDetectEvent(faceAppearred, faceDetails) {
            if (faceAppearred) //出现人脸。
            {
              isAppear = false;
              sw.Stop();
              sw.Start();

            }
            else //人脸消失。
            {
              faceDtl = null;
              isAppear = true;
              // console.log("人脸消失。" + sw.Seconds() + ' s');
              sw.Start();
            }
          }

          var axios = require('axios');
          core.faceDetectUpdateEvent.connect(showFaceDetectUpdateEvent);

          function showFaceDetectUpdateEvent(faceDetails) {

            // console.log('获取摄像头距离:'+faceDetails)
            faceDtl = JSON.parse(faceDetails);
            if (faceDtl) {
              var rqdata = '{' +
                '"location_left":' + faceDtl.staring.location_left + ',' +
                '"location_top":' + faceDtl.staring.location_top + ',' +
                '"location_width":' + faceDtl.staring.location_width + ',' +
                '"location_height":' + faceDtl.staring.location_height + ',' +
                '"yaw":' + faceDtl.staring.yaw + ',' +
                '"pitch":' + faceDtl.staring.pitch +
                '}';
              getDistance(rqdata);
              console.log('res距离:' + faceDistance);
              // console.log('用户距离 心跳：' + faceDtl.staring.distance_mm);
              if (isWelcome) {
                if (faceDtl.staring.distance_mm < 1700) {
                  // welcome();
                }
              }
            }
            sw.Stop();
            sw.Start();
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
                faceDistance = '0';
              });
          }

          //10秒后依然无人，送宾待机
          faceFlag = setInterval(function () {

            if (sw.Seconds() > 10 && isAppear) {
              // console.log("——————————————————————————没人了消失。" + sw.Seconds() + ' s');
              sw.Stop();
              sw.Start();
              goodbye();
            }
            else if (faceDtl) {
              if (faceDistance > 50000) {
                console.log('距离太远送宾');
                sw.Stop();
                sw.Start();
                goodbye();
              }
            }

          }, 400);

          function welcome() {
            // console.log("INDEX心跳检测迎宾距离——————" + faceDtl.staring.distance_mm);
            isWelcome = false;
            let isvip = 'normal';
            var qs = '接待普通用户';

            // var welcomeText = '您好！很高兴认识您，我是既聪明又可爱的机器人，您有什么需要我为您服务的吗？';
            if (self.user && self.user.userName) {
              qs = self.user.userName;
              isvip = 'vip';
            }

            self.chatToServer(qs, isvip);
          }

          function goodbye() {
            self.user = null;
            console.log('GOODBYE！');
            clearInterval(faceFlag);
            self.chatToServer('送宾', '送宾');
          }

          //-----------人脸识别模块end------------------------------------------------------------------------------------
        });
      };

    }
  }
</script>
<style scoped>
  .totouch {
    width: 120px;
    height: 120px;
    position: absolute;
    right: 40px;
    top: 850px;
    z-index: 99;
    cursor: pointer;
  }

  .totouch img {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }

  .outerrow {
    box-sizing: border-box;
    width: 120px;
    height: 120px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    opacity: 0.5;
    /*border:1px solid #46b0c5;*/
    border-radius: 50%;
    background: #46b0c5;
  }

  .outerrow1 {
    animation: run 3s infinite;
  }

  .outerrow2 {
    animation: run 3s infinite 1s;
  }

  @keyframes run {
    100% {
      transform: scale(1.6);
      opacity: 0;
    }
  }

  .modal-area {
    position: absolute;
    top: 700px;
    right: 40px;
    width: 1000px;
    height: 700px;
    text-align: center;
    text-align: -webkit-center;
    z-index: 1;
    /*background-color: #00baff;*/
  }

  .index {
    /*background: url("/static/images/bg.png");*/
    background-size: contain;
  }

  .user_msg {
    color: white;
  }

  .vip-user {
    position: absolute;
    top: 420px;
    right: 200px;
  }

  .help {
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 9999;
  }

</style>W



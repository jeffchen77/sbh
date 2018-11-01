<template>
  <div class="main ybg" v-on:click="startTimer">
    <!--<div class="pople"><img src="static/images/people.png"></div>-->
    <div class="vix">
      <a href="javascript:void(0)"><img src="static/images/zti1.png" @click="popupBox('MeetingAgenda')"></a>
      <a href="javascript:void(0)" class="ml15"><img src="static/images/zti2.png" @click="popupBox('selectMapBox')"></a>
      <a href="javascript:void(0)" class="ml15"><img src="static/images/zti3.png" @click="popupBox('HotInformationList')"></a>
    </div>
    <div class="qiandoa"><img src="static/images/yqiandao.png" v-on:click.stop="gotoGuestAuth"></div>
    <div class="htint" @click="switchSpeakType"><span>{{speakTypeText}}</span></div>
    <div class="st3">
      {{speakTypeTitle}}
    </div>
    <div class="hotcc">
      <span class="hz1" @click="triggerSubChat('400', 'GytContentBox')">贵阳通</span>
      <span class="hz2" @click="triggerSubChat('300', 'SbtContentBox')">数博通</span>
    </div>
    <div class="vino" v-if="stateList.welcomeStyle" >
      <!--height:500px;-->
      <div id="index_welcome"   v-if="stateList.welcomeStyle"   >
        <div class="votit"><span><i class="ic1"></i><i class="ic2"></i>您可以这样问我</span></div>

        <div class="obox mt40" id="hotQuestions">
          <div class="obti"></div>
          <div class="obzi"></div>
          <div class="obbg"></div>
          <div class="obbi"></div>
          <div class="obci">
            <div class="maxti list_lh">
              <ul>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[0]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[1]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[2]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[3]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[4]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[0]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[1]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[2]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[3]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[4]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[0]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[1]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[2]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[3]}}”</p></li>
                <li><p class="mt5 " name="daiji">“{{hotQuestions[4]}}”</p></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div @click="switchSpeakState" v-if="isSpeaking===false && speakType==='mic' " v-bind:style="{display:stateList.welcomeStyle}" class="mt40" ><img src="static/images/huat.png"></div>
      <div class="mt40" @click="switchSpeakState"  style="position: absolute;top: 600px;left: 0px;" v-if="(isSpeaking===true && speakType==='mic') || speakType==='free'" v-bind:style="{display:stateList.welcomeStyle}">
        <div class="yuav fr">
          <div class="yvti"></div>
          <div class="yvbi"></div>
          <div class="yvci">
            <p>{{welcomeChatContent}}</p>
            <voice></voice>
          </div>
        </div>
      </div>

    </div>

    <div  style="position: absolute;
    top: 1180px;
    left: 80px;
    width: 560px;" v-if="stateList.welcomeStyle">
      <div class="obox mt40">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p style="color:#a4a7ae">您可以直接点击您需要的服务，或者点击麦克风后告诉我您的需求。</p>
        </div>
      </div>
    </div>
    <div class="vino" id="index_chat" style="overflow-x: hidden;overflow-y: scroll;bottom: 1050px;top: 310px;" v-bind:style="{display:stateList.chatStyle}">
      <div v-for="(subItem,index) in chatListData"  :key="index">
        <div class="dtex mt40" v-if="subItem.type == 'left'">
          <div class="dti"></div>
          <div class="dbi"></div>
          <div class="dci">
            <p class="bounceIn animated" v-html="subItem.content"></p>
          </div>
        </div>

        <div class="obox mt40 tm7" v-if="subItem.type == 'right'">
          <div class="obti"></div>
          <div class="obzi"></div>
          <div class="obbg"></div>
          <div class="obbi"></div>
          <div class="obci">
            <p class="bounceIn animated" v-html="subItem.content"></p>
          </div>
        </div>
        <div id="sbtHtml" v-if="subItem.type == '300'">
          <sbt-content-box></sbt-content-box>
        </div>
        <div id="gytHtml" v-if="subItem.type == '400'">
          <gyt-content-box></gyt-content-box>
        </div>
        <div id="trafficHtml" v-if="subItem.type == '401'">
          <gytTrafficBox></gytTrafficBox>
        </div>
      </div>
    </div>
    <div @click="switchSpeakState" class="mt40" id="startChat" v-if="isSpeaking===false && speakType==='mic'" v-bind:style="{display:stateList.chatStyle}" style="position: absolute;top: 880px;left: 40px;">
      <img src="static/images/huat.png">
    </div>

    <div class="clearfix mt40" @click="switchSpeakState" style="position: absolute;top: 880px;left: 40px;left: 100px;" v-if="(isSpeaking===true && speakType==='mic') || speakType==='free'" v-bind:style="{display:stateList.chatStyle}">
      <div class="yuav fr">
        <div class="yvti"></div>
        <div class="yvbi"></div>
        <div class="yvci">
          <p>{{chatContent}}</p>
          <voice></voice>
        </div>
      </div>
    </div>


    <sbtContentBox class="animated zoomInDown" v-if="stateList.SbtContentBox"></sbtContentBox>
    <sbtBranchHallListBox class="animated zoomInDown" v-if="stateList.BranchHallList" @fireClose="afterClose('BranchHallList')"></sbtBranchHallListBox>
    <sbtBranchHallDetailBox :branchHallInfo="branchHallInfo" v-if="stateList.BranchHallDetail" :key="keyStatus" @fireClose="afterClose('BranchHallDetail')"></sbtBranchHallDetailBox>
    <sbtEnterpriseListBox class="animated zoomInDown" v-if="stateList.EnterpriseList" @fireClose="afterClose('EnterpriseList')"></sbtEnterpriseListBox>
    <sbtEnterpriseContentBox class="animated zoomInDown" v-if="stateList.EnterpriseContentBox" :enterpriseInfo="enterpriseInfo" :key="keyStatus" @fireClose="afterClose('EnterpriseContentBox')"></sbtEnterpriseContentBox>
    <sbtGuestListBox class="animated zoomInDown" v-if="stateList.GuestList" @fireClose="afterClose('GuestList')"></sbtGuestListBox>
    <sbtHotInformationListBox class="animated zoomInDown" v-if="stateList.HotInformationList" @fireClose="afterClose('HotInformationList')"></sbtHotInformationListBox>
    <sbtMeetingAgenda class="animated zoomInDown" v-if="stateList.MeetingAgenda"  @fireClose="afterClose('MeetingAgenda')"></sbtMeetingAgenda>
    <sbtMeetingDetailsBox :meetingInfo="meetingInfo" v-if="stateList.MeetingDetails" @fireClose="afterClose('MeetingDetails')"></sbtMeetingDetailsBox>
    <sbtAuditoriumDetailsBox class="animated zoomInDown" :auditoriumInfo="auditoriumInfo" v-if="stateList.AuditoriumDetails" :key="keyStatus" @fireClose="afterClose('AuditoriumDetails')"></sbtAuditoriumDetailsBox>
    <chat-news class="animated zoomInDown" :question="chatquestion" v-if="stateList.showChatNews" @fireClose="afterClose('showChatNews')"></chat-news>
    <gytContentBox class="animated zoomInDown" v-if="stateList.GytContentBox"></gytContentBox>
    <gytTrafficBox class="animated zoomInDown" v-if="stateList.Traffic"  @fireClose="afterClose('Traffic')"></gytTrafficBox>
    <gytFoodListBox class="animated zoomInDown" v-if="stateList.FoodList"  @fireClose="afterClose('FoodList')"></gytFoodListBox>
    <gytFoodDetailBox :foodInfo="foodInfo" v-if="stateList.FoodDetail" :key="keyStatus" @fireClose="afterClose('FoodDetail')"></gytFoodDetailBox>
    <gytCultureListBox class="animated zoomInDown" v-if="stateList.CultureList"  @fireClose="afterClose('CultureList')"></gytCultureListBox>
    <gytCultureContentBox :cultureInfo="cultureInfo" v-if="stateList.CultureContent" :key="keyStatus" @fireClose="afterClose('CultureContent')"></gytCultureContentBox>
    <gytHotelListBox class="animated zoomInDown" v-if="stateList.HotelList"  @fireClose="afterClose('HotelList')"></gytHotelListBox>
    <gytHotelContentBox :hotelInfo="hotelInfo" v-if="stateList.HotelContent" :key="keyStatus" @fireClose="afterClose('HotelContent')"></gytHotelContentBox>
    <gytShoppingListBox class="animated zoomInDown" v-if="stateList.ShoppingList"  @fireClose="afterClose('ShoppingList')"></gytShoppingListBox>
    <gytShoppingContentBox :shopInfo="shopInfo" v-if="stateList.ShoppingContent" :key="keyStatus" @fireClose="afterClose('ShoppingContent')"></gytShoppingContentBox>
    <gytSightsListBox class="animated zoomInDown" v-if="stateList.SightsList"  @fireClose="afterClose('SightsList')"></gytSightsListBox>
    <gytSightsContentBox :itemInfo="itemInfo" v-if="stateList.SightsContent" :key="keyStatus" @fireClose="afterClose('SightsContent')"></gytSightsContentBox>
    <gyt-traffic-q-r :mapdata="mapdata" v-if="stateList.TrafficQR" :key="keyStatus" @fireClose="afterClose('TrafficQR')"></gyt-traffic-q-r>
    <keep-alive>
      <sbt-meeting-map-box v-if="stateList.meetingMapBox" @fireClose="afterClose"></sbt-meeting-map-box>
    <pavilion-map-box v-if="stateList.pavilionMapBox" @fireClose="afterClose"></pavilion-map-box>
    </keep-alive>
  </div>
</template>
<script>
  import axios from 'axios'
  import chatNews from '@/components/sbt/sbt-chatNews'
  // Sbt components
  import sbtContentBox from '@/components/sbt/sbt-ContentBox.vue'
  import sbtBranchHallListBox from '@/components/sbt/sbt-BranchHallListBox'
  import sbtBranchHallDetailBox from '@/components/sbt/sbt-BranchHallDetailBox'
  import sbtEnterpriseListBox from '@/components/sbt/sbt-EnterpriseListBox'
  import sbtEnterpriseContentBox from '@/components/sbt/sbt-EnterpriseContentBox'
  import sbtGuestListBox from '@/components/sbt/sbt-GuestListBox'
  import sbtHotInformationListBox from '@/components/sbt/sbt-HotInformationListBox'
  import sbtMeetingAgenda from '@/components/sbt/sbt-MeetingAgendaBox'
  import sbtMeetingDetailsBox from '@/components/sbt/sbt-MeetingDetailsBox'
  import sbtAuditoriumDetailsBox from '@/components/sbt/sbt-AuditoriumDetailsBox'
  import sbtMeetingMapBox from '@/components/sbt/sbt-MapBox'
  import pavilionMapBox from '@/components/map/map-pavilion'
  // Gyt components
  import gytContentBox from '@/components/gyt/gyt-ContentBox'
  import gytTrafficBox from '@/components/gyt/gyt-trafficBox'
  import gytFoodListBox from '@/components/gyt/gyt-foodListBox'
  import gytFoodDetailBox from '@/components/gyt/gyt-foodDetailBox'
  import gytCultureListBox from '@/components/gyt/gyt-cultureListBox'
  import gytCultureContentBox from '@/components/gyt/gyt-cultureContentBox'
  import gytHotelListBox from '@/components/gyt/gyt-hotalListBox'
  import gytHotelContentBox from '@/components/gyt/gyt-hotelContentBox'
  import gytShoppingListBox from '@/components/gyt/gyt-shoppingListBox'
  import gytShoppingContentBox from '@/components/gyt/gyt-shoppingContentBox'
  import gytSightsListBox from '@/components/gyt/gyt-sightsListBox'
  import gytSightsContentBox from '@/components/gyt/gyt-sightsContentBox'
  import voice from '@/components/voice'
  import robot from '../../static/js/robot'
  import Swiper from '../../node_modules/swiper/dist/js/swiper.min'
  import gytTrafficQR from '@/components/gyt/gyt-trafficQR.vue'
  let timer;
  let actFlag; //晃动  TODO 后面交由深圳做
  let asrFlag; //人脸识别flag
  let loopFlag; //招揽flag
  let socket;
  export default {
    name: '',
    components: {
      chatNews,
      sbtContentBox,
      sbtBranchHallListBox,
      sbtBranchHallDetailBox,
      sbtEnterpriseListBox,
      sbtEnterpriseContentBox,
      sbtGuestListBox,
      sbtHotInformationListBox,
      sbtMeetingAgenda,
      sbtMeetingDetailsBox,
      sbtAuditoriumDetailsBox,
      gytContentBox,
      gytTrafficBox,
      gytFoodListBox,
      gytFoodDetailBox,
      gytCultureListBox,
      gytCultureContentBox,
      gytHotelListBox,
      gytHotelContentBox,
      gytShoppingListBox,
      gytShoppingContentBox,
      gytSightsListBox,
      gytSightsContentBox,
      gytTrafficQR,
      sbtMeetingMapBox,
      pavilionMapBox,
      voice
    },
    data() {
      return {
        //麦克风
        speakType: 'mic',
        speakTypeText: '话筒收音模式',
        speakTypeTitle : '点击切换为连续收音模式',
        isSpeaking: false,
        welcomeChatContent :"正在倾听您说话...",
        chatContent :"正在倾听您说话...",
        stateList: {
          welcomeStyle: true,// 欢迎页
          showChatNews:false,// 小博聊咨询
          SbtContentBox: false,// 数博通
          showSBTIndex: false,//数博通首页
          BranchHallList: false,// 分会场列表
          BranchHallDetail: false,// 分会场详情
          EnterpriseList: false,// 展商列表
          EnterpriseContentBox: false,//展商详情
          GuestList: false,// 嘉宾列表
          HotInformationList: false,// 热点咨询
          MeetingAgenda: false,// 会议议程
          MeetingDetails: false,// 会议议程详情
          AuditoriumDetails: false,// 会议厅详情
          GytContentBox: false,//贵阳通
          Traffic: false,// 交通
          FoodList: false,// 美食
          FoodDetail: false,// 美食详情
          CultureList: false,// 文化
          CultureContent: false,// 文化详情
          HotelList: false,// 住宿
          HotelContent: false,// 住宿详情
          ShoppingList: false,// 娱乐
          ShoppingContent: false,// 娱乐详情
          SightsList: false,// 景点
          SightsContent: false,// 景点详情
          TrafficQR:false, // 交通二维码
          meetingMapBox: false, // 会议导览 -- 会场
          pavilionMapBox: false, //企业导览 ---展馆
          chatStyle:'none'// 聊天对话
        },
        chatListData : [],
        animate:false,
        hotQuestions:[
          "贵阳有哪些人文景点",
          "数博会今年有哪嘉宾",
          "数博会有哪些黑科技",
          "你今天多大了",
          "你是机器人吗"
        ],
        keyStatus: '',
        enterpriseInfo: {},
        branchHallInfo: {},
        meetingInfo: {},
        auditoriumInfo: {},
        foodInfo: {},
        cultureInfo: {},
        hotelInfo: {},
        shopInfo: {},
        itemInfo: {},
        mapdata:{},
        chatquestion:''
      }
    },
    created(){
      //setInterval(this.scroll,3000)
    },
    methods: {
      startTimer:function(){
       if(this.$root.inSwiper == false){
         console.log("=====================threeDIndex_startTimer_current")
          let self = this;
          if(timer){
            clearTimeout(timer);
          }
          timer=setTimeout(function () {
            console.log("threeDIndex_from="+self.$root.from+"============="+self.$root.device);
            //30秒无人交互路由到待机页
            self.$router.push({path:'/StandBy',query:{device:self.$root.device, from:self.$root.from}});
          },30000);
        }else if(this.$root.inSwiper == true){
         console.log("=====================threeDIndex_startTimer_parent="+this.$parent.startTimer)
          if(this.$parent.startTimer != undefined){
            this.$parent.startTimer();
          }
        }
      },
      gotoGuestAuth:function(){
        console.log("threeDIndex_gotoGuestAuth_from="+this.$root.from+"============="+this.$root.device);
        this.$router.push({path:'/StandByGuestAuth',query:{device:this.$root.device, from:this.$root.from}});
      },
      scroll(){
        this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{      // 这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.hotQuestions.push(this.hotQuestions[0]);  // 将数组的第一个元素添加到数组的
          this.hotQuestions.shift();               // 删除数组的第一个元素
          this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },3000)
      },
      hideModal() {//隐藏弹框
      },
      switchSpeakState(e) {
        e.stopPropagation()
        this.startTimer();
        // 控制麦克风
        if (this.core) {
          this.core.cancelPendingTts();
          if (this.isSpeaking === false) //点击 “点击麦克风”
          {
            this.isSpeaking = !this.isSpeaking
            this.core.startVoiceRecognize()
          }else if (this.isSpeaking === true)//点击 “正在倾听”
          {
            this.isSpeaking = !this.isSpeaking

            debugger
            if(this.stateList.welcomeStyle) {//如果是在欢迎页
              if(this.welcomeChatContent != '正在倾听您说话...'){
                this.chatListData.unshift({"type":"left","content":this.welcomeChatContent})
                var p = document.getElementById('index_chat')
                p.scrollTop = 0
                //参数question:text,content:'',userId:'',platform:'',sessionId:''
                this.core.requestSemanticAnswer(this.welcomeChatContent, '', '', '', '',false)
              }
            }else{
              if(this.chatContent != '正在倾听您说话...'){
                this.chatListData.unshift({"type":"left","content":this.chatContent})
                var p = document.getElementById('index_chat')
                p.scrollTop = 0
                //参数question:text,content:'',userId:'',platform:'',sessionId:''
                this.core.requestSemanticAnswer(this.chatContent, '', '', '', '',false)
              }
            }
            this.core.stopVoiceRecognize()
            this.stateList.welcomeStyle = false;
            this.stateList.chatStyle = 'block';
          }
        }

      },
      openStatus(status) {
        if(status == 'wachingPoint') {
          this.core.requestSemanticAnswer('数博会看点', '', '', '', '',false)
          return;
        }
        for(var key in this.stateList){
          if(status == key) {
            this.stateList[key] = true
          }else{

            if(key=='welcomeStyle' || key=='chatStyle'){
              continue;
            }else{
              this.stateList[key] = false
            }
          }
        }
        if(status != 'welcomeStyle') {
          this.stateList['chatStyle'] = 'block'
        }
      },
      afterClose: function (boxName) {
        for (let i in this.stateList) {
          if (i == boxName) {
            this.stateList[i] = false
          }
        }
        if(boxName == 'selectPavMap') {
          this.stateList['meetingMapBox'] = true
          this.stateList['pavilionMapBox'] = false
        }
        if(boxName == 'selectMeetingMap') {
          this.stateList['pavilionMapBox'] = true
          this.stateList['meetingMapBox'] = false
        }
        console.log(this.stateList.chatStyle)
        console.log(this.stateList.welcomeStyle)
        // this.stateList.chatStyle = 'block'
      },
      popupBox: function (boxName) {
        for (let i in this.stateList) {

          if (i == boxName) {
            this.stateList[i] = true
          } else {
            if(i=='welcomeStyle' || i=='chatStyle'){
              continue;
            }else if(boxName=='selectMapBox'){
              if(this.$root.device=='device0'){
                this.stateList['meetingMapBox'] = true
                this.stateList['pavilionMapBox'] = false
              }else{
                this.stateList['pavilionMapBox'] = true
                this.stateList['meetingMapBox'] = false
              }
            }else{
              this.stateList[i] = false
            }

          }
        }
      },
      triggerSubChat: function (typeNum,boxName) {
        for (let i in this.stateList) {
          if (i != boxName) {
            this.stateList[i] = false
          }
        }
        // if(this.stateList.chatStyle == 'none') {
        //   this.stateList.welcomeStyle = false
        this.stateList.chatStyle = 'block'
        // }
        this.chatListData.unshift({"type":typeNum})
        var p = document.getElementById('index_chat')
        p.scrollTop = 0
      },
      switchSpeakType(e) {
        e.stopPropagation();
        this.startTimer();
        this.stateList.welcomeStyle = false;
        this.stateList.chatStyle = 'block';
        if (this.speakType === 'free') {
          //关闭收音,切换的到话筒说话模式
          let text="亲爱的游客，现在是话筒模式哦，您需要先点击一下话筒，然后再说话，这样小博才听得到喔！";
          this.chatListData.unshift({"type":"right","content":text})
          var p = document.getElementById('index_chat')
          p.scrollTop = 0
          this.speakType = 'mic';
          this.speakTypeText = '话筒收音模式';
          this.speakTypeTitle = '点击切换为连续收音模式';
          this.isSpeaking = false;
          if (this.core) {
            this.core.stopVoiceRecognize();
            this.core.cancelPendingTts();
            this.core.startTts(text);
          }
        } else {
          //打开收音，切换到自由说话模式
          let text="亲爱的游客，现在处于连续收音模式，您可以直接对着小博说出您的问题，小博会尽力为您解答喔！";

          this.chatListData.unshift({"type":"right","content":text})
          this.speakType = 'free';
          this.speakTypeText = '连续收音模式';
          this.speakTypeTitle = '点击切换为话筒收音模式';
          this.isSpeaking=true;

          if (this.core) {
            this.core.startVoiceRecognize();
            this.core.cancelPendingTts();
            this.core.startTts(text);
          }
        }
      },
      triggerTrafficQr: function(boxName, mapData){
        this.mapdata = mapData;
        this.openStatus(boxName);
      }
    },
    mounted(){
      var userName;
      if (this.$route.params.userData) {
        console.log('===========userName==========' + this.$route.params.userData.userName)
        console.log('===========userAttr==========' + this.$route.params.userData.userAttr)
        console.log('===========userUrl==========' + this.$route.params.userData.userUrl)
        userName = this.$route.params.userData.userName;
      }

      let self = this;
      let isWelcome = false;

      let faceDtl; //招揽信息
      //启动30秒无人交互timer检测
      this.startTimer();
      $(function () {
        $("div.list_lh").myScroll({
          speed: 15, // 数值越大，速度越慢
          rowHeight: 99 // li的高度
        });
      });
      // ibotEx联调sdf
      let baseUrl = "ws://192.168.160.40:11013";
      console.log("beggin socket");
      socket = new WebSocket(baseUrl);

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
            if (status === 1 && self.speakType === 'mic') {
              self.isSpeaking = false;
              core.stopVoiceRecognize();
            } else if (status === 1 && self.speakType === 'free') {
              // if (self.core) {
              //   self.core.startVoiceRecognize();
              // }
            }
          });

          // 语义引擎回复结果通知
          core.semanticResponseEvent.connect((msg) => {
            self.startTimer();
            msg = JSON.parse(msg);
            console.log(msg);

            if (self.speakType === 'free') {
              core.startVoiceRecognize()
            }
            //robot.displayServer(msg, self);
            if(msg.content){
              self.chatListData.unshift({"type":"right","content":msg.content})
              var p = document.getElementById('index_chat')
              p.scrollTop = 0
            }

            if(msg.speak) {//有speak的时候开始说话
              core.cancelPendingTts();
              core.startTts(msg.speak);
            }else if(msg.content){
              core.cancelPendingTts();
              core.startTts(msg.content);
            }
            if(msg.action) {//动作
              core.inputAction(msg.action);
            }
            if(msg.feel){//表情
              core.inputExpressionStatic(msg.feel);
            }

            switch (msg.type) {
              case '0':
              case '300': {
                //robot.displayServerHtml('sbtHtml');
                self.triggerSubChat('300', 'SbtContentBox')
                break;
              }
              case '301': {
                self.openStatus('EnterpriseList');
                break;
              }
              case '310': {
                self.openStatus('HotInformationList');
                break;
              }
              case '302' : {
                self.openStatus('GuestList');
                break;
              }
              case '303' : {
                self.openStatus('BranchHallList');
                break;
              }
              case '304' : {
                self.openStatus('MeetingAgenda');
                break;
              }
              case '305' : {
                //路由到签到界面
                self.$router.push({path:'/StandByGuestAuth'});
                break;
              }
              case '400': {
                //robot.displayServerHtml('gytHtml');
                self.triggerSubChat('400', 'GytContentBox')
                break;
              }
              case '401' : {
                // robot.displayServerHtml('trafficHtml');
                self.triggerSubChat('401', 'Traffic')
                break;
              }
              case '402' : {
                self.openStatus('FoodList');
                break;
              }
              case '403' : {
                self.openStatus('CultureList');
                break;
              }
              case '404' : {
                self.openStatus('HotelList');
                break;
              }
              case '405' : {
                self.openStatus('ShoppingList');
                break;
              }
              case '406' : {
                self.openStatus('SightsList');
                break;
              }
              case '1000' : {
                self.openStatus('showChatNews');
                break;
              }
              case '1001' : {
                //self.openStatus('showSBTIndex');
                robot.displayServerHtml('sbtHtml');
                break;
              }
              case '1002' : {// 企业详情
                self.keyStatus = "" + new Date();
                self.enterpriseInfo = {id: msg.id};
                self.openStatus('EnterpriseContentBox');
                break;
              }
              case '1003' : {// 分会场详情
                self.keyStatus = "" + new Date();
                self.branchHallInfo = {id: msg.id,image: msg.image, hallName: msg.name}
                self.openStatus('BranchHallDetail');
                break;
              }
              case '1004' : {// 会议议程详情
                self.keyStatus = "" + new Date();
                self.meetingInfo = {id: msg.id, meetingName:msg.name, meetingDetailTabIndex: '0'}
                self.openStatus('MeetingDetails');
                break;
              }
              case '1007' : {// 会议厅详情
                self.keyStatus = "" + new Date();
                self.auditoriumInfo = {id: msg.id,image: msg.image, name: msg.name}
                self.openStatus('AuditoriumDetails');
                break;
              }
              case '4002' : {// 美食详情
                self.keyStatus = "" + new Date();
                self.foodInfo = {text: msg.text,img: msg.img}
                self.openStatus('FoodDetail');
                break;
              }
              case '4003' : {// 文化详情
                self.keyStatus = "" + new Date();
                self.cultureInfo = {text: msg.text,img: msg.img}
                self.openStatus('CultureContent');
                break;
              }
              case '4004' : {// 住宿详情
                self.keyStatus = "" + new Date();
                self.hotelInfo = {text: msg.text,img: msg.img}
                self.openStatus('HotelContent');
                break;
              }
              case '4005' : {// 购物详情
                self.keyStatus = "" + new Date();
                self.shopInfo = {text: msg.text,img: msg.img, startlatLng: msg.startlatLng, endlatlng: msg.endlatlng}
                self.openStatus('ShoppingContent');
                break;
              }
              case '4006' : {// 景点详情
                self.keyStatus = "" + new Date();
                self.itemInfo = {text: msg.text,img: msg.img, startlatLng: msg.startlatLng, endlatlng: msg.endlatlng, id:msg.id}
                self.openStatus('SightsContent');
                break;
              }
              default: {

              }
            }
          });

          // 收到语音识别结果
          core.voiceRecognizedEvent.connect((text, flag) => {
            self.startTimer();
            console.log(text, flag);
            //self.hideModal();
            if (flag) {
              socket.onclose = function () {
                console.log("web channel closed");
              };
              socket.onerror = function (error) {
                console.log("web channel error: " + error);
              };

              // console.log(text, flag);
              self.stateList.welcomeStyle = false;
              self.stateList.chatStyle = 'block';
              //self.showFenhuichang = true;
              //robot.displayClient(text);
              // debugger
              self.chatListData.unshift({"type":"left","content":text})
              var p = document.getElementById('index_chat')
              p.scrollTop = 0
              //参数question:text,content:'',userId:'',platform:'',sessionId:''
              core.requestSemanticAnswer(text, '', '', '', '')
              self.welcomeChatContent = "正在倾听您说话...";
              self.chatContent = "正在倾听您说话...";
              // core.startVoiceRecognize()
            }else{
              if(self.stateList.welcomeStyle){//欢迎语
                self.welcomeChatContent = text;
              }else{
                self.chatContent = text;
              }


            }

            // //目前讯飞的接口返回的flag一直是false,所以手动请求语义
            // robot.displayClient(text)
            // core.requestSemanticAnswer(text, '', '', '', '')
          });

          actFlag = setInterval(function act_body() {
            // core.inputExpression('facial_badSmile', 1000) ;
            core.inputAction('idle')
          }, 7000);

          asrFlag = setInterval(function face_asr() {
            // core.inputExpression('facial_badSmile', 1000) ;
            core.startFaceRecognize(1);
          }, 500)

          function stopWatch() {
          }
          //已经收到人脸识别的结果
          core.faceRecognizeResultEvent.connect(showFaceRecognizeResultEvent);

          function showFaceRecognizeResultEvent(message) {
            console.log("asrMsg: " + message);
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
            let timeString = new Date().toLocaleTimeString();
            if (faceAppearred) //出现人脸。
            {
              isAppear = false;
              console.log("出现。" + sw.Seconds() + ", face details: " + faceDetails);
              // alert(loop_talk[0]);
              faceDtl = JSON.parse(faceDetails);
              if (faceDtl) {
                console.log("INDEX迎宾距离——————" + faceDtl.staring.distance_mm);
                if(isWelcome == false)
                {
                  if(faceDtl.staring.distance_mm<1700)
                  {
                    welcome();
                    isWelcome = true;
                    self.startTimer();
                  }
                }
              }
              sw.Stop();
              sw.Start();

            }
            else //人脸消失。
            {
              faceDtl = null;
              isAppear = true;
              console.log("人脸消失。" + sw.Seconds() + ' s');
              sw.Start();
            }
          }

          //10秒后依然无人，送宾待机
          let faceFlag = setInterval(function () {
            if (sw.Seconds() > 10 && isAppear) {
              console.log("——————————————————————————没人了消失。" + sw.Seconds() + ' s');
              sw.Stop();
              sw.Start();
              goodbye();
            }
          }, 100);

          $('p[name="daiji"]').bind("click", function () {
            self.stateList.welcomeStyle = false;
            self.stateList.chatStyle = 'block';
            let text = this.innerText;
            console.log(text);
            self.chatListData.unshift({"type":"left","content":text})
            core.requestSemanticAnswer(text, '', '', '', '');
          });

          //招揽循环话术start
          // var talkData  ;
          // axios.get('/static/resource/loop_talk.json').then(res => {
          //   talkData = res.data;
          //   talkData = talkData.split(",");
          //   console.log(talkData)
          //   // console.log('LOOP_TALK:_____________--'+loop_talk[0])
          // });
          //
          // let swZaolan = new stopWatch();
          // let i=0;
          // let loopCount=0;
          // loopFlag = setInterval(function loop_flag() {
          //   if(loopCount>0)
          //   {
          //     //招揽话术退出,待机
          //     loopCount = 0;
          //     goodbye();
          //   }
          //   if(i>4)
          //   {
          //     i=0;
          //     loopCount++;
          //   }
          //   core.startTts(talkData[i]);
          //   i++;
          // }, 10000)

          function welcome() {
            var welcomeText='尊敬的客户您好，欢迎来到数博会。您可以直接点击您需要的服务，或者点击麦克风告诉我您的需求';
            self.chatListData.unshift({"type":"right","content":welcomeText})
            core.inputAction('goodbye')
            core.startTts(welcomeText);
            clearInterval(loopFlag);
          }

          function goodbye() {
            clearInterval(faceFlag);
            clearInterval(actFlag);
            clearInterval(asrFlag);
            // self.$router.push({path: '/'});
          }

          // 操作指令，比如放大缩小等命令
          // core.operateEvent.connect(function (action) {
          //   console.log('指令接口')
          //   // console.log(arguments)
          //   robot.displayOperate(action)
          // });

          // 冒充语音识别的结果发送文字
          // core.debuggText('你好')

          // 立即打断机器人说话
          // core.cancelPendingTts()

          // 开始一次语音识别
          // core.startVoiceRecognize()

          // 开始语音合成
          // core.startTts()

          // 接受路由参数，显示相应的弹出层
          if(self.$route.query.question){
            console.log("get question="+self.$route.query.question);
            self.chatListData.unshift({"type":"left","content":self.$route.query.question});
            var p = document.getElementById('index_chat');
            p.scrollTop = 0;
            core.requestSemanticAnswer(self.$route.query.question, '', '', '', '');
          }

        });
      };
      // 大佬说中小博聊资讯点击路由到主界面
      if(self.$route.query.chatquestion){
        self.chatquestion = self.$route.query.chatquestion;
        self.openStatus('showChatNews');
        self.stateList.chatStyle = "none";
        self.stateList.welcomeStyle = true;

      }
    },
    destroyed:function () {
      console.log('threeDIndex_destoryed');
      socket.close();
      console.log("threeDIndex close socket");
      if (actFlag) {
        console.log("threeDIndex close actFlag");
        clearInterval(actFlag);
      }
      if (asrFlag) {
        console.log("threeDIndex close asrFlag");
        clearInterval(asrFlag);
      }
      if (loopFlag) {
        console.log("threeDIndex close loopFlag");
        clearInterval(loopFlag);
      }
      if(timer){
        console.log("threeDIndex close timer");
        clearTimeout(timer);
      }
    }
  }
</script>

<style scoped>
  @import'../../node_modules/swiper/dist/css/swiper.min.css';
  .anim{
    transition: all 5s;
  // margin-top: 0px;
  }
  .maxti {
    animation:mymove 5s infinite;
  }

  @keyframes mymove
  {
    from {top:200px;}
    to {top:0px;}
  }
  html {
    /*width: 1080px;*/
    /*height: 1920px;*/
    background-color: transparent;
  }

  #index_chat::-webkit-scrollbar {
    display: none;
  }

  .list_lh {
    height: 400px;
    overflow: hidden;
  }

  .list_lh li {
    padding: 35px;
  }

  .list_lh li.lieven {
    background: #F0F2F3;
  }

  .list_lh li p {
    height: 24px;
    line-height: 24px;
  }

  .list_lh li p a {
    float: left;
  }

  .list_lh li p em {
    width: 80px;
    font: normal 12px/24px Arial;
    color: #FF3300;
    float: right;
    display: inline-block;
  }

  .list_lh li p span {
    color: #999;
    float: right;
  }

  .list_lh li p a.btn_lh {
    background: #28BD19;
    height: 17px;
    line-height: 17px;
    color: #fff;
    padding: 0 5px;
    margin-top: 4px;
    display: inline-block;
    float: right;
  }


   .st3 {
    background: url(../../static/images/htmst.png) no-repeat center top;
    padding: 55px 24px 0;
    position: absolute;
    top: 550px;
    left: 1010px;
    width: 22px;
    color: #08edff;
    text-align: center;
    font-size: 16px
  }
</style>

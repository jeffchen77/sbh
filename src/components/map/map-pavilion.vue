<template>
  <div>
  <div class="map-box" style="width: 1037px;height: 1578px;z-index: 7;">
    <p class="cyclo"><img src="static/images/edg2.png" width="50" height="50" v-on:click="closeMapBox()"></p>
    <div class="mapimg">
      <map-core ref="map" v-on:show-enterprise="showEnterprise"></map-core>
    </div>
    <div class="mapled"><img src="static/images/maplind.png" width="5" height="72"></div>
    <div class="maptot"><em></em>当前地图：{{curPavilion.name}}</div>
    <div class="mst">
      <div class="msti"></div>
      <div class="msbi"></div>
      <div class="msci">
        <ul>
          <li :class="viewClass[0].cur?'cur':''" @click="selectView(0)">
            <i class="mic1"></i>企业视图
          </li>
          <li :class="viewClass[1].cur?'cur':''" @click="selectView(1)">
            <i class="mic2"></i>活动视图
          </li>
          <li :class="viewClass[2].cur?'cur':''" @click="selectView(2)">
            <i class="mic3"></i>服务视图
          </li>
        </ul>
      </div>
    </div>
    <div class="mrb">
      <p><img v-on:click="openChat" src="static/images/mapyuying.png"></p>
      <div class="muir">
        <div class="mrti"></div>
        <div class="mrbi"></div>
        <div class="mrci" style="height:160px">
          <ul>
            <li class="zg1 cur" ><span @click="tabSelect()">展馆</span>
              <div class="zgtt" v-show="tabpavilion">
                <div class="ztl"></div>
                <div class="ztr"></div>
                <div class="ztc clearfix">
                  <div id="swiperBannerPav" class="swiper-container">
                    <div class="swiper-wrapper">
                      <span  v-for="(item,index) in pavilionList"  :key="index" @click="selectPavilion(index);"
                            :class="pavilionClass[index].cur?'swiper-slide sel':'swiper-slide'">
                      <em>{{item.name}}</em></span>
                  </div>
                    <div class="swiper-pagination"></div>
                </div>
              </div>
              </div>
            </li>
            <li class="zg2" @click="selectMapBox()">会场</li>
          </ul>
        </div>
      </div>
      <p class="mt20" @click="backYourLocation()"><img src="static/images/mweizi.png"></p>
    </div>
    <div id="detail" class="ipimg" style="position:absolute; top:10%; left:20%">
      <div class="ind"><img src="static/images/maplind.png"></div>
      <div class="ipbg"></div>
      <div class="iti"></div>
      <div class="ibi"></div>
      <div class="ici">
        <div class="mtx">
          <p class="tit" align="center">{{curPavilion.name}}</p>
          <p align="center" class="mt10" v-html="curPavilion.description"></p>
        </div>
      </div>
    </div>
    <div id="entTemplate"  style="display: none;">
      <div class="popuoter">
        <div class="popinner">
      <div class="ipimg ipimg2">
        <div class="ind"><img src="static/images/maplind.png"></div>
        <div class="ipbg" style="position: relative"></div>
        <div class="iti"></div>
        <div class="ibi"></div>
        <div class="ici" style="height: 260px;">
          <div class="mtx" >
            <p class="tit" align="center">黑科技（看点）</p>
            <p class="mt15" align="center">
            </p>
          </div>
        </div>
      </div><div class="mapfer">
          <p><img src="/static/images/merm.png" class="=qr_img" style="height: 140px; width: 140px;"></p>
          <p class="mt10">手机扫码查看路线规划</p>
        </div>
        </div>
        </div>
    </div>
    <div id="actTemplate"  style="display: none;">
      <div class="popuoter">
        <div class="popinner">
          <div class="mapfer mapfer1" style="position: absolute; left: -186px; top: 0px;">
            <p><img src="/static/images/merm.png" style="height: 140px; width: 140px;"></p>
            <p class="mt10">手机扫码查看路线规划</p>
          </div>
    <div class="ipimg ipimg2">
      <div class="ind" style="z-index: 0;"><img src="static/images/maplind.png"></div>
      <div class="ipbg"></div>
      <div class="iti"></div>
      <div class="ibi" style="z-index: 0;"></div>
      <div class="ici" style="height: 150px;">
        <div class="zt zt1" style="z-index: 0;"></div>
        <div class="mtx">
          <p class="tit" align="center" style="font-size: 28px; color: #1debff; overflow: hidden; white-space: nowrap;"></p>
          <p class="mt15" align="center"></p>
        </div>
      </div>
    </div>
     </div>
      </div>
    </div>

    <div id="serviceTemplate"  style="display: none;">
      <div class="serviceDialogouter">
        <div class="mapfer mapfer2" style="position: absolute; left: -186px; top: 0px;">
          <p><img src="/static/images/merm.png" style="height: 140px; width: 140px;"></p>
          <p class="mt10">手机扫码查看路线规划</p>
        </div>
    <div class="ipimg ipimg2">
      <div class="ind"><img src="static/images/maplind.png"></div>
      <div class="ipbg" style="position: relative"></div>
      <div class="iti"></div>
      <div class="ibi"></div>
      <div class="ici" style="height: 110px;">
        <div class="mtx">
          <p class="tit" align="center" style="font-size: 28px; color: #1debff; overflow: hidden; white-space: nowrap;"></p>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
    <enterprise-content-box :enterpriseInfo="enterpriseInfo" v-if="showdetail" @fireClose="afterEnterpriseClose()"></enterprise-content-box>
    <sbt-map-chat v-if="chatBox"></sbt-map-chat>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
import {device, fmap, deviceConfig, QRUrl, gaodeurl, serverFmapUrl} from '../../utils/constant'
import Vue from 'vue'
import mapCore from './mapav.vue'
import enterpriseContentBox from '../sbt/sbt-EnterpriseContentBox.vue'
import sbtMapChat from '@/components/sbt/sbt-mapChat.vue'
export default {
  name: '',
  props: {
    // 父组件
    itemInfo: {
      type: Object
    }
  },
  components: {
    mapCore,
    enterpriseContentBox,
    sbtMapChat
  },
  data () {
    return {
      pavIndex: 0,
      tabpavilion: false,
      curPavilion: {name: '', description: '', code: '', center: {x: 0, y: 0, groupID: 1}},
      curView: 0,
      pavilionList: [{name: '1号展馆',code: 'p1', description: '人工智能,大数据峰会1'},
        {name: '2号展馆',code: 'p2', description: '人工智能,大数据峰会2'},
        {name: '3号展馆',code: 'p3', description: '人工智能,大数据峰会3'},
        {name: '4号展馆',code: 'p4', description: '人工智能,大数据峰会4'},
        {name: '5号展馆',code: 'p5', description: '人工智能,大数据峰会5'},
        {name: '6号展馆',code: 'p6', description: '人工智能,大数据峰会6'}],
      pavilionClass: [
        {cur: false},
        {cur: false},
        {cur: false},
        {cur: false},
        {cur: false},
        {cur: false}],
      viewClass: [
        {cur: false},
        {cur: false},
        {cur: false}
      ],
      // 企业信息
      enterprise: {
        name: '',
        id: '',
        loc: {x:0,y:0,groupID:1}
      },
      enterpriseInfo: {id: '', showHighlights: [], endlatlng: '', name: ''},
      showdetail: false,
      activeList: [],
      chatBox:false,
      showlocation: false,
      currentDevice: deviceConfig.getConfig(this.$root.device),
      currentDeviceName: this.$root.device
    }
  },
  methods: {
    selectMapBox: function () {
      this.$emit('fireClose','selectPavMap')
    },
    closeMapBox: function () {
      this.$emit('fireClose','pavilionMapBox')
    },
    afterItemGoClose: function () {
      let self = this
      self.showlocation = false
    },
    openChat: function () {
      var self = this;
      self.chatBox = !self.chatBox;
    },
    backYourLocation: function () {
      let self = this
      self.$refs.map.changePav(self.currentDevice.posi)
    },
    afterEnterpriseClose: function () {
      let self = this
      self.showdetail = false
    },
    afterItemClose: function () {
      let self = this
      self.showlocation = false
    },
    unshowAllBox: function () {
      let self = this
      self.tabpavilion = false
      self.$refs.map.closePopWindow()
    },
  unshowOtherBox: function (x, y) {
    let self = this
    self.$refs.map.closeOtherPopWindow(x,y)
  },
    tabSelect: function () {
      let self = this
        self.pavilionClass.forEach(e => {
          e.cur = false
        })
        if (self.pavIndex != null) {
          self.pavilionClass[self.pavIndex].cur = true
        }
        self.tabpavilion = true
    },
    selectPavilion: function (cur) {
      let self = this
      self.$refs.map.closePopWindow()
      self.curPavilion.center = deviceConfig.getConfig('device'+(cur+1)).posi
      console.log('curPavilion.center:',self.curPavilion.center)
      self.$refs.map.changePav(self.curPavilion.center)
      self.pavilionClass.forEach(e => {
        e.cur = false
      })
      console.log(cur)
      self.pavIndex = cur
      self.pavilionClass[cur].cur = true
      self.curPavilion.name = self.pavilionList[cur].name
      self.curPavilion.description = self.pavilionList[cur].description
      self.curPavilion.code =  self.pavilionList[cur].code
      self.viewClass.forEach(e => {
        e.cur = false
      })
      self.viewClass[0].cur = true
      self.curView = 0
      self.$refs.map.init(self.curPavilion.center)
      $('#detail').show().delay(1000).fadeOut()
      self.tabpavilion = false
    },
    selectView: function (cur) {
      let self = this
      self.curView = cur
      self.tabpavilion = false
      self.viewClass.forEach(e => {
        e.cur = false
      })
      self.viewClass[cur].cur = true
      if (cur === 0) {
        self.$refs.map.closePopWindow()
        self.$refs.map.init(self.curPavilion.center)
      }
      if (cur === 1) {
        self.$refs.map.closePopWindow()
        self.$refs.map.init(self.curPavilion.center)
        self.$api.get('activity/listByPavCode?pavCode='+self.curPavilion.code, r => {
          self.activeList = []
          r.list.forEach((item, index) => {
            var obj={status: '', title: '', time: '', id: '', fmcoor: {x: 0, y: 0}}
            obj.title = item.name
            obj.time = item.time
            obj.id = item.comid
            if(item.status === 0){
              obj.status ='正在进行'
            }else{
              obj.status ='即将开始'
            }
            obj.fmcoor.x = item.coorx
            obj.fmcoor.y = item.coory
            self.activeList.push(obj)
          })
          self.activeList.forEach((item, index) => {
              self.activePopwin(item, index)
          })
        })
      }
      if (cur === 2) {
        self.$refs.map.init(self.curPavilion.center)
        self.$refs.map.search('洗手间')
        self.$refs.map.search('服务台')
      }
    },
    showEnterprise: function (enterprise) {
      let self = this
      self.chatBox = false;
      if (enterprise === 'close') {
        self.entShow = false
        return
      }
      if (enterprise === 'loadComplete') {
          if(self.itemInfo){
            self.tabSelect()
            self.selectPavilion(self.itemInfo.pavIndex)
            self.selectView(self.itemInfo.mapView)
            self.enterprise.id = self.itemInfo.enterpriseId
            self.enterprise.loc.x = self.itemInfo.location.x
            self.enterprise.loc.y = self.itemInfo.location.y
            if(self.itemInfo.mapView===0) {
              self.enterprisePopwin()
            }
          }else {
            self.tabSelect()
            console.log('current Device:',self.currentDeviceName)
            self.pavIndex = self.currentDeviceName.slice(6)-1
              self.selectPavilion(self.pavIndex)
              self.selectView(0)
          }

        return
      }
      if (enterprise === 'unshowall'){
        self.unshowAllBox()
        return
      }
      self.enterprise = enterprise

      if (self.curView === 0 || self.curView === 2) {
        if(self.enterprise.name == '洗手间' || self.enterprise.name == '服务台' || self.enterprise.name == '电梯' || self.enterprise.name == '楼梯') {
          self.servicePopwin()
        }else{
          self.$api.detailAsk(self.enterprise.name, (res) => {
            console.log(res)
            switch (res.type) {
              case 0:
              case '1002':
                self.enterprise.id = res.id
                self.enterprisePopwin()
                break
              default: {
                break
              }
            }
          })
        }
    } else if (self.curView === 1) {
        if(self.enterprise.name == '洗手间' || self.enterprise.name == '服务台' || self.enterprise.name == '电梯' || self.enterprise.name == '楼梯') {
          self.servicePopwin()
        }else {
          self.$api.detailAsk(self.enterprise.name, (res) => {
            console.log(res)
            switch (res.type) {
              case 0:
              case '1002':
                self.enterprise.id = res.id
                self.$api.get('activity/listByPavCodeAndEntId?pavCode=' + self.curPavilion.code + '&entId=' + self.enterprise.id, r => {
                  if (r.activity.name != undefined) {
                    var obj = {status: '', title: '', time: '', id: '', fmcoor: {x: 0, y: 0}}
                    obj.title = r.activity.name
                    obj.time = r.activity.time
                    obj.id = r.activity.comid
                    if (r.activity.status === 0) {
                      obj.status = '正在进行'
                    } else {
                      obj.status = '即将开始'
                    }
                    obj.fmcoor.x = r.activity.coorx
                    obj.fmcoor.y = r.activity.coory
                    self.$refs.map.closePopWindow()
                    self.activePopwin(obj, 0)
                  }
                })
                break
              default: {
                break
              }
            }
          })
        }
      }
    },
    enterprisePopwin: function () {
      let self = this
      self.$refs.map.closePopWindow()
      self.$api.get('enterprise/detail?id='+self.enterprise.id, r => {
        self.enterpriseInfo.id = self.enterprise.id
        self.enterpriseInfo.showHighlights = r.detail.showHighlights
        console.log(self.enterprise.loc.x, '------', self.enterprise.loc.y)
        var $template = $($("#entTemplate").html());
        var id = self.enterprise.loc.x + "_" + self.enterprise.loc.y;
        var qrImg = "";
        if(self.currentDeviceName != 'device0'){ // 判断当前设备，如果设备是在展馆，二维码显示室外地图导航
          var qrurl = serverFmapUrl + '?fmapId=' + self.currentDevice.fmapId + '%26startX=' + self.currentDevice.posi.x + '%26startY=' + self.currentDevice.posi.y + '%26startFloor=1%26endX=' +  self.enterprise.loc.x + '%26endY=' + self.enterprise.loc.y + '%26endFloor=1';
          qrImg = QRUrl + qrurl;
        }else{
          var qrurl = gaodeurl + '?from=' + self.currentDevice.currentGeoL.latitude + ',' + self.currentDevice.currentGeoL.longitude + ',当前位置%26to=' + self.currentDevice.exihibitionGeo.latitude + ',' +self.currentDevice.exihibitionGeo.longitude + ', 会场%26mode=car';
          qrImg = QRUrl + qrurl;
        }
        $template.find('.popinner').find('.mapfer').find('p').find('img').attr('src', qrImg)
        $template.find(".mtx").attr("id", id);
        if(self.enterpriseInfo.showHighlights != null && self.enterpriseInfo.showHighlights != undefined && self.enterpriseInfo.showHighlights.length > 0){
          for(var i=0; i< self.enterpriseInfo.showHighlights.length; i++){
            $template.find(".mt15").append('<div id="ent-list">'+(i+1)+'：'+self.enterpriseInfo.showHighlights[i]+'</div>');
          }
        }
        self.$refs.map.popWindow(self.enterprise.loc.x, self.enterprise.loc.y, 520, 385, $template.html())
        var MyComponent = Vue.extend({
          template: '<p class="mt30 mbtn " align="center"><a class="btn btn1 "  v-on:click="redirectToEnterprise(1)">前往展台</a> <a class="btn btn2 ml10 " v-on:click="redirectToEnterprise(2)">企业信息</a> </p>',
          methods:{
            redirectToEnterprise:function(tab) {
              self.chatBox = false;
              if (tab === 1) {
                  self.$refs.map.navigateTo(self.currentDevice.posi, self.enterprise.loc)
                  self.$refs.map.naviSimulate()
              } else if (tab === 2) {
                self.showdetail = true
              }
            }
          }
        })
        var myComponent = new MyComponent();
        myComponent.$mount();
        document.getElementById(id).appendChild(myComponent.$el);
      })
    },
    activePopwin: function (item,index) {
        let self = this
      var $template = $($("#actTemplate").html());
      var id = item.fmcoor.x + "_" + item.fmcoor.y + "_" + index;
      var qrImg = "";
      if(self.currentDeviceName != 'device0'){ // 判断当前设备，如果设备是在展馆，二维码显示室外地图导航
        var qrurl = serverFmapUrl + '?fmapId=' + self.currentDevice.fmapId + '%26startX=' + self.currentDevice.posi.x + '%26startY=' + self.currentDevice.posi.y + '%26startFloor=1%26endX=' +  item.fmcoor.x + '%26endY=' + item.fmcoor.y + '%26endFloor=1';
        qrImg = QRUrl + qrurl;
      }else{
        var qrurl = gaodeurl + '?from=' + self.currentDevice.currentGeoL.latitude + ',' + self.currentDevice.currentGeoL.longitude + ',当前位置%26to=' + self.currentDevice.exihibitionGeo.latitude + ',' +self.currentDevice.exihibitionGeo.longitude + ',会场%26mode=car';
        qrImg = QRUrl + qrurl;
      }
      $template.find('.popinner').find('.mapfer').find('p').find('img').attr('src', qrImg)
      $template.find(".mtx").attr("id", id);
      $template.find(".zt1").text(item.status);
      $template.find(".tit").text(item.title);
      $template.find(".mt15").text(item.time);
      self.$refs.map.popWindow(item.fmcoor.x, item.fmcoor.y, 540, 300, $template.html())
      var MyComponent = Vue.extend({
        template: '<p class="mt30 mbtn" style="height: 220px;" align="center" v-on:click.stop="closeOtherDialog(' + item.fmcoor.x + ',' + item.fmcoor.y +')">' +
        '<a class="btn btn1"  v-on:click="redirectToPav(' + item.fmcoor.x + ',' + item.fmcoor.y + ')">前往展台</a> ' +
        '<a class="btn btn2 ml10" v-on:click="redirectToEnterprise(\'' + item.id + '\')">企业信息</a> </p>',
        methods: {
          redirectToPav: function (x, y) {
            self.chatBox = false;
              var loc = {x: x, y: y, groupID: 1}
              self.$refs.map.navigateTo(self.curPavilion.center, loc)
              self.$refs.map.naviSimulate()
          },
          redirectToEnterprise: function (id) {
            self.chatBox = false;
            self.enterpriseInfo.id = id
            self.showdetail = true
          },
          closeOtherDialog:function (x, y) {
            self.chatBox = false;
            self.unshowOtherBox(x, y)
          }
        }
      })
      var myComponent = new MyComponent();
      myComponent.$mount();
      document.getElementById(id).appendChild(myComponent.$el);
    },
    servicePopwin: function () {
      let self = this
      self.$refs.map.closePopWindow()
      var $template = $($("#serviceTemplate").html());
      var id = self.enterprise.loc.x + "_" + self.enterprise.loc.y+"service";
      $template.find(".mtx").attr("id", id);
      var qrImg = "";
      if(self.currentDeviceName != 'device0'){ // 判断当前设备，如果设备是在展馆，二维码显示室外地图导航
        var qrurl = serverFmapUrl + '?fmapId=' + self.currentDevice.fmapId + '%26startX=' + self.currentDevice.posi.x + '%26startY=' + self.currentDevice.posi.y + '%26startFloor=1%26endX=' +  self.enterprise.loc.x + '%26endY=' + self.enterprise.loc.y + '%26endFloor=1';
        qrImg = QRUrl + qrurl;
      }else{
        var qrurl = gaodeurl + '?from=' + self.currentDevice.currentGeoL.latitude + ',' + self.currentDevice.currentGeoL.longitude + ',当前位置%26to=' + self.currentDevice.exihibitionGeo.latitude + ',' +self.currentDevice.exihibitionGeo.longitude + ',会场' + '%26mode=car';
        qrImg = QRUrl + qrurl;
      }
      $template.find('.mapfer').find('p').find('img').attr('src', qrImg)
      $template.find(".tit").text(self.enterprise.name);
      self.$refs.map.popWindow(self.enterprise.loc.x, self.enterprise.loc.y, 522, 282, $template.html())
      var MyComponent = Vue.extend({
        template: '<p class="mt30 mbtn servicembtn" align="center"><a class="btn btn1"  v-on:click="redirectTo()">前往</a></p>',
        methods:{
          redirectTo:function() {
            self.chatBox = false;
            self.$refs.map.navigateTo(self.curPavilion.center, self.enterprise.loc)
            self.$refs.map.naviSimulate()
          }
        }
      })
      var myComponent = new MyComponent();
      myComponent.$mount();
      document.getElementById(id).appendChild(myComponent.$el);
    }
  },
  mounted: function () {
    let self = this
    var swiperpav = new Swiper('#swiperBannerPav', {
      slidesPerView: 3,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        hide: false
      },
      observer: true,
      observeParents: true,
      watchOverflow: true
    })
    $('#detail').hide()
  },
  computed: {
  }
}
</script>

<style>
  fm-control-popmarker{
    z-index: 999;
  }
  .ipimg2 .ibi {
    background: url(/static/images/mapbox_23.png) no-repeat;
    height: 60px;
    width: 520px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .ipimg .ici {
    background: url(/static/images/mapbox_19.png) repeat-y;
    width: 520px;
    z-index: 2;
    padding-bottom: 20px;
  }

  .ipimg .iti {
    background: url(/static/images/mapbox_17.png) no-repeat;
    height: 50px;
    width: 520px;
    position: absolute;
    top: 0;
    left: 0;
  }

  .fm-control-popmarker{
    background-color: transparent !important;
    border: 0px !important;
  }

  .fm-control-popmarker>input[type="button"]{
    display: none;
  }

  .fm-control-popmarker>div{
    overflow:hidden !important;
  }

  .fm-control-popmarker-top{
    display: none;
  }

  .ipbg, .ibi{
    pointer-events: none;
  }

  .mt30{
    clear: both;
    position: absolute;
    height: 340px;
    width: 520px;
    top: 0;
    left: 0;
  }

  .btn1{
    bottom: 25px;
    position: absolute;
    left: 60px;
  }
  .normalbtn>.normalBtn1{
    bottom: 25px;
    position: absolute;
    left: 60px;
  }

  .btn2, .normalBtn2{
    position: absolute;
    bottom: 25px;
    right: 60px;
  }
  .normalbtn>.normalBtn2{
    position: absolute;
    bottom: 25px;
    right: 60px;
  }
  .fm-control-popmarker-bot{
    display: none;
  }

  .servicembtn, .normalbtn{
    clear: both;
    position: absolute;
    width: 520px;
    height: 180px;
  }

  .servicembtn>.btn1{
    bottom: 25px;
    position: absolute;
    left: 175px;
  }
  .cyclo{position:absolute; top:15px; right:15px; z-index:2}
  .mapfer{
    position: absolute;
    top: 51px;
    left: 514px;
    float: left;
  }
</style>

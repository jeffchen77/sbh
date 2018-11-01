<template>
  <div class="poli1">
    <div class="sjcon">
      <div class="tit">{{storeData.name}}</div>
      <div class="con">
        <div class="goto" @click="gotoPoiNav" style="z-index: 10"><i class="ico ico5"></i>带我去</div>
        <div class="snt tot" style="text-align: left">
          <span><i class="ico ico1"></i>商家电话: {{storeData.tel}}</span>
        </div>
        <div class="snt" style="text-align: left">
          <span><i class="ico ico3"></i>商家地址: {{storeData.addr}}</span>
        </div>
        <div class="snt" style="text-align: left">
          <div><span><i class="ico ico4"></i>商家类型: {{storeData.type}}</span></div>
        </div>
      </div>
    </div>
    <topic2 topicType="helpTopic" key="keyStatus"></topic2>
  </div>
</template>

<script>
  import topic2 from '@/components/new/sbt-topic2.vue'
export default {
  name: 'mall-info',
  components: {topic2},
  data () {
    return {
      storeData:{"name":"未知","tel": "未知", "addr":"未知","type":"未知",keywords:''},
      keyStatus:""
    }
  },
  props:{
    storeInfo: {
      type: Object,
      required: false
    }
  },
  created:function () {
    if(this.storeInfo!=undefined && this.storeInfo!=null){
      if(this.storeInfo.name!=undefined && this.storeInfo.name!=null){
        this.storeData.name = this.storeInfo.name;
      }
      if(this.storeInfo.tel!=undefined && this.storeInfo.tel!=null){
        this.storeData.tel = this.storeInfo.tel;
      }
      if(this.storeInfo.addr!=undefined && this.storeInfo.addr!=null){
        this.storeData.addr = this.storeInfo.addr;
      }
      if(this.storeInfo.type!=undefined && this.storeInfo.type!=null){
        this.storeData.type = this.storeInfo.type.join(" ");
      }
      if(this.storeInfo.keywords!=undefined && this.storeInfo.keywords!=null){
        this.storeData.keywords = this.storeInfo.keywords;
      }
    }
  },
  methods: {
    gotoPoiNav:function () {
      let self = this;
      self.$parent.$parent.showBmapNav(self.storeInfo);
    }
  },
  mounted: function (){
    let self = this;
    self.keyStatus = "" + new Date();
  }
}
</script>

<style scoped>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
</style>

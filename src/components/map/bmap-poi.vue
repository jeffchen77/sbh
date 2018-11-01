<template>
  <div>
    <div class="msxq">
      <div class="xqmap" style="width: auto;height: 470px;">
        <div class="title">{{poiTitle}}</div>
      <bmapPoiInner :itemInfo="itemInfo" ref="poiInner" :key="keyStatus"></bmapPoiInner>
    </div>
  <topic2 topicType="helpTopic" :key="keyStatus"></topic2>
  </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  import topic2 from '@/components/new/sbt-topic2.vue'
  import bmapPoiInner from '@/components/map/bmap-poi-inner.vue'
export default {
  name: '',
  components: {topic2,bmapPoiInner},
  props: {
    // 父组件传入
    itemInfo: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      keyStatus:'1',
      poiTitle: '',
      poiMsgType:''
    }
  },
  methods: {

  },
  mounted: function () {
    let self = this;
    if(self.itemInfo.fromMsgType ==='SM001') {
      self.poiTitle = '数博会热门地点';
      self.poiMsgType = 'SM001';
    }else{
      self.poiTitle = '已为您找到附近的'+self.itemInfo.keywords;
    }
  },
  computed: {
  },
  created:function () {
    this.keyStatus = "" + (new Date()).getTime();
  }
}
</script>

<style>
  @import '../../../static/0503/css/base.css';
  @import '../../../static/0503/css/style.css';
</style>

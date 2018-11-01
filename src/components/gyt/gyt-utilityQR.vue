<template>
  <div class="pobox">
    <div class="pocos"><img src="static/images/pocos.png" v-on:click="closeQRBox()"></div>
    <div class="erm">
      <p class="tit">{{itemGo.name}}</p>
      <div class="em"><span><!--<img :src="" width="216" height="216">--><img :src="QRUrl + gaodeurl + '?from=' + currentGeo.latitude + ',' + currentGeo.longitude + ',当前位置' + '%26to=' +this.itemGo.endlatlng + ',' + this.itemGo.name + '%26mode=car'" width="216" height="216"></span></div>
      <p class="emtx">扫描二维码，在手机上查看路线规划信息</p>
    </div>
  </div>
</template>

<script>
  import {currentGeo, gaodeurl, QRUrl} from '../../utils/constant'
export default {
  name: '',
  props: {
    itemGo: {
      type: Object,
      required: true
    }
  },
  data (){
    return {
      QRUrl: QRUrl,
      gaodeurl: gaodeurl,
      currentGeo: currentGeo
    }
  },
  methods: {
    closeQRBox: function () {
      let self = this
      self.$emit('fireClose')
    }
  }
}
</script>

<style scoped>

</style>

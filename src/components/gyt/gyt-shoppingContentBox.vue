<template>
  <div>
    <div class="cyedg" v-if="showdetail">
      <p class="img"><img v-bind:src="content.img" width="920" height="430"></p>
      <p class="cyclo"><img src="static/images/edg2.png" width="50" height="50" v-on:click="closeContentBox()"></p>
      <div class="cytext">
        <em></em>
        <div class="cyuu">
          <p class="tit">{{content.name}}</p>
          <p class ="heightauto" style="width:480px;height:240px;font-size: 24px;color: #fff" v-html="content.description"></p>
          <p class="cybtn">
            <span v-for="(lab,index) in content.label" :key="index" v-on:click="clickLabel(index)" style="font-size:22px">{{lab.name}}</span>
            <span v-on:click="clickShopGo()" style="font-size:22px">带我去</span>
          </p>
        </div>
      </div>
    </div>
    <gytUtilityQR :itemGo="content" v-if="showlocation" @fireClose="afterShopGoClose()"></gytUtilityQR>
  </div>
</template>

<script>
import gytUtilityQR from '@/components/gyt/gyt-utilityQR'
import { startlatLng } from '../../utils/constant'
export default {
  name: '',
  components: { gytUtilityQR },
  props: {
    shopInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showdetail: true,
      showlocation: false,
      startlatLng: startlatLng,
      content: {name: '', img: '', startlatLng: '', endlatlng: '', description: '', label: []}
    }
  },
  methods: {
    clickLabel: function (cur) {
      let self = this
      self.content.description = self.content.label[cur].content
    },
    clickShopGo: function () {
      let self = this
      self.showdetail = false
      self.showlocation = true
    },
    afterShopGoClose: function () {
      let self = this
      self.showdetail = true
      self.showlocation = false
    },
    closeContentBox: function () {
      let self = this
      self.$emit('fireClose')
    }
  },
  mounted: function () {
    let self = this
    self.content.img = self.shopInfo.img
    self.content.startlatLng = startlatLng
    self.$api.ask(self.shopInfo.text, (res) => {
      console.log(res)
      switch (res.type) {
        case 0:
        case '700':
          self.content.name = res.name
          self.content.description = res.profile
          self.content.label = res.label
          self.content.endlatlng = res.location
          break
        default: {
          break
        }
      }
    })
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <div class="cyedg" v-if="showdetail">
      <p class="img"><img v-bind:src="content.photo" width="920" height="430"></p>
      <p class="cyclo"><img src="static/images/edg2.png" width="50" height="50" v-on:click="closeBusinessDetailBox()"></p>
      <div class="cytext">
        <em></em>
        <div class="cyuu">
          <p class="tit">{{content.name}}</p>
          <p class="cycon">{{content.address}}</p>
          <p class="cybtn">
            <span @click="goFoodQR()">带我去</span>
          </p>
        </div>
      </div>
    </div>
    <gytUtilityQR :itemGo="content" v-if="showlocation" @fireClose="afterBusinessDetailBoxClose()"></gytUtilityQR>
  </div>
</template>

<script>
import gytUtilityQR from '@/components/gyt/gyt-utilityQR'
export default {
  name: '',
  components: { gytUtilityQR },
  props: {
    businessInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      locations:[],
      showdetail: true,
      showlocation: false,
      content: {name: '', photo: '', startlatLng: '', endlatlng: '', address: ''}
    }
  },
  methods: {
    goFoodQR: function () {
      let self = this
      self.showdetail = false
      self.showlocation = true
    },
    afterBusinessDetailBoxClose: function () {
      let self = this
      self.showdetail = true
      self.showlocation = false
    },
    closeBusinessDetailBox: function () {
      let self = this
      self.$emit('fireClose')
    }
  },
  mounted: function () {
    let self = this
    // console.log(self.businessInfo)
    self.content.name = self.businessInfo.name
    self.content.photo = self.businessInfo.photo
    self.content.address = self.businessInfo.address
    self.content.endlatlng = self.businessInfo.location
    // console.log(self.content)
  }
}
</script>

<style scoped>

</style>

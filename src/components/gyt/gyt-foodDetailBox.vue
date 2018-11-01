<template>
  <div>
    <div class="cyedg" v-if="showdetail">
      <p class="img"><img v-bind:src="content.img" width="920" height="430"></p>
      <p class="cyclo"><img src="static/images/edg2.png" width="50" height="50" v-on:click="closefoodDetailBox()"></p>
      <div class="cytext">
        <em></em>
        <div class="cyuu">
          <p class="tit">{{content.name}}</p>
          <p class="heightauto" style="width:480px;height:240px;font-size: 24px;color: #fff">{{content.description}}</p>
          <p class="cybtn">
            <span v-for="(lab,index) in content.label" :key="index" v-on:click="clickLabel(index)">{{lab.name}}</span>

            <span v-on:click="BusinessListBox()">人气商家</span></p>
        </div>
      </div>
    </div>
    <BusinessListBox :foodDetailBox="content" v-if="showlocation" @fireClose="afterfoodDetailBoxClose()"></BusinessListBox>
  </div>
</template>

<script>
import BusinessListBox from '@/components/gyt/gyt-BusinessListBox.vue'
export default {
  name: '',
  components: { BusinessListBox },
  props: {
    foodInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showdetail: true,
      showlocation: false,
      content: {name: '', img: '', description: '', label: []}
    }
  },
  methods: {
    clickLabel: function (cur) {
      let self = this
      self.content.description = self.content.label[cur].content
    },
    BusinessListBox: function () {
      let self = this
      self.showdetail = false
      self.showlocation = true
    },
    afterfoodDetailBoxClose: function () {
      let self = this
      self.showdetail = true
      self.showlocation = false
    },
    closefoodDetailBox: function () {
      let self = this
      self.$emit('fireClose')
    }
  },
  mounted: function () {
    let self = this
    self.content.img = self.foodInfo.img
    self.$api.ask(self.foodInfo.text, (res) => {
      console.log(res)
      switch (res.type) {
        case 0:
        case '300':
          self.content.name = res.name
          self.content.description = res.profile
          self.content.label = res.label
          break
        default: {
          break
        }
      }
    })
    // call robot
  },
  computed: {
  }
}
</script>

<style scoped>

</style>

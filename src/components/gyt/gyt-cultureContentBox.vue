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
            <span v-for="(lab,index) in content.label" :key="index" v-on:click="clickLabel(index)" style="font-size:19px">{{lab.name}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    // 父组件是列表
    cultureInfo: {
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
    closeContentBox: function () {
      let self = this
      self.$emit('fireClose')
    }
  },
  mounted: function () {
    let self = this
    self.content.img = self.cultureInfo.img
    self.$api.ask(self.cultureInfo.text, (res) => {
      console.log(res)
      switch (res.type) {
        case 0:
        case '800':
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

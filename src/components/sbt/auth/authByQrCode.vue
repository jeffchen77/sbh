<template>
  <div class="kapn">
    <div class="kati">嘉宾认证</div>
    <div class="kaer">
      <div class="ker">
        <p class="kerimg"><img src="static/images/kperm.png" width="282" height="282"></p>
        <p class="mt40">为了保护您的隐私，请扫描二维码在手机上进行认证</p>
      </div>
    </div>
    <div class="tgvx" v-on:click="toCardPage">使用嘉宾证认证</div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  methods: {
    toCardPage: function () {
      this.$emit('toCardPage');
    }
  },
  mounted: function () {
  },
  computed: {
  },
}
</script>
<style scoped>

</style>

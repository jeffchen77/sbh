<template>
  <div>
  <div class="kapn kapn2" v-show="status == 1">
    <div class="kati">嘉宾认证</div>
    <div class="wcur">
      <p>{{person}}</p>
      <p>欢迎您参加2018年数博会</p>
    </div>
  </div>
    <div class="kapn kapn3" v-show="status != 1">
      <div class="kati">嘉宾认证</div>
      <div class="kaci">您并未进行注册。您可以扫描下方二维码来了解更多数博会咨询</div>
      <div class="uioop">
        <dl class="clearfix">
          <dt><img src="static/images/kperm.png" width="282" height="282"></dt>
          <dd>
            <p>18数博</p>
            <p class="jwt">数博会官方App</p>
            <p class="mt20"><img src="static/images/kpg5.png" v-on:click="reAuth"></p>
          </dd>
        </dl>
      </div>
    </div>
    <hotRecommend></hotRecommend>
  </div>
</template>
<script>
import hotRecommend from './hotRecommend'
export default {
  name: '',
  data () {
    return {
    }
  },
  components: { hotRecommend },
  props: ['person', 'status'],
  mounted: function () {
  },
  computed: {
  },
  methods: {
    reAuth: function () {
      this.$emit('reAuth');
    }
  },
}
</script>
<style scoped>

</style>

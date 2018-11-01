<template>
  <div class="hxbx">
    <div class="huser">
      <div class="hra"></div>
      <div class="hrb"></div>
      <div class="hrc"><img :src=user.userUrl width="110" height="110" style="border: #00baff 1px solid;border-radius: 50%"></div>
    </div>
    <div class="name">{{user.userName}}</div>
    <div class="cont">
      <p>{{user.userAttr}}</p>
      <!--<p>董事长兼首席执行官</p>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    components: {  },
    data () {
      return {
        // user: {
        //   userUrl:'http://192.168.160.38:8085/api/attachment/Show?id=16',
        //   userName:'晏正腾',
        //   userAttr:'大佬'
        // }
      }
    },
    methods: {

    },
    props: {
      user: {
        required: true
      }
      // userUrl:'http://192.168.160.38:8085/api/attachment/Show?id=16',
      // // userName:'晏正腾',
      // userAttr:'大佬',
    },
    mounted: function () {

    }
  }
</script>

<style scoped>
  .hxbx{background:url(/static/images/hxbx_03.png) no-repeat; width:344px; height:410px; text-align:center; padding:50px 0}
  .hxbx .name{font-size:30px; color:#fff; padding:20px 0}
  .hxbx .cont{font-size:20px; color:#9e9fa6}

  .huser{width:162px; height:162px; position:relative; margin:auto}
  .huser .hra{width:162px; height:162px; position:absolute; top:0; left:0; background:url(/static/images/kka.png) no-repeat center center; z-index:1}
  .huser .hrb{width:162px; height:162px; position:absolute; top:0; left:0; background:url(/static/images/kkb.png) no-repeat center center; z-index:2}
  .huser .hrc{width:110px; height:110px; position:absolute; top:50%; left:50%; z-index:3; border:2px solid #1debff; margin:-57px 0 0 -57px; text-align:center;
    -moz-border-radius:100px;
    -webkit-border-radius:100px;
    border-radius:100px;
  }


</style>

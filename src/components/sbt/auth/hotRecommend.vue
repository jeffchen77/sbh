<template>
  <div class="hottj">
    <div class="htjti">热门推荐</div>

<!--    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <ul class="clearfix">
            <li><p><img src="static/images/kpy1.png" v-on:click="redirectMainPage(1,'餐饮')"></p></li>
            <li><p><img src="static/images/kpy2.png" v-on:click="redirectMainPage(1,'交通')"></p></li>
            <li><p><img src="static/images/kpy3.png" v-on:click="redirectMainPage(1,'景点')"></p></li>
            <li><p><img src="static/images/kpy4.png" v-on:click="redirectMainPage(1,'住宿')"></p></li>
          </ul>
        </div>

        <div class="swiper-slide">
          <ul class="clearfix">
            <li><p><img src="static/images/kd5.png" v-on:click="redirectMainPage(1,'娱乐')"></p></li>
            <li><p><img src="static/images/kd6.png" v-on:click="redirectMainPage(1,'人文')"></p></li>
          </ul>
        </div>

      </div>
    </div>-->
    <div class="clearfix box4">
      <marquee behavior="alternate" onmouseover="this.stop()" onmouseout="this.start()">
      <div class="border4">
        <div><img src="static/images/kpy1.png" v-on:click.stop="redirectMainPage('贵阳的美食')"></div>
        <div><img src="static/images/kpy2.png" v-on:click.stop="redirectMainPage('贵阳的交通')"></div>
        <div><img src="static/images/kpy3.png" v-on:click.stop="redirectMainPage('贵阳的景点')"></div>
        <div><img src="static/images/kpy4.png" v-on:click.stop="redirectMainPage('贵阳的住宿')"></div>
        <div><img src="static/images/kd5.png" v-on:click.stop="redirectMainPage('贵阳的娱乐')"></div>
        <div><img src="static/images/kd6.png" v-on:click.stop="redirectMainPage('贵阳的文化')"></div>
      </div>
      </marquee>
    </div>
    <ul class="clearfix">
      <li><p><img src="static/images/kpy5.png" v-on:click.stop="redirectMainPage('数博会看点')"></p></li>
      <li><p><img src="static/images/kpy6.png" v-on:click.stop="redirectMainPage('参会嘉宾')"></p></li>
      <li><p><img src="static/images/kpy7.png" v-on:click.stop="redirectMainPage('有哪些分会场')"></p></li>
      <li><p><img src="static/images/kpy8.png" v-on:click.stop="redirectMainPage('今年有哪些企业参加')"></p></li>
    </ul>
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
      redirectMainPage:function(question){
        console.log("question="+question);
        this.$router.push({path:'/threeDIndex', query:{device:this.$root.device, from:this.$root.from,question:question}});
      }
    },
    mounted: function () {
  /*    this.initSwiper();*/
    },
    computed: {
    },
  }
</script>
<style scoped>
  .box4{
    margin-left:118px;
    width: 694px;
    height: 225px;
    overflow: hidden;
  }

  .border4{
    width: 1060px;
/*    -webkit-animation:scrollText2 4s infinite  cubic-bezier(1,0,0.5,0) ;
    animation:scrollText2 4s infinite  cubic-bezier(1,0,0.5,0) ;*/
  }

  .border4 div{
    margin:20px 0;
    height: 184px;
    width: 175px;
    overflow: hidden;
    display: inline-block;
  }

  .border4:hover{
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
 }

@-webkit-keyframes scrollText2 {
0%{
transform: translateX(0px);
}
25%{
transform: translateX(-175px);
}
50%{
transform: translateX(-350px);
}
75%{
transform: translateX(-175px);
}
100%{
transform: translateX(0px);
}
}

@keyframes scrollText2 {
  0%{
    -webkit-transform: translateX(0px);
  }
  10%{
    -webkit-transform: translateX(-70px);
  }
  20%{
    -webkit-transform: translateX(-140px);
  }
  30%{
    -webkit-transform: translateX(-210px);
  }
  40%{
    -webkit-transform: translateX(-280px);
  }
  50%{
    -webkit-transform: translateX(-350px);
   }
  60%{
    -webkit-transform: translateX(-280px);
   }
  70%{
    -webkit-transform: translateX(-210px);
  }
  80%{
    -webkit-transform: translateX(-140px);
  }
  90%{
    -webkit-transform: translateX(-70px);
  }
  100%{
    -webkit-transform: translateX(0px);
   }
}
</style>

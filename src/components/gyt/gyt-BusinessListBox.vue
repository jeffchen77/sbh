<template>
  <div>
    <div class="pobox pobox5" v-if="showlist">
      <div class="pocos"><img src="static/images/pocos.png" v-on:click="closeBusinessListBox()"></div>
      <div class="hdimg" style="padding: 15px">
        <el-carousel indicator-position="none" id="elcarousel" :interval="4000" type="card" v-on:change="ch" style="top:18px">
          <el-carousel-item v-for="(x,index) in businessList" :key="index" >
              <div class="flashimg clearfix"><img v-bind:src="x.photo"  @click="businessDetail(index)" style="width:100%; height:100%;"></div>
          </el-carousel-item>
        </el-carousel>
        <div class="mt15">{{businessNage}}</div>
      </div>
    </div>
    <gytBusinessDetailBox :businessInfo="businessInfo" v-if="showdetail" @fireClose="afterBusinessClose()"></gytBusinessDetailBox>
  </div>

</template>
<script>
  import Element from 'element-ui';
  import Swiper from '../../../node_modules/swiper/dist/js/swiper.min'
  import '../../../node_modules/swiper/dist/css/swiper.min.css'
  import gytBusinessDetailBox from '@/components/gyt/gyt-businessDetailBox'
  export default {
    name: '',
    components: { gytBusinessDetailBox },
    props: {
      foodDetailBox: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        showlist:true,
        showdetail: false,
        businessInfo: {},
        businessNage: '',
        businessList: [],
      }
    },
    methods: {
      ch:function (index,oldIndex) {
        let self = this
        self.businessNage = self.businessList[index].name
      },
      businessDetail: function (x){
        let self = this
        self.showlist = false
        self.showdetail = true
        self.businessInfo = self.businessList[x]
      },
      afterBusinessClose: function () {
        let self = this
        self.showdetail = false
        self.showlist = true

      },
      closeBusinessListBox: function () {
        let self = this
        self.$emit('fireClose')
      },
      initData: function () {
        var self = this;
        self.show = true;
        self.$api.get('map/search?foodName=' + self.foodDetailBox.name, (res) => {
        console.log(res);
        self.businessList = res;
        });
      },
    },
    mounted: function () {
        this.initData();
        // call robot
    },
    computed: {
    }
  }
</script>

<style >
  .el-carousel__item:nth-child(2n) {
    /*background-color: #99a9bf;*/
  }
  .el-carousel__item:nth-child(2n+1) {
    /*background-color: #d3dce6;*/
  }
  .el-carousel__mask{
    width: 0%;
  }
  /*.mt15{
    width: 100%;
    position: absolute;
    !* top: 0px; *!
    text-align: center;
    bottom: 0px;
    !* align-items: center; *!
    !* display: flex; *!
    !* align-content: center; *!}*/

  .flashimg{width:380px; height:270px; overflow:hidden; margin:auto; border:3px solid #00c0ff;
    -moz-border-radius:10px;
    -webkit-border-radius:10px;
    border-radius:10px;
  }
  .flashimg img{width:100%; height:100%; float:left}
</style>

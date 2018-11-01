<template>
  <p class="mt30 mbtn">
    <a class="btn btn1 goToHall" @click.native="goToHall()">前往会议厅</a>
    <a href="#" class="btn btn2 ml10">会厅信息</a>
  </p>
</template>

<script>
    export default {
        name: "sbt_map_info"
    }
</script>

<style scoped>
  .mt40::-webkit-scrollbar {
    display: none;
  }

  .obox {
    margin-top: 30px;
  }
</style>

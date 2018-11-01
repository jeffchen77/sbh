<template>
  <div class="container">
    <div class="chat-container">
      <map-chat ref="chat" :user-icon="userIcon"/>
    </div>
    <div class="map-container">
      <div class="mapimg">
        <map-core ref="map"></map-core>
      </div>
    </div>
  </div>
</template>

<script>
  import mapCore from './map.vue'
  import MapChat from './map-chat'
  import '../../assets/map/css/base.css'
  import '../../assets/map/css/style.css'

  export default {
    name: 'map-main',
    props: {
      userIcon:{}
    },
    components: {
      mapCore,
      MapChat
    }
  }
</script>

<style>
  .chat-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 500px;
    width: 1080px;
    /*background-color: #a6e1ec;*/
    /*background-color: black;*/
  }

  .map-container {
    position: absolute;
    /*top: 550px;*/
    top: 440px;
    left: 0;
    width: 1080px;
    /*background-color: #0a426f;*/
    z-index: 7;
  }
  .container {
    width: 1080px;
    height: 1920px;
    z-index: 7;
    position: absolute;
  }
</style>

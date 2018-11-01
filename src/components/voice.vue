<template>
  <div class="demo-music">
    <div class="music">
      <ul id="waves">
        <li class="lineOut0"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineOut1"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineOut2"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext3"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext0"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext1"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext2"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext3"><span></span></li>
        <li class="margin-note"></li>
        <li class="line0"><span></span></li>
        <li class="margin-note"></li>
        <li class="line1"><span></span></li>
        <li class="margin-note"></li>
        <li class="line2"><span></span></li>
        <li class="margin-note"></li>
        <li class="line3"><span></span></li>
        <li class="margin-note"></li>
        <li class="li1"><span></span></li>
        <li class="margin-note"></li>
        <li class="li2"><span></span></li>
        <li class="margin-note"></li>
        <li class="li3"><span></span></li>
        <li class="margin-note"></li>
        <li class="li4"><span></span></li>
        <li class="margin-note"></li>
        <li class="li5"><span></span></li>
        <li class="margin-note"></li>
        <li class="li6"><span></span></li>
        <li class="margin-note"></li>
        <li class="li7"><span></span></li>
        <li class="margin-note"></li>
        <li class="line0"><span></span></li>
        <li class="margin-note"></li>
        <li class="line1"><span></span></li>
        <li class="margin-note"></li>
        <li class="line2"><span></span></li>
        <li class="margin-note"></li>
        <li class="line3"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext0"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext1"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext2"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineNext3"><span></span></li>
        <li class="lineNext0"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineOut1"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineOut2"><span></span></li>
        <li class="margin-note"></li>
        <li class="lineOut3"><span></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "voice"
    }
</script>

<style scoped>
  *{margin:0;padding:0;list-style: none;}
  :root{
    --animation-state:running;
  }
  .demo-music {
    /*position: absolute;*/
    width: 100%;
    height: 50px;
    top: 210px;
    zoom: 0.6;
    right: 5px;
    margin-top: 50px;
    -moz-transform:translate(4px, -83px) scale(0.6);
    -moz-transform-origin:top left;
  }

  .demo-music .music {
    width: 600px;
    height: 50px;
    top: 0;
    left: 0;
    -webkit-transform: translate(-40px, -25px);
    -moz-transform: translate(-40px, -25px);
    transform: translate(40px, -25px);
    /*position: absolute;*/
  }

  .demo-music #waves {
    width: 600px;
    height: 150px;
    position: absolute;
    top: -10px;
    left: 12px;
  }

  .demo-music #waves li {
    position: relative;
    float: left;
    height: 100%;
    width: 16px;
    overflow: hidden;
    margin-right: 1px;


  }

  .demo-music #waves li span {
    position: absolute;
    bottom: 0;
    display: block;
    height: 6px;
    width: 14px;
    background-image: url("../assets/label.png");
    background-repeat: repeat-y;
    background-size:14px 8px;
  }
  .demo-music #waves .margin-note{
    width: 1px;
  }
  .demo-music #waves .lineNext0 span {
    animation: line-waves1 1s linear 0s infinite alternate;
    -webkit-animation: line-waves1 1s linear 0s infinite alternate;
    -moz-animation: line-waves1 1s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineNext1 span {
    animation: line-waves1 1s linear 0s infinite alternate;
    -webkit-animation: line-waves1 1.2s linear 0s infinite alternate;
    -moz-animation: line-waves1 1.2s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineNext2 span {
    animation: line-waves1 1s linear 0s infinite alternate;
    -webkit-animation: line-waves1 1.3s linear 0s infinite alternate;
    -moz-animation: line-waves1 1.3s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineNext3 span {
    animation: line-waves1 1s linear 0s infinite alternate;
    -webkit-animation: line-waves1 1.4s linear 0s infinite alternate;
    -moz-animation: line-waves1 1.4s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineOut0 span {
    animation: line-waves2 1s linear 0s infinite alternate;
    -webkit-animation: line-waves2 1s linear 0s infinite alternate;
    -moz-animation: line-waves2 1s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineOut1 span {
    animation: line-waves2 1s linear 0s infinite alternate;
    -webkit-animation: line-waves2 1.2s linear 0s infinite alternate;
    -moz-animation: line-waves2 1.2s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineOut2 span {
    animation: line-waves2 1s linear 0s infinite alternate;
    -webkit-animation: line-waves2 1.3s linear 0s infinite alternate;
    -moz-animation: line-waves2 1.3s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .lineOut3 span {
    animation: line-waves2 1s linear 0s infinite alternate;
    -webkit-animation: line-waves2 1.4s linear 0s infinite alternate;
    -moz-animation: line-waves2 1.4s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .line0 span {
    animation: line-waves 1.5s linear 0s infinite alternate;
    -webkit-animation: line-waves 1.5s linear 0.5s infinite alternate;
    -moz-animation: line-waves 1.5s linear 0.5s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .line1 span {
    animation: line-waves 1.6s linear 0s infinite alternate;
    -webkit-animation: line-waves 1.6s linear 0s infinite alternate;
    -moz-animation: line-waves 1.6s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .line2 span {
    animation: line-waves 1.6s linear 0s infinite alternate;
    -webkit-animation: line-waves 1.6s linear 0s infinite alternate;
    -moz-animation: line-waves 1.6s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .line3 span {
    animation: line-waves 1.4s linear 0s infinite alternate;
    -webkit-animation: line-waves 1.4s linear 0s infinite alternate;
    -moz-animation: line-waves 1.4s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .li1 span {
    animation: waves 2s linear 0s infinite alternate;
    -webkit-animation: waves 2s linear 0.5s infinite alternate;
    -moz-animation: waves 2s linear 0.5s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }

  .demo-music #waves .li2 span {
    animation: waves 1.5s linear 0s infinite alternate;
    -webkit-animation: waves 1.5s linear 0s infinite alternate;
    -moz-animation: waves 1.5s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }

  .demo-music #waves .li3 span {
    animation: waves 1.8s linear 0.1s infinite alternate;
    -webkit-animation: waves 1.8s linear 0.1s infinite alternate;
    -moz-animation: waves 1.8s linear 0.1s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }

  .demo-music #waves .li4 span {
    animation: waves 1.3s linear 0s infinite alternate;
    -webkit-animation: waves 1.3s linear 0s infinite alternate;
    -moz-animation: waves 1.3s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }

  .demo-music #waves .li5 span {
    animation: waves 1.7s linear 0s infinite alternate;
    -webkit-animation: waves 1.7s linear 0s infinite alternate;
    -moz-animation: waves 1.7s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }

  .demo-music #waves .li6 span {
    animation: waves 1.5s linear 0s infinite alternate;
    -webkit-animation: waves 1.5s linear 0s infinite alternate;
    -moz-animation: waves 1.5s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  .demo-music #waves .li7 span {
    animation: waves 2s linear 0s infinite alternate;
    -webkit-animation: waves 2s linear 0s infinite alternate;
    -moz-animation: waves 2s linear 0s infinite alternate;
    animation-play-state: var(--animation-state);
    -webkit-animation-play-state:var(--animation-state); /* Safari 和 Chrome */
  }
  @-webkit-keyframes waves {
    1% {
      height: 60%;
    }
    10% {
      height: 70%;
    }
    20% {
      height: 80%;
    }
    40% {
      height: 90%;
    }
    50% {
      height: 100%;
    }
    70% {
      height: 90%;
    }
    80% {
      height: 80%;
    }
    100% {
      height: 60%;
    }
  }
  @-moz-keyframes waves {
    1% {
      height: 60%;
    }
    10% {
      height: 70%;
    }
    20% {
      height: 80%;
    }
    40% {
      height: 90%;
    }
    50% {
      height: 100%;
    }
    70% {
      height: 90%;
    }
    80% {
      height: 80%;
    }
    100% {
      height: 60%;
    }
  }
  @keyframes waves {
    10% {
      height: 40%;
    }
    20% {
      height: 60%;
    }
    40% {
      height: 40%;
    }
    50% {
      height: 100%;
    }
    100% {
      height: 50%;
    }
  }
  @-webkit-keyframes line-waves {
    10% {
      height: 10%;
    }
    20% {
      height: 20%;
    }
    40% {
      height: 30%;
    }
    50% {
      height: 40%;
    }
    100% {
      height: 50%;
    }
  }
  @-moz-keyframes line-waves {
    10% {
      height: 10%;
    }
    20% {
      height: 20%;
    }
    40% {
      height: 30%;
    }
    50% {
      height: 40%;
    }
    100% {
      height: 50%;
    }
  }
  @-webkit-keyframes line-waves1 {
    10% {
      height: 5%;
    }
    20% {
      height: 10%;
    }
    40% {
      height: 15%;
    }
    50% {
      height: 20%;
    }
    100% {
      height: 25%;
    }
  }
  @-moz-keyframes line-waves1 {
    10% {
      height: 5%;
    }
    20% {
      height: 10%;
    }
    40% {
      height: 15%;
    }
    50% {
      height: 20%;
    }
    100% {
      height: 25%;
    }
  }
  @-webkit-keyframes line-waves2 {
    10% {
      height: 2%;
    }
    20% {
      height: 5%;
    }
    40% {
      height: 8%;
    }
    50% {
      height: 10%;
    }
    100% {
      height: 12%;
    }
  }
  @-moz-keyframes line-waves2 {
    10% {
      height: 2%;
    }
    20% {
      height: 5%;
    }
    40% {
      height: 8%;
    }
    50% {
      height: 10%;
    }
    100% {
      height: 12%;
    }
  }
</style>

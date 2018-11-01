// 虚拟人物相关js
function addMessage (text, dir, isMap) {
  // let $talk1 = $('#talk1'), $talk2 = $('#talk2'), $talk3 = $('#talk3');
  // $talk1.remove();
  //
  // $talk2.attr('id', 'talk1');
  // $talk3.attr('id', 'talk2');
  if (!isMap) {
    if (dir === 'left') {
      $('#index_chat').prepend(`
                        <div class="dtex mt40">
        	<div class="dti"></div>
            <div class="dbi"></div>
            <div class="dci">
                <p class="bounceIn animated">${text}</p>
            </div>
        </div>`)
    } else {
      $('#index_chat').prepend(`
                      <div class="obox mt40 tm7">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p class="bounceIn animated">${text}
          </p>

        </div>
      </div>`);
    }
    var p = document.getElementById('index_chat')
    p.scrollTop = 0
    // this.scroll.scrollTo(0,this.scroll.maxScrollY)
  } else {
    addMessageOnMap(text, dir);
  }
}

function addMessageOnMap (text, dir) {
  // let $talk1 = $('#talk1'), $talk2 = $('#talk2'), $talk3 = $('#talk3');
  // $talk1.remove();
  //
  // $talk2.attr('id', 'talk1');
  // $talk3.attr('id', 'talk2');

  if (dir === 'left') {
    $('#maptalk').prepend(`
                        <div class="mebox tm8">
        <div class="meti"></div>
        <div class="mebi"></div>
        <div class="meri"></div>
        <div class="meci">${text}</div>
      </div>`)
  } else {
    $('#startChat').before(`
                      <div class="obox mt40 tm7">
        <div class="obti"></div>
        <div class="obzi"></div>
        <div class="obbg"></div>
        <div class="obbi"></div>
        <div class="obci">
          <p class="bounceIn animated">${text}
          </p>

        </div>
      </div>`)
  }
  var p = document.getElementById('maptalk')
  p.scrollTop = 0
  // this.scroll.scrollTo(0,this.scroll.maxScrollY);
}

function displayClient(text, isMap, textSource, images, video, audio, map) {
  addMessage(text, 'left', isMap)
}

function displayStatus(status) {
  // if (status === 3) {
  //   speech();
  // } else {
  //   $('.voice_circle').removeClass('active').animate({'bottom': -256}, 500, function () {
  //
  //   });
  // }
  // console.log("Received statusChangeEvent: " + status);
}

function displayOperate (action) {

}

function displayServer (msg, self) {
  if (msg.content) {
    addMessage(msg.content, 'right')
    if (self.core) {
      self.core.cancelPendingTts()
      self.core.startTts(msg.content)
    }
  }

  switch (msg.type) {
    case '8':
      break
    case '102':
      self.imgSrc = msg.url
      self.showImage = true
      break
    case '103':
      self.playVideo(msg.url)
      // that.playVideo('/static/video/jiang.mp4');
      break
    case '104':
      break
    case'105':
      self.showBusLine = true
      self.busSite = msg.data
      break
    case '106':
      self.foodInfo = msg.data
      self.showFood = true
      break
    case '107':
      self.showService = true
      break
    case '108':
      self.showTour = true
      break
    case '109':
      self.showListjd = true
      break
    default:
      break
  }
}

function displayServerHtml (divName) {
  $('#index_chat').prepend($('#' + divName).html())
}

let robot = {
  displayClient, displayStatus, displayOperate, displayServer, addMessage, displayServerHtml
}

export default robot

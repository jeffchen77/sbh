var bigpic_arr = [], mymaps = [], myvideo, PreType, oldpic, oldUsermsg = '';

//开始语音动画
export function speech() {
  $('.voice_circle').stop().animate({'bottom': -60}, 500, function () {
    $('.voice_circle').addClass('active');
  });
}

//用户语音文字展示
export function userChat(content) {
  //用户语音信息字符数大于24截取前24个字符
  if (content.length > 24) {
    content = content.substr(0, 24) + "...";
  }
  //用户第二次及以上进行语音时执行
  if (oldUsermsg != '') {
    var charWidth = 0;
    if (oldUsermsg.toString().length > 10) {
      charWidth = 250;
    } else {
      charWidth = oldUsermsg.toString().length * 20 + 42;
    }
    //showUserRec(charWidth);
  }

  //用户每次进行语音时执行
  $('.user_msg').html(content);
  //计算语音信息位置
  var msgtop = 700 + $('.user_msg').outerHeight();
  $('.user_msg').css({'top': msgtop, 'display': 'none'});
  setTimeout(function () {
    $('.user_logo').show();
    $('.user_msg').show().stop().animate({'top': 500}, 500);
    //当前语音信息赋值给信息记录
    oldUsermsg = content;
  }, 20)
}

export function showUserRec(charWidth) {
  //获取当前用户信息记录的offsetTop
  var copyTop = 500;
  var domStr = '<div class="record" style="width:' + charWidth + 'px;">' + oldUsermsg + '</div>';  //当前用户信息赋值给信息记录
  // $('.user_msg_copy').html(oldUsermsg).css('top', copyTop).show();  //模拟信息框出现及位置放置
  // userMsgCopyAnimation();

  if ($('.user_msg_record .record').length == 0) {
    //获取当前用户信息记录的totalHeight，25为每条记录的间距（margin-bottom）
    var totalHeight = $('.user_msg_copy').outerHeight() + 25;
    //计算新加信息记录的位置，200为可视区域（.user_msg_record_box）的高度
    var toTop = 200 - totalHeight;
    $('.user_msg_record').append(domStr).css('top', toTop);
  } else {
    $('.user_msg_record').append(domStr);
    userMsgAnimation();
  }
}

export function userMsgCopyAnimation() {
  $('.user_msg_copy').stop().animate({
    'top': 475 - $('.user_msg_copy').outerHeight(),
    'opacity': 0.5
  }, 500, function () {
    $(this).css('opacity', 1).hide();
    var msgSize = $('.user_msg_record .record').length;
    var grad = 0.5 / msgSize;
    for (let i = 0; i < msgSize; i++) {
      $('.user_msg_record .record').eq(i).css('opacity', (i + 1) * grad);
    }
  });
}

export function userMsgAnimation() {

  var totalHeight = $('.user_msg_record').outerHeight();
  var toTop = 200 - totalHeight;
  $('.user_msg_record').stop().animate({'top': toTop}, 500, function () {
    var count = 0, nowTop = toTop;
    while (totalHeight > 200) {
      totalHeight -= ($('.user_msg_record .record').eq(count).outerHeight() + 25);
      nowTop += $('.user_msg_record .record').eq(count).outerHeight() + 25;
      count++;
    }
    $('.user_msg_record').css('top', nowTop);
    for (var i = 0; i < count; i++) {
      $('.user_msg_record .record').eq(i).remove();
    }
    var msgSize = $('.user_msg_record .record').length;
    var grad = 0.5 / msgSize;
    for (i = 0; i < msgSize; i++) {
      $('.user_msg_record .record').eq(i).css('opacity', (i + 1) * grad);
    }
  })
}

//机器人信息展示
export function xiaoiChat(self,type, desc,picurl) {
  //清空当前视频
  $('.xiaoiMsg .msg .picbox video').attr('src', '');
  $('.picShadow video').attr('src', '');

  // var olddesc = $('.xiaoiMsg .msg .txt').html();
  var olddesc = self.robotTxt;

  var source = $('.xiaoiMsg .msg .picbox').html();
  var textTop = $('.xiaoiMsg .msg .desc').offset().top;
  var sourceTop = $('.xiaoiMsg .msg .picbox').offset().top;
  var sourceLeft = $('.xiaoiMsg .msg .picbox').offset().left + 200;

  //隐藏当前内容
  $('.xiaoiMsg').hide();
  self.robotTxt=' ';

  //olddesc字符数大于50截取前50个字符
  if (olddesc.length > 50) {
    olddesc = olddesc.substr(0, 50) + "...";
  }
  $('.picCopy').css('top', sourceTop).html(source).show();
  setTimeout(function () {
    $('.picCopy').hide()
  }, 450);//信息框图片/地图/视频缩小后隐藏
  $('.descCopy .txt').html(olddesc);

  var domStr = '<div class="msg" style="opacity:0;">' +
    '<div class="logo"></div>' +
    '<div class="txt">' + olddesc + '</div>' +
    '</div>';
  var totalHeight = $('.msgbox .outerbox').outerHeight() + $('.descCopy').outerHeight();
  var msgTop = 250 - $('.descCopy').outerHeight();
  //文字往上面跑的动画
  if (olddesc.length > 0) {
    $('.descCopy').css('top', textTop).show();
    console.log(olddesc.length)
    if ($('.msgbox .outerbox .msg').length == 0) {
      $('.msgbox .outerbox').append(domStr).css('top', msgTop);
    } else {
      $('.msgbox .outerbox').append(domStr);
      xiaoiMsgAnimation(totalHeight);
    }
  }

  materialAnimation(self,olddesc, msgTop, sourceLeft, sourceTop, type, desc, picurl);
}

export function xiaoiMsgAnimation(totalHeight) {
  //滚动历史会话

  var outerTop = 250 - $('.msgbox .outerbox').outerHeight();
  $('.msgbox .outerbox').stop().animate({'top': outerTop}, 500, function () {
    var count = 0, nowTop = outerTop;
    while (totalHeight > 250) {
      totalHeight -= $('.msgbox .outerbox .msg').eq(count).outerHeight();
      nowTop += $('.msgbox .outerbox .msg').eq(count).outerHeight();
      count++;
    }
    $('.msgbox .outerbox').css('top', nowTop);
    for (var i = 0; i < count; i++) {
      $('.msgbox .outerbox .msg').eq(i).remove();
    }
    var msgSize = $('.msgbox .outerbox .msg').length;
    var grad = 0.6 / msgSize;
    for (i = 0; i < msgSize; i++) {
      $('.msgbox .outerbox .msg').eq(i).css('opacity', (i + 1) * grad);
    }
  });
}

export function materialAnimation(self,olddesc, msgTop, sourceLeft, sourceTop, type, desc, picurl) {
  if (olddesc.length > 0) {
    $('.descCopy').stop().animate({'top': msgTop + 60, 'opacity': 0.5}, 500, function () {
      $('.descCopy').css({'opacity': 1}).hide();
    });
  }

  setTimeout(function () {
    var msgSize = $('.msgbox .outerbox .msg').length;
    var grad = 0.6 / msgSize;
    for (let i = 0; i < msgSize; i++) {
      $('.msgbox .outerbox .msg').eq(i).css('opacity', (i + 1) * grad);
    }
    materialShow(type, picurl);
    materialRecPosition(sourceLeft, sourceTop);

    //todo 处理文字
    //$('.xiaoiMsg .msg .desc .txt').html(desc);
    self.robotTxt=desc;
    $('.xiaoiMsg').show();


    // setTimeout(function () {
    //   $('.xiaoiMsg').show();
    //   if (type == 1) {
    //     var centerLng = (mymaps[0] + mymaps[2]) / 2;
    //     var centerLat = (mymaps[1] + mymaps[3]) / 2;
    //     createMap('mapbox', centerLng, centerLat, mymaps[0], mymaps[1], mymaps[2], mymaps[3]);
    //     blowUp(1);
    //   }
    //   PreType = type;
    //   if (type == 0) {
    //     oldpic = picurl;
    //   }
    // }, 500);
    //

  }, 500)
}

export function materialShow(type, picurl) {
  //处理图片

  if (type == 0) {
    $('.xiaoiMsg .msg .picbox img').show().siblings().hide();
    $('.xiaoiMsg .msg .picbox img').attr('src', picurl);
    $('.xiaoiMsg .msg .desc .map,.xiaoiMsg .msg .map_more').hide();
  } else if (type == 1) {
    $('.xiaoiMsg .msg .picbox img').hide();
    $('.xiaoiMsg .msg .picbox #mapbox').show().siblings().hide();
    //$('.xiaoiMsg .msg .desc .map,.xiaoiMsg .msg .map_more').show();
  } else if (type == 2) {
    $('.xiaoiMsg .msg .picbox img').hide();
    $('.xiaoiMsg .msg .picbox video').show().siblings().hide();
    //$('.xiaoiMsg .msg .desc .map,.xiaoiMsg .msg .map_more').hide();
    $('.xiaoiMsg .msg .picbox video').attr('src', picurl)
  } else if (type == -1) {
    $('.xiaoiMsg .msg .picbox img').hide();
    $('.xiaoiMsg .msg .picbox #mapbox').hide();
    $('.xiaoiMsg .msg .picbox video').hide();
  }
}

export function materialRecPosition(sourceLeft, sourceTop) {

  var len = $(".material div").length;
  var offsetTop = 8 + len * 100;
  if (PreType == 0) {
    if ($(".pic_box").length > 0) {
      offsetTop = $(".pic_box").offset().top;
    }
    picMove(sourceLeft, sourceTop, 1749, offsetTop, 1);
  }
  if (PreType == 1) {
    if ($(".map_box").length > 0) {
      offsetTop = $(".map_box").offset().top;
    }
    picMove(sourceLeft, sourceTop, 1749, offsetTop, 2);
  }
  if (PreType == 2) {
    if ($(".video_box").length > 0) {
      offsetTop = $(".video_box").offset().top;
    }
    picMove(sourceLeft, sourceTop, 1749, offsetTop, 3);
  }
}

//创建地图
export function createMap(el, centerLng, centerLat, p1Lng, p1Lat, p2Lng, p2Lat) {
  var map = new BMap.Map(el);
  map.centerAndZoom(new BMap.Point(centerLng, centerLat), 14);
  var walking = new BMap.WalkingRoute(map, {
    renderOptions: {
      map: map,
      autoViewport: true
    }
  });
  var start = new BMap.Point(p2Lng, p2Lat);
  var end = new BMap.Point(p1Lng, p1Lat);
  walking.search(start, end);
  // var map = new BMap.Map(el);
  // map.centerAndZoom(new BMap.Point(centerLng, centerLat), 15);

  // var myP1 = new BMap.Point(p2Lng,p2Lat);    //起点
  // var myP2 = new BMap.Point(p1Lng,p1Lat);    //终点
  // var myIcon = new BMap.Icon("images/move.gif", new BMap.Size(32, 70), {    //小车图片
  // 	//offset: new BMap.Size(0, -5),    //相当于CSS精灵
  // 	imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
  //   });
  // var driving2 = new BMap.DrivingRoute(map, {renderOptions:{map: map, autoViewport: true}});    //驾车实例
  // driving2.search(myP1, myP2);    //显示一条公交线路

  // window.run = export  function  (){
  // 	var driving = new BMap.DrivingRoute(map);    //驾车实例
  // 	driving.search(myP1, myP2);
  // 	driving.setSearchCompleteCallback(export  function (){
  // 		var pts = driving.getResults().getPlan(0).getRoute(0).getPath();    //通过驾车实例，获得一系列点的数组
  // 		var paths = pts.length;    //获得有几个点

  // 		var carMk = new BMap.Marker(pts[0],{icon:myIcon});
  // 		map.addOverlay(carMk);
  // 		i=0;
  // 		export  function  resetMkPoint(i){
  // 			carMk.setPosition(pts[i]);
  // 			if(i < paths){
  // 				setTimeout(export  function (){
  // 					i++;
  // 					resetMkPoint(i);
  // 				},100);
  // 			}
  // 		}
  // 		setTimeout(export  function (){
  // 			resetMkPoint(5);
  // 		},100)

  // 	});
  // }

  // setTimeout(export  function (){
  // 	run();
  // },1500);
}

//图片/地图放大
export function blowUp(type) {
  $('.xiaoiMsg .msg .picbox video').trigger('pause');
  $('.picShadow video').trigger('pause');
  $('.picShadow').show();
  if (type == 0) {
    $('.picShadow .picbox_big').show().siblings().hide();
    $('.picShadow .picbox_big>img').attr('src', bigpic_arr[0])
    if (bigpic_arr.length > 1) {
      $('.picShadow .picbox_big .btn').show();
    }
  } else if (type == 1) {
    $('.picShadow #mapbox_big').show().siblings().hide();
    var centerLng = (mymaps[0] + mymaps[2]) / 2;
    var centerLat = (mymaps[1] + mymaps[3]) / 2;
    createMap('mapbox_big', centerLng, centerLat, mymaps[0], mymaps[1], mymaps[2], mymaps[3]);
    //createMap('mapbox_big','116.404','39.915','116.380967','39.913285','116.424374','39.914667');
  } else if (type == 2) {
    $('.picShadow video').attr('src', myvideo);
    $('.picShadow video').show().siblings().hide();

  }
}

//关闭图片/地图放大
export function close_blowUp() {
  $('.xiaoiMsg .msg .picbox video').trigger('pause');
  $('.picShadow video').trigger('pause');
  $('.picShadow video').attr('src', '');
  $('.picShadow').stop().animate({'width': 0, 'height': 0, 'left': 605, 'top': 540, 'opacity': 0}, 500, function () {
    $('.picShadow').hide().css({'width': 1149, 'height': 696, 'left': 30, 'top': 200, 'opacity': 1})
  });
}

//下一张图片
export function nextPic() {
  var indexSrc = $('.picShadow .picbox_big>img').attr('src');
  var index = indexOf(bigpic_arr, indexSrc);
  if (index == 0) {
    index = bigpic_arr.length - 1
  } else {
    index = --index;
  }
  $('.picShadow .picbox_big>img').fadeOut(300, function () {
    $(this).attr('src', bigpic_arr[index]).fadeIn(500);
  })
}

//上一张图片
export function prevPic() {
  var indexSrc = $('.picShadow .picbox_big>img').attr('src');
  var index = indexOf(bigpic_arr, indexSrc);
  if (index == bigpic_arr.length - 1) {
    index = 0
  } else {
    index = ++index;
  }
  $('.picShadow .picbox_big>img').fadeOut(300, function () {
    $(this).attr('src', bigpic_arr[index]).fadeIn(500);
  })
}

export function indexOf(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == item) {
      return i
    }
  }
  return -1
}

//大图展示位置
export function show_big(showType) {
  var showLeft, showTop;
  if (showType == 0) {
    showLeft = $('.pic_box').offset().left;
    showTop = $('.pic_box').offset().top;
  } else if (showType == 1) {
    showLeft = $('.map_box').offset().left;
    showTop = $('.map_box').offset().top;
  } else if (showType == 2) {
    showLeft = $('.video_box').offset().left;
    showTop = $('.video_box').offset().top;
  }
  picFly(showLeft, showTop, 1168, 540, 4, showType)
}

//图片抛物线动画
export function picFly(startL, startT, endL, endT, sfn, showType) {
  var myimg = "";
  if (sfn == 1) {
    myimg = oldpic;
  } else if (sfn == 2) {
    myimg = "images/PC_7.png";
  } else if (sfn == 3) {
    myimg = "images/PC_8.png";
  }

  if (showType == 0) {
    myimg = oldpic;
  } else if (showType == 1) {
    myimg = "images/PC_7.png";
  } else if (showType == 2) {
    myimg = "images/PC_8.png";
  }
  var flyer = $('<img class="flyer-img" style="width:158px;height:84px;" src="' + myimg + '">'); //抛物体对象
  flyer.fly({
    start: {
      left: startL,//抛物体起点横坐标
      top: startT //抛物体起点纵坐标
    },
    end: {
      left: endL,//抛物体终点横坐标
      top: endT, //抛物体终点纵坐标
    },
    speed: 1.2,
    onEnd: function () {
      if (sfn == 1) {
        $('.pic_box').show();
        $(".pic_box img").attr("src", oldpic);
      } else if (sfn == 2) {
        $('.map_box').show();
      } else if (sfn == 3) {
        $('.video_box').show();
      } else if (sfn == 4) {
        blowUp(showType);
      }
      $(".flyer-img").remove();
      //this.destory(); //销毁抛物体
    }
  });
}

//图片/地图/视频记录出现的位置计算及动画
export function picMove(startL, startT, endL, endT, sfn, showType) {
  var myimg = "";
  if (sfn == 1) {
    myimg = oldpic;
  } else if (sfn == 2) {
    myimg = "images/PC_7.png";
  } else if (sfn == 3) {
    myimg = "images/PC_8.png";
  }

  if (showType == 0) {
    myimg = oldpic;
  } else if (showType == 1) {
    myimg = "images/PC_7.png";
  } else if (showType == 2) {
    myimg = "images/PC_8.png";
  }
  var mover = $('<img class="mover-img" style="z-index:99999;position:absolute;width:158px;height:84px;border:4px solid #354862;" src="' + myimg + '">'); //抛物体对象
  $('body').append(mover);
  $('.mover-img').css({'left': startL, 'top': startT});
  $('.mover-img').stop().animate({'left': endL}, 300, function () {
    $(this).stop().animate({'top': endT}, 300, function () {
      if (sfn == 1) {
        // <div class="video_box" onclick="show_big(2)"><img src="images/PC_8.png"></div>
        // $('.pic_box').show();
        if ($(".pic_box img").length > 0) {
          $(".pic_box img").attr("src", oldpic);
        } else {
          $(".material").append('<div class="pic_box" onclick="show_big(0)"><img src="' + myimg + '"></div>');
        }
      } else if (sfn == 2) {
        if ($(".map_box img").length == 0) {
          $(".material").append('<div class="map_box" onclick="show_big(1)"><img src="images/PC_7.png"></div>');
        }
      } else if (sfn == 3) {
        if ($(".video_box img").length == 0) {
          $(".material").append('<div class="video_box" onclick="show_big(2)"><img src="images/PC_8.png"></div>');
        }
      } else if (sfn == 4) {
        blowUp(showType);
      }
      $(".mover-img").remove();
    })
  })
}

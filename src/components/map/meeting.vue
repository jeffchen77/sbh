<template>
  <div id="map" style="width: 1080px;height: 1620px"></div>
</template>

<script>
  export default {
    name: "meeting",
    props: {
      fMap: {}
    },
    data() {
      return {
        map: null,
        loadComplete: false
      }
    },
    mounted() {
      console.log(this.fMap);
      let self = this;
      let map = new fengmap.FMMap({
        mapServerURL: 'static/fmap/' + self.fMap.mapId,
        mapThemeURL: 'static/fmap/theme',
        defaultThemeName: self.fMap.theme,

        container: document.getElementById('map'),
        appName: self.fMap.appName,
        key: self.fMap.appKey,
        defaultViewMode: fengmap.FMViewMode.MODE_3D,
        moveToAnimateMode: true,
        naviLineAnimation: true,
        // focusAlphaMode: true,
        defaultMapScaleLevel: 20,
        defaultFocusGroup: 1,
        defaultVisibleGroups: self.fMap.groupIds,
        focusAlpha: 0.3,
        defaultControlsPose: fengmap.FMDirection.EAST,
        // 开启2维，3维切换的动画显示
        viewModeAnimateMode: true,
        // 设置倾斜角，默认倾斜角为60度
        defaultTiltAngle: 30,
        lazyCreateMode: true
      });

      self.map = map;
      map.openMapById(self.fMap.mapId, err => {
        console.log(err)
      });

      map.on('mapClickNode', function (event) {
        console.log(event)
        // if (event.target == null || event.name == undefined || event.name == null || event.name == '') {
        //   self.$emit('show-enterprise', 'unshowall')
        //   return;
        // }

        console.log(event.name, '-', event.nodeType)
        if (event.nodeType === fengmap.FMNodeType.MODEL) {
          if (event.name) {
            self.$emit('show-enterprise', {
              name: event.name,
              loc: {
                x: event.mapCoord.x,
                y: event.mapCoord.y,
                groupID: event.groupID
              },
              fid: event.FID,
              id: event.ID
            })
          }
        }
      });

      map.on('loadComplete', function (event) {
        self.loadComplete = true;
        self.showControl = true;
        //todo 标注当前位置

        // ms.chat('一楼有什么会议', self);
        // let result = ms.search(self, '贵宾休息室4');
        // result = ms.search(self, '北门');
        // console.log(result)

        // let navi = ms.navigate(self, result[0]);
        // self.pushMsg('已为您导航到贵宾休息室。', 'left')
        // self.pushMsg(navi.join('，'), 'left')
        // console.log(result)
      });
    }
  }
</script>

<style scoped>

</style>

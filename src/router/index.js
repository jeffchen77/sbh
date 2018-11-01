import Vue from 'vue'
import Router from 'vue-router'

// import indexs page
import SbtIndex from '@/views/SbtIndex'
import GytIndex from '@/views/GytIndex'
import RobotSinglePageCruzr from '@/views/RobotSinglePageCruzr'
import RobotSinglePageCX from '@/views/RobotSinglePageCX'
import StandByHotInforDalaoshuo from '@/views/StandByHotInforDalaoshuo'
import StandByGuestAuth from '@/views/StandByGuestAuth'
import StandBy from '@/views/StandBy'
import chatNews from '@/components/sbt/sbt-chatNews'
import mapPavilionIndex from '@/views/map/mapPavilionIndex'
import mapChat from '@/components/sbt/sbt-mapChat'
import bmapIndex from '@/views/map/bmapIndex'
import bmapNav from '@/views/map/bmapNav'
// import sub route for gyt and sbt
import gytRoute from '@/frame/gytRoute'
import sbtRoute from '@/frame/sbtRoute'
// import sbt sub page
import BranchHallList from '@/views/sbt/BranchHallList'
import BranchHallDetails from '@/views/sbt/BranchHallDetails'
import VenueGuide from '@/views/sbt/VenueGuide'
import GuestList from '@/views/sbt/GuestList'
import EnterpriseList from '@/views/sbt/EnterpriseList'
import EnterpriseContent from '@/views/sbt/EnterpriseContent'
import HotInformationList from '@/views/sbt/HotInformationList'
import MeetingAgenda from '@/views/sbt/MeetingAgenda'
import MeetingDetails from '@/views/sbt/MeetingDetails'
import AuditoriumDetails from '@/views/sbt/AuditoriumDetails'
// import gyt sub page
import GytFoodIndex from '@/views/gyt/GytFoodIndex'
import GytFoodList from '@/views/gyt/GytFoodList'
import GytShoppingIndex from '@/views/gyt/GytShoppingIndex'
import GytCultureIndex from '@/views/gyt/GytCultureIndex'
import GytTrafficIndex from '@/views/gyt/GytTrafficIndex'
import GytTrafficQr from '@/views/gyt/GytTrafficQR'
import GytSightsIndex from '@/views/gyt/GytSightsIndex'
import GytHotelIndex from '@/views/gyt/GytHotelIndex'
import FoodListBox from '@/components/new/foodListBox'
import FoodDetailBox from '@/components/new/foodDetailBox'
import GuestListBox from '@/components/new/guestListBox'
import ScenicListBox from '@/components/new/scenicListBox'
import ScenicDetailBox from '@/components/new/scenicDetailBox'

import HumanAndCultureListBox from '@/components/new/humanAndCultureListBox'

// 单日天气查询
import weatherInfo from '@/components/new/weatherInfo'
// 多日天气查询
import weatherList from '@/components/new/weatherList'
// 车辆限号查询
import limitNum from '@/components/new/limitNum'

// map
import MallInfo from '@/components/new/mallInfo'
import shoppingInfo from '@/components/new/shoppingListBox'
import shoppingInfodet from '@/views/shoppingIndex'
// map
import MapIndex from '@/views/MapIndex'
import Index from '../components/index'

// 首页
import threeDIndex from '@/components/threeDIndex'
import Help from '@/views/sbt/Help'
import VipCard from '@/views/sbt/VipCard'
import Help2 from '@/views/sbt/Help2'
import map from '../components/map/index'

import ep from '@/components/new/enterPriseFixList'
import epd from '@/components/new/enterPriseFixDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/m',
      name: 'map',
      component: map
    },
    {
      path: '/SbtIndex',
      name: 'SbtIndex',
      component: SbtIndex
    },
    {
      path: '/FoodListBox',
      name: 'FoodListBox',
      component: FoodListBox
    },
    {
      path: '/MallInfo',
      name: 'MallInfo',
      component: MallInfo
    },
    {
      path: '/GuestListBox',
      name: 'GuestListBox',
      component: GuestListBox
    },
    {
      path: '/FoodDetailBox',
      name: 'FoodDetailBox',
      component: FoodDetailBox
    },

    {
      path: '/HumanAndCultureListBox',
      name: 'HumanAndCultureListBox',
      component: HumanAndCultureListBox,
    },

    {
      path: '/ScenicListBox',
      name: 'ScenicListBox',
      component: ScenicListBox
    },
    {
      path: '/ScenicDetailBox',
      name: 'ScenicDetailBox',
      component: ScenicDetailBox
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/GytIndex',
      name: 'GytIndex',
      component: GytIndex
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help
    },
    {
      path: '/Help2',
      name: 'Help2',
      component: Help2
    },
    {
      path: '/MapIndex',
      name: 'MapIndex',
      component: MapIndex
    },
    {
      path: '/RobotSinglePageCruzr',
      name: 'RobotSinglePageCruzr',
      component: RobotSinglePageCruzr
    },
    {
      path: '/RobotSinglePageCX',
      name: 'RobotSinglePageCX',
      component: RobotSinglePageCX
    },{
      path: '/threeDIndex',
      name: 'threeDIndex',
      component: threeDIndex
    },
    {
      path: '/chatNews',
      name: 'chatNews',
      component: chatNews
    },
    {
      path: '/mapChat',
      name: 'mapChat',
      component: mapChat
    },
    {
      path: '/StandByHotInforDalaoshuo',
      name: 'StandByHotInforDalaoshuo',
      component: StandByHotInforDalaoshuo
    },
    {
      path: '/mapPav',
      name: 'mapPav',
      component: mapPavilionIndex
    },
    {
      path: '/bmapIndex',
      name: 'bmapIndex',
      component: bmapIndex
    },
    {
      path: '/bmapNav',
      name: 'bmapNav',
      component: bmapNav
    },
    {
    path:'/shoppingInfo',
      name:'/shoppingInfo',
      component:shoppingInfo
    },
    {
      path:'/shoppingInfodet',
      name:'/shoppingInfodet',
      component:shoppingInfodet
    },
    {
      path: '/StandBy',
      name: 'StandBy',
      component: StandBy
    },
    // 嘉宾认证组件
    {
      path: '/StandByGuestAuth',
      name: 'StandByGuestAuth',
      component: StandByGuestAuth
    },
    {
      path: '/sbt',
      component: sbtRoute,
      children: [
        {path: 'BranchHallList', component: BranchHallList},
        {path: 'BranchHallDetails', component: BranchHallDetails},
        {path: 'VenueGuide', component: VenueGuide},
        {path: 'GuestList', component: GuestList},
        {path: 'EnterpriseList', component: EnterpriseList},
        {path: 'EnterpriseContent', component: EnterpriseContent},
        {path: 'HotInformationList', component: HotInformationList},
        {path: 'MeetingAgenda', component: MeetingAgenda},
        {path: 'MeetingDetails', component: MeetingDetails},
        {path: 'MeetingDetails', component: MeetingDetails},
        {path: 'AuditoriumDetails', component: AuditoriumDetails}
      ]
    },
    {
      path: '/gyt',
      component: gytRoute,
      children: [
        {path: 'GytFoodIndex', component: GytFoodIndex},
        {path: 'GytTrafficIndex', component: GytTrafficIndex},
        {path: 'GytTrafficQr', component: GytTrafficQr},
        {path: 'GytShoppingIndex', component: GytShoppingIndex},
        {path: 'GytCultureIndex', component: GytCultureIndex},
        {path: 'GytHotelIndex', component: GytHotelIndex},
        {path: 'GytFoodList', component: GytFoodList},
        {path: 'GytSightsIndex', component: GytSightsIndex}
      ]
    },
    {
      path: '/VipCard',
      name: 'VipCard',
      component: VipCard
    },
    {
      path: '/ep',
      name: 'ep',
      component: ep
    },
    {
      path: '/epd',
      name: 'epd',
      component: epd
    },
    // 单日天气查询
    {
      path: '/weatherInfo',
      name: 'weatherInfo',
      component: weatherInfo
    },
    // 多日天气查询
    {
      path: '/weatherList',
      name: 'weatherList',
      component: weatherList
    },
    // 车辆限号
    {
      path: '/limitNum',
      name: 'limitNum',
      component: limitNum
    },
  ]
})

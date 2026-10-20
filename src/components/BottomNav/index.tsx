import { Image, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import homeIcon from '../../assets/icons/home.svg'
import homeActiveIcon from '../../assets/icons/home-active.svg'
import casesIcon from '../../assets/icons/compass.svg'
import casesActiveIcon from '../../assets/icons/compass-active.svg'
import resourcesIcon from '../../assets/icons/book.svg'
import resourcesActiveIcon from '../../assets/icons/book-active.svg'
import profileIcon from '../../assets/icons/profile.svg'
import profileActiveIcon from '../../assets/icons/profile-active.svg'
import './index.scss'

type NavKey = 'home' | 'cases' | 'resources' | 'about'

const routes: Array<{ key: NavKey; path: string; label: string; icon: string; activeIcon: string }> = [
  { key: 'home', path: '/pages/home/index', label: '首页', icon: homeIcon, activeIcon: homeActiveIcon },
  { key: 'resources', path: '/pages/resources/index', label: '外部资源', icon: casesIcon, activeIcon: casesActiveIcon },
  { key: 'cases', path: '/pages/cases/index', label: '课程资源', icon: resourcesIcon, activeIcon: resourcesActiveIcon },
  { key: 'about', path: '/pages/about/index', label: '关于我们', icon: profileIcon, activeIcon: profileActiveIcon }
]

export function BottomNav({ active }: { active: NavKey }) {
  const switchPage = (path: string) => {
    if (routes.find((route) => route.path === path)?.key === active) return
    Taro.reLaunch({ url: path })
  }

  return <View className='bottom-nav'>
    {routes.map((route) => <View
      key={route.key}
      className={`bottom-nav__item ${active === route.key ? 'bottom-nav__item--active' : ''}`}
      onClick={() => switchPage(route.path)}
    >
      <Image className='bottom-nav__icon' src={active === route.key ? route.activeIcon : route.icon} mode='aspectFit' />
      <Text className='bottom-nav__label'>{route.label}</Text>
    </View>)}
  </View>
}

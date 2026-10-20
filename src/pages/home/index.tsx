import { Image, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { BottomNav } from '../../components/BottomNav'
import { StateView } from '../../components/StateView'
import { ProjectProfile } from '../../domain/models'
import { service } from '../../services'
import Taro, { useLoad } from '@tarojs/taro'
import casesIcon from '../../assets/icons/book.svg'
import profileIcon from '../../assets/icons/profile.svg'
import resourcesIcon from '../../assets/icons/compass.svg'
import './index.scss'

export default function HomePage() {
  const [profile, setProfile] = useState<ProjectProfile | null>(null)
  const [failed, setFailed] = useState(false)
  useLoad(() => {
    service.getProjectProfile().then((result) => {
      setProfile(result.data)
    }).catch(() => {
      setFailed(true)
    })
  })
  const open = (url: string) => Taro.reLaunch({ url })
  return <View className='page home-page'>
    {profile ? <ScrollView className='home-page__scroll' scrollY>
      <View className='home-carousel'>
        <Swiper className='home-carousel__swiper' autoplay circular interval={4200} duration={650} indicatorDots indicatorColor='rgba(255,255,255,.55)' indicatorActiveColor='#ffffff'>
          {profile.homeCarouselImages.map((image) => <SwiperItem key={image}><Image className='home-carousel__image' src={image} mode='aspectFill' /></SwiperItem>)}
        </Swiper>
        <View className='home-carousel__fade home-carousel__fade--top' />
        <View className='home-carousel__fade home-carousel__fade--bottom' />
      </View>
      <View className='home-intro'>
        <Image className='home-intro__avatar' src={profile.logo} mode='aspectFit' />
        <View className='home-intro__bubble'><Text>欢迎关注BoundlessUs青年赋能教育公益项目，我们希望推动更多青年学生关注sports for girls议题，服务撒开脚丫，赋能女孩成长~</Text></View>
      </View>
      <View className='home-actions'>
        <Image className='home-actions__watermark' src={profile.homeCardsBackground} mode='aspectFit' />
        <View className='home-actions__cards'>
          {[
            { title: '外部资源', copy: '更多的支教公益项目资源', route: '/pages/resources/index', icon: resourcesIcon },
            { title: '课程资源', copy: '支教成员的课程资料，可供参考', route: '/pages/cases/index', icon: casesIcon },
            { title: '关于我们', copy: 'Boundless Us', route: '/pages/about/index', icon: profileIcon }
          ].map((tile) => <View key={tile.title} className='home-card' onClick={() => open(tile.route)}><Text className='home-card__title'>{tile.title}</Text><Text className='home-card__copy'>{tile.copy}</Text><Image className='home-card__icon' src={tile.icon} mode='aspectFit' /></View>)}
        </View>
      </View>
    </ScrollView> : <StateView kind={failed ? 'error' : 'loading'} />}
    <BottomNav active='home' />
  </View>
}

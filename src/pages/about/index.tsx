import { Image, ScrollView, Text, View } from '@tarojs/components'
import { useState } from 'react'
import { BottomNav } from '../../components/BottomNav'
import { PageHeader } from '../../components/PageHeader'
import { StateView } from '../../components/StateView'
import { ProjectProfile } from '../../domain/models'
import { service } from '../../services'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'

export default function AboutPage() {
  const [profile, setProfile] = useState<ProjectProfile | null>(null)
  const [failed, setFailed] = useState(false)
  useLoad(() => { service.getProjectProfile().then((result) => setProfile(result.data)).catch(() => setFailed(true)) })
  return <View className='page about-page'>
    <PageHeader title='Boundless Us' />
    {profile ? <ScrollView className='about-page__scroll' scrollY>
      <View className='about-hero'>
        <Image className='about-hero__image' src={profile.heroImage} mode='aspectFill' lazyLoad={false} />
        <View className='about-hero__fade about-hero__fade--top' />
        <View className='about-hero__fade about-hero__fade--bottom' />
      </View>
      <View className='about-avatar'>
        <Image className='about-avatar__image' src={profile.logo} mode='aspectFit' />
      </View>
      <View className='about-content'>
        <View className='about-card about-card--intro'>
          {profile.introParagraphs.map((paragraph) => <Text key={paragraph}>{paragraph}</Text>)}
        </View>
        <View className='about-card about-card--entry' onClick={() => Taro.navigateTo({ url: '/pages/skill/index' })}>
          <Text>智能体 SKILL</Text><Text className='about-card__arrow'>≫</Text>
        </View>
        <View className='about-card about-card--entry' onClick={() => Taro.navigateTo({ url: '/pages/question/index' })}>
          <Text>提问箱</Text><Text className='about-card__arrow'>≫</Text>
        </View>
      </View>
    </ScrollView> : <StateView kind={failed ? 'error' : 'loading'} />}
    <BottomNav active='about' />
  </View>
}

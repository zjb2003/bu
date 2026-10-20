import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

const skillUrl = 'https://cloud.tsinghua.edu.cn/d/e80013401a8448c38b90/'

export default function SkillPage() {
  const copySkillUrl = () => Taro.setClipboardData({ data: skillUrl })

  return <View className='page skill-page'>
    <View className='skill-page__content'>
      <Text className='skill-page__title'>智能体 SKILL</Text>
      <View className='skill-page__card'>
        <Text className='skill-page__description'>为了更好赋能青年学生参与乡村支教，项目组针对相关场域中的常见流程与问题，设计了专门化的智能体 SKILL，欢迎各位下载至 Agent 体验使用。</Text>
        <View className='skill-page__download' onClick={copySkillUrl}>
          <Text className='skill-page__download-title'>下载智能体 SKILL</Text>
          <Text className='skill-page__download-url' userSelect>{skillUrl}</Text>
          <Text className='skill-page__download-hint'>点击复制下载链接</Text>
        </View>
      </View>
    </View>
  </View>
}

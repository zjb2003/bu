import { Image, Text, View } from '@tarojs/components'
import { Resource } from '../../domain/models'
import './index.scss'
export interface ResourceCardProps { item: Resource; onSelect: (resource: Resource) => void }
export function ResourceCard({ item, onSelect }: ResourceCardProps) { return <View className='resource-card' onClick={() => onSelect(item)}><View className='resource-card__cover-wrap'><Image className='resource-card__cover' src={item.coverImage} mode='aspectFill' /><Text className='resource-card__arrow'>››</Text></View><View className='resource-card__body'><Image className='resource-card__logo' src={item.logo} mode='aspectFit' /><Text className='resource-card__summary'>{item.summary}</Text></View></View> }

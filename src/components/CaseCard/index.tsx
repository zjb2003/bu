import { Image, Text, View } from '@tarojs/components'
import { Case } from '../../domain/models'
import './index.scss'
export interface CaseCardProps { item: Case; onSelect: (id: string) => void }
export function CaseCard({ item, onSelect }: CaseCardProps) { return <View className='case-card' onClick={() => onSelect(item.id)}><Image className='case-card__image' src={item.coverImage} mode='aspectFill' /><View className='case-card__copy'><Text className='case-card__title'>{item.title}</Text><Text className='case-card__summary'>{item.summary}</Text></View><Text className='case-card__arrow'>››</Text></View> }

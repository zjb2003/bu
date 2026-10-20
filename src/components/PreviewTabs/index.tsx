import { Text, View } from '@tarojs/components'
import { DocumentKind } from '../../domain/models'
import './index.scss'
export interface PreviewTabsProps { value: DocumentKind; available: DocumentKind[]; onChange: (kind: DocumentKind) => void }
const labels: Record<DocumentKind, string> = { 'lesson-plan': '课程教案', 'course-pdf': '课程PDF' }
export function PreviewTabs({ value, available, onChange }: PreviewTabsProps) { return <View className='preview-tabs'>{(['lesson-plan', 'course-pdf'] as const).map((kind) => <View key={kind} className={`preview-tabs__item ${value === kind ? 'preview-tabs__item--active' : ''}`} onClick={() => onChange(kind)}><Text>{labels[kind]}</Text>{!available.includes(kind) && <Text className='preview-tabs__badge'>待补充</Text>}</View>)}</View> }

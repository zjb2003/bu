import { View, Text } from '@tarojs/components'
import './index.scss'
export interface StateViewProps { kind: 'loading' | 'empty' | 'error' | 'missing'; message?: string }
const defaults: Record<StateViewProps['kind'], string> = { loading: '正在加载…', empty: '暂时没有匹配内容', error: '内容加载失败，请稍后重试', missing: '内容尚未补充' }
export function StateView({ kind, message }: StateViewProps) { return <View className={`state-view state-view--${kind}`}><Text>{message ?? defaults[kind]}</Text></View> }

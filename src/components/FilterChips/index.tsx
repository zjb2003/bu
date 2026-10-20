import { ScrollView, Text, View } from '@tarojs/components'
import './index.scss'
export interface FilterOption { id: string; name: string }
export interface FilterChipsProps { options: FilterOption[]; value: string; onChange: (id: string) => void }
export function FilterChips({ options, value, onChange }: FilterChipsProps) { return <ScrollView className='filter-chips' scrollX enhanced showScrollbar={false}><View className='filter-chips__row'>{options.map((option) => <Text key={option.id} className={`filter-chip ${option.id === value ? 'filter-chip--active' : ''}`} onClick={() => onChange(option.id)}>{option.name}</Text>)}</View></ScrollView> }

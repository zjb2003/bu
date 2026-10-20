import { Input, View } from '@tarojs/components'
import './index.scss'
export interface SearchBoxProps { value: string; placeholder: string; onChange: (value: string) => void }
export function SearchBox({ value, placeholder, onChange }: SearchBoxProps) { return <View className='search-box'><View className='search-box__icon' /><Input className='search-box__input' value={value} placeholder={placeholder} confirmType='search' onInput={(event) => onChange(event.detail.value)} /></View> }

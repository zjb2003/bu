import { Image, Text, View } from '@tarojs/components'
import { PreviewPage } from '../../domain/models'
import './index.scss'
export interface DocumentPreviewProps { pages: PreviewPage[] }
export function DocumentPreview({ pages }: DocumentPreviewProps) { return <View className='document-preview'>{pages.map((page) => <View key={page.pageNumber} className='document-preview__page'><Image className='document-preview__image' src={page.image} mode='widthFix' lazyLoad /><Text className='document-preview__caption'>第{page.pageNumber}页</Text></View>)}</View> }

import { Image, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'
import { DocumentPreview } from '../../components/DocumentPreview'
import { PreviewTabs } from '../../components/PreviewTabs'
import { StateView } from '../../components/StateView'
import { CaseDetailResult, DocumentKind } from '../../domain/models'
import { service } from '../../services'
import './index.scss'

export default function CaseDetailPage() {
  const router = useRouter()
  const caseId = router.params.id ?? ''
  const [detail, setDetail] = useState<CaseDetailResult | null>(null)
  const [kind, setKind] = useState<DocumentKind>('lesson-plan')
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  useEffect(() => { service.getCaseDetail(caseId).then((result) => { setDetail(result.data); const kinds = result.data?.documents.map((doc) => doc.kind) ?? []; if (!kinds.includes('lesson-plan') && kinds.includes('course-pdf')) setKind('course-pdf') }).catch(() => setFailed(true)).finally(() => setLoading(false)) }, [caseId])
  const document = useMemo(() => detail?.documents.find((item) => item.kind === kind), [detail, kind])
  const gallery = useMemo(() => {
    if (!detail) return []
    return detail.case.galleryImages.length > 0 ? detail.case.galleryImages : [detail.case.coverImage]
  }, [detail])
  const goBack = () => { Taro.navigateBack({ delta: 1 }).catch(() => Taro.reLaunch({ url: '/pages/cases/index' })) }
  const copyDownloadLink = (url: string) => { void Taro.setClipboardData({ data: url }) }
  if (loading) return <View className='page case-detail-page'><StateView kind='loading' /></View>
  if (failed) return <View className='page case-detail-page'><StateView kind='error' /></View>
  if (!detail) return <View className='page case-detail-page'><StateView kind='missing' message='未找到该案例。请从案例库重新进入。' /></View>
  return <View className='page case-detail-page'>
    <View className='case-detail__header'><Text className='case-detail__back' onClick={goBack}>‹</Text><Text className='case-detail__header-title'>案例详情</Text><View className='case-detail__header-space' /></View>
    <ScrollView className='case-detail-page__scroll' scrollY>
      <View className='case-detail__overview'>
        <Swiper className='case-detail__gallery' circular={gallery.length > 1} indicatorDots={gallery.length > 1} indicatorColor='rgba(255,255,255,.55)' indicatorActiveColor='#ffffff'>
          {gallery.map((image) => <SwiperItem key={image}><Image className='case-detail__cover' src={image} mode='aspectFill' /></SwiperItem>)}
        </Swiper>
        <View className='case-detail__info'>
          <Text className='case-detail__title'>{detail.case.title}</Text>
          <Text className='case-detail__author'>上课老师：{detail.case.author}</Text>
          <Text className='case-detail__description'>{detail.case.description}</Text>
          <View className='case-detail__tags'>{detail.case.tags.map((tag) => <Text key={tag}>{tag}</Text>)}</View>
        </View>
      </View>
      <View className='case-detail__documents'>
        <PreviewTabs value={kind} available={detail.documents.map((item) => item.kind)} onChange={setKind} />
        <Text className='case-detail__preview-heading'>{kind === 'lesson-plan' ? '教案预览' : '课程PDF预览'}</Text>
        {document ? <DocumentPreview pages={document.previewPages} /> : <StateView kind='missing' message='此文档暂未提供预览页，后续补录后会显示。' />}
        {document?.fileUrl ? <View className='case-detail__download'><Text>下载链接：</Text><Text className='case-detail__download-url' onClick={() => copyDownloadLink(document.fileUrl as string)}>{document.fileUrl}</Text></View> : <Text className='case-detail__download-note'>下载链接待补充</Text>}
      </View>
    </ScrollView>
  </View>
}

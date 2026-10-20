import { ScrollView, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { BottomNav } from '../../components/BottomNav'
import { PageHeader } from '../../components/PageHeader'
import { ResourceCard } from '../../components/ResourceCard'
import { SearchBox } from '../../components/SearchBox'
import { StateView } from '../../components/StateView'
import { Resource } from '../../domain/models'
import { service } from '../../services'
import './index.scss'

export default function ResourcesPage() {
  const [items, setItems] = useState<Resource[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  useEffect(() => { let active = true; setLoading(true); service.listResources({ searchText: query }).then((result) => { if (active) setItems(result.data.items) }).catch(() => { if (active) setFailed(true) }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [query])
  const showResource = (resource: Resource) => Taro.showModal({ title: resource.name, content: resource.description, showCancel: true, cancelText: '关闭', confirmText: resource.link ? '打开链接' : '知道了' }).then(({ confirm }) => { if (confirm && resource.link) Taro.setClipboardData({ data: resource.link }) })
  return <View className='page resources-page'><PageHeader title='资源库' /><ScrollView className='resources-page__scroll' scrollY><View className='resources-page__content'><SearchBox value={query} placeholder='搜索资源' onChange={setQuery} /><Text className='resources-page__count'>共{items.length}个资源</Text>{loading ? <StateView kind='loading' /> : failed ? <StateView kind='error' /> : items.length === 0 ? <StateView kind='empty' /> : <View className='resources-page__list'>{items.map((item) => <ResourceCard key={item.id} item={item} onSelect={showResource} />)}</View>}</View></ScrollView><BottomNav active='resources' /></View>
}

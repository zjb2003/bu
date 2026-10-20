import { ScrollView, Text, View } from '@tarojs/components'
import { useEffect, useMemo, useState } from 'react'
import { BottomNav } from '../../components/BottomNav'
import { CaseCard } from '../../components/CaseCard'
import { FilterChips } from '../../components/FilterChips'
import { PageHeader } from '../../components/PageHeader'
import { SearchBox } from '../../components/SearchBox'
import { StateView } from '../../components/StateView'
import { Case, CaseCategory } from '../../domain/models'
import { service } from '../../services'
import { routeToCase } from '../../utils/navigation'
import './index.scss'

export default function CasesPage() {
  const [categories, setCategories] = useState<CaseCategory[]>([])
  const [items, setItems] = useState<Case[]>([])
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('all')
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  useEffect(() => { service.listCategories().then((result) => setCategories(result.data)).catch(() => setFailed(true)) }, [])
  useEffect(() => { let active = true; setLoading(true); service.listCases({ searchText: query, categoryId }).then((result) => { if (active) setItems(result.data.items) }).catch(() => { if (active) setFailed(true) }).finally(() => { if (active) setLoading(false) }); return () => { active = false } }, [query, categoryId])
  const options = useMemo(() => [{ id: 'all', name: '全部' }, ...categories.map(({ id, name }) => ({ id, name }))], [categories])
  return <View className='page cases-page'>
    <PageHeader title='案例库' />
    <ScrollView className='cases-page__scroll' scrollY>
      <View className='cases-page__search-panel'>
        <SearchBox value={query} placeholder='搜索案例' onChange={setQuery} />
        <FilterChips options={options} value={categoryId} onChange={setCategoryId} />
      </View>
      <View className='cases-page__results'>
        <View className='cases-page__count'><Text>共{items.length}篇</Text><View /></View>
        {loading ? <StateView kind='loading' /> : failed ? <StateView kind='error' /> : items.length === 0 ? <StateView kind='empty' message='没有找到匹配案例，试试其他关键词或分类。' /> : <View className='cases-page__list'>{items.map((item) => <CaseCard key={item.id} item={item} onSelect={(id) => { void routeToCase(id) }} />)}</View>}
      </View>
    </ScrollView>
    <BottomNav active='cases' />
  </View>
}

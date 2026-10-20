import { Button, Text, Textarea, View } from '@tarojs/components'
import { useState } from 'react'
import Taro, { useLoad } from '@tarojs/taro'
import { ProjectProfile, QuestionSubmission } from '../../domain/models'
import { service } from '../../services'
import './index.scss'

export default function QuestionPage() {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submission, setSubmission] = useState<QuestionSubmission | null>(null)
  const [profile, setProfile] = useState<ProjectProfile | null>(null)
  useLoad(() => { service.getProjectProfile().then((result) => setProfile(result.data)).catch(() => undefined) })
  const submit = async () => {
    const value = content.trim()
    if (!value) { await Taro.showToast({ title: '请先填写问题', icon: 'none' }); return }
    if (value.length > 500) { await Taro.showToast({ title: '内容最多500字', icon: 'none' }); return }
    setSubmitting(true)
    try { const result = await service.submitQuestion(value); setSubmission(result.data) } catch { await Taro.showToast({ title: '提交失败，请稍后重试', icon: 'none' }) } finally { setSubmitting(false) }
  }
  return <View className='page question-page'><View className='question-page__content'><Text className='question-page__title'>提问箱</Text><Text className='question-page__lead'>写下你想了解的问题，我们将之后给您回复。</Text>{submission ? <View className='question-success'><Text className='question-success__title'>演示提交已记录</Text><Text>{submission.note}</Text><Text className='question-success__content'>{submission.content}</Text><Text className='question-success__time'>提交时间：{new Date(submission.submittedAt).toLocaleString()}</Text><Button className='question-page__button' onClick={() => { setSubmission(null); setContent('') }}>继续提问</Button></View> : <><Textarea className='question-page__textarea' value={content} maxlength={500} placeholder='请输入问题（最多500字）' onInput={(event) => setContent(event.detail.value)} /><Text className='question-page__count'>{content.length}/500</Text>{profile && <View className='question-page__contact'><Text className='question-page__contact-label'>{profile.contactLabel}</Text><Text className='question-page__contact-value'>{profile.contactValue}</Text></View>}<Button className='question-page__button' loading={submitting} disabled={submitting} onClick={submit}>提交问题</Button></>}</View></View>
}

import { CaseQuery, QuestionSubmission, ResourceQuery } from '../domain/models'
import { cases, categories, documents, projectProfile, resources } from '../resource-pack'
import { BoundlessService } from './contracts'

const delay = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 80))
let questionSequence = 0

export const mockService: BoundlessService = {
  async listCategories() { await delay(); return { data: [...categories].sort((a, b) => a.sortOrder - b.sortOrder), source: 'local-mock', requestId: 'mock-categories' } },
  async listCases(query: CaseQuery) {
    await delay()
    const term = query.searchText.trim().toLocaleLowerCase()
    const items = cases.filter((item) => item.status === 'published' && (query.categoryId === 'all' || item.categoryId === query.categoryId) && (!term || [item.title, item.summary, item.description, item.author, ...item.tags].join(' ').toLocaleLowerCase().includes(term))).sort((a, b) => a.sortOrder - b.sortOrder)
    return { data: { items, total: items.length, query }, source: 'local-mock', requestId: `mock-cases-${query.categoryId}-${term}` }
  },
  async getCaseDetail(caseId) {
    await delay()
    const item = cases.find((entry) => entry.id === caseId && entry.status === 'published')
    if (!item) return { data: null, source: 'local-mock', requestId: `mock-case-${caseId}` }
    const category = categories.find((entry) => entry.id === item.categoryId)
    if (!category) return { data: null, source: 'local-mock', requestId: `mock-case-${caseId}` }
    return { data: { case: item, category, documents: documents.filter((doc) => item.documentIds.includes(doc.id) && doc.status === 'published') }, source: 'local-mock', requestId: `mock-case-${caseId}` }
  },
  async listResources(query: ResourceQuery) {
    await delay()
    const term = query.searchText.trim().toLocaleLowerCase()
    const items = resources.filter((item) => item.status === 'published' && (!term || [item.name, item.organization, item.summary, item.description, ...item.tags].join(' ').toLocaleLowerCase().includes(term))).sort((a, b) => a.sortOrder - b.sortOrder)
    return { data: { items, total: items.length, query }, source: 'local-mock', requestId: `mock-resources-${term}` }
  },
  async getProjectProfile() { await delay(); return { data: projectProfile, source: 'local-mock', requestId: 'mock-project-profile' } },
  async submitQuestion(content: string) {
    await delay()
    questionSequence += 1
    const data: QuestionSubmission = { id: `demo-question-${questionSequence}`, content, submittedAt: new Date().toISOString(), demoStatus: 'stored-locally', note: '仅保存在当前演示会话内；未发送到服务器。' }
    return { data, source: 'local-mock', requestId: data.id }
  }
}

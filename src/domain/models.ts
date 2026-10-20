export type EntityStatus = 'published' | 'draft' | 'archived'
export type DocumentKind = 'lesson-plan' | 'course-pdf'
export type DocumentFormat = 'pdf'
export type CaseId = string
export type CategoryId = string
export type DocumentId = string
export type ResourceId = string

export interface CaseCategory { id: CategoryId; name: string; sortOrder: number }
export interface PreviewPage { pageNumber: number; image: string; caption?: string | null; width?: number | null; height?: number | null }
export interface DocumentAsset { id: DocumentId; caseId: CaseId; kind: DocumentKind; title: string; format: DocumentFormat; previewPages: PreviewPage[]; sourceFile?: string | null; fileUrl?: string | null; status: EntityStatus }
export interface Case { id: CaseId; slug: string; title: string; summary: string; description: string; coverImage: string; galleryImages: string[]; author: string; categoryId: CategoryId; gradeRange: string; durationMinutes: number; tags: string[]; sortOrder: number; status: EntityStatus; documentIds: DocumentId[] }
export interface Resource { id: ResourceId; name: string; organization: string; logo: string; coverImage: string; summary: string; description: string; tags: string[]; link: string | null; internalTarget: { type: 'resource-info'; resourceId: ResourceId } | null; sortOrder: number; status: EntityStatus }
export interface ProjectProfile { projectName: string; introParagraphs: string[]; heroImage: string; logo: string; homeCarouselImages: string[]; homeCardsBackground: string; contactLabel: string; contactValue: string; sections: Array<{ id: string; title: string; body: string }> }
export interface QuestionSubmission { id: string; content: string; submittedAt: string; demoStatus: 'stored-locally'; note: string }

export interface CaseQuery { searchText: string; categoryId: CategoryId | 'all' }
export interface CaseListResult { items: Case[]; total: number; query: CaseQuery }
export interface ResourceQuery { searchText: string }
export interface ResourceListResult { items: Resource[]; total: number; query: ResourceQuery }
export interface ServiceResult<T> { data: T; source: 'local-mock' | 'api'; requestId: string }
export type CaseDetailResult = { case: Case; category: CaseCategory; documents: DocumentAsset[] }

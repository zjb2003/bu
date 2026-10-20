import { CaseDetailResult, CaseListResult, CaseQuery, CaseCategory, ProjectProfile, QuestionSubmission, ResourceListResult, ResourceQuery, ServiceResult } from '../domain/models'

export interface BoundlessService {
  listCategories(): Promise<ServiceResult<CaseCategory[]>>
  listCases(query: CaseQuery): Promise<ServiceResult<CaseListResult>>
  getCaseDetail(caseId: string): Promise<ServiceResult<CaseDetailResult | null>>
  listResources(query: ResourceQuery): Promise<ServiceResult<ResourceListResult>>
  getProjectProfile(): Promise<ServiceResult<ProjectProfile>>
  submitQuestion(content: string): Promise<ServiceResult<QuestionSubmission>>
}

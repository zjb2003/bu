import { Case, CaseCategory, DocumentAsset, ProjectProfile, Resource } from '../../domain/models'
import { mockAssets } from './assets'

export const categories: CaseCategory[] = [
  { id: 'body-confidence', name: '身体自信', sortOrder: 10 }, { id: 'technology', name: '科技创新', sortOrder: 20 }, { id: 'humanities', name: '人文素养', sortOrder: 30 }
]

export const cases: Case[] = [
  { id: 'case-flag-football-01', slug: 'flag-football-intro', title: '腰旗橄榄球入门', summary: '传球、跑动、配合——每个人都是不可或缺的一环', description: '无接触的腰旗橄榄球以扯腰旗代替身体撞倒，兼顾策略、体能与团队协作，是一项安全有趣的运动。', coverImage: mockAssets.flagCover, galleryImages: [mockAssets.flagCover], author: '李云翔老师', categoryId: 'body-confidence', gradeRange: '4-6年级', durationMinutes: 90, tags: ['身体自信', '4-6年级', '90min'], sortOrder: 10, status: 'published', documentIds: ['doc-flag-lesson', 'doc-flag-course-pdf'] },
  { id: 'case-volleyball-01', slug: 'volleyball-intro', title: '排球入门', summary: '每一次伸手迎球，都是一次勇敢的尝试', description: '从轻松的传接球开始，在合作练习中体验运动乐趣。示例内容，后续可替换为经确认的课程介绍。', coverImage: mockAssets.volleyball, galleryImages: [mockAssets.volleyball], author: '示例课程团队', categoryId: 'body-confidence', gradeRange: '5-6年级', durationMinutes: 60, tags: ['身体自信', '5-6年级', '60min'], sortOrder: 20, status: 'published', documentIds: ['doc-volleyball-lesson', 'doc-volleyball-pdf'] },
  { id: 'case-data-story-01', slug: 'community-data-story', title: '社区观察与数据故事', summary: '从身边的问题出发，用观察和数据讲述发现', description: '示例案例：围绕校园和社区开展观察记录，学习整理信息并进行友好表达。', coverImage: mockAssets.homeHero, galleryImages: [mockAssets.homeHero], author: '示例课程团队', categoryId: 'technology', gradeRange: '6-8年级', durationMinutes: 75, tags: ['科技创新', '6-8年级', '75min'], sortOrder: 30, status: 'published', documentIds: ['doc-data-lesson', 'doc-data-pdf'] },
  { id: 'case-story-circle-01', slug: 'story-circle', title: '故事与倾听练习', summary: '在轮流讲述与倾听中发现彼此的经验', description: '示例案例：以小组故事圈练习倾听、复述和表达感受。', coverImage: mockAssets.projectHero, galleryImages: [mockAssets.projectHero], author: '示例课程团队', categoryId: 'humanities', gradeRange: '4-6年级', durationMinutes: 45, tags: ['人文素养', '4-6年级', '45min'], sortOrder: 40, status: 'published', documentIds: ['doc-story-lesson', 'doc-story-pdf'] }
]

export const documents: DocumentAsset[] = [
  { id: 'doc-flag-lesson', caseId: 'case-flag-football-01', kind: 'lesson-plan', title: '腰旗橄榄球入门课程教案', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.lessonPage1 }, { pageNumber: 2, image: mockAssets.lessonPage2 }], fileUrl: 'https://www.baidu.com', status: 'published' },
  { id: 'doc-flag-course-pdf', caseId: 'case-flag-football-01', kind: 'course-pdf', title: '腰旗橄榄球课程 PDF', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.pdfPage1 }, { pageNumber: 2, image: mockAssets.pdfPage2 }, { pageNumber: 3, image: mockAssets.pdfPage3 }], fileUrl: 'https://info.tsinghua.edu.cn', status: 'published' },
  { id: 'doc-volleyball-lesson', caseId: 'case-volleyball-01', kind: 'lesson-plan', title: '排球入门课程教案', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.lessonPage1 }, { pageNumber: 2, image: mockAssets.lessonPage2 }], fileUrl: 'https://www.baidu.com', status: 'published' },
  { id: 'doc-volleyball-pdf', caseId: 'case-volleyball-01', kind: 'course-pdf', title: '排球入门课程 PDF', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.pdfPage1 }, { pageNumber: 2, image: mockAssets.pdfPage2 }], fileUrl: 'https://info.tsinghua.edu.cn', status: 'published' },
  { id: 'doc-data-lesson', caseId: 'case-data-story-01', kind: 'lesson-plan', title: '社区观察课程教案', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.lessonPage1 }, { pageNumber: 2, image: mockAssets.lessonPage2 }], fileUrl: 'https://www.gov.cn', status: 'published' },
  { id: 'doc-data-pdf', caseId: 'case-data-story-01', kind: 'course-pdf', title: '社区观察课程 PDF', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.pdfPage1 }, { pageNumber: 2, image: mockAssets.pdfPage2 }], fileUrl: 'https://www.tsinghua.edu.cn', status: 'published' },
  { id: 'doc-story-lesson', caseId: 'case-story-circle-01', kind: 'lesson-plan', title: '故事与倾听课程教案', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.lessonPage1 }, { pageNumber: 2, image: mockAssets.lessonPage2 }], fileUrl: 'https://www.baidu.com', status: 'published' },
  { id: 'doc-story-pdf', caseId: 'case-story-circle-01', kind: 'course-pdf', title: '故事与倾听课程 PDF', format: 'pdf', previewPages: [{ pageNumber: 1, image: mockAssets.pdfPage1 }, { pageNumber: 2, image: mockAssets.pdfPage2 }], fileUrl: 'https://info.tsinghua.edu.cn', status: 'published' }
]

export const resources: Resource[] = [
  { id: 'resource-boundless-girls', name: '“撒开脚丫”', organization: '耐克与公益伙伴', logo: mockAssets.nikeLogo, coverImage: mockAssets.resourceNike, summary: '帮助乡村女孩通过运动变得更自信、更快乐。', description: '设计稿介绍其为耐克联合公益伙伴发起的全国性公益项目。具体合作机构与当前项目信息待内容方确认。', tags: ['运动', '女孩成长'], link: null, internalTarget: { type: 'resource-info', resourceId: 'resource-boundless-girls' }, sortOrder: 10, status: 'published' },
  { id: 'resource-youth', name: '益微青年', organization: '益微青年', logo: mockAssets.youthLogo, coverImage: mockAssets.resourceYouth, summary: '支持青年在乡村夏令营中独立、自信、有担当地成长。', description: '资源介绍根据设计稿中的简述整理；外部官方网站或报名入口待确认。', tags: ['青年成长', '乡村教育'], link: null, internalTarget: { type: 'resource-info', resourceId: 'resource-youth' }, sortOrder: 20, status: 'published' }
]

export const projectProfile: ProjectProfile = {
  projectName: 'Boundless Us', heroImage: mockAssets.projectHero, logo: mockAssets.projectLogo,
  homeCarouselImages: [mockAssets.homeHero], homeCardsBackground: mockAssets.projectLogo,
  introParagraphs: ['Boundless Us 是清华大学“清心童趣”团队在清华-耐克可持续发展领导力项目指导下发起的青年赋能教育公益项目，延续耐克“撒开脚丫”（Boundless Girls）精神。我们联结青年与公益资源，通过书信交流、榜样访谈、暑期支教和线上平台，以运动陪伴女孩强健体魄、建立自信、释放潜能，让每一个“我”成为更广阔的“我们”。'],
  contactLabel: '联系方式', contactValue: 'HH07ZZ10JJ（微信号）',
  sections: []
}

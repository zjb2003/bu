import { Case, CaseCategory, DocumentAsset, ProjectProfile, Resource } from '../domain/models'

import avatar from '../generated-assets/avator.svg'
import aboutHero from '../generated-assets/about.svg'
import homeCarousel001 from '../generated-assets/home/carousel-001.jpg'
import homeBackground from '../generated-assets/home/background.svg'

import flagThumbnail from '../generated-assets/cases/flag-football-intro/thumbnail.svg'
import flagCarousel001 from '../generated-assets/cases/flag-football-intro/carousel-001.svg'
import flagLesson001 from '../generated-assets/cases/flag-football-intro/lesson-plan-page-001.jpg'
import flagLesson002 from '../generated-assets/cases/flag-football-intro/lesson-plan-page-002.jpg'
import flagLesson003 from '../generated-assets/cases/flag-football-intro/lesson-plan-page-003.jpg'
import flagCourse001 from '../generated-assets/cases/flag-football-intro/course-001.jpg'
import flagCourse002 from '../generated-assets/cases/flag-football-intro/course-002.jpg'
import flagCourse003 from '../generated-assets/cases/flag-football-intro/course-003.jpg'
import flagCourse004 from '../generated-assets/cases/flag-football-intro/course-004.jpg'
import flagCourse005 from '../generated-assets/cases/flag-football-intro/course-005.jpg'
import flagCourse006 from '../generated-assets/cases/flag-football-intro/course-006.jpg'

import volleyballCarousel001 from '../generated-assets/cases/primary-volleyball-intro/carousel-001.svg'
import volleyballLesson001 from '../generated-assets/cases/primary-volleyball-intro/lesson-plan-001.jpg'
import volleyballLesson002 from '../generated-assets/cases/primary-volleyball-intro/lesson-plan-002.jpg'
import volleyballCourse001 from '../generated-assets/cases/primary-volleyball-intro/course-page-001.jpg'
import volleyballCourse002 from '../generated-assets/cases/primary-volleyball-intro/course-page-002.jpg'
import volleyballCourse003 from '../generated-assets/cases/primary-volleyball-intro/course-page-003.jpg'
import volleyballCourse004 from '../generated-assets/cases/primary-volleyball-intro/course-page-004.jpg'
import volleyballCourse005 from '../generated-assets/cases/primary-volleyball-intro/course-page-005.jpg'
import volleyballCourse006 from '../generated-assets/cases/primary-volleyball-intro/course-page-006.jpg'
import volleyballCourse007 from '../generated-assets/cases/primary-volleyball-intro/course-page-007.jpg'
import volleyballCourse008 from '../generated-assets/cases/primary-volleyball-intro/course-page-008.jpg'
import volleyballCourse009 from '../generated-assets/cases/primary-volleyball-intro/course-page-009.jpg'
import volleyballCourse010 from '../generated-assets/cases/primary-volleyball-intro/course-page-010.jpg'
import volleyballCourse011 from '../generated-assets/cases/primary-volleyball-intro/course-page-011.jpg'
import volleyballCourse012 from '../generated-assets/cases/primary-volleyball-intro/course-page-012.jpg'
import volleyballCourse013 from '../generated-assets/cases/primary-volleyball-intro/course-page-013.jpg'
import volleyballCourse014 from '../generated-assets/cases/primary-volleyball-intro/course-page-014.jpg'
import volleyballCourse015 from '../generated-assets/cases/primary-volleyball-intro/course-page-015.jpg'

import boundlessGirlsImage from '../generated-assets/resources/boundless-girls/image.svg'
import boundlessGirlsThumbnail from '../generated-assets/resources/boundless-girls/thumbnail.svg'
import evImage from '../generated-assets/resources/EV/image.svg'
import evThumbnail from '../generated-assets/resources/EV/thumbnail.svg'

export const categories: CaseCategory[] = [
  { id: 'body-confidence', name: '身体自信', sortOrder: 10 }
]

const flagLessonPages = [flagLesson001, flagLesson002, flagLesson003]
const flagCoursePages = [flagCourse001, flagCourse002, flagCourse003, flagCourse004, flagCourse005, flagCourse006]
const volleyballLessonPages = [volleyballLesson001, volleyballLesson002]
const volleyballCoursePages = [
  volleyballCourse001, volleyballCourse002, volleyballCourse003, volleyballCourse004, volleyballCourse005,
  volleyballCourse006, volleyballCourse007, volleyballCourse008, volleyballCourse009, volleyballCourse010,
  volleyballCourse011, volleyballCourse012, volleyballCourse013, volleyballCourse014, volleyballCourse015
]

export const documents: DocumentAsset[] = [
  {
    id: 'flag-football-intro-lesson-plan', caseId: 'flag-football-intro', kind: 'lesson-plan',
    title: '腰旗橄榄球入门课程教案', format: 'pdf',
    previewPages: flagLessonPages.map((image, index) => ({ pageNumber: index + 1, image })),
    sourceFile: 'assets/cases/flag-football-intro/lesson-plan.pdf',
    fileUrl: 'https://cloud.tsinghua.edu.cn/f/c903aba7df8949e7a2bd/?dl=1', status: 'published'
  },
  {
    id: 'flag-football-intro-course-pdf', caseId: 'flag-football-intro', kind: 'course-pdf',
    title: '腰旗橄榄球课程 PDF', format: 'pdf',
    previewPages: flagCoursePages.map((image, index) => ({ pageNumber: index + 1, image })),
    sourceFile: 'assets/cases/flag-football-intro/course.pdf',
    fileUrl: 'https://cloud.tsinghua.edu.cn/f/c6ee127782c14df5be65/?dl=1', status: 'published'
  },
  {
    id: 'volleyball-intro-lesson-plan', caseId: 'volleyball-intro', kind: 'lesson-plan',
    title: '快乐排球·零基础入门课课程教案', format: 'pdf',
    previewPages: volleyballLessonPages.map((image, index) => ({ pageNumber: index + 1, image })),
    sourceFile: 'assets/cases/primary-volleyball-intro/lesson-plan.pdf',
    fileUrl: 'https://cloud.tsinghua.edu.cn/f/a2fe71b2239c49c092ca/?dl=1', status: 'published'
  },
  {
    id: 'volleyball-intro-course-pdf', caseId: 'volleyball-intro', kind: 'course-pdf',
    title: '快乐排球课程 PDF', format: 'pdf',
    previewPages: volleyballCoursePages.map((image, index) => ({ pageNumber: index + 1, image })),
    sourceFile: 'assets/cases/primary-volleyball-intro/course.pdf',
    fileUrl: 'https://cloud.tsinghua.edu.cn/f/079ff72e54484c01b0be/?dl=1', status: 'published'
  }
]

export const cases: Case[] = [
  {
    id: 'flag-football-intro', slug: 'flag-football-intro', title: '腰旗橄榄球入门',
    summary: '传球、跑动、配合——用扯旗代替冲撞的安全团队运动',
    description: '腰旗橄榄球（Flag Football）是一项无身体接触的团队运动：防守方扯下持球人腰间的腰旗即算防守成功，用“扯旗”代替“撞倒”，安全性高、规则简洁，非常适合青少年参与，已被纳入洛杉矶奥运会正式比赛项目，全球超过2000万人参与。本课程共40分钟，分三个环节：讲授教学（5分钟）——了解基本规则与运动精神；基本功练习（15分钟）——掌握握球与传球、接球和扯旗技巧；小比赛（20分钟）——在实战对抗中感受团队协作的乐趣，培养战术思维和自信心。',
    coverImage: flagThumbnail, galleryImages: [flagCarousel001], author: '李云翔',
    categoryId: 'body-confidence', gradeRange: '4-6年级', durationMinutes: 40,
    tags: ['身体自信', '4-6年级', '40min'], sortOrder: 10, status: 'published',
    documentIds: ['flag-football-intro-lesson-plan', 'flag-football-intro-course-pdf']
  },
  {
    id: 'volleyball-intro', slug: 'volleyball-intro', title: '快乐排球·零基础入门课',
    summary: '垫球、传球、发球——在趣味游戏中快乐入门排球运动',
    description: '“快乐排球·零基础入门课”是面向小学生的40分钟排球启蒙课。课程从排球的发明故事讲起，带领学生认识球场和场上角色，学习入门规则，掌握准备姿势与双手垫球基本功，并初步体验传球、上手发球和扣球动作。课程通过垫球“保龄球”、传球“接力赛”、“保卫城堡”和“泡泡龙”等趣味游戏巩固所学，同时讲解运动前、中、后的安全注意事项。',
    coverImage: volleyballCarousel001, galleryImages: [volleyballCarousel001], author: '张丽敏',
    categoryId: 'body-confidence', gradeRange: '1-6年级', durationMinutes: 40,
    tags: ['身体自信', '1-6年级', '40min'], sortOrder: 20, status: 'published',
    documentIds: ['volleyball-intro-lesson-plan', 'volleyball-intro-course-pdf']
  }
]

export const resources: Resource[] = [
  {
    id: 'boundless-girls', name: '撒开脚丫', organization: '耐克与公益伙伴',
    logo: boundlessGirlsThumbnail, coverImage: boundlessGirlsImage,
    summary: '耐克发起的运动赋能女孩公益项目，帮助女孩打破偏见、通过运动释放潜能。',
    description: '“撒开脚丫”（Boundless Girls）是耐克于2019年在中国推出的运动赋能女孩公益项目，致力于消除女孩参与运动的障碍。项目通过榜样引领、运动课程、夏令营、音乐舞蹈与运动融合等形式融入学校体育教学和活动，并联合公益伙伴、运动员、体育老师、大学生志愿者与耐克员工共同参与。项目已惠及全国多个省份的女孩，帮助她们在运动中收获健康体魄、坚韧意志与阳光心态。',
    tags: ['运动', '女孩成长', '公益项目'], link: 'https://www.nikeinc.com.cn/html/page-3913.html',
    internalTarget: { type: 'resource-info', resourceId: 'boundless-girls' }, sortOrder: 10, status: 'published'
  },
  {
    id: 'ev', name: '益微青年', organization: 'NGO', logo: evThumbnail, coverImage: evImage,
    summary: '以乡村夏令营赋能青年成长的4A级公益组织，支持大学生与乡村儿童共同生长。',
    description: '益微青年（EV），全称北京益微青年公益发展中心，是一家聚焦青年发展、以公益实践赋能青年成长的4A级公益组织。机构开展益微乡村夏令营行动、乡潮青年行动和青年发展洞察报告，通过“服务学习”支持大学生志愿者提升同理心、独立思考和协作共创能力，与乡村儿童共同成长。',
    tags: ['青年成长', '乡村教育', '公益组织'], link: 'http://www.yiweiqingnian.org/',
    internalTarget: { type: 'resource-info', resourceId: 'ev' }, sortOrder: 20, status: 'published'
  }
]

export const projectProfile: ProjectProfile = {
  projectName: 'Boundless Us', heroImage: aboutHero, logo: avatar,
  homeCarouselImages: [homeCarousel001], homeCardsBackground: homeBackground,
  introParagraphs: ['Boundless Us 是清华大学“清心童趣”团队在清华-耐克可持续发展领导力项目指导下发起的青年赋能教育公益项目，延续耐克“撒开脚丫”（Boundless Girls）精神。我们联结青年与公益资源，通过书信交流、榜样访谈、暑期支教和线上平台，以运动陪伴女孩强健体魄、建立自信、释放潜能，让每一个“我”成为更广阔的“我们”。'],
  contactLabel: '联系方式', contactValue: 'HH07ZZ10JJ（微信号）', sections: []
}

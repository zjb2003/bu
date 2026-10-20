# 数据模型与字段规范

源类型定义：`src/domain/models.ts`。字符串 ID 使用稳定、可读的 ASCII kebab-case，创建后不可因标题修改而变化；日期使用 ISO 8601。排序字段为整数，升序展示；相同排序值以 ID 升序稳定兜底。图片为包内静态资源路径（当前由 TS 静态 import 解析为小程序可用路径），API 接入后可换受信任 HTTPS URL，但字段仍为 `string`。缺失的可选字符串使用 `null` 或省略；禁止用空字符串伪装可用地址。

## 实体字段

| 实体/字段 | TypeScript 类型 | 必填/空值/默认 | 示例 | 展示与录入规则 | API 对应 |
|---|---|---|---|---|---|
| Case.id | `CaseId` (`string`) | 必填；非空；无默认 | `case-flag-football-01` | 列表 key、详情路由；创建后稳定唯一 | `id` |
| Case.slug | `string` | 必填；非空 | `flag-football-intro` | URL 友好唯一别名；本期路由仍用 ID | `slug` |
| Case.title | `string` | 必填；非空 | `腰旗橄榄球入门` | 卡片与详情标题；建议 2–30 字 | `title` |
| Case.summary | `string` | 必填；非空 | `传球、跑动、配合……` | 列表短文案；建议不超 60 字 | `summary` |
| Case.description | `string` | 必填；非空 | `无接触的腰旗橄榄球……` | 详情介绍；保留原意，建议 500 字内 | `description` |
| Case.coverImage | `string` | 必填；非空 | `mockAssets.flagCover` | 列表/详情封面；按内容指南提供图片 | `coverImage` |
| Case.author | `string` | 必填；非空；未知时用“待补充” | `李云翔老师` | 详情作者；不得凭空造人名 | `author` |
| Case.categoryId | `CategoryId` | 必填；非空；必须关联分类 | `body-confidence` | 分类筛选/标签 | `categoryId` |
| Case.gradeRange | `string` | 必填；允许 `待补充`，不允许空 | `4-6年级` | 详情年级信息 | `gradeRange` |
| Case.durationMinutes | `number` | 必填；正整数；未知使用 `0` 并展示“待补充” | `90` | 详情时长；不得负数 | `durationMinutes` |
| Case.tags | `string[]` | 必填；可空数组；默认 `[]` | `['身体自信','4-6年级','90min']` | 详情标签；不写重复值 | `tags` |
| Case.sortOrder | `number` | 必填；整数；默认录入序号 | `10` | 列表排序 | `sortOrder` |
| Case.status | `EntityStatus` | 必填；默认 `draft` | `published` | 仅 `published` 出现在用户列表 | `status` |
| Case.documentIds | `DocumentId[]` | 必填；可空数组 | `['doc-flag-lesson']` | 关联文档 ID；必须引用存在文档 | `documentIds` / 文档反向关联 |
| CaseCategory.id | `CategoryId` | 必填、唯一 | `technology` | 分类筛选值 | `id` |
| CaseCategory.name | `string` | 必填；非空 | `科技创新` | 筛选标签；尽量不频繁改名 | `name` |
| CaseCategory.sortOrder | `number` | 必填整数 | `20` | 筛选标签顺序 | `sortOrder` |
| DocumentAsset.id | `DocumentId` | 必填、稳定唯一 | `doc-flag-course-pdf` | 关联案例文档 | `id` |
| DocumentAsset.caseId | `CaseId` | 必填；关联存在案例 | `case-flag-football-01` | 详情查询关联 | `caseId` |
| DocumentAsset.kind | `DocumentKind` | 必填 | `lesson-plan` | `lesson-plan`=课程教案，`course-pdf`=课程 PDF；一案例可各有 0..1 份 | `kind` |
| DocumentAsset.title | `string` | 必填 | `腰旗橄榄球课程教案` | 预览标题 | `title` |
| DocumentAsset.format | `'pdf'` | 必填 | `pdf` | 当前仅 PDF 预览 | `format` |
| DocumentAsset.previewPages | `PreviewPage[]` | 必填；允许 `[]` | 见下表 | 页码从 1 连续递增；允许缺预览，用空数组 | `previewPages` 或 API 页资源 |
| DocumentAsset.fileUrl | `string \| null` | 可选；默认 `null` | `null` | 真实文件 HTTPS 地址；未核实不录入 | `fileUrl` |
| DocumentAsset.status | `EntityStatus` | 必填；默认 `draft` | `published` | 只展示已发布文档 | `status` |
| PreviewPage.pageNumber | `number` | 必填；正整数且连续 | `1` | 预览页序 | `pageNumber` |
| PreviewPage.image | `string` | 必填；非空 | `mockAssets.pdfPage1` | 页面图；使用独立页图，不能用整张手机稿 | `image` |
| PreviewPage.caption | `string \| null` | 可选；默认省略 | `课程封面` | 页下方说明 | `caption` |
| PreviewPage.width/height | `number \| null` | 可选；正数或省略 | `1240`/`838` | 原始像素尺寸；未知省略 | `width`/`height` |
| Resource.id | `ResourceId` | 必填、稳定唯一 | `resource-youth` | 卡片 key | `id` |
| Resource.name/organization | `string` | 必填；未确认时写“待核实” | `益微青年` | 卡片说明；不可伪造机构关系 | `name`/`organization` |
| Resource.logo/coverImage | `string` | 必填；不得空 | `mockAssets.youthLogo` | 标志/封面 | `logo`/`coverImage` |
| Resource.summary/description | `string` | 必填；不得空 | `支持青年成长……` | 卡片短介、弹窗长介 | `summary`/`description` |
| Resource.tags | `string[]` | 必填；默认 `[]` | `['青年成长']` | 搜索字段 | `tags` |
| Resource.link | `string \| null` | 可选，默认 `null` | `null` | 只录可验证 HTTPS URL；当前没有有效地址 | `link` |
| Resource.internalTarget | `object \| null` | 可选，默认 `null` | `resource-info` 目标 | 当前表示应用内资源说明；以后可换详情路由 | `internalTarget` |
| Resource.sortOrder/status | `number`/`EntityStatus` | 必填；默认顺序/`draft` | `10`/`published` | 升序；只显示已发布 | `sortOrder`/`status` |
| ProjectProfile.projectName | `string` | 必填 | `Boundless Us` | 首页/关于标题 | `projectName` |
| ProjectProfile.introParagraphs | `string[]` | 必填；至少一段 | `['项目介绍…']` | 关于页段落；按自然段录入 | `introParagraphs` |
| ProjectProfile.heroImage/logo | `string` | 必填 | `mockAssets.projectHero` | 首页/关于视觉 | `heroImage`/`logo` |
| ProjectProfile.contactLabel/contactValue | `string` | 必填；待核实时须显式注明 | `联系方式`/设计稿微信号 | 关于页；公开前核实联系人同意 | `contact` |
| ProjectProfile.sections | `{id,title,body}[]` | 必填；允许空数组 | `mission` 区块 | 关于页内容模块，ID 稳定 | `sections` |
| QuestionSubmission.id | `string` | 必填 | `demo-question-1` | 演示记录 ID | 服务端提交 ID（真实 API 接入后） |
| QuestionSubmission.content | `string` | 必填，1–500 字 | `如何参与？` | 成功反馈正文；不得记录到真实服务器的暗示 | `content` |
| QuestionSubmission.submittedAt | `string` ISO 日期时间 | 必填 | `2026-10-09T08:00:00.000Z` | 成功反馈时间 | `createdAt` |
| QuestionSubmission.demoStatus | `'stored-locally'` | 必填 | `stored-locally` | 明示当前会话本地演示 | 真实 API 应用自己的状态枚举 |
| QuestionSubmission.note | `string` | 必填 | `仅保存在当前演示会话内…` | 提交结果说明 | 不直接映射 |

## 枚举与关系

- `EntityStatus`: `published | draft | archived`。
- `DocumentKind`: `lesson-plan | course-pdf`；UI 中文标签映射在 PreviewTabs。
- `DocumentFormat`: 当前只有 `pdf`。
- Case 多对一 Category；Case 一对多 DocumentAsset；Resource 独立；QuestionSubmission 是本地演示返回值。

## 查询与返回格式

```ts
interface CaseQuery { searchText: string; categoryId: CategoryId | 'all' }
interface CaseListResult { items: Case[]; total: number; query: CaseQuery }
interface ResourceQuery { searchText: string }
interface ResourceListResult { items: Resource[]; total: number; query: ResourceQuery }
interface ServiceResult<T> { data: T; source: 'local-mock' | 'api'; requestId: string }
```

`total` 必须等于过滤后 `items.length`，由 service 计算，不能静态写界面。详情按稳定 `CaseId` 查询：成功返回 `{ case, category, documents }`，不存在返回 `null`；页面显示缺失状态。搜索忽略首尾空白，当前匹配标题、摘要、说明、作者、标签（资源还匹配机构名）；分类与关键字同时生效。

## 示例

```json
{
  "id": "case-flag-football-01",
  "slug": "flag-football-intro",
  "title": "腰旗橄榄球入门",
  "summary": "传球、跑动、配合——每个人都是不可或缺的一环",
  "description": "无接触的腰旗橄榄球以扯腰旗代替身体撞倒，兼顾策略、体能与团队协作。",
  "coverImage": "(包内图片资源)",
  "author": "李云翔老师",
  "categoryId": "body-confidence",
  "gradeRange": "4-6年级",
  "durationMinutes": 90,
  "tags": ["身体自信", "4-6年级", "90min"],
  "sortOrder": 10,
  "status": "published",
  "documentIds": ["doc-flag-lesson", "doc-flag-course-pdf"]
}
```

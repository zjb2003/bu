# 内容录入指南

## 新增案例

1. 在 `src/data/mock/catalog.ts` 的 `cases` 中新增唯一 `id` 与 `slug`；先准备标题、短摘要、完整简介、作者确认信息、分类、适用年级、时长、标签、封面、排序和发布状态。
2. `categoryId` 必须引用 `categories` 中已存在 ID。案例使用 `draft` 直到内容和图片复核完毕；审核后设为 `published`。
3. 文档在 `documents` 中按 `caseId` 关联，并将其 ID 放入 `documentIds`。`kind` 使用 `lesson-plan` 或 `course-pdf`。预览页码从 1 开始且连续，按顺序录入；无真实文件就令 `fileUrl: null`。
4. 图片在 `src/assets/images` 或 `src/assets/previews` 按主题放置，静态 import 到 `src/data/mock/assets.ts`，再由 catalog 引用。不得直接在页面写大段案例数据。

## 新增分类、资源和项目资料

- 分类：给 `categories` 新增唯一 ID、中文名和整数 `sortOrder`；ID 不随显示名变化。
- 资源：在 `resources` 增加名称、组织方、logo、封面、短介、说明、标签、排序和状态。设计稿未提供真实网址时保持 `link: null`。当前点击使用说明弹窗，任何外部跳转需先验证目标和内容授权。
- 项目介绍：维护唯一 `projectProfile`，按自然段填写 `introParagraphs`，补齐主视觉、标志、联系标签/值及 sections。联系方式公开前必须由负责人核准。
- 提问箱：本地 mock 只返回当前会话的演示对象，不等同于数据库记录。接后端后定义服务端返回状态和隐私/留存规则。

## 图片和文件规范

- 建议封面横图 3:2 或 16:9，宽边 1000–1600 px；资源封面建议 16:9；标志提供透明背景 PNG/SVG（微信端确认 SVG 支持与打包方式，不确定时用 PNG）；预览页按原始页面纵横比导出，建议宽 1200 px 左右。
- 优先 WebP/JPEG 照片、压缩 PNG 标志；控制单图体积，按小程序包限制检查总体积。所有路径使用英文小写 kebab-case，例如 `flag-football-cover.jpg`、`flag-football-lesson-01.jpg`。
- 记录素材来源、授权、拍摄/导出日期和用途；不得把含状态栏、手机框、导航栏的整张稿图作为页面背景。PDF 中文档页可单独作为预览图，并保留原页顺序。
- 本项目 `src/assets` 下现有设计素材来自 `docs` PDF 的嵌入图片提取。正式发布前确认这些素材可公开使用。

## 校验与缺失值

- ID 唯一、ASCII kebab-case；标题/摘要/简介清晰，无虚构事实；分类/文档引用必须存在；排序值整数；时长为正整数或 `0`（未知时界面应标记待补充）；状态为枚举值。
- URL 只录核实可达的 HTTPS 地址；缺少资源 URL/文件地址用 `null`，不留占位假网址。
- 文档 `previewPages` 可空；图片缺失时允许缺整份预览并显示缺失状态，不要引用不存在文件。页面应处理加载、错误和无结果。
- 人名、机构关系、外部合作、联系方式以及设计稿没有明确的行为需负责人确认。不能确认的演示案例使用示例文字并明确标记。

## 校验流程

录入后运行 `pnpm typecheck` 与 `pnpm build:weapp`；在开发者工具检查每张图片、详情入口、分类和搜索命中、文档页序、无图状态、窄屏长页滚动及底部安全区。更新 `docs/design-mapping.md` 的来源/假设记录，并在内容审核记录中注明负责人和日期。

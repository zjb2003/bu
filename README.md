# Boundless Us 微信小程序演示

Taro 4 + React + TypeScript + Sass 实现的可操作演示。页面数据通过异步 service 接口读取，当前 service 返回本地 mock；无需后端或在线内容服务。底部导航使用自定义组件和纯文本图标；tabBar 页面使用原生文字导航，避免依赖小程序包外的导航图片。

## 环境与命令

- Node.js 18 或更新 LTS 版本
- pnpm 9 或更新版本
- 微信开发者工具（支持当前项目 `libVersion`）

```bash
pnpm install --frozen-lockfile
pnpm dev:weapp
```

构建后，在微信开发者工具选择“导入项目”，项目目录选择 `bu` 根目录，`project.config.json` 的 `miniprogramRoot` 已指向 `dist/`。当前 `appid` 是开发用 `touristappid` 占位值，正式预览/发布时替换为有权限的小程序 AppID。

其他命令：

```bash
pnpm build:weapp
pnpm typecheck
```

## 演示路径

首页可进入案例、资源、关于；案例库输入“腰旗”“排球”或分类筛选，计数随筛选变化，清空结果会显示空状态。打开“腰旗橄榄球入门”可切换“课程教案”和“课程 PDF”，预览页按结构化数据连续纵向滚动。资源卡打开本地说明弹窗。关于页“提问箱”可填写并提交，结果会明确说明只记录在当前演示会话、没有发送到服务器。

## 项目结构

- `src/pages/` 页面与页面隔离 Sass
- `src/components/` 轻量复用组件
- `src/domain/` 业务类型与查询/返回格式
- `src/data/mock/` 结构化 mock 和静态图片绑定
- `src/services/` 异步读取合约、mock 实现与 API 替换点
- `src/assets/` 从设计稿 PDF 中提取的照片、标志和预览页
- `docs/` 设计映射、架构、数据模型、内容录入规范

路由和边界见 [`docs/architecture.md`](docs/architecture.md)，视觉稿核对见 [`docs/design-mapping.md`](docs/design-mapping.md)，录入新内容见 [`docs/content-guide.md`](docs/content-guide.md)。

## Mock 数据范围

演示包含身体自信、科技创新、人文素养三分类，4 个不同案例（包括设计稿中的腰旗橄榄球和排球）、1 个案例的两种预览文档以及 2 个资源。腰旗课程教案 2 页、课程 PDF 3 页，均来自 PDF 内嵌的文档页素材。其余案例为明确示例内容。无真实下载地址；项目微信号和资源组织关系均待内容方核验。

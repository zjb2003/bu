# 架构与模块边界

## 技术基线

- 运行目标：微信小程序；Taro 4.1.5、React 18、TypeScript strict、Sass、pnpm。
- 使用 `@tarojs/components` 与 Taro 路由/API；底部四个一级页面是原生 tabBar，详情和提问使用普通页面路由。
- 样式按组件/页面放在同目录 Sass 文件；本项目没有启用 CSS Modules。若未来开启，需同时核对 Taro `mini.postcss.cssModules` 与小程序产物命名规则。
- 无全局状态库：搜索、分类、当前预览标签、提交状态都是页面本地状态。当前没有必须跨页同步的状态。
- 轻量自建展示组件，不引入完整 UI 套件。业务数据在异步 service 合约后面，当前实现使用本地 mock。

## 目录树

```text
bu/
├─ config/                 # Taro 构建配置
├─ docs/                   # 设计映射、架构、模型、内容录入、开发验收
├─ src/
│  ├─ app.config.ts        # 页面和原生 tabBar 路由
│  ├─ app.ts
│  ├─ assets/{images,previews,icons}/
│  ├─ components/          # BottomNav、SearchBox、FilterChips、CaseCard、ResourceCard、PreviewTabs、DocumentPreview、StateView
│  ├─ data/mock/           # mockAssets.ts 与 catalog.ts
│  ├─ domain/models.ts     # 实体、枚举、查询和返回类型
│  ├─ pages/               # home、cases、case-detail、resources、about、question
│  ├─ services/            # 合约、mock 实现和实现选择点
│  ├─ styles/              # 全局样式与变量
│  └─ utils/               # 无业务副作用的通用导航助手
├─ package.json / pnpm-lock.yaml
├─ project.config.json
└─ tsconfig.json
```

## 依赖方向与数据流

允许的方向：`pages → components + services + domain + utils`；`services → domain + data/mock`；`data/mock → domain + assets`；`components → domain`（仅展示类型）；`styles` 不依赖业务层。`domain` 不依赖页面、组件或 service。页面不得直接 import mock catalog，也不得复制案例/资源数据。

页面在 `useEffect` 中调用异步 service，读取带类型的 `ServiceResult<T>`，并管理 loading/error/empty/missing 状态。案例列表的查询由 `searchText` 与 `categoryId` 组成；列表卡片点击后通过 `/pages/case-detail/index?id=<稳定ID>` 进入详情，详情 service 按 ID 查找案例、分类和关联文档。

## 路由

| 页面 | 路径 | 类型 | 说明 |
|---|---|---|---|
| 首页 | `/pages/home/index` | tabBar | 主视觉及三个入口 |
| 案例库 | `/pages/cases/index` | tabBar | 搜索、分类、动态计数 |
| 案例详情 | `/pages/case-detail/index?id=...` | 普通页面 | 案例资料及两类文档预览 |
| 资源库 | `/pages/resources/index` | tabBar | 搜索资源和详情弹窗 |
| 关于我们 | `/pages/about/index` | tabBar | 项目介绍和提问箱入口 |
| 提问箱 | `/pages/question/index` | 普通页面 | 本地演示提交和反馈 |

## mock 替换为 API

页面依赖 `BoundlessService`，`services/index.ts` 是唯一实现选择点。接入时新增 HTTP service，实现相同合约，保留页面调用和领域类型；API DTO 在 service 边界映射为 domain 类型，处理分页、错误码、超时和鉴权，不让页面绑定传输格式。`ServiceResult.source` 区分 `local-mock` 与 `api`。提问接口接通前不可将 `stored-locally` 展示成服务器提交成功。

## 构建与验收

- `pnpm install --frozen-lockfile`：按锁文件安装。
- `pnpm dev:weapp`：产出 `dist` 并监听；使用微信开发者工具导入项目根目录，项目配置指向 `dist/`。
- `pnpm build:weapp`：小程序生产构建。
- `pnpm typecheck`：严格 TS 检查。
- 手工走查：一级 tab 导航、搜索/筛选/空结果、案例稳定 ID 详情、两种预览切换和页序、缺失预览、资源弹窗、空提问/提交反馈、窄屏与底部安全区。

图片必须位于小程序包中并用静态 import/相对路径引用。当前素材从本项目 `docs` 的 PDF 中提取，不依赖远程图片。真实外链或文件地址录入前需核验可访问性与授权。

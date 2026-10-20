# 资源包说明

资源提供方请以 [`docs/资源交接文档.md`](../../docs/资源交接文档.md) 为唯一交接规范。

交付物必须是一个 ZIP 压缩包，解压后顶层只有 `assets/`：

```text
assets/
├─ avator.png
├─ about.png
├─ home/
├─ cases/
│  ├─ cases.jsonl
│  └─ {case-id}/
└─ resources/
   ├─ resources.jsonl
   └─ {resource-id}/
```

- 不再使用旧版 `manifest.json` 或 `source-files` 目录。
- 不要把 `src/resource-pack`、项目源码或构建产物放进交付 ZIP。
- Cases 和 Resources 都采用“总 JSONL 清单 + ID 同名资源目录”的结构。
- JSONL 中的本地路径均以 `assets` 为根目录，且必须与实际文件名和扩展名完全一致。
- 完整字段、命名、图片规格、示例与提交前检查表请参阅正式交接文档。

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const packRoot = path.join(root, 'src', 'resource-pack')
const manifestPath = path.join(packRoot, 'manifest.json')
const errors = []
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const imagePattern = /\.(?:jpe?g|png|webp)$/i

const fail = (location, message) => errors.push(`${location}: ${message}`)
const requiredText = (value, location) => {
  if (typeof value !== 'string' || value.trim() === '') fail(location, '必须填写非空字符串')
}
const requiredArray = (value, location) => {
  if (!Array.isArray(value) || value.length === 0) fail(location, '必须是至少包含一项的数组')
}
const localFile = (value, location, pattern) => {
  requiredText(value, location)
  if (typeof value !== 'string' || value.trim() === '') return
  if (value.includes('..') || path.isAbsolute(value)) fail(location, '必须使用资源包内的相对路径，不能包含 ..')
  if (pattern && !pattern.test(value)) fail(location, `文件扩展名不符合要求：${value}`)
  const resolved = path.resolve(packRoot, value)
  if (!resolved.startsWith(path.resolve(packRoot)) || !fs.existsSync(resolved)) fail(location, `找不到文件：${value}`)
}
const url = (value, location) => {
  if (value === null) return
  if (typeof value !== 'string' || !/^https:\/\//.test(value)) fail(location, '必须为 https:// 地址或 null')
}

if (!fs.existsSync(manifestPath)) {
  console.error(`资源清单不存在：${manifestPath}`)
  process.exit(1)
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
if (manifest.version !== 1) fail('version', '当前只支持版本 1')
localFile(manifest.shared?.avatar, 'shared.avatar', imagePattern)
requiredArray(manifest.home?.carousel, 'home.carousel')
manifest.home?.carousel?.forEach((item, index) => localFile(item, `home.carousel[${index}]`, imagePattern))
localFile(manifest.home?.cardsBackground, 'home.cardsBackground', imagePattern)
localFile(manifest.about?.heroImage, 'about.heroImage', imagePattern)
requiredText(manifest.about?.title, 'about.title')
requiredArray(manifest.about?.introParagraphs, 'about.introParagraphs')

const categoryIds = new Set()
manifest.categories?.forEach((item, index) => {
  const location = `categories[${index}]`
  requiredText(item.id, `${location}.id`)
  if (!idPattern.test(item.id ?? '')) fail(`${location}.id`, '只能使用小写英文、数字和连字符')
  if (categoryIds.has(item.id)) fail(`${location}.id`, 'ID 重复')
  categoryIds.add(item.id)
  requiredText(item.name, `${location}.name`)
})

const caseIds = new Set()
requiredArray(manifest.cases, 'cases')
manifest.cases?.forEach((item, index) => {
  const location = `cases[${index}]`
  for (const field of ['id', 'name', 'teacher', 'summary', 'description', 'categoryId', 'gradeRange']) requiredText(item[field], `${location}.${field}`)
  if (!idPattern.test(item.id ?? '')) fail(`${location}.id`, '只能使用小写英文、数字和连字符')
  if (caseIds.has(item.id)) fail(`${location}.id`, 'ID 重复')
  caseIds.add(item.id)
  if (!categoryIds.has(item.categoryId)) fail(`${location}.categoryId`, `分类不存在：${item.categoryId}`)
  requiredArray(item.tags, `${location}.tags`)
  requiredArray(item.carousel, `${location}.carousel`)
  localFile(item.thumbnail, `${location}.thumbnail`, imagePattern)
  item.carousel?.forEach((image, imageIndex) => localFile(image, `${location}.carousel[${imageIndex}]`, imagePattern))
  for (const [key, label] of [['lessonPlan', '教案'], ['coursePdf', '课程 PDF']]) {
    const doc = item[key]
    localFile(doc?.file, `${location}.${key}.file`, /\.pdf$/i)
    url(doc?.downloadUrl, `${location}.${key}.downloadUrl`)
    requiredArray(doc?.previews, `${location}.${key}.previews`)
    doc?.previews?.forEach((image, imageIndex) => localFile(image, `${location}.${key}.previews[${imageIndex}]`, imagePattern))
    if (!doc) fail(`${location}.${key}`, `缺少${label}`)
  }
})

const resourceIds = new Set()
requiredArray(manifest.resources, 'resources')
manifest.resources?.forEach((item, index) => {
  const location = `resources[${index}]`
  for (const field of ['id', 'name', 'organization', 'summary', 'description']) requiredText(item[field], `${location}.${field}`)
  if (!idPattern.test(item.id ?? '')) fail(`${location}.id`, '只能使用小写英文、数字和连字符')
  if (resourceIds.has(item.id)) fail(`${location}.id`, 'ID 重复')
  resourceIds.add(item.id)
  localFile(item.image, `${location}.image`, imagePattern)
  localFile(item.thumbnail, `${location}.thumbnail`, imagePattern)
  requiredArray(item.tags, `${location}.tags`)
  url(item.link, `${location}.link`)
})

if (errors.length > 0) {
  console.error(`资源包校验失败（${errors.length} 项）：\n- ${errors.join('\n- ')}`)
  process.exit(1)
}

console.log(`资源包校验通过：首页轮播 ${manifest.home.carousel.length} 张，案例 ${manifest.cases.length} 个，资源 ${manifest.resources.length} 个。`)

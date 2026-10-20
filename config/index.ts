import { defineConfig } from '@tarojs/cli'

export default defineConfig(async (merge) => {
  const baseConfig = {
    projectName: 'boundless-us-mini-program',
    date: '2026-10-09',
    designWidth: 750,
    deviceRatio: { 640: 2.34, 750: 2, 828: 1.81 },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-framework-react', '@tarojs/plugin-platform-weapp'],
    framework: 'react' as const,
    compiler: 'webpack5' as const,
    mini: {
      postcss: { pxtransform: { enable: true, config: {} }, url: { enable: true, config: { limit: 1024 } }, cssModules: { enable: false, config: { namingPattern: 'module', generateScopedName: '[name]__[local]___[hash:base64:5]' } } }
    },
    h5: { publicPath: '/', staticDirectory: 'static', postcss: { autoprefixer: { enable: true, config: {} } } }
  }
  return merge({}, baseConfig)
})

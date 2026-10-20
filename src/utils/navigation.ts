import Taro from '@tarojs/taro'
export const routeToCase = (caseId: string): Promise<unknown> => Taro.navigateTo({ url: `/pages/case-detail/index?id=${encodeURIComponent(caseId)}` })

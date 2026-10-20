import { mockService } from './mock-service'
import { BoundlessService } from './contracts'

// API 替换点：保持 BoundlessService 合约不变，将下方实现换为 HTTP service。
export const service: BoundlessService = mockService

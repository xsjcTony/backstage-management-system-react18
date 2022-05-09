import { extend } from 'umi-request'
import store from '../store'


const request = extend({
  credentials: 'include', // cross-origin Cookie
  prefix: store.getState().layout.apiBaseUrl,
  timeout: 10000
})

export const get = async <T = any>(url: string, data = {}): Promise<T> => request.get<T>(url, {
  params: data
})

export const post = async <T = any>(url: string, data = {}): Promise<T> => request.post<T>(url, { data })

export const deleteRequest = async <T = any>(url: string, data = {}): Promise<T> => request.delete<T>(url, {
  params: data
})

export const put = async <T = any>(url: string, data = {}): Promise<T> => request.put<T>(url, { data })

export const all = async <T = any>(requests: Iterable<Promise<T>>): Promise<Awaited<T>[]> => Promise.all(requests)

export const getFile = async <T = any>(path: string, data = {}): Promise<T> => request.get<T>(path, {
  params: data,
  responseType: 'blob'
})

export default request
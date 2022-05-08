import { extend } from 'umi-request'


const request = extend({
  credentials: 'include', // cross-origin Cookie
  prefix: 'http://127.0.0.1:7001',
  timeout: 10000
})

export const get = async <T = any>(url = '', data = {}): Promise<T> => request.get<T>(url, {
  params: data
})

export const post = async <T = any>(url = '', data = {}): Promise<T> => request.post<T>(url, { data })

export const deleteRequest = async <T = any>(url = '', data = {}): Promise<T> => request.delete<T>(url, {
  params: data
})

export const put = async <T = any>(url = '', data = {}): Promise<T> => request.put<T>(url, { data })

export const all = async <T = any>(requests: Iterable<Promise<T>>): Promise<Awaited<T>[]> => Promise.all(requests)

export const getFile = async <T = any>(path = '', data = {}): Promise<T> => request.get<T>(path, {
  params: data,
  responseType: 'blob'
})

export default request

import { Link } from 'react-router-dom'
import type { RequestOptionsType } from '@ant-design/pro-utils/es/typing'
import type { Route } from 'antd/es/breadcrumb/Breadcrumb'


/**
 * Types
 */
interface FlatDataStructure<T> {
  [p: string]: any
  parentId: number
  children?: T[]
}


/**
 * Methods
 */
export const breadcrumbItemRender = (route: Route, params: any, routes: Route[], paths: string[]): JSX.Element => {
  const isLast = routes.indexOf(route) === routes.length - 1

  return isLast
    ? <span>{route.breadcrumbName}</span>
    : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
}

export const downloadFile = (blob: BlobPart, mime = '', filename = ''): void => {
  const url = URL.createObjectURL(new Blob([blob], { type: mime }))
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('target', '_blank')
  link.setAttribute('rel', 'noopener noreferrer')
  link.setAttribute('download', filename)
  link.click()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

export const flatToAntdTree = <T extends FlatDataStructure<T>>(data: T[], label: string, value: string): RequestOptionsType[] => {
  const callback = (item: T): RequestOptionsType => {
    let r: RequestOptionsType[] | undefined

    if (item.children) {
      r = item.children.map<RequestOptionsType>(callback)
    }

    return { label: item[label], value: item[value], children: r }
  }

  const tree = flatToTree<T>(data)

  return tree.map<RequestOptionsType>(callback)
}

export const flatToTree = <T extends FlatDataStructure<T>>(data: T[]): T[] => data.reduce<T[]>((prev, curr) => {
  if (curr.parentId === 0) {
    prev.push(curr)
    return prev
  }

  data.some((item) => {
    if (curr.parentId === item.id) {
      item.children = item.children ?? []
      item.children.push(curr)
      return true
    }

    return false
  })

  return prev
}, [])

import { Link } from 'react-router-dom'
import type { Route } from 'antd/es/breadcrumb/Breadcrumb'


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

import { Link } from 'react-router-dom'
import type { Route } from 'antd/es/breadcrumb/Breadcrumb'


export const breadcrumbItemRender = (route: Route, params: any, routes: Route[], paths: string[]): JSX.Element => {
  const isLast = routes.indexOf(route) === routes.length - 1

  return isLast
    ? <span>{route.breadcrumbName}</span>
    : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
}

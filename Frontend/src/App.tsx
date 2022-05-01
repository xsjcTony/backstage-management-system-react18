/* eslint '@typescript-eslint/promise-function-async': 'off' */
/* eslint 'react/jsx-sort-props': 'off' */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Page404 from './pages/Page404'
import type { LazyExoticComponent } from 'react'


/**
 * Lazy Loading Components
 */
const Admin = lazyLoading(lazy(() => import('./pages/Admin')))
const Welcome = lazyLoading(lazy(() => import('./pages/Admin/Welcome')))
const Users = lazyLoading(lazy(() => import('./pages/Admin/Users')))
const Roles = lazyLoading(lazy(() => import('./pages/Admin/Roles')))
const Privileges = lazyLoading(lazy(() => import('./pages/Admin/Privileges')))


/**
 * HOC
 */
function lazyLoading(LazyComponent: LazyExoticComponent<any>): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  )
}


/**
 * App Component
 */
const App = (): JSX.Element => (
  <Routes>
    <Route
      path="/admin"
      element={Admin}
    >
      <Route
        index
        element={Welcome}
      />
      <Route
        path="users"
        element={Users}
      />
      <Route
        path="roles"
        element={Roles}
      />
      <Route
        path="privileges"
        element={Privileges}
      />
      <Route path="*" element={<Page404 />} />
    </Route>
    <Route path="*" element={<Page404 lang />} />
  </Routes>
)

export default App

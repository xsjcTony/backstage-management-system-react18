/* eslint '@typescript-eslint/promise-function-async': 'off' */
/* eslint 'react/jsx-sort-props': 'off' */
/* eslint 'react/no-multi-comp': 'off' */
/* eslint 'react/display-name': 'off' */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Page404 from './pages/Page404'
import type { LazyExoticComponent } from 'react'


/**
 * Lazy Loading Components
 */
const Admin = lazyLoading(lazy(() => import('./pages/Admin')))
// Intentionally wait for 2s for testing lazy loading
const Welcome = lazyLoading(lazy(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve(import('./pages/Admin/Welcome'))
  }, 2000)
})))
const Users = lazyLoading(lazy(() => import('./pages/Admin/Users')))
const Roles = lazyLoading(lazy(() => import('./pages/Admin/Roles')))
const Privileges = lazyLoading(lazy(() => import('./pages/Admin/Privileges')))

const Register = lazyLoading(lazy(() => import('./pages/Register')))
const Login = lazyLoading(lazy(() => import('./pages/Login')))


/**
 * HOC
 */
function lazyLoading<P = {}>(LazyComponent: LazyExoticComponent<any>) {
  return (props: P): JSX.Element => (
    <Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </Suspense>
  )
}


/**
 * App Component
 */
const App = (): JSX.Element => (
  <Routes>
    <Route path="/admin" element={<Admin />}>
      <Route index element={<Welcome />} />
      <Route path="users" element={<Users />} />
      <Route path="roles" element={<Roles />} />
      <Route path="privileges" element={<Privileges />} />
      <Route path="*" element={<Page404 />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<Page404 lang />} />
  </Routes>
)

export default App

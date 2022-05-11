/* eslint '@typescript-eslint/promise-function-async': 'off' */
/* eslint 'react/jsx-sort-props': 'off' */
/* eslint 'react/no-multi-comp': 'off' */
/* eslint 'react/display-name': 'off' */

import Cookies from 'js-cookie'
import { lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useLocation, Outlet } from 'react-router-dom'
import Loading from './components/Loading'
import Page404 from './pages/Page404'
import { setLoggedIn } from './store/authentication/authenticationSlice'
import type { RootState, AppDispatch } from './store'
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
 * Navigation guard
 */
let authenticated = false
const RouteGuard = (): JSX.Element => {
  /**
   * Utils
   */
  const dispatch = useDispatch<AppDispatch>()
  const location = useLocation()


  /**
   * Data
   */
  const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
  const { pathname } = location


  /**
   * OAuth cookie
   */
  const t = Cookies.get('token')
  if (t) {
    authenticated = false
    localStorage.setItem('token', t)
    Cookies.remove('token')
  }


  /**
   * Authentication
   */
  if (!authenticated) {
    try {

    } catch (err) {
      dispatch(setLoggedIn(false))
    }

    authenticated = true
  }


  /**
   * Guard
   */
  if (pathname === '/login' || pathname === '/register') {
    if (loggedIn) {
      return <Navigate to="/admin" replace />
    } else {
      return <Outlet />
    }
  }

  if (!loggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          type: 'prompt',
          promptInfo: {
            type: 'error',
            intlId: 'error.need-login',
            duration: 3,
            path: pathname,
            noPrivilege: false
          }
        }}
      />
    )
  }


  /**
   * Privileges
   */
  /*
  if (/!*privileges*!/) {
    return (
      <Navigate
        to="/admin"
        replace
        state={{
          type: 'prompt',
          promptInfo: {
            type: 'error',
            intlId: 'error.no-privilege',
            duration: 3,
            path: pathname,
            noPrivilege: true
          }
        }}
      />
    )
  }
  */

  return <Outlet />
}


/**
 * App Component
 */
const App = (): JSX.Element => (
  <Routes>
    <Route element={<RouteGuard />}>
      <Route index element={<Navigate to="/admin" replace />} />
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
    </Route>
  </Routes>
)

export default App

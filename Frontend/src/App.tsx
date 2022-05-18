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
import { isLoggedIn } from './services/login'
import { getUserById } from './services/users'
import { setCurrentUser, setLoggedIn } from './store/authentication/authenticationSlice'
import type { RootState, AppDispatch } from './store'
import type { User } from './types'
import type { LazyExoticComponent } from 'react'


/**
 * Lazy Loading Components
 */
const Home = lazyLoading(lazy(() => import('./pages/Home')))

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
const Github = lazyLoading(lazy(() => import('./pages/OAuth/Github')))

const Verify = lazyLoading(lazy(() => import('./pages/resetPassword/Verify')))
const Reset = lazyLoading(lazy(() => import('./pages/resetPassword/Reset')))


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
    isLoggedIn()
      .then(async (data) => {
        if (data.code === 200) {
          const userResponse = await getUserById((data.data as User).id)

          if (userResponse.code !== 200) {
            localStorage.removeItem('token')
            dispatch(setLoggedIn(false))
            return
          }

          const user = userResponse.data

          // TODO: Privilege tree

          dispatch(setCurrentUser(user))
          dispatch(setLoggedIn(true))
        } else {
          dispatch(setLoggedIn(false))
        }
      })
      .catch(() => void dispatch(setLoggedIn(false)))

    authenticated = true
  }


  /**
   * Guard
   */
  if (pathname === '/') {
    return <Outlet />
  }

  if (
    ['/login', '/register'].includes(pathname)
    || pathname.startsWith('/oauth/')
    || pathname.startsWith('/reset_password/')
  ) {
    return loggedIn ? <Navigate to="/admin" replace /> : <Outlet />
  }

  if (pathname.startsWith('/admin')) {
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
  }

  return <Outlet />
}


/**
 * App Component
 */
const App = (): JSX.Element => (
  <Routes>
    <Route element={<RouteGuard />}>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Welcome />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="privileges" element={<Privileges />} />
        <Route path="*" element={<Page404 homePath="/admin" />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset_password">
        <Route index element={<Page404 lang />} />
        <Route path="verify" element={<Verify />} />
        <Route path="reset" element={<Reset />} />
        <Route path="*" element={<Page404 lang />} />
      </Route>
      <Route path="/oauth">
        <Route index element={<Page404 lang />} />
        <Route path="github" element={<Github />} />
        <Route path="*" element={<Page404 lang />} />
      </Route>
      <Route path="*" element={<Page404 lang />} />
    </Route>
  </Routes>
)

export default App

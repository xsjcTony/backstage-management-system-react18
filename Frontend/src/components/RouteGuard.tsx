/* eslint-disable react-hooks/exhaustive-deps */

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Loading from '@/components/Loading'
import { isLoggedIn } from '@/services/login'
import { getUserById } from '@/services/users'
import { setCurrentUser, setLoggedIn } from '@/store/authentication/authenticationSlice'
import { buildMenuTreeByUser, buildPrivilegeTreeByUser } from '@/utils'
import type { AppDispatch, RootState } from '@/store'
import type { User } from '@/types'


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
  const [authenticating, setAuthenticating] = useState<boolean>(true)


  /**
   * OAuth cookie
   */
  const t = Cookies.get('token')
  if (t) {
    setAuthenticating(true)
    localStorage.setItem('token', t)
    Cookies.remove('token')
  }


  /**
   * Authentication
   */
  const authenticate = async (): Promise<void> => {
    try {
      const res = await isLoggedIn()

      if (res.code === 200) {
        const userResponse = await getUserById((res.data as User).id)

        if (userResponse.code !== 200) {
          localStorage.removeItem('token')
          dispatch(setLoggedIn(false))
          return
        }

        const user = userResponse.data

        // Privilege tree
        user.privilegeTree = await buildPrivilegeTreeByUser(user)
        console.log(user.privilegeTree)

        // Menu tree
        user.menuTree = await buildMenuTreeByUser(user)
        console.log(user.menuTree)

        dispatch(setCurrentUser(user))
        dispatch(setLoggedIn(true))
        setAuthenticating(false)
      } else {
        dispatch(setCurrentUser(null))
        dispatch(setLoggedIn(false))
        setAuthenticating(false)
      }
    } catch (err) {
      dispatch(setCurrentUser(null))
      dispatch(setLoggedIn(false))
      setAuthenticating(false)
    }
  }

  useEffect(() => {
    if (authenticating) {
      void authenticate()
    }
  }, [authenticating])


  if (authenticating) {
    return <Loading tip="Authenticating..." />
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
    return loggedIn ? <Navigate replace to="/admin" /> : <Outlet />
  }

  if (pathname.startsWith('/admin')) {
    if (!loggedIn) {
      return (
        <Navigate
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
          to="/login"
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

export default RouteGuard

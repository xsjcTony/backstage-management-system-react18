/* eslint '@typescript-eslint/promise-function-async': 'off' */
/* eslint 'react/jsx-sort-props': 'off' */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Page404 from './pages/Page404'


/**
 * Lazy Loading Components
 */
const Admin = lazy(() => import('./pages/Admin'))
const Welcome = lazy(() => import('./pages/Admin/Welcome'))
const Users = lazy(() => import('./pages/Admin/Users'))
const Roles = lazy(() => import('./pages/Admin/Roles'))
const Privileges = lazy(() => import('./pages/Admin/Privileges'))


/**
 * App Component
 */
const App = (): JSX.Element => {
  const a = 0

  return (
    <Routes>
      <Route
        path="/admin"
        element={(
          <Suspense fallback={<Loading />}>
            <Admin />
          </Suspense>
        )}
      >
        <Route
          index
          element={(
            <Suspense fallback={<Loading />}>
              <Welcome />
            </Suspense>
          )}
        />
        <Route
          path="users"
          element={(
            <Suspense fallback={<Loading />}>
              <Users />
            </Suspense>
          )}
        />
        <Route
          path="roles"
          element={(
            <Suspense fallback={<Loading />}>
              <Roles />
            </Suspense>
          )}
        />
        <Route
          path="privileges"
          element={(
            <Suspense fallback={<Loading />}>
              <Privileges />
            </Suspense>
          )}
        />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 lang />} />
    </Routes>
  )
}

export default App

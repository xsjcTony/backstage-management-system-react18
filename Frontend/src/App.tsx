/* eslint '@typescript-eslint/promise-function-async': 'off' */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Page404 from './pages/Page404'


/**
 * Lazy Loading Components
 */
const Admin = lazy(() => import('./pages/Admin'))
const Welcome = lazy(() => import('./pages/Admin/Welcome'))


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
              <Welcome />
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

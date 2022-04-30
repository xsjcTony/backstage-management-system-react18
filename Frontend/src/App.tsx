/* eslint '@typescript-eslint/promise-function-async': 'off' */

import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/Loading'
import Page404 from './pages/Page404'


/**
 * Lazy Loading Components
 */
const Admin = lazy(() => import('./pages/Admin'))


/**
 * App Component
 */
const App = (): JSX.Element => {
  const a = 0

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/admin"
          element={<Admin />}
        />
        <Route path="*" element={<Page404 lang />} />
      </Routes>
    </Suspense>
  )
}

export default App

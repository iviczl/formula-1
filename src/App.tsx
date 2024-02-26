import './App.css'
import { Navigate, RouterProvider } from 'react-router-dom'
import DriversPage from './Pages/DriversPage'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from './NotFound'

// the root ("/") always redirects to the existing drivers page
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/drivers'} />,
  },
  {
    path: '/drivers',
    element: <DriversPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

function App() {
  return (
    <>
      <h1>Formula 1 race</h1>
      <RouterProvider router={router} />
    </>
  )
}

export default App

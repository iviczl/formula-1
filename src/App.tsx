import './App.css'
import { RouterProvider } from 'react-router-dom'
import DriversPage from './DriversPage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/drivers',
    element: <DriversPage />,
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

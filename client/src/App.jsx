
import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearnings from './pages/student/MyLearnings'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element:
          <>
            <HeroSection />
            <Courses />
          </>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'my-learning',
        element: <MyLearnings />
      }
    ]
  }
])
const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main >
  )
}

export default App
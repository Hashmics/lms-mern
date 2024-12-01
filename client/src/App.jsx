
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearnings from './pages/student/MyLearnings'
import Profile from './pages/student/Profile'

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
      },
      {
        path: 'profile',
        element: <Profile />
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
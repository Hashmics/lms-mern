
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearnings from './pages/student/MyLearnings'
import Profile from './pages/student/Profile'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/course/CourseTable'
import Sidebar from './pages/admin/Sidebar'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/CreateLecture'
import EditLecture from './pages/admin/lecture/EditLecture'

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
      },

      // Admin Routes
      {
        path: 'admin',
        element: <Sidebar />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'course',
            element: <CourseTable />
          },
          {
            path: 'course/create',
            element: <AddCourse />
          },
          {
            path: 'course/:courseId',
            element: <EditCourse />
          },
          {
            path: 'course/:courseId/lecture',
            element: <CreateLecture />
          },
          {
            path: 'course/:courseId/lecture/:lectureId',
            element: <EditLecture />
          },
        ]
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
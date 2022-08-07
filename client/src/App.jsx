import { Route, Routes } from 'react-router-dom'
import NotFoundPage from './pages/NotFound'
import TasksForm from './pages/TasksForm'
import TasksPage from './pages/TasksPage'
import Navbar from './components/Navbar'

import { TaskContextProvider } from './context/TaskContext'

function App() {
  return (
    <div className="bg-zinc-900 h-screen">
      <TaskContextProvider>
        <Navbar />
        <div className="container mx-auto py-4 px-20">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/new" element={<TasksForm />} />
            <Route path="/edit/:id" element={<TasksForm />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </TaskContextProvider>
    </div>
  )
}

export default App

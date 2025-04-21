import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DragDropContext as DndProvider } from '@hello-pangea/dnd'
import { Header } from './components/Header'
import { Dashboard } from './pages/Dashboard'
import { TaskDetail } from './pages/TaskDetail'
import { TaskHistory } from './pages/TaskHistory'
import { CategoryManagement } from './pages/CategoryManagement'
import { UserProfile } from './pages/UserProfile'
import { LandingPage } from './pages/LandingPage'
import { useTaskStore } from './store/taskStore'
import { tasks as initialTasks } from './data/tasks'

function App() {
  const initializeTasks = useTaskStore((state) => state.initializeTasks)
  
  React.useEffect(() => {
    // Initialize tasks only once
    initializeTasks(initialTasks)
  }, [initializeTasks])

  return (
    <DndProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard/*"
            element={
              <div className="min-h-screen bg-background-light dark:bg-dark-background">
                <Header />
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="task/new" element={<TaskDetail />} />
                  <Route path="task/:id" element={<TaskDetail />} />
                  <Route path="history" element={<TaskHistory />} />
                  <Route path="categories" element={<CategoryManagement />} />
                  <Route path="profile" element={<UserProfile />} />
                </Routes>
              </div>
            }
          />
        </Routes>
      </Router>
    </DndProvider>
  )
}

export default App
import { createContext, useContext, useState } from 'react'
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest
} from '../api/tasks.api'

// * Permite comunicar al contexto
const TaskContext = createContext()

// * Creando nuestro hook, para poder comunicar el contexto
export const useTasks = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskContextProvider')
  }

  return context
}

// * Agrupa el context para todo los componentes
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  // * Function para cargar tasks
  async function loadTasks() {
    const response = await getTasksRequest()
    setTasks(response.data)
  }

  // * Function delete tasks
  const deleteTask = async id => {
    try {
      const response = await deleteTaskRequest(id)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  // * Funcion para crear una task nueva
  const createTask = async task => {
    try {
      const response = await createTaskRequest(task)
      // setTasks([...tasks, response.data])
    } catch (error) {
      console.error(error)
    }
  }

  // * Funcion para obtener un task
  const getTask = async id => {
    try {
      const response = await getTaskRequest(id)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  // * Funcion para actualizar un task
  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields)

      setTasks(
        tasks.map(task => (task.id === id ? { ...task, ...newFields } : task))
      )

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{ tasks, loadTasks, deleteTask, createTask, getTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  )
}

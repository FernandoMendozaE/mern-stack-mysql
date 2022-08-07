import { useNavigate } from 'react-router-dom'
import { useTasks } from '../context/TaskContext'

function TaskCard({ task }) {
  const { deleteTask } = useTasks()
  const navigate = useNavigate()
  const { updateTask } = useTasks()

  const handleDone = async (id, done) => {
    await updateTask(id, { done: done === 0 ? 1 : 0 })
  }

  return (
    <div className="bg-zinc-700 text-white rounded p-4">
      <header className="flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done === 1 ? '✔️' : '❌'}</span>
      </header>
      <p className="text-xs">{task.description}</p>
      <span>{task.createdAt}</span>
      <div className="flex gap-x-1">
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => handleDone(task.id, task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  )
}

export default TaskCard

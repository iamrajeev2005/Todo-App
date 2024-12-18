import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, updateTodo, toggleTodo } from '../store/todoSlice'
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TodoList() {
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  
  const todos = useSelector(state => state.todos.items)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()))
      setNewTodo('')
    }
  }

  const handleEdit = (id, text) => {
    setEditingId(id)
    setEditText(text)
  }

  const handleUpdate = (id) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText.trim() }))
      setEditingId(null)
      setEditText('')
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200/50"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
          Todo List
        </h1>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 rounded-xl border-gray-200 bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add
            </button>
          </div>
        </form>

        <AnimatePresence>
          {todos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-xl mb-3 border border-gray-100 hover:border-purple-200 transition-all duration-200 group-hover:shadow-lg">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-md transition-all duration-200"
                />
                
                {editingId === todo.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 rounded-xl border-gray-200 bg-white/50 focus:border-purple-500 focus:ring-purple-500 transition-all duration-200"
                    />
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <span className={`flex-1 text-gray-800 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                  </span>
                )}

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="p-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}


import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: []
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      })
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload)
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload
      const todo = state.items.find(todo => todo.id === id)
      if (todo) {
        todo.text = text
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const { addTodo, deleteTodo, updateTodo, toggleTodo } = todoSlice.actions
export default todoSlice.reducer


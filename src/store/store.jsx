import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import employeeReducer from './employeeSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    employees: employeeReducer
  }
})


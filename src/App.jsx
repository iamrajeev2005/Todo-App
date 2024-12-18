import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './store/store'
import Layout from './components/layout'
import TodoList from './components/todo-list'
import EmployeeList from './components/employee-list'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodoList />} />
            <Route path="employees" element={<EmployeeList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}


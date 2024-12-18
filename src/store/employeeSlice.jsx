import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Using JSONPlaceholder API as a demo
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.employees = action.payload
        state.error = null
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch employees'
      })
  }
})

export default employeeSlice.reducer


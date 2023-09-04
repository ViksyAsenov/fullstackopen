import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: { message: 'ALL' },
  reducers: {
    setFilter(state, action) {
      return { ...state, message: action.payload }
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
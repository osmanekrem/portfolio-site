import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
}

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const { } = blogsSlice.actions

export default blogsSlice.reducer
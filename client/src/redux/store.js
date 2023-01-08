import { configureStore } from '@reduxjs/toolkit'
import blogsSlice from './blogs'

export const store = configureStore({
  reducer: {
    blogs: blogsSlice
  },
})

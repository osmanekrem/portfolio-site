import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth'
import projectsSlice from './projects'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectsSlice
  },
})

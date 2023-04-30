import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  categories: [{name: "All", _id:""}]
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action) {
        state.projects = action.payload
    },
    setCategories(state, action) {
        state.categories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setProjects, setCategories } = projectsSlice.actions

export default projectsSlice.reducer
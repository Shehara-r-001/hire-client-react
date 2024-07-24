import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IUser } from 'src/models/User.model'

export interface IUserState {
  isAuthenticated: boolean
  user: IUser | null
}

const initialState: IUserState = {
  isAuthenticated: false,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      console.log(action.payload)
      state.isAuthenticated = true
      state.user = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { login, logout, updateUser } = userSlice.actions
export default userSlice.reducer

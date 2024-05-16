import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface iAuthState {
  access: string | null;
  username: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {access: null} as iAuthState,
  reducers: {
    setCredentials: (state, {payload: { access } }: PayloadAction<{access: string}>) => {
      state.access = access;
    },
    setUserData: (state, {payload: { usertag, username } }: PayloadAction<{usertag: string, username: string}>) => {
      state.username = username;
    },
    logOut: (state) => {
      state.access = null;
      state.username = null;
    } 
  }
})

export const { setCredentials, logOut, setUserData } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.auth.access;
export const selectCurrentUsername = (state: RootState) => state.auth.username;
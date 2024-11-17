import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  user: null;
}
const InitialState: AuthState = {
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const AuthReducer = authSlice.reducer;
export const AuthActions = authSlice.actions;

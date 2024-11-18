import {createSlice} from '@reduxjs/toolkit';
import LoginResponse from '../../payload/response/LoginResponse';

interface AuthState {
  user: LoginResponse | null;
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

import {createSlice} from '@reduxjs/toolkit';
import LoginResponse from '../../payload/response/LoginResponse';

interface AuthState {
  user: LoginResponse | null;
  errorCode: number | null;
}
const InitialState: AuthState = {
  user: null,
  errorCode: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: InitialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setErrorCode(state, action) {
      if (state.errorCode != action.payload) {
        state.errorCode = action.payload;
      }
    },
  },
});
export const AuthReducer = authSlice.reducer;
export const AuthActions = authSlice.actions;

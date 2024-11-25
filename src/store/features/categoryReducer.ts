import {createSlice} from '@reduxjs/toolkit';
import CategoryResponse from '../../payload/response/CategoryResponse';

interface CategoryState {
  category: CategoryResponse | null;
}
const InitialState: CategoryState = {
  category: null,
};
const categorySlice = createSlice({
  name: 'category',
  initialState: InitialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});
export const CategoryReducer = categorySlice.reducer;
export const CategoryActions = categorySlice.actions;

import {createSlice} from '@reduxjs/toolkit';
import CategoryResponse from '../../payload/response/CategoryResponse';

interface CategoryState {
  category: CategoryResponse | null;
  mainCategories: CategoryResponse[];
}
const InitialState: CategoryState = {
  category: null,
  mainCategories: [],
};
const categorySlice = createSlice({
  name: 'category',
  initialState: InitialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setMainCategories(state, action) {
      state.mainCategories = action.payload;
    },
  },
});
export const CategoryReducer = categorySlice.reducer;
export const CategoryActions = categorySlice.actions;

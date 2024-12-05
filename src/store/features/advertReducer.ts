import {createSlice} from '@reduxjs/toolkit';
import AdvertResponse from '../../payload/response/AdvertResponse';

interface AdvertState {
  advert: AdvertResponse[] | null;
}
const InitialState: AdvertState = {
  advert: null,
};
const advertSlice = createSlice({
  name: 'advert',
  initialState: InitialState,
  reducers: {
    setAdvert(state, action) {
      state.advert = action.payload;
    },
  },
});
export const AdvertReducer = advertSlice.reducer;
export const AdvertActions = advertSlice.actions;

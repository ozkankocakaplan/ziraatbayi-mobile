import {createSlice} from '@reduxjs/toolkit';
import DealerResponse from '../../payload/response/DealerResponse';

interface DealerState {
  dealer: DealerResponse | null;
  uploadedImageUri: null;
}
const InitialState: DealerState = {
  dealer: null,
  uploadedImageUri: null,
};
const dealerSlice = createSlice({
  name: 'dealer',
  initialState: InitialState,
  reducers: {
    setDealer(state, action) {
      state.dealer = action.payload;
    },
    setUploadedImageUri(state, action) {
      state.uploadedImageUri = action.payload;
    },
  },
});
export const DealerActions = dealerSlice.actions;
export const DealerReducer = dealerSlice.reducer;

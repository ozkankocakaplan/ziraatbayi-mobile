import {createSlice} from '@reduxjs/toolkit';
import DealerResponse from '../../payload/response/DealerResponse';

interface DealerState {
  dealer: DealerResponse | null;
}
const InitialState: DealerState = {
  dealer: null,
};
const dealerSlice = createSlice({
  name: 'dealer',
  initialState: InitialState,
  reducers: {
    setDealer(state, action) {
      state.dealer = action.payload;
    },
  },
});
export const DealerActions = dealerSlice.actions;
export const DealerReducer = dealerSlice.reducer;

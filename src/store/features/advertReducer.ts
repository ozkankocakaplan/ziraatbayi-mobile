import {createSlice} from '@reduxjs/toolkit';
import AdvertResponse from '../../payload/response/AdvertResponse';

interface AdvertState {
  advertBottomSheetRef: any;
  selectedAdvertId: number | null;
  advert: AdvertResponse | null;
  filteredAdverts: AdvertResponse[];
  selectedChatId: string | null;
  filterBottomSheetRef: any;
  isFitered: boolean;
}
const InitialState: AdvertState = {
  advertBottomSheetRef: null,
  selectedAdvertId: null,
  advert: null,
  selectedChatId: null,
  filterBottomSheetRef: null,
  isFitered: false,
  filteredAdverts: [],
};
const advertSlice = createSlice({
  name: 'advert',
  initialState: InitialState,
  reducers: {
    setAdvert(state, action) {
      state.advert = action.payload;
    },
    setSelectedAdvertId(state, action) {
      state.selectedAdvertId = action.payload;
    },
    setAdvertBottomSheetRef(state, action) {
      state.advertBottomSheetRef = action.payload;
    },
    setSelectedChatId(state, action) {
      state.selectedChatId = action.payload;
    },

    setFilterBottomSheetRef(state, action) {
      state.filterBottomSheetRef = action.payload;
    },
    setFilteredAdverts(state, action) {
      state.filteredAdverts = action.payload;
    },
    setIsFiltered(state, action) {
      state.isFitered = action.payload;
    },
  },
});
export const AdvertReducer = advertSlice.reducer;
export const AdvertActions = advertSlice.actions;

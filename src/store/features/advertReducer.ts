import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AdvertResponse from '../../payload/response/AdvertResponse';
import FilterRequest from '../../payload/request/FilterRequest';

interface AdvertState {
  advertBottomSheetRef: any;
  selectedAdvertId: number | null;
  advert: AdvertResponse | null;
  filteredAdverts: AdvertResponse[];
  selectedChatId: string | null;
  filterBottomSheetRef: any;
  isFitered: boolean;
  filterRequest: FilterRequest;
}
const InitialState: AdvertState = {
  advertBottomSheetRef: null,
  selectedAdvertId: null,
  advert: null,
  selectedChatId: null,
  filterBottomSheetRef: null,
  isFitered: false,
  filteredAdverts: [],
  filterRequest: {
    product: '',
    activeSubstance: '',
    manufacturer: '',
  },
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
    handleChangeFilterRequest(
      state,
      action: PayloadAction<FilterRequestPayload>,
    ) {
      state.filterRequest[action.payload.key] = action.payload.value;
    },
    resetFilterRequest(state) {
      state.filterRequest = InitialState.filterRequest;
    },
  },
});
export const AdvertReducer = advertSlice.reducer;
export const AdvertActions = advertSlice.actions;
interface FilterRequestPayload {
  key: keyof FilterRequest;
  value: string;
}

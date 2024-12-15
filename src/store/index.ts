import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthReducer} from './features/authReducer';
import {persistReducer, persistStore} from 'redux-persist';
import {baseApi, imageApi} from './api/BaseApi';
import {AdvertReducer} from './features/advertReducer';
import {DealerReducer} from './features/dealerReducer';
import {CategoryReducer} from './features/categoryReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  advert: AdvertReducer,
  dealer: DealerReducer,
  category: CategoryReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [imageApi.reducerPath]: imageApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(baseApi.middleware)
        .concat(imageApi.middleware),
  });
};
export const store = setupStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;

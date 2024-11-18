import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthReducer} from './features/authReducer';
import {persistReducer, persistStore} from 'redux-persist';
import {baseApi} from './api/BaseApi';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  [baseApi.reducerPath]: baseApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });
};
export const store = setupStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;

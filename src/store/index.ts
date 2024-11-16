import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthReducer} from './features/authReducer';
import {persistReducer, persistStore} from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({serializableCheck: false});
    },
  });
};
export const store = setupStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.getState;

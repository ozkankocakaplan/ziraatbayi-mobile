import React, {useEffect} from 'react';

import {RootStackParamList} from '../types/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import BottomTabNavigator from './BottomTabNavigator';
import ChatListScreen from '../screens/ChatListScreen/ChatListScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SupportScreen from '../screens/SupportScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen/ChatRoomScreen';
import AdvertDetailBottomSheet from '../components/BottomSheet/AdvertDetailBottomSheet';
import FirebaseNotification from '../firebase/FirebaseNotification';
import DealerDetailScreen from '../screens/DealerDetailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MainScreen from '../screens/MainScreen';
import EditAdvertScreen from '../screens/Advert/EditAdvertScreen';
import AddAdvertScreen from '../screens/Advert/AddAdvertScreen';
import SearchScreen from '../screens/SearchScreen';
import HomeFilterScreen from '../screens/HomeFilterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsByCategoryScreen from '../screens/ProductsByCategoryScreen';
import AddressInfoScreen from '../screens/AddressInfoScreen';
import NetworkCheckScreen from '../screens/NetworkCheckScreen';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {AuthActions} from '../store/features/authReducer';
import {AppState} from 'react-native';
import {NotificationApi} from '../services/notificationService';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const {errorCode} = useSelector((state: RootState) => state.auth);
  const [getNotificationCount] =
    NotificationApi.useGetNotificationCountMutation();
  useEffect(() => {
    if (errorCode != null) {
      AlertDialog.showModal({
        disableCloseOnTouchOutside: true,
        type: 'error',
        message:
          errorCode === 402
            ? 'Abonelik süreniz sona erdiği için oturumunuz sonlandırıldı.'
            : 'Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapınız.',
        onConfirm() {
          dispatch(AuthActions.setErrorCode(null));
          dispatch(AuthActions.setUser(null));
        },
      });
      setTimeout(() => {
        dispatch(AuthActions.setErrorCode(null));
        dispatch(AuthActions.setUser(null));
      }, 2000);
    }
  }, [errorCode]);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        getNotificationCount();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <NetworkCheckScreen>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {user == null ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="BottomTabMenu" component={BottomTabNavigator} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
            <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
            />
            <Stack.Screen
              name="CategoriesScreen"
              component={CategoriesScreen}
            />
            <Stack.Screen name="AddAdvertScreen" component={AddAdvertScreen} />
            <Stack.Screen
              name="EditAdvertScreen"
              component={EditAdvertScreen}
            />
            <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
            />
            <Stack.Screen name="SupportScreen" component={SupportScreen} />
            <Stack.Screen
              name="DealerDetailScreen"
              component={DealerDetailScreen}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="ProductsByCategoryScreen"
              component={ProductsByCategoryScreen}
            />
            <Stack.Screen
              name="AddressInfoScreen"
              component={AddressInfoScreen}
            />
            <Stack.Group>
              <Stack.Screen
                name="HomeFilterScreen"
                component={HomeFilterScreen}
                options={{presentation: 'modal'}}
              />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>
      {user != null && (
        <>
          <FirebaseNotification />
          <AdvertDetailBottomSheet />
        </>
      )}
    </NetworkCheckScreen>
  );
};

export default RootNavigator;

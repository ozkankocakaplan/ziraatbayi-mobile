import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import BottomTabNavigator from './BottomTabNavigator';
import MessageScreen from '../screens/MessageScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Header from '../components/Header/Header';
import CategoriesScreen from '../screens/CategoriesScreen';
import AddAdvertScreen from '../screens/AddAdvertScreen';
import EditAdvertScreen from '../screens/EditAdvertScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import SupportScreen from '../screens/SupportScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import AdvertDetailBottomSheet from '../components/BottomSheet/AdvertDetailBottomSheet';

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
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
          </>
        ) : (
          <>
            <Stack.Screen name="BottomTabMenu" component={BottomTabNavigator} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
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
          </>
        )}
      </Stack.Navigator>
      <AdvertDetailBottomSheet />
    </>
  );
};

export default RootNavigator;

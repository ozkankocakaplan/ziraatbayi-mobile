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

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
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
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigator';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

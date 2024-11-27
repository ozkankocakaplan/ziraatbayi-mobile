import {BottomTabParamList} from '../types/navigator';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useThemeColors from '../constant/useColor';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBullhorn, faHome, faUser} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/HomeScreen';
import AdvertScreen from '../screens/AdvertScreen';
import AccountScreen from '../screens/AccountScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MessageScreen from '../screens/MessageScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator(
  props: NativeStackScreenProps<BottomTabParamList>,
) {
  const colors = useThemeColors();
  const iconColor = colors.iconColor;
  const inActiveIconColor = '#D8E7D6';
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: iconColor,
        tabBarInactiveTintColor: inActiveIconColor,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          top: -5,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesomeIcon
              icon={faHome}
              size={20}
              color={focused ? iconColor : inActiveIconColor}
            />
          ),
          tabBarLabel: 'Anasayfa',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Adverts"
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesomeIcon
              icon={faBullhorn}
              size={20}
              color={focused ? iconColor : inActiveIconColor}
            />
          ),
          tabBarLabel: 'İlanlarım',
        }}
        component={AdvertScreen}
      />

      <Tab.Screen
        name={'AccountScreen'}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              color={focused ? iconColor : inActiveIconColor}
            />
          ),
          tabBarLabel: 'Hesabım',
        }}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
}

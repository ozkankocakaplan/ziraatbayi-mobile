import {AppRegistry, Linking, LogBox} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import {persistor, store} from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LocaleConfig} from 'react-native-calendars';
import ModalPortals from './src/components/AlertDialog/ModalPortals';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {enableScreens} from 'react-native-screens';
LogBox.ignoreAllLogs(true);
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],

  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';
const linking = {
  prefixes: ['ziraatbayi://', 'https://ziraatbayi.com'],

  async getInitialURL() {
    try {
      const url = await Linking.getInitialURL();

      if (url) {
        if (url.includes('reset-password')) {
          Linking.getInitialURL = async () => null;
        }
      }

      return url;
    } catch (error) {
      console.error('Error fetching initial URL:', error);
      return null;
    }
  },

  subscribe(listener) {
    const linkingSubscription = Linking.addListener('url', ({url}) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      ResetPassword: {
        path: 'reset-password',
        parse: {
          token: token => token,
        },
      },
    },
  },
};
enableScreens();
const ZiraatBayi = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
        <ModalPortals />
      </GestureHandlerRootView>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ZiraatBayi);

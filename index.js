import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {ModalPortal} from 'react-native-modals';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/RootNavigator';
import {persistor, store} from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreAllLogs(true);
const ZiraatBayi = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
        <ModalPortal />
      </GestureHandlerRootView>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ZiraatBayi);

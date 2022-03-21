import Navigation from './navigation/navigation';

import { APPLICATION_ID, SERVER_URL, JAVASCRIPT_KEY } from '@env';
import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from 'use-async-effect';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, storeState } from './state';
import { Portal } from 'react-native-paper';
import { ActivityIndicator, View } from 'react-native';
import { PRIMARY_COLOR } from './constants/colors';
import SnackbarProvider from './components/shared/with-snackbar/with-snackbar';
import IndicatorProvider from './components/shared/use-indicator/use-indicator';

Parse.setAsyncStorage(AsyncStorage);

Parse.serverURL = SERVER_URL;
Parse.initialize(APPLICATION_ID, JAVASCRIPT_KEY);
export default function App() {
  useAsyncEffect(async () => {
    try {
      const user = await Parse.User.logIn('nagendra@gmail.com', 'password');
      console.log(user);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  const renderLoader = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={30} color={PRIMARY_COLOR} />
    </View>
  );

  return (
    <Provider store={store}>
      <PersistGate loading={renderLoader()} persistor={storeState}>
        <Portal.Host>
          <IndicatorProvider>
            <SnackbarProvider>
              <Navigation />
            </SnackbarProvider>
          </IndicatorProvider>
        </Portal.Host>
      </PersistGate>
    </Provider>
  );
}

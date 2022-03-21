import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreens } from './screens';
import LoginScreen from '../screens/login/login-screen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthScreens.Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AuthScreens.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;

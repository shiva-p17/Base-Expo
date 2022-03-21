import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppScreens } from './screens';
import HomeScreen from '../screens/home/home-screen';
import DrawerNavigation from '../components/drawer/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppScreens.Home}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AppScreens.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props: any) => <DrawerNavigation {...props} />}
    >
      <Drawer.Screen name='Drawer' component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default AppStack;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen.tsx';
import {LoginScreen} from '../screens/LoginScreen.tsx';
import {RegistrationScreen} from '../screens/RegistrationScreen.tsx';
import {MainScreen} from '../screens/MainScreen.tsx';
import {ProfileScreen} from '../screens/ProfileScreen.tsx';
import {FavoritesScreen} from '../screens/FavoritesScreen.tsx';
import {MyPostsScreen} from '../screens/MyPostsScreen.tsx';
import {CreatePostScreen} from '../screens/CreatePostScreen.tsx';
import {ScreenNames} from './ScreenNames.ts';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} />
        <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={ScreenNames.REGISTRATION}
          component={RegistrationScreen}
        />
        <Stack.Screen name={ScreenNames.MAIN} component={MainScreen} />
        <Stack.Screen name={ScreenNames.PROFILE} component={ProfileScreen} />
        <Stack.Screen
          name={ScreenNames.FAVORITES}
          component={FavoritesScreen}
        />
        <Stack.Screen name={ScreenNames.MY_POSTS} component={MyPostsScreen} />
        <Stack.Screen
          name={ScreenNames.CREATE_POST}
          component={CreatePostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Login from '../screens/login';
import Registration from '../screens/registration';
import Main from '../screens/main';
import Profile from '../screens/profile';
import Favorites from '../screens/favorites';
import MyPosts from '../screens/myPosts';
import CreatePost from '../screens/createPost';
import {ScreenNames} from './ScreenNames.ts';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenNames.HOME} component={Home} />
        <Stack.Screen name={ScreenNames.LOGIN} component={Login} />
        <Stack.Screen
          name={ScreenNames.REGISTRATION}
          component={Registration}
        />
        <Stack.Screen name={ScreenNames.MAIN} component={Main} />
        <Stack.Screen name={ScreenNames.PROFILE} component={Profile} />
        <Stack.Screen name={ScreenNames.FAVORITES} component={Favorites} />
        <Stack.Screen name={ScreenNames.MY_POSTS} component={MyPosts} />
        <Stack.Screen name={ScreenNames.CREATE_POST} component={CreatePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

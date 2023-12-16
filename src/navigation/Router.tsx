import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/HomeScreen.tsx';
import {LoginScreen} from "../screens/LoginScreen.tsx";
import {RegistrationScreen} from "../screens/RegistrationScreen.tsx";
import {MainScreen} from "../screens/MainScreen.tsx";
import {ProfileScreen} from "../screens/ProfileScreen.tsx";
import {FavoritesScreen} from "../screens/FavoritesScreen.tsx";
import {MyPostsScreen} from "../screens/MyPostsScreen.tsx";
import {CreatePostScreen} from "../screens/CreatePostScreen.tsx";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Registration" component={RegistrationScreen}></Stack.Screen>
        <Stack.Screen name="Main" component={MainScreen}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
        <Stack.Screen name="Favorites" component={FavoritesScreen}></Stack.Screen>
        <Stack.Screen name="MyPosts" component={MyPostsScreen}></Stack.Screen>
        <Stack.Screen name="CreatePost" component={CreatePostScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

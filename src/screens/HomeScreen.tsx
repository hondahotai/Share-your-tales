import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/types.ts';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(`../assets/images/splashScreen.png`)}
        style={styles.background}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.login}>
            Already have an account?
            <Text style={styles.login__text}> Log in</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registration}>
          <Text
            onPress={() => {
              navigation.navigate('Registration');
            }}
            style={styles.registration__text}>
            Create an account
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  login: {
    color: `#FFF`,
  },
  login__text: {
    color: `rgba(184, 222, 100, 1)`,
  },
  registration: {
    borderRadius: 21,
    backgroundColor: `#303030`,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 45,
    marginTop: 20,
    width: 343,
  },
  registration__text: {
    color: `#B8DE64`,
    textAlign: 'center',
  },
});

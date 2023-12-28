import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';
import {styles} from './styles.ts';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require(`../../assets/images/splashScreen.png`)}
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

export default Home;

import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types.ts';
import {styles} from './styles.ts';
import {SPLASH_SCREEN} from '../../assets/images';
import React from 'react';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <ImageBackground source={SPLASH_SCREEN} style={styles.background}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenNames.LOGIN);
          }}>
          <Text style={styles.login}>
            Already have an account?
            <Text style={styles.login__text}> Log in</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registration}>
          <Text
            onPress={() => {
              navigation.navigate(ScreenNames.REGISTRATION);
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

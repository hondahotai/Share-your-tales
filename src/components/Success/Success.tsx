import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from './types.ts';
import {styles} from './styles.ts';
import {CHECK_CIRCLE} from '../../assets/images';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

const Success: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container__success}>
      <Image source={require('../../assets/images/success.png')}></Image>
      <View style={styles.text__success}>
        <Image source={CHECK_CIRCLE} style={styles.image__success}></Image>
        <Text>You have been registered</Text>
      </View>
      <TouchableOpacity style={styles.continue}>
        <Text
          onPress={() => {
            navigation.navigate(ScreenNames.LOGIN);
          }}
          style={styles.continue__text}>
          continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

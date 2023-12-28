import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from './types.ts';
import {styles} from './styles.ts';

const Success = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container__success}>
      <Image source={require('../../assets/images/success.png')}></Image>
      <View style={styles.text__success}>
        <Image
          source={require('../../assets/images/outline-check-circle.png')}
          style={styles.image__success}></Image>
        <Text>You have been registered</Text>
      </View>
      <TouchableOpacity style={styles.continue}>
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.continue__text}>
          continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

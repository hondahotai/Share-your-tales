import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export const Success = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container__success}>
      <Image source={require('../../../assets/success.png')}></Image>
      <View style={styles.text__success}>
        <Image
          source={require('../../../assets/outline-check-circle.png')}
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

const styles = StyleSheet.create({
  container__success: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: `#FFF`,
  },
  text__success: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 26,
    marginBottom: 52,
  },
  image__success: {
    position: 'absolute',
    left: -25,
    width: 18,
    height: 18,
  },
  continue: {
    borderRadius: 21,
    backgroundColor: `rgba(135, 183, 31, 1)`,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 45,
    marginTop: 20,
    width: 343,
  },
  continue__text: {
    color: `#FFF`,
    textAlign: 'center',
  },
});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../../utils/storage.ts';

export const ToggleMenu = ({userName, userLastName, userAvatar}: any) => {
  const navigation = useNavigation<any>();

  const handleExitButton = () => {
    storage.set('userToken', '');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          userAvatar
            ? {uri: userAvatar}
            : require('../../../assets/StateEmptyUserMedium.png')
        }></Image>
      <Text style={styles.userData}>
        {userName && userLastName
          ? `${userName} ${userLastName}`
          : userName
          ? userName
          : 'Anonymous'}
      </Text>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Image
          source={require('../../../assets/toggleMenuUserIcon.png')}></Image>
        <Text style={styles.buttons__text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={handleExitButton}>
        <Image
          source={require('../../../assets/toggleMenuExitIcon.png')}></Image>
        <Text style={styles.buttons__text}>Exit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.theme}>
        <Image
          source={require('../../../assets/toggleMenuSunIcon.png')}></Image>
        <Text style={styles.buttons__text}>Light theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  userData: {
    color: '#131313',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    paddingBottom: 60,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 32,
  },
  buttons__text: {
    color: '#131313',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  theme: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 40,
    left: 32,
  },
});

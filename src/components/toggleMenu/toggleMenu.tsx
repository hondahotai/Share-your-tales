import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {storage} from '../../utils/storage.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {PostModel, RootStackParamList} from '../../types/types.ts';

interface MenuProps {
  userName: string;
  userLastName: string;
  userAvatar: string;
}

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Profile'>;

export const ToggleMenu = ({userName, userLastName, userAvatar}: MenuProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const handleExitButton = () => {
    storage.set('userToken', '');
    navigation.navigate('Login');
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? '#131313' : 'white',
      }}>
      <Image
        source={
          userAvatar
            ? {uri: userAvatar}
            : require('../../assets/images/StateEmptyUserMedium.png')
        }
        style={styles.image}></Image>
      <Text style={{...styles.userData, color: isDark ? `#FFF` : `black`}}>
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
          source={
            isDark
              ? require('../../assets/images/toggleMenyUserWhiteIcon.png')
              : require('../../assets/images/toggleMenuUserIcon.png')
          }></Image>
        <Text
          style={{...styles.buttons__text, color: isDark ? `#FFF` : `#131313`}}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={handleExitButton}>
        <Image
          source={
            isDark
              ? require('../../assets/images/toggleMenyExitWhiteIcon.png')
              : require('../../assets/images/toggleMenuExitIcon.png')
          }></Image>
        <Text
          style={{...styles.buttons__text, color: isDark ? `#FFF` : `#131313`}}>
          Exit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.theme} onPress={toggleTheme}>
        <Image
          source={
            isDark
              ? require('../../assets/images/toggleMenuMoonIcon.png')
              : require('../../assets/images/toggleMenuSunIcon.png')
          }></Image>
        <Text
          style={{...styles.buttons__text, color: isDark ? `#FFF` : `#131313`}}>
          {isDark ? `Dark theme ` : `Light theme`}
        </Text>
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});

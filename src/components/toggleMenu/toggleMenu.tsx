import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../libs/storage.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {MenuProps, HomeScreenNavigationProp} from './types.ts';
import {styles} from './styles.ts';

const ToggleMenu = ({userName, userLastName, userAvatar}: MenuProps) => {
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

export default ToggleMenu;

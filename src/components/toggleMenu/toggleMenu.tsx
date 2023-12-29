import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../../libs/storage.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {HomeScreenNavigationProp} from './types.ts';
import {styles} from './styles.ts';
import {
  STATE_EMPTY_USER_MEDIUM,
  TOGGLE_MENU_EXIT_ICON,
  TOGGLE_MENU_EXIT_WHITE_ICON,
  TOGGLE_MENU_MOON_ICON,
  TOGGLE_MENU_SUN_ICON,
  TOGGLE_MENU_USER_ICON,
  TOGGLE_MENU_USER_WHITE_ICON,
} from '../../assets/images';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

interface MenuProps {
  userName: string;
  userLastName: string;
  userAvatar: string;
}

const ToggleMenu = ({userName, userLastName, userAvatar}: MenuProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const handleExitButton = () => {
    storage.set('userToken', '');
    navigation.navigate(ScreenNames.LOGIN);
  };

  const handleSetName = () => {
    if (userName && userLastName) {
      return `${userName} ${userLastName}`;
    }
    if (userName) {
      return userName;
    }
    return 'Anonymous';
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: isDark ? '#131313' : 'white',
      }}>
      <Image
        source={userAvatar ? {uri: userAvatar} : STATE_EMPTY_USER_MEDIUM}
        style={styles.image}></Image>
      <Text style={{...styles.userData, color: isDark ? `#FFF` : `black`}}>
        {handleSetName()}
      </Text>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          navigation.navigate(ScreenNames.PROFILE);
        }}>
        <Image
          source={
            isDark ? TOGGLE_MENU_USER_WHITE_ICON : TOGGLE_MENU_USER_ICON
          }></Image>
        <Text
          style={{...styles.buttons__text, color: isDark ? `#FFF` : `#131313`}}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={handleExitButton}>
        <Image
          source={
            isDark ? TOGGLE_MENU_EXIT_WHITE_ICON : TOGGLE_MENU_EXIT_ICON
          }></Image>
        <Text
          style={{...styles.buttons__text, color: isDark ? `#FFF` : `#131313`}}>
          Exit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.theme} onPress={toggleTheme}>
        <Image
          source={
            isDark ? TOGGLE_MENU_MOON_ICON : TOGGLE_MENU_SUN_ICON
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

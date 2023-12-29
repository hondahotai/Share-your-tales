import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {styles} from './styles.ts';

type IAvatar = {
  handleCameraLaunch: () => void;
  handleLibraryLaunch: () => void;
  handleDeletePhoto: () => void;
  setChangePhoto: React.Dispatch<boolean>;
};

const AvatarPicker = ({
  handleCameraLaunch,
  handleLibraryLaunch,
  handleDeletePhoto,
  setChangePhoto,
}: IAvatar) => {
  const {isDark, toggleTheme} = useContext(ThemeContext);

  return (
    <View style={styles.overlay}>
      <View style={styles.photo__change}>
        <TouchableOpacity
          style={{
            ...styles.item__change,
            backgroundColor: isDark ? `#131313` : `#FFF`,
          }}
          onPress={handleCameraLaunch}>
          <Text style={styles.item__text}>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.item__changeBorder,
            backgroundColor: isDark ? `#131313` : `#FFF`,
          }}
          onPress={handleLibraryLaunch}>
          <Text style={styles.item__text}>Choose from the library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.item__change,
            backgroundColor: isDark ? `#131313` : `#FFF`,
          }}
          onPress={handleDeletePhoto}>
          <Text style={styles.item__textRed}>Delete photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.item__cancel,
            backgroundColor: isDark ? `#131313` : `#FFF`,
          }}
          onPress={() => setChangePhoto(false)}>
          <Text style={styles.item__text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvatarPicker;

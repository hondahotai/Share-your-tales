import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {styles} from './styles.ts';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {IPostPhotoPicker} from './types.ts';

const PostPhotoPicker = ({
  handleCameraLaunch,
  handleLibraryLaunch,
  setUpload,
}: IPostPhotoPicker) => {
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
            ...styles.item__change,
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
          onPress={() => setUpload(false)}>
          <Text style={styles.item__text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostPhotoPicker;

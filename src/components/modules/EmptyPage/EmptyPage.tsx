import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../../context/ThemeContext.tsx';

export const EmptyPage = () => {
  const currentRoute = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const [text, setText] = useState('');

  useEffect(() => {
    if (currentRoute === 'Favorites') {
      setText("You haven't added anything to your favorites yet");
    } else {
      setText("You haven't posted any posts yet");
    }
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          isDark
            ? require('../../../assets/upsFrameBlack.png')
            : require('../../../assets/upsFrame.png')
        }></Image>
      <Text style={{...styles.text, color: isDark ? `#696969` : `#131313`}}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 152,
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#131313',
  },
});

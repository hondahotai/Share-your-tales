import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from '../../providers/ThemeContext.tsx';
import {styles} from './styles.ts';
import {UPS_FRAME, UPS_FRAME_BLACK} from '../../assets/images';
import {ScreenNames} from '../../navigation/ScreenNames.ts';

const EmptyPage: React.FC = () => {
  const currentRoute = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const {isDark, toggleTheme} = useContext(ThemeContext);

  const [text, setText] = useState('');

  useEffect(() => {
    if (currentRoute === ScreenNames.FAVORITES) {
      setText("You haven't added anything to your favorites yet");
    } else {
      setText("You haven't posted any posts yet");
    }
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={isDark ? UPS_FRAME_BLACK : UPS_FRAME}></Image>
      <Text style={{...styles.text, color: isDark ? `#696969` : `#131313`}}>
        {text}
      </Text>
    </View>
  );
};

export default EmptyPage;

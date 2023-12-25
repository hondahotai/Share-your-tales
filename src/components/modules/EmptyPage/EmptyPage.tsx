import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {useEffect, useState} from 'react';

export const EmptyPage = () => {
  const currentRoute = useNavigationState(
    state => state.routes[state.index]?.name,
  );

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
        source={require('../../../assets/upsFrame.png')}></Image>
      <Text style={styles.text}>{text}</Text>
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

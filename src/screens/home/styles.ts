import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  login: {
    color: `#FFF`,
  },
  login__text: {
    color: `rgba(184, 222, 100, 1)`,
  },
  registration: {
    borderRadius: 21,
    backgroundColor: `#303030`,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 45,
    marginTop: 20,
    width: 343,
  },
  registration__text: {
    color: `#B8DE64`,
    textAlign: 'center',
  },
});

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container__success: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: `#FFF`,
  },
  text__success: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 26,
    marginBottom: 52,
  },
  image__success: {
    position: 'absolute',
    left: -25,
    width: 18,
    height: 18,
  },
  continue: {
    borderRadius: 21,
    backgroundColor: `rgba(135, 183, 31, 1)`,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 45,
    marginTop: 20,
    width: 343,
  },
  continue__text: {
    color: `#FFF`,
    textAlign: 'center',
  },
});

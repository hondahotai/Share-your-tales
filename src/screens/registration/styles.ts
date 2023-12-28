import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 118,
    justifyContent: 'space-around',
    backgroundColor: `#FFF`,
  },
  title: {
    fontSize: 32,
    color: `rgba(184, 222, 100, 1)`,
    fontFamily: 'Outfit',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  subtitle: {
    letterSpacing: 0.48,
    fontSize: 16,
    color: `rgba(19, 19, 19, 1)`,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  login: {color: `#000000`, textAlign: 'center'},
  login__text: {
    color: `rgba(184, 222, 100, 1)`,
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
  inputContainer: {
    marginBottom: 20,
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#131313',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  bottomContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  error: {
    color: `rgba(194, 83, 76, 1)`,
  },
  input__wrapper: {
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    zIndex: 1000,
    top: -50,
    right: 0,
  },
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
  label: {
    color: '#9B9B9B',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '600',
    marginTop: 16,
  },
});
